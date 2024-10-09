<template>
	<img
		v-if="useLazyLoad"
		v-lazy="{
			src: src,
			loading: loadingSrc,
			error: errorSrc,
		}"
		:alt="alt"
		:width="width"
		:height="height"
		:style="style"
		:class="className"
	/>
	<img v-else :src="src" :alt="alt" :width="width" :height="height" :style="style" :class="className" />
</template>

<script setup>
/**
 * @param {String} src 图片地址
 * @param {String} alt 图片描述
 * @param {Boolean} useLazyLoad 是否使用懒加载
 * @param {String} loadingSrc 加载中图片地址
 * @param {String} errorSrc 加载失败图片地址
 * @param {String} width 宽度
 * @param {String} height 高度
 * @param {String} className 类名
 * @param {Object} style 样式
 */
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		default: "",
	},
	width: [String, Number],
	height: [String, Number],
	className: String,
	style: Object,
	useLazyLoad: {
		type: Boolean,
		default: true,
	},
	loadingSrc: {
		type: String,
		default: "",
	},
	errorSrc: {
		type: String,
		default: "",
	},
});
</script>

<style scoped>
img {
	object-fit: cover;
}
</style>
