<template>
	<div>
		<VantNavBar :title="$t(`VantNavBar['修改密码']`)" @onClickLeft="onClickLeft" />

		<form class="form">
			<span class="title">{{ $t('loginPassword["旧密码"]') }}</span>

			<FormInput
				v-model="state.oldPassword"
				:type="eyeShow ? 'oldPassword' : 'text'"
				:maxlength="16"
				:placeholder="$t(`loginPassword['旧密码']`)"
				:errorBorder="!isOldPasswordValid && state.oldPassword !== '' ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.oldPassword" class="clearIcon" iconName="loginOrRegister/clear" @click="state.oldPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isOldPasswordValid && state.oldPassword !== ''" class="text">{{ $t('register["密码为8-16位"]') }}</span>
			</div>

			<span class="title">{{ $t('loginPassword["新密码"]') }}</span>
			<FormInput
				v-model="state.newPassword"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`loginPassword['新密码']`)"
				:errorBorder="!isPasswordValid && state.newPassword !== '' ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.newPassword" class="clearIcon" iconName="loginOrRegister/clear" @click="state.newPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isPasswordValid && state.newPassword !== ''" class="text">{{ $t('register["密码为8-16位"]') }}</span>
			</div>

			<span class="title">{{ $t('loginPassword["确认密码"]') }}</span>
			<FormInput
				v-model="state.confirmPassword"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`loginPassword['确认密码']`)"
				:errorBorder="!isConfirmPasswordValid ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.confirmPassword" class="clearIcon" iconName="loginOrRegister/clear" @click="state.confirmPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? 'loginOrRegister/eye-off' : 'loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isConfirmPasswordValid" class="text">{{ $t('register["两次输入密码不一致"]') }}</span>
			</div>

			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onSubmit">{{ $t('loginPassword["确定"]') }}</Button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { loginPasswordApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
import { showToast } from "vant";
const router = useRouter();
const $: any = i18n.global;

const eyeShow = ref(true);
const btnDisabled = ref(true);

const state = reactive({
	oldPassword: "", // 密码
	newPassword: "", // 密码
	confirmPassword: "", // 密码
});

// 密码正则
const isOldPasswordValid = computed(() => {
	return common.passwordRG.test(state.oldPassword);
});

// 密码正则
const isPasswordValid = computed(() => {
	return common.passwordRG.test(state.newPassword);
});

// 密码正则
const isConfirmPasswordValid = computed(() => {
	return state.confirmPassword == state.newPassword;
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

const onSubmit = async () => {
	const res = await loginPasswordApi.changePassword(state).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		showToast($.t("common['修改成功']"));
		// 返回上一个页面
		router.go(-1);
	}
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
</style>
