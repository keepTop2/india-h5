<template>
	<div class="forgetPassword-container">
		<NavBar />
		<HeaderBG />

		<component :is="componentMaps[state.computedIndex]" :data="state.params" @onStep="onStep" />
	</div>
</template>

<script setup lang="ts" :defer="true">
import NavBar from "/@/layout/loginRegister/components/navBar.vue";
import HeaderBG from "/@/views/loginRegister/components/headerBG.vue";
import StepOne from "/@/views/loginRegister/forgetPassword/components/stepOne.vue";
import StepTwo from "/@/views/loginRegister/forgetPassword/components/stepTwo.vue";
import StepThird from "/@/views/loginRegister/forgetPassword/components/stepThird.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const componentMaps = {
	0: StepOne,
	1: StepTwo,
	2: StepThird,
};

const state = reactive({
	params: {
		userAccount: "",
	},
	computedIndex: 0,
});

onMounted(() => {});

const onStep = (data?: any) => {
	state.params = Object.assign({}, state.params, data);
	if (state.computedIndex == 2) {
		router.push("/login");
	}
	state.computedIndex++;
	console.log("state.computedIndex", state.computedIndex);
};
</script>

<style lang="scss" scoped>
.forgetPassword-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}
}
</style>
