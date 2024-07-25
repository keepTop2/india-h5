<template>
	<div class="supplier">
		<!-- <div class="mb20"> -->
		<div class="supplier_item">
			<div v-for="(item, index) in imgList" :key="`img1-${index}`" class="card">
				<img :key="index" :src="item.src" />
			</div>
		</div>
		<div class="supplier_item">
			<div v-for="(item, index) in imgList2" :key="`img2-${index}`" class="card">
				<img :key="index" :src="item.src" />
			</div>
		</div>
		<!-- </div> -->
	</div>
</template>

<script setup lang="ts">
import play1 from "./images/supplier1.png";
import play2 from "./images/supplier6.png";
import play3 from "./images/supplier2.png";
import play4 from "./images/supplier3.png";
import play5 from "./images/supplier4.png";
import play6 from "./images/supplier5.png";

const imgList = [
	{ id: 1, src: play1 },
	{ id: 2, src: play2 },
	{ id: 3, src: play3 },
];
const imgList2 = [
	{ id: 4, src: play4 },
	{ id: 5, src: play5 },
	{ id: 6, src: play6 },
];
</script>

<style lang="scss" scoped>
.supplier {
	@include themeify {
		* {
			box-sizing: border-box;
		}
		// padding: 40px;
		width: 100%;
		.supplier_item {
			display: flex;
			justify-content: space-between;
			gap: 21px;
			margin-bottom: 21px;
			align-items: center;
			.card {
				background: themed("BG3");
				width: 220px;
				// width: 100%;
				padding: 19px 45px;
				// flex-shrink: 0;
				img {
					width: 100%;
				}
			}
		}
	}
}
</style>
