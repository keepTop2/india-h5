<template>
	<div class="header">
		<div class="left">
			<SvgIcon class="arrow" iconName="loginOrRegister/navBar/arrow" @click="goBack()" />
		</div>

		<div class="right" @click="onLang">
			<div class="lang">
				<div class="lang_icon">
					<img :src="userStore.getlangInfo.iconFileUrl" />
				</div>
				<span class="color_TB fs_24">{{ userStore.getlangInfo.name }}</span>
				<SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
			</div>
		</div>
	</div>
	<!-- <VantPicker v-model:select="checked" :multiple="true" v-model:show="languageShow" :columns="userStore.getlangList" title="" toText="name" toValue="code" @confirm="handleConfirm">
		<template #option="item">
			<div class="lang_cell">
				<img class="icon" :src="item.item.iconFileUrl" alt="" />
				<span> {{ item.item.text }}</span>
			</div>
		</template>
	</VantPicker> -->
	<set-lang-pop v-model="languageShow" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
const route = useRoute();
const userStore = useUserStore();
const checked = ref(userStore.getlangInfo.code);
const languageShow = ref(false);
const emit = defineEmits(["onPreviousStep"]);

const onLang = () => {
	languageShow.value = true;
};

const handleConfirm = (selectedValues) => {
	userStore.setlangInfo(selectedValues.selectedOptions[0]);
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
