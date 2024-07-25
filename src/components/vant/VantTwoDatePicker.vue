<!-- 日期范围选择器 -->
<template>
	<div class="VantTwoDatePicker_conatiner">
		<slot name="select_conatiner">
			<div class="VantTwoDatePicker_select" @click="onStartone">
				<div class="VantTwoDatePicker_select_container">
					<div class="VantTwoDatePicker_select_left">
						<span class="VantTwoDatePicker_text1">{{ state.startDateStr }}</span>
					</div>
					<div class="VantTwoDatePicker_text1">-</div>
					<div class="VantTwoDatePicker_select_right">
						<span class="VantTwoDatePicker_text1">{{ state.endDateStr }}</span>
					</div>
				</div>
				<SvgIcon iconName="arrow" />
			</div>
		</slot>
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
				v-model="startTime"
				:title="startTitle"
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
				v-if="state.startShow"
			>
				<template #columns-top>
					<div class="selectionTime">
						<div class="selectionTime_one_active" @click="onStart">
							<span class="selectionTime_text1">{{ state.startDateStr }}</span>
						</div>

						<div class="interval">至</div>

						<div class="selectionTime_one" @click="onEnd">
							<span class="selectionTime_text1">{{ state.endDateStr }}</span>
						</div>
					</div>
				</template>
				<template #cancel>
					<SvgIcon iconName="close" />
				</template>
				<template #title>
					<div class="title">{{ startTitle }}</div>
				</template>
				<template #confirm>
					<div class="right">{{ confirmButtonText }}</div>
				</template>
			</van-date-picker>

			<van-date-picker
				class="picker"
				v-model="endTime"
				:title="startTitle"
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
				v-else
			>
				<template #columns-top>
					<div class="selectionTime">
						<div class="selectionTime_one" @click="onStart">
							<span class="selectionTime_text1">{{ state.startDateStr }}</span>
						</div>

						<div class="interval">至</div>

						<div class="selectionTime_one_active" @click="onEnd">
							<span class="selectionTime_text1">{{ state.endDateStr }}</span>
						</div>
					</div>
				</template>
				<template #cancel>
					<SvgIcon iconName="close" />
				</template>
				<template #title>
					<div class="title">{{ startTitle }}</div>
				</template>
				<template #confirm>
					<div class="right">{{ confirmButtonText }}</div>
				</template>
			</van-date-picker>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
// import arrow from "/@/assets/zh/default/common/arrow.svg";
// import date from "/@/assets/zh/default/common/date.svg";
import Common from "/@/utils/common";
import { showToast } from "vant";
const emit = defineEmits(["update:show", "update:startTime", "update:endTime", "confirm", "cancel", "change", "onClickOption", "opened", "closed"]);
const props = withDefaults(
	defineProps<{
		show: boolean;
		//开始时间最小时间
		minDate?: Date;

		maxDate?: Date;
		startTitle?: string;
		endTitle?: string;
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
		startTitle: "自定义时间",
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		loading: false,
		closeOnClickOverlay: true,
		visibleOptionNum: 7,
		optionHeight: "10.933333vw",
		showToolbar: true,
		columnsType: ["year", "month", "day"] as any,
		minDate: Common.getInstance().lastMonthFirstDayDate() as any,
		maxDate: new Date() as any,
	}
);

const state = reactive({
	//开始时间字符串
	startDateStr: "",
	startOldDateStr: "",

	endDateStr: "",
	oldEndDateStr: "",
	// 开始时间时间戳
	startTimestamp: 0,
	// 结束时间时间戳
	endTimestamp: 0,
	//是否点击确认
	isConfirm: false,
	//是否显示开始时间 选择器
	startShow: false,
	//是否显示结束时间 选择器
	endShow: false,
});

// 点击开始
const onStartone = () => {
	isShow.value = true;
	state.startShow = true;
};

// 点击开始时间
const onStart = () => {
	isShow.value = true;
	state.startShow = true;
};

//点击结束时间
const onEnd = () => {
	isShow.value = true;
	state.startShow = false;
	state.endShow = true;
};

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
const startTime = defineModel("startTime", {
	get(value) {
		state.startTimestamp = value as unknown as number;
		let dateList: string[] = [];
		let str: string = "";
		//年月时间戳转字符串再转数组
		if (props.columnsType?.length == 2) {
			str = Common.getInstance().dayForMat6(value);
			dateList = str.split("-");
			startListDateToStrDate(dateList);
		}
		//年月日时间戳转字符串再转数组
		if (props.columnsType?.length == 3) {
			str = Common.getInstance().dayForMat7(value);
			dateList = str.split("-");
			startListDateToStrDate(dateList);
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
			state.startTimestamp = timestamp;
		}
		//年月日数组转字符串再转时间戳
		if (props.columnsType?.length == 3) {
			str = value.join("-");
			timestamp = Common.getInstance().dayForMat9(str);
			state.startTimestamp = timestamp;
		}
		// console.log(value, timestamp, "这是子组件set++++++++");
		return timestamp;
	},
	default: () => [],
});

//双向绑定语法糖
const endTime = defineModel("endTime", {
	get(value) {
		state.endTimestamp = value;
		let dateList: string[] = [];
		let str: string = "";
		//年月时间戳转字符串再转数组
		if (props.columnsType?.length == 2) {
			str = Common.getInstance().dayForMat6(value);
			dateList = str.split("-");
			endListDateToStrDate(dateList);
		}
		//年月日时间戳转字符串再转数组
		if (props.columnsType?.length == 3) {
			str = Common.getInstance().dayForMat7(value);
			dateList = str.split("-");
			endListDateToStrDate(dateList);
		}
		// console.log("end", value, dateList, "子组件get-----------");
		return dateList;
	},
	set(value) {
		let str: string = "";
		let timestamp: number = 0;
		// 年月数组转字符串再转时间戳
		if (props.columnsType?.length == 2) {
			str = value.join("-");
			timestamp = Common.getInstance().dayForMat11(str);
			state.endTimestamp = timestamp;
		}
		//年月日数组转字符串再转时间戳
		if (props.columnsType?.length == 3) {
			str = value.join("-");
			timestamp = Common.getInstance().dayForMat10(str);
			state.endTimestamp = timestamp;
		}
		// console.log("end", value, timestamp, "这是子组件set++++++++");
		return timestamp;
	},
	default: () => [],
});

// const  =

onMounted(() => {
	startListDateToStrDate(startTime.value);
	endListDateToStrDate(endTime.value);
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

// 开始时间 数组日期转字符串
const startListDateToStrDate = (list: Array<string>) => {
	// console.log(list);
	let str = "";
	if (props.columnsType?.length == 2) {
		str = list.join("/");
		state.startDateStr = str;
	}

	if (props.columnsType?.length == 3) {
		str = list.join("/");
		state.startDateStr = str;
	}
};

// 结束时间 数组日期转字符串
const endListDateToStrDate = (list: Array<string>) => {
	// console.log(list);
	let str = "";
	if (props.columnsType?.length == 2) {
		str = list.join("/");
		state.endDateStr = str;
	}

	if (props.columnsType?.length == 3) {
		str = list.join("/");
		state.endDateStr = str;
	}
};

// 取消或点击遮罩还原对应选择器数据
const StrDateToListDate = () => {
	state.isConfirm = false;
	if (state.startShow) {
		state.startDateStr = state.startOldDateStr;

		startTime.value = state.startDateStr.split("-") as any;
		// console.log(state.startDateStr, startTime.value, "里面关闭开始时间");
	}
	if (state.endShow) {
		state.endDateStr = state.oldEndDateStr;
		endTime.value = state.endDateStr.split("-") as any;
	}
};

// 点击完成按钮时触发
const onConfirm = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	console.log("state.startTimestamp", state.startTimestamp);
	console.log("state.endTimestamp", state.endTimestamp);

	if (state.startTimestamp > state.endTimestamp) {
		showToast("开始时间不得大于结束时间");
		return;
	}
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
	if (state.startShow) {
		state.startOldDateStr = state.startDateStr;
	}
	if (state.endShow) {
		state.oldEndDateStr = state.endDateStr;
	}
	// console.log(state.startOldDateStr, "打开");
	state.isConfirm = false;
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isConfirm) {
		StrDateToListDate();
	}
	datePickerShowFalse();
	// console.log(state.startDateStr,state.isConfirm, "关闭");
	emit("closed");
};

// 时间选择器状态关闭
const datePickerShowFalse = () => {
	if (state.startShow) {
		state.startShow = false;
	}
	if (state.endShow) {
		state.endShow = false;
	}
};
</script>

<style lang="scss" scoped>
.VantTwoDatePicker_conatiner {
	.VantTwoDatePicker_select {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 12px;
		padding: 28px 24px;
		@include themeify {
			border: 1px solid themed(Theme-P);
			background: themed(BG2);
		}
	}
	.VantTwoDatePicker_select_container {
		display: flex;
		align-items: center;
		.VantTwoDatePicker_text1 {
			@include themeify {
				color: themed(TB);
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-style: normal;
			font-weight: 400;
			line-height: 38px; /* 135.714% */
			text-transform: uppercase;
		}
	}
}

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

.selectionTime {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 32px 0;
	.selectionTime_one_active {
		border-radius: 12px;
		padding: 21px 64px;
		@include themeify {
			border: 1px solid themed(Theme-P);
			background: themed(BG2);
			color: themed(Theme-P);
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 28px;
		font-style: normal;
		font-weight: 500;
		line-height: 36px; /* 128.571% */
	}
	.selectionTime_one {
		border-radius: 12px;
		@include themeify {
			background: themed(BG2);
			color: themed(T1);
		}
		padding: 21px 64px;
		text-align: center;
		font-family: "PingFang SC";
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		line-height: 36px; /* 128.571% */
	}
	.interval {
		padding: 0 31px;
		@include themeify {
			color: themed(TB);
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
}
</style>
