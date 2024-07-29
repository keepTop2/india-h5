<template>
	<div class="login-container">
		<HeaderBG />
		<div class="login-from">
			<div class="title">{{ $t('login["登录"]') }}</div>
			<div class="from">
				<FromInput v-model="state.account" type="text" :placeholder="$t(`login['账户名']`)">
					<template v-slot:right>
						<SvgIcon v-if="state.account" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.account = ''" />
					</template>
				</FromInput>
				<div class="error_text">
					<span v-if="!isAccountValid && state.account !== ''" class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
				</div>

				<FromInput v-model="state.password" :type="eyeShow ? 'password' : 'text'" :maxlength="16" :placeholder="$t(`login['登录密码']`)">
					<template v-slot:right>
						<div class="right">
							<SvgIcon v-if="state.password" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.password = ''" />
							<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
						</div>
					</template>
				</FromInput>
				<div class="error_text">
					<span v-if="!isPasswordValid && state.password !== ''" class="text">{{ $t('register["密码为8-16位"]') }}</span>
				</div>

				<div class="password-operation">
					<div class="remember-password" @click="userAgreement = !userAgreement">
						<SvgIcon v-show="!userAgreement" class="check" iconName="/loginOrRegister/checkbox" />
						<SvgIcon v-show="userAgreement" class="check" iconName="/loginOrRegister/checkbox_active" />
						<span class="label">{{ $t('login["记住密码"]') }}</span>
					</div>

					<div class="forgot-password" @click="router.push('/forgetPassword')">{{ $t('login["忘记密码"]') }}</div>
				</div>

				<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'">{{ $t('login["登录"]') }}</Button>

				<div class="footer">
					<div>
						<span class="text">{{ $t('login["新用户"]') }}</span>
						<span class="create van-haptics-feedback" @click="router.push('/register')">{{ $t('login["创建账户"]') }}</span>
					</div>
					<div>
						<span class="help">{{ $t('common["联系客服"]') }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- <Hcaptcha ref="hcaptcha" @submit="onSubmit" /> -->
	</div>
</template>

<script setup lang="ts">
import HeaderBG from "/@/views/loginRegister/components/headerBG.vue";
// import { showToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
import common from "/@/utils/common";
// import loginApi from "/@/api/loginOrRegister/login";

// const hcaptcha: any = ref(null);
const router = useRouter();
// const $: any = i18n.global;

const eyeShow = ref(true);
const btnDisabled = ref(true);
const userAgreement = ref(false);
const state = reactive({
	account: "", // 邮箱或者手机号
	password: "", // 密码
	deviceNo: "", // 设备
});

// 账号正则
const isAccountValid = computed(() => {
	return common.accountRG.test(state.account);
});

// 密码正则
const isPasswordValid = computed(() => {
	return common.passwordRG.test(state.password);
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
</script>

<style lang="scss" scoped>
.login-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.login-from {
		padding: 0px 55px;
		.title {
			font-size: 36px;
			font-weight: 600;
			@include themeify {
				color: themed("TB");
			}
		}
		.from {
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
					padding-top: 1px;
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
						width: 32px;
						height: 32px;
						margin-right: 16px;
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
