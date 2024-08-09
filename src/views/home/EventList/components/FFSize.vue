<template>
	<div class="price_title">全场大小</div>
	<div class="handicap">
		<div class="handicap-item">
			<span>{{ market?.selections[0].keyName }}{{ SportsCommon.formatPoint({ betType: market?.betType, point: market?.selections[0].point, key: market?.selections[0].point?.key }) }}</span>
			<span class="value" :class="[commonFunc.changeClass(market?.selections[0])]">{{ market?.selections[0].oddsPrice.decimalPrice }}</span>
			<RiseOrFall v-if="market?.selections[0]?.oddsChange" :time="3000" :status="market?.selections[0]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[0])" />
		</div>
		<div class="handicap-item">
			<span>{{ market?.selections[1].keyName }}{{ SportsCommon.formatPoint({ betType: market?.betType, point: market?.selections[1].point, key: market?.selections[1].point?.key }) }}</span>
			<span class="value" :class="[commonFunc.changeClass(market?.selections[1])]">{{ market?.selections[1].oddsPrice.decimalPrice }}</span>
			<RiseOrFall v-if="market?.selections[1]?.oddsChange" :time="3000" :status="market?.selections[1]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[1])" />
		</div>
		<!-- <div class="handicap-item lock-container">
				<SvgIcon class="lock" iconName="home/event_lock" />
			</div> -->
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SportsCommon from "/@/views/venueHome/sports/utils/common";
import RiseOrFall from "/@/views/venueHome/sports/components/riseOrFall/riseOrFall.vue";
import common from "/@/utils/common";

const commonFunc = common.getInstance();
const emit = defineEmits(["animationEnd"]);
const props = defineProps({
	market: {
		type: Object,
		required: true,
	},
});
onMounted(() => {
	console.log("Component mounted");
});

const animationEnd = (selections) =>
	emit("animationEnd", {
		marketId: props.market.marketId,
		selections,
	});
</script>

<style scoped lang="scss">
@import "./market.scss";

.content {
}
</style>
