<template>
	<!-- 活动 -->
	<div>
		<VantNavBar :title="'福利中心'" @onClickLeft="router.back()" />
	</div>

	<div class="wrapper p_24">
		<div class="flex">
			<div class="mb_15 allTab color_T1">
				<div class="tab" @click="changeTab('all')" :class="tabs.length == 0 ? 'active' : ''">全部</div>
			</div>
			<div class="tabs mb_20">
				<span v-for="(item, index) in tabs" class="tab color_T1 active" :class="activeTab === item ? 'active' : ''" :key="index">
					{{ item.value }} <SvgIcon class="arrow ml_20" iconName="common/close" size="24px" @click="deleteTab(item, index)" />
				</span>
			</div>
			<div class="mb_15 filterBtn color_T1 fs_28" @click="showSheet = true">筛选<SvgIcon class="arrow ml_5" iconName="common/arrowDown" size="24px" /></div>
		</div>
		<div class="content">
			<div>
				<div class="header color_T3 mb_16 mt_16" @click="showDate = true">
					{{ cloneSelect.activeDate !== null ? dateNumLabel[cloneSelect.activeDate].label : cloneSelect.dateRange[0] + "-" + cloneSelect.dateRange[1]
					}}<SvgIcon class="arrow ml_5" iconName="common/arrowDown" size="24px" />
				</div>
				<div class="header color_TB mb_16 mt_16 fs_26 flex-start">
					笔数：
					<span>{{ pageData?.totalSize || 0.0 }}</span>
					<img src="./image/line.png" alt="" class="line" />
					<span>{{ pageData?.mainCurrencyTotal || 0.0 }} {{ pageData?.mainCurrency }}</span>
					<img src="./image/line.png" alt="" class="line" />
					<span>{{ pageData?.platCurrencyTotal || 0.0 }} {{ pageData?.platCurrencyCode }}</span>
				</div>
				<div class="oneClickReceive color_TB flex mb_16 mt_16 fs_26">
					有{{ pageData?.waitReceiveTotal }}个待领取福利
					<div class="btn" @click="oneClickReceive" :class="pageData?.waitReceiveTotal ? '' : 'disabled'">一键领取</div>
				</div>
			</div>
			<van-list @load="getList" :immediate-check="false" :finished="finished">
				<div class="card" v-for="item in recordsList" :class="'status' + item.receiveStatus">
					<div class="left">
						<div class="flex-start">
							<img :src="getTypeIcon(item.welfareCenterRewardType)" alt="" class="typeIcon" />
							<div class="color_T1 fs_26">{{ item.welfareCenterRewardTypeText }}</div>
						</div>
						<div class="">
							<div class="color_T2 fs_24">{{ dayjs(item.pfEndTime).format("YYYY-MM-DD hh:mm:ss") }}</div>
						</div>
					</div>
					<div class="right">
						<div class="color_TB fs_28">{{ item.amount }} {{ item.currencyCode }}</div>
						<div class="color_Theme fs_20" v-if="item.receiveStatus == 0 && item.isPermanentValidity == 0" style="display: flex">
							<CountdownTimer :endTime="new Date(item.expiryTimeRemaining)"> </CountdownTimer>
							<div class="color_T3" style="flex: 1">后过期</div>
						</div>
						<div v-else="item.receiveStatus == 0" class="color_TB">长期有效</div>
						<div class="btn fs_24" v-if="item.receiveStatus == 0" @click="clickReceive(item)">{{ receiveStatus[item.receiveStatus] }}</div>
						<div class="fs_24 color_Wam-P1" v-else-if="item.receiveStatus == 1">{{ receiveStatus[item.receiveStatus] }}</div>
						<div class="fs_24 color_T3" v-else>{{ receiveStatus[item.receiveStatus] }}</div>
					</div>
				</div>
				<Nodata v-if="recordsList.length < 1"></Nodata>
			</van-list>
		</div>
		<van-action-sheet v-model:show="showSheet" @cancel="onCancelSheet">
			<div class="flex title">
				<div @click="onCancelSheet"><SvgIcon class="arrow" iconName="common/close" size="32px" /></div>
				<div class="color_TB" @click="confirmSheet">确定</div>
			</div>
			<div class="mt_16 mb_16">
				<div class="color_TB fs_32 mt_16 mb_16">类型筛选</div>
				<div class="group mb_32">
					<div class="color_T1" :class="currentWelfareCenterRewardType == 'all' ? 'active' : ''" @click="currentWelfareCenterRewardType = 'all'">全部</div>
					<div
						v-for="item in downBoxList?.welfareCenterRewardType"
						class="color_T1"
						@click="currentWelfareCenterRewardType = item.code"
						:class="currentWelfareCenterRewardType == item.code ? 'active' : ''"
					>
						{{ item.value }}
					</div>
				</div>
			</div>
			<div class="mt_16 mb_16">
				<div class="color_TB fs_32 mt_16 mb_16">状态筛选</div>
				<div class="group mb_32">
					<div class="color_T1" :class="currentActivityReceiveStatus == 'all' ? 'active' : ''" @click="currentActivityReceiveStatus = 'all'">全部</div>
					<div v-for="item in downBoxList?.activityReceiveStatus" class="color_T1" @click="currentActivityReceiveStatus = item.code" :class="currentActivityReceiveStatus == item.code ? 'active' : ''">
						{{ item.value }}
					</div>
				</div>
			</div>
		</van-action-sheet>
		<van-action-sheet v-model:show="showDate" round position="bottom" @cancel="onCancelPicker">
			<div class="flex dateTitle">
				<div @click="onCancelPicker"><SvgIcon class="arrow" iconName="common/close" size="32px" /></div>
				<div class="color_TB" @click="confirmPicker">确定</div>
			</div>
			<div class="color_TB fs_32 mb_16 mt_24">选择时间</div>
			<div class="dateTabs">
				<div v-for="(item, index) in dateNumLabel" class="tab" @click="changeDate(item, index)" :class="activeDate === index ? 'active' : ''">
					{{ item.label }}
				</div>
			</div>
			<div class="color_TB fs_32 mb_16 mt_32">筛选时间</div>
			<div class="flex timeBtn">
				<span :class="activeDateBtn == 0 ? 'active' : ''" @click="changeDateBtn(0)">{{ cloneSelect.dateRange[0] }}</span>
				至
				<span :class="activeDateBtn == 1 ? 'active' : ''" @click="changeDateBtn(1)"> {{ cloneSelect.dateRange[1] }}</span>
			</div>
			<div class="color_Hint fs_20 text-center mt_20 mb_20">当前系统支持查询最近30日的记录</div>
			<datePicker :columns="columns" ref="datePickerRef" @onChange="onChangeDate"></datePicker>
		</van-action-sheet>
	</div>
</template>

<script setup lang="ts">
import router from "/@/router";
import { welfareCenterApi } from "/@/api/welfareCenter";
import datePicker from "./datePicker.vue";
import CountdownTimer from "./CountdownTimer.vue";
import Common from "/@/utils/common";
import type0 from "./image/type0.png";
import type1 from "./image/type1.png";
import type2 from "./image/type2.png";
import type3 from "./image/type3.png";
import type4 from "./image/type4.png";
import dayjs from "dayjs";
import { showToast } from "vant";
const activeTab = ref(1);
const tabs: any = ref([]);
const currentWelfareCenterRewardType = ref("all");
const currentActivityReceiveStatus = ref("all");
const downBoxList: any = ref({});
const showSheet = ref(false);
const showDate = ref(false);
const datePickerRef = ref(null);
const defaultDate: any = ref(Common.getLast30Days(90).firstIndexes);
const columns = ref(Common.getLast30Days(90).columns);
const activeDate: any = ref(2);
const activeDateBtn = ref(0);
const dateRange = ref([dayjs(Common.getLast30Days(90).firstIndexes.join("-")).format("YYYY-MM-DD"), dayjs(new Date()).format("YYYY-MM-DD")]);
const pageData: any = ref({});
const finished = ref(false);
const recordsList: any = ref([]);
const getTypeIcon = (index) => {
	return index == 0 ? type0 : index == 1 ? type1 : index == 2 ? type2 : index == 3 ? type3 : index == 4 ? type4 : "";
};
const cloneSelect = reactive({
	defaultDate: defaultDate.value,
	dateRange: dateRange.value,
	activeDate: activeDate.value,
	welfareCenterRewardType: currentWelfareCenterRewardType.value,
	receiveStatus: currentActivityReceiveStatus.value,
});
const params = reactive({
	pfTimeStartTime: new Date(cloneSelect.dateRange[0]).getTime(),
	pfTimeEndTime: new Date(cloneSelect.dateRange[1]).getTime(),
	pageNumber: 1,
	pageSize: 10,
	welfareCenterRewardType: cloneSelect.welfareCenterRewardType == "all" ? "" : cloneSelect.welfareCenterRewardType,
	receiveStatus: cloneSelect.receiveStatus == "all" ? "" : cloneSelect.receiveStatus,
});

const changeDate = (item, index) => {
	activeDate.value = index;
	dateRange.value[0] = dayjs(new Date().getTime() - 1000 * 60 * 60 * 24 * item.value).format("YYYY-MM-DD");
	dateRange.value[1] = dayjs(new Date().getTime()).format("YYYY-MM-DD");
	defaultDate.value = dateRange.value[0].split("-");
	activeDateBtn.value = 0;
	datePickerRef.value.defaultDate = defaultDate.value.map((item, index) => {
		// 去处月份日期的0
		return index === 1 || index === 2 ? String(Number(item)) : item;
	});
};
const dateNumLabel = [
	{
		label: "近7天",
		value: 7,
	},
	{
		label: "近30天",
		value: 30,
	},
	{
		label: "近90天",
		value: 90,
	},
];
const receiveStatus = {
	0: "领取",
	1: "已领取",
	2: "已过期",
};
onMounted(() => {
	getList();
	getDownBox();
});
const getDownBox = () => {
	welfareCenterApi.getDownBox().then((res) => {
		downBoxList.value = res.data;
	});
};
const oneClickReceive = () => {
	if (pageData.value?.waitReceiveTotal < 1) return;
	welfareCenterApi
		.oneClickReceive()
		.then((res: any) => {
			if (res.code === 10000) {
				showToast("领取成功");
			}
		})
		.finally(() => {
			resetParams();
			getList();
		});
};
const clickReceive = (item) => {
	router.push({
		path: "/welfareCenter/details",
		query: {
			id: item.id,
			welfareCenterRewardType: item.welfareCenterRewardType,
		},
	});
};
const getList = () => {
	params.welfareCenterRewardType = cloneSelect.welfareCenterRewardType == "all" ? "" : cloneSelect.welfareCenterRewardType;
	params.receiveStatus = cloneSelect.receiveStatus == "all" ? "" : cloneSelect.receiveStatus;
	params.pfTimeStartTime = new Date(cloneSelect.dateRange[0]).getTime();
	params.pfTimeEndTime = new Date(cloneSelect.dateRange[1]).getTime();
	welfareCenterApi.pageQuery(params).then((res) => {
		pageData.value = res.data;
		if (params.pageNumber == 1) {
			recordsList.value = res.data.pages.records;
		} else {
			recordsList.value.push(...res.data.pages.records);
		}
		if (res.data.pages.records.length < 1) return (finished.value = true);
		params.pageNumber++;
	});
};
// 删除筛选条件，
const deleteTab = (item, index) => {
	resetParams();
	tabs.value.splice(index, 1);
	if (item.type == "activity_receive_status") {
		currentActivityReceiveStatus.value = "all";
		cloneSelect.welfareCenterRewardType = "all";
	}
	if (item.type == "welfare_center_reward_type") {
		currentWelfareCenterRewardType.value = "all";
		cloneSelect.receiveStatus = "all";
	}
	getList();
};
const changeTab = (item) => {
	if (item === "all") {
		tabs.value = [];
		cloneSelect.welfareCenterRewardType = "";
		cloneSelect.receiveStatus = "";
		resetParams();
		getList();
	}
};
// 处理快捷时间的
const changeDateBtn = (value) => {
	activeDateBtn.value = value;
	datePickerRef.value.defaultDate = dateRange.value[value].split("-").map((item, index) => {
		return index === 1 || index === 2 ? String(Number(item)) : item;
	});
};

// 确认条件筛选框
const confirmSheet = () => {
	tabs.value = [];

	if (currentActivityReceiveStatus.value !== "all") {
		tabs.value.push(downBoxList.value.activityReceiveStatus.find((item) => item.code == currentActivityReceiveStatus.value));
	}
	if (currentWelfareCenterRewardType.value !== "all") {
		tabs.value.push(downBoxList.value.welfareCenterRewardType.find((item) => item.code == currentWelfareCenterRewardType.value));
	}
	cloneSelect.welfareCenterRewardType = currentWelfareCenterRewardType.value;
	cloneSelect.receiveStatus = currentActivityReceiveStatus.value;
	showSheet.value = false;
	resetParams();
	getList();
};
const onCancelSheet = () => {
	showSheet.value = false;
	currentWelfareCenterRewardType.value = cloneSelect.welfareCenterRewardType;
	currentActivityReceiveStatus.value = cloneSelect.receiveStatus;
};
const confirmPicker = () => {
	cloneSelect.activeDate = activeDate.value;
	cloneSelect.dateRange = dateRange.value;
	showDate.value = false;
	resetParams();
	getList();
};
const onCancelPicker = () => {
	showDate.value = false;
	datePickerRef.value.defaultDate = cloneSelect.defaultDate.map((item, index) => {
		return index === 1 || index === 2 ? String(Number(item)) : item;
	});
};

//处理滑动选择时间
const onChangeDate = (value) => {
	dateRange.value[activeDateBtn.value] = value[0] + "-" + value[1].padStart(2, "0") + "-" + value[2].padStart(2, "0");
	const time = (new Date(dateRange.value[1]).getTime() - new Date(dateRange.value[0]).getTime()) / (1000 * 60 * 60 * 24);
	const index = dateNumLabel.findIndex((item) => item.value === time);
	activeDate.value = index !== -1 ? index : null;
};
const resetParams = () => {
	finished.value = false;
	params.pageNumber = 1;
};
</script>

<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
	:deep(.van-popup) {
		@include themeify {
			background-color: themed("BG1");
		}
		padding: 21px 48px;
		.group {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			justify-content: space-between;
			gap: 16px;
			> div {
				padding: 12px 20px;
				width: calc(50% - 20px);
				box-sizing: border-box;
				border-radius: 12px;
				text-align: center;
				@include themeify {
					border: 1px solid themed("Line");
				}
			}
			.active {
				@include themeify {
					border: 1px solid themed("Theme");
				}
			}
		}
		.dateTabs {
			display: flex;
			gap: 16px;
			@include themeify {
				color: themed("T1");
			}
			:deep(.tab) {
				min-width: 150px;
				padding: 12px 20px;
				@include themeify {
					border: 1px solid themed("BG1");
				}
			}
		}
		.dateTitle {
			padding-bottom: 20px;
			@include themeify {
				border-bottom: 1px solid themed("Line");
			}
		}
		.timeBtn {
			color: themed("T1");
			> span {
				display: inline-block;
				flex: 1;
				text-align: center;
				padding: 18px;
				border-radius: 12px;
				@include themeify {
					border: 1px solid themed("Line");
					background: themed(BG3);
				}
			}
			.active {
				@include themeify {
					border: 1px solid themed("Theme");
					color: themed("Theme");
				}
			}
		}
	}
	.allTab {
		font-size: 22px;
		padding-right: 16px;
		text-align: center;
		@include themeify {
			border-right: 1px dashed themed(Line);
		}

		white-space: nowrap;
	}
	.filterBtn {
		font-size: 28px;
		white-space: nowrap;
	}
	.tab {
		border: 1px solid;
		padding: 10px 16px;
		border-radius: 12px;
		font-size: 22px;
		height: 52px;
		line-height: 52px;
		@include themeify {
			border: 1px solid themed(Line);
		}
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tab.active {
		@include themeify {
			border: 1px solid themed(Theme);
		}
	}
}
.tabs {
	display: flex;
	gap: 16px;
	font-size: 30px;
	flex: 1;
	overflow-x: auto;
}

.tabs::-webkit-scrollbar {
	display: none;
}
.content {
	min-height: calc(100vh - 280px);
	@include themeify {
		background: themed(BG10);
	}
	border-radius: 24px;
	.line {
		height: 38px;
	}
	.oneClickReceive {
		background: url("./image/cardBg.png") no-repeat;
		height: 80px;
		border-radius: 16px;
		background-size: 100% 100%;
		padding-left: 80px;
		padding-right: 30px;
		.btn {
			border-radius: 10px;
			text-align: center;
			height: 44px;
			line-height: 44px;
			font-size: 24px;
			padding: 0 34px;
			@include themeify {
				background: themed(Theme);
				color: themed(TB);
			}
			&.disabled {
				opacity: 0.5;
			}
		}
	}
	padding: 20px 24px;
	.card {
		padding-bottom: 20px;
		border-radius: 8px;
		height: 152px;
		margin: 16px 0;
		@include themeify {
			background: themed(BG4);
		}
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px 24px;
		.right,
		.left {
			display: flex;
			flex-direction: column;
			gap: 10px;
			text-align: right;
			.typeIcon {
				width: 36px;
				height: 36px;
			}
			.btn {
				border-radius: 10px;
				text-align: center;
				height: 44px;
				width: 162px;
				line-height: 44px;
				margin-left: auto;
				@include themeify {
					background: themed(Theme);
					color: themed(TB);
				}
			}
		}
		.left {
		}
		.right {
			text-align: right;
		}
	}
	.card.status0 {
		background: url("./image/status0.png") no-repeat;
		background-size: 100% 100%;
	}
	.card.status1 {
		background: url("./image/status1.png") no-repeat;
		background-size: 100% 100%;
	}
	.card.status2 {
		background: url("./image/status2.png") no-repeat;
		background-size: 100% 100%;
	}
}
</style>
