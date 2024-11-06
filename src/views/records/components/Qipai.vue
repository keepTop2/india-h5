<template>
	<div class="bet-detail">
		<div class="header">
			<div class="match-info">
				<!-- <img src="path/to/flag.png" alt="flag" class="flag" /> -->
				<span class="match-type">{{ item.gameName }} | {{ item.thirdGameCode }}</span>
			</div>
			<span class="Settled">{{ $t('records["已结算"]') }}</span>
		</div>
		<div class="order-info">
			<div class="order-number">
				<span class="label">{{ $t('records["局号"]') }}：</span>
				<span>{{ item.orderId }}</span>
			</div>
			<div class="order-number">
				<span class="label">{{ $t('records["单号"]') }}：</span>
				<span class="code">
					<span>{{ item.orderId }}</span>
					<SvgIcon @click="_copy(item.orderId)" iconName="common/copy2" />
				</span>
			</div>
		</div>
		<div class="bet-info">
			<div class="order-date">
				<span class="label">{{ $t('records["投注时间"]') }}：</span>
				<span>{{ item.betTime }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t('records["投注金额"]') }}：</span>
				<span class="value">{{ item.betAmount }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t('records["输赢金额"]') }}：</span>
				<span class="value negative">{{ item.winLossAmount }}</span>
			</div>
			<!-- <div class="bet-item flex-between">
				<div class="bet-item-content">
					<span class="label">{{ $t('records["投注金额"]') }}：</span>
					<span class="value">999999.00</span>
				</div>
				<div class="bet-item-content">
					<span class="label">{{ $t('records["输赢金额"]') }}：</span>
					<span class="value negative">-999999999.00</span>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description: 棋牌投注记录模板
 */
import { copy } from "../common";
import { BasicOrderPageRecords } from "../type";
import { showToast } from "vant";
import { i18n } from "/@/i18n";
const $: any = i18n.global;

interface Props {
	item: BasicOrderPageRecords;
}
defineProps<Props>();

function _copy(orderId) {
  copy(orderId);
  showToast($.t("common['成功']"));
}
</script>

<style lang="scss">
@import "../records.scss";
.content {
}
</style>
