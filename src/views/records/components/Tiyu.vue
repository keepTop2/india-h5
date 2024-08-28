<template>
	<div class="bet-detail">
		<div class="header">
			<div class="match-info">
				<!-- <img src="path/to/flag.png" alt="flag" class="flag" /> -->
				<span class="match-type">国际 | 2024 欧洲杯 卡塔尔世界杯</span>
			</div>
			<span class="Settled">已结算</span>
		</div>
		<div class="teams">
			<span>荷兰 VS 英格兰</span>
		</div>
		<div class="order-info">
			<div class="order-number">
				<span class="label">单号：</span>
				<span>2103102391230123</span>
				<SvgIcon @click="copy('2103102391230123')" iconName="common/copy2" />
			</div>
			<div class="order-date">
				<span>2024-07-18 16:42:08</span>
			</div>
		</div>
		<div class="bet-info">
			<div class="bet-item">
				<span class="label">投注内容：</span>
				<span class="value">荷兰 全场独赢 2.98</span>
			</div>
			<div class="bet-item flex-between">
				<div class="bet-item-content">
					<span class="label">投注金额：</span>
					<span class="value">999999.00</span>
				</div>
				<div class="bet-item-content">
					<span class="label">输赢金额：</span>
					<span class="value negative">-999999999.00</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 *
 * @description: 体育投注模板
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
