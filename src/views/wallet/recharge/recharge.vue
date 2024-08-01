<template>
	<div class="container">
		<div class="tip">{{ $t('wallet["*您所有区域的支付方式"]') }}</div>
		<Card class="mt_24" v-for="(item, index) in dataList" :key="index" :title="item.label" :data="item.channelList" @check="onCheck" />
	</div>
</template>

<script setup lang="ts">
import Card from "/@/views/wallet/components/card.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dataList = [
	{
		label: "推荐方式",
		channelList: [
			{
				type: "bankCard",
				name: "银行卡",
			},
			{
				type: "E-wallet",
				name: "电子",
			},
			{
				type: "pay-system",
				name: "支付系统",
			},
			{
				type: "bank-transfer",
				name: "银行卡转账",
			},
			{
				type: "cryptocurrency",
				name: "虚拟币",
			},
		],
	},
	{
		label: "银行卡",
		channelList: [
			{
				type: "bankCard",
				name: "VISA",
			},
		],
	},
	{
		label: "电子钱包",
		channelList: [
			{
				type: "E-wallet",
				name: "VISA",
			},
		],
	},
	{
		label: "支付系统",
		channelList: [
			{
				type: "pay-system",
				name: "VISA",
			},
		],
	},
	{
		label: "银行转账",
		channelList: [
			{
				type: "bank-transfer",
				name: "VISA",
			},
		],
	},
	{
		label: "加密货币",
		channelList: [
			{
				type: "cryptocurrency",
				name: "VISA",
			},
		],
	},
];

const onCheck = (item) => {
	router.push({ path: "/wallet/rechargeDetails", query: { type: item.type } });
};
</script>

<style scoped lang="scss">
.container {
	padding: 24px;
}
.tip {
	padding: 8px;
	@include themeify {
		color: themed("TB");
	}
	font-family: "PingFang SC";
	font-size: 30px;
	font-style: normal;
	font-weight: 400;
	line-height: 34px;
}
</style>
