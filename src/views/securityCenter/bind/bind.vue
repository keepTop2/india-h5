<template>
	<div>
		<VantNavBar :title="navBarTitle" @onClickLeft="onClickLeft" />

		<Bind />
	</div>
</template>

<script setup lang="ts">
import Bind from "/@/views/securityCenter/bind/components/bind.vue";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const route = useRoute();
const $: any = i18n.global;

const navBarTitle = computed(() => {
	const type = route.params.type;
	const isEdit = Boolean(route.query.revise);
	if (type === "phone") {
		return isEdit ? $.t("VantNavBar['修改手机号']") : $.t("VantNavBar['绑定手机号']");
	} else if (type === "email") {
		return isEdit ? $.t("VantNavBar['修改邮箱']") : $.t("VantNavBar['绑定邮箱']");
	}
	return "";
});

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss"></style>
