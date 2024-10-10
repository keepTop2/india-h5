<template>
	<div class="GameArena bg_BG1">
		<!-- 顶部搜索栏 -->
		<div class="navBar bg_BG1">
			<!-- <SvgIcon class="collapse_icon color_TB" iconName="common/arrowLeft" @click="onClickLeft" /> -->
			<!-- <div class="nav_bar_input bg_BG3">
				<SvgIcon iconName="venueHome/gameArena/search" />
				<input v-model="searchValue" @keydown.enter="handleSearch" ref="searchRef" :placeholder="$t(`game['输入游戏名称']`)" type="search" class="color_T2" />
			</div> -->
			<VantNavBar @onClickLeft="onClickLeft">
				<template v-slot:title>
					<input v-model="searchValue" @keydown.enter="handleSearch" ref="searchRef" style="width: 100%" :placeholder="$t(`game['输入游戏名称']`)" type="search" class="color_T2" />
				</template>
				<template v-slot:right>
					<div @click="handleSearch" class="searchBtn">搜索</div>
				</template>
			</VantNavBar>
		</div>

		<div class="gameList">
			<div class="search_list_container" v-if="gameList?.length">
				<div class="game-grid">
					<GameCard v-for="(game, index) in gameList" :key="index" :gameInfo="game" />
				</div>
			</div>
			<div v-else class="no_data_container">
				<VantLazyImg :src="noData" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * @description 游戏搜索页
 */
import { useRoute, useRouter } from "vue-router";
import noData from "./image.png";
import GameApi from "/@/api/venueHome/games";
import GameCard from "../components/GameCard.vue";
import { i18n } from "/@/i18n";
const $: any = i18n.global;
const route = useRoute();
const router = useRouter();
const gameList = ref();
const searchRef = ref();
const { gameOneId } = route.query;
const searchValue = ref();

// 页面加载后执行
onMounted(() => {
	searchRef.value.focus();
});
/**
 * 搜索游戏
 * 根据输入的游戏名称查询游戏信息，并更新游戏列表
 */
const handleSearch = () => {
	if (searchValue.value) {
		GameApi.queryGameInfoByName({
			gameName: searchValue.value,
			pageSize: -1,
		}).then((res) => {
			if (res.ok) {
				console.log("搜索游戏", res);
				gameList.value = res.data.records;
			}
		});
	} else {
		gameList.value = [];
	}
};
/**
 * 返回上一页
 * 当点击左上角图标时触发
 */
const onClickLeft = () => {
	router.back();
};
</script>

<style lang="scss" scoped>
// 样式代码...
.navBar {
	.searchBtn {
		width: 104px;
		height: 56px;
		border-radius: 10px;
		background: #ff284b;
		line-height: 56px;
	}
	@include themeify {
		input {
			padding: 12.5px 24px;
			background-color: themed("BG3") !important;
			border: none;
		}
	}
}
:deep(.van-nav-bar__title) {
	margin: 90px;
	width: 500px;
	max-width: 100%;
	display: block;
	position: relative;
	border: none;
	outline: none;
}
.no_data_container {
	text-align: center;

	img {
		width: 300px;
		margin: 0 auto;
	}
}
.gameList {
	padding: 24px 26px;
	.game-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
}
</style>
