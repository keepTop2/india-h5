<template>
	<div class="bet-detail">
		<div class="header">
			<div class="match-info">
				<!-- <img src="path/to/flag.png" alt="flag" class="flag" /> -->
				<span class="match-type">麻将糊了</span>
			</div>
			<span class="Settled">{{ $t('records["已结算"]') }}</span>
		</div>
		<div class="order-info">
			<div class="order-number">
				<span class="label">{{ $t('records["单号"]') }}：</span>
				<span class="code" >
					<span>2103102391230123</span>
					<SvgIcon @click="copy('2103102391230123')" iconName="common/copy2" />
				</span>
			</div>
		</div>
		<div class="bet-info">
			<div class="order-date">
				<span class="label">{{ $t('records["投注时间"]') }}：</span>
				<span>2024-07-18 16:42:08</span>
			</div>
			<div class="bet-item">
					<span class="label">{{ $t('records["投注金额"]') }}：</span>
					<span class="value">999999.00</span>
				</div>
				<div class="bet-item">
					<span class="label">{{ $t('records["投注金额"]') }}</span>
					<span class="value negative">-999999999.00</span>
				</div>
			<!-- <div class="bet-item flex-between">
				<div class="bet-item-content">
					<span class="label">{{ $t('records["投注金额"]') }}：</span>
					<span class="value">999999.00</span>
				</div>
				<div class="bet-item-content">
					<span class="label">{{ $t('records["投注金额"]') }}</span>
					<span class="value negative">-999999999.00</span>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description: 电子投注记录模板
 */
import { ref, onMounted } from "vue";
import { copy } from "../common";
onMounted(() => {
	console.log("Component mounted");
});
</script>

<style lang="scss">
@import "../records.scss";
.content {
}
</style>
