<template>
	<div class="BigPic bg_BG3">
		<!-- <SvgIcon v-if="useCollectGamesStore().getCollectGamesList?.some((game) => game.id === gameInfoList.id)" iconName="home/event_collect" @click.stop="onClickCollect(gameInfoList)" />
		<SvgIcon v-else @click.stop="onClickCollect(gameInfoList)" iconName="home/event_collect_no" /> -->

		<VantLazyImg :src="gameInfoList.iconFileUrl" alt="" @click="Common.goToGame(gameInfoList.gameInfoList[0])" />
	</div>
</template>
<script lang="ts" setup>
import GameApi from "/@/api/venueHome/games";
import router from "/@/router";
import { useCollectGamesStore } from "/@/store/modules/collectGames";
import { useUserStore } from "/@/store/modules/user";
import Common from "/@/utils/common";
const props = defineProps<{
	gameInfoList: [];
}>();
/**
 * @description 游戏布局大图片展示
 */
const onClickCollect = async (item) => {
	if (!useUserStore().token) {
		return router.push("/login");
	}
	const res: any = await GameApi.gameCollection({
		gameId: item.id,
		type: !item.collect,
	});
	if (res?.ok) {
		item.collect = !item.collect;
		useCollectGamesStore().setCollectGamesList();
	}
};
</script>
<style scoped lang="scss">
$background-color: #333;
$border-color: #555;
$star-size: 30px;

.BigPic {
	padding: 24px;
	width: 702px;
	height: 534px;
	box-sizing: border-box;
	border-radius: 26px;
	position: relative;
	svg {
		position: absolute;
		top: 40px;
		right: 40px;
		width: 40px;
		height: 40px;
		background-size: contain;
	}
	img {
		width: 100%;
		height: 100%;
		border-radius: 26px;
		object-fit: cover;
	}
}
</style>
