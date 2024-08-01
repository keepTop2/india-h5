<template>
	<div class="rechargeOrder">
		<VantNavBar :title="$t(`VantNavBar['充值详情']`)" @onClickLeft="onClickLeft" />
		<div class="container">
			<!-- 线下 -->
			<component :is="BankDepositInfo" />
		</div>
	</div>
</template>

<script setup lang="ts">
import BankDepositInfo from "./components/BankDepositInfo.vue";

const onClickLeft = () => {
	window.history.back();
};
</script>

<style lang="scss" scoped>
.rechargeOrder {
	min-height: 100vh;
	@include themeify {
		background: themed("BG1");
	}
}
</style>
