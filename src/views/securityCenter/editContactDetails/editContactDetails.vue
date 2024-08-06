<template>
	<div>
		<VantNavBar :title="route.params.type === 'phone' ? $t(`VantNavBar['修改手机号']`) : $t(`VantNavBar['修改邮箱']`)" @onClickLeft="onClickLeft" />

		<form class="form">
			<!-- 邮箱 -->
			<div v-if="route.params.type == 'email'">
				<span class="label">{{ $t('editContactDetails["邮箱验证"]') }}</span>
				<p>{{ $t('editContactDetails["验证码将发送至邮箱账号："]') }}</p>
				<p>{{ $t('editContactDetails["有效时间："]') }}</p>
			</div>

			<!-- 手机号码 -->

			<div v-if="route.params.type == 'phone'">
				<span class="title">{{ $t('editContactDetails["手机号验证"]') }}</span>
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
	</div>
</template>

<script setup lang="ts">
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const route = useRoute();
const $: any = i18n.global;

const state = reactive({
	email: "",
});

const onClickLeft = () => {
	router.go(-1);
};
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
		margin-top: 36px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 16px;
		display: inline-block;
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
