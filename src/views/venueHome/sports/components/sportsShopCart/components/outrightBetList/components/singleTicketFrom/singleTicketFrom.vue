<template>
	<div class="bet_slip_cell_one">
		<div class="bet_slip_cell_input_one" @click="onBetNumber">
			<input
				v-model="stake"
				type="text"
				:placeholder="`${$t(`sports['[限额]']`)}${common.getInstance().formatFloat(sportsBetInfo.championSingleTicketInfo.minBet)} ~ ${common
					.getInstance()
					.formatFloat(sportsBetInfo.championSingleTicketInfo.maxBet)}`"
				readonly
			/>
			<div class="unit">USD</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import shopCartChampionPubSub from "/@/views/venueHome/sports/hooks/shopCartChampionPubSub";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import common from "/@/utils/common";
const sportsBetInfo = useSportsBetInfoStore();
const stake = computed(() => shopCartChampionPubSub.getSingleTicketBetValue());

const onBetNumber = () => {
	shopCartChampionPubSub.setBetNumberShow();
};
</script>

<style scoped lang="scss">
.bet_slip_cell_one {
	display: flex;
	margin-top: 10px;
	padding: 10px 15px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
	.bet_slip_cell_input_one {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15px 10px;
		border-radius: 8px;
		border: 1px solid;
		@include themeify {
			border-color: themed("Theme");
			background-color: themed("BG2");
		}
		box-sizing: border-box;

		.unit {
			@include themeify {
				color: themed("T1");
			}
			text-align: right;
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
	}
}
input {
	width: 100%;
	height: 30px;
	@include themeify {
		background-color: themed("BG2");
		color: themed("Theme");
	}
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 500;
	border: 0;
	padding: 0;
	margin: 0;
	&::placeholder {
		@include themeify {
			color: themed("T2-P");
		}
		font-family: "PingFang SC";
		font-size: 22px;
		font-weight: 400;
	}
}
</style>
