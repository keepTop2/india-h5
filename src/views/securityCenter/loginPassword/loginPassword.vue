<template>
	<div>
		<VantNavBar :title="$t(`VantNavBar['修改密码']`)" @onClickLeft="onClickLeft" />
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const $: any = i18n.global;

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss"></style>
