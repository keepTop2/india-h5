<template>
	<div class="footer_content">
		<BetNumber :class="betParlayTicketsNumberShow ? 'betNumberContainer' : 'containerHide'" @onKeyPress="onkeyPress" @onKeyReleased="onKeyReleased" />
		<div class="content_footer">
			<Radio />
		</div>
		<div class="btns">
			<div class="delete_btn" @click="onDelete">
				<SvgIcon iconName="/venueHome/sports/svg/sports_delete" size="3.8" />
			</div>

			<div class="btn1">
				<div
					v-if="[0, 1, 2, 5].includes(sportsBetEvent.bettingStatus)"
					:class="[1, 2, 5].includes(sportsBetEvent.bettingStatus) ? 'disabled_container' : 'container van-haptics-feedback'"
					@click="onBet"
				>
					<div class="label">{{ $t('sports["投注"]') }}</div>
					<div class="valuation">
						<span>{{ $t('sports["最高可赢"]') }}</span>
						<span>{{ getParlayTicketsWinningAmount }}</span>
					</div>
				</div>
				<!-- 串关数量没达到要求 -->
				<div v-else-if="sportsBetEvent.bettingStatus == 3" class="container disabled_container">{{ $t('sports["至少选择场比赛"]', { value: combo }) }}</div>
				<!-- 赔率变化 -->
				<div v-else-if="sportsBetEvent.bettingStatus == 4" class="container van-haptics-feedback" @click="oddsChanges">{{ $t('sports["接受赔率变化"]') }}</div>
			</div>

			<div class="btn2 van-haptics-feedback" @click="closePopup">
				<SvgIcon iconName="/venueHome/sports/svg/sports_plus" size="3.466667" />
				<span class="label">{{ $t('sports["串"]') }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import Radio from "../../../radio/index.vue";
import shopCartPubSub from "/@/views/venueHome/sports/hooks/shopCartPubSub";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import Common from "/@/utils/common";
import sportsApi from "/@/api/venueHome/sports";
const sportsBetEvent = useSportsBetEventStore();
const sportsBetInfo = useSportsBetInfoStore();
const emit = defineEmits(["parlayTicketsSuccess"]);

const { combo } = storeToRefs(sportsBetEvent);

const getParlayTicketsWinningAmount = computed(() => shopCartPubSub.getParlayTicketsWinningAmount());
const betParlayTicketsNumberShow = computed(() => shopCartPubSub.getParlayTicketsBetNumberShow());
const betValueState = computed(() => shopCartPubSub.betValueState);

const onBet = () => {
	if ([1, 2, 5].includes(sportsBetEvent.bettingStatus)) {
		return;
	}
	// 循环金额 与 投注金额有无达到最低限额
	const hasEmpty = sportsBetInfo.parlayTicketsInfo.combos.every((item) => !betValueState.value[item.comboType]);
	const hasReachedMinBet = sportsBetInfo.parlayTicketsInfo.combos.every((item) => !betValueState.value[item.comboType] || parseFloat(betValueState.value[item.comboType]) >= item.minBet);
	if (hasEmpty) {
		showToast("请输入投注金额");
	} else if (!hasReachedMinBet) {
		showToast("投注金额未达到最低限额");
	} else {
		// 计算总投注
		const totalValue = sportsBetInfo.parlayTicketsInfo.combos.reduce((acc, obj) => {
			return acc + Common.getInstance().mul(obj.betCount, parseFloat(betValueState.value[obj.comboType]));
		}, 0);
		if (totalValue > sportsBetInfo.balance) {
			showToast("余额不足，请先充值");
			return;
		}
		placeParlayBet();
	}
};

/**
 * 串关下注
 */
const placeParlayBet = async () => {
	const params = {
		betInfo: {
			vendorTransId: sportsBetInfo.vendorTransId,
			// 循环匹配赛事数据
			tickets: sportsBetInfo.parlayTicketsInfo.priceInfo.map((v) => ({
				sportType: v.sportType,
				marketId: v.marketId,
				point: v.point,
				key: v.key,
				price: v.currentPrice,
			})),
			// 过滤空注单，匹配投注注单
			combos: sportsBetInfo.parlayTicketsInfo.combos
				.filter((v) => betValueState.value[v.comboType])
				.map((v) => ({
					combotype: v.comboType,
					stake: betValueState.value[v.comboType],
				})),
			priceOption: 1,
		},
	};
	const res: any = await sportsApi.placeParlayBet(params).catch((err) => {
		const { data } = err.response;
		if (data.errorCode == "B014") {
			showToast("投注金额超出最大限额");
		}
		if (data.errorCode == "B038") {
			showToast("超过最大赢取金额");
		}
	});
	if (res.data) {
		const result = res.data;
		emit("parlayTicketsSuccess", result);
	}
};

// 键盘按键为完成和关闭时隐藏键盘
const onkeyPress = (value) => {
	if (value !== "{close}") {
		shopCartPubSub.setParlayTicketsBetValue(value);
	}
};

const onKeyReleased = (value) => {
	if (value === "{close}") {
		shopCartPubSub.setParlayTicketsBetValue(value);
	}
};

/**
 * @description 接受赔率变化
 */
const oddsChanges = () => {
	sportsBetEvent.bettingStatus = 0; // 修改成为投注状态
};

/**
 * @description 清空购物车
 */
const onDelete = () => {
	closePopup();
	sportsBetEvent.clearShopCart();
};

/**
 * @description 关闭弹窗
 */
const closePopup = () => {
	sportsBetEvent.closeShopCart();
};
</script>

<style scoped lang="scss">
.footer_content {
	padding: 0px 15px 20px 15px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
	.betNumberContainer {
		max-height: 381px;
		padding-top: 55px;
		overflow: hidden;
		transition: all 0.3s;
	}
	.containerHide {
		max-height: 0px;
		overflow: hidden;
		transition: all 0.3s;
	}
	.content_footer {
		width: 100%;
		height: 71px;
		display: flex;
		align-items: center;
		.radio {
			display: flex;
			align-items: center;
		}
		span {
			margin: 0px 10px;
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 22px;
			font-weight: 400;
		}
	}
	.btns {
		display: flex;
		justify-content: space-between;
		gap: 4px;
		@include themeify {
			color: themed("TB-P");
		}
		.btn1 {
			flex: 1;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			@include themeify {
				background-color: themed("Theme");
			}
			overflow: hidden;

			.container,
			.disabled_container {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.label {
					font-family: "PingFang SC";
					font-size: 30px;
					font-style: normal;
					font-weight: 500;
					line-height: 30px;
				}
				.valuation {
					margin-top: 4px;
					font-family: "PingFang SC";
					font-size: 18px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
				}
			}

			.disabled_container {
				@include themeify {
					background-color: themed("T3");
				}
			}
		}
		.btn2,
		.delete_btn {
			width: 165px;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			@include themeify {
				background-color: themed("Theme");
			}
			.label {
				margin-left: 6px;
			}
		}
	}
}
</style>
