export const LotteryRouter = [
	{
		path: "/lottery/home",
		meta: { name: "LotteryHome", title: "彩票大厅" },
		name: "LotteryHome",
		component: import("/@/views/lottery/views/home/index.vue"),
	},
	{
		path: "/lottery/search",
		meta: { name: "LotterySearch", title: "彩票搜索" },
		name: "LotterySearch",
		component: import("/@/views/lottery/views/search/index.vue"),
	},
	{
		path: "/lottery/shishicai",
		meta: { name: "Shishicai", title: "时时彩" },
		name: "Shishicai",
		component: import("/@/views/lottery/views/category/shishicai/index.vue"),
	},
];
