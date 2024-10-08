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
import { loginApi } from "/@/api/loginRegister";
import common from "/@/utils/common";
import MenuPopup from "/@/layout/home/components/menuPopup.vue";
import { useThemesStore } from "/@/store/modules/themes";
import { useUserStore } from "/@/store/modules/user";
import { useRouterStore } from "/@/store/modules/cacheRouter";
import { LangEnum } from "/@/enum/appConfigEnum";
import WsUtil from "/@/utils/wsUntil";

let ws: WsUtil | null;
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

//监听token
watch(
	[() => userStore.token],
	([newToken]) => {
		//每次token变化
		if (newToken) {
			//如果ws已经存在则关闭并释放
			if (ws) {
				ws.close();
				ws = null;
			}
			//重新建立新连接通道
			ws = new WsUtil();
		} else {
			if (ws) {
				ws.close();
				ws = null;
			}
		}
	},
	{
		immediate: true,
		deep: true,
	}
);

// 自动登录
const autoLogin = async () => {
	// 没有登录信息与密钥则推出
	if (!userStore.loginStatus) return;
	if (userStore.token) return;
	const params = {
		userAccount: loginInfo.value?.userAccount,
		password: loginInfo.value?.password,
		deviceNo: common.getInstance().getDevice(), // 设备
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
