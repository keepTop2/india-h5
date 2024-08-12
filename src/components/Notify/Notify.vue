<template>
	<div class="notify" @click="router.push('./messageCenter')">
		<div class="badge"></div>
		<Notify class="notifyIcon van-haptics-feedback" />
	</div>
</template>

<script setup lang="ts">
import Notify from "/@/assets/zh-CN/default/common/notify.svg";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
.notify {
	position: relative;
	width: 64px;
	height: 64px;

	.badge {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: var(--Theme, #ff284b);
	}

	.notifyIcon {
		width: 100%;
		height: 100%;
	}
}
</style>
