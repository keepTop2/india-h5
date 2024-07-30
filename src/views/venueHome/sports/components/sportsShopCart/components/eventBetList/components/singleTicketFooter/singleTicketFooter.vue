<template>
	<div class="footer_content">
		<BetNumber :class="betNumberShow ? 'betNumberContainer' : 'containerHide'" @onKeyPress="onkeyPress" />
		<div class="content_footer">
			<Radio ref="radioRef" />
		</div>
		<div class="btns">
			<div class="btn1">
				<!-- 可下注 -->
				<div v-if="[0, 1].includes(sportsBetEvent.bettingStatus)" :class="[1].includes(sportsBetEvent.bettingStatus) ? 'disabled_container' : 'container van-haptics-feedback'" @click="onBet">
					<div class="label">投注</div>
					<div class="valuation">
						<span>最高可赢</span>
						<span class="ml_6">{{ singleTicketWinningAmount }}</span>
					</div>
				</div>
				<!-- 赔率变化 -->
				<div v-else-if="sportsBetEvent.bettingStatus == 4" class="container van-haptics-feedback" @click="oddsChanges">接受赔率变化</div>
			</div>

			<div class="btn2 van-haptics-feedback" @click="closePopup">
				<SvgIcon iconName="sports_plus" size="3.466667" />
				<span class="label">串</span>
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
import sportsApi from "/@/api/venueHome/sports";

const sportsBetEvent = useSportsBetEventStore();
const sportsBetInfo = useSportsBetInfoStore();
const betNumberShow = computed(() => shopCartPubSub.getBetNumberShow());
const singleTicketWinningAmount = computed(() => shopCartPubSub.getSingleTicketWinningAmount());
const stake = computed(() => shopCartPubSub.getSingleTicketBetValue());

const emit = defineEmits(["singleTicketSuccess"]);

const onBet = () => {
	if ([1].includes(sportsBetEvent.bettingStatus)) {
		return;
	}
	if (stake.value == "") {
		showToast("请输入投注金额");
		return;
	}
	if (stake.value < sportsBetInfo.singleTicketInfo.minBet) {
		showToast("投注金额未达到最低限额");
		return;
	}
	if (stake.value > sportsBetInfo.balance) {
		showToast("余额不足，请先充值");
		return;
	}
	// 单关投注
	placeBet();
};

/**
 * 单关下注
 */
const placeBet = async () => {
	// 参数拼接
	const params = {
		vendorTransId: sportsBetInfo.vendorTransId,
		sportType: sportsBetInfo.singleTicketInfo.sportType,
		marketId: sportsBetInfo.singleTicketInfo.marketId,
		price: sportsBetInfo.singleTicketInfo.payoutRate,
		point: sportsBetInfo.singleTicketInfo.point,
		key: sportsBetInfo.singleTicketInfo.key,
		stake: stake.value,
		oddsOption: 1,
	};
	const res = await sportsApi.placeBet(params).catch((err) => err);
	if (res.data) {
		const result = res.data;
		emit("singleTicketSuccess", result);
	}
};

const oddsChanges = () => {
	sportsBetEvent.bettingStatus = 0; // 修改成为投注状态
};

const closePopup = () => {
	sportsBetEvent.closeShopCart();
};

// 键盘按键为完成和关闭时隐藏键盘
const onkeyPress = (value) => {
	shopCartPubSub.setSingleTicketBetValue(value);
};

// const onKeyReleased = (value) => {
// 	console.log("value", value);
// 	shopCartPubSub.setSingleTicketBetValue(value);
// };
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
	}
	.btns {
		display: flex;
		justify-content: space-between;
		@include themeify {
			color: themed("TB-P");
		}
		.btn1 {
			width: 503px;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			overflow: hidden;
			@include themeify {
				background-color: themed("Theme-P");
			}
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
					background-color: themed("Tag2-P");
				}
			}
		}
		.btn2 {
			width: 165px;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			@include themeify {
				background-color: themed("Theme-P");
			}
			.label {
				margin-left: 6px;
			}
		}
	}
}
</style>
