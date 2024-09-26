<template>
	<!-- 顶部导航栏 -->
	<VantNavBar :title="title" @onClickLeft="onClickLeft">
		<!-- 左侧自定义槽位，用于返回按钮 -->
		<template v-slot:left>
			<SvgIcon class="collapse_icon color_TB" iconName="common/arrowLeft" alt="" />
		</template>
	</VantNavBar>
	<!-- 游戏列表容器 -->
	<div class="GameLists">
		<!-- 遍历游戏列表，渲染游戏卡片 -->
		<GameCard v-for="(game, index) in gameLists" :key="index" :game-info="game" />
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description 游戏列表
 */
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import GameApi from "/@/api/venueHome/games";
import GameCard from "../components/GameCard.vue";

// 定义路由查询参数接口
interface QueryParams {
	gameOneId: number;
	label: number;
	title: string;
	gameTwoId: string;
}

// 获取路由实例，用于导航
const router = useRouter();
// 获取当前路由信息，用于获取查询参数
const route = useRoute();
// 用于存储游戏列表数据
const gameLists = ref();
// 将路由查询参数解构赋值为对应的变量
const { gameOneId, label, title, gameTwoId } = route.query as unknown as QueryParams;

// 在组件挂载后执行的方法
onMounted(() => {
	console.log(route, "====route");
	queryLobbyTopGame();
});

// 返回按钮点击事件处理方法
const onClickLeft = () => {
	console.log("onClickLeft");
	router.back();
};

// 查询大厅顶部游戏信息的方法
const queryLobbyTopGame = async () => {
	const res = await GameApi.queryGameInfoDetail({ gameOneId, label, gameTwoId: gameTwoId });
	if (res?.ok) {
		gameLists.value = res.data.records;
	}
};
</script>

<style scoped lang="scss">
// 游戏列表的样式，设置为灵活盒显示，自动换行，项目间距为16px，内边距为24px
.GameLists {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding: 24px;
}
// 返回图标样式，设置宽度和高度为32px
.collapse_icon {
	width: 32px;
	height: 32px;
}
</style>
