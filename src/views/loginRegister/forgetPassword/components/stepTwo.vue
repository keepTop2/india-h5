<template>
	<div class="content">
		<div class="title">{{ type == "email" ? $t('forgetPassword["邮箱验证"]') : $t('forgetPassword["手机号验证"]') }}</div>
		<div class="change" @click="onChange">{{ $t('forgetPassword["其他方式"]') }}</div>
		<div class="form">
			<!-- 邮箱 -->
			<div v-show="type == 'email'">
				<FormInput v-model="state.email" type="text" :placeholder="$t(`forgetPassword['请输入电子邮箱']`)" :errorBorder="!isEmailValid && state.email !== '' ? true : false">
					<template v-slot:right>
						<SvgIcon v-if="state.email" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.email = ''" />
					</template>
				</FormInput>
				<div class="error_text">
					<span v-if="!isEmailValid && state.email !== ''" class="text">{{ $t('forgetPassword["邮箱格式不正确"]') }}</span>
				</div>
			</div>

			<!-- 手机号码 -->
			<div v-show="type == 'phone'">
				<div class="phone" :class="{ 'form-input-error': !isPhoneValid && state.phone !== '' ? true : false }">
					<div class="area_code">+888 <SvgIcon class="down" iconName="/loginOrRegister/navBar/down" /></div>
					<FormInput v-model="state.phone" type="text" :placeholder="$t(`forgetPassword['请输入手机号']`)">
						<template v-slot:right>
							<SvgIcon v-if="state.phone" class="clearIcon" iconName="/loginOrRegister/clear" @click="state.phone = ''" />
						</template>
					</FormInput>
				</div>
				<div class="error_text">
					<span v-if="!isPhoneValid && state.phone !== ''" class="text">{{ $t('forgetPassword["请输入8-12位数字"]') }}</span>
				</div>
			</div>

			<FormInput v-model="state.email" type="text" :placeholder="$t(`common['验证码']`)">
				<template v-slot:right>
					<CaptchaButton :disabled="captchaDisabled" />
				</template>
			</FormInput>

			<div class="tips">
				{{ $t('forgetPassword["重新发送"]') }}<span class="help">{{ $t('common["联系客服"]') }}</span>
			</div>

			<Button class="mt_40" :type="!state.email ? 'disabled' : 'default'" @click="onStep">{{ $t('forgetPassword["下一步"]') }}</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";
import common from "/@/utils/common";

const emit = defineEmits(["onStep"]);

const type = ref<"email" | "phone">("email");

const state = reactive({
	email: "",
	phone: "",
});

// 邮箱正则
const isEmailValid = computed(() => common.emailRG.test(state.email));

// 手机号正则
const isPhoneValid = computed(() => common.phoneRG.test(state.phone));

// 验证码按钮禁用状态
const captchaDisabled = computed(() => {
	if (type.value === "email") return !isEmailValid.value || state.email === "";
	if (type.value === "phone") return !isPhoneValid.value || state.phone === "";
	return true;
});

const onChange = () => {
	type.value = type.value === "email" ? "phone" : "email";
};

const onStep = async () => {
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
