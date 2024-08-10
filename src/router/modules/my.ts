// 我的页面子路由
export const MySubRouter = {
	children: [
		{
			path: "/feedback",
			name: "feedback",
			component: () => import("/@/views/subViews/my/feedback/feedback.vue"),
			meta: {
				title: "意见反馈",
			},
		},
		{
			path: "/betting/record",
			name: "bettingRecord",
			component: () => import("/@/views/BettingRecord/BettingRecord.vue"),
			meta: {
				title: "投注记录",
			},
		},
	],
};
