<template>
	<div class="register-container">
		<div class="header-bg">
			<div class="content">
				<p class="text">{{ $t('common["你好"]') }}</p>
				<p class="mt_15">
					<span class="text">{{ $t('common["欢迎来到"]') }}</span>
					<span class="ml_12 app-name">OKsport</span>
				</p>
			</div>
		</div>

		<div class="register-from">
			<div class="title">{{ $t('register["注册"]') }}</div>

			<div class="from">
				<FromInput v-model="state.inviteCode" type="text" :placeholder="$t(`register['输入账号']`)">
					<template v-slot:right>
						<SvgIcon class="clearIcon" iconName="/loginOrRegister/clear" />
					</template>
				</FromInput>
				<div class="error_text">
					<span class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
				</div>

				<FromInput v-model="state.password" :type="eyeShow ? 'password' : 'text'" :maxlength="16" :placeholder="$t(`register['登录密码']`)" @input="onInput">
					<template v-slot:right>
						<div class="right">
							<SvgIcon class="clearIcon" iconName="/loginOrRegister/clear" />
							<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
						</div>
					</template>
				</FromInput>
				<div class="error_text">
					<span class="text">{{ $t('register["密码为8-16位，必须包含数字和字母，可包含@_$"]') }}</span>
				</div>

				<FromInput v-model="state.password" :type="eyeShow ? 'password' : 'text'" :maxlength="16" :placeholder="$t(`register['确认登录密码']`)" @input="onInput">
					<template v-slot:right>
						<div class="right">
							<SvgIcon class="clearIcon" iconName="/loginOrRegister/clear" />
							<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
						</div>
					</template>
				</FromInput>
				<div class="error_text">
					<span class="text">{{ $t('register["两次输入密码不一致"]') }}</span>
				</div>

				<FromInput v-model="state.mainCurrency" :placeholder="$t(`register['选择主货币']`)" readonly>
					<template v-slot:right>
						<SvgIcon class="icon" iconName="/loginOrRegister/arrow" />
					</template>
				</FromInput>
				<div class="error_text">
					<span class="text">{{ $t('register["请选择"]') }}</span>
				</div>

				<FromInput v-model="state.inviteCode" type="text" :placeholder="$t(`register['推荐码(非必填)']`)">
					<template v-slot:right>
						<SvgIcon class="clearIcon" iconName="/loginOrRegister/clear" />
					</template>
				</FromInput>

				<div class="checkbox">
					<SvgIcon class="check" :iconName="userAgreement ? '/loginOrRegister/checkbox_active' : '/loginOrRegister/checkbox'" @click="userAgreement = !userAgreement" />
					<p class="text3">
						<i18n-t keypath="register['我同意用户协议并确认我已年满18岁']" :tag="'span'">
							<template v-slot:text
								><span class="text2">{{ $t('register["用户协议"]') }}</span></template
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

				<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'">{{ $t('register["注册"]') }}</Button>

				<div class="footer">
					<span class="text">{{ $t('register["已有账户？"]') }}</span>
					<span class="create van-haptics-feedback">{{ $t('register["登录"]') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
import Common from "/@/utils/common";
const $: any = i18n.global;
const router = useRouter();

const eyeShow = ref(true);
const btnDisabled = ref(true);
const userAgreement = ref(false); // 用户协议认证
const state = reactive({
	account: "", // 邮箱或者手机号
	password: "", // 密码
	mainCurrency: "", // 货币
	inviteCode: "", // 推荐码
	deviceNo: Common.getInstance().getDevice(), // 设备
});

watch([() => state.phone, () => state.email, () => state.password, () => state.mainCurrency, () => state.type], ([phone, email, password, mainCurrency, type]) => {
	if (type == "1") {
		if (email && password && mainCurrency) {
			btnDisabled.value = false;
		} else {
			btnDisabled.value = true;
		}
	} else {
		if (phone && password && mainCurrency) {
			btnDisabled.value = false;
		} else {
			btnDisabled.value = true;
		}
	}
});

// 手机号输入监听正则校验
const onInputPhone = () => {
	state.phone = state.phone.replace(/[^0-9]/g, "");
};

// 密码输入监听正则校验
const onInput = () => {
	state.password = state.password.replace(/[^\w]/g, "");
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

	.header-bg {
		position: relative;
		width: 100%;
		height: 568px;
		background: url("/@/assets/zh-CN/default/loginOrRegister/header-bg.png") center center / 100% 100% no-repeat;

		.content {
			position: absolute;
			left: 50%;
			bottom: 44px;
			transform: translate(-50%, 0);
		}

		.text,
		.app-name {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 36px;
			font-weight: 600;
			line-height: 46px;
			text-align: center;
		}
		.app-name {
			@include themeify {
				color: themed("Theme-P");
			}
		}
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
					margin-top: 1px;
					margin-bottom: 12px;
					font-family: "PingFang SC";
					font-size: 20px;
					font-weight: 400;
					@include themeify {
						color: themed("Theme-P");
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
						color: themed("Theme-P");
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
						color: themed("Theme-P");
					}
				}
			}
		}
	}
}
</style>
