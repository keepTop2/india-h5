<template>
	<van-image :src="src" :lazy-load="useLazyLoad" :show-loading="showLoading" :alt="alt" :round="round" :radius="radius" :width="width" :height="height" :class="className" :style="style">
		<template #loading>
			<div class="loading_img_container">
				<img class="loading_img" :src="''" alt="" />
			</div>
		</template>
		<template #error>加载失败</template>
	</van-image>
</template>

<script setup lang="ts">
// import loading_img from "/@/assets/common/load.png";

/**
 * @param {String} fit 图片填充模式
 * @param {String} src 图片地址
 * @param {Boolean} showLoading 是否显示加载中
 * @param {Boolean} useLazyLoad 是否使用懒加载
 * @param {String} alt 图片描述
 * @param {Boolean} round 是否显示圆形
 * @param {Number} radius 圆角
 * @param {String} width 宽度
 * @param {String} height 高度
 * @param {String} className 类名
 */
const props = defineProps({
	fit: String,
	alt: String,
	round: Boolean,
	radius: Number,
	width: [String, Number],
	height: [String, Number],
	className: String,
	style: Object,
	src: {
		type: String,
		default: "",
	},
	showLoading: {
		type: Boolean,
		default: true,
	},
	useLazyLoad: {
		type: Boolean,
		default: true,
	},
});
</script>

<style lang="scss" scoped>
.loading_img_container {
	@include themeify {
		background: themed("Tag2-P");
	}
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.loading_img {
	width: 150px;
}

.van-image {
	width: 100%;
	height: 100%;
	display: block;
}

:deep(.van-image__loading) {
	background: transparent;
}
</style>
