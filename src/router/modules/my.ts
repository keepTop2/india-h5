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
			path: "/feedbackRecords",
			name: "feedbackRecords",
			component: () => import("/@/views/subViews/my/feedbackRecords/feedbackRecords.vue"),
			meta: {
				title: "反馈记录",
			},
		},
		{
			path: "/feedbackDetails",
			name: "feedbackDetails",
			component: () => import("/@/views/subViews/my/feedbackDetails/feedbackDetails.vue"),
			meta: {
				title: "反馈详情",
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
			path: "/messageCenter",
			name: "messageCenter",
			component: () => import("/@/views/subViews/my/messageCenter/messageCenter.vue"),
			meta: { title: "通知" },
		},
		{
			path: "/messageDetail",
			name: "messageDetail",
			component: () => import("/@/views/subViews/my/messageDetail/messageDetail.vue"),
			meta: { title: "反馈详情" },
		},
		{
			path: "/language",
			name: "language",
			component: () => import("/@/views/subViews/my/language/language.vue"),
			meta: { title: "语言" },
		},
	],
};
