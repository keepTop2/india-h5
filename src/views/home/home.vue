<template>
	<div class="Home_Page bg_BG1">
		<!-- 轮播图 -->
		<Banner class="Home_Banner" />
		<div class="Home_Content">
			<!-- 热门游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/fire" alt="" />
				{{ $t('home["热门游戏"]') }}
			</h3>
			<HotGame class="m24" />
			<!-- 收藏游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/star" alt="" />
				{{ $t('home["收藏游戏"]') }}
			</h3>
			<CollectGames class="m24" />

			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/event_game" alt="" />
					{{ $t('home["我们的游戏"]') }}
				</span>
				<span class="more fw_400 fs_28 color_T1" @click="router.push('/sports')">更多</span>
			</h3>
			<EventList v-for="event in eventList" class="m24" :event="event" />
			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/event_777" alt="" />
					{{ $t('home["热门电子"]') }}
				</span>
				<span class="more fw_400 fs_28 color_T1" @click="router.push('/game/arena/1')">更多</span>
			</h3>
			<GameLayout class="m24" />

			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/event_people" alt="" />
					{{ $t('home["热门真人"]') }}
				</span>
				<span class="more fw_400 fs_28 color_T1" @click="router.push('/game/arena/2')">更多</span>
			</h3>
			<GameLayout class="m24" />

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
			<Sponsor />
			<!-- 转账方式 -->
			<Currency />
			<!-- 负责任游戏 -->
			<Footer />
		</div>
	</div>
</template>

<script setup lang="ts">
import sportsApi from "/@/api/venueHome/sports";
import workerManage from "/@/webWorker/workerManage";
import { useLoading } from "/@/directives/loading/hooks";
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";

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
import duty from "/@/views/home/static/images/duty.png";
import { useUserStore } from "/@/store/modules/user";
import { useRouter } from "vue-router";
import pubsub from "/@/pubSub/pubSub";
import { SportViewProcessWorkerCommandType, WorkerName } from "/@/enum/workerTransferEnum";
import SportsCommonFn from "../venueHome/sports/utils/common";
import { OpenSportEventSourceParams } from "../venueHome/sports/models/sportEventSourceModel";
import { sportTabPushActions } from "../venueHome/sports/sportsMap/sportsSSERequestMap";
import { SportPushApi, WebToPushApi } from "../venueHome/sports/enum/sportEventSourceEnum";
import viewSportPubSubEventData from "../venueHome/sports/hooks/viewSportPubSubEventData";
const router = useRouter();
const UserStore = useUserStore();
const sportsInfoStore = useSportsInfoStore();
const sportsBetEvent = useSportsBetEventStore();
const { startLoading, stopLoading } = useLoading();
const { startPolling, stopPolling, initSportPubsub, unSubSport, sportsLogin, clearState } = useSportPubSubEvents();
const eventList = ref();
watch(
	() => viewSportPubSubEventData.getSportData(),
	(newData) => {
		console.log(JSON.stringify(newData));
		/**
		 * @description 根据 sportType 获取对应的数据
		 * @param {Sports} sportType
		 */
		const football = newData[1];
		const basketball = newData[2];
		const leagues = [...football, ...basketball];
		const newEvents = [] as object[];
		leagues.forEach((item) => {
			newEvents.push(...item.events);
		});
		eventList.value = newEvents;
		console.log(newEvents, "===newEvents");
	}
);
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
	clearStoreInfo();
});

//初始化体育
const initSport = async () => {
	//开启体育线程
	workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	//体育登录
	sportsLogin().then((res) => {
		if (res) {
			initSportPubsub();
			openSportPush();
			if (UserStore.token) {
				// 开始轮询登录接口
				startPolling();
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
	startLoading();
	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign(
		{},
		{
			sportPushApi: SportPushApi.GetEvents_push,
			webToPushApi: WebToPushApi.eventsRollingBall,
			params: {
				query: `$filter=eventId in (89881335)`,
			},
			isMultiple: true,
		},
		params
	);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	stopLoading();
};

/**
 * @description 获取关注列表
 */

const getAttention = () => {
	console.log(getAttention, "====getAttention");
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
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>
