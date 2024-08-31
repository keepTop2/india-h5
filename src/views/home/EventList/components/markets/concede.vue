<template>
	<div class="price_title" v-if="sportType == 1">{{ $t(`sports["全场让球"]`) }}</div>
	<div class="price_title" v-else>{{ $t(`sports["让分"]`) }}</div>
	<div class="handicap">
		<div class="handicap-item" v-if="market?.selections[0]">
			<div
				v-if="market.marketStatus === 'running'"
				class="item"
				:class="{ isBright: listKye == `${market?.marketId}-${market?.selections[0].key}` }"
				@click="onSetSportsEventData(market?.selections[0])"
			>
				<span>{{ SportsCommon.formatPoint({ betType: market?.betType, point: market?.selections[0].point, key: market?.selections[0].point?.key }) }}</span>
				<span class="value" :class="[commonFunc.changeClass(market?.selections[0])]"
					>{{ market?.selections[0].oddsPrice.decimalPrice }}
					<RiseOrFall v-if="market?.selections[0]?.oddsChange" :time="3000" :status="market?.selections[0]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[0])" />
				</span>
			</div>
			<div v-else class="lock">
				<SvgIcon iconName="/venueHome/sports/svg/sport_lock" size="4.6" />
			</div>
		</div>
		<div v-else class="handicap-item">
			<i class="noData"></i>
		</div>

		<div class="handicap-item" v-if="market?.selections[1]">
			<div
				v-if="market.marketStatus === 'running'"
				class="item"
				:class="{ isBright: listKye == `${market?.marketId}-${market?.selections[1].key}` }"
				@click="onSetSportsEventData(market?.selections[1])"
			>
				<span>{{ SportsCommon.formatPoint({ betType: market?.betType, point: market?.selections[1].point, key: market?.selections[1].point?.key }) }}</span>
				<span class="value" :class="[commonFunc.changeClass(market?.selections[1])]"
					>{{ market?.selections[1].oddsPrice.decimalPrice }}
					<RiseOrFall v-if="market?.selections[1]?.oddsChange" :time="3000" :status="market?.selections[1]?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(market?.selections[1])" />
				</span>
			</div>
			<div v-else class="lock">
				<SvgIcon iconName="/venueHome/sports/svg/sport_lock" size="4.6" />
			</div>
		</div>
		<div v-else class="handicap-item">
			<i class="noData"></i>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import common from "/@/utils/common";
import SportsCommon from "/@/views/venueHome/sports/utils/common";
import RiseOrFall from "/@/views/venueHome/sports/components/riseOrFall/riseOrFall.vue";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import { WebToPushApi } from "/@/views/venueHome/sports/enum/sportEventSourceEnum";
const { clearSportsOddsChange } = useSportPubSubEvents();

const commonFunc = common.getInstance();
const emit = defineEmits(["onSetSportsEventData"]);
const props = defineProps({
	listKye: {
		type: String,
		required: true,
	},
	market: {
		type: Object,
		required: true,
	},
	sportType: {
		type: Number,
		required: true,
	},
});
onMounted(() => {});

const onSetSportsEventData = (selection) => {
	emit("onSetSportsEventData", props.market, selection);
};

/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (selection) => {
	console.log(selection, "========dataaaaaa");
	if (selection?.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		clearSportsOddsChange({ webToPushApi: WebToPushApi.sportsEventDetail, marketId: props.market.marketId, selection });
		//删除 childrenViewData中的状态
		selection.oddsChange = "";
	}
};
</script>

<style scoped lang="scss">
@import "./market.scss";

.content {
}
</style>
