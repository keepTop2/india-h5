<template>
	<NavBar />
	<MenuPopup />
	<div class="container">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import NavBar from "/@/layout/home/components/navBar.vue";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import TabBar from "/@/layout/home/components/tabBar.vue";
</script>

<style scoped lang="scss">
.container {
	height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
	.content {
		height: calc(100% - 103px);
		padding-bottom: 103px;
	}
}
</style>
