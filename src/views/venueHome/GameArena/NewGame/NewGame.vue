<template>
	<div class="NewGame">
		<div class="topTwoGame">
			<GameCard v-for="(game, index) in gameList?.gameInfoList" v-show="index < 2" :key="index" :game-info="game" />
		</div>
		<div class="game-grid">
			<GameCard v-for="(game, index) in gameList?.gameInfoList" v-show="index >= 2 && index <= 4" :key="index" :game-info="game" />
		</div>
	</div>
</template>

<script setup lang="ts">
import GameCard from "../components/GameCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps({
	showMore: Boolean,
	gameList: {
		type: Object,
		default: () => {},
	},
});
</script>

<style lang="scss">
.NewGame {
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
			width: 342px;
			height: 414px;
		}
		.game-image {
			height: 345px !important;
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
	}
}
</style>
