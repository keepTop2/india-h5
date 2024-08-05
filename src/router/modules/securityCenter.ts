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
		// {
		// 	path: "/securityCenter",
		// 	name: "securityCenter",
		// 	component: () => import("/@/views/securityCenter/securityCenter/securityCenter.vue"),
		// 	meta: {
		// 		title: "安全中心",
		// 	},
		// },
	],
};
