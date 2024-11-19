export const WalletRouter = {
	path: "/wallet",
	name: "wallet",
	redirect: "/wallet/recharge",
	component: () => import("/@/views/wallet/wallet.vue"),
	children: [
		{
			path: "/wallet/recharge",
			name: "recharge",
			component: () => import("/@/views/wallet/recharge/recharge.vue"),
			meta: {
				title: "充值",
			},
		},
		{
			path: "/wallet/withdraw",
			name: "withdraw",
			component: () => import("/@/views/wallet/withdraw/withdraw.vue"),
			meta: {
				title: "提款",
			},
		},
		{
			path: "/wallet/conversion",
			name: "conversion",
			component: () => import("/@/views/wallet/conversion/conversion.vue"),
			meta: {
				title: "交易",
			},
		},
		{
			path: "/wallet/records",
			name: "walletRecord",
			component: () => import("/@/views/wallet/records/records.vue"),
			meta: {
				title: "记录",
			},
		},
	],
};

// 钱包子路由
export const WalletSubRouter = {
	children: [
		{
			path: "/wallet/rechargeDetails",
			name: "rechargeDetails",
			component: () => import("/@/views/wallet/rechargeDetails/index.vue"),
			meta: {
				title: "充值详情",
			},
		},
	],
};
