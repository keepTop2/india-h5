<template>
	<div class="content">
		<div class="title">{{ $t('forgetPassword["设置新密码"]') }}</div>
		<div class="from">
			<FormInput
				v-model="state.newPassword"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`forgetPassword['新密码']`)"
				:errorBorder="!isPasswordValid && state.newPassword !== '' ? true : false"
			>
				<template v-slot:right>
					<div class="right">
						<SvgIcon v-if="state.newPassword" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.newPassword = ''" />
						<SvgIcon class="icon" :iconName="eyeShow ? '/loginOrRegister/eye-off' : '/loginOrRegister/eye'" @click="eyeShow = !eyeShow" />
					</div>
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isPasswordValid && state.newPassword !== ''" class="text">{{ $t('register["密码为8-16位"]') }}</span>
			</div>

			<FormInput
				v-model="state.confirmPassword"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`forgetPassword['确认密码']`)"
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
				<span v-if="!isConfirmPasswordValid" class="text">{{ $t('register["两次输入密码不一致"]') }}</span>
			</div>

			<Button :type="btnDisabled ? 'disabled' : 'default'" @click="onStep">{{ $t('forgetPassword["确定"]') }}</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { forgetPasswordApi } from "/@/api/loginRegister";
import common from "/@/utils/common";
import { showFailToast, showToast } from "vant";
import { useRouter } from "vue-router";

const props = withDefaults(
	defineProps<{
		data?: any;
	}>(),
	{ data: {} }
);

const emit = defineEmits(["onStep"]);
const router = useRouter();
const eyeShow = ref(true);
const btnDisabled = ref(true);
const state = reactive({
	newPassword: "", // 密码
	confirmPassword: "", // 密码
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

const onStep = async () => {
	const params = {
		userAccount: props.data.userAccount,
		account: props.data.type === "email" ? props.data.email : props.data.phone,
		areaCode: props.data.type === "phone" ? props.data.areaCode : "",
		verifyCode: props.data.verifyCode,
		newPassword: state.newPassword,
		confirmPassword: state.confirmPassword,
	};
	const res = await forgetPasswordApi.resetPassword(params).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		showToast("修改成功");
		router.push("/login");
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
	}
}
</style>
