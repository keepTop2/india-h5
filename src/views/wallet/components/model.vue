<template>
	<transition name="fade">
		<div v-if="isVisible" class="modal-mask" @click="closeModal">
			<div class="modal-container" @click.stop>
				<header class="modal-header">
					<slot name="header"> </slot>
				</header>
				<section class="modal-body">
					<slot> </slot>
				</section>
				<footer class="modal-footer">
					<slot name="footer"> </slot>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
	modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
	emit("update:modelValue", false);
};

// 监听 props 变化来控制弹窗显示
const isVisible = computed(() => props.modelValue);
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
	width: 540px;
	@include themeify {
		background-color: themed("BG1");
	}
	border-radius: 10px;
	// box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header,
.modal-body,
.modal-footer {
	// margin-bottom: 10px;
}

.modal-footer {
	text-align: right;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
