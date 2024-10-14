<template>
	<div class="sponsor">
		<div class="mb20">
			<h3 class="zanzhu">{{ $t('home["合作商"]') }}</h3>
			<div class="image-container sponsor_list">
				<div v-for="(item, index) in data" :key="index" class="card bg_BG3">
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
</script>

<style lang="scss" scoped>
.sponsor {
	@import "./sponsor.scss";
	width: 100%;
	margin-top: 32px;

	.card {
		box-sizing: border-box;
		img {
			width: 100%;
			height: 100%;
			object-fit: scale-down;
		}
	}
}
</style>
