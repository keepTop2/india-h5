<template>
	<form class="form">
		<!-- 新交易密码 -->
		<span class="title">{{ $t('setTradingPassword["交易密码"]') }}</span>
		<FormInput
			v-model="state.newPassword"
			:type="eyeShow ? 'password' : 'text'"
			:maxlength="16"
			:placeholder="$t(`setTradingPassword['交易密码']`)"
			:errorBorder="!isPasswordValid && state.newPassword !== ''"
		>
			<template v-slot:right>
				<div class="right">
					<SvgIcon v-if="state.newPassword" class="clearIcon mr_20" iconName="loginOrRegister/clear" @click="state.newPassword = ''" size="30px" />
					<SvgIcon class="icon" :iconName="eyeShow ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow = !eyeShow" size="30px" />
				</div>
			</template>
		</FormInput>
		<div class="error_text">
			<span v-if="!isPasswordValid && state.newPassword !== ''" class="text">{{ $t('setTradingPassword["请输入6位数字"]') }}</span>
		</div>

		<!--  确认新交易密码 -->
		<span class="title">{{ $t('setTradingPassword["确认交易密码"]') }}</span>
		<FormInput
			v-model="state.confirmPassword"
			:type="eyeShow2 ? 'password' : 'text'"
			:maxlength="16"
			:placeholder="$t(`setTradingPassword['确认交易密码']`)"
			:errorBorder="!isConfirmPasswordValid && state.confirmPassword !== ''"
		>
			<template v-slot:right>
				<div class="right">
					<SvgIcon v-if="state.confirmPassword" class="clearIcon mr_20" iconName="loginOrRegister/clear" @click="state.confirmPassword = ''" size="30px" />
					<SvgIcon class="icon" :iconName="eyeShow2 ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow2 = !eyeShow2" size="30px" />
				</div>
			</template>
		</FormInput>
		<div class="error_text">
			<span v-if="!isConfirmPasswordValid && state.confirmPassword !== ''" class="text">{{ $t('setTradingPassword["两次交易密码不一致"]') }}</span>
		</div>

		<!-- 邮箱 -->
		<div v-if="route.params.type == 'email'">
			<span class="label">{{ $t('editContactDetails["邮箱验证"]') }}</span>
			<p>
				{{ $t('editContactDetails["验证码将发送至邮箱账号："]') }}<span>{{ Common.maskEmail(userInfo.email as string) }}</span>
			</p>
			<p>{{ $t('editContactDetails["有效时间："]') }}</p>
		</div>

		<!-- 手机号码 -->
		<div v-if="route.params.type == 'phone'">
			<span class="title">{{ $t('editContactDetails["手机号验证"]') }}</span>
			<p>
				{{ $t('editContactDetails["验证码将发送至手机号："]') }}<span v-if="userInfo.areaCode">+{{ userInfo.areaCode }} </span> <span>{{ Common.maskString(userInfo.phone as string) }}</span>
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
</template>

<script setup lang="ts">
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";
import { securityCenterApi, bindApi, tradingPasswordApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { showToast } from "vant";
import Common from "/@/utils/common";
const router = useRouter();
const route = useRoute();
const eyeShow = ref(true);
const eyeShow2 = ref(true);
const btnDisabled = ref(true);

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
	newPassword: "", // 密码
	confirmPassword: "", // 密码
	verifyCode: "",
});

// 验证码按钮禁用状态
const captchaDisabled = computed(() => {
	if (route.params.type === "email") return !userInfo.email;
	if (route.params.type === "phone") return !userInfo.phone;
	return true;
});

// 密码正则
const isPasswordValid = computed(() => {
	return common.tradingPasswordRG.test(state.newPassword);
});

// 密码正则
const isConfirmPasswordValid = computed(() => {
	return state.confirmPassword == state.newPassword;
});

// 监听用户状态
watch(
	[() => isPasswordValid.value, () => isConfirmPasswordValid.value, () => state.verifyCode],
	([isPasswordValid, isConfirmPasswordValid]) => {
		if (isPasswordValid && isConfirmPasswordValid && state.verifyCode) {
			btnDisabled.value = false;
		} else {
			btnDisabled.value = true;
		}
	},
	{
		immediate: true,
	}
);

const onSubmit = async () => {
	const res = await tradingPasswordApi.reSetWithdrawPwd(state).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		showToast(res.message);
		router.push("/securityCenter");
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

// 安全中心基本信息
const getUserGlobalSetInfo = async () => {
	const res = await securityCenterApi.getUserGlobalSetInfo().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		Object.assign(userInfo, res.data);
	}
};

getUserGlobalSetInfo();
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
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 16px;
		display: inline-block;
	}

	.error_text {
		min-height: 40px;
		.text {
			display: block;
			padding-top: 4px;
			font-family: "PingFang SC";
			font-size: 20px;
			font-weight: 400;
			@include themeify {
				color: themed("Theme");
			}
		}
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
