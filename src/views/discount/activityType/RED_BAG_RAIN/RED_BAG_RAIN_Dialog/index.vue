<template>
	<div v-if="modelValue" class="dialog-backdrop" :style="{ zIndex: currentZIndex }">
		<div class="dialog fade-in">
			<div class="dialog-header">
				<img src="./image/redbag.png" alt="" />
			</div>
			<div class="dialog-content">
				<div class="color_T4 fs_34">{{ title }}</div>
				<slot></slot>
			</div>
			<div class="dialog-footer">
				<button class="common_btn" @click="confirm"><slot name="footer">确认</slot></button>
			</div>
		</div>
		<div class="closeDialog" @click="close">
			<img src="../../../image/close.png" alt="" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";

// Props and emits setup
const props = defineProps({
	modelValue: Boolean, // The `modelValue` prop for v-model
	title: {
		type: String,
		default: "",
	},
	confirm: {
		type: Function,
		default: () => {},
	},
});

const emit = defineEmits(["update:modelValue"]); // Emits the update event for v-model

// Z-index management
const baseZIndex = 1000;
const currentZIndex = ref(baseZIndex);

onMounted(() => {
	// Increment the zIndex based on the number of open dialogs
	currentZIndex.value += document.getElementsByClassName("dialog-backdrop").length + 1;
});
const confirm = () => {
	props.confirm();
};
const close = () => {
	emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
.dialog-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	.dialog {
		position: relative;
		margin: 0 auto;
		width: 594px;
		padding: 40px;

		.dialog-header {
			text-align: center;
			background: url("./image/image.png") no-repeat;
			background-size: 100% 100%;
			font-weight: 500;
			img {
				height: 184px;
				width: 214px;
				margin-top: -40px;
				display: inline-block;
			}
		}

		.dialog-content {
			padding: 20px;
			background: #ffff;
			margin-top: -2px;
			text-align: center;
			@include themeify {
				color: themed("T2");
			}
		}
		.dialog-footer {
			background: #ffff;
			margin-top: -2px;
			border-bottom-left-radius: 24px;
			border-bottom-right-radius: 24px;

			text-align: center;
			padding: 0 20px 20px;
			.common_btn {
				width: 224px;
				height: 64px;
				border-radius: 10px;
				margin: 0 auto;
				font-size: 32px;
				display: inline-block;
				border: none;
				color: #fff;
				background: linear-gradient(277.78deg, #ff284b 4.74%, #fd677f 92.73%);
			}
		}
	}
}
.closeDialog {
	img {
		width: 64px;
		height: 64px;
		cursor: pointer;
	}
}
</style>
