<template>
	<div class="container bg_BG3">
		<div class="header">
			<SvgIcon class="icon" iconName="home/event_football" />
			<span class="title color_T1">2024年欧洲杯欧洲杯欧洲杯欧洲杯...</span>
			<SvgIcon class="star" iconName="home/event_collect" />
		</div>
		<div class="time color_T1">明天 02:00</div>
		<div class="match-info mb_24">
			<div class="team">
				<img :src="XIcon" alt="" />
				<span class="color_TB">葡萄牙葡萄牙葡萄牙葡萄...</span>
			</div>
			<div class="score color_TB bg_BG4">0</div>
		</div>
		<div class="match-info">
			<div class="team">
				<img :src="XIcon" alt="France" />
				<span class="color_TB">法国</span>
			</div>
			<div class="score color_TB bg_BG4">2</div>
		</div>
		<div class="line bg_Line"></div>

		<div class="price_title">全场独赢</div>
		<div class="odds">
			<div class="odds-item">
				<span>主胜</span>
				<span class="value">3.45</span>
			</div>
			<div class="odds-item">
				<span>平局</span>
				<span class="value">2.95</span>
			</div>
			<div class="odds-item">
				<span>客胜</span>
				<span class="value">2.40</span>
			</div>
		</div>
		<div class="price_title">全场让球</div>
		<div class="handicap">
			<div class="handicap-item">
				<span>-0.5</span>
				<span class="value green">1.75</span>
			</div>
			<div class="handicap-item">
				<span>+0.5</span>
				<span class="value red">1.75</span>
			</div>
		</div>
		<div class="price_title">全场大小</div>
		<div class="handicap">
			<div class="handicap-item">
				<span>大 0.5</span>
				<span class="value green">1.75</span>
			</div>
			<!-- <div class="handicap-item">
				<span>小 0.5</span>
				<span class="value red">1.75</span>
			</div> -->
			<div class="handicap-item lock-container">
				<SvgIcon class="lock" iconName="home/event_lock" />
			</div>
		</div>
		<div class="more-bets">
			<span class="fs_28 color_T1">更多投注</span>
			<SvgIcon iconName="home/right_arrow" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import XIcon from "./icon.png";
</script>
<style scoped lang="scss">
$background-color: #333;
$text-color: #fff;
$secondary-text-color: #aaa;
$green-color: #0f0;
$red-color: #f00;

.container {
	padding: 24px;
	border-radius: 20px;
	.lock {
		width: 32px;
		height: 32px;
	}
	.line {
		height: 1px;
		margin: 24px 0;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;

		.icon {
			height: 32px;
			width: 32px;
		}
		.star {
			width: 30px;
			height: 30px;
		}
		.title {
			width: 427px;
			flex: 1;
			margin: 0 10px;
			font-size: 28px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.time {
		font-size: 24px;
		margin-bottom: 36px;
	}
	.price_title {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 12px;
		@include themeify {
			color: themed("T1");
		}
	}

	.match-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: "PingFang SC";
		.team {
			display: flex;
			align-items: center;

			img {
				width: 50px;
				height: 50px;
				margin-right: 20px;
			}

			span {
				font-size: 32px;
				width: 282px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.score {
			font-size: 28px;
			text-align: center;
			width: 76px;
			height: 62px;
			line-height: 62px;
			border-radius: 12px;
		}
	}

	.odds {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		gap: 16px;
		.odds-item {
			width: 159px;
			height: 39px;
			padding: 15px 24px;
			border-radius: 12px;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-evenly;
			@include themeify {
				background: themed("BG4");
				span {
					display: block;
					font-size: 28px;
					color: themed("T1");
				}

				.value {
					font-size: 28px;
					color: themed("TB");
				}
			}
		}
	}

	.handicap {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		gap: 16px;
		.handicap-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 319px;
			height: 68px;
			padding: 17px 24px;
			box-sizing: border-box;
			font-size: 28px;
			@include themeify {
				background: themed("BG4");
				span {
					display: block;
					color: themed("T1");
				}
				.value {
					font-weight: bold;
				}
				.green {
					color: themed("Wam-P1");
				}

				.red {
					color: themed("Theme");
				}
			}
		}
		.lock-container {
			display: flex;
			justify-content: center;
		}
	}
	.more-bets {
		text-align: center;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 26px;
		svg {
			width: 34px;
			height: 28px;
		}
	}
}
</style>
