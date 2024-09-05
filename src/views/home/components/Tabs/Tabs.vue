<template>
	<div :class="`tabs ${bg}`">
		<div v-for="(item, index) in list" :key="index" class="tab-item" :class="{ active: item.value === modelValue }" @click="handleClick(item)">
			{{ item.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
// 定义ListItem类型
type ListItem = {
	name: string;
	value: string | number;
};

/**
 * @description 定义组件的props
 * @param modelValue 当前选中的tab的值
 * @param list tab列表
 * @param bg 背景颜色类名
 */
const props = defineProps({
	modelValue: {
		type: [String, Number],
		required: true,
	},
	list: {
		type: Array<ListItem>,
		default: () => [],
	},
	bg: {
		type: String,
		default: "",
	},
});

/**
 * @description 定义组件的emit事件
 */
const emit = defineEmits(["update:modelValue", "change"]);

/**
 * @description 处理tab点击事件
 * @param item 被点击的tab项
 */
const handleClick = (item) => {
	emit("update:modelValue", item.value);
	emit("change", item);
};
</script>

<style lang="scss" scoped>
.tabs {
	border-radius: 8px;
	> div {
		height: 68px;
		line-height: 68px;
	}
	@include themeify {
		display: flex;
		margin: 0;
		margin-bottom: 25px;
		.tab-item {
			flex-grow: 1;
			text-align: center;
			// padding: 19px;
			font-size: 26px;
			border-radius: 6px;
			cursor: pointer;
			color: themed("TB");
			&.active,
			&:hover {
				color: themed("TB");
				background-color: themed("Tag1");
			}
		}
	}
}
</style>
