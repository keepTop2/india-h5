<template>
	<div>
		<VantNavBar :title="route.params.type === 'phone' ? $t(`VantNavBar['绑定手机号']`) : $t(`VantNavBar['绑定邮箱']`)" @onClickLeft="onClickLeft" />

		<Bind />
	</div>
</template>

<script setup lang="ts">
import Bind from "/@/views/securityCenter/bind/components/bind.vue";

import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const route = useRoute();
const $: any = i18n.global;

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss"></style>
