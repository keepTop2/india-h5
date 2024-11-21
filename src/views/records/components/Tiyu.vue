<template>
	<div class="bet-detail bet-detail2">
		<div class="header">
			<div class="match-info">
				<!-- <img src="path/to/flag.png" alt="flag" class="flag" /> -->
				<span class="match-type">{{ item.eventInfo }}</span>
			</div>
			<span class="Settled">{{ item.orderClassifyText }}</span>
		</div>
		<div class="teams">
			<span>{{ item.teamInfo }}</span>
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
				<span>{{ new Date(item.betTime).toLocaleString() }}</span>
			</div>
		</div>
		<div class="bet-info">
			<div v-if="item.eventInfo !== $t('records.串关')" class="bet-item">
				<span class="label">{{ $t("records.投注内容") }}：</span>
				<span class="value">
					<!-- <span class="item-nation">ColorasddColorasdd</span> -->
					{{ item.betContent }} {{ item.odds }}
				</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t('records["投注金额"]') }}：</span>
				<span class="value">{{ item.betAmount.toFixed(2) }}</span>
			</div>
			<div class="bet-item">
				<span class="label">{{ $t('records["输赢金额"]') }}：</span>
				<span v-if="item.orderClassify === 1" class="value" :class="item.winLossAmount >= 0 ? 'win' : 'is'">{{ item.winLossAmount.toFixed(2) }}</span>
				<span v-else class="value">-</span>
			</div>
		</div>

		<div class="match-details" v-for="(match, index) in item.orderMultipleBetList" :key="index">
			<div class="match-info">
				<span>{{ match.eventInfo }}</span>
				<!--        <span class="text-hidden">{{ match.teamInfo }}</span>-->
				<span class="text-hidden">
					{{ match.teamInfo }}
					<!--					<span class="info-nation">team1</span>-->
					<!--					<span>VS</span>-->
					<!--					<span class="info-nation">team2</span>-->
				</span>
				<span class="fs_24 color_T1">{{ match.betContent }}</span>
			</div>
			<div class="match-result">
				<span class="fs_36 mr_24 fw_400" :class="{ winColor: match.winlossStatus === 1, loseColor: match.winlossStatus === 0, color_T3: [0, 1].includes(match.winlossStatus) }">{{
					match.result
				}}</span>
				<span class="fs_26">@{{ match.odds }}</span>
			</div>
			<div class="match-status">
				<span v-if="match.winlossStatusText" :class="match.winlossStatus == 1 ? 'winColor' : match.winlossStatus == 0 ? 'winColor' : 'loseColor'">{{ match.winlossStatusText }}</span>
				<span v-else class="Settled">{{ $t('records["取消"]') }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description: 体育投注模板
 */
import { copy } from "../common";
import { SabOrderList } from "../type";
import { showToast } from "vant";
import { i18n } from "/@/i18n";
const $: any = i18n.global;

withDefaults(defineProps<{ item: SabOrderList }>(), {});

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
