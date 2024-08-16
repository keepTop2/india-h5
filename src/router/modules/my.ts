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
			path: "/medalCollection",
			name: "medalCollection",
			component: () => import("/@/views/subViews/my/medalCollection/medalCollection.vue"),
			meta: {
				title: "勋章收藏者",
			},
		},
		{
			path: "/medalDetails",
			name: "medalDetails",
			component: () => import("/@/views/subViews/my/medalDetails/medalDetails.vue"),
			meta: {
				title: "勋章详情",
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
		{
			path: "/messageCenter",
			name: "messageCenter",
			component: () => import("/@/views/subViews/my/messageCenter/messageCenter.vue"),
			meta: { title: "通知" },
		},
		{
			path: "/language",
			name: "language",
			component: () => import("/@/views/subViews/my/language/language.vue"),
			meta: { title: "语言" },
		},
	],
};
