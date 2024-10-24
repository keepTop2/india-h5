<template>
	<div class="login-container">
		<NavBar />
		<HeaderBG />
		<div class="login-form">
			<div class="title">{{ $t('login["登录"]') }}</div>
			<form class="form" autocomplete="off">
				<FormInput v-model="state.userAccount" type="text" :placeholder="$t(`login['账户名']`)" :maxlength="11">
					<template v-slot:right>
						<SvgIcon v-if="state.userAccount" class="clearIcon" iconName="loginOrRegister/clear" @click="state.userAccount = ''" />
					</template>
				</FormInput>
				<!-- <div class="error_text">
					<span v-if="!isAccountValid && state.userAccount !== ''" class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
				</div> -->

				<FormInput class="mt_20" v-model="state.password" :type="eyeShow ? 'password' : 'text'" :maxlength="16" :placeholder="$t(`login['登录密码']`)">
					<template v-slot:right>
						<div class="right">
							<SvgIcon v-if="state.password" class="clearIcon" iconName="loginOrRegister/clear" @click="state.password = ''" />
							<SvgIcon class="icon" :iconName="eyeShow ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
						</div>
					</template>
				</FormInput>
				<!-- <div class="error_text">
					<span v-if="!isPasswordValid && state.password !== ''" class="text">{{ $t('register["密码为8-16位"]') }}</span>
				</div> -->

				<div class="password-operation mt_32">
					<div class="remember-password" @click="userAgreement = !userAgreement">
						<div class="check">
							<SvgIcon class="check_icon" :iconName="userAgreement ? 'loginOrRegister/checkbox_active' : 'loginOrRegister/checkbox'" />
						</div>
						<span class="label">{{ $t('login["记住密码"]') }}</span>
					</div>

					<div class="forgot-password" @click="router.push('/forgetPassword')">{{ $t('login["忘记密码"]') }}</div>
				</div>
				<Button class="mt_40" :type="btnDisabled || !isOnloadScript ? 'disabled' : 'default'" @click="onLogin">{{ $t('login["登录"]') }}</Button>
				<div class="footer">
					<div>
						<span class="text">{{ $t('login["新用户"]') }}</span>
						<span class="create van-haptics-feedback" @click="router.push('/register')">{{ $t('login["创建账户"]') }}</span>
					</div>
					<div>
						<span class="help">{{ $t('common["联系客服"]') }}</span>
					</div>
				</div>
			</form>
		</div>
		<div id="captcha-element" ref="captchaBtn"></div>
		<Hcaptcha ref="refhcaptcha" :onSubmit="onSubmit" v-model="isOnloadScript" v-if="HcaptchaMounted" />
	</div>
</template>

<script setup lang="ts">
import NavBar from "/@/layout/loginRegister/components/navBar.vue";
import { loginApi } from "/@/api/loginRegister";
import common from "/@/utils/common";
import HeaderBG from "/@/views/loginRegister/components/headerBG.vue";
import { getIndexInfo } from "/@/views/venueHome/sports/utils/commonFn";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
import { showToast } from "vant";
import Common from "/@/utils/common";
const store = useUserStore();
const refhcaptcha: any = ref(null);
const HcaptchaMounted = ref(false);
const router = useRouter();
const eyeShow = ref(true);
const btnDisabled = ref(true);
const userAgreement = ref(false);
const captchaBtn = ref(null);
const isOnloadScript = ref(false);

let state = reactive({
	userAccount: "", // 邮箱或者手机号
	password: "", // 密码
});

// 账号正则
const isAccountValid = computed(() => {
	return common.accountRG.test(state.userAccount);
});

// 密码正则
const isPasswordValid = computed(() => {
	return common.passwordRG.test(state.password);
});

const loginInfo = computed(() => {
	return store.getLoginInfo;
});

// 监听状态密码状态
watch(
	[() => isAccountValid.value, () => isPasswordValid.value],
	([isAccountValid, isPasswordValid]) => {
		if (isAccountValid && isPasswordValid) {
			btnDisabled.value = false;
		} else {
			btnDisabled.value = true;
		}
	},
	{
		immediate: true,
	}
);

const onLogin = async () => {
	captchaBtn.value?.click();
};

const onSubmit = async () => {
	const certifyId = refhcaptcha.value.certifyId;
	const res = await loginApi.userLogin({ ...state, certifyId }).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		await store.setInfo(res.data);
		if (userAgreement.value) {
			// 记住密码
			store.setLoginInfo({ userAccount: state.userAccount, password: state.password });
			store.setLoginStatus(true);
		} else {
			store.setLoginInfo();
		}
		await getIndexInfo();
		await store.initUserInfo();
		router.replace({ path: "/" });
	} else {
		showToast(res.message);
	}
};

onBeforeMount(() => {
	// 挂载完毕，执行初始化
	Common.loadScript("https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js").then(() => {
		HcaptchaMounted.value = true;
	});
	if (loginInfo.value) {
		userAgreement.value = !loginInfo.value ? false : true;
		state.userAccount = loginInfo.value.userAccount;
		state.password = loginInfo.value.password;
	}
});
</script>

<style lang="scss" scoped>
.login-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.login-form {
		padding: 0px 55px;
		.title {
			font-size: 36px;
			font-weight: 600;
			@include themeify {
				color: themed("TB");
			}
		}
		.form {
			margin-top: 40px;

			.right {
				display: flex;
				align-items: center;
				gap: 20px;
			}

			:deep(.clearIcon),
			:deep(.icon) {
				width: 32px;
				height: 32px;
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

			.password-operation {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.remember-password {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.check {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 32px;
						height: 32px;
						margin-right: 16px;
						.check_icon {
							width: 32px;
							height: 32px;
							color: themed("Theme");
						}
					}
				}

				.label,
				.forgot-password {
					@include themeify {
						color: themed("T1");
					}
					font-family: "PingFang SC";
					font-size: 28px;
					font-weight: 400;
				}
			}

			.footer {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40px;
				text-align: center;
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				line-height: 34px;
				.text {
					@include themeify {
						color: themed("TB");
					}
				}
				.create,
				.help {
					@include themeify {
						color: themed("Theme");
					}
				}
			}
		}
	}
}
</style>
