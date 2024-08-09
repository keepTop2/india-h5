<template>
	<div>
		<VantNavBar :title="route.params.type === 'phone' ? $t(`VantNavBar['修改手机号']`) : $t(`VantNavBar['修改邮箱']`)" @onClickLeft="onClickLeft" />

		<form class="form">
			<!-- 邮箱 -->
			<div v-if="route.params.type == 'email'">
				<span class="label">{{ $t('editContactDetails["邮箱验证"]') }}</span>
				<p>
					{{ $t('editContactDetails["验证码将发送至邮箱账号："]') }}<span>{{ userInfo.email }}</span>
				</p>
				<p>{{ $t('editContactDetails["有效时间："]') }}</p>
			</div>

			<!-- 手机号码 -->
			<div v-if="route.params.type == 'phone'">
				<span class="title">{{ $t('editContactDetails["手机号验证"]') }}</span>
				<p>
					{{ $t('editContactDetails["验证码将发送至手机号："]') }}<span v-if="userInfo.areaCode">+{{ userInfo.areaCode }} </span> <span>{{ userInfo.phone }}</span>
				</p>
				<p>{{ $t('editContactDetails["有效时间："]') }}</p>
			</div>

			<span class="title">{{ $t('bindPhone["验证码"]') }}</span>
			<FormInput v-model="state.verifyCode" type="text" :placeholder="$t(`common['验证码']`)">
				<template v-slot:right>
					<CaptchaButton ref="captchaButton" :disabled="captchaDisabled" @onCaptcha="onCaptcha" />
				</template>
			</FormInput>

			<div class="tips">
				{{ $t('editContactDetails["重新发送"]') }}<span class="help">{{ $t('common["联系客服"]') }}</span>
			</div>

			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onSubmit">{{ $t('editContactDetails["确定"]') }}</Button>
		</form>
	</div>
</template>

<script setup lang="ts">
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";
import { securityCenterApi, bindApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const route = useRoute();
const $: any = i18n.global;

const captchaButton = ref<{
	startCountdown: () => void;
} | null>(null);

// 定义 UserInfo 类型
interface UserInfo {
	userAccount?: string;
	nickName?: string;
	areaCode?: string;
	phone?: string | number;
	email?: string | number;
	withdrawPwd?: string;
}

let userInfo = reactive<UserInfo>({});

const state = reactive({
	verifyCode: "",
});

// 验证码按钮禁用状态
const captchaDisabled = computed(() => {
	if (route.params.type === "email") return !userInfo.email;
	if (route.params.type === "phone") return !userInfo.phone;
	return true;
});

// 确定按钮禁用状态
const btnDisabled = computed(() => {
	if (route.params.type === "email") return !userInfo.email || state.verifyCode === "";
	if (route.params.type === "phone") return !userInfo.phone || state.verifyCode === "";
	return true;
});

// 安全中心基本信息
const getUserGlobalSetInfo = async () => {
	const res = await securityCenterApi.getUserGlobalSetInfo().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		Object.assign(userInfo, res.data);
		onCaptcha();
	}
};

getUserGlobalSetInfo();

const onSubmit = async () => {
	const params = {
		areaCode: userInfo.areaCode,
		account: route.params.type === "email" ? userInfo.email : userInfo.phone,
		type: route.params.type === "email" ? 1 : 2,
		verifyCode: state.verifyCode,
	};
	const res = await bindApi.checkVerifyCode(params).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		// showToast(res.message);
		if (route.params.type === "email") {
			router.push({ path: "/bind/email", query: { revise: true } as any });
		} else if (route.params.type === "phone") {
			router.push({ path: "/bind/phone", query: { revise: true } as any });
		}
	}
};

const onCaptcha = async () => {
	let params = {} as any;
	let res;
	if (route.params.type === "phone") {
		params = { phone: userInfo.phone, areaCode: userInfo.areaCode };
		res = await bindApi.sendSms(params);
	} else if (route.params.type === "email") {
		params = { email: userInfo.email };
		res = await bindApi.sendMail(params);
	}
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		captchaButton.value?.startCountdown();
	}
};

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.form {
	padding: 40px 55px;

	.label {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 12px;
		display: inline-block;
	}

	p {
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
	}

	.title {
		margin-top: 36px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 16px;
		display: inline-block;
	}

	.tips {
		text-align: end;
		margin-top: 20px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
		.help {
			@include themeify {
				color: themed("Theme");
			}
		}
	}
}
</style>
