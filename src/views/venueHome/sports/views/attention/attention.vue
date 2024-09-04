<!--
 * @Author: Hida
 * @Date: 2024-05-18 10:54:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-15 18:29:08
 * @Description: 
 * 
-->
<template>
	<div class="list-content">
		<VirtualScrollVirtualList
			:disabledScroll="true"
			ref="VirtualScrollVirtualListRef"
			:childrenKey="(attentionSwitch == 'outright' && 'teams') || 'events'"
			v-if="listData.length"
			:list-data="listData"
			:item-max-size="170"
			:item-min-size="20"
			:is-expand="true"
		>
			<template #default="{ item, index, isExpand }">
				<EventCard v-if="attentionSwitch == 'event'" :data="item" :isExpand="isExpand" :dataIndex="index" @toggleDisplay="toggleDisplay" />
				<OutRightCard v-else :data="item" :isExpand="isExpand" :dataIndex="index" @toggleDisplay="toggleDisplay" />
			</template>
		</VirtualScrollVirtualList>

		<NoData v-else />
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
// import EventCard from "./components/event/eventCard.vue";
// import OutRightCard from "./components/outRight/outRightItem.vue";
import viewSportPubSubEventData from "/@/views/venueHome/sports/hooks/viewSportPubSubEventData";
import VirtualScrollVirtualList from "/@/views/venueHome/sports/components/virtualScrollVirtualList/virtualScrollVirtualList.vue";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import NoData from "/@/views/venueHome/sports/components/noData/noData.vue";
import sportApi from "/@/api/venueHome/sports";

import { defineAsyncComponent } from "vue";
import sportsApi from "/@/api/venueHome/sports";
const EventCard = defineAsyncComponent(() => import("/@/views/venueHome/sports/views/attention/components/event/eventCard.vue"));
const OutRightCard = defineAsyncComponent(() => import("/@/views/venueHome/sports/views/attention/components/outRight/outRightItem.vue"));

const attentionSwitch = computed(() => sportsBetEvent.attentionType);
const sportsBetEvent = useSportsBetEventStore();

const listData = computed(() => {
	return viewSportPubSubEventData.getEvents();
});

const VirtualScrollVirtualListRef = ref();

/**
 * @description 获取关注列表
 */

const getAttention = () => {
	return new Promise((resolve, reject) => {
		sportApi.getAttentionList().then((res) => {
			if (res.data) {
				sportsBetEvent.setAttentionList(res.data);
				resolve(res.data);
			} else {
				reject(res);
			}
		});
	});
};

const diffIds = async (type: string) => {
	const isOutright = type === "outright";
	const idKey = !isOutright ? "eventId" : "leagueId";
	const attentionIdsKey = !isOutright ? "getAttentionEventIdList" : "getAttentionLeagueIdList";

	// 直接计算并赋值，避免使用不必要的函数表达式
	let ids: number[];
	if (isOutright) {
		ids = listData.value.map((item) => item[idKey]);
	} else {
		// 明确地说明这是对每个item.events的映射，提高代码可读性
		ids = listData.value.flatMap((item: { events: { eventId: number }[] }) => item.events.map((event) => event.eventId));
	}

	const idsSet = new Set<number>(ids);
	const diffLeagueId = sportsBetEvent[attentionIdsKey].filter((item) => !idsSet.has(item));
	if (diffLeagueId.length > 0) {
		try {
			await sportsApi.unFollow({
				thirdId: diffLeagueId,
			});
			getAttention();
		} catch (error) {
			console.log(error);
		}
	}
};

watch(
	() => listData.value,
	(newVal) => {
		if (newVal.length > 0) {
			diffIds(attentionSwitch.value);
		}
	}
);

const toggleDisplay = (val?: number) => {
	VirtualScrollVirtualListRef.value.setlistDataEisExpand(val);
};
</script>

<style scoped lang="scss">
@import "../../common.scss";
.list-content {
	height: calc(100vh - 495px);
}
</style>
