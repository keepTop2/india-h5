<template>
	<div class="CollectGames">
		<ul>
			<li v-for="item in collectList" class="gameCard">
				<SvgIcon v-if="item.collect" iconName="home/event_collect" @click="handleCollect(item, false)" alt="" width="100%" />
				<SvgIcon v-else iconName="home/event_collect_no" @click="handleCollect(item, true)" width="100%" />
				<VantLazyImg :src="GameImg" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import GameImg from "/@/views/home/static/images/GameImg.png";
import { GameInfoList } from "/#/game";
import loadingSrc from "../static/loading.png";
import GameApi from "/@/api/venueHome/games";
const emit = defineEmits(["queryCollection"]);
const props = defineProps({
	collectList: {
		type: Array<GameInfoList>,
		default: () => [],
	},
});
onMounted(() => {
	console.log("Component mounted");
	// 调用接口获取收藏游戏的列表
});

const handleCollect = async (item, collect) => {
	const res = await GameApi.gameCollection({
		gameId: item.id,
		type: collect,
	});
	if (res.ok) {
		item.collect = collect;
		emit("queryCollection");
	}
};
</script>

<style scoped lang="scss">
.CollectGames {
	ul {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}
}
.gameCard {
	width: 100%;
	height: 100%;
	border-radius: 20px;
	box-sizing: border-box;
	position: relative;
	@include themeify {
		border: 2px solid themed("T3");
		img {
			width: 100%;
			height: 100%;
		}
		svg {
			position: absolute;
			right: 10px;
			top: 10px;
			width: 30px;
			height: 30px;
		}
	}
}
</style>
