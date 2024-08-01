<template>
	<div class="container">
		<div class="tip">{{ $t('wallet["*您所有区域的支付方式"]') }}</div>
		<Card class="mt_24" v-for="(item, index) in dataList" :key="index" :title="item.type" :data="item.channelList" @check="onCheck" />
	</div>
</template>

<script setup lang="ts">
import Card from "../components/card.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dataList = [
	{
		type: "推荐方式",
		channelList: [
			{
				name: "VISA",
			},
			{
				name: "VISA",
			},
			{
				name: "VISA",
			},
			{
				name: "VISA",
			},
		],
	},
	{
		type: "银行卡",
		channelList: [
			{
				name: "VISA",
			},
		],
	},
	{
		type: "电子钱包",
		channelList: [
			{
				name: "VISA",
			},
		],
	},
	// {
	// 	type: "支付系统",
	// 	channelList: [
	// 		{
	// 			name: "VISA",
	// 		},
	// 	],
	// },
	// {
	// 	type: "银行转账",
	// 	channelList: [
	// 		{
	// 			name: "VISA",
	// 		},
	// 	],
	// },
	// {
	// 	type: "加密货币",
	// 	channelList: [
	// 		{
	// 			name: "VISA",
	// 		},
	// 	],
	// },
];

const onCheck = () => {
	console.log("触发");
	router.push({ path: "/wallet/rechargeDetails" });
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
