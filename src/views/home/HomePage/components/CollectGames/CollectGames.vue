<template>
	<div class="CollectGames">
		<ul>
			<li v-for="i in new Array(8)" class="gameCard">
				<VantLazyImg :src="GameImg" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import GameImg from "/@/views/home/static/images/GameImg.png";
onMounted(() => {
	console.log("Component mounted");
	// 调用接口获取收藏游戏的列表
});
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
	@include themeify {
		border: 2px solid themed("T3");
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
