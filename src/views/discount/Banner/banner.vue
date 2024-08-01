<!-- 顶部banner轮播图 -->
<template>
	<div class="banner">
		<Carousel :gameList="[1, 2, 3]" />
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carousel from "/@/components/Carousel/Carousel.vue";
</script>

<style lang="scss" scoped>
/* Your styles here */
.banner {
	// margin: 32px 0;
	height: 428px;
}
</style>
