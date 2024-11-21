<template>
	<div class="activity-details">
		<div class="details-header" :style="{ background: `url(${Common.getThemeImg('activity_detail_header.png')})`, backgroundSize: '100% 100%' }">
			<div class="details-header-title-left">
				<img :src="Common.getThemeImg('details-header-title-left.png')" alt="" />
			</div>
			<span class="color_TB">{{ $t(`discount['活动规则']`) }}</span>
			<div class="details-header-title-right">
				<img :src="Common.getThemeImg('details-header-title-right.png')" alt="" />
			</div>
		</div>
		<div class="detail-content" :style="{ background: `url(${Common.getThemeImg('activity_detail_content.png')})`, backgroundSize: '100% 100%' }">
			<div v-html="rules" class="htmlDesc color_TB"></div>
		</div>
		<div class="detail-footer" :style="{ background: `url(${Common.getThemeImg('activity_detail_footer.png')})`, backgroundSize: '100% 100%' }" />
	</div>
</template>

<script setup lang="ts">
import Common from "/@/utils/common";

const props = defineProps({
	rules: {
		type: String,
	},
});
</script>

<style scoped lang="scss">
.activity-details {
	border-radius: 10px;
	width: 100%;
	margin-bottom: 20px;
	background: url("../image/detail_bg.png");
	background-size: 100%;
	position: relative;

	.details-header {
		background: url("../image/detail_header.png");
		background-size: 100% 100%;
		height: 112px;
		line-height: 112px;
		text-align: center;
		display: flex;
		align-items: center;
		font-size: 30px;
		justify-content: center;
		img {
			height: 6px;
			margin: 0 56px;
		}
	}
	.detail-content {
		padding: 0 62px;
		background: url("../image/detail_content.png") no-repeat;
		background-size: 100% 100%;
		.detail-row {
			.label {
				height: 50px;
				line-height: 50px;
				background: url("../image/detail_label_bg.png") no-repeat;
				background-size: auto 100%;
				margin-bottom: 16px;
				span {
					padding-left: 60px;
				}
			}
			.value {
				margin-bottom: 24px;
			}
			&:last-child {
				.value {
					margin-bottom: 0;
				}
			}
		}
		.rules-row {
			margin: 24px 0;
		}
	}
	.detail-footer {
		height: 66px;
		background: url("../image/detail_footer.png");
		background-size: 100% 100%;
	}
}
</style>
