<!-- 顶部banner轮播图 -->
<template>
	<div class="banner">
		<Carousel :gameList="gameList" />
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carousel from "/@/components/Carousel/Carousel.vue";
import Img from "./image.png";
const gameList = [{ icon: Img }, { icon: Img }, { icon: Img }];
</script>

<style lang="scss" scoped>
/* Your styles here */
.banner {
	// margin: 32px 0;
	height: 360px;
	margin-bottom: 36px;
}
</style>
