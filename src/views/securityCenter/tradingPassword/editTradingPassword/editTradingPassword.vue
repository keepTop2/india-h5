<template>
	<div>
		<VantNavBar :title="$t(`VantNavBar['修改交易密码']`)" @onClickLeft="onClickLeft" />

		<form class="form">
			<span class="title">{{ $t('editTradingPassword["原交易密码"]') }}</span>
			<FormInput
				v-model="state.oldPassword"
				:type="eyeShow ? 'oldPassword' : 'text'"
				:maxlength="16"
				:placeholder="$t(`editTradingPassword['原交易密码']`)"
				:errorBorder="!isOldPasswordValid && state.oldPassword !== '' ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.oldPassword" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.oldPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isOldPasswordValid && state.oldPassword !== ''" class="text">{{ $t('editTradingPassword["密码为8-16位"]') }}</span>
			</div>

			<span class="title">{{ $t('editTradingPassword["新交易密码"]') }}</span>
			<FormInput
				v-model="state.password"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`editTradingPassword['新交易密码']`)"
				:errorBorder="!isPasswordValid && state.password !== '' ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.password" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.password = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isPasswordValid && state.password !== ''" class="text">{{ $t('editTradingPassword["新交易密码不能与旧交易密码相同"]') }}</span>
			</div>

			<span class="title">{{ $t('editTradingPassword["确认交易密码"]') }}</span>
			<FormInput
				v-model="state.confirmPassword"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`editTradingPassword['确认交易密码']`)"
				:errorBorder="!isConfirmPasswordValid ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.confirmPassword" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.confirmPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isConfirmPasswordValid" class="text">{{ $t('register["两次交易密码不一致"]') }}</span>
			</div>

			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onRegister">{{ $t('editTradingPassword["确定"]') }}</Button>

			<div class="tips">
				{{ $t('editTradingPassword["忘记了旧交易密码？"]') }}
				<span @click="$router.push('/retrieveTradingPassword/email')"> {{ $t('editTradingPassword["找回交易密码"]') }}</span>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const $: any = i18n.global;

const eyeShow = ref(true);
const btnDisabled = ref(true);

const state = reactive({
	oldPassword: "", // 密码
	password: "", // 密码
	confirmPassword: "", // 密码
});

// 密码正则
const isOldPasswordValid = computed(() => {
	return common.passwordRG.test(state.oldPassword);
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
	[() => isOldPasswordValid.value, () => isPasswordValid.value, () => isConfirmPasswordValid.value],
	([isOldPasswordValid, isPasswordValid, isConfirmPasswordValid]) => {
		if (isOldPasswordValid && isPasswordValid && isConfirmPasswordValid) {
			btnDisabled.value = false;
		} else {
			btnDisabled.value = true;
		}
	},
	{
		immediate: true,
	}
);

const onRegister = async () => {};

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
