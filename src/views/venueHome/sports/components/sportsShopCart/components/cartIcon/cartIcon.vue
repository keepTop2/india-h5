<template>
	<div v-if="eventsValue > 0" class="shopping-cart-icon" @click="showPopup">
		<div class="badge">{{ eventsValue }}</div>
		<SvgIcon iconName="/venueHome/sports/svg/sport_checklist" size="6.15384" />
	</div>
</template>

<script setup lang="ts">
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
const sportsBetEvent = useSportsBetEventStore();
const sportsBetChampion = useSportsBetChampionStore();

const props = withDefaults(
	defineProps<{
		isShowBet: boolean;
	}>(),
	{
		isShowBet: true,
	}
);

// 判断是哪个购物车数量
const eventsValue = computed(() => {
	if (props.isShowBet) {
		return sportsBetEvent.sportsBetEventData.length;
	} else {
		return sportsBetChampion.championBetData.length;
	}
});

const showPopup = () => {
	if (props.isShowBet) {
		sportsBetEvent.openShopCart();
	} else {
		sportsBetChampion.openChampionShopCart();
	}
};
</script>

<style scoped lang="scss">
.shopping-cart-icon {
	position: fixed;
	bottom: 152px;
	right: 24px;
	width: 100px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	z-index: 10;
	@include themeify {
		background-color: themed("Theme-P");
	}

	.badge {
		position: absolute;
		top: 0;
		right: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16px;
		@include themeify {
			background-color: themed("TB-P");
			color: themed("Theme-P");
		}
		font-family: "DIN Alternate";
		font-size: 24px;
		font-weight: 700;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
}
</style>
