<template>
	<VantNavBar :title="$t(`VantNavBar['语言']`)" @onClickLeft="onClickLeft" />
	<div class="lang_list">
		<div class="cell" :class="{ cell_active: userStore.lang === item.code }" v-for="item in stateLang.langList" @click="onLang(item)">{{ item.name }}</div>
	</div>
</template>

<script setup lang="ts">
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
const userStore = useUserStore();
const router = useRouter();

const stateLang = reactive({
	langList: [],
});

// 获取语言配置
const getLanguageDownBox = async () => {
	const res = await CommonApi.getLanguageDownBox().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		stateLang.langList = res.data;
	}
};

const onLang = (item) => {
	userStore.setLang(item.code);
	userStore.setLangIcon(item.icon);
	userStore.setLangName(item.name);
	userStore.setLangChoice();
};

getLanguageDownBox();

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.lang_list {
	padding: 33px 48px;

	.cell {
		width: 100%;
		height: 96px;
		display: flex;
		align-items: center;
		padding: 0px 42px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
		line-height: 42px; /* 131.25% */
		box-sizing: border-box;
	}
	.cell_active {
		width: 100%;
		height: 96px;
		display: flex;
		align-items: center;
		padding: 0px 42px;
		@include themeify {
			color: themed("TB1");
			background: themed("Theme");
		}
		border-radius: 8px;
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
		line-height: 42px; /* 131.25% */
		box-sizing: border-box;
	}
}
</style>
