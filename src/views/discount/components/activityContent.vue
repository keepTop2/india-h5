<template>
	<div class="activity-details">
		<div class="detail_icon">
			<img src="../image/detail_icon.png" alt="" />
		</div>
		<div class="details-header" :style="{ background: `url(${Common.getThemeImg('activity_detail_header.png')})`, backgroundSize: '100% 100%' }">
			<div class="details-header-title-left">
				<img :src="Common.getThemeImg('details-header-title-left.png')" alt="" />
			</div>
			活动条件
			<div class="details-header-title-right">
				<img :src="Common.getThemeImg('details-header-title-right.png')" alt="" />
			</div>
		</div>
		<div class="detail-content" :style="{ background: `url(${Common.getThemeImg('activity_detail_content.png')})`, backgroundSize: '100% 100%' }">
			<div class="detail-row">
				<p class="label">
					<span>活动对象</span>
				</p>
				<p class="value">{{ activityData?.userTypeText }}</p>
			</div>
			<div class="detail-row">
				<p class="label">
					<span>活动时间</span>
				</p>
				<p class="value" v-if="activityData?.activityDeadline == 0">
					{{ dayjs(activityData?.activityStartTime).format("YYYY-MM-DD HH:mm:ss") }}~{{ dayjs(activityData?.activityEndTime).format("YYYY-MM-DD HH:mm:ss") }}
				</p>
				<p class="value" v-if="activityData.activityDeadline == 1">长期活动</p>
			</div>
			<div class="detail-row">
				<p class="label">
					<span>活动描述</span>
				</p>
				<p class="value">{{ activityData?.activityDescI18nCode }}</p>
			</div>
		</div>
		<div class="detail-footer" :style="{ background: `url(${Common.getThemeImg('activity_detail_footer.png')})`, backgroundSize: '100% 100%' }" />
	</div>
</template>

<script setup lang="ts">
import Common from "/@/utils/common";
import dayjs from "dayjs";
const props = defineProps({
	activityData: {
		type: {} as any,
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
	.detail_icon {
		position: absolute;
		right: 62px;
		top: 120px;
		img {
			height: 160px;
			border-radius: 16px;
		}
	}
	.details-header {
		height: 112px;
		line-height: 112px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			height: 6px;
			margin: 0 56px;
		}
	}
	.detail-content {
		padding: 0 62px;
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
	}
}
</style>
