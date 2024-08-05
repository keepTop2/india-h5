<template>
	<div :class="buttonClass" @click="onCaptcha">
		<span v-if="!isCountingDown">{{ $t('common["发送"]') }}</span>
		<span v-else>{{ countdown }}S</span>
	</div>
</template>

<script setup lang="ts">
import { withDefaults, computed } from "vue";
import { useCountdown } from "/@/hooks/countdown";

// 使用 ref 来存储组件状态
const props = withDefaults(
	defineProps<{
		disabled: boolean;
		account?: string;
	}>(),
	{ account: "", disabled: false }
);

// 使用 countdown hook
const { countdown, isCountingDown, startCountdown } = useCountdown();

// 计算按钮类名
// 计算按钮的类名
const buttonClass = computed(() => {
	if (isCountingDown.value) {
		return "send"; // 倒计时中，使用 'send' 类
	}
	return props.disabled ? "send_disabled" : "send"; // 否则根据 disabled 状态确定类
});

// 处理验证码点击事件
const onCaptcha = () => {
	if (props.disabled || isCountingDown.value) return;
	startCountdown();
};
</script>

<style scoped lang="scss">
.send,
.send_disabled {
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 15px;
	border-radius: 12px;
	border: 2px solid;
	text-align: center;
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 400;
	box-sizing: border-box;
}

.send {
	@include themeify {
		color: themed("Theme");
		border-color: themed("Theme");
	}
}

.send_disabled {
	@include themeify {
		color: themed("T3");
		border-color: themed("T3");
	}
}
</style>
