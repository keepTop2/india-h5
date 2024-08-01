import { createRouter, createWebHistory, Router, createWebHashHistory } from "vue-router";

import LayoutRouter from "/@/router/modules/layout";
import componentsDemo from "/@/router/modules/componentsDemo";
import { LoginRegisterRouter, RegisterSubPage } from "/@/router/modules/loginRegister";
import { VenueHome } from "/@/router/modules/venueHome";
import { WalletSubRouter } from "/@/router/modules/wallet";

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
	// 注册子页面
	RegisterSubPage,
	// 钱包子页面
	WalletSubRouter,
	// 公共组件使用demo
	componentsDemo,
];

const router: Router = createRouter({
	history: createWebHashHistory("/"),
	routes: routes,
} as any);

export default router;
