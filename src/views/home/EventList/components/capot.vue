<template>
	<div class="price_title">全场独赢</div>
	<div class="odds">
		<div class="odds-item">
			<span>主胜</span>
			<span class="value" :class="[commonFunc.changeClass(market?.selections[0])]">
				{{ market?.selections[0].oddsPrice.decimalPrice }}
				<RiseOrFall v-if="market?.selections[0]?.oddsChange" :time="3000" :status="market?.selections[0]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[0])" />
			</span>
		</div>
		<div class="odds-item">
			<span>平局</span>
			<span class="value" :class="[commonFunc.changeClass(market?.selections[1])]"
				>{{ market?.selections[1].oddsPrice.decimalPrice }}
				<RiseOrFall v-if="market?.selections[1]?.oddsChange" :time="3000" :status="market?.selections[1]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[1])" />
			</span>
		</div>
		<div class="odds-item">
			<span>客胜</span>
			<span class="value" :class="[commonFunc.changeClass(market?.selections[2])]"
				>{{ market?.selections[2].oddsPrice.decimalPrice }}
				<RiseOrFall v-if="market?.selections[2]?.oddsChange" :time="3000" :status="market?.selections[2]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[2])" />
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import common from "/@/utils/common";
import RiseOrFall from "/@/views/venueHome/sports/components/riseOrFall/riseOrFall.vue";

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
