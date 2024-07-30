<template>
	<div class="Currency mb_36">
		<div class="mb20">
			<h3 class="zanzhu">{{ $t('home["转账方式"]') }}</h3>
			<div class="image-container sponsor_list mb_44">
				<div v-for="item in new Array(6)" :key="item" class="card bg_BG3">
					<SvgIcon iconName="home/bi_btc" />
				</div>
			</div>
			<div class="image-container sponsor_list">
				<div v-for="item in new Array(6)" :key="item" class="card bg_BG3">
					<SvgIcon iconName="home/bi_btc" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.Currency {
	@import "./Currency.scss";
	width: 100%;
	margin-top: 32px;

	.card {
		width: 80px;
		height: 80px;
		svg {
			width: 80px;
			height: 80px;
		}
	}
}
</style>
