<template>
	<div class="content">
		<div class="title">{{ $t('forgetPassword["找回密码"]') }}</div>
		<div class="from">
			<FromInput v-model="state.account" type="text" :placeholder="$t(`forgetPassword['账户名']`)" :errorBorder="!isAccountValid && state.account !== '' ? true : false">
				<template v-slot:right>
					<SvgIcon v-if="state.account" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.account = ''" />
				</template>
			</FromInput>
			<div class="error_text">
				<span v-if="!isAccountValid && state.account !== ''" class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
			</div>

			<Button :type="!isAccountValid ? 'disabled' : 'default'" @click="onStep">{{ $t('forgetPassword["下一步"]') }}</Button>

			<div class="footer">
				<div>
					<span class="help">{{ $t('common["联系客服"]') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";

const emit = defineEmits(["onStep"]);

const state = reactive({
	account: "",
});

// 账号正则
const isAccountValid = computed(() => {
	return common.accountRG.test(state.account);
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
.content {
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
				margin-top: 4px;
				font-family: "PingFang SC";
				font-size: 20px;
				font-weight: 400;
				@include themeify {
					color: themed("Theme");
				}
			}
		}

		.footer {
			display: flex;
			align-items: center;
			justify-content: left;
			margin-top: 40px;
			text-align: center;
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 34px;
			.help {
				@include themeify {
					color: themed("Theme");
				}
			}
		}
	}
}
</style>
