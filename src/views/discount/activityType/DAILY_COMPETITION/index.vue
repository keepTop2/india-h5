<template>
	<div class="BettingMatch">
		<!-- 导航栏 -->
		<VantNavBar :title="title" @onClickLeft="onClickLeft" />
		<div class="content">
			<!-- 标签页 -->
			<!-- <NavBar class="discount_navbar" v-model:active="tabsActiveKey" :tab-list="tabList.slice(0, 2)" @on-change-nav-bar="onChangeNavBar" :halfTab="true" /> -->
			<NavBar class="discount_navbar" v-model:active="tabsActiveKey" :tab-list="tabList" @on-change-nav-bar="onChangeNavBar" v-if="tabList.length == 2" :halfTab="true" />
			<NavBar class="discount_navbar" v-model:active="tabsActiveKey" :tab-list="tabList" @on-change-nav-bar="onChangeNavBar" v-else />
			<!-- 顶部奖池信息 -->
			<div class="top mt_70">
				<div>
					<h3 class="color_TB1 fs_36 fw_400">{{ $t('betting["比赛奖池"]') }}</h3>
					<div class="line_home"></div>
					<span class="money color_Hint fw_700 fs_64 flex">
						{{ currentData?.currencySymbol }}

						{{ Common.amountConversion(totalRewardsAmount) }}
					</span>
				</div>
				<img class="topimg" :src="topimg" alt="" />
				<SvgIcon class="hint" @click="ruleShow = true" iconName="common/hint" />
			</div>
			<!-- 倒计时和上届冠军信息 -->
			<div class="top2 flex">
				<!-- 倒计时 -->
				<div class="countDown br_8" :style="{ width: !isStart || !currentData.previous ? '100%' : '' }">
					<div style="margin: 0 auto" :style="{ width: !isStart || !currentData.previous ? '50%' : '' }">
						<h3 class="color_TB fw_400 fs_30 mb_12">{{ $t('betting["剩余时间"]') }}</h3>
						<countDown v-model="countDownTime" />
					</div>
				</div>
				<!-- 上届冠军信息 -->
				<div class="championInfo br_8" v-if="isStart && currentData.previous">
					<img class="jiao" :src="jiao" alt="" />
					<h3 class="title fw_500 flex fs_24 color_Hint"><img class="size_24" :src="winner" alt="" />{{ $t('betting["上届冠军"]') }}</h3>
					<div class="line_home"></div>
					<div class="winnerInfo flex">
						<img :src="userIcon" alt="" />
						<div>
							<h3 class="userName color_TB fw_600 fs_24">{{ currentData.previous?.userAccount }}</h3>
							<span class="color_TB1 fs_22 fw_400">{{ $t('betting["奖金"]') }}</span>
							<span class="color_TB fs_20 flex fw_700">
								<span class="color_Wam-P1"> {{ currentData?.currencySymbol }}{{ Common.amountConversion(currentData.previous?.awardAmount) }}</span
								><span></span><span v-if="currentData.previous?.activityAmountPer"> ({{ currentData.previous?.activityAmountPer }}%)</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 用户信息 -->
			<div class="userInfo" v-if="!participation">
				<div class="userInfo_Top">
					<VantLazyImg :src="useUserStore().userInfo?.avatarFileUrl" class="userIcon" alt="" />
					<span class="userName color_TB1 fw_600 fs_24">{{ currentData.user?.userAccount }}</span>
				</div>
				<div class="userInfo_Bottom">
					<div class="userInfo_Bottom_left">
						<p class="color_T3 fs_24 fw_400 lh_34">{{ $t('betting["我的位置"]') }}</p>
						<p class="color_Hint fs_24 fw_400 lh_40">{{ isStart ? (currentData.user?.ranking > 100 ? "100+" : currentData.user?.ranking || 0) : "--" }}</p>
					</div>
					<div class="rightLine"></div>
					<div class="userInfo_Bottom_right" style="text-align: center">
						<h3 class="userName color_T3 fs_24 fw_500 lh_38">{{ $t('betting["投注金额"]') }}</h3>
						<span class="fw_500 color_green-00-ff-47 fs_24"
							><span>{{ isStart ? useUserStore().getUserInfo.currencySymbol + "" + currentData.user?.betAmount : "--" }}</span></span
						>
					</div>
				</div>
				<p class="color_T3 fs_20" v-if="currentData.user?.userStatus == 3">
					{{ $t('betting["距离上榜还需"]') }} <span class="color_TB1">{{ useUserStore().getUserInfo.currencySymbol }} {{ currentData.user?.lackBetAmount }}</span> {{ $t('betting["投注金额"]') }}
				</p>
				<p class="color_T3 fs_20" v-if="currentData.user?.userStatus == 2">
					{{ $t('betting["距离上一名还需"]') }} <span class="color_TB1">{{ useUserStore().getUserInfo.currencySymbol }} {{ currentData.user?.lackBetAmount }}</span> {{ $t('betting["投注金额"]') }}
				</p>
				<p class="color_T3 fs_20" v-if="currentData.user?.userStatus == 1">
					{{ $t('betting["第二名还需"]') }} <span class="color_TB1">{{ useUserStore().getUserInfo.currencySymbol }} {{ currentData.user?.lackBetAmount }}</span> {{ $t('betting["投注金额"]')
					}}{{ $t('betting["超于您"]') }}
				</p>
			</div>

			<!-- 参与按钮 -->
			<div class="participation" v-else>
				<p class="color_T1 fs_24 fw_400">{{ $t('betting["描述"]') }}</p>
				<a class="color_TB bg_Theme">{{ $t('betting["立即参与"]') }}</a>
			</div>

			<!-- 投注表格 -->
			<div class="BettingTable mt_24">
				<!-- 日期和历史按钮 -->
				<div class="color_T1 flex fs_24 date" @click="showPicker = true" v-if="isStart">
					<div>
						<button class="bg_Theme fs_24 fw_400 color_TB1" v-if="JSON.stringify(defaultDate) == JSON.stringify(Common.getLast30Days().defaultIndex)">{{ $t('betting["今天"]') }}</button>
						{{ defaultDate[0] + "/" + defaultDate[1] + "/" + defaultDate[2] }}
					</div>
					<SvgIcon @click="dialogShow = true" class="history size_32" iconName="common/history" />
				</div>

				<div class="table">
					<div class="header">
						<div v-for="(item, index) in columns" :key="index" class="color_TB">
							{{ item.label }}
						</div>
					</div>
					<div class="body">
						<div v-for="(item, index) in tableData" :key="index" class="cell" :class="item.specialShow ? 'active' : ''">
							<div>
								<span class="home_paihang" v-if="index + 1 == 1">
									<SvgIcon iconName="venueHome/bettingMatch/jinpai" class="pt_8" />
								</span>
								<span class="home_paihang" v-else-if="index + 1 == 2">
									<SvgIcon iconName="venueHome/bettingMatch/yinpai" class="pt_8" />
								</span>
								<span class="home_paihang" v-else-if="index + 1 == 3">
									<SvgIcon iconName="venueHome/bettingMatch/tongpai" class="pt_8" />
								</span>
								<span v-else class="color_T1">
									{{ index + 1 }}
								</span>
							</div>
							<div :class="item.specialShow ? 'color_TB1' : 'color_T1'">{{ item.userAccount }}</div>
							<div class="color_TB">{{ item.betCurrencySymbol }} {{ item.betAmount }}</div>
							<div class="color_TB">{{ userInfo.platCurrencySymbol }} {{ Common.amountConversion(item.awardAmount) }}</div>
						</div>
					</div>
				</div>

				<Nodata v-if="!isStart && tableData.length < 1"></Nodata>
			</div>
			<div class="color_T1 text-center mt_24 fs_20">{{ $t('betting["数据每5分钟更新"]') }}</div>
			<!-- 规则说明对话框 -->
			<Dialog class="dialog" :visible="ruleShow" @close="ruleShow = false">
				<template #title>
					<div class="title fs_30 color_TB">{{ $t('betting["规则说明"]') }}</div>
				</template>
				<div class="color_T1">
					<div v-html="currentData.activityRule" class="htmlDesc"></div>
				</div>
				<!-- <RulePage /> -->
			</Dialog>
			<van-popup v-model:show="showPicker" round position="bottom">
				<datePicker :columns="Common.getLast30Days().columns" :defaultDate="defaultDate" @confirmPicker="confirmPicker" @cancelPicker="cancelPicker" :title="$t(`betting['自定义时间']`)" />
				<!-- <van-picker title="标题" :columns="Common.getLast30Days().columns" @confirm="confirmPicker" v-model="Common.getLast30Days().defaultIndex" cancel-button-text="X" /> -->
			</van-popup>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: "DAILY_COMPETITION",
});
/**
 * @description 每日竞赛页面
 */
import { ref, computed } from "vue";
import Dialog from "./components/Dialog/Dialog.vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import countDown from "./components/CountDown/CountDown.vue";
import datePicker from "./components/datePicker.vue";
import { useUserStore } from "/@/store/modules/user";
import jiao from "./images/jiao.png";
import icon from "./images/icon.png";
import userIcon from "./images/userIcon.png";
import winner from "./images/winner.png";
import topimg from "./images/topimg.png";
import { activityApi } from "/@/api/activity";
import NavBar from "../../components/Navbar.vue";
import Common from "/@/utils/common";
import { i18n } from "/@/i18n/index";
const $: any = i18n.global;
const router = useRouter();

// 控制规则说明对话框显示
const ruleShow = ref(false);
// 控制历史对话框显示
const dialogShow = ref(false);

const UserStore = useUserStore();
// 获取用户信息
const userInfo = computed(() => {
	return UserStore.getUserInfo;
});
const currentDay = ref("");
const showPicker = ref(false);
// 控制是否显示参与按钮
const participation = ref(false);
const defaultDate = ref(Common.getLast30Days().defaultIndex);
// 表格数据和列定义
const title = ref("");
const columns = [
	{ field: "name", label: $.t(`betting['排行']`) },
	{ field: "userAccount", label: $.t(`betting['玩家']`) },
	{ field: "betAmount", label: $.t(`betting['投注金额']`) },
	{ field: "awardAmount", label: $.t(`betting['奖金']`) },
];

const tableData: any = ref([]);
// 当前选中的标签页
const tabsActiveKey = ref(0);
const currentVenueCode = ref(null);
const currentData: any = ref({});
const totalRewardsAmount = ref(0);
const PrizePoolTimer: any = ref(null);
const countDownTimer: any = ref(null);
const countDownTime = ref(0);
// 标签页列表
const tabList: any = ref([]);
const isStart = ref(false);
// 返回上一页
const onClickLeft = () => {
	router.go(-1);
};

const queryActivityDailyContestVenueCode = async () => {
	await activityApi.queryActivityDailyContestVenueCode().then((res) => {
		currentVenueCode.value = res.data.list[0].id;
		title.value = res.data.activityNameI18nCode;

		tabList.value = res.data.list.map((item, index) => {
			return {
				value: item.activityName,
				code: index,
				id: item.id,
			};
		});
	});
};
const queryActivityDailyContest = async () => {
	const params = {
		id: currentVenueCode.value,
		day: currentDay.value,
	};
	await activityApi.queryActivityDailyContest(params).then((res) => {
		currentData.value = res.data || [];
		totalRewardsAmount.value = res.data.totalRewardsAmount;
		isStart.value = currentData.value.type;
	});
	if (!currentData.value.type) return;
	activityApi.queryActivityDailyPrizePool(params).then((res) => {
		totalRewardsAmount.value = res.data;
	});
	activityApi.queryActivityDailyRecord(params).then((res) => {
		tableData.value = res.data?.list;
	});
	initPrizePool();
};

const initPrizePool = () => {
	PrizePoolTimer.value = setTimeout(async () => {
		const params = {
			id: currentVenueCode.value,
			day: currentDay.value,
		};
		await activityApi.queryActivityDailyPrizePool(params).then((res) => {
			totalRewardsAmount.value = res.data;
		});
		await activityApi.queryActivityDailyRecord(params).then((res) => {
			tableData.value = res.data?.list;
		});
		clearTimeout(PrizePoolTimer.value);
		initPrizePool();
	}, 300000);
};

const onChangeNavBar = async (value) => {
	clearInterval(PrizePoolTimer.value);
	currentDay.value = "";
	currentVenueCode.value = tabList.value[tabsActiveKey.value].id;
	queryActivityDailyContest();
};
const confirmPicker = (value) => {
	const day = value.selectedValues[0] + "-" + value.selectedValues[1].padStart(2, "0") + "-" + value.selectedValues[2].padStart(2, "0");
	defaultDate.value = value.selectedValues;
	showPicker.value = false;
	clearInterval(PrizePoolTimer.value);
	currentDay.value = day;
	initPrizePool();
};

const cancelPicker = () => {
	showPicker.value = false;
};
onMounted(async () => {
	await queryActivityDailyContestVenueCode();
	queryActivityDailyContest();
	initCountDownTime();
});

const initCountDownTime = () => {
	countDownTime.value = Math.floor((new Date(new Date().setHours(23, 59, 59, 0)).getTime() - new Date().getTime()) / 1000);
	countDownTimer.value = setInterval(() => {
		if (countDownTime.value > 0) {
			countDownTime.value -= 1;
		} else {
			clearInterval(countDownTimer.value);
		}
	}, 1000);
};

onBeforeUnmount(() => {
	clearTimeout(PrizePoolTimer.value);
	clearInterval(countDownTimer.value);
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
.table {
	font-size: 24px;
	.header {
		display: flex;
		justify-content: space-around;
		margin-bottom: 22px;
		> div {
			width: 25%;
			text-align: center;
		}
	}
	.body {
		.cell {
			display: flex;
			justify-content: space-around;
			height: 52px;
			margin-bottom: 22px;
			line-height: 52px;

			> div {
				width: 25%;
				text-align: center;
			}
		}
		.active {
			background: url("./images/table_active_bg.png") no-repeat;
			background-size: 100% 100%;
			.colorT1 {
				@include themeify {
					color: themed("TB1");
				}
			}
			div {
				@include themeify {
					color: themed("TB1");
				}

				span {
					@include themeify {
						color: themed("TB1");
					}
				}
			}
		}
	}
}
:deep(.discount_navbar) {
	.van-tab__text {
		font-size: 30px;
	}
}
.line_home {
	height: 0.5px;
	width: 221px;
	margin-right: 8px;
	transform: scale(1, 0.3);
	@include themeify {
		background-color: themed("TB1");
	}
}
</style>
