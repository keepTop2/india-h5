<template>
	<Container :data="mockData">
		<div class="tabs">
			<div @click="handleTabClick(item.id)" class="tabs-item" :class="{ actived: tabActived === item.id }" v-for="item in tabs" :key="item.id">{{ item.label }}</div>
		</div>

		<!-- 内容部分 -->
		<component :is="tabComponents.get(tabActived)" />
	</Container>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import Container from "/@/views/lottery/components/Containers/index.vue";
// 模拟数据，用于显示在页面头部
const mockData = {
	iconH5: "https://ctopalistat3.zengchenglm.com/pc/images/db_DB5FC2cea4e2f859029cdbda33fffda6ea1f2.png",
	gameName: "时时彩",
	gameDesc: "五分钟一期",
	seconds: 100,
	betStatusName: "投注中",
	issueNum: "20230812-084",
	maxWin: 5403.23,
	icon: "",
};

const tabActived = ref(2);
const tabs = [
	{ label: "购买彩票", id: 1 },
	{ label: "开奖结果", id: 2 },
];

const BayLottery = defineAsyncComponent(() => import("./components/bayLottery.vue"));
const Result = defineAsyncComponent(() => import("./components/result.vue"));

const tabComponents = new Map([
	[1, BayLottery],
	[2, Result],
]);

const handleTabClick = (id: number) => {
	tabActived.value = id;
};
</script>
<style></style>
