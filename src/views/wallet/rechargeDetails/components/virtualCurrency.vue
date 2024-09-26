<template>
	<div class="card">
		<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
		<div class="herder mb_12">
			<span class="title">{{ $t('recharge["网络协议"]') }}</span>
		</div>

		<van-field class="field mt-12 cell-field" label-class="currency-symbol" v-model="state.value1">
			<template #right-icon>
				<SvgIcon iconName="arrow" />
			</template>
		</van-field>

		<div class="tips mt_10">{{ $t('recharge["注："]') }}1USDT=0.95USD</div>
	</div>
	<div class="QRcode-card">
		<div class="QRcode"></div>
		<div class="title">{{ $t('recharge["充值地址"]') }}</div>

		<div class="address mt_10">
			<div class="value">re9902fD24a58941d2d7beB489aA2db4Cikskfsfg950</div>
			<SvgIcon class="van-haptics-feedback" iconName="copy" :size="6.4" />
		</div>

		<div class="min-recharge">
			<SvgIcon class="van-haptics-feedback" iconName="wallet_hint" :size="4.266667" />
			<div class="text">{{ $t('recharge["最低"]') }} 50 USDT</div>
		</div>
	</div>
	<div class="footer-tips">
		{{ $t('recharge["注意：请记住，交易完成时的汇率可能与上述价格略有不同。"]') }}
	</div>
</template>

<script setup lang="ts">
const state = reactive({
	value1: "",
});
</script>

<style scoped lang="scss">
@import "./common.scss";

.cell-field {
	padding: 20px 24px;

	:deep(.van-field__control) {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		line-height: 38px;
	}
}

.QRcode-card {
	margin-top: 12px;
	padding: 20px 24px;
	border-radius: 16px;
	@include themeify {
		background: themed("BG3");
	}
	.QRcode {
		width: 320px;
		height: 320px;
		margin: 0 auto;
	}
	.title {
		@include themeify {
			color: themed("TB");
		}
		font-size: 28px;
		font-weight: 400;
		line-height: 38px;
	}
	.address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.value {
			width: 410px;
			@include themeify {
				color: themed("T1");
			}
			font-size: 28px;
			font-weight: 400;
			line-height: 38px;
			overflow-wrap: normal;
			overflow-wrap: anywhere;
			overflow-wrap: break-word;
		}
	}
	.min-recharge {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		.text {
			margin-left: 10px;
			@include themeify {
				color: themed("Hint-P");
			}
			font-size: 24px;
			font-weight: 400;
			line-height: 34px;
		}
	}
}
.footer-tips {
	padding: 24px;
	@include themeify {
		color: themed("Warn-P");
	}
	font-size: 24px;
	font-weight: 400;
	line-height: 38px;
}
</style>
