// import { createRouter, createWebHistory, Router, createWebHashHistory } from "vue-router";
import { createRouter, Router, createWebHashHistory } from "vue-router";
import Layout from "/@/layout/home/index.vue";
import componentsDemo from "/@/router/modules/componentsDemo";
import { LoginRegisterRouter, RegisterSubPage } from "/@/router/modules/loginRegister";
import { VenueHome } from "/@/router/modules/venueHome";
import { WalletRouter, WalletSubRouter } from "/@/router/modules/wallet";
import { MySubRouter } from "/@/router/modules/my";
import { VipRouter } from "/@/router/modules/vip";
import { activityRoutes } from "/@/router/modules/activity";
import { SecurityCenterRouter } from "/@/router/modules/securityCenter";
import { ErrorRouter } from "/@/router/modules/error";
import { useUserStore } from "../store/modules/user";
/**
 * @description idx大小判断路由左切动画还是右切动画
 */
const routes = [
	// {
	// 	path: "/:pathMatch(.*)*",
	// 	redirect: "/frontPage/home",
	// },
	{
		path: "/",
		component: Layout,
		redirect: "/",
		meta: {
			title: "首页",
			keepAlive: false,
		},
		children: [
			{
				path: "/",
				name: "home",
				component: () => import("/@/views/home/home.vue"),
				meta: {
					title: "首页",
					keepAlive: false,
				},
			},
			{
				path: "/discount",
				name: "discount",
				layout: false,
				component: () => import("/@/views/discount/discount.vue"),
				meta: {
					title: "优惠",
					keepAlive: true,
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
				path: "/discount/detail",
				name: "discountDetail",
				component: () => import("/@/views/discount/FirstDeposit/FirstDeposit.vue"),
				meta: {
					title: "活动详情",
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
	},

	{
		path: "/gamePage",
		name: "gamePage",
		component: () => import("/@/views/game/index.vue"),
		meta: { title: "gamePage" },
	},
	{
		path: "/helpCenter",
		name: "helpCenter",
		component: () => import("/@/views/helpCenter/index.vue"),
		meta: { title: "helpCenter" },
	},
	{
		path: "/demo",
		component: () => import("/@/views/demoApp/demoApp.vue"),
	},
	// 一级页路由

	// 游戏场馆主页
	VenueHome,
	// 登录注册路由
	LoginRegisterRouter,
	// 主货币；协议
	// RegisterSubPage,
	// 钱包子页面
	WalletSubRouter,
	// 我的页面子页面
	MySubRouter,
	// Vip相关路由
	VipRouter,
	// 安全中心相关路由
	SecurityCenterRouter,
	// 公共组件使用demo
	componentsDemo,
	// 活动路由
	activityRoutes,
	// 错误路由
	ErrorRouter,
];

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
} as any);

// router.beforeEach((to, from, next) => {
// 	if (to.fullPath.indexOf("activity") !== -1) {
// 		if (useUserStore().token) {
// 			next();
// 		} else {
// 			router.push("/login");
// 		}
// 	} else {
// 		next();
// 	}
// });
export default router;
