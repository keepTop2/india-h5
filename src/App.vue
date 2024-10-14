<template>
	<div class="container">
		<MenuPopup />
		<RouterView v-slot="{ Component }">
			<KeepAlive :include="keepAliveComps">
				<component :is="Component" />
			</KeepAlive>
		</RouterView>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import { useThemesStore } from "/@/store/modules/themes";
import { useUserStore } from "/@/store/modules/user";
import { useRouterStore } from "/@/store/modules/cacheRouter";
import { LangEnum } from "/@/enum/appConfigEnum";
import { getIndexInfo } from "/@/views/venueHome/sports/utils/commonFn";
import CommonApi from "./api/common";
onMounted(() => {
	if (useUserStore().token) {
		getIndexInfo();
	}
});
const { keepAliveComps } = storeToRefs(useRouterStore());
const userStore = useUserStore();
const ThemesStore = useThemesStore();

const loginInfo = computed(() => {
	return userStore.getLoginInfo;
});

onBeforeMount(() => {
	initTheme();
	initLang();
	autoLogin();
});

// 自动登录
const autoLogin = async () => {
	// 没有登录信息与密钥则推出
	if (!userStore.loginStatus) return;
	if (userStore.token) return;
	const params = {
		userAccount: loginInfo.value?.userAccount,
		password: loginInfo.value?.password,
	};
	// const res = await loginApi.submitUserLogin(params).catch((err) => err);
	// if (res.code == common.getInstance().ResCode.SUCCESS) {
	// 	userStore.setInfo(res.data);
	// }
};

//初始化主题
const initTheme = () => {
	ThemesStore.setTheme(ThemesStore.themeName);
};

// 初始化语言
const initLang = () => {
	if (userStore.lang) {
		userStore.setLang(userStore.lang);
	} else {
		userStore.setLang(LangEnum["en-US"]);
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
