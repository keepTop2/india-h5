<template>
	<div class="Lottery">
		<!-- Your template here -->
		<div class="card" v-for="(i, index) in items" :key="index">
			<img :src="i.imageUrl" alt="" @click="handleClick(i)" />
		</div>

		<!-- <SportsShopCart /> -->
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import img from "./images/image.png"; // 默认图片
const items = ref([{ imageUrl: img }, { imageUrl: img }, { imageUrl: img }]);

function handleClick(item) {
	console.log(item);
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
/* Your styles here */
.Lottery {
	padding: 0 20px;
	padding-bottom: 50px;
	.card {
		margin-bottom: 24px;
		border-radius: 16px;
		overflow: hidden;
		img {
			width: 100%;
		}
	}
}
</style>
