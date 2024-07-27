<template>
	<DynamicSvgComponent v-if="DynamicSvgComponent" />
</template>

<script setup lang="ts">
/**
 * 引入动态 SVG 组件
 * @param {string} iconName - SVG 图标路径/名称
 */

import { shallowRef } from "vue";

const props = defineProps(["iconName", "width", "height"]);

// 使用 shallowRef 浅层响应 存储异步加载的 SVG 图标路径
const DynamicSvgComponent = shallowRef(null);

// 在 setup 函数中动态加载 SVG 文件，并将加载完成后的 URL 赋值给 DynamicSvgComponent
import(`/@/assets/zh-CN/default/${props.iconName}.svg`)
	.then((module) => {
		DynamicSvgComponent.value = module.default;
	})
	.catch((error) => {
		console.log("加载失败");
	});
</script>
