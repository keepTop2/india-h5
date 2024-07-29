<template>
	<div class="login-from">
		<div class="title">{{ $t('forgetPassword["找回密码"]') }}</div>
		<div class="from">
			<FromInput v-model="state.account" type="text" :placeholder="$t(`forgetPassword['账户名']`)">
				<template v-slot:right>
					<SvgIcon v-if="state.account" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.account = ''" />
				</template>
			</FromInput>

			<div class="password-operation">
				<div class="remember-password" @click="state.selectMark = 1">
					<SvgIcon v-show="state.selectMark != 1" class="check" iconName="/loginOrRegister/checkbox" />
					<SvgIcon v-show="state.selectMark == 1" class="check" iconName="/loginOrRegister/checkbox_active" />
					<span class="label">{{ $t('forgetPassword["手机号码"]') }}</span>
				</div>

				<div class="remember-password" @click="state.selectMark = 2">
					<SvgIcon v-show="state.selectMark != 2" class="check" iconName="/loginOrRegister/checkbox" />
					<SvgIcon v-show="state.selectMark == 2" class="check" iconName="/loginOrRegister/checkbox_active" />
					<span class="label">{{ $t('forgetPassword["邮箱"]') }}</span>
				</div>
			</div>

			<Button class="mt_40" :type="!state.account ? 'disabled' : 'default'" @click="onStep">{{ $t('forgetPassword["下一步"]') }}</Button>

			<div class="footer">
				<div>
					<span class="help">{{ $t('common["联系客服"]') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onStep"]);

const state = reactive({
	account: "",
	selectMark: 1,
});

const onStep = async () => {
	// if (state.type == "2") {
	// 	state.account = state.areaCode + state.phone;
	// 	// 校验手机
	// } else {
	// 	state.account = state.email;
	// 	// 校验邮箱
	// 	if (!Common.getInstance().emailReg(state.account)) {
	// 		showToast($.t('login["电子邮箱不正确"]'));
	// 		return;
	// 	}
	// }
	// const params = {
	// 	type: state.type,
	// 	account: state.account,
	// };
	// const res = await ForgetPasswordApi.checkAccount(params).catch((err) => err);
	// if (res.code == Common.getInstance().ResCode.SUCCESS) {
	// 	emit("onStep", state);
	// }
	emit("onStep", state);
};
</script>

<style scoped lang="scss">
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
					color: themed("Theme-P");
				}
			}
		}

		.password-operation {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 32px;

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

			.label {
				color: var(--T1-N, #999ba0);
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
		}

		.footer {
			display: flex;
			align-items: center;
			justify-content: end;
			margin-top: 40px;
			text-align: center;
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 34px;
			.help {
				@include themeify {
					color: themed("Theme-P");
				}
			}
		}
	}
}
</style>
