<template>
	<div class="list-content">
		<VirtualScrollVirtualList ref="VirtualScrollVirtualListRef" v-if="listData.length" :list-data="listData" :item-max-size="170" :item-min-size="20" :is-expand="true">
			<template #default="{ item, index, isExpand }">
				<Card :data="item" :isExpand="isExpand" :dataIndex="index" :sportType="props.sportType" @toggleDisplay="toggleDisplay" />
			</template>
		</VirtualScrollVirtualList>
		<NoData v-else />
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { VirtualScrollVirtualList, Card } from "./components/index";

import NoData from "/@/views/venueHome/sports/components/noData/noData.vue";

const props = defineProps({
	listData: {
		type: Array,
		default: () => [],
	},
	sportType: {
		type: String,
		default: () => "",
	},
});

const VirtualScrollVirtualListRef = ref();

const toggleDisplay = (val?: number) => {
	VirtualScrollVirtualListRef.value.setlistDataEisExpand(val);
};
</script>

<style scoped lang="scss">
@import "/@/views/venueHome/sports/common.scss";
.list-content {
	height: calc(100vh - 595px);
}
</style>
