<template>
	<div class="Home_Page bg_BG1">
		<!-- 轮播图 -->
		<Banner class="Home_Banner" />
		<div class="Home_Content">
			<!-- 热门游戏 -->
			<h3 class="title" v-if="hotGames.length">
				<SvgIcon iconName="home/fire" alt="" />
				{{ $t('home["热门游戏"]') }}
			</h3>
			<HotGame class="m24" @queryCollection="queryCollection" :gameInfoList="hotGames" />
			<!-- 喜欢的游戏 -->
			<h3 class="title" v-show="isShowCollect">
				<SvgIcon iconName="home/star" alt="" />
				{{ $t('home["喜欢的游戏"]') }}
			</h3>
			<CollectGames v-show="isShowCollect" @queryCollection="queryCollection" :collectList="collectList" class="m24" />
			<h3 class="title_more" v-show="eventList?.length">
				<span class="flex_align_center">
					<SvgIcon iconName="home/event_game" alt="" />
					{{ $t('home["我们的游戏"]') }}
				</span>
				<span class="more fw_400 fs_28 color_T1" @click="router.push({ name: 'rollingBallList', params: { sportType: 1 } })">{{ $t(`home["更多"]`) }}</span>
			</h3>
			<EventList v-show="eventList?.length" v-for="(event, index) in eventList" class="m24" :event="event" :key="index" />
			<!-- 体育购物车 -->
			<SportsShopCart :isShowBet="true" />
			<template v-for="(item, index) in lobbyTopGame" :key="index">
				<h3 class="title_more">
					<span class="flex_align_center">
						<VantLazyImg :src="item.icon" />
						{{ item.name }}
					</span>
					<span class="more fw_400 fs_28 color_T1" @click="handleMore(item?.gameOneId)">{{ $t(`home["更多"]`) }}</span>
				</h3>
				<GameLayout v-if="item.gameInfoList.length" :gameInfoList="item.gameInfoList" class="m24" />
				<GameBigPic v-else class="m24" />
			</template>
			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/electronic" alt="" />
					{{ $t('home["热门电竞"]') }}
				</span>
			</h3>
			<GameBigPic class="m24" />

			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/game_fowl" alt="" />
					{{ $t('home["热门斗鸡"]') }}
				</span>
			</h3>
			<GameBigPic class="m24" />
			<!-- 赞助 -->
			<Sponsor :data="PartnerList" />
			<!-- 转账方式 -->
			<Currency :data="PaymentVendorList" />
			<!-- 负责任游戏 -->
			<Footer />
		</div>
		<!-- 红包雨倒计时 -->
		<redbagRainCountdown v-model="showCountdown" :redBagInfo="redBagInfo" />
		<!-- 红包雨页面 -->
		<rainPage v-if="showRedBagRain" v-model="showRedBagRain" :redBagInfo="redBagInfo" />
	</div>
</template>

<script setup lang="ts">
import sportsApi from "/@/api/venueHome/sports";
import HomeApi from "/@/api/home";
import GameApi from "/@/api/venueHome/games";
import workerManage from "/@/webWorker/workerManage";
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import SportsShopCart from "/@/views/venueHome/sports/components/sportsShopCart/sportsShopCart.vue";
import rainPage from "/@/views/discount/activityType/RED_BAG_RAIN/rainPage.vue";
import redbagRainCountdown from "../../components/redbagRainCountdown/index.vue";
//热门游戏
import Banner from "./Banner/banner.vue";
//热门游戏
import HotGame from "./HotGame/HotGame.vue";
//体育赛事盘口列表
import EventList from "./EventList/EventList.vue";
//关注的游戏列表
import CollectGames from "./CollectGames/CollectGames.vue";
//游戏6格布局
import GameLayout from "./GameLayout/GameLayout.vue";
//游戏大图
import GameBigPic from "./GameBigPic/GameBigPic.vue";
// 赞助
import Sponsor from "./Sponsor/sponsor.vue";
// 转账方式
import Currency from "./Currency/Currency.vue";
// 负责任游戏
import Footer from "./Footer/Footer.vue";
import { useUserStore } from "/@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import pubsub from "/@/pubSub/pubSub";
import { SportViewProcessWorkerCommandType, WorkerName } from "/@/enum/workerTransferEnum";
import SportsCommonFn from "../venueHome/sports/utils/common";
import { OpenSportEventSourceParams } from "../venueHome/sports/models/sportEventSourceModel";
import { SportPushApi, WebToPushApi } from "../venueHome/sports/enum/sportEventSourceEnum";
import viewSportPubSubEventData from "../venueHome/sports/hooks/viewSportPubSubEventData";
import { GameInfoList, LobbyTopGame } from "/#/game";
import activitySocketService from "/@/utils/activitySocketService";
import { useActivityStore } from "/@/store/modules/activity";
import { computed, onActivated, onDeactivated, ref, watch } from "vue";
const websocketService: any = activitySocketService.getInstance();
const router = useRouter();
const UserStore = useUserStore();
const sportsInfoStore = useSportsInfoStore();
const sportsBetEvent = useSportsBetEventStore();
const { startPolling, stopPolling, initSportPubsub, unSubSport, sportsLogin, clearState } = useSportPubSubEvents();
const eventIDList = ref();
const eventList = ref();
const collectList = ref([]);
const hotGames = ref<GameInfoList[]>([]);
const lobbyTopGame = ref<LobbyTopGame[]>();
const PaymentVendorList = ref([]);
const PartnerList = ref([]);
const showRedBagRain = computed(() => useActivityStore().getIsShowRedBagRain);
//判断是否收藏
const isShowCollect = computed(() => {
	return collectList.value.length > 0 && UserStore.token;
});
// 红包倒计时
const showCountdown = ref(false);
// 红包开始信息
const redBagInfo: any = ref({});
//监听处理好的体育联赛数据列表 从中获取后台配置好的赛事展示在首页。
watch(
	() => viewSportPubSubEventData.getSportData(),
	(newData, oldData) => {
		// console.log(JSON.stringify(newData));
		/**
		 * @description 根据 sportType 获取对应的数据
		 * @param {Sports} sportType
		 */
		const football = newData[1] || [];
		const basketball = newData[2] || [];
		const leagues = [...football, ...basketball];
		const newEvents = [] as object[];
		leagues.forEach((item) => {
			newEvents.push(...item.events);
		});
		eventList.value = newEvents;
		console.log(newEvents, "===newEvents");
	}
);

onActivated(() => {
	//获取游戏场馆热门赛事
	getLobbyTopGame();
	//获取体育赛事id
	getSportEventsRecommend();
	//获取收藏的游戏列表
	queryCollection();
	// 获取支付商
	queryPaymentVendorList();
	// 获取赞助商
	queryPartnerList();
	getGameInfoDetail();
	//初始化体育
	initSport();
	pubsub.subscribe("getCollect", queryCollection);
	// 初始化活动ws连接
	initializeWebSocket();
});
onDeactivated(() => {
	// 关闭登录接口轮询
	stopPolling();
	// 清除体育数据缓存
	clearStoreInfo();
	// 卸载体育
	unSport();
	//关闭ws连接
	destroyWS();
});
//获取关注列表
const queryCollection = () => {
	if (useUserStore().token) {
		GameApi.queryCollection().then((res) => {
			collectList.value = res.data.records || [];
		});
	}
};
/**
 * @description 获取热门游戏详情
 */
const getGameInfoDetail = () => {
	GameApi.queryGameInfoDetail({
		label: 1,
		pageSize: -1,
	}).then((res) => {
		console.log(res, "==queryGameInfoDetail");
		hotGames.value = res.data.records;
	});
};

// 获取支付商
const queryPaymentVendorList = () => {
	HomeApi.queryPaymentVendorList().then((res) => {
		console.log(res);
		PaymentVendorList.value = res.data || [];
	});
};
//获取站点赞助商
const queryPartnerList = () => {
	HomeApi.queryPartnerList().then((res) => {
		console.log(res);
		PartnerList.value = res.data || [];
	});
};
//获取推荐赛事列表
const getSportEventsRecommend = () => {
	HomeApi.querySportEventsRecommend().then((res) => {
		eventIDList.value = res.data;
	});
};
//获取游戏场馆热门赛事
const getLobbyTopGame = () => {
	GameApi.queryLobbyTopGame().then((res) => {
		lobbyTopGame.value = res.data;
	});
};

//初始化体育
const initSport = async () => {
	//开启体育线程
	workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	//体育登录
	// 	device*	设备：0:后台 1:PC 2:IOS_H5 3:IOS_APP 4:Android_H5 5:Android_APP[...]
	// venueCode*	string
	// title: 场馆code
	// gameCode	string
	// title: 游戏code
	await sportsLogin({
		device: 1,
		venueCode: "",
		gameCode: "",
	}).then((res) => {
		if (res) {
			initSportPubsub();
			openSportPush();
			if (UserStore.token) {
				// 开始轮询登录接口
				startPolling();
				getAttention();
				//切换关注状态后触发获取关注列表
				pubsub.subscribe(pubsub.PubSubEvents.SportEvents.attentionChange.eventName, async () => {
					await getAttention();
				});
			}
		}
	});
};

const clearStoreInfo = () => {
	// 清楚购物车数据内存
	// sportsBetEvent.clearShopCart();
	// sportsBetChampion.clearChampionShopCart();
	// sportsInfoStore.clearStoreInfo();
};

//卸载体育
const unSport = () => {
	//取消订阅体育事件
	unSubSport();
	clearState();
	workerManage.stopWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
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
	// startLoading();
	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign(
		{},
		{
			sportPushApi: SportPushApi.GetEvents_push,
			webToPushApi: WebToPushApi.eventsRollingBall,
			params: {
				query: `$filter=eventId in (${eventIDList.value.map((item) => item.eventsId).join(",")})`,
			},
			isMultiple: false,
		},
		params
	);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	// stopLoading();
};

/**
 * @description 获取体育关注列表
 */
const getAttention = () => {
	// console.log(getAttention, "====getAttention");
	return new Promise((resolve, reject) => {
		sportsApi.getAttentionList().then((res) => {
			if (res?.ok) {
				sportsBetEvent.setAttentionList(res.data);
				resolve(res.data);
			} else {
				reject(res);
			}
		});
	});
};

const handleMore = (gameOneId) => {
	console.log(gameOneId, "=gameOneId");
	router.push({
		name: "GameArena",
		query: { gameOneId },
	});
};

const initializeWebSocket = async () => {
	// 订阅红包雨推送消息
	pubsub.subscribe("/activity/redBagRain", (data) => {
		showCountdown.value = true;
		redBagInfo.value = data;
	});
	pubsub.subscribe("/activity/redBagRain/end", (data) => {
		showCountdown.value = false;
	});
};
const destroyWS = () => {
	pubsub.unsubscribe("/activity/redBagRain", () => {});
	pubsub.unsubscribe("/activity/redBagRain/end", () => {});
};
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>
