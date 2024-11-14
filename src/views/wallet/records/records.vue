<template>
	<!-- 活动 -->
	<div>
		<VantNavBar :title="'交易记录'" @onClickLeft="router.back()" />
	</div>

	<div class="wrapper p_24">
		<div class="flex">
			<div class="mb_15 allTab color_T1">
				<div class="tab" @click="changeTab('all')" :class="tabs.length == 0 ? 'active' : ''">全部</div>
			</div>
			<div class="tabs mb_20">
				<span v-for="(item, index) in tabs" class="tab color_T1 active" :class="activeTab === item ? 'active' : ''" :key="index">
					{{ item.value }} <SvgIcon class="arrow ml_20 color_Theme" iconName="common/close_theme" size="24px" @click="deleteTab(item, index)" />
				</span>
			</div>
			<div class="mb_15 filterBtn color_T1 fs_28" @click="showSheet = true">筛选<SvgIcon class="arrow ml_5" iconName="common/arrowDown" size="24px" /></div>
		</div>
		<div class="content">
			<div>
				<div class="header color_T3 mb_16 mt_16" @click="showDate = true">
					{{
						Array.isArray(downBoxList.trade_date_num) && downBoxList.trade_date_num.length > 0 && cloneSelect.activeDate !== null
							? downBoxList.trade_date_num[cloneSelect.activeDate].value
							: cloneSelect.dateRange[0] + " 至 " + cloneSelect.dateRange[1]
					}}
					<SvgIcon class="arrow ml_5" iconName="common/arrowDown" size="24px" />
				</div>
			</div>
			<van-list @load="getList" :immediate-check="false" :finished="finished">
				<div class="card" v-for="item in recordsList" :class="'status' + item.tradeStatus" @click="goToDetails(item)">
					<div class="cell">
						<div class="left">
							<img class="icon mr_8" :src="getTypeIcon(item)" alt="" />
							<span class="title">{{ item.tradeWayTypeText }}</span>
						</div>
						<div class="right">
							<span class="value">+{{ Common.getInstance().formatFloat(Common.thousands(item.tradeAmount)) }}</span>
							<span>&nbsp;</span>
							<span class="value">{{ UserStore.userInfo.mainCurrency }}</span>
						</div>
					</div>
					<div class="cell mt_12 pb_16 border">
						<div class="left text">{{ item.tradeTime }}</div>
						<div class="right text" :class="tradeStatus[item.tradeStatus]">{{ item.tradeStatusText }}</div>
					</div>
					<div class="footer_cell mt_16">
						<div class="left text">
							<span>订单号：</span>
							<span>{{ item.orderNo }}</span>
							<SvgIcon class="icon ml_4" @click.stop="Common.getInstance().copy(item.orderNo)" iconName="common/copy2" />
						</div>
						<div class="right">
							<SvgIcon class="arrow" iconName="common/arrow" />
						</div>
					</div>
				</div>
				<Nodata v-if="recordsList.length == 0"></Nodata>
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
					<div v-for="item in downBoxList?.trade_type" class="color_T1" @click="currentWelfareCenterRewardType = item.code" :class="currentWelfareCenterRewardType == item.code ? 'active' : ''">
						{{ item.value }}
					</div>
				</div>
			</div>
			<div class="mt_16 mb_16">
				<div class="color_TB fs_32 mt_16 mb_16">状态筛选</div>
				<div class="group mb_32">
					<div class="color_T1" :class="currentActivityReceiveStatus == 'all' ? 'active' : ''" @click="currentActivityReceiveStatus = 'all'">全部</div>
					<div
						v-for="item in downBoxList?.deposit_withdraw_customer_status"
						class="color_T1"
						@click="currentActivityReceiveStatus = item.code"
						:class="currentActivityReceiveStatus == item.code ? 'active' : ''"
					>
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
				<div v-for="(item, index) in downBoxList?.trade_date_num" class="tab" @click="changeDate(item, index)" :class="activeDate === index ? 'active' : ''">
					{{ item.value }}
				</div>
			</div>
			<div class="color_TB fs_32 mb_16 mt_32">筛选时间</div>
			<div class="flex timeBtn">
				<span :class="activeDateBtn == 0 ? 'active' : ''" @click="changeDateBtn(0)">{{ cloneSelect.dateRange[0] }}</span>
				至
				<span :class="activeDateBtn == 1 ? 'active' : ''" @click="changeDateBtn(1)"> {{ cloneSelect.dateRange[1] }}</span>
			</div>
			<div class="color_Hint fs_20 text-center mt_20 mb_20">当前系统支持查询最近90日的记录</div>
			<datePicker :columns="columns" ref="datePickerRef" @onChange="onChangeDate"></datePicker>
		</van-action-sheet>
	</div>
</template>

<script setup lang="ts">
import router from "/@/router";
import { walletApi } from "/@/api/wallet";
import datePicker from "./datePicker.vue";
import { useUserStore } from "/@/store/modules/user";
import Common from "/@/utils/common";
import type1 from "./image/type1.png";
import type2 from "./image/type2.png";
import type3 from "./image/type3.png";
import type4 from "./image/type4.png";
import type5 from "./image/type5.png";
import dayjs from "dayjs";
const UserStore = useUserStore();
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
const activeDate: any = ref(3);
const activeDateBtn = ref(0);
const dateRange = ref([dayjs(Common.getLast30Days(90).firstIndexes.join("-")).format("YYYY-MM-DD"), dayjs(new Date()).format("YYYY-MM-DD")]);
const loading = ref(false);
const pageData: any = ref({});
const finished = ref(false);
const recordsList: any = ref([]);

const getTypeIcon = (item) => {
	if (item.tradeWayType === "bank_card_recharge" || item.tradeWayType === "bank_card_withdraw") {
		return type1;
	} else if (item.tradeWayType === "electronic_wallet_recharge" || item.tradeWayType === "electronic_wallet_withdraw") {
		return type2;
	} else if (item.tradeWayType === "crypto_currency_recharge" || item.tradeWayType === "crypto_currency_withdraw") {
		return type3;
	} else if (item.tradeWayType === "superior_transfer") {
		return type4;
	} else if (item.tradeWayType === "manual_up" || item.tradeWayType === "manual_down") {
		return type5;
	}
};

const cloneSelect = reactive({
	defaultDate: defaultDate.value,
	dateRange: dateRange.value,
	activeDate: activeDate.value,
	tradeType: currentWelfareCenterRewardType.value,
	tradeStatus: currentActivityReceiveStatus.value,
});

const params = reactive({
	startTime: new Date(cloneSelect.dateRange[0]).getTime(),
	endTime: new Date(cloneSelect.dateRange[1]).getTime(),
	pageNumber: 1,
	pageSize: 10,
	tradeType: cloneSelect.tradeType == "all" ? "" : cloneSelect.tradeType,
	tradeStatus: cloneSelect.tradeStatus == "all" ? "" : cloneSelect.tradeStatus,
});

const changeDate = (item, index) => {
	// 将 code 转为正数，如果 code 为 0 则使用 1
	const days = Math.abs(item.code) || 1;
	activeDate.value = index;
	dateRange.value[0] = dayjs(new Date().getTime() - 1000 * 60 * 60 * 24 * days).format("YYYY-MM-DD");
	dateRange.value[1] = dayjs(new Date().getTime()).format("YYYY-MM-DD");
	defaultDate.value = dateRange.value[0].split("-");
	activeDateBtn.value = 0;
	datePickerRef.value.defaultDate = defaultDate.value.map((item, index) => {
		// 去处月份日期的0
		return index === 1 || index === 2 ? String(Number(item)) : item;
	});
};
const dateNumLabel = [
	// {
	// 	label: "今日",
	// 	value: 1,
	// },
	// {
	// 	label: "近7天",
	// 	value: 7,
	// },
	// {
	// 	label: "近30天",
	// 	value: 30,
	// },
	// {
	// 	label: "近90天",
	// 	value: 90,
	// },
];
const tradeStatus = {
	0: "F2",
	1: "Wam",
	2: "Hint",
};
onMounted(() => {
	getList();
	getDownBox();
});
const getDownBox = () => {
	walletApi.getDownBox().then((res) => {
		downBoxList.value = res.data;
	});
};

const getList = () => {
	if (loading.value) return;
	loading.value = true;
	console.log(cloneSelect);
	params.tradeType = cloneSelect.tradeType == "all" ? "" : cloneSelect.tradeType;
	params.tradeStatus = cloneSelect.tradeStatus == "all" ? "" : cloneSelect.tradeStatus;
	params.startTime = new Date(cloneSelect.dateRange[0] + " 00:00:00").getTime();
	params.endTime = new Date(cloneSelect.dateRange[1] + " 23:59:59").getTime();
	walletApi
		.tradeRecordList(params)
		.then((res) => {
			pageData.value = res.data;
			if (params.pageNumber == 1) {
				recordsList.value = res.data.records;
			} else {
				recordsList.value.push(...res.data.records);
			}
			if (res.data.records.length < 1) return (finished.value = true);
			params.pageNumber++;
		})
		.finally(() => {
			loading.value = false;
		});
};
// 删除筛选条件，
const deleteTab = (item, index) => {
	tabs.value.splice(index, 1);
	resetParams();
	if (item.type == "activity_receive_status") {
		currentActivityReceiveStatus.value = "all";
		cloneSelect.tradeStatus = "all";
		getList();
	}
	if (item.type == "welfare_center_reward_type") {
		currentWelfareCenterRewardType.value = "all";

		cloneSelect.tradeType = "all";
		getList();
	}
};
const changeTab = (item) => {
	if (item === "all") {
		tabs.value = [];
		cloneSelect.tradeType = "";
		cloneSelect.tradeStatus = "";
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
		tabs.value.push(downBoxList.value.trade_type.find((item) => item.code == currentActivityReceiveStatus.value));
	}
	if (currentWelfareCenterRewardType.value !== "all") {
		tabs.value.push(downBoxList.value.deposit_withdraw_customer_status.find((item) => item.code == currentWelfareCenterRewardType.value));
	}
	cloneSelect.tradeType = currentWelfareCenterRewardType.value;
	cloneSelect.tradeStatus = currentActivityReceiveStatus.value;
	showSheet.value = false;
	resetParams();
	getList();
};
const onCancelSheet = () => {
	showSheet.value = false;
	currentWelfareCenterRewardType.value = cloneSelect.tradeType;
	currentActivityReceiveStatus.value = cloneSelect.tradeStatus;
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
	const index = downBoxList?.trade_date_num.findIndex((item) => Math.abs(item.code) || 1 === time);
	activeDate.value = index !== -1 ? index : null;
};
const resetParams = () => {
	pageData.value = {};
	finished.value = false;
	params.pageNumber = 1;
};

const goToDetails = (item) => {
	router.push({
		path: "/wallet/rechargeDetails",
		query: {
			tradeType: item.tradeType,
			tradeWayType: item.tradeWayType,
			orderNo: item.orderNo,
		},
	});
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
			.tab {
				color: themed("Theme");
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
			color: themed("Theme");
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

	padding: 20px 24px;
	.card {
		padding-bottom: 20px;
		border-radius: 8px;
		height: 155px;
		margin: 16px 0;
		@include themeify {
			background: themed(BG4);
		}
		padding: 20px 24px;
	}
	.cell,
	.footer_cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.border {
		border-bottom: 1px solid;
		@include themeify {
			border-color: themed(Line);
		}
	}
	.left,
	.right {
		display: flex;
		align-items: center;
	}
	.icon {
		width: 36px;
		height: 36px;
	}
	.arrow {
		width: 24px;
		height: 24px;
		@include themeify {
			color: themed(T3);
		}
	}
	.title {
		@include themeify {
			color: themed(T1);
		}
		font-family: "PingFang SC";
		font-size: 26px;
		font-weight: 400;
	}
	.value {
		@include themeify {
			color: themed(TB);
		}
		font-family: "DIN Alternate";
		font-size: 36px;
		font-weight: 700;
	}
	.text {
		@include themeify {
			color: themed(T2);
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}
	.Wam {
		@include themeify {
			color: themed(Wam-P1) !important;
		}
	}
	.F2 {
		@include themeify {
			color: themed(F2) !important;
		}
	}
	.Hint {
		@include themeify {
			color: themed(Hint) !important;
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
