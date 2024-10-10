<template>
	<div class="noData-content">
		<div class="content">
			<VantLazyImg class="noData-icon" :src="noData" />
			<div class="label">暂无赛事</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import noData from "/@/assets/zh-CN/default/venueHome/sports/noData.png";
</script>

<style scoped lang="scss">
.noData-content {
	width: 100%;
	// height: 100%;
	display: flex;
	justify-content: center;
	.noData-icon {
		width: 241px;
		height: 191px;
	}
	.content {
		margin-top: 200px;
		text-align: center;
	}
	.label {
		margin-top: 24px;
		@include themeify {
			color: themed("T3");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 34px;
	}
}
</style>
