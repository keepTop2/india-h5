<template>
	<div class="CollectGames">
		<ul>
			<li v-for="(item, index) in collectList" class="gameCard" :key="index" @click="Common.goToGame(item)">
				<SvgIcon v-if="item.collect" iconName="home/event_collect" @click.stop="handleCollect(item, false)" alt="" />
				<SvgIcon v-else iconName="home/event_collect_no" @click.stop="handleCollect(item, true)" />
				<VantLazyImg :src="item.icon" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" />
				<div class="nameBox">
					<div class="name">{{ item.name }}</div>
				</div>
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
import Common from "/@/utils/common";
// 定义组件的emit事件
const emit = defineEmits(["queryCollection"]);

/**
 * @description 组件的props定义
 * @param {Array<GameInfoList>} collectList - 收藏游戏列表
 */
const props = defineProps({
	collectList: {
		type: Array<GameInfoList>,
		default: () => [],
	},
});

// 组件挂载后的生命周期钩子
onMounted(() => {
	console.log("Component mounted");
	// TODO: 调用接口获取收藏游戏的列表
});

/**
 * @description 处理游戏收藏/取消收藏的函数
 * @param {Object} item - 游戏项
 * @param {boolean} collect - 是否收藏
 */
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
	border-radius: 20px;
	box-sizing: border-box;
	position: relative;
	@include themeify {
		background: themed("BG3");
		color: themed("T1");
		.nameBox {
			display: flex;
			align-items: center; /* 垂直居中 */
			justify-content: center; /* 水平居中 */
			height: 72px;
			overflow: hidden;
		}
		.name {
			width: 164px;
			font-size: 24px;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2; /* 这里是超出几行省略 */
			overflow: hidden;
			padding: 0 12px;
			box-sizing: border-box;
		}
		img {
			width: 164px;
			height: 164px;
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
