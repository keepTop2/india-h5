<template>
	<div class="card">
		<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
		<div class="herder mb_10">
			<span class="title">{{ $t('recharge["个人信息"]') }}</span>
		</div>

		<div class="cell">
			<h5>{{ $t('recharge["名字"]') }}</h5>
			<van-field class="field mt_12 cell-field" v-model="state.value1" />
		</div>
		<div class="cell">
			<h5>{{ $t('recharge["姓氏"]') }}</h5>
			<van-field class="field mt_12 cell-field" v-model="state.value1" />
		</div>
		<div class="cell">
			<h5>{{ $t('recharge["电子邮箱"]') }}</h5>
			<van-field class="field mt_12 cell-field" v-model="state.value1" />
		</div>
	</div>

	<div class="card mt_12">
		<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
		<div class="herder mb_10">
			<span class="title">{{ $t('recharge["充值金额"]') }}</span>
			<span class="limit">${{ 100 }}-{{ 1000 }}</span>
		</div>

		<van-field class="field mt_12" label-class="currency-symbol" v-model="state.value1">
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
@import "./common.scss";
</style>
