import { createRouter, createWebHistory, Router, createWebHashHistory } from "vue-router";

import LayoutRouter from "/@/router/modules/layout";

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
	LayoutRouter,
];

const router: Router = createRouter({
	history: createWebHashHistory("/"),
	routes: routes,
} as any);

export default router;
