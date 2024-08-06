<template>
	<div>
		<VantNavBar :title="$t(`VantNavBar['找回交易密码']`)" @onClickLeft="onClickLeft" />
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss"></style>
