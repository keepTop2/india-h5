<template>
	<div class="bet-detail2">
		<div class="header">
			<span class="color_TB">串关 | 3串1 @5.98</span>
			<span class="PendingSettlement">{{ $t('records["待结算"]') }}</span>
		</div>
		<div class="order-info">
			<div class="order-number">
				<span class="label">{{ $t('records["单号"]') }}：</span>
				<span>2103102391230123</span>
				<SvgIcon @click="copy('2103102391230123')" iconName="common/copy2" />
			</div>
			<div class="order-date">
				<span>2024-07-18 16:42:08</span>
			</div>
		</div>
		<div class="bet-amount">
			<span class="label">{{ $t('records["投注金额"]') }}：</span>
			<span>999999.00</span>
		</div>
		<div class="match-details" v-for="(match, index) in list" :key="index">
			<div class="match-info">
				<span>2024 欧洲杯 卡塔尔世界杯</span>
				<span>{{ match.teams }}</span>
				<span class="fs_24 color_T1">{{ match.betContent }}</span>
			</div>
			<div class="match-result">
				<span class="fs_36 mr_24 fw_400" :class="{ win: match.result === '赢', lose: match.result === '输', color_T3: match.result === '-' }">{{ match.result }}</span>
				<span class="fs_26">@{{ match.odds }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description: 体育投注模板
 */
interface Match {
	teams: string;
	betContent: string;
	result: string;
	odds: string;
}
import { ref, onMounted, PropType } from "vue";
import { copy } from "../common";
const props = defineProps({
	list: {
		default: [],
		type: Array as PropType<Match[]>,
	},
});
onMounted(() => {
	console.log("Component mounted");
});
</script>

<style lang="scss">
@import "../records.scss";
.content {
}
</style>
