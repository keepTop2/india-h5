import { createRouter, createWebHistory, Router, createWebHashHistory } from "vue-router";

import LayoutRouter from "/@/router/modules/layout";
import LoginRegisterRouter from "/@/router/modules/loginRegister";

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
	// 登录注册路由
	LoginRegisterRouter,
];

const router: Router = createRouter({
	history: createWebHashHistory("/"),
	routes: routes,
} as any);

export default router;
