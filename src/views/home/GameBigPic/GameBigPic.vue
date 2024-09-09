<template>
	<div class="BigPic bg_BG3">
		<img :src="img" alt="" />
	</div>
</template>
<script lang="ts" setup>
/**
 * @description 游戏布局大图片展示
 */
import img from "./image.png";
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
	img {
		width: 100%;
		height: 100%;
		border-radius: 26px;
	}
}
</style>
