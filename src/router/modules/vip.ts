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
	],
};
