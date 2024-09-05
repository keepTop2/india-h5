<template>
	<div class="list-content">
		<virtualScrollVirtualList :disabledScroll="true" ref="VirtualScrollVirtualListRef" v-if="listData.length" :list-data="listData" :item-max-size="170" :item-min-size="20" :is-expand="true">
			<template #default="{ item, index, isExpand }">
				<Card :data="item" :isExpand="isExpand" :dataIndex="index" :sportType="props.sportType" @toggleDisplay="toggleDisplay" />
			</template>
		</virtualScrollVirtualList>

		<NoData v-else />
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { VirtualScrollVirtualList, Card } from "./components/index";

import NoData from "/@/views/venueHome/sports/components/noData/noData.vue";

/**
 * @description 组件属性定义
 */
const props = defineProps({
	/**
	 * @description 列表数据
	 * @param {Array} listData
	 */
	listData: {
		type: Array,
		default: () => [],
	},
	/**
	 * @description 体育类型
	 * @param {String} sportType
	 */
	sportType: {
		type: String,
		default: () => "",
	},
});

// 虚拟滚动列表引用
const VirtualScrollVirtualListRef = ref();

/**
 * @description 切换显示状态
 * @param {number} val - 切换的索引值
 */
const toggleDisplay = (val?: number) => {
	VirtualScrollVirtualListRef.value.setlistDataEisExpand(val);
};
</script>

<style scoped lang="scss">
.list-content {
	height: 100%;
	@include themeify {
		background-color: themed("BG1");
	}
}
</style>
