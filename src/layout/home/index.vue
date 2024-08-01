<template>
	<template v-if="!blacklist.includes(route.path)">
		<NavBar />
	</template>
	<BackToTop />
	<div class="HomeContainer">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";
import BackToTop from "/@/layout/home/components/BackToTop.vue";
import { useRoute } from "vue-router";
const blacklist = ["/my", "/wallet", "/bettingMatch"];

const route = useRoute();
</script>

<style scoped lang="scss">
.HomeContainer {
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
	.content {
		padding-bottom: 160px;
	}
}
</style>
