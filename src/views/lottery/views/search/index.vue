<template>
	<div class="GameArena bg_BG1">
		<!-- 顶部搜索栏 -->
		<div class="navBar bg_BG1">
			<VantNavBar @onClickLeft="onClickLeft">
				<template v-slot:title>
					<input v-model="searchValue" @keydown.enter="handleSearch" ref="searchRef" style="width: 100%" :placeholder="$t(`game['输入游戏名称']`)" type="search" class="color_T2" />
				</template>
				<template v-slot:right>
					<div @click="handleSearch" class="searchBtn">{{ $t(`lottery['搜索']`) }}</div>
				</template>
			</VantNavBar>
		</div>

		<div class="gameData">
			<div class="search_list_container" v-if="gameData?.length">
				<LotteryCard @click="handleClick(item)" :data="item.data" :key="item.id" v-for="item in gameData" />
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
import noData from "/@/assets/zh-CN/default/image.png";
import GameApi from "/@/api/venueHome/games";
import useLotteryCard from "/@/views/lottery/components/LotteryCard/Index";
import { i18n } from "/@/i18n";
import { useUserStore } from "/@/store/modules/user";
import { stringify } from "qs";
import { showToast } from "vant";
const $: any = i18n.global;

const router = useRouter();
const gameData = ref();
const searchRef = ref();
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
			venueCode: "ACELT",
			gameName: searchValue.value,
			pageSize: -1,
		}).then((res) => {
			if (res.ok) {
				gameData.value = res.data.records;
			}
		});
	} else {
		gameData.value = [];
	}
};
const maps: { [key: string]: string } = {
	K3: "/lottery/kuaisan", // 快三
	SSQ: "/lottery/ssq",
	PK10: "/lottery/pk10",
	_28: "/lottery/lucky28", // 幸运 28
	SSC: "/lottery/shishicai",
	SYXW: "/lottery/elevenChooseFive", // 11 选 5
	_3D: "/lottery/3D",
};
const handleClick = (game) => {
	if (!useUserStore().token) {
		return router.push("/login");
	}

	const { gameCategoryCode, venueCode, gameCode } = game;
	const { maxWin = 0 } = game.data;
	const searchParams = { venueCode, gameCode, maxWin };
	const targetView = maps[gameCategoryCode];
	if (targetView) {
		router.push(`${targetView}?${stringify(searchParams)}`);
	} else {
		showToast("Error: Path Not Found!");
	}
};

const { LotteryCard } = useLotteryCard();
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
.gameData {
	padding: 24px 26px;
	.search_list_container {
		border-radius: 20px;
		overflow: hidden;
	}
	.game-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
	.lottery-card-item.lottery-card {
		border-radius: 0;
		&:last-child:after {
			display: none;
		}
	}
}
</style>
