<template>
	<div v-if="[0, 1, 4].includes(sportsBetEvent.bettingStatus)">
		<div class="bet_slip_cell" v-for="(item, index) in sportsBetInfo.parlayTicketsInfo.combos" :key="index">
			<div class="bet_slip_cell_item">
				<div class="bet_slip_cell_left">
					<span class="value">{{ item.comboTypeName }}</span>
					<span class="value ml_12">@{{ common.getInstance().formatFloat(item.payoutRate) }}</span>
				</div>
				<div class="bet_slip_cell_input" :class="{ input_active: inputActive == item.comboType }" @click="focusInput(item)">
					<div class="input">
						<span v-if="betValueState[item.comboType]">{{ betValueState[item.comboType] }}</span>
						<span v-else class="placeholder">{{ `限额 ${common.getInstance().formatFloat(item.minBet)} ~ ${common.getInstance().formatFloat(item.maxBet)}` }}</span>
					</div>
				</div>
			</div>
			<div v-if="betValueState[item.comboType]" class="subtotal">小计：{{ common.getInstance().mul(betValueState[item.comboType], item.betCount) }} USD</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import shopCartPubSub from "/@/views/venueHome/sports/hooks/shopCartPubSub";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
const sportsBetEvent = useSportsBetEventStore();
const sportsBetInfo = useSportsBetInfoStore();

const inputActive = computed(() => shopCartPubSub.getParlayTicketsActive());
const betValueState = computed(() => shopCartPubSub.betValueState);

// 输入框获取焦点
const focusInput = (item) => {
	shopCartPubSub.setParlayTicketsKey(item);
	shopCartPubSub.setParlayTicketsBetNumberShow();
};
</script>

<style scoped lang="scss">
.bet_slip_cell {
	margin-top: 10px;
	padding: 10px 15px 10px 40px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
	.bet_slip_cell_item {
		display: flex;
	}
	.bet_slip_cell_left {
		flex: 1;
		display: flex;
		align-items: center;
		.value {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 500;
		}
	}
	.bet_slip_cell_input {
		width: 300px;
		display: flex;
		align-items: center;
		padding: 15px 10px;
		border-radius: 8px;
		border: 1px solid transparent;
		@include themeify {
			background-color: themed("BG2");
		}
		box-sizing: border-box;
	}

	.input_active {
		border: 1px solid;
		@include themeify {
			border-color: themed("Theme");
		}
	}
	.subtotal {
		margin-top: 10px;
		@include themeify {
			color: themed("T1");
		}
		text-align: right;
		font-family: "PingFang SC";
		font-size: 22px;
		font-weight: 400;
	}
}
.input {
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
	.placeholder {
		display: flex;
		align-items: center;
		@include themeify {
			color: themed("T2-P");
		}
		font-family: "PingFang SC";
		font-size: 22px;
		font-weight: 400;
	}
}
</style>
