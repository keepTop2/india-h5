<template>
	<div class="container">
		<MenuPopup />
		<!-- <router-view /> -->
		{{ keepAliveComps }}
		<RouterView v-slot="{ Component }">
			<KeepAlive :include="keepAliveComps">
				<component :is="Component" />
			</KeepAlive>
		</RouterView>
	</div>
</template>

<script setup lang="ts">
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouterStore } from "/@/store/modules/cacheRouter";

const { keepAliveComps } = storeToRefs(useRouterStore());
const ThemesStore = useThemesStore();

onBeforeMount(() => {
	initTheme();
});

//初始化主题
const initTheme = () => {
	ThemesStore.setTheme(ThemesStore.themeName);
};
</script>

<style scoped lang="scss">
.container {
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
}
</style>
