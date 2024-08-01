<template>
	<div class="rechargeDetails">
		<VantNavBar :title="$t(`VantNavBar['充值详情']`)" @onClickLeft="onClickLeft" />
		<div class="container">
			<component :is="componentMaps[route.query.type]" />
		</div>
	</div>
</template>

<script setup lang="ts">
import bankCardsAndPaySystems from "./components/bankCardsAndPaySystems.vue";
import EWallet from "./components/E-wallet.vue";
import bankTransfer from "./components/bankTransfer.vue";
import virtualCurrency from "./components/virtualCurrency.vue";

import { useRoute } from "vue-router";

const route = useRoute();

const componentMaps = {
	bankCard: bankCardsAndPaySystems,
	"E-wallet": EWallet,
	"pay-system": bankCardsAndPaySystems,
	"bank-transfer": bankTransfer,
	cryptocurrency: virtualCurrency,
};

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
