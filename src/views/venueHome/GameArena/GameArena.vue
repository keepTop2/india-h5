<template>
	<div class="GameArena bg_BG1">
		<!-- 顶部搜索栏 -->
		<div class="navBar bg_BG1">
			<SvgIcon class="collapse_icon" iconName="common/collapse_icon" @click="onClickLeft" />
			<div class="nav_bar_input bg_BG3">
				<SvgIcon iconName="venueHome/gameArena/search" />
				<input v-model="searchValue" placeholder="输入游戏名称" type="text" class="color_T2" />
			</div>
		</div>
		<!-- <SvgIcon iconName="home/event_collect" /> -->
		<div v-if="searchValue" class="search_list_container">
			<div class="game-grid">
				<GameCard v-for="(game, index) in games" :key="index" :image="game.image" />
			</div>
		</div>
		<div v-show="!searchValue">
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
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Tabs from "/@/components/Tabs/Tabs.vue";
import Banner from "./Banner/banner.vue";
//热门游戏
import HotGame from "./HotGame/HotGame.vue";
//游戏6格布局
import GameGrid from "./GameGrid/GameGrid.vue";
import GameCard from "./GameGrid/GameCard.vue";
import pubsub from "/@/pubSub/pubSub";
import { i18n } from "/@/i18n";
const $: any = i18n.global;
const route = useRoute();
//初始化当前选中tab
const tabsActiveKey = ref("all");
const searchValue = ref();
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

const onClickLeft = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};
</script>

<style lang="scss" scoped>
@import "./GameArena.scss";
.search_list_container {
	padding: 24px 26px;
	.game-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
}

.collapse_icon {
	width: 64px;
	height: 64px;
}

.navBar {
	height: 88px;
	padding: 12px 28px;
	display: flex;
	box-sizing: border-box;
	position: sticky;
	top: 0;
	z-index: 2;
	@include themeify {
		box-shadow: 0px 4px 8px 0px themed("Shadow");
	}
	.nav_bar_input {
		display: flex;
		width: 600px;
		height: 64px;
		padding: 10px 24px;
		margin-left: 30px;
		display: flex;
		gap: 16px;
		border-radius: 12px;
		box-sizing: border-box;
		input {
			width: 500px;
			background: none;
			border: none;
			outline: none;
		}
		svg {
			width: 44px;
			height: 44px;
		}
	}
}
</style>
