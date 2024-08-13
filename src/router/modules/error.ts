export const ErrorRouter = {
	children: [
		{
			path: "/404",
			name: "404",
			component: () => import("/@/views/error/404/404.vue"),
			meta: {
				title: "页面丢失",
			},
		},
		{
			path: "/maintain",
			name: "maintain",
			component: () => import("/@/views/error/maintain/maintain.vue"),
			meta: {
				title: "站点维护",
			},
		},
		{
			path: "/accessDenied",
			name: "accessDenied",
			component: () => import("/@/views/error/accessDenied/accessDenied.vue"),
			meta: {
				title: "访问限制",
			},
		},
	],
};
