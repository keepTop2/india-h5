import Layout from "/@/layout/venueHome/index.vue";

export const VenueHome = {
	path: "/venueHome",
	component: Layout,
	children: [
		{
			path: "/venueHome/sports",
			name: "sports",
			redirect: "/venueHome/sports/rollingBall",
			component: () => import("/@/views/venueHome/sports/sports.vue"),
			meta: {
				title: "体育",
			},
			children: [
				{
					path: "/venueHome/sports/rollingBall/:sportType",
					name: "rollingBallList",
					meta: { title: "滚球", name: "rollingBall" },
					component: () => import("/@/views/venueHome/sports/views/rollingBall/rollingBall.vue"),
				},
				{
					path: "/venueHome/sports/todayContest",
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
					path: "/venueHome/sports/morningTrading",
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
					path: "/venueHome/sports/champion",
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
					path: "/venueHome/sports/attention",
					name: "attentionList",
					meta: { name: "attention", title: "关注" },
					component: () => import("/@/views/venueHome/sports/views/attention/attention.vue"),
				},
				{
					path: "/venueHome/sports/matchResult",
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
			path: "/venueHome/sports/league/select/:sportType",
			name: "sportsLeagueSelect",
			meta: { title: "联赛筛选", hideTabBar: true },
			component: () => import("/@/views/venueHome/sports/views/leagueSelect/leagueSelect.vue"),
		},
		// 联赛详情
		{
			path: "/venueHome/sports/event/detail/:eventId/:leagueId/:sportType",
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
			path: "/game/arena",
			name: "GameArena",
			component: () => import("/@/views/venueHome/GameArena/GameArena.vue"),
			meta: {
				title: "游戏大厅",
				KeepAlive: false,
			},
		},
		{
			name: "GameLists",
			path: "/game/arena/lists",
			meta: {
				title: "游戏列表",
				hideTabBar: true,
			},
			component: () => import("/@/views/venueHome/GameArena/GameLists/GameLists.vue"),
		},
		{
			name: "GameSearch",
			path: "/game/arena/search",
			meta: {
				title: "游戏搜索",
				hideTabBar: true,
			},
			component: () => import(/* webpackPreload: true */ "/@/views/venueHome/GameArena/GameSearch/GameSearch.vue"),
		},
	],
};
