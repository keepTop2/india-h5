/**
 * @description 公用组件使用示例
 */
const componentsDemo = {
	path: "/componentsDemo",
	redirect: "/singleSelectDemo",
	children: [
		{
			path: "/singleSelectDemo",
			name: "singleSelectDemo",
			component: () => import("/@/views/componentsDemo/singleSelectDemo/singleSelectDemo.vue"),
			meta: {
				title: "单项选择器使用示例",
			},
		},
		{
			path: "/multipleSelectDemo",
			name: "multipleSelectDemo",
			component: () => import("/@/views/componentsDemo/multipleSelectDemo/multipleSelectDemo.vue"),
			meta: {
				title: "多项选择器使用示例",
			},
		},
	],
};
export default componentsDemo;
