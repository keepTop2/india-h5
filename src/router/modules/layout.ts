import Layout from "/@/layout/home/index.vue";
import { WalletRouter } from "./wallet";

const LayoutRouter = {
	path: "/",
	redirect: "/home",
	component: Layout,
	children: [
		{
			path: "/discount",
			name: "discount",
			component: () => import("/@/views/discount/discount.vue"),
			meta: {
				title: "优惠",
			},
		},
		{
			path: "/discount/activityParticulars",
			name: "activityParticulars",
			component: () => import("/@/views/discount/components/activityParticulars.vue"),
			meta: {
				title: "活动详情",
			},
		},
		{
			//最近投注
			path: "/betLatest",
			name: "BetLatest",
			component: () => import("/@/views/BettingPage/BetLatest/BetLatest.vue"),
			meta: {
				title: "最近投注",
			},
		},
		{
			//规则
			path: "/betRule",
			name: "BetRule",
			component: () => import("/@/views/BettingPage/BetRule/BetRule.vue"),
			meta: {
				title: "规则",
			},
		},
		{
			//大额投注
			path: "/betBig",
			name: "BetBig",
			component: () => import("/@/views/BettingPage/BetBig/BetBig.vue"),
			meta: {
				title: "大额投注",
			},
		},
		{
			//投注比赛
			path: "/bettingMatch",
			name: "BettingMatch",
			component: () => import("/@/views/BettingPage/BettingMatch/BettingMatch.vue"),
			meta: {
				title: "投注比赛",
			},
		},
		{
			path: "/records",
			name: "records",
			component: () => import("/@/views/records/records.vue"),
			meta: {
				title: "记录",
			},
		},
		{
			path: "/home",
			name: "home",
			component: () => import("/@/views/home/home.vue"),
			meta: {
				title: "首页",
			},
		},
		//  钱包路由
		WalletRouter,
		{
			path: "/my",
			name: "my",
			component: () => import("/@/views/my/my.vue"),
			meta: {
				title: "我的",
			},
		},
	],
};

export default LayoutRouter;
