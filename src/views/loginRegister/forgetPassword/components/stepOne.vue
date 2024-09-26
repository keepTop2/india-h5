<template>
	<div class="content">
		<div class="title">{{ $t('forgetPassword["找回密码"]') }}</div>
		<div class="from">
			<FormInput v-model="state.userAccount" type="text" :placeholder="$t(`forgetPassword['账户名']`)" :errorBorder="!isAccountValid && state.userAccount !== '' ? true : false">
				<template v-slot:right>
					<SvgIcon v-if="state.userAccount" class="clearIcon" iconName="loginOrRegister/clear" @click="state.userAccount = ''" />
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isAccountValid && state.userAccount !== ''" class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
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
import { showFailToast } from "vant";
import { forgetPasswordApi } from "/@/api/loginRegister";
import common from "/@/utils/common";

const emit = defineEmits(["onStep"]);

const state = reactive({
	userAccount: "",
});

// 账号正则
const isAccountValid = computed(() => {
	return common.accountRG.test(state.userAccount);
});

const onStep = async () => {
	const res = await forgetPasswordApi.submitAccount(state).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		emit("onStep", state);
	} else {
		showFailToast(res.message);
	}
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
