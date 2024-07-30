import Layout from "/@/layout/venueHome/index.vue";

export const VenueHome = {
	component: Layout,
	children: [
		{
			path: "/sports",
			name: "sports",
			component: () => import("/@/views/venueHome/sports/sports.vue"),
			meta: { title: "体育" },
		},
		{
			path: "/lottery",
			name: "lottery",
			component: () => import("/@/views/venueHome/lottery/lottery.vue"),
			meta: { title: "彩票" },
		},
	],
};
