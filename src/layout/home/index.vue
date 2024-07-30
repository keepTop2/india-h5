<template>
	<template v-if="route.path !== '/my'">
		<NavBar />
		<MenuPopup />
	</template>

	<div class="container">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";

import { useRoute } from "vue-router";
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
