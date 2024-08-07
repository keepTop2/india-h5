<template>
	<!-- <NavBar />
	<RouterView v-slot="{ Component }">
		<KeepAlive :include="keepAliveComps">
			<component :is="Component" />
		</KeepAlive>
	</RouterView> -->
</template>

<script setup lang="ts">
import NavBar from "/@/layout/loginRegister/components/navBar.vue";
import { useRouterStore } from "/@/store/modules/cacheRouter";

console.log("????????");

const { keepAliveComps } = storeToRefs(useRouterStore());
</script>

<style scoped lang="scss"></style>
