<template>
	<button class="button" :disabled="type === 'disabled'">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		/**
		 * default 默认高亮
		 * disabled 默认未高亮且禁用
		 */
		type: "default" | "disabled";
	}>(),
	{
		type: "default",
	}
);
</script>

<style scoped lang="scss">
.button {
	width: 100%;
	height: 86px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border: 0;
	border-radius: 12px;
	@include themeify {
		background: themed("Theme");
		color: themed("TB");
	}
	text-align: center;
	font-family: "PingFang SC";
	font-size: 30px;
	font-weight: 400;
	transition: all 0.2s ease;
	box-sizing: border-box;
}

.button:disabled {
	width: 100%;
	height: 86px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border: 0;
	border-radius: 12px;
	@include themeify {
		background: themed("BG3");
		color: themed("T3");
	}
	text-align: center;
	font-family: "PingFang SC";
	font-size: 30px;
	font-weight: 400;
	box-sizing: border-box;
}
</style>
