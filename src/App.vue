<template>
	<router-view />
</template>

<script setup lang="ts">
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

<style scoped lang="scss"></style>
