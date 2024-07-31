<!--
 * @Author: Hida
 * @Date: 2024-06-02 21:49:42
 * @LastEditors: hida
 * @LastEditTime: 2024-06-10 17:23:42
 * @Description: 
 * 
-->
<template>
	<div class="bg_BG2">
		<VantNavBar :title="eventInfo.leagueName" @onClickLeft="onClickLeft" />
		<div class="matchResultDetail bg_BG1">
			<div class="header">
				<div>
					<div class="tournament-icon">
						赛果详情页
						<!-- <img :src="eventInfo.leagueIconUrl" alt="" /> -->
						<!-- <h3>{{ eventInfo. }}</h3> -->
					</div>
				</div>
				<div>VS</div>
				<div></div>
			</div>
			<ul></ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import sportsApi from "/@/api/venueHome/sports";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const eventInfo = ref<any>({});

onMounted(() => {
	console.log("Component mounted");
	//获取联赛数据
	getEventInfo();
});

//回退至上一个路由
const onClickLeft = () => {
	router.push(`/frontPage/home/sports/rollingBall/${route.params.sportType}`);
};

/**
 * @description 获取赛事详细信息
 */

const getEventInfo = async () => {
	const res = await sportsApi.GetResultEvents({ eventids: route.params.eventId }).catch((err) => err);
	//获取联赛数据
	if (res.data) {
		eventInfo.value = res.data.games[0].gameDetail;
	}
};
</script>

<style scoped lang="scss">
.matchResultDetail {
	height: calc(100vh - 100px);
	overflow-y: scroll;
	padding: 24px;
	box-sizing: border-box;
}
</style>
