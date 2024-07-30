<template>
	<div class="protocol-container">
		<VantNavBar :title="$t(`VantNavBar['用户协议']`)" :leftArrow="false" closeIcon @onClickRight="onClickRight" />
		<div class="container">
			<div class="text">为了让您每一天都能尽情享受[平台名称]娱乐提供的最佳服务与体验。</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const onClickRight = () => {
	window.history.back();
};
</script>

<style scoped lang="scss">
.protocol-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.container {
		padding: 32px;
		.text {
			@include themeify {
				color: themed("T1");
			}
			font-size: 28px;
			font-weight: 400;
			line-height: 38px;
		}
	}
}
</style>
