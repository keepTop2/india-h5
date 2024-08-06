<template>
	<form class="form">
		<!-- 新交易密码 -->
		<span class="title">{{ $t('setTradingPassword["交易密码"]') }}</span>
		<FormInput
			v-model="state.password"
			:type="eyeShow ? 'password' : 'text'"
			:maxlength="16"
			:placeholder="$t(`setTradingPassword['交易密码']`)"
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
			<span v-if="!isPasswordValid && state.password !== ''" class="text">{{ $t('setTradingPassword["请输入6位数字"]') }}</span>
		</div>

		<!--  确认新交易密码 -->
		<span class="title">{{ $t('setTradingPassword["确认交易密码"]') }}</span>
		<FormInput
			v-model="state.confirmPassword"
			:type="eyeShow ? 'password' : 'text'"
			:maxlength="16"
			:placeholder="$t(`setTradingPassword['确认交易密码']`)"
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
			<span v-if="!isConfirmPasswordValid" class="text">{{ $t('setTradingPassword["两次输入密码不一致"]') }}</span>
		</div>

		<!-- 邮箱 -->
		<div v-if="route.params.type == 'email'">
			<span class="label">{{ $t('editContactDetails["邮箱验证"]') }}</span>
			<p>{{ $t('editContactDetails["验证码将发送至邮箱账号："]') }}</p>
			<p>{{ $t('editContactDetails["有效时间："]') }}</p>
		</div>

		<!-- 手机号码 -->

		<div v-if="route.params.type == 'phone'">
			<span class="label">{{ $t('editContactDetails["手机号验证"]') }}</span>
			<p>{{ $t('editContactDetails["验证码将发送至手机号："]') }}</p>
			<p>{{ $t('editContactDetails["有效时间："]') }}</p>
		</div>

		<span class="title">{{ $t('bindPhone["验证码"]') }}</span>
		<FormInput v-model="state.email" type="text" :placeholder="$t(`common['验证码']`)">
			<template v-slot:right>
				<CaptchaButton :disabled="true" />
			</template>
		</FormInput>

		<div class="tips">
			{{ $t('editContactDetails["重新发送"]') }}<span class="help">{{ $t('common["联系客服"]') }}</span>
		</div>

		<Button class="mt_40" :type="!state.email ? 'disabled' : 'default'" @click="onSubmit">{{ $t('editContactDetails["确定"]') }}</Button>
	</form>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const eyeShow = ref(true);
const btnDisabled = ref(true);

const state = reactive({
	password: "", // 密码
	confirmPassword: "", // 密码
	email: "",
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
	[() => isPasswordValid.value, () => isConfirmPasswordValid.value],
	([isPasswordValid, isConfirmPasswordValid]) => {
		if (isPasswordValid && isConfirmPasswordValid) {
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

<style scoped lang="scss">
.form {
	padding: 40px 55px;

	.label {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 12px;
		display: inline-block;
	}

	p {
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
	}

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

	.tips {
		text-align: end;
		margin-top: 20px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
		.help {
			@include themeify {
				color: themed("Theme");
			}
		}
	}
}
</style>
