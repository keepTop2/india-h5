<template>
	<div class="game-card">
		<div class="new-badge">
			<SvgIcon iconName="venueHome/gameArena/new_game" />
		</div>
		<img :src="gameImg" class="game-image" alt="Game" />
		<div class="favorite-icon">
			<SvgIcon v-if="isCollect" @click="onClickCollect(true)" iconName="home/event_collect" />
			<SvgIcon v-else @click="onClickCollect(false)" iconName="home/event_collect_no" />
		</div>
	</div>
</template>

<script setup lang="ts">
import gameImg from "./gameImg.png";
const isCollect = computed(() => false);
const props = defineProps({
	image: String,
	isNew: Boolean,
});
const onClickCollect = (type?: boolean) => {
	console.log("点击收藏",type);
};
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
		top: 0px;
		left: 0px;
		svg {
			width: 80px;
			height: 65px;
		}
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
