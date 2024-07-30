<template>
	<div class="bg_BG2 eventDetail" ref="scrollRef" @scroll.passive="onScroll">
		<div>
			<div class="headerBox">
				<!-- 导航栏 -->
				<div class="navBar" :class="{ showDropDown }">
					<div class="goback" @click="onClickLeft">
						<SvgIcon class="color_Tag2-P" iconName="arrowLeft" alt="" />
					</div>
					<div class="teamList" v-show="eventsList">
						<DropDownEvent @changeEvent="handleChangeEvent" :eventsList="eventsList" @handleClose="handleClose" @handleOpen="handleOpen" />
						<SvgIcon iconName="sport_down" alt="" />
					</div>
					<div class="refresh">
						<!-- <SvgIcon class="color_Tag2-P" iconName="sports_refresh" alt="" /> -->
					</div>
				</div>
				<!-- 头部内容 队伍信息 比分 -->
				<div :class="['header']" v-show="!myPlayer && !iframeLoaded">
					<div>
						<div class="teams">
							<div v-if="eventDetail">
								<div class="team1">
									<div class="teamLogo">
										<img v-if="eventDetail?.teamInfo?.homeIconUrl" :src="eventDetail?.teamInfo?.homeIconUrl" alt="" />
									</div>
									<div class="teamName fs_26 color_TB-P fw_400">{{ eventDetail?.teamInfo?.homeName }}</div>
								</div>
								<div class="time">
									<div v-if="eventDetail?.isLive && isEventRunning">
										<div class="date fs_24 color_TB-P fw_600">
											{{ eventDetail && SportsCommon.getEventsTitle(eventDetail) }} <span>{{ formattedGameTime }}</span>
										</div>
										<div class="time fs_50 color_TB-P fw_700">{{ eventDetail?.gameInfo.liveHomeScore }}-{{ eventDetail?.gameInfo.liveAwayScore }}</div>
									</div>
									<div v-if="eventDetail?.isLive && eventDetail?.eventStatus == 'closed'">
										<div class="time fs_50 color_TB-P fw_700">{{ eventDetail?.gameInfo.liveHomeScore }}-{{ eventDetail?.gameInfo.liveAwayScore }}</div>
									</div>
									<div v-if="!eventDetail?.isLive || !isEventRunning">
										<div class="date fs_24 color_TB-P fw_600">{{ timeFormate(eventDetail?.globalShowTime).date }}</div>
										<div class="time fs_50 color_TB-P fw_700">{{ timeFormate(eventDetail?.globalShowTime).time }}</div>
									</div>
								</div>
								<div class="team2">
									<div class="teamLogo">
										<img v-if="eventDetail?.teamInfo?.awayIconUrl" :src="eventDetail?.teamInfo?.awayIconUrl" alt="" />
									</div>
									<div class="teamName fs_26 color_TB-P fw_400">{{ eventDetail?.teamInfo?.awayName }}</div>
								</div>
							</div>
						</div>
						<div class="card">
							<ul v-if="isEventRunning && eventDetail">
								<li class="color_TB-P fs_26" v-if="eventDetail?.channelCode" @click="getStreaming">
									<SvgIcon iconName="sport_live_2" />
									视频
								</li>
								<li class="line bg_Tag2-P" v-if="eventDetail?.channelCode"></li>
								<li @click="attentionEvent()" :class="[(isAttention && 'color_TB-P') || 'color_Tag2-P', 'fs_26']">
									<!-- <SvgIcon class="color_Tag2-P" iconName="sport_start" size="6" /> -->
									<SvgIcon v-if="isAttention" iconName="collection2" size="6" />
									<SvgIcon v-else iconName="collection" size="6" />
									{{ (isAttention && "已关注") || "关注" }}
								</li>
							</ul>
							<ul v-if="!isEventRunning && eventsList">
								<li class="color_Tag2-P">{{ eventsList ? (eventDetail ? gameStatus(eventDetail?.eventStatus) : "比赛已结束") : "-" }}</li>
							</ul>
						</div>
						<div class="pl_40 pr_40 fs_20 color_TB-P fw_700" v-if="Number(routeData.sportType) == 1 && eventDetail?.isLive && eventDetail?.gameInfo?.inPlayTime">
							<span>HT </span>
							<span>{{ `${eventDetail?.gameInfo?.liveHomeScore}-${eventDetail.gameInfo?.liveAwayScore}` }}</span>
						</div>
					</div>
				</div>
				<!-- 虚拟赛事视频 -->
				<div v-show="myPlayer">
					<video ref="videoPlayer" class="video-js"></video>
				</div>
				<!-- 真人赛事比赛 -->
				<div v-show="iframeLoaded" class="live">
					<iframe
						class="eventVideo"
						@load="onIframeLoad"
						:src="videoSrc"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					>
					</iframe>
				</div>
			</div>
			<!-- 播放视频情况下 缩小展示队伍信息 -->
			<div class="smallTeams" v-if="myPlayer || iframeLoaded">
				<div class="teams">
					<div v-if="eventDetail">
						<div class="team1">
							<div class="teamLogo">
								<img v-if="eventDetail?.teamInfo?.homeIconUrl" :src="eventDetail?.teamInfo?.homeIconUrl" alt="" />
							</div>
							<div>
								<div class="teamName fs_26 color_TB fw_400">
									{{ eventDetail?.teamInfo?.homeName }}
								</div>
								<div v-if="eventDetail?.soccerInfo" class="fs_26 color_TB fw_400">
									<ul>
										<li class="fs_22 color_T1 fw_700"><SvgIcon iconName="redCard" size="6" />{{ eventDetail.soccerInfo.homeRedCard }}</li>
										<li class="fs_22 color_T1 fw_700"><SvgIcon iconName="yellowCard" size="6" />{{ eventDetail.soccerInfo.homeYellowCard }}</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="time">
							<div v-if="eventDetail?.isLive && isEventRunning">
								<div class="date fs_24 color_TB fw_600">
									{{ eventDetail && SportsCommon.getEventsTitle(eventDetail) }} <span>{{ formattedGameTime }}</span>
								</div>
								<div class="time fs_50 color_TB fw_700">{{ eventDetail?.gameInfo.liveHomeScore }}-{{ eventDetail?.gameInfo.liveAwayScore }}</div>
							</div>
							<div v-if="eventDetail?.isLive && eventDetail?.eventStatus == 'closed'">
								<div class="time fs_50 color_TB fw_700">{{ eventDetail?.gameInfo.liveHomeScore }}-{{ eventDetail?.gameInfo.liveAwayScore }}</div>
							</div>
						</div>
						<div class="team2">
							<div class="teamLogo">
								<img v-if="eventDetail?.teamInfo?.awayIconUrl" :src="eventDetail?.teamInfo?.awayIconUrl" alt="" />
							</div>
							<div>
								<div class="teamName fs_26 color_TB fw_400">{{ eventDetail?.teamInfo?.awayName }}</div>
								<div v-if="eventDetail?.soccerInfo" class="fs_26 color_TB fw_400">
									<ul>
										<li class="fs_22 color_T1 fw_700"><SvgIcon iconName="redCard" size="6" />{{ eventDetail.soccerInfo.awayRedCard }}</li>
										<li class="fs_22 color_T1 fw_700"><SvgIcon iconName="yellowCard" size="6" />{{ eventDetail.soccerInfo.awayYellowCard }}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 滑动到指定位置队伍信息及比分固定在顶部 -->
			<div class="smallHeader color_TB-P" :class="{ fixed: isFixed }">
				<div class="goback" @click="onClickLeft">
					<SvgIcon class="color_Tag2-P" iconName="arrowLeft" alt="" />
				</div>
				<div class="teamName fs_26 color_TB-P fw_400">
					<span class="w_123">{{ eventDetail?.teamInfo?.homeName }}</span
					>&nbsp;&nbsp;
					<span class="w_20" v-show="eventDetail?.isLive">{{ eventDetail?.gameInfo.liveHomeScore }}</span>
				</div>
				<div class="date fs_22 color_TB-P fw_400">
					<span
						>{{ eventDetail && SportsCommon.getEventsTitle(eventDetail) }} <span>{{ formattedGameTime }}</span></span
					>
				</div>
				<div class="teamName fs_26 color_TB-P fw_400">
					<span class="w_20" v-show="eventDetail?.isLive">{{ eventDetail?.gameInfo.liveAwayScore }}</span>
					&nbsp;&nbsp;
					<span class="w_123">{{ eventDetail?.teamInfo?.awayName }}</span>
				</div>
			</div>
			<!-- 盘口内容 -->
			<div :class="['content', 'bg_BG1']" v-show="eventsList">
				<div class="tabBox bg_BG1" :class="{ 'fixed-tab': isFixed }">
					<div class="tabs">
						<ul class="tab bg_BG1">
							<li @click="changeTab('all')" key="all" :class="{ selected: activeTab == 'all' }">所有投注</li>
							<li v-for="(i, index) in markets" :key="i.betTypeName" @click="changeTab(i.betTypeName)" :class="{ selected: activeTab == i.betTypeName }">{{ i.betTypeName }}</li>
						</ul>
					</div>
					<SvgIcon class="sport_fold color_Tag2-P" v-if="!isFold" iconName="sport_fold" @click="onExpandAngCollapse(true)" />
					<SvgIcon class="sport_fold color_Tag2-P" v-else iconName="sport_fold2" @click="onExpandAngCollapse(false)" />
				</div>
				<div class="selections_list" v-if="markets.length">
					<Collapse v-model="activeSelection" :accordion="false">
						<CollapseItem class="selection_item" v-for="i in markets" v-show="activeTab == 'all' || activeTab == i.betTypeName" :key="i.betTypeName" :name="i.betTypeName">
							<template #title>
								<div class="tournament-header">
									<!-- <SvgIcon iconName="collection" size="5.333333" /> -->
									<div class="tournament-info">
										<div class="tournament-name">{{ i.betTypeName }}</div>
									</div>
									<SvgIcon :class="{ sport_arrow: activeSelection.includes(i.betTypeName) }" iconName="sport_arrow" size="5.333333" />
								</div>
							</template>
							<template #default>
								<ul class="bg_BG3 tournament-content">
									<li v-for="market in i.markets" :key="market.marketId">
										<div
											class="li_tag bg_Tag1"
											v-for="selection in filterSelections(market.selections)"
											@click="market.marketStatus === 'running' && onSetSportsEventData(market, selection)"
											:class="{ isBright: isBright(market, selection), threeCol: filterSelections(market.selections).length % 2 != 0 && !isbladder(market.betType) }"
											:key="market.marketId + selection.key"
										>
											<div v-if="market.marketStatus === 'running'">
												<!-- <span :class="['fs_20', 'fw_400', 'color_T1']" v-if="item.betType == 5 || item.betType == 15">{{ selection?.keyName }}</span> -->
												<span :class="['fs_20', 'fw_400', 'color_T1', 'selectionTitle']">
													<SelectionName :name="selection?.keyName" :betType="market.betType" />
													<span v-show="selection.key != 'x'">&nbsp;{{ SportsCommon.formatPoint({ betType: market.betType, point: selection?.point, key: selection?.key }) }}</span>
												</span>
												<span :class="['fs_28', 'fw_600', 'color_T1', 'price', changeClass(selection)]"
													>{{ selection.oddsPrice.decimalPrice }}
													<RiseOrFall v-if="selection.oddsChange" :time="3000" :status="selection.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market.marketId, selection)" />
												</span>
											</div>
											<div v-else>
												<SvgIcon iconName="sport_lock" size="4.6" />
											</div>
										</div>
									</li>
								</ul>
							</template>
						</CollapseItem>
					</Collapse>
				</div>
				<div v-if="!markets.length" class="noData color_T3-P">
					<div class="fs_24">盘口已关闭</div>
					<div class="fs_24">当前无法进行投注</div>
				</div>
			</div>
		</div>
		<!-- 体育购物车 -->
		<SportsShopCart />
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import DropDownEvent from "./components/dropDownEvent.vue";
import SelectionName from "./components/selectionName.vue";
import { useUserStore } from "/@/store/modules/user";
import { WebToPushApi } from "/@/views/venueHome/sports/enum/sportEventSourceEnum";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo";
import { OpenSportEventSourceParams } from "/@/views/venueHome/sports/models/sportEventSourceModel";
import { convertUtcToUtc5AndFormat } from "/@/webWorker/module/utils/formattingChildrenViewData";
import { SportViewProcessWorkerCommandType, WorkerName } from "/@/enum/workerTransferEnum";
import { sportsEventDetailPush } from "/@/views/venueHome/sports/sportsMap/sportsSSERequestMap";

import dayjs from "dayjs";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import pubsub from "/@/pubSub/pubSub";
import sportApi from "/@/api/venueHome/sports";
import workerManage from "/@/webWorker/workerManage";
import SportsCommon from "/@/views/venueHome/sports/utils/common";
import { timeFormate } from "/@/views/venueHome/sports/utils/commonFn";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import viewSportPubSubEventData from "/@/views/venueHome/sports/hooks/viewSportPubSubEventData";
// import SportsShopCart from "/@/views/venueHome/sports/components/sportsShopCart/sportsShopCart.vue";
import sportsApi from "/@/api/venueHome/sports";

import { useLoading } from "/@/directives/loading/hooks";
import { ChildrenToMainCommon } from "/@/ChildrenAppportAManage/childrenAppDTOs/childrenToMain/childrenToMainCommon";
import { ControllersEnum } from "/@/ChildrenAppportAManage/childrenAppEnums/controllersEnum";
import childrenAppportAManage from "/@/ChildrenAppportAManage/ChildrenAppportAManage";
import { defineAsyncComponent } from "vue";
const SportsShopCart = defineAsyncComponent(() => import("/@/views/venueHome/sports/components/sportsShopCart/sportsShopCart.vue"));
const { startLoading, stopLoading } = useLoading();
const UserStore = useUserStore();
const videoPlayer = ref();
const myPlayer = ref();
const route = useRoute();
let routeData: Ref<{ eventId?: number; leagueId?: number; sportType?: number } | undefined> = ref({});

const router = useRouter();
//获取token
const sportsInfoStore = useSportsInfoStore();
const sportsBetEvent = useSportsBetEventStore();
const isFold = ref(false);
const marketsSelect = computed(() => sportsBetEvent.getEventInfo);
const { initSportPubsub, unSubSport, clearState, sportsLogin, clearSportsOddsChange } = useSportPubSubEvents();

const iframeLoaded = ref(false);
const scrollRef = ref();
const isFixed = ref(false);
const activeTab = ref("all");
const videoSrc = ref("");
const showDropDown = ref(false);
const activeSelection = ref<string[]>([]);
let scrollTimeout: number = 0;

const isbladder = (type) => {
	const arr = [4, 30, 152, 416, 413, 414, 165, 166, 392, 399, 405, 413, 414, 1302, 1317, 3900, 3910, 3917];
	return arr.includes(type);
};
//折叠面板开关
const handleClose = () => {
	showDropDown.value = false;
};
const handleOpen = () => {
	showDropDown.value = true;
};
//判断是否存在关注列表中
const isAttention = computed(() => {
	return sportsBetEvent.attentionEventIdList.includes(Number(routeData.value?.eventId));
});

//根据sportType从state中获取events列表 用于展示该联赛下的所有赛事
const eventsList = computed(() => {
	return viewSportPubSubEventData.viewSportData.childrenViewData[Number(routeData.value?.sportType)]?.[0]?.events;
});

//根据路由eventId 匹配对应的 event数据 展示详细数据
const eventDetail = computed(() => {
	const events = eventsList.value;
	return events?.filter((item) => item.eventId == routeData.value?.eventId)[0];
});

//获取盘口数据
const markets = computed(() => {
	// console.log("eventDetail", eventDetail.value);
	let marketData: any = [];
	if (eventDetail.value) {
		const markets = eventDetail.value?.markets;
		for (const key in markets) {
			const market = markets[key];
			const { betTypeName, marketId, betType } = market;
			// 在 marketData 中查找是否已存在相同 betTypeName 的数据
			const existingMarketData = marketData.find((data) => data.betTypeName === betTypeName);
			if (existingMarketData) {
				// 如果已存在，则将当前市场对象添加到现有数据的 markets 数组中
				existingMarketData.markets[key] = market;
			} else {
				// 如果不存在，则创建新的数据对象并将当前市场对象添加到其 markets 数组中
				const newData: any = {
					betTypeName: betTypeName,
					marketId: marketId,
					betType: betType,
					markets: {
						[key]: market,
					},
				};
				marketData.push(newData);
			}
		}
	}
	marketData.sort((a, b) => {
		if (a.betType === b.betType) {
			return a.marketId - b.marketId;
		}
		return a.betType - b.betType;
	});
	// console.log(marketData);

	return marketData;
});

// 计算属性 判断是否为比赛中的赛事
const isEventRunning = computed(() => eventDetail.value?.eventStatus === "running");

// 定义计算属性 格式化比赛开始时间
const formattedGameTime = computed(() => {
	if (eventDetail.value && eventDetail.value.gameInfo.seconds) {
		const minutes = Math.floor(eventDetail.value.gameInfo.seconds / 60);
		const seconds = eventDetail.value.gameInfo.seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	} else {
		return "";
	}
});

onUnmounted(() => {
	if (myPlayer.value) {
		myPlayer.value.dispose();
	}
});
// 全部折叠与展开
const onExpandAngCollapse = (val: boolean) => {
	if (!val) {
		activeSelection.value = [];
	} else {
		activeSelection.value = markets.value.map((item) => item.betTypeName);
	}
};
// 监听当前选中的盘口 设置折叠状态。
watch(
	() => activeSelection.value.length,
	(newValue, oldValue) => {
		if (newValue == 0 || newValue < oldValue) {
			isFold.value = false;
		}
		if (newValue >= markets.value.length) {
			isFold.value = true;
		}
	}
);
// 当iframe加载完成时，设置iframeLoaded为true
const onIframeLoad = () => {
	console.log("onIframeLoad", "加载完成");
	if (videoSrc.value) {
		iframeLoaded.value = true;
		stopLoading();
	}
};
/**
 * @description 关注相关操作
 */
const attentionEvent = async () => {
	if (isAttention.value) {
		await sportsApi.unFollow({
			thirdId: [routeData.value?.eventId],
		});
	} else {
		await sportsApi.saveFollow({
			thirdId: routeData.value?.eventId,
			type: 2,
		});
	}
	getAttention();
};

/**
 * @description 获取视频地址
 */
const getStreaming = async () => {
	const { leagueId, sportType } = routeData.value;

	const param = {
		sportType,
		streamingOption: eventDetail.value.streamingOption,
		channelCode: eventDetail.value.channelCode,
	};
	const { userIpVO } = UserStore.getUserInfo;

	const res = await sportApi.GetStreaming(param);
	if (res.status == 200) {
		const { streamingUrlH5, streamingUrl, streamingUrlCN, streamingUrlNonCN } = res.data;
		if (streamingUrlH5) {
			startLoading();
			// console.log(streamingUrlH5, "==streamingUrlH5");
			videoSrc.value = streamingUrlH5;
		}
		if (streamingUrl || streamingUrlCN || streamingUrlNonCN) {
			myPlayer.value = videojs(videoPlayer.value, {
				controls: false,
				autoplay: true,
				preload: "auto",
				sources: [
					{
						src: userIpVO.countryCode == "CN" ? streamingUrlCN : streamingUrlNonCN, // 视频源地址
						type: "application/x-mpegURL",
					},
				],
			});
		}
	}
};
/**
 * @description 获取关注列表
 */

const getAttention = async () => {
	const res = await sportApi.getAttentionList();
	sportsBetEvent.setAttentionList(res.data);
};

// 切换tab
const changeTab = (key) => {
	activeTab.value = key;
	scrollRef.value!.scrollTop = 0;
};
//切换赛事信息
const handleChangeEvent = async (eventId) => {
	startLoading();
	const { leagueId, sportType } = routeData.value;
	//切换赛事 初始化视频信息
	changeTab("all");
	videoSrc.value = "";
	myPlayer.value = "";
	iframeLoaded.value = false;
	router.push({
		query: {
			path: "/sports/event/detail",
			data: JSON.stringify({
				eventId,
				leagueId,
				sportType,
			}),
		},
	});
	onExpandAngCollapse(false);
};

const filterSelections = (data) => {
	return data.filter((item) => {
		return item.oddsPrice.decimalPrice != 0;
	});
};

// 获取比赛状态
const gameStatus = (eventStatus) => {
	switch (eventStatus) {
		case "postponed":
			return "比赛已推迟";
		case "closed":
			return "比赛已结束";
		case "deleted":
			return "比赛已取消";
		default:
			return "";
	}
};
// 绑定滚动事件，滚动到一定位置 显示mini头部 并固定tab位置
const onScroll = () => {
	cancelAnimationFrame(scrollTimeout);
	scrollTimeout = requestAnimationFrame(() => {
		const scrollTop = scrollRef.value.scrollTop;
		if (myPlayer.value || iframeLoaded.value) {
			isFixed.value = scrollTop > 275;
		} else {
			isFixed.value = scrollTop > 154;
		}
	});
};

/**
 * @description 判断当前盘口是否存在pinia中
 */
const isBright = (market, selection) => {
	const eventId = eventDetail.value.eventId;
	return marketsSelect.value[eventId]?.listKye == `${market.marketId}-${selection.key}`;
};

/**
 * @description 处理盘口高亮状态，拼接 marketid 与 selection key 作为唯一标识，存储值pinia中
 */
const onSetSportsEventData = (market, selection) => {
	//存储盘口唯一标识
	const eventId = eventDetail.value.eventId;
	if (isBright(market, selection)) {
		sportsBetEvent.removeEventCart(eventDetail.value);
	} else {
		sportsBetEvent.storeEventInfo(eventId, {
			marketId: market.marketId,
			betType: market.betType,
			selectionKey: selection.key,
		});
		// 存储Pinia数据
		sportsBetEvent.addEventToCart(eventDetail.value);
	}
};

/**
 * @description 切换类名
 */
const changeClass = (item) => {
	if (!item.oddsChange) {
		return "";
	} else if (item.oddsChange == "oddsUp") {
		return "oddsUp";
	} else if (item.oddsChange == "oddsDown") {
		return "oddsDown";
	}
};

/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (marketId, selection) => {
	if (selection.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		clearSportsOddsChange({ webToPushApi: WebToPushApi.sportsEventDetail, marketId, selection });
		//删除 childrenViewData中的状态
		selection.oddsChange = "";
	}
};

//回退至上一个路由
const onClickLeft = () => {
	const childrenToMainCommonData: ChildrenToMainCommon = {
		transactionName: ControllersEnum.SportAContainerChangeController,
		apiName: "sportAContainerToSportProcess",
		data: {},
	};
	childrenAppportAManage.forceDispatch(childrenToMainCommonData);
};

// 注册一个钩子，在组件被挂载之前被调用。
onBeforeMount(async () => {
	if (route.query.data) {
		routeData.value = JSON.parse(route.query.data as string);
		// //获取关注列表
		getAttention();
		// //初始化体育
		initSport();
	}
});

const initSport = () => {
	//开启体育线程
	workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	//体育登录
	sportsLogin().then((res) => {
		if (res) {
			initSportPubsub();
			openEventDetailPush();
		}
	});
};

// 注册一个钩子，在组件实例被卸载之前调用。
onBeforeUnmount(() => {
	closeSportsSSE();
});

const closeSportsSSE = () => {
	//关掉体育视图线程
	workerManage.stopWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
	// 卸载体育
	unSubSport();
	clearState();
};

/**
 * @description 开启赛事详情推送
 */

const openEventDetailPush = async () => {
	const { leagueId, eventId } = routeData.value;

	//线程名称 体育视图处理线程
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.workerName = WorkerName.sportViewProcessWorker;
	//线程指令 体育eventSource 指令
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.commandType = SportViewProcessWorkerCommandType.sportEventSource;

	const params = {
		apiUrl: SportsCommon.getSportPushApiUrl(),
		token: sportsInfoStore.getSportsToken,
		language: SportsCommon.getSportLanguage(),
	};
	/**
	 * @description 先获取盘口数据，再获取events 防止匹配数据错乱
	 */
	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportsEventDetailPush.openMarkets(eventId), params);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);

	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportsEventDetailPush.openEvents(leagueId), params);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	stopLoading();
};

watch(
	() => route.query,
	() => {
		if (route.query && route.query.data) {
			routeData.value = JSON.parse(route.query.data as string);
		}
		//关掉体育视图线程
		workerManage.stopWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
		// 卸载体育
		unSubSport();
		workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
		initSportPubsub();
		openEventDetailPush();
	}
);
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
