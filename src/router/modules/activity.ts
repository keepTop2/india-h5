export const activityRoutes = {
	path: "/activity",
	name: "activity",
	meta: {
		title: "activity",
	},
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
			path: "/activity/LOSS_IN_SPORTS",
			name: "LOSS_IN_SPORTS",
			component: () => import("/@/views/discount/activityType/LOSS_IN_SPORTS.vue"),
			meta: {
				title: "LOSS_IN_SPORTS",
			},
		},
		{
			path: "/activity/FIRST_DEPOSIT",
			name: "FIRST_DEPOSIT",
			component: () => import("/@/views/discount/activityType/FIRST_DEPOSIT.vue"),
			meta: {
				title: "FIRST_DEPOSIT",
			},
		},
		{
			path: "/activity/ASSIGN_DAY",
			name: "ASSIGN_DAY",
			component: () => import("/@/views/discount/activityType/ASSIGN_DAY.vue"),
			meta: {
				title: "ASSIGN_DAY",
			},
		},
		{
			path: "/activity/RECHARGE_BONUS",
			name: "RECHARGE_BONUS",
			component: () => import("/@/views/discount/activityType/RECHARGE_BONUS.vue"),
			meta: {
				title: "RECHARGE_BONUS",
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
			component: () => import("/@/views/discount/activityType/DAILY_COMPETITION/index.vue"),
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
