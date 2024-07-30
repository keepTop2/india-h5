import Layout from "/@/layout/venueHome/index.vue";

export const VenueHome = {
	component: Layout,
	children: [
		{
			path: "/sports",
			name: "sports",
			component: () => import("/@/views/venueHome/sports/sports.vue"),
			meta: { title: "体育" },
			children: [
				{
					path: "/sports/rollingBall",
					name: "rollingBallList",
					meta: { title: "滚球", name: "rollingBall" },
					component: () => import("/@/views/venueHome/sports/views/rollingBall/rollingBall.vue"),
					children: [
						{
							path: ":sportType", // 动态路由参数，匹配球类
							component: () => import("/@/views/venueHome/sports/views/rollingBall/rollingBall.vue"),
						},
					],
				},
				{
					path: "/sports/todayContest",
					name: "todayContestList",
					meta: { title: "今日", name: "todayContest" },
					component: () => import("/@/views/venueHome/sports/views/todayContest/todayContest.vue"),
					children: [
						{
							path: ":sportType", // 动态路由参数，匹配球类
							component: () => import("/@/views/venueHome/sports/views/todayContest/todayContest.vue"),
						},
					],
				},
				{
					path: "/sports/morningTrading",
					name: "morningTradingList",
					meta: { name: "morningTrading", title: "早盘" },
					component: () => import("/@/views/venueHome/sports/views/morningTrading/morningTrading.vue"),
					children: [
						{
							path: ":sportType", // 动态路由参数，匹配球类
							component: () => import("/@/views/venueHome/sports/views/morningTrading/morningTrading.vue"),
						},
					],
				},
				{
					path: "/sports/champion",
					name: "championList",
					meta: { name: "champion", title: "冠军" },
					component: () => import("/@/views/venueHome/sports/views/champion/champion.vue"),
					children: [
						{
							path: ":sportType", // 动态路由参数，匹配球类
							component: () => import("/@/views/venueHome/sports/views/champion/champion.vue"),
						},
					],
				},
				{
					path: "/sports/attention",
					name: "attentionList",
					meta: { name: "attention", title: "关注" },
					component: () => import("/@/views/venueHome/sports/views/attention/attention.vue"),
				},
				{
					path: "/sports/matchResult",
					name: "matchResultList",
					meta: { name: "matchResult", title: "赛果" },
					component: () => import("/@/views/venueHome/sports/views/matchResult/matchResult.vue"),
					children: [
						{
							path: ":sportType", // 动态路由参数，匹配球类
							component: () => import("/@/views/venueHome/sports/views/matchResult/matchResult.vue"),
						},
					],
				},
			],
		},
		{
			path: "/lottery",
			name: "lottery",
			component: () => import("/@/views/venueHome/lottery/lottery.vue"),
			meta: { title: "彩票" },
		},
	],
};