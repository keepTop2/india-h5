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
	{
		path: "/lottery/kuaisan",
		name: "Kuaisan",
		meta: { name: "Shishicai", title: "快三" },
		component: () => import("/@/views/lottery/views/category/kuaisan/index.vue"),
	},
	{
		path: "/lottery/lucky28",
		name: "Lucky28",
		meta: { name: "Lucky28", title: "幸运28" },
		component: () => import("/@/views/lottery/views/category/lucky28/index.vue"),
	},
	// {
	// 	path: "/lottery/lucky28",
	// 	name: "Lucky28",
	// 	meta: { name: "Lucky28", title: "幸运28" },
	// 	component: () => import("/@/views/lottery/views/category/lucky28/index.vue"),
	// },
	// {
	// 	path: "/lottery/elevenChooseFive",
	// 	name: "ElevenChooseFive",
	// 	meta: { name: "ElevenChooseFive", title: "11选5" },
	// 	component: () => import("/@/views/lottery/views/category/elevenChooseFive/index.vue"),
	// },
];
