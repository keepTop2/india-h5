<template>
	<div>
		<div class="topTwoGame">
			<GameCard v-for="(game, index) in games" v-show="index < 2" :key="index" :image="game.image" />
		</div>
		<div class="game-grid">
			<GameCard v-for="(game, index) in games" v-show="index >= 2" :key="index" :image="game.image" />
		</div>
		<div class="more mt_46" v-if="showMore">
			<Button @click="getGameList">查看更多</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import GameCard from "./GameCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();

type Game = {
	image: string;
};

const pageNum = ref(1);
const pageSize = ref(15);

const props = defineProps({
	games: {
		type: Array<Game>,
		default: () => [],
	},
	showMore: Boolean,
});
const getGameList = () => {
	//根据不同的gameType获取不同的游戏列表
	console.log(route.params.gameType);
	console.log("查看更多,每次获取多15个");
};
</script>

<style scoped lang="scss">
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
