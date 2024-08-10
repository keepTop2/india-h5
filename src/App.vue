<template>
	<div class="container">
		<MenuPopup />
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { loginApi } from "/@/api/loginRegister";
import common from "/@/utils/common";
import { useRouter } from "vue-router";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouterStore } from "/@/store/modules/cacheRouter";
import { useUserStore } from "/@/store/modules/user";
const store = useUserStore();
const router = useRouter();
const { keepAliveComps } = storeToRefs(useRouterStore());
const ThemesStore = useThemesStore();

const loginInfo = computed(() => {
	return store.getLoginInfo;
});

onBeforeMount(() => {
	initTheme();
	autoLogin();
	console.log("初始化");
});

// 自动登录
const autoLogin = async () => {
	// 没有登录信息与密钥则推出
	if (store.token) return;
	if (!loginInfo.value) return;
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
</script>

<style scoped lang="scss">
.container {
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
}
</style>
