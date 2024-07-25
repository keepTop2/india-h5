<template>
	<div v-if="!isCountingDown" class="btn" @click="onCaptcha">{{ $t(`captchaButton['发送验证码']`) }}</div>
	<div v-if="isCountingDown" class="btn">{{ $t(`captchaButton['重发']`) }}({{ countdown }})</div>
</template>

<script setup lang="ts">
import Common from "/@/utils/common";
import CommonApi from "/@/api/common";
import { useCountdown } from "/@/hooks/countdown";
const { countdown, isCountingDown, startCountdown } = useCountdown();
/**
 * @name 苏秦
 * @description 默认为手机验证码请求，请求邮箱验证码，组件使用时添加 :emailStatus="true" 属性
 */
const props = withDefaults(
	defineProps<{
		account?: string;
		emailStatus?: boolean;
	}>(),
	{ account: "", emailStatus: false }
);

// const axiosStatus = ref(false); // 请求状态

// 接受倒计时参数
const onCaptcha = async () => {
	let res;
	// 默认请求手机验证码
	if (!props.emailStatus) {
		console.log("手机验证码");
		const params = { phone: props.account };
		res = await CommonApi.sendSms(params).catch((err) => err);
	} else {
		console.log("邮箱验证码");
		const params = { email: props.account };
		res = await CommonApi.sendMail(params).catch((err) => err);
	}
	if (res.code == Common.getInstance().ResCode.SUCCESS) {
		startCountdown();
	}
};
</script>

<style scoped lang="scss">
.btn {
	min-width: 200px;
	height: 63px;
	padding: 12px 15px;
	@include themeify {
		color: themed("Theme-P");
	}
	text-align: center;
	font-size: 28px;
	font-weight: 400;
	border-radius: 54px;
	border: 1px solid;
	box-sizing: border-box;
	cursor: pointer;
}
</style>
