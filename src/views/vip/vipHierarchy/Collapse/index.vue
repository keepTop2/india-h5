<template>
	<div class="accordion">
		<div class="accordion-item">
			<div class="accordion-header" @click="toggle">
				<!-- <h3>{{ title }}</h3>
				<span class="toggle-icon">{{ isOpen ? "-" : "+" }}</span> -->

				<slot name="header"></slot>
			</div>
			<!-- 使用 v-show 并保留 transition 控制展开和折叠 -->
			<transition name="accordion" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
				<div v-show="isOpen" class="accordion-body" ref="bodyRef">
					<slot name="content"></slot>
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: false,
	},
	isOpen: {
		type: Boolean,
		default: false,
	},
});

const isOpen = ref(props.isOpen);
const bodyRef = ref(null);

const toggle = () => {
	isOpen.value = !isOpen.value;
};

const beforeEnter = (el) => {
	el.style.maxHeight = "0";
	el.style.opacity = "0";
};

const enter = (el) => {
	nextTick(() => {
		el.style.maxHeight = `${el.scrollHeight}px`;
		el.style.opacity = "1";
	});
};

const beforeLeave = (el) => {
	el.style.maxHeight = `${el.scrollHeight}px`;
	el.style.opacity = "1";
};

const leave = (el) => {
	el.style.maxHeight = "0";
	el.style.opacity = "0";
};

onMounted(() => {
	if (isOpen.value && bodyRef.value) {
		bodyRef.value.style.maxHeight = `${bodyRef.value.scrollHeight}px`;
	}
});

watch(
	() => props.isOpen,
	(newValue) => {
		isOpen.value = newValue;
	}
);
</script>

<style scoped lang="scss">
.accordion {
	.accordion-item {
		overflow: hidden;

		.accordion-header {
			cursor: pointer;
		}

		.accordion-body {
			overflow: hidden;
			transition: max-height 0.2s, opacity 0.2s ease;
		}
	}
}
</style>
