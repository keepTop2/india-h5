<template>
	<div class="rechargeDetails">
		<VantNavBar :title="$t(`VantNavBar['充值详情']`)" @onClickLeft="onClickLeft" />
		<div class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const onClickLeft = () => {
	window.history.back();
};
</script>

<style scoped lang="scss">
.rechargeDetails {
	min-height: 100vh;
	@include themeify {
		background: themed("BG1");
	}
	.container {
		padding: 24px;
	}
}
</style>
