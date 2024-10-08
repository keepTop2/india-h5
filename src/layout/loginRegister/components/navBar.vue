<template>
	<div class="header">
		<div class="left">
			<SvgIcon class="arrow" iconName="loginOrRegister/navBar/arrow" @click="goBack()" />
		</div>
		<div class="right" @click="onLang">
			<div class="lang">
				<div class="lang_icon">
					<VantLazyImg :src="stateLang.langPicture" />
				</div>
				<SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
			</div>
		</div>
	</div>

	<VantPicker v-model:select="checked" :multiple="true" v-model:show="languageShow" :columns="stateLang.langList" title="" toText="name" toValue="code" @confirm="handleConfirm">
		<template #option="item">
			<div class="lang_cell">
				<img class="icon" :src="item.item.icon" alt="" />
				<span> {{ item.item.text }}</span>
			</div>
		</template>
	</VantPicker>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { useUserStore } from "/@/store/modules/user";
const route = useRoute();
const userStore = useUserStore();
const checked = ref(userStore.getLang);
const languageShow = ref(false);
const stateLang = reactive({
	langList: [],
	langPicture: "" as null | string,
});

const emit = defineEmits(["onPreviousStep"]);

const onLang = () => {
	languageShow.value = true;
};

// 获取语言配置
const getCommonBusinessDownBox = async () => {
	// 调用通用业务下拉框接口，并捕获任何可能的错误
	const res = await CommonApi.getCommonBusinessDownBox().catch((err) => err);
	// 如果响应的状态码为成功状态码
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		// 将获取的语言列表赋值给 stateLang 的 langList 属性
		stateLang.langList = res.data.languageEnums;
		// 如果用户没有选择语言（即 langChoice 为空）
		if (!userStore.langChoice) {
			// 查找默认的语言（currLang 为 1 表示默认语言）
			const filteredData = stateLang.langList.find((item) => item.currLang === 1);
			// 将默认语言的图标赋值给 stateLang 的 langPicture 属性
			stateLang.langPicture = filteredData.icon;
		}
	}
};

stateLang.langPicture = userStore.langIcon;
getCommonBusinessDownBox();

const handleConfirm = (selectedValues) => {
	const { selectedOptions } = selectedValues;
	const options = selectedOptions[0];
	userStore.setLang(options.value);
	userStore.setLangIcon(options.icon);
	userStore.setLangName(options.text);
	userStore.setLangChoice();
	stateLang.langPicture = options.icon;
};

// 回退
const goBack = () => {
	// 如果是忘记密码页面 单端判断返回场景
	if (route.path === "/forgetPassword") {
		emit("onPreviousStep");
	} else {
		window.history.back();
	}
};
</script>

<style scoped lang="scss">
.header {
	position: absolute;
	top: 0px;
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 50px;
	box-sizing: border-box;
	z-index: 99;
	.left {
		.arrow {
			width: 36px;
			height: 36px;
			@include themeify {
				color: themed("TB");
			}
		}
	}
	.right {
		.lang {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			.lang_icon {
				width: 28px;
				height: 28px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.down {
				width: 22px;
				height: 14px;
				@include themeify {
					color: themed("TB");
				}
			}
		}
	}
}

.lang_cell {
	display: flex;
	gap: 8px;
	.icon {
		width: 32px;
		height: 32px;
	}
}
</style>
