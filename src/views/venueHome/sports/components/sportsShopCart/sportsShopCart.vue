<template>
	<div class="shopping-cart">
		<!-- 购物车图标 -->
		<CartIcon :isShowBet="props.isShowBet" />
		<!-- 赛事投注购物车 -->
		<EventBetList v-if="props.isShowBet" :isShowBet="props.isShowBet" />
		<!-- 冠军投注购物车 -->
		<OutrightBetList v-if="!props.isShowBet" :isShowBet="props.isShowBet" />
	</div>
</template>

<script setup lang="ts">
import CartIcon from "./components/cartIcon/cartIcon.vue";
import EventBetList from "./components/eventBetList/eventBetList.vue";
import OutrightBetList from "./components/outrightBetList/outrightBetList.vue";

const props = withDefaults(
	defineProps<{
		isShowBet?: boolean;
	}>(),
	{
		isShowBet: true,
	}
);
</script>

<style scoped lang="scss"></style>
