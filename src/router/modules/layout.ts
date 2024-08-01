import Layout from "/@/layout/home/index.vue";
import { WalletRouter } from "./wallet";

const LayoutRouter = {
	path: "/",
	redirect: "/home",
	component: Layout,
	children: [
		{
			path: "/game/arena",
			name: "GameArena",
			component: () => import("/@/views/GameArena/GameArena.vue"),
			meta: {
				title: "游戏大厅",
			},
		},
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
