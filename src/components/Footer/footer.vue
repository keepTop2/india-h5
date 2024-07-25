<template>
	<div class="footer">
		<div class="mb20">
			<h3 class="zanzhu">{{ $t('footer["赞助与博彩责任"]') }}</h3>
			<div class="image-container sponsor_list">
				<div v-for="item in imgList" :key="item.id" class="card">
					<img :src="item.src" alt="平台赞助图片" />
				</div>
			</div>
			<div class="image-container sponsor_list">
				<div v-for="item in imgList2" :key="item.id" class="card">
					<img :src="item.src" alt="平台赞助图片" />
				</div>
			</div>
		</div>
		<div class="Line"></div>
		<div>
			<h3 class="logo fs_32 fw_900 mb_8">OKsport</h3>
			<p class="tips">{{ $t('footer["风险提示"]') }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 假设有一个函数，可以从配置中动态加载图片
function loadImages(config) {
	return config.map((item) => ({
		id: item.id,
		src: new URL(`./images/${item.id}.png`, import.meta.url), // 动态导入图片
	}));
}

const imgList = ref(loadImages([{ id: "play1" }, { id: "play2" }, { id: "play3" }]));
const imgList2 = ref(loadImages([{ id: "play4" }, { id: "play5" }, { id: "play6" }]));
</script>

<style lang="scss" scoped>
.footer {
	@import "./footer.scss";
	width: 100%;
	padding-bottom: 50px;
	margin-top: 32px;

	// .image-container {
	// 	display: flex;
	// 	flex-wrap: wrap;
	// }

	// .card {
	// 	flex-basis: calc(33.33% - 10px); // 调整图片显示的宽度和间隔
	// 	margin-bottom: 10px;
	// }
}
</style>
