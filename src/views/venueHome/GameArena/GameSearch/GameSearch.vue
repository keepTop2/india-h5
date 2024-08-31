<template>
	<div class="GameArena bg_BG1">
		<!-- 顶部搜索栏 -->
		<div class="navBar bg_BG1">
			<SvgIcon class="collapse_icon color_TB" iconName="common/arrowLeft" @click="onClickLeft" />
			<div class="nav_bar_input bg_BG3">
				<SvgIcon iconName="venueHome/gameArena/search" />
				<input v-model="searchValue" @keydown.enter="handleSearch" ref="searchRef" :placeholder="$t(`game['输入游戏名称']`)" type="search" class="color_T2" />
			</div>
			<Button @click="handleSearch">{{ $t("game[`搜索`]") }}</Button>
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

onMounted(() => {
	//设置输入框默认选中
	searchRef.value.focus();
});
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
const onClickLeft = () => {
	router.back();
};
</script>

<style lang="scss" scoped>
.GameArena {
	button {
		width: 104px;
		height: 56px;
		border-radius: 10px;
	}
}
.no_data_container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
	img {
		width: 50%;
	}
}
.search_list_container {
	padding: 24px 26px;
	.game-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
}

.collapse_icon {
	width: 32px;
	height: 32px;
}
input[type="search"] {
	/* 隐藏输入框后面的删除按钮 */
	-webkit-appearance: none; /* 隐藏默认样式 */
	appearance: none; /* 兼容 Firefox */
}

/* 隐藏删除按钮 */
input[type="search"]::-webkit-search-cancel-button {
	display: none;
}
.navBar {
	height: 88px;
	padding: 12px 28px;
	display: flex;
	box-sizing: border-box;
	position: sticky;
	top: 0;
	z-index: 2;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: space-between;
	@include themeify {
		box-shadow: 0px 4px 8px 0px themed("Shadow");
	}
	.nav_bar_input {
		display: flex;
		width: 522px;
		height: 64px;
		padding: 10px 24px;
		// margin-left: 30px;
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
