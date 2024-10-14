<template>
	<div>
		<VantNavBar :title="$t(`VantNavBar['修改交易密码']`)" @onClickLeft="onClickLeft" />

		<form class="form">
			<!-- 原交易密码 -->
			<span class="title">{{ $t('editTradingPassword["原交易密码"]') }}</span>
			<FormInput
				v-model="state.oldPassword"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="6"
				:placeholder="$t(`editTradingPassword['原交易密码']`)"
				:errorBorder="!isOldPasswordValid && state.oldPassword !== ''"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.oldPassword" class="clearIcon" iconName="loginOrRegister/clear" @click="state.oldPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isOldPasswordValid && state.oldPassword !== ''" class="text">{{ $t('setTradingPassword["请输入6位数字"]') }}</span>
			</div>

			<!-- 新交易密码 -->
			<span class="title">{{ $t('editTradingPassword["新交易密码"]') }}</span>
			<FormInput
				v-model="state.newPassword"
				:type="eyeShow2 ? 'password' : 'text'"
				:maxlength="6"
				:placeholder="$t(`editTradingPassword['新交易密码']`)"
				:errorBorder="(!isNewPasswordValid || isSameAsOldPassword) && state.newPassword !== ''"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.newPassword" class="clearIcon" iconName="loginOrRegister/clear" @click="state.newPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow2 ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow2 = !eyeShow2" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isNewPasswordValid && state.newPassword !== ''" class="text">{{ $t('setTradingPassword["请输入6位数字"]') }}</span>
				<span v-if="isNewPasswordValid && isSameAsOldPassword" class="text">{{ $t('editTradingPassword["新交易密码不能与旧交易密码相同"]') }}</span>
			</div>

			<!-- 确认交易密码 -->
			<span class="title">{{ $t('editTradingPassword["确认交易密码"]') }}</span>
			<FormInput
				v-model="state.confirmPassword"
				:type="eyeShow3 ? 'password' : 'text'"
				:maxlength="6"
				:placeholder="$t(`editTradingPassword['确认交易密码']`)"
				:errorBorder="!isConfirmPasswordValid && state.confirmPassword !== ''"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.confirmPassword" class="clearIcon" iconName="loginOrRegister/clear" @click="state.confirmPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow3 ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow3 = !eyeShow3" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isConfirmPasswordValid && state.confirmPassword !== ''" class="text">{{ $t('setTradingPassword["两次交易密码不一致"]') }}</span>
			</div>

			<!-- 确定按钮 -->
			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onSubmit">{{ $t('editTradingPassword["确定"]') }}</Button>

			<!-- 忘记旧密码提示 -->
			<div class="tips">
				{{ $t('editTradingPassword["忘记了旧交易密码？"]') }}
				<span @click="$router.push('/retrieveTradingPassword/email')">{{ $t('editTradingPassword["找回交易密码"]') }}</span>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { tradingPasswordApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
import { showToast } from "vant";
const router = useRouter();
const $ = i18n.global;
const eyeShow = ref(true);
const eyeShow2 = ref(true);
const eyeShow3 = ref(true);
const btnDisabled = ref(true);

const state = reactive({
	oldPassword: "", // 旧密码
	newPassword: "", // 新密码
	confirmPassword: "", // 确认新密码
});

// 计算属性：检查旧密码是否符合正则表达式
const isOldPasswordValid = computed(() => {
	return common.tradingPasswordRG.test(state.oldPassword);
});

// 计算属性：检查新密码是否符合正则表达式
const isNewPasswordValid = computed(() => {
	return common.tradingPasswordRG.test(state.newPassword);
});

// 计算属性：检查新密码是否与旧密码相同
const isSameAsOldPassword = computed(() => {
	return state.oldPassword === state.newPassword;
});

// 计算属性：检查确认密码是否与新密码一致
const isConfirmPasswordValid = computed(() => {
	return state.confirmPassword === state.newPassword;
});

// 监听用户状态，确定按钮是否禁用
watch(
	[isOldPasswordValid, isNewPasswordValid, isSameAsOldPassword, isConfirmPasswordValid],
	([oldPasswordValid, newPasswordValid, sameAsOldPassword, confirmPasswordValid]) => {
		// 如果所有条件都满足，则启用按钮
		btnDisabled.value = !(oldPasswordValid && newPasswordValid && !sameAsOldPassword && confirmPasswordValid);
	},
	{
		immediate: true,
	}
);

const onSubmit = async () => {
	const res = await tradingPasswordApi.changeWithdrawPwd(state).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		showToast(res.message);
		clear();
		onClickLeft();
	}
};

const clear = () => {
	state.oldPassword = "";
	state.newPassword = "";
	state.confirmPassword = "";
};

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.form {
	padding: 40px 55px;

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
			margin-bottom: 8px;
			font-family: "PingFang SC";
			font-size: 20px;
			font-weight: 400;
			@include themeify {
				color: themed("Theme");
			}
		}
	}

	.tips {
		margin-top: 16px;
		text-align: end;

		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;

		span {
			@include themeify {
				color: themed("Theme");
			}
		}
	}
}
</style>
