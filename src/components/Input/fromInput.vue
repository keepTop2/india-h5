<template>
	<div class="from-input" :class="{ 'from-input-error': errorBorder }">
		<slot name="left"></slot>

		<input
			@input="emit('update:modelValue', $event.target.value)"
			@blur="emit('blur')"
			@focus="emit('focus')"
			:value="props.modelValue"
			:type="props.type"
			:readonly="props.readonly"
			:placeholder="props.placeholder"
			:maxlength="props.maxlength"
		/>
		<slot name="right"></slot>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue: string | number;
		type?: string;
		placeholder?: string;
		readonly?: boolean;
		maxlength?: any;
		errorBorder?: boolean;
	}>(),
	{
		modelValue: "",
		type: "text",
		placeholder: "",
		readonly: false,
		errorBorder: false,
	}
);

const emit = defineEmits(["update:modelValue", "blur", "focus"]);
</script>

<style scoped lang="scss">
.from-input {
	position: relative;
	display: flex;
	align-items: center;
	height: 94px;
	padding: 28px 24px;
	border-radius: 12px;
	@include themeify {
		background: themed("BG3");
	}
	box-sizing: border-box;
	input {
		flex: 1;
		font-family: "PingFang SC";
		padding: 0;
		@include themeify {
			color: themed("TB");
			background: themed("BG3");
		}
		font-size: 28px;
		font-weight: 400;
		border: 0;
	}
	::-webkit-input-placeholder {
		@include themeify {
			color: themed("T3-P");
		}
	}
}

.from-input-error {
	&::after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		border: 1px solid;
		@include themeify {
			border-color: themed("Theme");
		}
		box-sizing: border-box;
		pointer-events: none; /* 确保伪元素不会阻止用户与实际内容交互 */
	}
}
</style>
