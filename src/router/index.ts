// import { createRouter, createWebHistory, Router, createWebHashHistory } from "vue-router";
import { createRouter, Router, createWebHashHistory } from "vue-router";

import LayoutRouter from "/@/router/modules/layout";
import componentsDemo from "/@/router/modules/componentsDemo";
import { LoginRegisterRouter, RegisterSubPage } from "/@/router/modules/loginRegister";
import { VenueHome } from "/@/router/modules/venueHome";
import { WalletSubRouter } from "/@/router/modules/wallet";
import { MySubRouter } from "/@/router/modules/my";
import { VipRouter } from "/@/router/modules/vip";
import { SecurityCenterRouter } from "/@/router/modules/securityCenter";
import { ErrorRouter } from "/@/router/modules/error";

/**
 * @description idx大小判断路由左切动画还是右切动画
 */
const routes = [
	// {
	// 	path: "/:pathMatch(.*)*",
	// 	redirect: "/frontPage/home",
	// },
	{
		path: "/demo",
		component: () => import("/@/views/demoApp/demoApp.vue"),
	},
	// 一级页路由
	LayoutRouter,
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
	{
		//转盘
		path: "/lottery",
		name: "Lottery",
		component: () => import("/@/views/Lottery/Lottery.vue"),
		meta: {
			title: "转盘",
		},
	},
	// 公共组件使用demo
	componentsDemo,
	// 错误路由
	ErrorRouter,
];

const router: Router = createRouter({
	history: createWebHashHistory("/"),
	routes: routes,
} as any);

export default router;
