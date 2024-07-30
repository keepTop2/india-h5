<template>
	<div class="container">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import TabBar from "/@/layout/home/components/tabBar.vue";
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
