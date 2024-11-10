<!--查询条件 日期范围选择器-->
<template>
	<div>
		<div @click="onContainer">
			<slot name="select_conatiner">
				<div
					:class="{
						widthSize1: widthSize == 1,
						widthSize2: widthSize == 2,
						widthSize3: widthSize == 3,
					}"
				>
					<div v-if="activeValue != 999">
						{{ state.acitveName }}
					</div>
					<div v-else>
						<div>{{ dayjs(state.startTimeSlotText, "YYYY/MM/DD").format("YYYY-MM-DD") }}</div>
						<div>{{ dayjs(state.endTimeSlotText, "YYYY/MM/DD").format("YYYY-MM-DD") }}</div>
					</div>
					<SvgIcon size="3.2" iconName="common/arrowDown" />
				</div>
			</slot>
		</div>

		<van-popup v-model:show="state.oneShow" :close-on-click-overlay="closeOnClickOverlay" :close-on-popstate="true" position="bottom" @closed="onOneClosed" @opened="onOneOpened">
			<van-picker
				v-model="state.activeList"
				:allow-html="allowHtml"
				:cancel-button-text="cancelButtonText"
				:columns="state.columnsMap"
				:columns-field-names="customFieldName"
				:confirm-button-text="$t(`components['DateRangeSelect']['确认']`)"
				:option-height="optionHeight"
				:show-toolbar="showToolbar"
				:title="title"
				:toolbar-position="toolbarPosition"
				:visible-option-num="visibleOptionNum"
				class="van_picker_custom"
				v-bind="$attrs"
				@cancel="onOneCancel"
				@change="onOneChange"
				@confirm="onOneConfirm"
				@click-option="onClickOneOption"
			>
			</van-picker>
		</van-popup>

		<van-popup v-model:show="state.twoShow" :close-on-click-overlay="closeOnClickOverlay" position="bottom">
			<van-date-picker
				v-model="state.dateTimeList"
				:cancel-button-text="cancelButtonText"
				:columns-type="(columnsType as  any)"
				:confirm-button-text="$t(`components['DateRangeSelect']['确认']`)"
				:show-toolbar="showToolbar"
				class="van_picker_custom"
				@cancel="onTwoCancel"
				@change="onTwoChange"
				@confirm="onTwoConfirm"
			>
				<template #columns-top>
					<div class="selectionTime columnsContainer">
						<div class="title">
							{{ $t(`components['DateRangeSelect']['选择时间']`) }}
						</div>
						<div class="selectionTimeList">
							<div v-for="(item, index) in state.columnsMap" :key="index" @click="selectionTimeHandler(item)" :style="{ width: '22%', display: item.value == 999 ? 'none' : 'block' }">
								<div class="selectionTime_item" :class="{ dateRangeSelect_active: item.value == checkedType }" v-if="item.value != 999">
									{{ item.text }}
								</div>
							</div>
							<!-- {{ state.activeList }} -->
						</div>
					</div>
					<!-- {{ activeValue }}
					{{ state.dateTimeList }} -->
					<div class="customTime columnsContainer">
						<div class="title">
							{{ $t(`components['DateRangeSelect']['筛选时间']`) }}
						</div>
						<div class="dateRangeSelect_columnstop">
							<div :class="{ dateRangeSelect_active: state.activeType == 1 }" class="dateRangeSelect_timebox" @click="onStartOrEnd(1)">
								{{ dayjs(state.startTimeText, "YYYY/MM/DD").format("YYYY-MM-DD") }}
							</div>
							<div class="dateRangeSelect_text1">
								{{ $t(`components['DateRangeSelect']['至']`) }}
							</div>
							<div :class="{ dateRangeSelect_active: state.activeType == 2 }" class="dateRangeSelect_timebox" @click="onStartOrEnd(2)">
								{{ dayjs(state.endTimeText, "YYYY/MM/DD").format("YYYY-MM-DD") }}
							</div>
						</div>
					</div>
					<div class="hint">{{ $t(`components['DateRangeSelect']['当前系统支持查询最近30日的记录']`) }}</div>
				</template>
			</van-date-picker>
		</van-popup>

		<input v-model="activeValue" class="input_none" type="text" />
		<!-- 开始时间时间戳 -->
		<input v-model="startTime" class="input_none" type="text" />
		<!-- 结束时间时间戳 -->
		<input v-model="endTime" class="input_none" type="text" />
	</div>
</template>

<script lang="ts" setup>
import type { PickerOption, PickerToolbarPosition } from "vant";
import { useI18n } from "vue-i18n";
import { type ModelRef } from "vue";
import { timeShortcutOptionsMap } from "/@/maps/componentsMaps";
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";
import dayjs, { Dayjs } from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { showToast } from "vant";
import { any } from "video.js/dist/types/utils/events";

dayjs.extend(utc);
dayjs.extend(tz);
const { t } = useI18n();
const emit = defineEmits(["update:select", "update:startTimeU", "update:endTimeU", "onConfirmDate"]);

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
		//日期格式
		columnsType?: string[];
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
		/**
		 * @description 布局
		 */
		widthSize?: number;
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
		columnsType: () => ["year", "month", "day"],
		widthSize: 3,
	}
);

const state = reactive({
	//快捷选项弹出层是否展示
	oneShow: false,
	acitveName: "",
	//是否点击确认
	isOneConfirm: false,
	oneOldctiveValue: "",
	//快捷选项
	columnsMap: [] as CustomFieldName[],
	//快捷选项选中的数组 组件自带
	activeList: [] as Array<string>,
	//自定义时间弹出层是否展示
	twoShow: false,
	//日期时间选择器的值
	dateTimeList: [] as Array<string>,
	// 最小时间范围
	minDate: new Date(),
	// 最大时间范围
	maxDate: new Date(),
	//顶部激活的选项 1开始时间 2结束时间
	activeType: 1,
	startTimeText: "",
	endTimeText: "",
	startTimeSlotText: "",
	endTimeSlotText: "",
});

/**
 * @description 默认时间快捷选项
 */
const defaultColumns = computed(() => [
	{
		code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d1)?.code,
		name: t(`components['DateRangeSelect']['今日']`),
	},
	{
		code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d2)?.code,
		name: t(`components['DateRangeSelect']['昨日']`),
	},
	{
		code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d3)?.code,
		name: t(`components['DateRangeSelect']['近7日']`),
	},
	{
		code: timeShortcutOptionsMap.get(TimeShortcutOptionsEnum.d4)?.code,
		name: t(`components['DateRangeSelect']['近30日']`),
	},
	{ code: "999", name: t(`components['DateRangeSelect']['自定义']`) },
]);

//双向绑定语法糖
const activeValue: ModelRef<string | number, string | number> = defineModel("select", {
	get(value) {
		// state.activeList = String(value).split(",");
		if (value != "999") {
		}
		// console.log(state.activeList, "子组件看看呢");
		return value;
	},
	set(value) {
		return value;
	},
	default: () => "",
});

onMounted(() => {
	initStartTimeAndEndTimer();
	// console.log(startTime.value, endTime.value, "日期范围选择器");
});

/**
 * @description 开始时间 双向绑定语法糖
 */
const startTime: ModelRef<number, number> = defineModel("startTimeU", {
	get(value) {
		// if (activeValue.value != 999) {
		// 	return timeShortcutOptionsMap.get(String(activeValue.value) as TimeShortcutOptionsEnum)?.startTime();
		// }
		return value as number;
	},
	set(value) {
		state.startTimeSlotText = state.startTimeText;
		return value as number;
	},
	default: 0,
});
/**
 * @description 结束时间 双向绑定语法糖
 */
const endTime: ModelRef<number, number> = defineModel("endTimeU", {
	get(value) {
		// if (activeValue.value != 999) {
		// 	return timeShortcutOptionsMap.get(String(activeValue.value) as TimeShortcutOptionsEnum)?.endTime();
		// }
		return value as number;
	},
	set(value) {
		state.endTimeSlotText = state.endTimeText;
		return value as number;
	},
	default: 0,
});

//快捷选项数据映射
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
	// state.oneShow = true;
	state.twoShow = true;
	console.log(state.activeList, "弹出层", startTime.value, "=========");
	// state.acitveName = selectedOptions[0].text;
	setDatePickerData();
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
		activeValue.value = newList.join(",");
	},
	{
		deep: true,
	}
);

// 点击快捷选项完成按钮时触发
const onOneConfirm = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	if (activeValue.value != 999) {
		state.acitveName = selectedOptions[0].text;
		initStartTimeAndEndTimer();
		emit("onConfirmDate");
	} else {
		state.minDate = dayjs().tz("America/New_York").subtract(90, "day").toDate();
		state.maxDate = dayjs().tz("America/New_York").toDate();
		//赋值开始时间给日期时间选择器组件
		state.dateTimeList = timestampToList(startTime.value);
		state.startTimeText = state.dateTimeList.join("/");
		state.endTimeText = dayjs(endTime.value).tz("America/New_York").format("YYYY/MM/DD");
		//外部插槽展示日期
		state.startTimeSlotText = state.dateTimeList.join("/");
		state.endTimeSlotText = dayjs(endTime.value).tz("America/New_York").format("YYYY/MM/DD");
		state.activeType = 1;
		state.twoShow = true;
	}
	state.isOneConfirm = true;
	state.oneShow = false;
};

// 缓存快捷选项数据
const cacheShortcutOptions = ref<any>(state.columnsMap[0]);
const checkedType = ref<TimeShortcutOptionsEnum | "999">(TimeShortcutOptionsEnum.d1);
// 点击快捷选项选项时触发
const selectionTimeHandler = (selectedOptions: any) => {
	cacheShortcutOptions.value = selectedOptions;
	// state.acitveName = selectedOptions.text;
	// state.activeList = [selectedOptions.value];
	checkedType.value = selectedOptions.value;

	// initStartTimeAndEndTimer(selectedOptions.value);
	setDatePickerData();
	// emit("onConfirmDate");
};

// 设置日期选择器组件数据
const setDatePickerData = () => {
	nextTick(() => {
		state.activeType = 1;
		if (checkedType.value != "999") {
			state.dateTimeList = timestampToList(timeShortcutOptionsMap.get(<TimeShortcutOptionsEnum>checkedType.value)?.startTime());
		}
		state.startTimeText = state.dateTimeList.join("/");
		state.endTimeText = dayjs(timeShortcutOptionsMap.get(<TimeShortcutOptionsEnum>checkedType.value)?.endTime())
			.tz("America/New_York")
			.format("YYYY/MM/DD");
	});
};

// 点击快捷选项取消按钮时触发
const onOneCancel = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	state.oneShow = false;
};

//选中快捷选项的选项改变时触发
const onOneChange = ({ selectedValues, selectedOptions, selectedIndexes, columnIndex }) => {};

//点击快捷选项选项时触发
const onClickOneOption = ({ currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex }) => {};

//打开快捷选项弹出层且动画结束后触发
const onOneOpened = () => {
	state.oneOldctiveValue = activeValue.value as string;

	state.isOneConfirm = false;
};

// 关闭快捷选项弹出层且动画结束后触发;
const onOneClosed = () => {
	if (!state.isOneConfirm) {
		//还原数据
		activeValue.value = state.oneOldctiveValue;
		state.isOneConfirm = false;
	}
};

//日期时间选择器点击确认
const onTwoConfirm = async ({ selectedValues, selectedOptions, selectedIndexes }) => {
	state.acitveName = cacheShortcutOptions.value.text;
	state.activeList = [checkedType.value];
	// initStartTimeAndEndTimer(cacheShortcutOptions.value.value);
	initStartTimeAndEndTimerByText();
	// const dateStr = state.dateTimeList.join("-");
	// if (state.activeType == 1) {
	// 	startTime.value = dayjs.tz(dateStr, "America/New_York").valueOf();
	// } else {
	// 	endTime.value = dayjs.tz(dateStr, "America/New_York").valueOf();
	// }
	await console.log("1");

	setTimeout(() => {
		if (startTime.value > endTime.value) {
			console.error("开始时间不可大于结束时间");
			showToast("开始时间不可大于结束时间");
			return;
		}
		emit("onConfirmDate");
		state.twoShow = false;
	}, 10);
};

//日期时间选择器点击取消
const onTwoCancel = () => {
	state.twoShow = false;
};

//日期时间选择器选项变化回调
const onTwoChange = ({ selectedValues, selectedOptions, selectedIndexes, columnIndex }) => {
	checkedType.value = "999";
	if (state.activeType == 1) {
		state.startTimeText = selectedValues.join("/");
	} else {
		state.endTimeText = selectedValues.join("/");
	}
};

/**
 * @description 开始时间 结束时间 来回切换
 * @param type
 */
const onStartOrEnd = (type: number) => {
	if (state.activeType == type) return;
	state.activeType = type;
	listToTimestamp(state.dateTimeList, type);
};

/**
 * @description 初始化开始时间和结束时间
 */
const initStartTimeAndEndTimer = (options: TimeShortcutOptionsEnum = activeValue.value as TimeShortcutOptionsEnum) => {
	startTime.value = timeShortcutOptionsMap.get(<TimeShortcutOptionsEnum>options)?.startTime() as number;
	endTime.value = timeShortcutOptionsMap.get(<TimeShortcutOptionsEnum>options)?.endTime() as number;
};

// 根据state.startTimeText 和 state.endTimeText 初始化开始时间和结束时间
const initStartTimeAndEndTimerByText = () => {
	startTime.value = dayjs(state.startTimeText, "YYYY/MM/DD").tz("America/New_York").startOf("day").valueOf();
	endTime.value = dayjs(state.endTimeText, "YYYY/MM/DD").tz("America/New_York").endOf("day").valueOf();
};

/**
 * @description 时间戳转美东时区时间组件
 * @param timestamp
 */
const timestampToList = (timestamp: number) => {
	console.log(timestamp, "timestampToList");

	const dateStr = dayjs(timestamp).tz("America/New_York").format("YYYY/MM/DD");
	const list = dateStr.split("/");
	return list;
};

/**
 * @description 美东时区时间组件转时间戳 且 将对应的时间戳赋值给时区组件
 */
const listToTimestamp = (list: Array<string>, type) => {
	const dateStr = list.join("-");
	//从结束时间点到开始时间则给 结束时间赋值时间戳 开始时间时间戳赋值给时间组件 否则相反
	if (type == 1) {
		endTime.value = dayjs.tz(dateStr, "America/New_York").endOf("day").valueOf();
		state.dateTimeList = timestampToList(startTime.value);
	} else {
		startTime.value = dayjs.tz(dateStr, "America/New_York").startOf("day").valueOf();
		state.dateTimeList = timestampToList(endTime.value);
	}
};
</script>

<style lang="scss" scoped>
.input_none {
	display: none;
}
.columnsContainer {
	.title {
		@include themeify {
			color: themed("TB");
		}
		box-sizing: border-box;
		padding: 20px 40px 20px 40px;
		font-size: 32px;
		font-style: normal;
		font-weight: 500;
		// line-height: 42px; /* 131.25% */
		// border: 1px solid white;
	}
	.dateRangeSelect_columnstop {
		// margin-top: 40px;
		//margin-bottom: 40px;
		padding: 0 40px;
		@include flex_align_center;
		@include flex_space_between;

		.dateRangeSelect_text1 {
			font-size: 28px;
			//font-weight: 600;
			@include themeify {
				color: themed("TB");
			}
		}
	}
	.dateRangeSelect_timebox {
		font-size: 28px;
		width: 280px;
		height: 75px;
		border-radius: 12px;
		box-sizing: border-box;
		border: 2px solid var(--Line-N, #343434);
		@include flex_center;
		@include themeify {
			background: themed("BG3");
			color: themed("T1");
		}
	}

	.selectionTimeList {
		display: flex;
		padding: 0 40px;
		justify-content: space-between;
		& > div {
			border: 2px solid var(--Line-N, #343434);
			border-radius: 12px;
			background-color: #222324 !important;
		}
		.selectionTime_item {
			font-size: 26px;
			height: 64px;
			border-radius: 12px;
			box-sizing: border-box;
			@include flex_center;
			@include themeify {
				//background: themed("BG3");
				color: var(--T1-N, #999ba0);
			}
		}
	}
	.dateRangeSelect_active {
		border: 2px solid;
		@include themeify {
			border-color: themed("Theme");
			color: themed("Theme") !important ;
		}
	}
}

.van_picker_custom {
	@include themeify {
		background: themed("BG1");
		border-color: themed("Line");
	}

	:deep(.van-picker__toolbar) {
		height: 82px;
		border-bottom: 2px solid #343434;

		.van-haptics-feedback {
			@include themeify {
				color: themed("T1");
			}
		}
	}

	:deep(.van-picker__title) {
		@include themeify {
			color: themed("TB");
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

.widthSize1 {
	box-sizing: border-box;
	width: 100%;
	height: 80px;
	padding: 20px;
	border-radius: 12px;
	border: 1px solid;
	@include themeify {
		border-color: themed("Line");
		color: themed("T1");
	}
}

.widthSize2 {
	box-sizing: border-box;
	width: 300px;
	height: 80px;
	padding: 20px;
	border-radius: 12px;
	border: 1px solid;
	@include themeify {
		border-color: themed("Line");
		color: themed("T1");
	}
}

.widthSize3 {
	box-sizing: border-box;
	width: 226px;
	height: 80px;
	padding: 9px 24px 9px 14px;
	border-radius: 12px;
	border: 1px solid;
	font-size: 26px;
	line-height: 30px;
	@include themeify {
		border-color: themed("Line");
		color: themed("T1");
		background-color: themed("BG3");
	}
	@include flex_align_center;
	@include flex_space_between;
}

.hint {
	font-family: PingFang SC;
	font-size: 20px;
	font-weight: 400;
	line-height: 30px;
	text-align: center;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;
	color: var(--Hint-P, #ff7a00);
	margin: 16px 0;
}

:deep(.van-picker__confirm) {
	color: #fff !important;
}
</style>
