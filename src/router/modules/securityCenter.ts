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
	],
};
