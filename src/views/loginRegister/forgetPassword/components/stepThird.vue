<template>
	<div class="content">
		<div class="title">{{ $t('forgetPassword["设置新密码"]') }}</div>
		<div class="from">
			<FormInput
				v-model="state.password"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`forgetPassword['新密码']`)"
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
				<span v-if="!isPasswordValid && state.password !== ''" class="text">{{ $t('register["密码为8-16位"]') }}</span>
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
import common from "/@/utils/common";

const emit = defineEmits(["onStep"]);
const eyeShow = ref(true);
const btnDisabled = ref(true);
const state = reactive({
	password: "", // 密码
	confirmPassword: "", // 密码
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
	}
}
</style>
