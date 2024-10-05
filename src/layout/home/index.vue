<template>
	<div>
		<template v-if="blacklist.includes(route.path)">
			<NavBar />
		</template>
		<BackToTop />
		<div class="HomeContainer">
			<router-view v-slot="{ Component }" class="content">
				<keep-alive :max="10">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
		<TabBar v-show="isTabBar" />
	</div>
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";
import BackToTop from "/@/layout/home/components/BackToTop.vue";
import { getIndexInfo } from "/@/views/venueHome/sports/utils/commonFn";
import { useUserStore } from "/@/store/modules/user";
const blacklist = ["/"];
const route = useRoute();
const isTabBar = computed(() => {
	return !route.meta.hideTabBar;
});
onMounted(() => {
	if (useUserStore().token) {
		getIndexInfo();
	}
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
