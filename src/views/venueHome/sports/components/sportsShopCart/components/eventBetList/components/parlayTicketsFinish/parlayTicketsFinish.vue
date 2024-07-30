<template>
	<div class="content">
		<div class="content_list">
			<div class="bet_slip_item" v-for="(item, index) in sportsBetEvent.sportsBetEventData" :key="index">
				<div class="bet_slip_info">
					<div class="bet_slip_label">
						<div>
							<span>{{ getName(item) }}</span
							>&nbsp;<span v-if="item.betMarketInfo.point != undefined" class="ml_8">{{
								SportsCommonFn.formatPoint({
									betType: item.betMarketInfo?.betType,
									point: item.betMarketInfo?.point,
									key: item.betMarketInfo?.key,
								})
							}}</span>
						</div>

						<div style="position: relative">
							<span>@{{ item.betMarketInfo?.decimalPrice }}</span>
						</div>
					</div>
					<div class="bet_slip_type mt_2">
						<div>
							<span v-if="item.isLive" class="theme mr_8">[滚球]</span>
							<span class="mr_8">{{ item.betMarketInfo.betTypeName }}</span>
							<span>[欧洲盘]</span>
						</div>
					</div>
					<div class="bet_slip_name">
						<span>{{ item.teamInfo.homeName }}</span> v <span>{{ item.teamInfo.awayName }}</span>
						<span class="ml_8">[{{ item.gameInfo?.liveHomeScore }} - {{ item.gameInfo?.liveAwayScore }}]</span>
					</div>
					<div class="bet_slip_name mt_10">
						<span>{{ item.leagueName }}</span>
					</div>
				</div>
			</div>

			<div class="bet-details" v-for="(item, index) in props.data.currentCombos" :key="index">
				<div class="bet-cell">
					<span class="label">{{ SportsCommonFn.comboTypeNameMaps[item.comboType] }}</span>
					<div>
						<span class="label">{{ common.getInstance().formatFloat(item.stake) }}</span>
						<span class="text">x{{ item.betCount }}</span>
					</div>
				</div>
				<div class="bet-cell">
					<span class="value">预计可赢：{{ getParlayTicketsWinningAmount(item) }} USD</span>
					<span class="text">小计：{{ common.getInstance().formatFloat(common.getInstance().mul(item.stake, item.betCount)) }} USD</span>
				</div>
			</div>

			<div class="footer-button">
				<div class="button" @click="clearCart">
					<span>确认</span><span v-if="props.data.betStatus === 0">合计：{{ singleTicketWinningAmount }}</span>
				</div>
				<div class="button2" @click="onSecondBet">保留选项，继续投注</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import SportsCommonFn from "/@/views/venueHome/sports/utils/common";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
const sportsBetEvent = useSportsBetEventStore();
const props = withDefaults(
	defineProps<{
		data: any;
	}>(),
	{
		data: {},
	}
);

const emit = defineEmits(["close", "onSecondBet"]);

// 计算预计可赢
const getParlayTicketsWinningAmount = (item: any) => {
	const amount = common.getInstance().mul(item.comboPrice, item.stake);
	const stake = common.getInstance().mul(item.betCount, item.stake);
	const value = isNaN(stake) ? 0 : common.getInstance().sub(amount, stake);
	return common.getInstance().formatFloat(value);
};

// 计算小计得出总计
const singleTicketWinningAmount = computed(() => {
	const totalValue = props.data?.currentCombos.reduce((total, obj) => {
		const stake = common.getInstance().mul(obj.betCount, parseFloat(obj.stake));
		return total + stake;
	}, 0);
	return common.getInstance().formatFloat(totalValue);
});

// 判断名称
const getName = (item) => {
	if ((item.betMarketInfo.betType == 5 || item.betMarketInfo.betType == 15) && item.betMarketInfo.key == "1") {
		return item.teamInfo.homeName;
	} else if ((item.betMarketInfo.betType == 5 || item.betMarketInfo.betType == 15) && item.betMarketInfo.key == "2") {
		return item.teamInfo.awayName;
	} else if ((item.betMarketInfo.betType == 5 || item.betMarketInfo.betType == 15) && item.betMarketInfo.key == "x") {
		return "平局";
	} else if ((item.betMarketInfo.betType == 1303 || item.betMarketInfo.betType == 704) && item.betMarketInfo.key == "h") {
		return item.teamInfo.homeName;
	} else if ((item.betMarketInfo.betType == 1303 || item.betMarketInfo.betType == 704) && item.betMarketInfo.key == "a") {
		return item.teamInfo.awayName;
	} else {
		return item.betMarketInfo.keyName;
	}
};

const clearCart = () => {
	emit("close");
};

/**
 * @description 二次投注
 */
const onSecondBet = () => {
	emit("onSecondBet");
};
</script>

<style scoped lang="scss">
.content {
	padding: 0px 24px 30px;

	@include themeify {
		background-color: themed("BG1");
	}

	.content_list {
		// max-height: 668px;
		overflow-y: auto;
		padding-bottom: 10px;

		.bet_slip_item {
			display: flex;
			align-items: center;
			margin-top: 10px;
			border-radius: 16px;
			padding: 11px 40px;

			@include themeify {
				background-color: themed("BG3");
			}

			.bet_slip_info {
				flex: 1;

				.bet_slip_label {
					display: flex;
					align-items: center;
					justify-content: space-between;

					@include themeify {
						color: themed("TB");
					}

					font-family: "PingFang SC";
					font-size: 28px;
					font-weight: 500;

					.change-icon {
						position: absolute;
						top: 50%;
						right: -35px;
						transform: translate(-50%, 0);
					}
				}

				.bet_slip_type {
					display: flex;
					justify-content: space-between;

					.tip {
						display: block;
						padding: 2px 7px;
						border-radius: 5px;

						@include themeify {
							background-color: themed("Tag2-P");
							color: themed("TB");
						}
					}
					.theme {
						@include themeify {
							color: themed("Theme");
						}
					}
				}

				.bet_slip_type,
				.bet_slip_name,
				.bet_slip_name {
					@include themeify {
						color: themed("T1");
					}

					font-family: "PingFang SC";
					font-size: 22px;
					font-weight: 400;
				}
			}
		}

		.bet-details {
			padding: 10px 40px;
			margin-top: 10px;
			border-radius: 16px;

			@include themeify {
				background-color: themed("BG3");
			}

			.bet-cell {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 15px;

				&:first-child {
					margin-top: 0;
				}

				.label {
					@include themeify {
						color: themed("TB");
					}

					font-size: 26px;
					font-weight: 500;
				}

				.value {
					@include themeify {
						color: themed("Theme");
					}

					font-size: 22px;
					font-weight: 400;
				}

				.text {
					@include themeify {
						color: themed("T1");
					}

					font-size: 22px;
					font-weight: 400;
				}
			}
		}

		.footer-button {
			padding: 20px 15px;
			margin-top: 10px;
			border-radius: 16px;

			@include themeify {
				background-color: themed("BG3");
			}

			.button {
				width: 100%;
				height: 88px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10px;
				border-radius: 8px;

				@include themeify {
					background-color: themed("Theme");
					color: themed("TB-P");
				}

				font-family: "PingFang SC";
				font-size: 30px;
				font-weight: 500;
				line-height: 30px;
				box-sizing: border-box;
			}

			.button2 {
				width: 100%;
				height: 88px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 12px;
				padding: 10px;
				border-radius: 8px;
				border: 1px solid;

				@include themeify {
					color: themed("Theme");
					border-color: themed("Theme");
				}

				font-family: "PingFang SC";
				font-size: 30px;
				font-weight: 500;
				line-height: 30px;
				box-sizing: border-box;
			}
		}
	}
}
</style>
