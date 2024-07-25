<template>
	<div class="from-input">
		<slot name="left"></slot>

		<input
			@input="emit('update:modelValue', $event.target.value)"
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
	}>(),
	{
		modelValue: "",
		type: "text",
		placeholder: "",
		readonly: false,
	}
);

const emit = defineEmits(["update:modelValue"]);
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
		margin-right: 10px;
		padding: 0;
		@include themeify {
			color: themed("TB");
			background: themed("BG3");
		}
		font-size: 28px;
		font-weight: 400;
		line-height: 38px;
		border: 0;
	}
	::-webkit-input-placeholder {
		@include themeify {
			color: themed("T3-P");
		}
	}
}
</style>
