<!--查询条件 条件选择器 -->
<template>
	<div>
		<van-popup v-model:show="isShow" position="bottom" @closed="onClosed" @opened="onOpened" :close-on-popstate="true" :close-on-click-overlay="closeOnClickOverlay">
			<van-picker
				class="picker"
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
				<template #cancel>
					<SvgIcon class="close" iconName="/loginOrRegister/clear" />
				</template>
				<template #title>
					<div class="title">{{ title }}</div>
				</template>
				<template #confirm>
					<div class="right">{{ confirmButtonText }}</div>
				</template>

				<template #option="item">
					<slot name="option" :item="item"></slot>
				</template>
			</van-picker>
		</van-popup>

		<input type="text" v-model="activeValue" style="display: none" />
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
	icon: string;
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
		//可见的选项个数 7
		visibleOptionNum?: number | string;
		//是否点击遮罩时关闭
		closeOnClickOverlay?: boolean;
		//需要映射到组件text的后端字段key 默认为name
		toText?: string;
		//需要映射到组件value的后端字段key 默认为code
		toValue?: string | number;
		icon?: string;
	}>(),
	{
		show: false,
		title: "标题",
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		toolbarPosition: "top",
		loading: false,
		readonly: false,
		showToolbar: true,
		allowHtml: false,
		visibleOptionNum: 7,
		closeOnClickOverlay: true,
		optionHeight: "10.933333vw",
		toText: "name",
		toValue: "code",
		icon: "icon",
	}
);

const state = reactive({
	activeName: "",
	//是否点击确认
	isConfirm: false,
	oldActiveValue: "",
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
		newObj.icon = item[props.icon];
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
		state.activeName = state.columnsMap[idx]["text"];
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
	state.activeName = selectedOptions[0].text;
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
	state.oldActiveValue = activeValue.value as string;
	state.isConfirm = false;
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isConfirm) {
		//还原数据
		activeValue.value = state.oldActiveValue;
		state.isConfirm = false;
	}
	emit("closed");
};
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
	border-radius: 24px 24px 0px 0px;
	background-color: transparent;
}

.picker {
	@include themeify {
		background: themed("BG1");
	}
	:deep(.van-picker__toolbar) {
		position: relative;
		height: 82px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 20px;
		@include themeify {
			background: themed("BG1");
			border-color: themed("Line");
		}
		border-bottom: 1px solid;
		.van-picker__cancel {
			position: absolute;
			left: 20px;
			padding: 0px 28px;
		}

		.close {
			width: 32px;
			height: 32px;
		}

		.title {
			@include themeify {
				color: themed("TB");
			}
			text-align: center;
			font-family: "PingFang SC";
			font-size: 32px;
			font-weight: 500;
			line-height: 42px;
		}

		.van-picker__confirm {
			position: absolute;
			right: 20px;
			.right {
				@include themeify {
					color: themed("T1");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 30px;
				font-weight: 400;
				line-height: 40px;
			}
		}
	}

	:deep(.van-picker-column__item) {
		@include themeify {
			color: themed("T1");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		line-height: 36px;
	}
	:deep(.van-picker-column__item--selected) {
		@include themeify {
			color: themed("Theme");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 500;
		line-height: 36px; /* 112.5% */
	}

	:deep(.van-picker__mask) {
		display: none;
	}

	:deep(.van-hairline-unset--top-bottom::after) {
		border-top: 2px solid;
		border-bottom: 2px solid;
		border-image: linear-gradient(90deg, rgba(59, 193, 22, 0) 0%, #ff284b 50%, rgba(59, 193, 22, 0) 100%) 2 2 2 2;
	}
}
</style>
