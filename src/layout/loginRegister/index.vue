<template>
	<div>
		<NavBar />
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import NavBar from "/@/layout/loginRegister/components/navBar.vue";
import { useRouterStore } from "/@/store/modules/cacheRouter";

const routerStore = useRouterStore();
const keepAliveComps = computed(() => routerStore.keepAliveComps);
</script>

<style scoped lang="scss"></style>
