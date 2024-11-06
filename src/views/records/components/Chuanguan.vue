<template>
	<div class="bet-detail2">
		<div class="header">
			<span class="color_TB">串关 | 3串1 @5.98</span>
			<span class="PendingSettlement">{{ $t('records["待结算"]') }}</span>
		</div>
		<div class="order-info">
			<div class="order-number">
				<span class="label">{{ $t('records["单号"]') }}：</span>
				<span class="code">
					<span>{{ item.orderId }}</span>
					<SvgIcon @click="_copy(item.orderId)" iconName="common/copy2" />
				</span>
			</div>
			<div class="order-date">
				<span class="label">{{ $t('records["投注时间"]') }}：</span>
				<span>{{ item.betTime }}</span>
			</div>

			<div class="bet-amount">
				<span class="label">{{ $t('records["投注金额"]') }}：</span>
				<span>{{ item.betAmount }}</span>
			</div>
			<div class="bet-figure">
				<span class="label">{{ $t('records["输赢金额"]') }}：</span>
				<span>{{ item.winLossAmount }}</span>
			</div>
		</div>

		<div class="match-details" v-for="(match, index) in item.orderMultipleBetList" :key="index">
			<div class="match-info">
				<span>{{ match.eventInfo }}</span>
				<span class="info-vs">
					{{ item.teamInfo }}
					<!--					<span class="info-nation">team1</span>-->
					<!--					<span>VS</span>-->
					<!--					<span class="info-nation">team2</span>-->
				</span>
				<span class="fs_24 color_T1">{{ match.betContent }}</span>
			</div>
			<div class="match-result">
				<span class="fs_36 mr_24 fw_400" :class="{ win: match.winlossStatus === 1, lose: match.winlossStatus === 0, color_T3: [0, 1].includes(match.winlossStatus) }">{{ match.result }}</span>
				<span class="fs_26">@{{ match.odds }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { EventOrderPageRecords } from "/@/views/records/type";
import { copy } from "/@/views/records/common";
import { showToast } from "vant";
import { i18n } from "/@/i18n";
const $: any = i18n.global;

interface Props {
	item: EventOrderPageRecords;
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
