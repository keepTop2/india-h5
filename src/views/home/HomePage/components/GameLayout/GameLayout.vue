<template>
	<div class="container bg_BG3">
		<div class="left-section">
			<div class="item big" id="item-1">
				<SvgIcon class="star" iconName="home/event_collect" />
				<!-- <VantLazyImg :src="img" /> -->
				<NoGameImg />
			</div>
			<div class="small-items">
				<div class="item" id="item-5">
					<SvgIcon class="star" iconName="home/event_collect" />
					<VantLazyImg :src="img" />
				</div>
				<div class="item" id="item-6">
					<SvgIcon class="star" iconName="home/event_collect" />
					<VantLazyImg :src="img" />
				</div>
			</div>
		</div>
		<div class="right-section">
			<div class="small-items">
				<div class="item" id="item-3">
					<SvgIcon class="star" iconName="home/event_collect" />
					<!-- <VantLazyImg :src="img" /> -->
					<NoGameImg />
				</div>
				<div class="item" id="item-4">
					<SvgIcon class="star" iconName="home/event_collect" />
					<VantLazyImg :src="img" />
				</div>
			</div>
			<div class="item big" id="item-2">
				<SvgIcon class="star" iconName="home/event_collect" />
				<VantLazyImg :src="img" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import img from "./image.png";
import VantLazyImg from "/@/components/vant/VantLazyImg.vue";
</script>
<style scoped lang="scss">
$border-color: #555;
$star-size: 30px;

.container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 14px;
	padding: 24px;
	border-radius: 20px;
	width: 100%;
	font-family: Arial, sans-serif;
	box-sizing: border-box;
	img {
		width: 100%;
		height: 100%;
	}
	.left-section,
	.right-section {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 14px;
	}

	.small-items {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.item {
		position: relative;
		@include themeify {
			border: 1px solid themed("T3");
		}
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 24px;
		width: 152px;
		height: 152px;
		&.big {
			width: 320px;
			height: 320px; // Adjust the height as needed
		}

		.star {
			position: absolute;
			top: 10px;
			right: 10px;
			width: $star-size;
			height: $star-size;
			background: url("path/to/star.png") no-repeat center center;
			background-size: contain;
		}
	}
}
</style>
