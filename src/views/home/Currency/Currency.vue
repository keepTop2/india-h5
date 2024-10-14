<template>
	<div class="Currency mb_36">
		<div class="mb20">
			<!-- 显示转账方式标题 -->
			<h3 class="zanzhu">{{ $t('home["转账方式"]') }}</h3>
			<!-- 第一组转账方式图标 -->
			<div class="image-container sponsor_list mb_44">
				<div v-for="item in data" :key="item" class="card">
					<VantLazyImg :src="item.icon" alt="平台赞助图片" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
	data: [] as any,
});
/**
 * @description 此组件用于显示转账方式
 */
</script>

<style lang="scss" scoped>
.Currency {
	width: 100%;
	margin-top: 32px;

	.card {
		width: 14%;
		display: flex;
		justify-content: center;
		img {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	@import "./Currency.scss";
}
</style>
