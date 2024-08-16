<template>
	<div class="container">
		<MenuPopup />
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { loginApi } from "/@/api/loginRegister";
import common from "/@/utils/common";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import { useThemesStore } from "/@/store/modules/themes";
import { useUserStore } from "/@/store/modules/user";
import { LangEnum } from "/@/enum/appConfigEnum";
const store = useUserStore();
const ThemesStore = useThemesStore();

const loginInfo = computed(() => {
	return store.getLoginInfo;
});

onBeforeMount(() => {
	initTheme();
	initLang();
	autoLogin();
});

// 自动登录
const autoLogin = async () => {
	// 没有登录信息与密钥则推出
	if (!store.loginStatus) return;
	if (store.token) return;
	const params = {
		userAccount: loginInfo.value?.userAccount,
		password: loginInfo.value?.password,
		deviceNo: common.getInstance().getDevice(), // 设备
	};
	const res = await loginApi.submitUserLogin(params).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		store.setInfo(res.data);
	}
};

//初始化主题
const initTheme = () => {
	ThemesStore.setTheme(ThemesStore.themeName);
};

// 初始化语言
const initLang = () => {
	if (store.lang) {
		store.setLang(store.lang);
	} else {
		store.setLang(LangEnum["en-US"]);
	}
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
