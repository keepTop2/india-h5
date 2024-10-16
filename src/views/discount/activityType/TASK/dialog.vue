<template>
	<div v-if="modelValue" class="dialog-backdrop" :style="{ zIndex: currentZIndex }">
		<div class="dialog2 fade-in" v-if="dialog2">
			<div class="dialog-header">
				<div class="title color_TB fs_34">{{ title }}</div>
			</div>
			<div class="dialog-content fs_30 color_T1">
				<slot></slot>
			</div>
			<div class="dialog-footer">
				<div class="common_btn" @click="close">关闭</div>
			</div>
		</div>
		<div class="dialog fade-in" v-else>
			<div class="dialog-header">
				<img src="./image/dialogImage.png" alt="" />
				<div class="title color_T4 fs_34">{{ title }}</div>
			</div>
			<div class="dialog-content fs_30">
				<slot></slot>
			</div>
			<div class="dialog-footer">
				<button class="common_btn" @click="confirm">关闭</button>
			</div>
		</div>
		<div class="closeDialog" @click="close" v-if="!dialog2">
			<img src="../../image/close.png" alt="" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import router from "/@/router";
const props = defineProps({
	modelValue: Boolean,
	title: {
		type: String,
		default: "",
	},
	goToLogin: {
		type: Boolean,
		default: false,
	},
	dialog2: {
		type: Boolean,
		default: false,
	},
	confirm: {
		type: Function,
		default: () => {},
	},
});
const emit = defineEmits(["update:modelValue"]);
const baseZIndex = 1000;
const currentZIndex = ref(baseZIndex);
onMounted(() => {
	currentZIndex.value += document.getElementsByClassName("dialog-backdrop").length + 1;
});
const confirm = () => {
	props.confirm();
};
const close = () => {
	emit("update:modelValue", false);
};
const toRegister = () => {
	router.push("/register");
};
const toLogin = () => {
	router.push("/login");
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
	.dialog2 {
		width: 540px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		@include themeify {
			background: themed("BG1");
		}
		.dialog-header {
			padding: 20px 0;
			text-align: center;

			@include themeify {
				color: themed("TB");
				border-bottom: 1px solid themed("Line");
			}
		}
		.dialog-content {
			min-height: 100px;
			width: 448px;
			margin: 0 auto;
			padding: 16px 0;
		}
		.dialog-footer {
			margin: 0 auto;
			height: 75px;
			width: 100%;
			text-align: center;
			line-height: 75px;
			@include themeify {
				color: themed("Theme");
				border-top: 1px solid themed("Line");
			}
		}
	}
	.dialog {
		position: relative;
		width: 594px;
		padding: 20px;

		.dialog-header {
			text-align: center;
			background: url("../../image/dialogHeader_bg.png") center no-repeat;
			background-size: 100% 100%;
			font-weight: 500;
			@include themeify {
				color: themed("T1");
			}
			img {
				height: 204px;
				display: inline-block;
				margin-top: -60px;
			}
		}
		.dialog-content {
			padding: 20px 42px;
			background-color: #ffffff;
			text-align: center;
			min-height: 100px;
			border: none;
			margin-top: -2px;

			@include themeify {
				color: themed("T1");
			}
		}
		.dialog-footer {
			border-bottom-left-radius: 24px;
			border-bottom-right-radius: 24px;
			background-color: #ffffff;
			margin-top: -2px;

			text-align: center;
			.common_btn {
				width: 224px;
				height: 64px;
				margin: 36px auto;
				border-radius: 10px;
				background: linear-gradient(278deg, #ff284b 4.74%, #fd677f 92.73%);
				border: none;
				@include themeify {
					color: themed("TB");
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
}
</style>
