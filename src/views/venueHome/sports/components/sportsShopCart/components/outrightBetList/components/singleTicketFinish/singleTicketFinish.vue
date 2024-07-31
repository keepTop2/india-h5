<template>
	<div class="content">
		<div class="content_list">
			<div class="bet_slip_item" v-for="(item, index) in sportsBetChampion.championBetData" :key="index">
				<div class="bet_slip_info">
					<div class="bet_slip_label">
						<div>{{ item.teamName }}</div>
						<div>@{{ common.getInstance().formatFloat(props.data.currentPrice) }}</div>
					</div>
					<div class="bet_slip_type mt_2">
						<div>
							<span>[优胜冠军]</span>
							<span class="ml_8">[欧洲盘]</span>
						</div>
					</div>
					<div class="bet_slip_name mt_5">
						<span>{{ item.leagueName }}</span>
					</div>
				</div>
			</div>

			<div class="bet-details">
				<div class="bet-cell">
					<span class="label">投注金额</span>
					<span class="value">{{ common.getInstance().formatFloat(props.data.stake) }}</span>
				</div>
				<div class="bet-cell">
					<span class="label">可赢金额</span>
					<span class="value">{{ singleTicketWinningAmount }}</span>
				</div>
				<div class="bet-cell">
					<span class="label">注单号</span>
					<span class="order">{{ sportsBetInfo.vendorTransId }}</span>
				</div>
				<div class="button" @click="clearCart">确认</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
const sportsBetChampion = useSportsBetChampionStore();
const sportsBetInfo = useSportsBetInfoStore();
const props = withDefaults(
	defineProps<{
		data: any;
	}>(),
	{
		data: {},
	}
);

const emit = defineEmits(["close"]);

const singleTicketWinningAmount = computed(() => {
	const amount = common.getInstance().mul(props.data.currentPrice, props.data.stake);
	const result = common.getInstance().sub(amount, props.data.stake);
	return result ? common.getInstance().formatFloat(result) : 0;
});

const clearCart = () => {
	emit("close");
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
							background-color: themed("T3");
							color: themed("TB");
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
			padding: 20px 15px;
			margin-top: 10px;
			border-radius: 16px;
			@include themeify {
				background-color: themed("BG3");
			}
			.bet-cell {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20px;
				.label {
					@include themeify {
						color: themed("TB");
					}
					font-size: 24px;
					font-weight: 500;
				}
				.value {
					@include themeify {
						color: themed("Theme");
					}
					font-size: 24px;
					font-weight: 500;
				}
				.order {
					@include themeify {
						color: themed("T1");
					}
					font-size: 24px;
					font-weight: 500;
				}
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
		}
	}
}
</style>
