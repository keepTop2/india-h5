<template>
	<div class="BettingMatch">
		<!-- 导航栏 -->
		<VantNavBar :title="title" @onClickLeft="onClickLeft" />
		<div class="content">
			<!-- 标签页 -->
			<!-- <Tabs class="plr" v-model="tabsActiveKey" :list="tabList" /> -->
			<NavBar class="discount_navbar" v-model:active="tabsActiveKey" :tab-list="tabList" @on-change-nav-bar="onChangeNavBar" />
			<!-- 顶部奖池信息 -->
			<div class="top mt_70">
				<div>
					<h3 class="color_TB fs_36 fw_400">{{ $t('betting["比赛奖池"]') }}</h3>
					<span class="money color_Hint fw_700 fs_64 flex">
						<img :src="icon" alt="" />
						{{ PrizePool }}
					</span>
				</div>
				<img class="topimg" :src="topimg" alt="" />
				<SvgIcon class="hint" @click="ruleShow = true" iconName="common/hint" />
			</div>

			<!-- 倒计时和上届冠军信息 -->
			<div class="top2 flex">
				<!-- 倒计时 -->
				<div class="countDown br_8">
					<h3 class="color_TB fw_400 fs_30 mb_12">{{ $t('betting["剩余时间"]') }}</h3>
					<countDown v-model="countDownTime" />
				</div>
				<!-- 上届冠军信息 -->
				<div class="championInfo bg_BG3 br_8">
					<img class="jiao" :src="jiao" alt="" />
					<h3 class="title fw_500 flex fs_24 color_Hint"><img class="size_24" :src="winner" alt="" />{{ $t('betting["上届冠军"]') }}</h3>
					<div class="line_home"></div>
					<div class="winnerInfo flex">
						<img :src="userIcon" alt="" />
						<div>
							<h3 class="userName color_TB fw_600 fs_24">{{ currentData.previous?.userAccount }}</h3>
							<span class="color_TB fs_22 fw_400">{{ $t('betting["奖金"]') }}</span>
							<span class="color_TB fs_20 flex fw_700">
								<img class="size_20" :src="icon" alt="" /><span class="color_Wam-P1">{{ currentData.previous?.awardAmount }}</span
								><span></span> ({{ currentData.previous?.activityAmountPer }}%)
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 用户信息 -->
			<div class="userInfo" v-if="!participation">
				<div class="userInfo_Top">
					<img :src="userIcon" class="userIcon" alt="" />
					<span class="userName color_TB fw_600 fs_24">用户昵称</span>
				</div>
				<div class="userInfo_Bottom">
					<div class="userInfo_Bottom_left">
						<p class="color_T3 fs_24 fw_400 lh_34">{{ $t('betting["我的位置"]') }}</p>

						<p class="color_Hint fs30 fw_400 lh_40">{{ currentData.user?.ranking > 100 ? "100+" : currentData.user?.ranking || 0 }}</p>
					</div>
					<div class="rightLine"></div>
					<div class="userInfo_Bottom_right" style="text-align: center">
						<h3 class="userName color_T3 fs_24 fw_500 lh_38">{{ $t('betting["投注金额"]') }}</h3>
						<span class="fw_500 color_green-00-ff-47 fs_24">${{ currentData.user?.betAmount }}</span>
					</div>
				</div>
				<p class="color_T3 fs_20">
					距离上榜还需 <span class="color_TB">${{ currentData.user?.lackBetAmount }}</span> {{ $t('betting["投注金额"]') }}
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
				<div class="color_T1 flex fs_24 date" @click="showPicker = true">
					<div>
						<button class="bg_Theme color_TB fs_24 fw_400" v-if="JSON.stringify(defaultDate) == JSON.stringify(Common.getLast30Days().defaultIndex)">{{ $t('betting["今天"]') }}</button>
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
							<div class="color_T1">{{ item.userAccount }}</div>
							<div class="color_TB">{{ item.betAmount }}</div>
							<div class="color_TB">{{ item.awardAmount }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 规则说明对话框 -->
			<Dialog class="dialog" :visible="ruleShow" @close="ruleShow = false">
				<template #title>
					<div class="title fs_30 color_TB">规则说明</div>
				</template>
				<div class="color_T1">
					{{ currentData.activityRule }}
				</div>
				<!-- <RulePage /> -->
			</Dialog>
			<van-popup v-model:show="showPicker" round position="bottom">
				<datePicker :columns="Common.getLast30Days().columns" :defaultDate="defaultDate" @confirmPicker="confirmPicker" @cancelPicker="cancelPicker" title="自定义时间" />
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
	{ field: "name", label: "排行" },
	{ field: "userAccount", label: "玩家" },
	{ field: "betAmount", label: "投注金额" },
	{ field: "awardAmount", label: "奖金" },
];

const tableData: any = ref([]);
// 当前选中的标签页
const tabsActiveKey = ref(0);
const currentVenueCode = ref(null);
const currentData: any = ref({});
const PrizePool = ref(0);
const PrizePoolTimer: any = ref(null);
const countDownTimer: any = ref(null);
const countDownTime = ref(0);
// 标签页列表
const tabList: any = ref([]);

// 返回上一页
const onClickLeft = () => {
	router.go(-1);
};

const queryActivityDailyContestVenueCode = async () => {
	await activityApi.queryActivityDailyContestVenueCode().then((res) => {
		currentVenueCode.value = res.data.list[0].id;
		title.value = res.data.activityNameI18nCode;
		console.log(title);

		tabList.value = res.data.list.map((item, index) => {
			return {
				value: item.activityName,
				code: index,
				id: item.id,
			};
		});
	});
};
const queryActivityDailyContest = () => {
	const params = {
		id: currentVenueCode.value,
		day: currentDay.value,
	};
	activityApi.queryActivityDailyContest(params).then((res) => {
		currentData.value = res.data || [];
	});
	activityApi.queryActivityDailyPrizePool(params).then((res) => {
		PrizePool.value = res.data;
	});
	activityApi.queryActivityDailyRecord(params).then((res) => {
		tableData.value = res.data.list;
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
			PrizePool.value = res.data;
		});
		await activityApi.queryActivityDailyRecord(params).then((res) => {
			tableData.value = res.data.list;
		});
		clearTimeout(PrizePoolTimer.value);
		initPrizePool();
	}, 3000);
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
		}
	}
}
</style>
