<template>
	<div class="content">
		<div class="from">
			<div class="label"><span class="required">*</span>{{ $t(`forgetPassword['账号']`) }}</div>
			<FormInput v-model="state.userAccount" type="text" :placeholder="$t(`forgetPassword['账户名']`)" :maxlength="11">
				<template v-slot:left>
					<SvgIcon class="pr_14" iconName="loginOrRegister/userAccount" size="32px" />
				</template>
				<template v-slot:right>
					<SvgIcon v-if="state.userAccount" class="clearIcon" iconName="loginOrRegister/clear" @click="state.userAccount = ''" />
				</template>
			</FormInput>
			<!-- <div class="error_text">
				<span v-if="!isAccountValid && state.userAccount !== ''" class="text">{{ $t('register["请输入4-11位字母+数字组成，首位必须是字母"]') }}</span>
			</div> -->

			<Button class="mt_40" :type="!isAccountValid ? 'disabled' : 'default'" @click="onStep">{{ $t('forgetPassword["下一步"]') }}</Button>

			<div class="footer">
				<span class="help" @click="common.getSiteCustomerChannel">{{ $t('common["联系客服"]') }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
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
		showToast(res.message);
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
		> div.label {
			@include themeify {
				color: themed("TB");
				font-size: 28px;
				margin-bottom: 16px;
				margin-top: 28px;
			}
			.required {
				@include themeify {
					color: themed("Hint");
				}
			}
		}
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
			justify-content: center;
			margin-top: 40px;
			text-align: center;
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 34px;
			.help {
				@include themeify {
					color: themed("F2");
				}
			}
		}
	}
}
</style>
