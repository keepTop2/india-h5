<template>
	<div class="bet-detail">
		<div class="header">
			<div class="match-info">
				<!-- <img src="path/to/flag.png" alt="flag" class="flag" /> -->
				<span class="match-type">{{ item.gameName }}| {{ item.gameId }}</span>
			</div>
			<span class="Settled">{{ $t(`records["已结算"]`) }}</span>
		</div>
		<div class="order-info">
			<div class="order-number">
				<span class="label">{{ $t(`records["局号"]`) }}：</span>
				<span>{{ item.gameNo }}</span>
			</div>
			<div class="order-number">
				<span class="label">{{ $t(`records["单号"]`) }}：</span>
				<span class="code">
					<span>{{ item.orderId }}</span>
					<SvgIcon @click="_copy(item.orderId)" iconName="common/copy2" />
				</span>
			</div>
		</div>
		<div class="bet-info">
			<div class="order-date">
				<span class="label">{{ $t('records["投注时间"]') }}：</span>
				<span>{{ new Date(item.betTime).toLocaleString() }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t(`records["投注内容"]`) }}</span>
				<span class="value">{{ item.betContentText }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t(`records["结果"]`) }}</span>
				<span class="value">{{ item.resultList }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t(`records["投注金额"]`) }}：</span>
				<span class="value">{{ item.betAmount.toFixed(2) }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t(`records["输赢金额"]`) }}：</span>
				<span class="value" :class="item.winLossAmount > 0 ? 'is' : 'negative'">-{{ item.winLossAmount.toFixed(2) }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description: 真人投注记录模板
 */
import { copy } from "../common";
import { TableOrderPageRecords } from "/@/views/records/type";
import { showToast } from "vant";
import { i18n } from "/@/i18n";
const $: any = i18n.global;

interface Props {
	item: TableOrderPageRecords;
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
