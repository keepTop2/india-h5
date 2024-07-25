<!-- 查询条件 单日期选择器 -->
<template>
	<div>
		<van-popup
			v-model:show="isShow"
			position="bottom"
			@opened="onOpened"
			@closed="onClosed"
			:close-on-popstate="true"
			:close-on-click-overlay="closeOnClickOverlay"
		>
			<van-date-picker
				class="picker"
				v-model="currentDate"
				:title="title"
				:confirm-button-text="confirmButtonText"
				:cancel-button-text="cancelButtonText"
				:show-toolbar="showToolbar"
				:loading="loading"
				:min-date="minDate"
				:max-date="maxDate"
				:columns-type="(columnsType as  any)"
				:formatter="formatter"
				@confirm="onConfirm"
				@cancel="onCancel"
				@change="onChange"
			>
				<template #cancel>
					<SvgIcon iconName="close" />
				</template>
				<template #title>
					<div class="title">{{ title }}</div>
				</template>
				<template #confirm>
					<div class="right">{{ confirmButtonText }}</div>
				</template>
			</van-date-picker>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import Common from "/@/utils/common";

// import type { DatePickerColumnType } from "vant";
const emit = defineEmits(["update:show", "update:datevalue", "confirm", "cancel", "change", "onClickOption", "opened", "closed"]);

const props = withDefaults(
	defineProps<{
		show: boolean;
		minDate?: Date;
		maxDate?: Date;
		title?: string;
		//确认按钮文字，设置为空字符串可以隐藏按钮
		confirmButtonText?: string;
		//取消按钮文字，设置为空字符串可以隐藏按钮
		cancelButtonText?: string;
		columnsType?: string[];
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
	}>(),
	{
		show: false,
		title: "选择时间",
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		loading: false,
		closeOnClickOverlay: true,
		visibleOptionNum: 7,
		optionHeight: "10.933333vw",
		showToolbar: true,
		columnsType: ["year", "month", "day"] as any,
		maxDate: new Date() as any,
	}
);

const state = reactive({
	dateStr: "",
	oldDateStr: "",
	//是否点击确认
	isConfirm: false,
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
const currentDate = defineModel({
	get(value) {
		let dateList: string[] = [];
		let str: string = "";
		//年月时间戳转字符串再转数组
		if (props.columnsType?.length == 2) {
			str = Common.getInstance().dayForMat6(value);
			dateList = str.split("-");
			listDateToStrDate(dateList);
		}
		//年月日时间戳转字符串再转数组
		if (props.columnsType?.length == 3) {
			str = Common.getInstance().dayForMat7(value);
			dateList = str.split("-");
			listDateToStrDate(dateList);
		}
		// console.log(value, dateList, "子组件get-----------");
		return dateList;
	},
	set(value) {
		let str: string = "";
		let timestamp: number = 0;
		// 年月数组转字符串再转时间戳
		if (props.columnsType?.length == 2) {
			str = value.join("-");
			timestamp = Common.getInstance().dayForMat8(str);
		}
		//年月日数组转字符串再转时间戳
		if (props.columnsType?.length == 3) {
			str = value.join("-");
			timestamp = Common.getInstance().dayForMat9(str);
		}
		// console.log(value, timestamp, "这是子组件set++++++++");
		return timestamp;
	},
	default: () => [],
});

onMounted(() => {
	listDateToStrDate(currentDate.value);
});

//格式化时间
const formatter = (type, option) => {
	if (type === "year") {
		option.text += "年";
	}
	if (type === "month") {
		option.text += "月";
	}
	if (type == "day") {
		option.text += "日";
	}
	return option;
};

// 数组日期转字符串
const listDateToStrDate = (list: Array<string>) => {
	let str = "";
	if (props.columnsType?.length == 2) {
		str = list.join("-");
		state.dateStr = str;
	}

	if (props.columnsType?.length == 3) {
		str = list.join("-");
		state.dateStr = str;
	}
};

// 字符串数组
const StrDateToListDate = (str: string) => {
	currentDate.value = str.split("-") as any;
	// console.log(currentDate.value, "子组件关闭");
};

// 点击完成按钮时触发
const onConfirm = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	state.isConfirm = true;
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

//打开弹出层且动画结束后触发
const onOpened = () => {
	state.oldDateStr = state.dateStr;
	// console.log(state.oldDateStr, "打开");
	state.isConfirm = false;
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isConfirm) {
		dataRecovery();
	}
	// console.log(state.dateStr,state.isConfirm, "关闭");
	emit("closed");
};

//取消或者点击遮罩还原数据
const dataRecovery = () => {
	state.dateStr = state.oldDateStr;
	StrDateToListDate(state.dateStr);
	state.isConfirm = false;
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
			color: themed("Theme-P");
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
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-image: linear-gradient(90deg, rgba(59, 193, 22, 0) 0%, #3bc116 50%, rgba(59, 193, 22, 0) 100%) 2 2 2 2;
	}
}
</style>
