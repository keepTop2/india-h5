<template>
	<div class="vip_progress">
		<div class="vip_icon">
			<VantLazyImg class="vip_bg" :src="vip_icon_1" />
			<span class="vip_level">LV{{ props.userVipInfo.vipGradeCode }}</span>
		</div>
		<div class="progress_bar">
			<div class="progress" :style="{ width: `${progressPercentage}%` }">
				<div class="percentage_info">
					<div v-if="props.percentageShow" class="percentage">
						<div class="value">{{ progressPercentage }}%</div>
						<SvgIcon class="arrow" iconName="/vip/progress_bar_percent_arrow" />
					</div>
					<VantLazyImg class="vip_jdt" :src="vip_jdt" />
				</div>
			</div>
		</div>
		<div class="vip_icon">
			<VantLazyImg class="vip_bg" :src="vip_icon_1" />
			<span class="vip_level">LV{{ props.userVipInfo.vipGradeUp }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import vip_icon_1 from "/@/assets/zh-CN/default/vip/vip_icon_1.png";
import vip_jdt from "/@/assets/zh-CN/default/my/vip_jdt.png";
import { VIP } from "/@/views/vip/interface";

const props = withDefaults(
	defineProps<{
		userVipInfo: VIP;
		percentageShow?: boolean;
	}>(),
	{
		userVipInfo: {} as VIP,
		percentageShow: false,
	}
);

// 计算百分比
const progressPercentage = computed(() => {
	const { currentExp, upgradeVipExp } = props.userVipInfo;
	// 防止NaN：确保 upgradeVipExp 不为0，并且 currentExp 和 upgradeVipExp 都是有效数字
	if (isNaN(currentExp) || isNaN(upgradeVipExp) || upgradeVipExp === 0) {
		return 0;
	}

	// 计算百分比并取整
	return Math.floor((currentExp / upgradeVipExp) * 100);
});

console.log("progressPercentage", progressPercentage);
</script>

<style scoped lang="scss">
.vip_progress {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	.vip_icon {
		position: relative;
		width: 92px;
		height: 40px;
		.vip_bg {
			width: 92px;
			height: 40px;
		}
		.vip_level {
			position: absolute;
			bottom: 2px;
			right: 0px;
			width: 50px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-family: "112-SS Yi Fang Ti";
			font-size: 16px;
			font-weight: 400;
		}
	}
	.progress_bar {
		display: flex;
		align-items: center;
		flex: 1;
		height: 16px;
		margin-top: 16px;
		background: url("/@/assets/zh-CN/default/my/progressBar_bg.png") center center / 100% 100% no-repeat;

		.progress {
			min-width: 40px;
			max-width: calc(100% - 4px);
			height: 12px;
			margin: 0px 2px;
			border-radius: 8px;
			@include themeify {
				background-color: themed("Theme");
			}

			.percentage_info {
				position: relative;
				width: 100%;
				height: 100%;
				.percentage {
					position: absolute;
					top: -160%;
					right: 0px;
					width: min-content;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					.arrow {
						width: 20px;
						height: 9px;
					}
					.value {
						position: absolute;
						top: -350%;
						font-family: "PingFang SC";
						font-size: 24px;
						font-weight: 600;
						background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
						background-clip: text;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}

				.vip_jdt {
					position: absolute;
					top: -40%;
					right: 0px;
					width: 40px;
					height: 22px;
				}
			}
		}
	}
}
</style>
