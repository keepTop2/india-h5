<template>
	<van-tabs v-model:active="value" @click-tab="clickTab" @change="change" @rendered="rendered" @scroll="scroll" :swipe-threshold="swipeThreshold">
		<slot name="van-tab">
			<slot name="title"></slot>
		</slot>
	</van-tabs>
</template>

<script setup lang="ts">
const emit = defineEmits(["clickTab", "change", "rendered", "scroll", "update:modelValue"]);
const props = defineProps({
	modelValue: {
		type: null,
		required: true,
	},
	swipeThreshold: {
		type: Number,
		default: 5,
	},
});

//   const state = reactive({});

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});

/**
 * 点击标签时触发
 */
const clickTab = () => {
	emit("clickTab");
};
/**
 * 当前激活的标签改变时触发
 */
const change = () => {
	emit("change");
};
/**
 * 标签内容首次渲染时触发（仅在开启延迟渲染后触发）
 */
const rendered = () => {
	emit("rendered");
};
/**
 * 滚动时触发，仅在 sticky 模式下生效
 */
const scroll = () => {
	emit("scroll");
};
</script>

<style scoped lang="scss">
:deep(.van-tabs--line .van-tabs__wrap) {
	height: 100px;
}

// :deep(.van-tab) {
//   color: #96a2d7;
//   font-size: 30px;
//   font-weight: 500;
// }

// :deep(.van-tab--active) {
//   color: #2b44b1;
// }

:deep(.van-tabs__nav--line) {
	padding-bottom: 0px;
}

:deep(.van-tabs__line) {
	width: 70px;
	height: 4px;
	bottom: 19px;
}
</style>
