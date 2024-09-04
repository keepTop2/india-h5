<template>
	<transition name="dialog" enter-active-class="fade-in" leave-active-class="fade-out">
		<div v-show="visible" :class="`dialog-overlay`">
			<div :style="{ width, maxHeight: `${maxHeightRef}px` }" class="dialog-container bg_BG1">
				<div class="dialog-header">
					<div class="dialog-title fs_32 color_TB">
						<slot name="title">{{ title }}</slot>
					</div>
					<img class="close" :src="closeIcon" @click="close" alt="Close" />
				</div>
				<div class="dialog-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import closeIcon from "./close.png";
/**
 * @description 弹窗
 * @param visible 显示隐藏
 * @param title 标题
 * @param width 弹窗宽度
 */
const props = defineProps({
	visible: { type: Boolean, default: false },
	width: {
		type: String,
		default: "90%",
		validator: (value) => {
			// 校验宽度是否有效
			return typeof value === "string" && !value.includes(" ") && value !== "";
		},
	},
	title: { type: String, default: "123" },
});

const emits = defineEmits(["close"]);

// 使用一个ref来存储计算后的maxHeight，避免每次渲染都重新计算
const maxHeightRef = ref(window.innerHeight * 0.8);

// 监听窗口大小改变来更新maxHeight
window.addEventListener("resize", () => {
	maxHeightRef.value = window.innerHeight * 0.8;
});

const close = () => {
	emits("close");
};
</script>

<style scoped lang="scss">
.dialog-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	background: #00000085;
	transition: opacity 0.5s;
}

.close {
	width: 48px;
	height: 48px;
}

.dialog-content {
	padding: 23px;
}

.dialog-container {
	border-radius: 16px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
}

.dialog-header {
	display: flex;
	padding: 0 40px;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	height: 82px;
	@include themeify {
		border-bottom: 1px solid themed("Line");
	}
}
@keyframes fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fade-out {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

.dialog-overlay.fade-in {
	animation: fade-in 0.5s ease-in-out forwards;
}

.dialog-overlay.fade-out {
	animation: fade-out 0.5s ease-in-out forwards;
}
</style>
