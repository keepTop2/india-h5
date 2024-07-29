<template>
	<div class="forgetPassword-container">
		<HeaderBG />

		<component :is="componentMaps[state.computedIndex]" :data="state.params" @onStep="onStep" />
	</div>
</template>

<script setup lang="ts" :defer="true">
import HeaderBG from "/@/views/loginRegister/components/headerBG.vue";
import StepOne from "/@/views/loginRegister/forgetPassword/components/stepOne.vue";

const componentMaps = {
	0: StepOne,
};

const state = reactive({
	params: {},
	computedIndex: 0,
});

onMounted(() => {});
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
