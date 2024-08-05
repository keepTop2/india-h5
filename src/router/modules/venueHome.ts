import Layout from "/@/layout/venueHome/index.vue";

export const VenueHome = {
	component: Layout,
	children: [
		{
			path: "/sports",
			name: "sports",
			redirect: "/sports/rollingBall",
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
			path: "/sports/league/select/:sportType",
			name: "sportsLeagueSelect",
			meta: { title: "联赛筛选" },
			component: () => import("/@/views/venueHome/sports/views/leagueSelect/leagueSelect.vue"),
		},
		// 联赛详情
		{
			path: "/sports/event/detail/:eventId/:leagueId/:sportType",
			name: "sportsEventDetail",
			meta: { title: "联赛详情" },
			component: () => import("/@/views/venueHome/sports/views/eventDetail/eventDetail.vue"),
		},
		// {
		// 	path: "/lottery",
		// 	name: "lottery",
		// 	component: () => import("/@/views/venueHome/lottery/lottery.vue"),
		// 	meta: { title: "彩票" },
		// },
		{
			path: "/game/arena/:gameType",
			name: "GameArena",
			component: () => import("/@/views/venueHome/GameArena/GameArena.vue"),
			meta: {
				title: "游戏大厅",
			},
		},
	],
};
