<!--
 * @Author: Hida
 * @Date: 2024-06-06 20:55:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-09 18:30:18
 * @Description: 
 * 
-->
<template>
	<component v-if="leagues" :is="sportsMap[Number(route.params.sportType)]" :listData="leagues" :sportType:string="route.params.sportType" />
	<NoData v-else />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
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

import { useRoute } from "vue-router";
// import sportsMap from "/@/views/venueHome/sports/sportsMap/sportsMap";
import viewSportPubSubEventData from "/@/views/venueHome/sports/hooks/viewSportPubSubEventData";
const route = useRoute();

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

/**
 * @description 根据 sportType 获取对应的数据
 * @param {Sports} sportType
 */
const leagues = computed(() => viewSportPubSubEventData.getSportData(Number(route.params.sportType)));
</script>

<style scoped lang="scss"></style>
