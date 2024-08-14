<template>
	<div class="vip_progress">
		<div class="vip_icon">
			<VantLazyImg class="vip_bg" :src="vip_icon_1" />
			<span class="vip_level">LV0</span>
		</div>
		<div class="progress_bar">
			<div class="progress" :style="{ width: `${props.percentage}%` }">
				<div class="percentage_info">
					<div v-if="props.percentageShow" class="percentage">
						<div class="value">{{ props.percentage }}%</div>
						<SvgIcon class="arrow" iconName="/vip/progress_bar_percent_arrow" />
					</div>
					<VantLazyImg class="vip_jdt" :src="vip_jdt" />
				</div>
			</div>
		</div>
		<div class="vip_icon">
			<VantLazyImg class="vip_bg" :src="vip_icon_1" />
			<span class="vip_level">LV99</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import vip_icon_1 from "/@/assets/zh-CN/default/vip/vip_icon_1.png";
import vip_jdt from "/@/assets/zh-CN/default/my/vip_jdt.png";

const props = withDefaults(
	defineProps<{
		percentageShow?: boolean;
		percentage?: number;
	}>(),
	{
		percentageShow: false,
		percentage: 0,
	}
);
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
