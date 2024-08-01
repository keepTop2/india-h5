<template>
	<div class="game-card">
		<!-- <div class="new-badge" v-if="isNew">
			<img src="./gameImg.png" alt="New" />
		</div> -->
		<img :src="gameImg" class="game-image" alt="Game" />
		<div class="favorite-icon">
			<SvgIcon iconName="home/event_collect" />
		</div>
	</div>
</template>

<script setup lang="ts">
import gameImg from "./gameImg.png";
const props = defineProps({
	image: String,
	isNew: Boolean,
});
</script>

<style scoped lang="scss">
.game-card {
	position: relative;
	width: 222px;
	height: 222px;
	border-radius: 10px;
	overflow: hidden;

	.game-image {
		width: 100%;
		height: auto;
	}

	.new-badge {
		position: absolute;
		top: 10px;
		left: 10px;
	}

	.favorite-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		svg {
			width: 32px;
			height: 32px;
		}
	}
}
</style>
