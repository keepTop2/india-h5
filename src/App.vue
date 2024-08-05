<template>
	<div class="container">
		<MenuPopup />
		<router-view />
	</div>
</template>

<script setup lang="ts">
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import { useThemesStore } from "/@/store/modules/themes";
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
