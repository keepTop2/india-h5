<!-- keyboard-box.vue-->
<template>
	<div class="keyboard-box">
		<div :class="keyboardClass"></div>
	</div>
</template>

<script setup lang="ts">
import { i18n } from "/@/i18n/index";
//引用
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { onMounted, ref, watch } from "vue";
//自定义键盘图片
import numberKeyboard_delete from "/@/assets/zh/default/frontPage/home/sports/numberKeyboard_delete.png";
import numberKeyboard from "/@/assets/zh/default/frontPage/home/sports/numberKeyboard.png";
const emit = defineEmits(["onKeyPress", "onKeyReleased"]);

const props = defineProps({
	keyboardClass: { type: String, default: "simple-keyboard" },
	input: String,
	layout: {
		type: Object,
		default: () => {
			return {
				default: ["{100} {200} {500} {1000}", "1 2 3 {max}", "4 5 6 {min}", "7 8 9 {bksp}", "0 00 000 {close}"],
			};
		},
	},
});
const i18: any = i18n.global;
let keyboard = ref(null);
onMounted(() => {
	keyboard.value = new Keyboard(props.keyboardClass, {
		onKeyPress: onKeyPress,
		onKeyReleased: onKeyReleased,
	});
	keyboard.value.setOptions({
		layoutName: "default",
		layout: props.layout,
		display: {
			"{100}": `<span class="theme">100</span>`,
			"{200}": `<span class="theme">200</span>`,
			"{500}": `<span class="theme">500</span>`,
			"{1000}": `<span class="theme">1000</span>`,
			"{max}": `<span class="text">${i18.t('sports["virtualKeyboard"]["最大"]')}</span>`,
			"{min}": `<span class="text">${i18.t('sports["virtualKeyboard"]["最小"]')}</span>`,
			"{bksp}": `<img class="icon" src=${numberKeyboard_delete}>`,
			"{close}": `<img class="icon" src=${numberKeyboard}>`,
		},
	});
});
const onKeyPress = (button) => {
	emit("onKeyPress", button);
};

const onKeyReleased = (button) => {
	emit("onKeyReleased", button);
};
</script>

<style scoped lang="scss">
.keyboard-box {
	width: 100%;
	margin: auto;
	.hg-theme-default {
		padding: 0;
		background-color: transparent;
	}
	:deep(.hg-row) {
		gap: 4px;
	}
	:deep(.hg-button) {
		width: 165px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		@include themeify {
			background-color: themed("BG4");
			color: themed("T1");
		}
		border-bottom: 0px;
		font-family: "PingFang SC";
		font-size: 36px;
		font-weight: 500;
	}
	:deep(.hg-activeButton) {
		opacity: 0.6;
	}
	:deep(.icon) {
		width: 48px;
		height: 48px;
	}
	:deep(.text) {
		font-size: 28px;
	}
	:deep(.theme) {
		font-size: 30px;
		@include themeify {
			color: themed("Theme-P");
		}
	}
}
</style>
