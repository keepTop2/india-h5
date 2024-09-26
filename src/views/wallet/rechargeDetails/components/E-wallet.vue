<template>
	<div class="header-card">
		<van-field class="header-cell bb" :label="$t(`recharge['账号名称']`)" input-align="right" :placeholder="$t(`recharge['请输入']`)" />
		<van-field class="header-cell" :label="$t(`recharge['账号密码']`)" input-align="right" :placeholder="$t(`recharge['请输入']`)" />
	</div>

	<div class="card mt_24">
		<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
		<div class="herder mb_24">
			<span class="title">{{ $t('recharge["个人信息"]') }}</span>
		</div>
		<div class="cell">
			<h5>{{ $t('recharge["银行卡号"]') }}</h5>
			<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
		</div>
		<div class="cell">
			<h5>{{ $t('recharge["名字"]') }}</h5>
			<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
		</div>
	</div>

	<div class="card mt_24">
		<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
		<div class="herder mb_10">
			<span class="title">{{ $t('recharge["充值金额"]') }}</span>
			<span class="limit">${{ 100 }}-{{ 1000 }}</span>
		</div>

		<van-field class="field mt-12" label-class="currency-symbol" v-model="state.value1">
			<template #label>$</template>
			<template #extra>
				<div class="extra-tip">{{ $t('recharge["额外"]') + "+$" }}{{ 100 }}</div>
			</template>
		</van-field>

		<div class="amount-list mt_24">
			<div class="amount-item van-haptics-feedback" v-for="(item, index) in amountList" :key="index">$ {{ item }}</div>
		</div>
	</div>

	<div class="footer">
		<Button>{{ $t('recharge["立即存款"]') }}</Button>
	</div>
</template>

<script setup lang="ts">
const amountList = ["100", "200", "5000", "10000"];

const state = reactive({
	value1: "",
});
</script>

<style scoped lang="scss">
.header-card {
	border-radius: 16px;
	@include themeify {
		background: themed("BG3");
	}

	.header-cell {
		height: 86px;
		padding: 20px 24px;
		@include themeify {
			background: themed("BG3");
		}
		border: 0;

		:deep(.van-field__label) {
			@include themeify {
				color: themed("T1");
			}
			font-size: 28px;
			font-weight: 500;
		}
	}

	.bb {
		border-bottom: 1px solid;
		@include themeify {
			border-color: themed("Line");
		}
		border-bottom-right-radius: 0px;
		border-bottom-left-radius: 0px;
	}
}

@import "./common.scss";
</style>
