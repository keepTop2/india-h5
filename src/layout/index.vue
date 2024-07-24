<template>
	<div class="container">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import TabBar from "/@/layout/components/tabBar.vue";
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
