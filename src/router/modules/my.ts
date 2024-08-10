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
	],
};
