<template>
	<div class="list-content">
		<VirtualScrollVirtualList
			:disabledScroll="true"
			ref="VirtualScrollVirtualListRef"
			v-if="listData && listData.length"
			:list-data="listData"
			childrenKey="teams"
			bottomClass="card-item"
			childrenDivClass="flex_space_between"
			:item-max-size="66"
			:item-min-size="66"
			:is-expand="true"
		>
			<template #default="{ item, index, isExpand }">
				<OutRightItem :data="item" :isExpand="isExpand" :dataIndex="index" :sportType="String(item.sportType)" @toggleDisplay="toggleDisplay" />
			</template>
		</VirtualScrollVirtualList>
		<NoData v-else />
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import viewSportPubSubEventData from "/@/views/venueHome/sports/hooks/viewSportPubSubEventData";
import VirtualScrollVirtualList from "/@/views/venueHome/sports/components/virtualScrollVirtualList/virtualScrollVirtualList.vue";
// import OutRightItem from "./components/outRightItem.vue";
import NoData from "/@/views/venueHome/sports/components/noData/noData.vue";
// import { defineAsyncComponent } from "vue";
// const NoData = defineAsyncComponent(() => import("/@/views/venueHome/sports/components/noData/noData.vue"));
const OutRightItem = defineAsyncComponent(() => import("/@/views/venueHome/sports/views/champion/components/outRightItem.vue"));
const route = useRoute();
const VirtualScrollVirtualListRef = ref();

const toggleDisplay = (val?: number) => {
	VirtualScrollVirtualListRef.value.setlistDataEisExpand(val);
};

const listData = computed(() => {
	return viewSportPubSubEventData.viewSportData.childrenViewData[Number(route.params.sportType)];
});

watch(
	() => route.params.sportType,
	() => {
		VirtualScrollVirtualListRef.value?.setScollTop(0);
	}
);
</script>

<style lang="scss" scoped>
.flex_space_between {
	display: flex;
	justify-content: space-between;
}
.time {
	text-align: center;
	height: 60px;
	line-height: 60px;
}
.list-content {
	height: calc(100vh - 97px);
	.container {
		padding: 0px 24px;
	}
	.card-item {
		margin-bottom: 24px;
		border-radius: 16px;
		overflow: hidden;
		@include themeify {
			background-color: themed("BG3");
		}
	}
	.tournament-header {
		height: 56px;
		display: flex;
		align-items: center;
		padding: 8px 12px;
		border-radius: 16px 16px 0px 0px;
		@include themeify {
			background: themed("--JBS-CARD");
			box-shadow: 0px 1px 4px 0px themed("--JBS-CARD--shadow");
		}
		box-sizing: border-box;
		p {
			text-align: center;
			line-height: 34px;
		}
		.tournament-info {
			flex: 1;
			display: flex;
			align-items: center;
			margin-right: 18px;

			.tournament-name {
				width: 526px;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				line-height: 34px;
				white-space: nowrap; /* 禁止换行 */
				overflow: hidden; /* 隐藏超出部分 */
				text-overflow: ellipsis; /* 显示省略号 */
			}
		}
	}
}
</style>
