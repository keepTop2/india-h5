<template>
	<div class="footer_content">
		<BetNumber :class="betNumberShow && sportsBetChampion.championBetData.length == 1 ? 'betNumberContainer' : 'containerHide'" @onKeyPress="onkeyPress" />
		<div class="content_footer">
			<Radio ref="radioRef" />
		</div>
		<div class="btns">
			<div v-if="sportsBetChampion.championBetData.length > 1" class="delete_btn" @click="onDelete">
				<SvgIcon iconName="/venueHome/sports/svg/sports_delete" size="3.8" />
			</div>
			<div class="btn1">
				<div :class="![0].includes(sportsBetChampion.bettingStatus) ? 'disabled_container' : 'container van-haptics-feedback'" @click="onBet">
					<div class="label">{{ $t('sports["投注"]') }}</div>
					<div class="valuation">
						<span>{{ $t('sports["最高可赢"]') }}</span>
						<span class="ml_6">{{ singleTicketWinningAmount }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import Radio from "../../../radio/index.vue";
import shopCartChampionPubSub from "/@/views/venueHome/sports/hooks/shopCartChampionPubSub";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import sportsApi from "/@/api/venueHome/sports";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
import { i18n } from "/@/i18n/index";
const $: any = i18n.global;
const sportsBetChampion = useSportsBetChampionStore();
const sportsBetInfo = useSportsBetInfoStore();
const betNumberShow = computed(() => shopCartChampionPubSub.getBetNumberShow());
const singleTicketWinningAmount = computed(() => shopCartChampionPubSub.getSingleTicketWinningAmount());
const stake = computed(() => shopCartChampionPubSub.getSingleTicketBetValue());

const emit = defineEmits(["singleTicketSuccess"]);

const onBet = () => {
	if (stake.value == "") {
		showToast($.t(`sports['请输入投注金额']`));
		return;
	}
	if (stake.value < sportsBetInfo.championSingleTicketInfo.minBet) {
		showToast($.t(`sports['投注金额未达到最低限额']`));
		return;
	}
	if (stake.value > sportsBetInfo.balance) {
		showToast($.t(`sports['余额不足，请先充值']`));
		return;
	}
	// 单关投注
	placeOutrightBet();
};

/**
 * 单关下注
 */
const placeOutrightBet = async () => {
	// 参数拼接
	const params = {
		vendorTransId: sportsBetInfo.vendorTransId,
		sportType: sportsBetInfo.championSingleTicketInfo.sportType,
		orid: sportsBetInfo.championSingleTicketInfo.orid,
		price: sportsBetInfo.championSingleTicketInfo.price,
		stake: stake.value,
	};
	const res = await sportsApi.placeOutrightBet(params).catch((err) => err);
	if (res.data) {
		const result = res.data;
		emit("singleTicketSuccess", result);
	}
};

/**
 * @description 清空购物车
 */
const onDelete = () => {
	sportsBetChampion.clearChampionShopCart();
};

// 键盘按键为完成和关闭时隐藏键盘
const onkeyPress = (value) => {
	shopCartChampionPubSub.setSingleTicketBetValue(value);
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
	}
	.btns {
		display: flex;
		justify-content: space-between;
		@include themeify {
			color: themed("TB-P");
		}
		.btn1 {
			width: 100%;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			overflow: hidden;
			@include themeify {
				background-color: themed("Theme");
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
					background-color: themed("T3");
				}
			}
		}
		.delete_btn {
			width: 165px;
			height: 88px;
			margin-right: 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			@include themeify {
				background-color: themed("Theme");
			}
		}
	}
}
</style>
