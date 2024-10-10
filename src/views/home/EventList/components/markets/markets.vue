<template>
	<div class="content">
		<capot :market="markets?.[5]" :sportType="sportType" :listKye="sportsBetEvent.getEventInfo[props.event.eventId]?.listKye" @onSetSportsEventData="onSetSportsEventData" />
		<concede :market="markets?.[1]" :sportType="sportType" :listKye="sportsBetEvent.getEventInfo[props.event.eventId]?.listKye" @onSetSportsEventData="onSetSportsEventData" />
		<FFSize :market="markets?.[3]" :sportType="sportType" :listKye="sportsBetEvent.getEventInfo[props.event.eventId]?.listKye" @onSetSportsEventData="onSetSportsEventData" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 独赢
import capot from "./capot.vue";
// 让球、让分
import concede from "./concede.vue";
// 全场大小
import FFSize from "./FFSize.vue";

import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
const sportsBetEvent = useSportsBetEventStore();

const props = defineProps({
	event: {
		type: Object,
		required: true,
	},
	markets: {
		type: Object,
		required: true,
	},
	sportType: {
		type: Number,
		required: true,
	},
});

console.log("markets", props.markets);

/**
 * @description 判断当前盘口是否存在pinia中
 */
const isBright = (market, selection) => {
	return sportsBetEvent.getEventInfo[props.event.eventId]?.listKye == `${market.marketId}-${selection.key}`;
};

const onSetSportsEventData = (market, selection) => {
	const { event } = props;
	//存储盘口唯一标识
	if (isBright(market, selection)) {
		// 删除Pinia数据
		sportsBetEvent.removeEventCart(event);
	} else {
		sportsBetEvent.storeEventInfo(event.eventId, {
			marketId: market.marketId,
			betType: market.betType,
			selectionKey: selection.key,
		});
		// 存储Pinia数据
		sportsBetEvent.addEventToCart(JSON.parse(JSON.stringify(event)));
	}
};

onMounted(() => {
	console.log("Component mounted");
});
</script>

<style scoped lang="scss">
.content {
}
</style>
