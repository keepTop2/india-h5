import Layout from "/@/layout/home/index.vue";

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
		{
			path: "/wallet",
			name: "wallet",
			component: () => import("/@/views/wallet/wallet.vue"),
			meta: {
				title: "钱包",
			},
		},
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
