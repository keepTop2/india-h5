<template>
	<div class="register-container">
		<HeaderBG />

		<div class="register-from">
			<div class="title">{{ $t('register["注册"]') }}</div>
			<div class="from">
				<FromInput v-model="state.account" type="text" :placeholder="$t(`register['输入账号']`)" :errorBorder="!isAccountValid && state.account !== '' ? true : false">
					<template v-slot:right>
						<SvgIcon v-if="state.account" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.account = ''" />
					</template>
				</FromInput>
				<div class="error_text">
					<span v-if="!isAccountValid && state.account !== ''" class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
				</div>

				<FromInput
					v-model="state.password"
					:type="eyeShow ? 'password' : 'text'"
					:maxlength="16"
					:placeholder="$t(`register['登录密码']`)"
					:errorBorder="!isPasswordValid && state.password !== '' ? true : false"
				>
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

				<FromInput
					v-model="state.confirmPassword"
					:type="eyeShow ? 'password' : 'text'"
					:maxlength="16"
					:placeholder="$t(`register['确认登录密码']`)"
					:errorBorder="!isConfirmPasswordValid ? true : false"
				>
					<template v-slot:right>
						<div class="right">
							<SvgIcon v-if="state.confirmPassword" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.confirmPassword = ''" />
							<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
						</div>
					</template>
				</FromInput>
				<div class="error_text">
					<span v-if="!isConfirmPasswordValid" class="text">{{ $t('register["两次输入密码不一致"]') }}</span>
				</div>

				<FromInput v-model="state.mainCurrency" :placeholder="$t(`register['选择主货币']`)" readonly :errorBorder="mainCurrencyRG ? true : false" @click="router.push('/mainCurrency')">
					<template v-slot:right>
						<SvgIcon class="icon" iconName="/loginOrRegister/arrow" />
					</template>
				</FromInput>
				<div class="error_text">
					<span v-if="mainCurrencyRG" class="text">{{ $t('register["请选择"]') }}</span>
				</div>

				<FromInput v-model="state.inviteCode" type="text" :placeholder="$t(`register['推荐码(非必填)']`)">
					<template v-slot:right>
						<SvgIcon v-if="state.inviteCode" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.inviteCode = ''" />
					</template>
				</FromInput>

				<div class="checkbox" @click="userAgreement = !userAgreement">
					<SvgIcon v-show="!userAgreement" class="check" iconName="/loginOrRegister/checkbox" />
					<SvgIcon v-show="userAgreement" class="check" iconName="/loginOrRegister/checkbox_active" />
					<p :class="userAgreement ? 'text' : 'text3'">
						<i18n-t keypath="register['我同意用户协议并确认我已年满18岁']" :tag="'span'">
							<template v-slot:text
								><span class="text2" @click="router.push('/userAgreement')"> {{ $t('register["用户协议"]') }} </span></template
							>
						</i18n-t>
					</p>
				</div>

				<div class="checkbox">
					<SvgIcon class="check" iconName="/loginOrRegister/checkbox_active" />
					<span class="text">
						<i18n-t keypath="register['我同意接收[平台名称]的营销促销信息']" :tag="'span'">
							<template v-slot:text>OKsport</template>
						</i18n-t>
					</span>
				</div>

				<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onRegister">{{ $t('register["注册"]') }}</Button>

				<div class="footer">
					<span class="text">{{ $t('register["已有账户？"]') }}</span>
					<span class="create van-haptics-feedback" @click="router.push('/login')">{{ $t('register["登录"]') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import HeaderBG from "/@/views/loginRegister/components/headerBG.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
import common from "/@/utils/common";
const $: any = i18n.global;
const router = useRouter();

const eyeShow = ref(true);
const btnDisabled = ref(true);
const mainCurrencyRG = ref(false);
const userAgreement = ref(false); // 用户协议认证

const state = reactive({
	account: "", // 邮箱或者手机号
	password: "", // 密码
	confirmPassword: "", // 密码
	mainCurrency: "", // 货币
	inviteCode: "", // 推荐码
	deviceNo: common.getInstance().getDevice(), // 设备
});

// 账号正则
const isAccountValid = computed(() => {
	return common.accountRG.test(state.account);
});

// 密码正则
const isPasswordValid = computed(() => {
	return common.passwordRG.test(state.password);
});

// 密码正则
const isConfirmPasswordValid = computed(() => {
	return state.confirmPassword == state.password;
});

// 监听用户状态
watch(
	[() => isAccountValid.value, () => isPasswordValid.value, () => isConfirmPasswordValid.value],
	([isAccountValid, isPasswordValid, isConfirmPasswordValid]) => {
		if (isAccountValid && isPasswordValid && isConfirmPasswordValid) {
			btnDisabled.value = false;
		} else {
			btnDisabled.value = true;
		}
	},
	{
		immediate: true,
	}
);

watch(
	() => state.mainCurrency,
	(newValue) => {
		if (newValue) {
			mainCurrencyRG.value = false;
		}
	}
);

const onRegister = async () => {
	// 校验用户协议
	if (!userAgreement.value && !state.mainCurrency) {
		mainCurrencyRG.value = true;
		showToast($.t('register["请确定已阅读用户协议"]'));
		return;
	}
	// 校验用户协议
	if (!userAgreement.value) {
		showToast($.t('register["请确定已阅读用户协议"]'));
		return;
	}
	// 校验用户协议
	if (!state.mainCurrency) {
		mainCurrencyRG.value = true;
		return;
	}
};
</script>

<style lang="scss" scoped>
.register-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.register-from {
		padding: 0px 55px 40px;
		.title {
			margin-bottom: 40px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 36px;
			font-weight: 600;
		}
		.from {
			margin-top: 10px;

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
				min-height: 20px;
				.text {
					display: block;
					margin-top: 4px;
					margin-bottom: 8px;
					font-family: "PingFang SC";
					font-size: 20px;
					font-weight: 400;
					@include themeify {
						color: themed("Theme");
					}
				}
			}

			.checkbox {
				display: flex;
				align-items: center;
				margin-top: 32px;

				.check {
					width: 32px;
					height: 32px;
				}
				.text,
				.text3 {
					padding-left: 16px;
					font-family: "PingFang SC";
					font-size: 22px;
					font-weight: 400;
					line-height: 32px;
				}
				.text {
					@include themeify {
						color: themed("TB");
					}
				}

				.text2 {
					@include themeify {
						color: themed("Theme");
					}
				}

				.text3 {
					@include themeify {
						color: themed("T3");
					}
				}
			}

			.footer {
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
				.create {
					@include themeify {
						color: themed("Theme");
					}
				}
			}
		}
	}
}
</style>
