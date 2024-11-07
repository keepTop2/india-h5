<template>
	<div class="search-input">
		<!-- 前插槽，用于传入左侧图标 -->
		<div class="prefix">
			<slot name="prefix"></slot>
		</div>

		<!-- 输入框 -->
		<input type="text" v-model="inputValue" :placeholder="placeholder" class="search-field" @input="changeValue" />

		<!-- 后插槽，用于传入右侧图标 -->
		<div class="suffix" @click="clearValue">
			<slot name="suffix" v-if="inputValue"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

// 定义传入的属性
const props = defineProps<{
	placeholder?: string;
	modelValue?: string;
}>();

// 设置输入框的值
const inputValue = ref(props.modelValue ?? "");
const emit = defineEmits(["update:modelValue"]);
const clearValue = () => {
	emit("update:modelValue", "");
	inputValue.value = "";
};
const changeValue = (e) => {
	emit("update:modelValue", e.target.value);
};
</script>

<style scoped lang="scss">
.search-input {
	display: flex;
	align-items: center;
	border-radius: 4px;
	padding: 4px;
	gap: 4px;
	position: relative;
	.prefix {
		position: absolute;
		left: 24px;
		display: flex;
	}
	.suffix {
		position: absolute;
		right: 24px;
		display: flex;
	}
}

.search-field {
	flex: 1;
	height: 64px;
	width: 100%;
	border: none;
	outline: none;
	padding-left: 70px;
	@include themeify {
		background: themed("BG3");
		color: themed("TB");
	}
}
</style>
