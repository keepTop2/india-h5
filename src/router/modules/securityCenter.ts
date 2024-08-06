export const SecurityCenterRouter = {
	children: [
		{
			path: "/securityCenter",
			name: "securityCenter",
			component: () => import("/@/views/securityCenter/securityCenter/securityCenter.vue"),
			meta: {
				title: "安全中心",
			},
		},
		{
			path: "/loginPassword",
			name: "loginPassword",
			component: () => import("/@/views/securityCenter/loginPassword/loginPassword.vue"),
			meta: {
				title: "修改密码",
			},
		},
		{
			path: "/bind/:type(email|phone)", // 匹配 /bind/email 或 /bind/phone
			name: "bind-type",
			component: () => import("/@/views/securityCenter/bind/bind.vue"), // 可以是同一个组件或者不同的组件
			meta: {
				title: "绑定联系方式",
			},
		},
		{
			path: "/editContactDetails/:type(email|phone)", // 匹配 /bind/email 或 /bind/phone
			name: "edit-type",
			component: () => import("/@/views/securityCenter/editContactDetails/editContactDetails.vue"), // 可以是同一个组件或者不同的组件
			meta: {
				title: "绑定联系方式",
			},
		},
		{
			path: "/setTradingPassword",
			name: "setTradingPassword",
			component: () => import("/@/views/securityCenter/tradingPassword/setTradingPassword/setTradingPassword.vue"),
			meta: {
				title: "设置交易密码",
			},
		},
		{
			path: "/editTradingPassword",
			name: "editTradingPassword",
			component: () => import("/@/views/securityCenter/tradingPassword/editTradingPassword/editTradingPassword.vue"),
			meta: {
				title: "修改交易密码",
			},
		},
		{
			path: "/retrieveTradingPassword",
			name: "retrieveTradingPassword",
			component: () => import("/@/views/securityCenter/tradingPassword/retrieveTradingPassword/retrieveTradingPassword.vue"),
			meta: {
				title: "找回交易密码",
			},
			children: [
				{
					path: "/retrieveTradingPassword/:type(email|phone)",
					name: "retrieveTradingPassword-type",
					component: () => import("/@/views/securityCenter/tradingPassword/retrieveTradingPassword/verifyAccount/verifyAccount.vue"),
					meta: {
						title: "找回交易密码-账号校验",
					},
				},
				{
					path: "/retrieveTradingPassword/:type(email|phone)/retrieve",
					name: "retrieveTradingPassword-retrieve",
					component: () => import("/@/views/securityCenter/tradingPassword/retrieveTradingPassword/setTradingPassword/setTradingPassword.vue"),
					meta: {
						title: "找回交易密码-设置密码",
					},
				},
			],
		},
	],
};
