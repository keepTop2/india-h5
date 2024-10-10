<template>
	<div class="venueHome-container">
		<RouterView class="content" />
	</div>
	<TabBar v-show="isTabBar" />
</template>

<script setup lang="ts">
import TabBar from "/@/layout/home/components/tabBar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isTabBar = computed(() => {
	return !route.meta.hideTabBar;
});
</script>

<style scoped lang="scss">
.venueHome-container {
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
	.content {
		height: 100vh;
	}
}
</style>
