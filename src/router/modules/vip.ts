export const VipRouter = {
	children: [
		{
			path: "/vip",
			name: "vip",
			component: () => import("/@/views/vip/vipClub/vip.vue"),
			meta: {
				title: "VIP俱乐部",
			},
		},
		{
			path: "/vipRewards",
			name: "vipRewards",
			component: () => import("/@/views/vip/vipRewards/vipRewards.vue"),
			meta: {
				title: "VIP专属福利",
			},
		},
		{
			path: "/vipHierarchy",
			name: "vipHierarchy",
			component: () => import("/@/views/vip/vipHierarchy/vipHierarchy.vue"),
			meta: {
				title: "VIP等级制度",
			},
		},
	],
};
