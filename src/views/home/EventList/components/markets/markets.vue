<template>
	<div class="content">
		<capot :market="markets?.[5]" @onSetSportsEventData="onSetSportsEventData" />
		<concede :market="markets?.[1]" @onSetSportsEventData="onSetSportsEventData" />
		<FFSize :market="markets?.[3]" @onSetSportsEventData="onSetSportsEventData" />
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
});

/**
 * @description 判断当前盘口是否存在pinia中
 */
const isBright = (selection) => {
	return sportsBetEvent.getEventInfo[props.event.eventId]?.listKye == `${props.markets.marketId}-${selection.key}`;
};

const onSetSportsEventData = (selection) => {
	const { markets, event } = props;
	//存储盘口唯一标识
	if (isBright(selection)) {
		// 删除Pinia数据
		sportsBetEvent.removeEventCart(event);
	} else {
		sportsBetEvent.storeEventInfo(event.eventId, {
			marketId: markets.marketId,
			betType: markets.betType,
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
