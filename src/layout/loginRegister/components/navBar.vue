<template>
	<div class="header">
		<div class="left">
			<SvgIcon class="arrow" iconName="/loginOrRegister/navBar/arrow" @click="goBack()" />
		</div>
		<div class="right" @click="languageShow = true">
			<div class="lang">
				<div class="lang_icon"></div>
				<SvgIcon class="down" iconName="/loginOrRegister/navBar/down" />
			</div>
		</div>
	</div>

	<VantPicker v-model:select="checked" :multiple="true" v-model:show="languageShow" :columns="langList" title="" toText="label" @confirm="handleConfirm" />
</template>

<script setup lang="ts">
import { langList } from "/@/i18n/record";
import { useUserStore } from "/@/store/modules/user";

const UserStore = useUserStore();

const checked = ref(UserStore.getLang);
const languageShow = ref(false);

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
	height: 88px;
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
			}
		}
	}
}
</style>
