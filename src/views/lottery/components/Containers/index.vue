<template>
	<div class="buy-lottery-containers">
		<VantNavBar :title="pageTitle" />
		<div class="containers">
			<BuyLotteryHeader :data="data" />

			<slot />
		</div>
	</div>

	<div></div>
	<div></div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import useBuyCryptocurrency from "/@/views/lottery/components/BuyLotteryHeader/Index";

const props = defineProps({
	data: { type: Object, required: true },
});

const { BuyLotteryHeader } = useBuyCryptocurrency();
const route = useRoute();
const pageTitle = route.meta?.title as string;
</script>

<style lang="scss" scoped>
.buy-lottery-containers {
	.containers {
		padding: 32px 24px 24px 24px;
	}
	:deep(.tabs) {
		margin-top: 24px;
		display: flex;
		gap: 16px;
		width: 100%;
		margin-bottom: 16px;
		.tabs-item {
			width: 100%;
			height: 68px;
			line-height: 68px;
			text-align: center;
			border-radius: 12px;
			transition: all 0.3s ease;
			@include themeify {
				color: themed("T1");
				background-color: themed("BG2");
			}
			&.actived {
				@include themeify {
					background: themed("Theme");
					color: themed("TB");
				}
			}
		}
	}
	:deep(.content) {
		.lottery-accordion {
			border-radius: 20px !important;
			overflow: hidden;
			.accordion-header {
				height: 68px;
				width: 100%;
				background: linear-gradient(to right, #353a3e, #2c2d2e);
				box-sizing: border-box;
				.header-title {
					font-size: 26px;
					@include themeify {
						color: themed("TB");
					}
				}
				.header-icon {
					@include themeify {
						color: themed("T3");
					}
				}
			}
			.accordion-content-item-balls {
				padding: 20px 16px 24px 16px;
				margin-top: -10px;
				.warn,
				.control {
					font-size: 24px;
				}
				.control {
					margin-top: 24px;
					margin-bottom: 34px;
				}
				@include themeify {
					background-color: themed("BG4");
					color: themed("T1");
				}
			}
		}
	}
}
</style>
