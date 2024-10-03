<template>
	<template v-if="blacklist.includes(route.path)">
		<NavBar />
	</template>
	<BackToTop />
	<div class="HomeContainer">
		<router-view />
	</div>
	<TabBar v-show="isTabBar" />
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";
import BackToTop from "/@/layout/home/components/BackToTop.vue";

const blacklist = ["/"];
const route = useRoute();
const isTabBar = computed(() => {
	console.log(route.meta.isTabBar, "=route.meta.isTabBar");
	return !route.meta.hideTabBar;
});
// 监听路由变化
</script>

<style scoped lang="scss">
.HomeContainer {
	min-height: 100vh;
	.content {
		padding-bottom: 160px;
	}
	@include themeify {
		background-color: themed("BG1");
	}
}
</style>
