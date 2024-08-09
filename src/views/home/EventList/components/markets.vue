<template>
	<div class="content">
		<capot @animationEnd="animationEnd" :market="markets?.[5]" />
		<concede @animationEnd="animationEnd" :market="markets?.[1]" />
		<FFSize @animationEnd="animationEnd" :market="markets?.[3]" />
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
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import { WebToPushApi } from "/@/views/venueHome/sports/enum/sportEventSourceEnum";
const { clearSportsOddsChange } = useSportPubSubEvents();

const props = defineProps({
	markets: {
		type: Object,
		required: true,
	},
});

onMounted(() => {
	console.log("Component mounted");
});

/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (data) => {
	const { marketId, selection } = data;
	if (selection?.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		clearSportsOddsChange({ webToPushApi: WebToPushApi.sportsEventDetail, marketId, selection });
		//删除 childrenViewData中的状态
		selection.oddsChange = "";
	}
};
</script>

<style scoped lang="scss">
.content {
}
</style>
