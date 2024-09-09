<template>
	<div class="container bg_BG3">
		<div class="left-section">
			<div class="item big" id="item-1">
				<SvgIcon v-if="gameInfoList?.[0]?.collect" @click="onClickCollect(gameInfoList?.[0], false)" iconName="home/event_collect" />
				<SvgIcon v-else @click="onClickCollect(gameInfoList?.[0], true)" iconName="home/event_collect_no" />
				<VantLazyImg :src="gameInfoList?.[0]?.icon || ''" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
				<!-- <NoGameImg v-else /> -->
			</div>
			<div class="small-items">
				<div class="item" id="item-5">
					<SvgIcon v-if="gameInfoList?.[1]?.collect" @click="onClickCollect(gameInfoList?.[1], false)" iconName="home/event_collect" />
					<SvgIcon v-else @click="onClickCollect(gameInfoList?.[1], true)" iconName="home/event_collect_no" />
					<VantLazyImg :src="gameInfoList?.[1]?.icon || ''" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
				</div>
				<div class="item" id="item-6">
					<SvgIcon v-if="gameInfoList?.[2]?.collect" @click="onClickCollect(gameInfoList?.[2], false)" iconName="home/event_collect" />
					<SvgIcon v-else @click="onClickCollect(gameInfoList?.[2], true)" iconName="home/event_collect_no" />
					<VantLazyImg :src="gameInfoList?.[2]?.icon || ''" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
				</div>
			</div>
		</div>
		<div class="right-section">
			<div class="small-items">
				<div class="item" id="item-3">
					<SvgIcon v-if="gameInfoList?.[3]?.collect" @click="onClickCollect(gameInfoList?.[3], false)" iconName="home/event_collect" />
					<SvgIcon v-else @click="onClickCollect(gameInfoList?.[3], true)" iconName="home/event_collect_no" />
					<VantLazyImg :src="gameInfoList?.[3]?.icon || ''" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
				</div>
				<div class="item" id="item-4">
					<SvgIcon v-if="gameInfoList?.[4]?.collect" @click="onClickCollect(gameInfoList?.[4], false)" iconName="home/event_collect" />
					<SvgIcon v-else @click="onClickCollect(gameInfoList?.[4], true)" iconName="home/event_collect_no" />
					<VantLazyImg :src="gameInfoList?.[4]?.icon || ''" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
				</div>
			</div>
			<div class="item big" id="item-2">
				<SvgIcon v-if="gameInfoList?.[5]?.collect" @click="onClickCollect(gameInfoList?.[5], false)" iconName="home/event_collect" />
				<SvgIcon v-else @click="onClickCollect(gameInfoList?.[5], true)" iconName="home/event_collect_no" />
				<VantLazyImg :src="gameInfoList?.[5]?.icon || ''" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import img from "./image.png";
import VantLazyImg from "/@/components/vant/VantLazyImg.vue";
import loadingSrc from "../static/loading.png";
import { GameInfoList } from "/#/game";
import GameApi from "/@/api/venueHome/games";
import pubsub from "/@/pubSub/pubSub";

/**
 * @description 游戏6格基础布局组件的属性定义
 * @param {GameInfoList[]} gameInfoList 游戏列表
 */
const props = defineProps<{
	gameInfoList: GameInfoList[];
}>();

/**
 * @description 处理游戏收藏/取消收藏的点击事件
 * @param {Object} item 游戏信息对象
 * @param {boolean} collect 是否收藏
 */
const onClickCollect = async (item, collect) => {
	const res = await GameApi.gameCollection({
		gameId: item.id,
		type: collect,
	});
	if (res.ok) {
		item.collect = collect;
		pubsub.publish("getCollect");
	}
};
</script>
<style scoped lang="scss">
.container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 14px;
	padding: 24px;
	border-radius: 20px;
	width: 100%;
	font-family: Arial, sans-serif;
	box-sizing: border-box;
	img {
		width: 100%;
		height: 100%;
	}
	.left-section,
	.right-section {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 14px;
	}

	.small-items {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.item {
		position: relative;
		// border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		width: 152px;
		height: 152px;
		@include themeify {
			// border: 1px solid themed("T3");
		}
		&.big {
			width: 320px;
			height: 320px; // Adjust the height as needed
		}

		svg {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 30px;
			height: 30px;
			background-size: contain;
		}
	}
}
</style>
