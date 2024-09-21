<template>
	<div class="header">
		<div class="header-left">
			<div class="header-badge">{{ headerLabel() }}</div>
		</div>
		<div class="header-right">
			<div class="amount-info" @click="getBalance">
				<span class="value">{{ Common.getInstance().formatAmount(sportsBetInfo.balance) }}</span>
				<SvgIcon class="color_Theme" iconName="venueHome/sports/svg/sports_refresh" />
			</div>
			<div class="close">
				<SvgIcon iconName="venueHome/sports/svg/close" @click="closePopup" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Common from "/@/utils/common";
import { getIndexInfo } from "/@/views/venueHome/sports/utils/commonFn";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
import { i18n } from "/@/i18n/index";
const $: any = i18n.global;
const sportsBetEvent = useSportsBetEventStore();
const sportsBetInfo = useSportsBetInfoStore();
const sportsBetChampion = useSportsBetChampionStore();

const props = withDefaults(
	defineProps<{
		isShowBet: boolean;
	}>(),
	{
		isShowBet: true,
	}
);

const headerLabel = () => {
	if (props.isShowBet) {
		if (sportsBetEvent.sportsBetEventData.length == 1) {
			return $.t(`sports["单"]`);
		}
		if (sportsBetEvent.sportsBetEventData.length > 1) {
			return $.t(`sports["串"]`);
		}
	} else {
		return $.t(`sports["单"]`);
	}
};

const getBalance = () => {
	getIndexInfo();
};

const closePopup = () => {
	if (props.isShowBet) {
		sportsBetEvent.closeShopCart();
	} else {
		sportsBetChampion.closeChampionShopCart();
	}
};
</script>

<style scoped lang="scss">
.header {
	width: 100%;
	height: 82px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 24px;
	border-radius: 16px 16px 0px 0px;
	@include themeify {
		background-color: themed("BG1");
		border-color: themed("Line");
	}
	border-bottom: 2px solid;
	box-sizing: border-box;
	.header-left {
		display: flex;
		align-items: center;
		.header-badge {
			min-width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0px 10px;
			border-radius: 20px;
			@include themeify {
				background-color: themed("Theme");
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 26px;
			font-weight: 400;
		}
	}
	.header-right {
		display: flex;
		gap: 30px;
		align-items: center;
		.amount-info {
			display: flex;
			align-items: center;
			gap: 10px;
			border-radius: 30px;
			padding: 12px 18px;
			@include themeify {
				background-color: themed("BG3");
			}
			.value {
				@include themeify {
					color: themed("TB");
				}
				font-family: "DIN Alternate";
				font-size: 24px;
				font-weight: 700;
			}
			.color_Theme {
				width: 22px;
				height: 22px;
			}
		}
		.close {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			svg {
				width: 26px;
				height: 26px;
			}
		}
	}
}
</style>
