<template>
	<div>
		<h3 class="title">
			<span class="flex_align_center">
				<!-- <SvgIcon iconName="home/star" alt="" /> -->
				{{ gameList?.name }}
			</span>
			<span class="fs_28 color_T1 fw_400" @click="handleMore(gameList)">{{ $t(`home["更多"]`) }}</span>
		</h3>
		<div class="game-grid">
			<GameCard v-for="(game, index) in gameList?.gameInfoList.splice(0, 6)" :key="index" :game-info="game" />
		</div>
	</div>
</template>

<script setup lang="ts">
import GameCard from "../components/GameCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();

/**
 * @description: 二级游戏列表
 * @param {*} gameList Object 游戏列表数据
 * @param {*} showMore Boolean 是否显示更多按钮
 */
const props = defineProps({
	gameList: {
		type: Object,
		default: () => {},
	},
	showMore: Boolean,
});
const handleMore = (gameList) => {
	router.push({ name: "GameLists", query: { title: gameList?.name, gameTwoId: gameList?.id } });
};
</script>

<style scoped lang="scss">
.flex_align_center {
	display: flex;
	align-items: center;
}
.title {
	@include themeify {
		margin-top: 36px;
		margin-bottom: 24px;
		font-size: 32px;
		font-weight: 600;
		color: themed("TB");
		display: flex;
		align-items: center;
		justify-content: space-between;
		svg,
		img {
			width: 42px;
			height: 42px;
			margin-right: 12px;
		}
	}
}
.game-grid {
	display: flex;
	flex-wrap: wrap;
	// justify-content: space-between;
	gap: 16px;
}
.topTwoGame {
	display: flex;
	gap: 16px;
	margin-bottom: 16px;
	.game-card {
		width: 50%;
		height: auto;
	}
}
.more {
	width: 100%;
	display: flex;
	justify-content: center;
	button {
		width: 210px;
		height: 66px;
	}
}
</style>
