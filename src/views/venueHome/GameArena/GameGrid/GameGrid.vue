<template>
	<div>
		<div class="topTwoGame">
			<GameCard v-for="(game, index) in games" v-show="index < 2" :key="index" :image="game.image" />
		</div>
		<div class="game-grid">
			<GameCard v-for="(game, index) in games" v-show="index >= 2" :key="index" :image="game.image" />
		</div>
		<div class="more mt_46" v-if="showMore">
			<Button>查看更多</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import GameCard from "./GameCard.vue";

type Game = {
	image: string;
};

const props = defineProps({
	games: {
		type: Array<Game>,
		default: () => [],
	},
	showMore: Boolean,
});
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
