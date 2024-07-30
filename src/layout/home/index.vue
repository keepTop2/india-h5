<template>
	<template v-if="!blacklist.includes(route.path)">
		<NavBar />
		<MenuPopup />
	</template>
	<BackToTop />

	<div class="container">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";
import BackToTop from "../BackToTop.vue";
import { useRoute } from "vue-router";
const blacklist = ["/my", "/discount", "/discount/activityParticulars"];
const route = useRoute();
</script>

<style scoped lang="scss">
.container {
	min-height: calc(100vh - 97px);
	@include themeify {
		background-color: themed("BG1");
	}
	.content {
		min-height: calc(100% - 97px);
		padding-bottom: 97px;
	}
}
</style>
