<!-- 体育入口 -->
<template>
	<div class="Sports" ref="sportsContainer">
		<Banner class="Home_Banner" />
		<van-sticky @change="handleStickyChange">
			<!-- 滚球 今日 早盘 冠军 关注 -->
			<div class="tabs">
				<div class="tab" :class="{ 'tab-active': tabActive == key }" v-for="(value, key) of sportTabPushActions" :key="key" @click="onTab(key)">
					{{ value.name }}
				</div>
			</div>

			<!-- 球类 -->
			<div class="list">
				<div class="type-list" v-show="tabActive != 'attention'">
					<div class="type-item" v-for="(item, index) in sportList" v-show="item.count" :key="index" @click="onSportsType(item)">
						<div class="value" :class="{ 'label-active': sportState.sportTypeActive == item?.sportType }">{{ item.count }}</div>
						<div class="icon" :class="{ 'icon-active': sportState.sportTypeActive == item?.sportType }">
							<SvgIcon :iconName="sportState.sportTypeActive == item?.sportType ? item.activeIcon : item.icon" size="5.333333" />
						</div>
						<div class="label" :class="{ 'label-active': sportState.sportTypeActive == item?.sportType }">{{ item.sportName }}</div>
					</div>
				</div>
			</div>

			<div class="operation" :class="{ pt_zero: tabActive == 'attention' }" v-if="tabActive != 'matchResult'">
				<!-- 冠军显示 -->
				<template v-if="tabActive == 'champion'">
					<span class="fs_24 color_TB">{{ $t('sports["冠军"]') }}</span>
				</template>
				<!-- 关注显示 -->
				<div v-if="tabActive == 'attention'" class="bg_BG3 attention">
					<span :class="[attentionSwitch == 'event' && 'active', 'fs_22']" @click="handleAttentionSwitch('event')">{{ $t('sports["赛事收藏"]') }}</span>
					<span :class="[attentionSwitch == 'outright' && 'active', 'fs_22']" @click="handleAttentionSwitch('outright')">{{ $t('sports["冠军盘口"]') }}</span>
				</div>
				<!-- 赛事列表显示 -->
				<template v-if="isShowFilter">
					<div v-if="isShowHot">
						<span :class="['fs_24', (activeSwitchingSort == 'hot' && 'color_TB') || 'color_T3']" @click="switchingSort('hot')">{{ $t('sports["热门"]') }}</span
						>&nbsp;
						<SvgIcon class="sport_switch" :iconName="(activeSwitchingSort == 'time' && '/venueHome/sports/svg/sport_switch2') || '/venueHome/sports/svg/sport_switch'" />
						&nbsp;<span :class="['fs_24', (activeSwitchingSort == 'time' && 'color_TB') || 'color_T3']" @click="switchingSort('time')">{{ $t('sports["时间"]') }}</span>
					</div>
				</template>
				<div>
					<SvgIcon class="sport_filter color_T3" v-if="isShowFilter" @click="filterLeague" iconName="/venueHome/sports/svg/sport_filter" />
					<SvgIcon class="sport_fold color_T3" v-show="isFold" iconName="/venueHome/sports/svg/sport_fold2" @click="onExpandAngCollapse" />
					<SvgIcon class="sport_fold color_T3" v-show="!isFold" iconName="/venueHome/sports/svg/sport_fold" @click="onExpandAngCollapse" />
				</div>
			</div>
		</van-sticky>
		<!-- 赛事列表出口 -->
		<RouterView />
		<!-- 体育购物车 -->
		<SportsShopCart :isShowBet="isShowBet" />
	</div>
</template>

<script setup lang="ts">
import _ from "lodash";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import Banner from "./components/banner/banner.vue";
import pubsub from "/@/pubSub/pubSub";
import { useLoading } from "/@/directives/loading/hooks";
import { useToLogin } from "/@/hooks/toLogin";

import workerManage from "/@/webWorker/workerManage";
import sportsApi from "/@/api/venueHome/sports";
import SportsShopCart from "/@/views/venueHome/sports/components/sportsShopCart/sportsShopCart.vue";
import { WorkerName, SportViewProcessWorkerCommandType } from "/@/enum/workerTransferEnum";
import { formattingResultViewData, formatEvent2League } from "/@/views/venueHome/sports/utils/formattingViewData";
import { sportTabPushActions } from "/@/views/venueHome/sports/sportsMap/sportsSSERequestMap";
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo";
import { Sports } from "/@/views/venueHome/sports/utils/interface";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import { OpenSportEventSourceParams } from "/@/views/venueHome/sports/models/sportEventSourceModel";
import SportsCommonFn from "/@/views/venueHome/sports/utils/common";
import viewSportPubSubEventData from "/@/views/venueHome/sports/hooks/viewSportPubSubEventData";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
import { useUserStore } from "/@/store/modules/user";
const { isHaveToken } = useToLogin();
const sportsBetChampion = useSportsBetChampionStore();
const { startLoading, stopLoading } = useLoading();
const sportsBetEvent = useSportsBetEventStore();
const { startPolling, stopPolling, initSportPubsub, unSubSport, sportsLogin, clearState } = useSportPubSubEvents();
const route = useRoute();
const router = useRouter();
const sportsInfoStore = useSportsInfoStore();
const activeSwitchingSort = ref("time");
const isFold = computed(() => sportsBetEvent.isFold);
const attentionSwitch = computed(() => sportsBetEvent.attentionType);
const store = useUserStore();

const isShowBet = computed(() => {
	if (tabActive.value != "champion" && sportsBetEvent.attentionType == "event") {
		// 是赛事
		return true;
	} else {
		// 是冠军
		return false;
	}
});
/**
 * @description 球类列表
 */
const sportList = computed(() => viewSportPubSubEventData.viewSportData.sports);

/**
 * @description 是否显示过滤  冠军与关注不展示 时间热门切换与联赛筛选
 */
const isShowFilter = computed(() => {
	return tabActive.value != "champion" && tabActive.value != "attention";
});
//只有足球和篮球显示热门与时间切换
const isShowHot = computed(() => {
	return [1, 2].includes(Number(route.params.sportType));
});
/**
 * @description tab切换的值
 */
type TabOptions = "rollingBall" | "todayContest" | "morningTrading" | "champion" | "attention" | "matchResult";

/**
 * @description 组件挂载之前根据路由设置选中的tab
 */
const tabActive = ref<TabOptions>("rollingBall");

/**
 * @description
 */
const sportState = reactive({ sportTypeActive: null as number | null });

// /sports/league/select/:sportType
const filterLeague = () => {
	// const leagueList = formatEvent2League(viewSportPubSubEventData.viewSportData.childrenViewData[Number(route.params.sportType)]);
	// sportsBetEvent.setSelectLeaguesList(leagueList);
	router.push(`/venueHome/sports/league/select/${sportState.sportTypeActive}`);
};

const handleAttentionSwitch = async (val) => {
	//初始化折叠状态
	clearExpand();
	sportsBetEvent.setAttentionType(val);
	//清理childrenviewData
	viewSportPubSubEventData.clearEventsState();
};

const onExpandAngCollapse = () => {
	pubsub.publish(pubsub.PubSubEvents.SportEvents.onExpandAngCollapse.eventName, isFold.value);
};

// 注册一个钩子，在组件被挂载之前被调用。
onBeforeMount(() => {
	//初始化体育
	initSport();
});

// 注册一个钩子，在组件实例被卸载之前调用。
onBeforeUnmount(() => {
	// 卸载体育
	unSport();
	// 关闭登录接口轮询
	stopPolling();
	// 清除体育数据缓存
	// clearStoreInfo();
});

// 清楚购物车数据内存
const clearStoreInfo = () => {
	// 清空购物车数据状态
	sportsBetEvent.clearShopCart();
	// 清空冠军购物车数据状态
	sportsBetChampion.clearChampionShopCart();
	// 清空体育状态信息
	sportsInfoStore.clearStoreInfo();
};

// 判断是否进入体育子路由 不是则清空购物车数据
onBeforeRouteLeave((to, from) => {
	console.log(to.name);
	if (to.name == "sportsLeagueSelect" || to.name == "sportsMatchResultDetail" || to.name == "sportsEventDetail") {
		console.log("不做任何操作");
	} else {
		console.log("触发清空操作");
		// clearStoreInfo();
	}
});

//初始化体育
const initSport = async () => {
	tabActive.value = route.meta.name as TabOptions;
	// console.warn("第一步主备开启线程");
	//开启体育线程
	workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	//体育登录
	sportsLogin().then((res) => {
		if (res) {
			initSportPubsub();
			openSportPush();
			if (store.token) {
				// 开始轮询登录接口
				startPolling();
				//获取关注列表
				// getAttention();
				pubsub.subscribe(pubsub.PubSubEvents.SportEvents.attentionChange.eventName, async () => {
					await getAttention();
					openAttentionSSE();
				});
			}
		}
	});
};

/**
 * @description 发送指令到体育视图处理线程 开启SSE推送
 */
const openSportPush = async () => {
	//线程名称 体育视图处理线程
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.workerName = WorkerName.sportViewProcessWorker;
	//线程指令 体育eventSource 指令
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.commandType = SportViewProcessWorkerCommandType.sportEventSource;
	const params = {
		apiUrl: SportsCommonFn.getSportPushApiUrl(),
		token: sportsInfoStore.getSportsToken,
		language: SportsCommonFn.getSportLanguage(),
	};
	// console.warn("第二步 准备发送指令到线程管理器");
	//如果当前激活的tab是 滚球
	// console.log("tabActive.value", tabActive.value);
	if (tabActive.value == "rollingBall") {
		startLoading();
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.rollingBall.openSport, params);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);

		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.rollingBall.openEvents, params);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		stopLoading();
	}

	//如果当前激活的tab是 今日
	else if (tabActive.value == "todayContest") {
		startLoading();
		const { startDate, endDate } = SportsCommonFn.getResultDateRange(SportsCommonFn.todayDate());
		const queryParams = {
			params: {
				query: `$filter=sportType in (${SportsCommonFn.getRequestSportsType()})`,
				from: startDate,
				until: endDate,
			},
		};
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.todayContest.openSport, params, queryParams);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.todayContest.openEvents, params, queryParams);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		stopLoading();
	}

	//如果当前激活的tab是 早盘
	else if (tabActive.value == "morningTrading") {
		startLoading();
		const sportsParams = {
			query: `$filter=sportType in (${SportsCommonFn.getRequestSportsType()})`,
			from: dayjs.utc().subtract(5, "hour").endOf("day").add(5, "hour").format("YYYY-MM-DDTHH:mm:ss"),
			until: dayjs.utc().add(14, "day").subtract(5, "hour").endOf("day").add(5, "hour").format("YYYY-MM-DDTHH:mm:ss"),
		};
		const date = dayjs.utc().add(1, "day").subtract(5, "hour").format("YYYY-MM-DD");
		const { startDate, endDate } = SportsCommonFn.getResultDateRange(date);
		const queryParams = {
			params: {
				query: `$filter=sportType in (${SportsCommonFn.getRequestSportsType()})`,
				from: startDate,
				until: endDate,
			},
		};
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.morningTrading.openSport, params, sportsParams);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.morningTrading.openEvents, params, queryParams);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		stopLoading();
	}

	//如果当前激活的tab是 冠军
	else if (tabActive.value == "champion") {
		startLoading();
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.champion.openSport, params);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		//清空参数
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
		//参数赋值
		pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.champion.openEvents, params);
		//发送SSE指令到线程管理器
		pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
		stopLoading();
	}

	//如果当前激活的tab是 赛果
	else if (tabActive.value == "matchResult") {
		await getMatchResult();
	}

	//如果当前激活的tab是 关注
	else if (tabActive.value == "attention") {
		openAttentionSSE();
	}
};

const openAttentionSSE = async () => {
	// unSubSport();
	if (tabActive.value != "attention") return;
	clearState();
	workerManage.stopWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	if (attentionSwitch.value == "event") {
		openAttentionEventSSE();
	} else {
		openAttentionOutrightSSE();
	}
};

const openAttentionOutrightSSE = () => {
	startLoading();
	//线程名称 体育视图处理线程
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.workerName = WorkerName.sportViewProcessWorker;
	//线程指令 体育eventSource 指令
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.commandType = SportViewProcessWorkerCommandType.sportEventSource;

	const params = {
		apiUrl: SportsCommonFn.getSportPushApiUrl(),
		token: sportsInfoStore.getSportsToken,
		language: SportsCommonFn.getSportLanguage(),
	};
	const attentionParams = {
		params: {
			query: `$filter= leagueId in (${sportsBetEvent.attentionLeagueIdList.join()})&$orderby=eventDate asc `,
		},
	};
	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.attention.openOutright, params, attentionParams);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	stopLoading();
};

const openAttentionEventSSE = () => {
	startLoading();
	//线程名称 体育视图处理线程
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.workerName = WorkerName.sportViewProcessWorker;
	//线程指令 体育eventSource 指令
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.commandType = SportViewProcessWorkerCommandType.sportEventSource;

	const params = {
		apiUrl: SportsCommonFn.getSportPushApiUrl(),
		token: sportsInfoStore.getSportsToken,
		language: SportsCommonFn.getSportLanguage(),
	};
	const attentionParams = {
		params: {
			query: `$filter= eventId in (${sportsBetEvent.attentionEventIdList.join()})&$orderby=globalShowTime asc `,
		},
	};
	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.attention.openEvents, params, attentionParams);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	stopLoading();
};

watch(
	() => sportsBetEvent.attentionType,
	async () => {
		if (tabActive.value == "attention") {
			await getAttention();
			openAttentionSSE();
		}
	}
);

watch(
	() => viewSportPubSubEventData.viewSportData.sports,
	(newData) => {
		initRouter();
	},
	{
		deep: true,
	}
);

// 监听 热门与时间的切换，如果切换为了热门则调用热门数据
watch(
	() => activeSwitchingSort.value,
	async () => {
		if (activeSwitchingSort.value == "hot") {
			await getHotEvents();
		} else {
			sportsBetEvent.clearHotLeagueList();
		}
	}
);

// 监听路由变化 重置收起展开图标
watch(
	() => route.path,
	() => {
		sportsBetEvent.foldCount = 0;
	}
);

// 每次数据变化初识路由
const initRouter = () => {
	// 首次加载 sportState.sportTypeActive 没有值时，设置默认值为第一位球类列表
	if (sportList.value.length) {
		const firstSportTypePath = "/venueHome/sports/" + tabActive.value + "/" + sportList.value[0]?.sportType;
		if (route.params.sportType) {
			const sport = sportList.value.find((item) => item?.sportType === Number(route.params.sportType));
			if (sport && sport.count > 0) {
				sportState.sportTypeActive = Number(route.params.sportType);
				return;
			}
		}
		sportState.sportTypeActive = sportList.value[0]?.sportType;
		sportsBetEvent.clearLeagueSelect();
		// console.log("firstSportTypePath", firstSportTypePath);

		router.push({ path: firstSportTypePath });
	}
};

// 切换tab时 根据path处理对应的获取数据逻辑
const onTab = async (path) => {
	console.log(path, "====path");
	activeSwitchingSort.value = "time";
	if (tabActive.value == path) {
		return;
	}
	if (path === "matchResult" || path === "attention") {
		try {
			await isHaveToken();
		} catch (error) {
			console.error("Error:", error);
			return; // 如果出错直接退出方法
		}
	}
	unSport();
	//设置当前选中的tab 跳转到对应的路由
	tabActive.value = path;
	// champion,matchResult
	if (path.includes("champion", "matchResult", "attention")) {
		clearFilter();
	}
	if (path != "attention") {
		router.push({ path: `/venueHome/sports/${path}/${route.params.sportType}` });
	} else {
		router.push({ path: `/venueHome/sports/${path}` });
		await getAttention();
	}
	initSportPubsub();
	workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	//开启体育推送
	openSportPush();
};
// 切换热门与时间选中
const switchingSort = (type) => {
	sportsBetEvent.clearLeagueSelect();
	sportsBetEvent.clearHotLeagueList();
	//初始化折叠状态
	clearExpand();
	activeSwitchingSort.value = type;
	pubsub.publish(pubsub.PubSubEvents.SportEvents.onVirtualScrollToTop.eventName, 0);
};

const clearExpand = () => {
	//初始化折叠状态
	sportsBetEvent.setIsFold(true);
	sportsBetEvent.setFoldCount(0);
	onExpandAngCollapse();
};

// 点击球类执行逻辑
const onSportsType = (item: Sports) => {
	clearExpand();
	//切换球类清空筛选
	sportsBetEvent.clearLeagueSelect();
	sportsBetEvent.clearHotLeagueList();
	activeSwitchingSort.value = "time";
	sportState.sportTypeActive = item?.sportType;
	router.push({ path: "/venueHome/sports/" + tabActive.value + "/" + item?.sportType });
};

/**
 * @description 调用获取热门赛事
 */
const getHotEvents = async () => {
	const params = {
		language: "zhcn",
	};
	const res = await sportsApi.GetHotEvents(params).catch((err) => err);
	//获取赛果数量后 添加到sports中
	console.log(res, "======res");
	if (res.data) {
		sportsBetEvent.setHotLeagueList(res.data.events);
	}
};

/**
 * @description 获取关注列表
 */

const getAttention = () => {
	console.log(getAttention, "====getAttention");
	return new Promise((resolve, reject) => {
		sportsApi.getAttentionList().then((res) => {
			console.log(res, "==getAttentionList===");
			if (res.ok) {
				sportsBetEvent.setAttentionList(res.data);
				resolve(res.data);
			} else {
				reject(res);
			}
		});
	});
};

/**
 * @description 调用获取赛果赛事数量接口
 */
const getMatchResult = async () => {
	// 获取当前日期
	const today = SportsCommonFn.todayDate();
	// 获取当前日期往前12天
	const sevenDays = dayjs(today).subtract(6, "day");
	const params = {
		language: "zhcn",
		from: `${sevenDays.add(5, "hour").format("YYYY-MM-DDTHH:mm:ss")}`,
		until: `${dayjs(today).endOf("day").add(5, "hour").format("YYYY-MM-DDTHH:mm:ss")}`,
	};
	const res = await sportsApi.GetSportResults(params).catch((err) => err);
	//获取赛果数量后 添加到sports中
	if (res.data) {
		const sportList = res.data.sportList;
		viewSportPubSubEventData.setSportData({
			...viewSportPubSubEventData.viewSportData,
			sports: formattingResultViewData(sportList),
		});
		//初始化球类路由状态
		initRouter();
	}
};

const clearFilter = () => {
	//切换球类清空筛选
	sportsBetEvent.clearLeagueSelect();
	sportsBetEvent.clearHotLeagueList();
};

//卸载体育
const unSport = () => {
	//取消订阅体育事件
	unSubSport();
	clearState();
	//重置排序为时间
	activeSwitchingSort.value = "time";
	//重置热门列表数据
	sportsBetEvent.clearHotLeagueList();
	// 重置折叠面板状态
	sportsBetEvent.setIsFold(false);
	sportsBetEvent.setFoldCount(0);
	//关注的赛事与冠军初始化为赛事
	handleAttentionSwitch("event");
	workerManage.stopWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
};
const sportsContainer = ref<HTMLElement | null>(null);
const handleStickyChange = (isSticky: boolean) => {
	// 当 sticky 状态改变时，触发滚动开关
	nextTick(() => {
		pubsub.publish("virtualScrollDisabled", !isSticky);
	});
};
</script>

<style lang="scss" scoped>
.Sports {
	height: 100vh;
	overflow-y: auto;
	box-sizing: border-box;

	.operation {
		max-height: 74px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
		@include themeify {
			background-color: themed("BG1");
		}
		box-sizing: border-box;

		.sport_switch {
			width: 18px;
			height: 16px;
		}
		.sport_filter {
			margin-right: 40px;
		}
		.sport_filter,
		.sport_fold {
			width: 26px;
			height: 26px;
		}

		.attention {
			display: flex;
			gap: 8px;
			min-width: 288px;
			height: 48px;
			padding: 4px 8px;
			border-radius: 12px;
			box-sizing: border-box;
			span {
				display: block;
				min-width: 136px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0px 10px;
				@include themeify {
					color: themed("T1");
				}
			}
			.active {
				@include themeify {
					color: themed("TB");
					background-color: themed("Theme");
					border-radius: 10px;
				}
			}
		}
	}
	.pt_zero {
		padding-top: 0px;
	}

	.tabs {
		width: 100%;
		display: flex;
		gap: 12px;
		padding: 36px 24px;
		overflow-x: auto; /* 允许横向滚动 */
		white-space: nowrap; /* 禁止内容换行折行 */
		box-sizing: border-box;
		-ms-overflow-style: none; /* IE 和 Edge */
		&::-webkit-scrollbar {
			/* WebKit 浏览器，如 Chrome、Safari */
			width: 0; /* 隐藏垂直滚动条 */
			height: 0; /* 隐藏水平滚动条 */
		}
		@include themeify {
			background-color: themed("BG1");
		}

		.tab {
			flex: 1;
			min-width: 108px;
			height: 52px;
			padding: 8px 15px;
			border-radius: 12px;
			@include themeify {
				background-color: themed("BG3");
				color: themed("T1");
			}
			text-align: center;
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 36px;
			display: inline-table;
			box-sizing: border-box;
			cursor: pointer;
		}
		.tab-active {
			@include themeify {
				background-color: themed("Theme");
				color: themed("TB1");
			}
		}
	}

	.list {
		position: relative;
		@include themeify {
			background-color: themed("BG1");
		}
		.type-list {
			display: flex;
			align-items: center;
			height: 118px;
			@include themeify {
				// background-color: themed("BG3");
			}
			overflow-x: auto; /* 允许横向滚动 */
			white-space: nowrap; /* 禁止内容换行折行 */
			// box-sizing: border-box;
			-ms-overflow-style: none; /* IE 和 Edge */
			&::-webkit-scrollbar {
				/* WebKit 浏览器，如 Chrome、Safari */
				width: 0; /* 隐藏垂直滚动条 */
				height: 0; /* 隐藏水平滚动条 */
			}
			scrollbar-width: none; /* 隐藏滚动条宽度 */

			.type-item {
				position: relative;
				min-width: 140px;
				text-align: center;
				.value {
					position: absolute;
					top: 0px;
					right: 15px;
					font-family: "PingFang SC";
					@include themeify {
						color: themed("T1");
					}
					font-size: 20px;
					font-weight: 400;
				}
				.icon {
					width: 44px;
					height: 44px;
					margin: 20px auto 0px;
					@include themeify {
						color: themed("T3");
					}
				}
				.icon-active {
					@include themeify {
						color: themed("T3");
					}
				}
				.label {
					margin-top: 8px;
					padding: 0px 5px;
					@include themeify {
						color: themed("T1");
					}
					font-family: "PingFang SC";
					font-size: 22px;
					font-weight: 400;
					line-height: 36px;
					white-space: nowrap; /* 禁止文本换行 */
					overflow: hidden; /* 隐藏超出容器的内容 */
					text-overflow: ellipsis; /* 超出部分显示省略号 */
				}
				.label-active {
					@include themeify {
						color: themed("Theme");
					}
				}
			}
		}
	}
}
.card {
	padding: 0px 24px;
	text-align: center;
}
</style>
