<template>
	<template v-if="blacklist.includes(route.path)">
		<NavBar />
	</template>
	<BackToTop />
	<div class="HomeContainer">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" class="content" />
			</transition>
		</router-view>
	</div>
	<TabBar v-show="isTabBar" />
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";
import BackToTop from "/@/layout/home/components/BackToTop.vue";

const blacklist = ["/home"];
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
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
