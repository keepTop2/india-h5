<template>
	<div class="game-card">
		<div class="new-badge">
			<SvgIcon iconName="venueHome/gameArena/new_game" />
		</div>
		<VantLazyImg :src="gameInfo.icon" class="game-image" alt="Game" />
		<div class="favorite-icon">
			<SvgIcon v-if="gameInfo.collect" @click="onClickCollect(gameInfo, false)" iconName="home/event_collect" />
			<SvgIcon v-else @click="onClickCollect(gameInfo, true)" iconName="home/event_collect_no" />
		</div>
		<div class="game-info bg_BG3 color_T1 fs_24">
			<p>{{ gameInfo.name }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GameInfoList, LobbyTopGame } from "/#/game";
import GameApi from "/@/api/venueHome/games";
const props = defineProps({
	gameInfo: {
		type: Object as PropType<GameInfoList>,
		default: () => ({}),
	},
});
const onClickCollect = async (item, collect) => {
	//点击收藏 判断是否登录 未登录添加提示信息
	const res = await GameApi.gameCollection({
		gameId: item.id,
		type: collect,
	});
	if (res.ok) {
		item.collect = collect;
	}
};
</script>

<style scoped lang="scss">
.game-card {
	position: relative;
	width: 222px;
	// height: 222px;
	border-radius: 20px;
	overflow: hidden;
	.game-info {
		height: 68px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		box-sizing: border-box;
		p {
			overflow-wrap: break-word;
			width: 100%;
		}
	}
	.game-image {
		width: 100%;
		height: 222px;
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
