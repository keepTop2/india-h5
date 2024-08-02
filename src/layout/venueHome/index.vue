<template>
	<div class="venueHome-container">
		<RouterView class="content" />
	</div>
	<TabBar />
</template>

<script setup lang="ts">
import TabBar from "/@/layout/home/components/tabBar.vue";
</script>

<style scoped lang="scss">
.venueHome-container {
	min-height: 100vh;
	.content {
		padding-bottom: 160px;
	}
	@include themeify {
		background-color: themed("BG1");
	}
}
</style>
