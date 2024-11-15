<template>
	<div class="buy-lottery-containers">
		<VantNavBar @onClickLeft="router.back()" :title="pageTitle" />
		<div class="containers">
			<BuyLotteryHeader :data="data" :timer-end-callback="timerEndCallback" />

			<slot />
		</div>
	</div>

	<div></div>
	<div></div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import useBuyCryptocurrency from "/@/views/lottery/components/BuyLotteryHeader/Index";

const props = defineProps({
	data: { type: Object, required: true },
	timerEndCallback: { type: Function, default: Function.prototype },
});

const { BuyLotteryHeader } = useBuyCryptocurrency();
const route = useRoute();
const router = useRouter();
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
	:deep(.lottery-result) {
		.result-header {
			width: 100%;
			height: 66px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: linear-gradient(to right, #353a3e, #2c2d2e);
			padding: 0 24px;
			font-size: 24px;
			box-sizing: border-box;
			border-radius: 20px 20px 0 0;
			@include themeify {
				color: themed("TB");
			}
		}
		.result-content {
			padding: 0 24px;
			@include themeify {
				background-color: themed("BG3");
			}
			&-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 20px 0 24px 0;
				gap: 20px;
				@include themeify {
					border-bottom: 1px solid themed(Line);
				}

				.issueNum {
					font-size: 24px;
					@include themeify {
						color: themed("T3");
					}
				}
				.winnNum {
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					justify-content: end;
					gap: 8px;
					.ball {
						width: 38px;
						height: 38px;
						line-height: 38px;
						font-size: 18px;
					}
				}
			}
			&-item:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>
