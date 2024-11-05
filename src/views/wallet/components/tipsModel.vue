<template>
	<div class="modal-mask" @click="handleMaskClick">
		<!-- 点击遮罩关闭 -->
		<transition name="fade" appear>
			<div class="modal-container" @click.stop>
				<!-- 防止内部点击关闭 -->
				<header class="modal-header">
					<div class="header">{{ title }}</div>
				</header>
				<section class="modal-body">
					<div class="content">
						{{ text }}
					</div>
				</section>
				<footer class="modal-footer">
					<div class="footer" :class="{ line: showCancel }">
						<div v-if="showCancel" class="cancel" @click="handleClose">{{ cancelText }}</div>
						<div v-if="showConfirm" class="confirm" @click="handleConfirm">{{ confirmText }}</div>
					</div>
				</footer>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps<{
	title?: string;
	text: string;
	cancelText?: string;
	confirmText?: string;
	showCancel?: boolean;
	showConfirm?: boolean;
	onClose: () => void; // 接收关闭回调
	onConfirm: () => void; // 接收确认回调
}>();

const emit = defineEmits(["closeModal", "confirm"]);

const handleClose = () => {
	props.onClose(); // 调用关闭回调
};

const handleConfirm = () => {
	props.onConfirm(); // 调用确认回调
};

// 点击遮罩时关闭模态框
const handleMaskClick = () => {
	handleClose(); // 调用关闭逻辑
};
</script>

<style scoped lang="scss">
.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}

.modal-container {
	position: relative; /* 或 fixed */
	transform-origin: center center; /* 以中心为缩放点 */
	width: 540px;
	@include themeify {
		background-color: themed("BG1");
	}
	border-radius: 10px;
}

.header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	border-bottom: 1px solid;
	@include themeify {
		color: themed("TB");
		border-color: themed("Line");
	}
	font-family: "PingFang SC";
	font-size: 32px;
	font-weight: 400;
	box-sizing: border-box;
}

.content {
	min-height: 190px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px 46px;
	box-sizing: border-box;
	@include themeify {
		color: themed("T1");
	}
	text-align: center;
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 400;
}

.footer {
	position: relative;
	width: 100%;
	height: 76px;
	display: flex;
	gap: 1px;
	align-items: center;
	justify-content: space-between;
	border-top: 1px solid;
	@include themeify {
		border-color: themed("Line");
	}

	.cancel,
	.confirm {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
	}
	.confirm {
		@include themeify {
			color: themed("Theme");
		}
	}
}

.line {
	&::after {
		position: absolute;
		content: "";
		top: 0px;
		left: 50%;
		width: 1px;
		height: 100%;
		@include themeify {
			background-color: themed("Line");
		}
	}
}
</style>
