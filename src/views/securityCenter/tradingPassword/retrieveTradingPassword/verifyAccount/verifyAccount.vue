<template>
	<div class="content">
		<div class="title">{{ route.params.type === "email" ? $t('forgetPassword["邮箱验证"]') : $t('forgetPassword["手机号验证"]') }}</div>
		<div class="change" @click="onChange">{{ $t('forgetPassword["其他方式"]') }}</div>
		<div class="form">
			<FormInput
				v-model="state.password"
				:type="eyeShow ? 'password' : 'text'"
				:maxlength="16"
				:placeholder="$t(`login['登录密码']`)"
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

			<Button :type="btnDisabled ? 'disabled' : 'default'" class="mt_40" @click="onStep">{{ $t('forgetPassword["下一步"]') }}</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { tradingPasswordApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const eyeShow = ref(true);
const btnDisabled = ref(true);

const state = reactive({
	password: "", // 密码
});

const onChange = () => {
	if (route.params.type === "email") {
		router.push(`/retrieveTradingPassword/phone`);
	} else {
		router.push(`/retrieveTradingPassword/email`);
	}
};

// 密码正则
const isPasswordValid = computed(() => {
	return common.passwordRG.test(state.password);
});

// 监听状态密码状态
watch(
	[() => isPasswordValid.value],
	([isPasswordValid]) => {
		if (isPasswordValid) {
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
		type: route.params.type === "email" ? 1 : 2,
		password: state.password,
	};
	const res = await tradingPasswordApi.reFindWithdrawPwd(params).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		if (route.params.type === "email") {
			router.push(`/retrieveTradingPassword/email/retrieve`);
		} else {
			router.push(`/retrieveTradingPassword/phone/retrieve`);
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 40px 55px;
	.title {
		font-size: 36px;
		font-weight: 600;
		@include themeify {
			color: themed("TB");
		}
	}
	.change {
		margin-top: 20px;
		@include themeify {
			color: themed("Theme");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 500;
		text-decoration-line: underline;
	}
	.form {
		margin-top: 40px;

		.phone {
			display: flex;
			align-items: center;
			border-radius: 12px;
			@include themeify {
				background: themed("BG3");
			}
			.area_code {
				position: relative;
				width: 148px;
				height: 88px;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10px;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
				.down {
					width: 22px;
					height: 14px;
				}
				&::after {
					content: "";
					position: absolute;
					right: 0px;
					width: 2px;
					height: 84px;
					@include themeify {
						background: themed("Line");
					}
				}
			}
			:deep(.from-input) {
				flex: 1;
			}
		}
		.form-input-error {
			position: relative;
			&::after {
				content: "";
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				border-radius: 12px;
				border: 1px solid;
				@include themeify {
					border-color: themed("Theme");
				}
				box-sizing: border-box;
				pointer-events: none; /* 确保伪元素不会阻止用户与实际内容交互 */
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

		.tips {
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
}
</style>
