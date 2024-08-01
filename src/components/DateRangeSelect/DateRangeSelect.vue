<!--查询条件 日期范围选择器-->
<template>
	<div>
		<div @click="onContainer">
			<slot name="select_conatiner">
				<div class="ml_4 mr_4 vant_picker_select_left_text">{{ state.acitveName }}</div>
			</slot>
		</div>

		<van-popup v-model:show="state.oneShow" position="bottom" @closed="onClosed" @opened="onOpened" :close-on-popstate="true" :close-on-click-overlay="closeOnClickOverlay">
			<van-picker
				class="van_picker_custom"
				v-model="state.activeList"
				:title="title"
				:columns="state.columnsMap"
				:confirm-button-text="confirmButtonText"
				:columns-field-names="customFieldName"
				:cancel-button-text="cancelButtonText"
				:toolbar-position="toolbarPosition"
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
		<!-- 开始时间时间戳 -->
		<input type="text" v-model="startTime" class="input_none" />
		<!-- 结束时间时间戳 -->
		<input type="text" v-model="endTime" class="input_none" />
	</div>
</template>

<script setup lang="ts">
import type { PickerOption, PickerToolbarPosition } from "vant";
import { useI18n } from "vue-i18n";
import { ModelRef } from "vue";
import { timeShortcutOptionsMap } from "/@/maps/componentsMaps";
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";
const { t } = useI18n();
const emit = defineEmits(["update:select", "update:startTimeU", "update:endTimeU", "confirm", "cancel", "change", "onClickOption", "opened", "closed"]);

interface CustomFieldName {
	text: string;
	value: string | number;
	children: any;
}

const props = withDefaults(
	defineProps<{
		// 对象数组，配置每一列显示的数据
		columns?: any[];
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
	}>(),
	{
		// columns: [{}, {}, {}] as Array<any>,

		confirmButtonText: "确认",
		cancelButtonText: "X",
		toolbarPosition: "top",

		showToolbar: true,
		allowHtml: false,
		visibleOptionNum: 6,
		closeOnClickOverlay: true,
	}
);

const state = reactive({
	acitveName: "",
	//是否点击确认
	isOneConfirm: false,
	oneOldctiveValue: "",
	//快捷选项
	columnsMap: [] as CustomFieldName[],
	//快捷选项选中的数组 组件自带
	activeList: [] as Array<string>,
	//快捷选项弹出层
	oneShow: false,
});

/**
 * @description 默认时间快捷选项
 */
const defaultColumns = computed(() => [
	{ code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d1)?.code, name: t(`components['DateRangeSelect']['近24小时']`) },
	{ code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d2)?.code, name: t(`components['DateRangeSelect']['近7天']`) },
	{ code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d3)?.code, name: t(`components['DateRangeSelect']['近60天']`) },
	{ code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d4)?.code, name: t(`components['DateRangeSelect']['近90天']`) },
	{ code: "999", name: t(`components['DateRangeSelect']['自定义']`) },
]);

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

onMounted(() => {
	// console.log(startTime.value, endTime.value, "aaaabbbb");
});

/**
 * @description 开始时间双向绑定语法糖
 */
const startTime: ModelRef<number, number> = defineModel("startTimeU", {
	get(value) {
		if (activeValue.value != 999) {
			return timeShortcutOptionsMap.get(String(activeValue.value) as TimeShortcutOptionsEnum)?.startTime();
		}
		return value as number;
	},
	set(value) {
		return value as number;
	},
	default: 0,
});

const endTime: ModelRef<number, number> = defineModel("endTimeU", {
	get(value) {
		if (activeValue.value != 999) {
			return timeShortcutOptionsMap.get(String(activeValue.value) as TimeShortcutOptionsEnum)?.endTime();
		}
		return value as number;
	},
	set(value) {
		return value as number;
	},
	default: 0,
});

//数据映射
const dataMap = () => {
	if (props.columns) {
		state.columnsMap = props.columns?.map((item) => {
			let newObj: CustomFieldName = {} as CustomFieldName;
			newObj.text = item["name"];
			newObj.value = String(item["code"]);
			newObj.children = "";
			return newObj;
		}) as Array<CustomFieldName>;
	} else {
		state.columnsMap = defaultColumns.value.map((item) => {
			let newObj: CustomFieldName = {} as CustomFieldName;
			newObj.text = item["name"];
			newObj.value = String(item["code"]);
			newObj.children = "";
			return newObj;
		}) as Array<CustomFieldName>;
	}

	// console.log(state.columnsMap, "映射数据==============");
};

//点击外面的容器
const onContainer = () => {
	state.oneShow = true;
	console.log(state.activeList);
};

//初始化选中的name
const initActiveName = () => {
	//先找到双向绑定父组件的默认值对应的选项
	const idx = state.columnsMap?.findIndex((item) => item.value == activeValue.value);
	if (idx != -1 && state.columnsMap) {
		//赋值
		state.acitveName = state.columnsMap[idx]["text"];
	} else {
		state.acitveName = state.columnsMap[0].text;
	}
};
//初始化传入的快捷选项
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

//转化快捷选项选中的值
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
	state.isOneConfirm = true;
	state.acitveName = selectedOptions[0].text;
	console.log(startTime.value, endTime.value, "看下点击确认的时间戳");
	state.oneShow = false;
	emit("confirm", { selectedValues, selectedOptions, selectedIndexes });
};

// 点击取消按钮时触发
const onCancel = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	state.oneShow = false;
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
	state.oneOldctiveValue = activeValue.value as string;

	state.isOneConfirm = false;
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isOneConfirm) {
		//还原数据
		activeValue.value = state.oneOldctiveValue;
		state.isOneConfirm = false;
	}
	emit("closed");
};

/**
 * @description 设置快捷选项开始时间
 * @param code
 */
const setStartTime = (code: string) => {
	// startTime.value = timeShortcutOptionsMap.get(code)?.startTime as number;
};

/**
 * @description 设置快捷选项结束时间
 * @param code
 */
const setEndTime = (code: string) => {
	// endTime.value = timeShortcutOptionsMap.get(code)?.endTime as number;
};
</script>

<style lang="scss" scoped>
.input_none {
	display: none;
}

.van_picker_custom {
	@include themeify {
		background: themed("BG1");
		border-color: themed("Line");
	}

	:deep(.van-picker__toolbar) {
		height: 82px;
		border-bottom: 2px solid;

		.van-haptics-feedback {
			@include themeify {
				color: themed("T1");
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
			color: themed("T1");
		}
	}

	//选中的颜色
	:deep(.van-picker-column__item.van-picker-column__item--selected) {
		@include themeify {
			color: themed("Theme") !important;
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
			background: themed("Line2");
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
			background: themed("Line2");
		}
	}
}
</style>
