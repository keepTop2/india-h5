<template>
	<div v-if="modelValue" class="dialog-backdrop" :style="{ zIndex: currentZIndex }">
		<div class="dialog fade-in">
			<div class="dialog-header">
				<img src="../image/dialogHeader.png" alt="" />
				<div class="title color_T4 fs_34">{{ title }}</div>
			</div>
			<div class="dialog-content fs_30">
				<slot></slot>
			</div>
			<div class="dialog-footer2" v-if="goToLogin">
				<button class="common_btn" @click="toRegister">
					<slot name="footer"> 去注册 </slot>
				</button>
				<button class="common_btn" @click="toLogin">
					<slot name="footer"> 去登录 </slot>
				</button>
			</div>
			<div class="dialog-footer" v-else>
				<footer>
					<button class="common_btn" @click="confirm">
						<slot name="footer"> 确认 </slot>
					</button>
				</footer>
			</div>
		</div>
		<div class="closeDialog" @click="close">
			<img src="../image/close.png" alt="" />
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
	close();
};
const toLogin = () => {
	router.push("/login");
	close();
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
	:deep(img) {
		max-width: 100% !important;
	}
	.dialog {
		position: relative;
		width: 594px;
		padding: 20px;

		.dialog-header {
			text-align: center;
			background: url("../image/dialogHeader_bg.png") center no-repeat;
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
		.dialog-footer2 {
			border-bottom-left-radius: 24px;
			border-bottom-right-radius: 24px;
			background-color: #ffffff;
			margin-top: -2px;
			text-align: center;
			gap: 36px;

			.common_btn {
				display: inline-block;
				width: 224px;
				height: 64px;
				margin: 36px 18px;
				border-radius: 10px;
				background: linear-gradient(278deg, #ff284b 4.74%, #fd677f 92.73%);
				border: none;
				@include themeify {
					color: themed("TB");
				}
			}
			.common_btn:first-child {
				background: transparent;
				border: 1px solid #ff284b;
				@include themeify {
					color: themed("Theme");
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
