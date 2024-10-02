export const activityRoutes = {
	children: [
		{
			path: "/activity/SECOND_DEPOSIT",
			name: "SECOND_DEPOSIT",
			component: () => import("/@/views/discount/activityType/SECOND_DEPOSIT.vue"),
			meta: {
				title: "SECOND_DEPOSIT",
			},
		},
		{
			path: "/activity/FREE_WHEEL",
			name: "FREE_WHEEL",
			component: () => import("/@/views/discount/activityType/FREE_WHEEL.vue"),
			meta: {
				title: "FREE_WHEEL",
			},
		},
		{
			path: "/activity/DAILY_COMPETITION",
			name: "DAILY_COMPETITION",
			component: () => import("/@/views/discount/activityType/DAILY_COMPETITION.vue"),
			meta: {
				title: "DAILY_COMPETITION",
			},
		},
		{
			path: "/activity/SPIN_WHEEL",
			name: "SPIN_WHEEL",
			component: () => import("/@/views/discount/activityType/SPIN_WHEEL/index.vue"),
			meta: {
				title: "SPIN_WHEEL",
			},
		},
		{
			path: "/activity/RED_BAG_RAIN",
			name: "RED_BAG_RAIN",
			component: () => import("/@/views/discount/activityType/RED_BAG_RAIN/index.vue"),
			meta: {
				title: "RED_BAG_RAIN",
			},
		},
		{
			path: "/activity/RED_BAG_RAIN/rainPage",
			name: "rainPage",
			component: () => import("/@/views/discount/activityType/RED_BAG_RAIN/rainPage.vue"),
			meta: {
				title: "rainPage",
			},
		},
	],
};
