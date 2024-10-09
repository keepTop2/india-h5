<template>
	<div>
		<div class="GameArena bg_BG1">
			<!-- 顶部搜索栏 -->
			<div class="navBar bg_BG1">
				<SvgIcon class="collapse_icon color_TB" iconName="common/collapse_icon" @click="onClickLeft" />
				<div class="nav_bar_input bg_BG3">
					<SvgIcon iconName="venueHome/gameArena/search" />
					<input @focus="router.push('/game/arena/search')" :placeholder="$t(`game['输入游戏名称']`)" type="text" class="color_T2" />
				</div>
			</div>
			<div>
				<!-- 轮播图 -->
				<Banner class="Home_Banner" />
				<div class="Game_Content">
					<!-- <Tabs class="plr" v-model="tabsActiveKey" :list="tabList" /> -->
					<!-- 热门游戏 -->
					<h3 class="title" v-if="gameList?.[0].length">
						<!-- <SvgIcon iconName="home/fire" alt="" /> -->
						<!-- :placeholder="$t(`game['输入游戏名称']`)" -->
						{{ $t('game["热门游戏"]') }}
						<span class="color_T1 fs_28 fw_400" @click="showMoreList($t(`game['热门游戏']`), 1)">{{ $t(`home["更多"]`) }}</span>
					</h3>
					<HotGame class="m24" :gameList="gameList?.[0]" v-if="gameList?.[0].length" />
					<!-- 新游戏 -->
					<h3 class="title" v-show="gameList?.[1]?.length">
						<!-- <SvgIcon iconName="home/event_game" alt="" /> -->
						{{ $t('game["新游戏"]') }}
						<span class="color_T1 fs_28 fw_400" @click="showMoreList($t(`game['热门游戏']`), 2)">{{ $t(`home["更多"]`) }}</span>
					</h3>
					<NewGame class="m24" :gameList="gameList?.[1]" />
					<!-- 二级列表 -->
					<GameChunk v-for="(game, index) in games" :key="index" class="m24" :showMore="true" :gameList="game" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * @description 游戏大厅
 */
import { useRoute, useRouter } from "vue-router";
import Tabs from "/@/components/Tabs/Tabs.vue";
import Banner from "./Banner/banner.vue";
// 热门游戏组件
import HotGame from "./HotGame/HotGame.vue";
// 新游戏组件
import NewGame from "./NewGame/NewGame.vue";
import GameCard from "./components/GameCard.vue";
import GameChunk from "./GameChunk/GameChunk.vue";
import GameApi from "/@/api/venueHome/games";
import pubsub from "/@/pubSub/pubSub";
import { i18n } from "/@/i18n";

const $: any = i18n.global;
const route = useRoute();
const router = useRouter();
const gameList = ref();
const { gameOneId } = route.query;
// 初始化当前选中tab
const tabsActiveKey = ref("all");

// tabs 切换选项
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

// 计算属性：过滤出label为0的游戏列表
const games = computed(() => {
	return gameList.value?.filter((item) => item.label == 0);
});

onBeforeMount(() => {
	// 获取游戏列表
	getGameList();
});

/**
 * @description 获取游戏列表
 */
const getGameList = () => {
	GameApi.queryGameInfoByOneClassId({ gameOneId: gameOneId }).then((res) => {
		console.log("获取游戏列表", res);
		gameList.value = res.data;
	});
};

/**
 * @description 点击左侧按钮时触发
 */
const onClickLeft = () => {
	// 发布折叠菜单事件
	pubsub.publish("onCollapseMenu");
};

/**
 * @description 显示更多游戏列表
 * @param {string} title - 游戏类别标题
 * @param {number} label - 游戏类别标签
 */
const showMoreList = (title, label) => {
	router.push({ name: "GameLists", query: { title, label, gameOneId } });
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
	@include themeify {
		stroke: themed("TB");
	}
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
