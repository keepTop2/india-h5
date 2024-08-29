<!--
 * @Author: Hida
 * @Date: 2024-06-06 20:55:25
 * @LastEditors: hida
 * @LastEditTime: 2024-06-17 15:44:16
 * @Description: 
 * 
-->
<template>
	<DateSelector v-model="activeDate" :daysNumber="7" :other="true" :direction="true" />
	<component v-if="leagues" :is="sportsMap[Number(route.params.sportType)]" :listData="leagues" :sportType:string="route.params.sportType" />
	<NoData v-else />
</template>

<script setup lang="ts">
import pubsub from "/@/pubSub/pubSub";
import DateSelector from "../../components/DateSelector/DateSelector.vue";
import { sportTabPushActions } from "../../sportsMap/sportsSSERequestMap";
import { OpenSportEventSourceParams } from "/@/views/venueHome/sports/models/sportEventSourceModel";
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo";
import { useRoute } from "vue-router";
import viewSportPubSubEventData from "/@/views/venueHome/sports/hooks/viewSportPubSubEventData";
import common from "/@/views/venueHome/sports/utils/common";
import dayjs from "dayjs";
import SportsCommonFn from "/@/views/venueHome/sports/utils/common";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import workerManage from "/@/webWorker/workerManage";
import { useLoading } from "/@/directives/loading/hooks";

// 足球列表
const Football = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/football/football.vue"));
// 篮球列表
const Basketball = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/basketball/basketball.vue"));
// 美式足球列表
const AmericanSoccer = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/americanSoccer/americanSoccer.vue"));
// 冰上曲棍球列表
const IceHockey = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/iceHockey/iceHockey.vue"));
// 网球列表
const Tennis = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/tennis/tennis.vue"));
// 排球列表
const Volleyball = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/volleyball/volleyball.vue"));
// 斯诺克
const Billiards = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/billiards/billiards.vue"));
// 棒球列表
const Baseball = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/baseball/baseball.vue"));
// 羽毛球列表
const Badminton = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/badminton/badminton.vue"));
// 电子竞技列表
const ESports = defineAsyncComponent(() => import("/@/views/venueHome/sports/tournamentViews/eSports/eSports.vue"));

import NoData from "/@/views/venueHome/sports/components/noData/noData.vue";

const sportsMap = {
	1: Football,
	2: Basketball,
	3: AmericanSoccer,
	4: IceHockey,
	5: Tennis,
	6: Volleyball,
	7: Billiards,
	8: Baseball,
	9: Badminton,
	43: ESports,
};

const route = useRoute();
const { startLoading, stopLoading } = useLoading();
const sportsInfoStore = useSportsInfoStore();
const activeDate = ref(dayjs(common.todayDate()).add(1, "day").format("YYYY-MM-DD"));
const { initSportPubsub, unSubSport } = useSportPubSubEvents();

/**
 * @description 根据 sportType 获取对应的数据
 * @param {Sports} sportType
 */
const leagues = computed(() => viewSportPubSubEventData.getSportData(Number(route.params.sportType)));
console.log("leagues", leagues);

watch(
	() => activeDate.value,
	(newVal) => {
		//关闭体育订阅
		unSubSport();
		//清理筛选条件
		// 关闭体育线程
		workerManage.stopWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
		//开启体育订阅
		initSportPubsub();
		//开启体育线程
		workerManage.startWorker(workerManage.WorkerMap.sportViewProcessWorker.workerName);
		//开启体育推送
		openSportPush();
	}
);

const openSportPush = () => {
	const { startDate, endDate } = common.getResultDateRange(activeDate.value);
	const params = {
		apiUrl: SportsCommonFn.getSportPushApiUrl(),
		token: sportsInfoStore.getSportsToken,
		language: SportsCommonFn.getSportLanguage(),
	};

	const queryParams = {};
	if (activeDate.value) {
		queryParams["params"] = {
			query: `$filter=sportType in (${SportsCommonFn.getRequestSportsType()})&$orderby=globalShowTime asc `,
			from: startDate,
			until: endDate,
		};
	} else {
		queryParams["params"] = {
			query: `$filter=sportType in (${SportsCommonFn.getRequestSportsType()})&$orderby=globalShowTime asc `,
			from: common.getResultDateRange(dayjs.utc().add(8, "day").subtract(5, "hour")).startDate,
			until: common.getResultDateRange(dayjs.utc().add(15, "day").subtract(5, "hour")).endDate,
		};
	}
	console.log("----------?这里？");

	startLoading();
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.morningTrading.openSport, params);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	//清空参数
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = {} as OpenSportEventSourceParams;
	//参数赋值
	pubsub.PubSubEvents.WorkerEvents.viewToWorker.params!.data = Object.assign({}, sportTabPushActions.morningTrading.openEvents, params, queryParams);
	//发送SSE指令到线程管理器
	pubsub.publish(pubsub.PubSubEvents.WorkerEvents.viewToWorker.eventName, pubsub.PubSubEvents.WorkerEvents.viewToWorker.params);
	stopLoading();
};
</script>

<style scoped lang="scss"></style>
