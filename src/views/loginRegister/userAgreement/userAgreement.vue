<template>
	<div class="protocol-container">
		<VantNavBar :title="$t(`VantNavBar['用户协议']`)" @onClickLeft="router.back()" />
		<div class="container">
			<div class="text" v-html="AgreementContent?.agreement"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { loginApi } from "/@/api/loginRegister";
import router from "/@/router";
const AgreementContent: any = ref({});
onMounted(() => {
	getAgreement();
});
const getAgreement = () => {
	loginApi.getAgreement().then((res) => {
		AgreementContent.value = res.data;
	});
};
</script>

<style scoped lang="scss">
.protocol-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.container {
		padding: 32px;
		.text {
			@include themeify {
				color: themed("T1");
			}
			font-size: 28px;
			font-weight: 400;
			line-height: 38px;
		}
	}
}
</style>
