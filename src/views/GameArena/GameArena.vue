<template>
	<div class="GameArena bg_BG1">
		<!-- 轮播图 -->
		<Banner class="Home_Banner mb_35" />
		<div class="Game_Content">
			<Tabs class="plr" v-model="tabsActiveKey" :list="tabList" />
			<!-- 热门游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/fire" alt="" />
				{{ $t('game["热门游戏"]') }}
			</h3>
			<HotGame class="m24" />
			<!-- 新游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/event_game" alt="" />
				{{ $t('game["新游戏"]') }}
			</h3>
			<GameGrid class="m24" :games="games" />
			<!-- 全部游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/star" alt="" />
				{{ $t('game["全部游戏"]') }}
			</h3>
			<GameGrid class="m24" :games="games" :showMore="true" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Tabs from "./components/Tabs/Tabs.vue";
import Banner from "./Banner/banner.vue";
//热门游戏
import HotGame from "./HotGame/HotGame.vue";
//游戏6格布局
import GameGrid from "./GameGrid/GameGrid.vue";
import { i18n } from "/@/i18n";
const $: any = i18n.global;
const route = useRoute();
//初始化当前选中tab
const tabsActiveKey = ref("all");

//tabs 切换
const tabList = [
	{
		name: $.t("game['全部']"),
		value: "all",
	},
	{
		name: $.t("game['新游戏']"),
		value: "1",
	},
	{
		name: $.t("game['百家乐']"),
		value: "2",
	},
	{
		name: "牛牛",
		value: "3",
	},
	{
		name: $.t("game['其他']"),
		value: "4",
	},
];

const games = [
	{ image: "path/to/image1.jpg", isNew: true },
	{ image: "path/to/image2.jpg", isNew: true },
	{ image: "path/to/image3.jpg", isNew: false },
	{ image: "path/to/image4.jpg", isNew: false },
	{ image: "path/to/image5.jpg", isNew: true },
];
</script>

<style lang="scss" scoped>
@import "./GameArena.scss";
</style>
