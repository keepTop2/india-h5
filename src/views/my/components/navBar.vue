<template>
	<div class="my_nvaBar">
		<div class="logo">
			<VantLazyImg :src="logo" />
		</div>
		<Notify v-if="store.token" />
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "/@/store/modules/user";
import Notify from "/@/components/Notify/Notify.vue";
import logo from "/@/assets/zh-CN/default/my/my_logo.png";
const store = useUserStore();
</script>

<style scoped lang="scss">
.my_nvaBar {
	width: 100%;
	height: 88px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 24px;
	box-sizing: border-box;
	.logo {
		width: 198px;
		height: 24px;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
