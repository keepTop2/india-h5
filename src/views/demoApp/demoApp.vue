<template>
	<div class="home_container">
		<br />
		<br />

		<van-button type="primary" @click="changeTheme">💡</van-button>

		<br />
		<br />
		<br />

		<van-button type="primary" @click="changeLang(LangEnum['zh-CN'])">中文</van-button>
		<van-button type="primary" @click="changeLang(LangEnum['en-US'])">英文</van-button>

		<br />
		<br />
		<div class="lang_btn">{{ $t(`common["你好"]`) }}</div>

		<br />
		<br />
		<van-image :src="imgs.demoImgUrl" />

		<br />
		<br />
		<div class="bg_img" :style="{ backgroundImage: `url(${bgImgs.demoBg})` }"></div>
	</div>
</template>

<script setup lang="ts">
import { useThemesStore } from "/@/store/modules/themes";
import { useUserStore } from "/@/store/modules/user";
import imgs, { bgImgs } from "./imgs";
import { LangEnum, ThemeEnum } from "/@/enum/appConfigEnum";
const themesStore = useThemesStore();
const userStore = useUserStore();

//切换主题
const changeTheme = () => {
	if (themesStore.themeName == ThemeEnum.default) {
		themesStore.setTheme(ThemeEnum.light);
	} else {
		themesStore.setTheme(ThemeEnum.default);
	}
};

//切换语言
const changeLang = (lang: LangEnum) => {
	userStore.setLang(lang);
};
</script>

<style lang="scss" scoped>
.home_container {
	height: 100vh;
	padding: 10px;
	text-align: center;
	@include themeify {
		background-color: themed("Theme");
	}
}

.bg_img {
	width: 100%;
	height: 300px;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
</style>
