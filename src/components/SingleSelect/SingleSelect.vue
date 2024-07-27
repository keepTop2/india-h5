<!--查询条件 单项选择器 -->
<template>
	<div>
		<div @click="isShow = true">
			<slot name="select_conatiner">
				<div class="ml_4 mr_4 vant_picker_select_left_text">{{ state.acitveName }}</div>
			</slot>
		</div>

		<van-popup teleport="body" v-model:show="isShow" position="bottom" @closed="onClosed" @opened="onOpened" :close-on-popstate="true" :close-on-click-overlay="closeOnClickOverlay">
			<van-picker
				class="van_picker_custom"
				v-model="state.activeList"
				:title="title"
				:columns="state.columnsMap"
				:confirm-button-text="confirmButtonText"
				:columns-field-names="customFieldName"
				:cancel-button-text="cancelButtonText"
				:toolbar-position="toolbarPosition"
				:loading="loading"
				:readonly="readonly"
				:show-toolbar="showToolbar"
				:allow-html="allowHtml"
				:option-height="optionHeight"
				:visible-option-num="visibleOptionNum"
				v-bind="$attrs"
				@confirm="onConfirm"
				@cancel="onCancel"
				@change="onChange"
				@click-option="onClickOption"
			>
				<template #option="item">
					<slot name="option" :item="item">
						<div class="vant_picker_options_item">
							<div>{{ item.text }}</div>
						</div>
					</slot>
				</template>
			</van-picker>
		</van-popup>

		<input type="text" v-model="activeValue" class="input_none" />
	</div>
</template>

<script setup lang="ts">
import type { PickerOption, PickerToolbarPosition } from "vant";

import { ModelRef } from "vue";

const emit = defineEmits(["update:show", "update:select", "confirm", "cancel", "change", "onClickOption", "opened", "closed"]);

interface CustomFieldName {
	text: string;
	value: string | number;
	children: any;
}

const props = withDefaults(
	defineProps<{
		show: boolean;
		// 对象数组，配置每一列显示的数据
		columns?: PickerOption[] | PickerOption[][];
		// 自定义 columns 结构中的字段 默认值 { text: 'text', value: 'value', children: 'children' }
		customFieldName?: object;
		// 顶部栏标题
		title?: string;
		//确认按钮文字，设置为空字符串可以隐藏按钮
		confirmButtonText?: string;
		//取消按钮文字，设置为空字符串可以隐藏按钮
		cancelButtonText?: string;
		//顶部栏位置，可选值为 bottom
		toolbarPosition?: PickerToolbarPosition;
		//是否显示加载状态
		loading?: boolean;
		//是否为只读状态，只读状态下无法切换选项
		readonly?: boolean;
		//是否显示顶部栏
		showToolbar?: boolean;
		//是否允许选项内容中渲染 HTML
		allowHtml?: boolean;
		//选项高度，支持 px vw vh rem 单位，默认 px  44
		optionHeight?: number | string;
		//可见的选项个数 6
		visibleOptionNum?: number | string;
		//是否点击遮罩时关闭
		closeOnClickOverlay?: boolean;
		//需要映射到组件text的后端字段key 默认为name
		toText?: string;
		//需要映射到组件value的后端字段key 默认为code
		toValue?: string | number;
	}>(),
	{
		show: false,
		title: "标题",
		confirmButtonText: "确认",
		cancelButtonText: "X",
		toolbarPosition: "top",
		loading: false,
		readonly: false,
		showToolbar: true,
		allowHtml: false,
		visibleOptionNum: 6,
		closeOnClickOverlay: true,
		toText: "name",
		toValue: "code",
	}
);

const state = reactive({
	acitveName: "",
	//是否点击确认
	isConfirm: false,
	oldctiveValue: "",
	columnsMap: [] as CustomFieldName[],
	activeList: [] as Array<string>,
	//后端数据类型
	valueType: "" as number | string,
});

//双向绑定语法糖
const isShow = computed({
	get() {
		return props.show;
	},
	set(value) {
		emit("update:show", value);
	},
});

//双向绑定语法糖
const activeValue: ModelRef<string | number, string | number> = defineModel("select", {
	get(value) {
		state.activeList = String(value).split(",");
		// console.log(state.activeList, "子组件看看呢");
		return value;
	},
	set(value) {
		return value;
	},
	default: () => "",
});

//数据映射
const dataMap = () => {
	state.columnsMap = props.columns?.map((item) => {
		let newObj: CustomFieldName = {} as CustomFieldName;
		newObj.text = item[props.toText];
		newObj.value = String(item[props.toValue]);
		newObj.children = "";
		return newObj;
	}) as Array<CustomFieldName>;
	// console.log(state.columnsMap, "映射数据==============");
};

//初始化选中的name
const initActiveName = () => {
	//先找到双向绑定父组件的默认值对应的选项
	const idx = state.columnsMap?.findIndex((item) => item.value == activeValue.value);
	if (idx != -1 && state.columnsMap) {
		//赋值
		state.acitveName = state.columnsMap[idx]["text"];
	}
};

watch(
	[() => props.columns],
	([newCloumns]) => {
		// console.log("监听到了吗", newCloumns);
		dataMap();
		initActiveName();
	},
	{
		deep: true,
		immediate: true,
	}
);

watch(
	[() => state.activeList],
	([newList]) => {
		activeValue.value = state.activeList.join(",");
	},
	{
		deep: true,
	}
);

// 点击完成按钮时触发
const onConfirm = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	state.isConfirm = true;
	state.acitveName = selectedOptions[0].text;
	isShow.value = false;
	emit("confirm", { selectedValues, selectedOptions, selectedIndexes });
};

// 点击取消按钮时触发
const onCancel = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	isShow.value = false;
	emit("cancel", { selectedValues, selectedOptions, selectedIndexes });
};

//选中的选项改变时触发
const onChange = ({ selectedValues, selectedOptions, selectedIndexes, columnIndex }) => {
	emit("change", { selectedValues, selectedOptions, selectedIndexes, columnIndex });
};

//点击选项时触发
const onClickOption = ({ currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex }) => {
	emit("onClickOption", { currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex });
};

//打开弹出层且动画结束后触发
const onOpened = () => {
	state.oldctiveValue = activeValue.value as string;

	state.isConfirm = false;
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isConfirm) {
		//还原数据
		activeValue.value = state.oldctiveValue;
		state.isConfirm = false;
	}
	emit("closed");
};
</script>

<style lang="scss" scoped>
.input_none {
	display: none;
}

.van_picker_custom {
	@include themeify {
		background: themed("BG1");
		border-color: themed("Line-N");
	}

	:deep(.van-picker__toolbar) {
		height: 82px;
		border-bottom: 2px solid;

		.van-haptics-feedback {
			@include themeify {
				color: themed("T1-N");
			}
		}
	}

	:deep(.van-picker-column) {
	}

	:deep(.van-picker__columns) {
		//height: auto !important;
	}

	:deep(.van-picker-column__item) {
		@include themeify {
			color: themed("T1-N");
		}
	}

	//选中的颜色
	:deep(.van-picker-column__item.van-picker-column__item--selected) {
		@include themeify {
			color: themed("Theme-P") !important;
		}
	}

	//遮罩隐藏
	:deep(.van-picker__mask) {
		display: none;
	}

	//选中的线
	:deep(.van-hairline-unset--top-bottom.van-picker__frame)::after {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2-P");
		}
	}

	:deep(.van-hairline-unset--top-bottom.van-picker__frame)::before {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2-P");
		}
	}
}
</style>
