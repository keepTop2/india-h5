<template>
	<RouterView class="content" />
	<TabBar />
</template>

<script setup lang="ts">
import TabBar from "/@/layout/components/tabBar.vue";
</script>

<style scoped lang="scss">
.content {
	height: 100vh;
}
</style>
