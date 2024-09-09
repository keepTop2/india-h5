<template>
	<div class="sponsor">
		<div class="mb20">
			<h3 class="zanzhu">{{ $t('home["赞助与博彩责任"]') }}</h3>
			<div class="image-container sponsor_list">
				<div v-for="item in imgList" :key="item.id" class="card bg_BG3">
					<VantLazyImg :src="String(item.src)" alt="平台赞助图片" />
				</div>
			</div>
			<div class="image-container sponsor_list">
				<div v-for="item in imgList2" :key="item.id" class="card bg_BG3">
					<VantLazyImg :src="String(item.src)" alt="平台赞助图片" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**
 * @description 从配置中动态加载图片
 * @param {Array} config - 包含图片配置的数组
 * @returns {Array} 返回处理后的图片数组
 */
function loadImages(config) {
	return config.map((item) => ({
		id: item.id,
		src: new URL(`./images/${item.id}.png`, import.meta.url), // 动态导入图片
	}));
}

// 第一组赞助商图片列表
const imgList = ref(loadImages([{ id: "play1" }, { id: "play2" }, { id: "play3" }]));

// 第二组赞助商图片列表
const imgList2 = ref(loadImages([{ id: "play4" }, { id: "play5" }, { id: "play6" }]));
</script>

<style lang="scss" scoped>
.sponsor {
	@import "./sponsor.scss";
	width: 100%;
	margin-top: 32px;

	.card {
		padding: 25px;
		box-sizing: border-box;
		img {
			width: 100%;
			height: 100%;
			object-fit: scale-down;
		}
	}
}
</style>
