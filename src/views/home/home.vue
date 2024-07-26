<template>
	<div class="home">
		<!-- <SvgIcon class="xxxx" iconName="common/notify" /> -->
		<HomePage />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { i18n } from "/@/i18n/index";
import { useRouter } from "vue-router";
import HomePage from "./HomePage/HomePage.vue";
// import useSportARouterChangeHooks from "/@/hooks/sportAHooks/useSportARouterChangeHooks";
// const { sportARouterChange } = useSportARouterChangeHooks();
const router = useRouter();
const route = useRoute();
// const MenuStore = useMenuStore();
const $: any = i18n.global;
//初始化当前选中tab
const tabsActiveKey = ref(route.path);

//tabs 切换
const tabList = [
	{
		name: $.t("home['首页']"),
		value: "/frontPage/home",
	},
	{
		name: $.t("home['赌场']"),
		value: "/frontPage/home/gambling/house",
	},
	{
		name: $.t("home['体育']"),
		value: "/frontPage/home/sports",
	},
	{
		name: $.t("home['彩票']"),
		value: "/frontPage/home/lottery",
	},
];

onBeforeMount(() => {
	/**
	 * @description 组件挂载之前根据路由判断选中的tab
	 */
	const currentPath = route.path;
	setActiveTab(currentPath);
});

watch(
	() => tabsActiveKey.value,
	(newValue, oldValue) => {
		router.push({ path: newValue });
	}
);

// const onChange = (item) => {
// 	if (item.value != "/frontPage/home/sports") {
// 		sportARouterChange({ path: "/preFetchSportAView" });
// 		// router.push({ path: item.value });
// 		// setTimeout(() => {
// 		// 	router.push({ path: item.value });
// 		// }, 2000);
// 	} else {
// 		router.push({ path: item.value });
// 	}
// 	// else {
// 	// 	sportARouterChange({ path: "/" });
// 	// }
// };

/**
 * @description 预加载完成
 */

// 由于体育下很多子路由，需要根据路径判断设置 active tab
const setActiveTab = (path) => {
	/**
	 * @description 翻转tablist 防止从首页开始匹配tab
	 */
	const reverseTab = tabList.slice().reverse();
	/**
	 * @description 遍历tablist 匹配路径
	 */
	const activeTab = reverseTab.find((tab) => path.startsWith(tab.value));
	if (activeTab) {
		tabsActiveKey.value = activeTab.value;
	}
};
</script>

<style lang="scss" scoped>
@import "./home.scss";
.home {
	height: 100%;
}
</style>
