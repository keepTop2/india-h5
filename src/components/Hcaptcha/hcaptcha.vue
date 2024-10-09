<template>
	<div id="hcaptchaContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { verifyCodeApi } from "/@/api/loginRegister";
import common from "/@/utils/common";
const certifyId = ref(null);
const props = defineProps({
	onSubmit: {
		type: Function,
		default: () => {},
	},
});
const captcha = ref(null);
const isScriptLoaded = ref(false);
const loadScript = () => {
	const script = document.createElement("script");
	script.src = "https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js"; // 替换为你需要的 CDN URL
	script.onload = () => {
		isScriptLoaded.value = true;
	};
	document.head.appendChild(script);
};
loadScript();
onMounted(async () => {
	if (isScriptLoaded.value) {
		AliyunCaptcha();
	}
});
watch(
	() => isScriptLoaded.value,
	() => {
		if (isScriptLoaded.value) {
			AliyunCaptcha();
		}
	},
	{ once: true }
);
const AliyunCaptcha = () => {
	initAliyunCaptcha();
};
const initAliyunCaptcha = () => {
	(window as any).initAliyunCaptcha({
		SceneId: "qxye14r6d",
		prefix: "5zbecta",
		mode: "popup",
		element: "#hcaptchaContainer",
		button: "#captcha-element",
		captchaVerifyCallback: captchaVerifyCallback,
		onBizResultCallback: onSubmit,
		getInstance: getInstance,
		slideStyle: {
			width: 360,
			height: 200,
		},
		language: "cn",
		region: "sgp",
	});
};
const getInstance = (instance: any) => {
	captcha.value = instance;
};
// 验证码验证回调
const captchaVerifyCallback = (captchaVerifyParam: any) => {
	return verifyCodeApi.verifyCode({ captchaVerifyParam: captchaVerifyParam }).then((res: any) => {
		if (res.code === common.getInstance().ResCode.SUCCESS) {
			// 构造标准返回参数
			const verifyResult = {
				captchaResult: res.data.captchaResult,
				bizResult: res.data.captchaResult,
			};
			certifyId.value = JSON.parse(captchaVerifyParam).certifyId;
			console.log(verifyResult);

			return verifyResult;
		} else {
			// 构造标准返回参数
			const verifyResult = {
				captchaResult: res.data.captchaResult,
				bizResult: res.data.captchaResult,
			};
			return verifyResult;
		}
	});
};
const onSubmit = () => {
	props.onSubmit();
};
defineExpose({
	certifyId,
});
</script>

<style scoped></style>
