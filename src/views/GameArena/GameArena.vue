<template>
	<div class="GameArena bg_BG1">
		<!-- 轮播图 -->
		<Banner class="Home_Banner mb_35" />
		<div class="Game_Content">
			<Tabs class="plr" v-model="tabsActiveKey" :list="tabList" />
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
				<span class="more fw_400 fs_28 color_T1">更多</span>
			</h3>
			<EventList class="m24" />
			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/event_777" alt="" />
					{{ $t('home["热门电子"]') }}
				</span>
				<span class="more fw_400 fs_28 color_T1">更多</span>
			</h3>
			<GameLayout class="m24" />

			<h3 class="title_more">
				<span class="flex_align_center">
					<SvgIcon iconName="home/event_people" alt="" />
					{{ $t('home["热门真人"]') }}
				</span>
				<span class="more fw_400 fs_28 color_T1">更多</span>
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
			<div class="dutyTitle color_Theme">{{ $t('home["负责任游戏"]') }}</div>
			<div class="duty">
				<VantLazyImg :src="duty" class="dutyImg" />
			</div>
			<p class="dutyMsg color_T1">{{ $t('home["负责任游戏描述"]') }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Tabs from "./components/Tabs/Tabs.vue";
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
import duty from "/@/views/home/static/images/duty.png";
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
</script>

<style lang="scss" scoped>
@import "./GameArena.scss";
</style>
