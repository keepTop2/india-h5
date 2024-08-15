<template>
	<div class="header">
		<div class="left">
			<SvgIcon class="arrow" iconName="/loginOrRegister/navBar/arrow" @click="goBack()" />
		</div>
		<div class="right" @click="onLang">
			<div class="lang">
				<div class="lang_icon">
					<img :src="getLangPicture" alt="" />
				</div>
				<SvgIcon class="down" iconName="/loginOrRegister/navBar/down" />
			</div>
		</div>
	</div>

	<VantPicker v-model:select="checked" :multiple="true" v-model:show="languageShow" :columns="state.langList" title="" toText="value" toValue="code" @confirm="handleConfirm">
		<template #option="item">
			<div class="lang_cell">
				<img class="icon" :src="item.item.icon" alt="" />
				<span> {{ item.item.text }}</span>
			</div>
		</template>
	</VantPicker>
</template>

<script setup lang="ts">
import { useUserStore } from "/@/store/modules/user";
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
const UserStore = useUserStore();

const checked = ref(UserStore.getLang);
const languageShow = ref(false);
const state = reactive({
	langList: [],
});

console.log("checked", checked);

const onLang = () => {
	languageShow.value = true;
	getLanguageDownBox();
};

const getLanguageDownBox = async () => {
	const res = await CommonApi.getLanguageDownBox().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.langList = res.data;
		getLangPicture();
	}
};

const getLangPicture = () => {};

const handleConfirm = (selectedValues, selectedOptions, selectedIndexes) => {
	console.log("selectedValues", selectedValues);
	console.log("selectedOptions", selectedOptions);
	console.log("selectedIndexes", selectedIndexes);
};

// 回退
const goBack = () => {
	window.history.back();
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
