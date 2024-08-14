<template>
	<VantNavBar :title="$t(`VantNavBar['VIP俱乐部']`)" @onClickLeft="onClickLeft"></VantNavBar>
	<div class="vip_content">
		<div class="tips">
			<p>{{ $t(`vip["通过升级获得丰厚礼金和专属福利！"]`) }}</p>
			<p>{{ $t(`vip["加入我们精英俱乐部，享受OKsport提供的最佳游戏体验。"]`) }}</p>
		</div>

		<div class="welfare_btn" @click="toPath('./vipHierarchy')">{{ $t(`vip["查看VIP等级制度"]`) }}</div>

		<div class="vip_card">
			<VantLazyImg class="vip_big" :src="vip_big" />

			<div class="head">
				<div class="label">{{ $t(`vip["当前等级"]`) }}</div>
			</div>

			<div class="vip_level">VIP0</div>

			<div class="vip_level_progress">
				<span>{{ $t(`vip["升级所需经验"]`) }}</span>
				<span>200 / 500</span>
				<SvgIcon class="warning_icon" iconName="/vip/warning" />
			</div>
			<!-- VIP进度条 -->
			<Progress class="vip_progress" :percentageShow="true" :percentage="9" />
		</div>

		<div class="notify">
			<SvgIcon class="lock" iconName="/vip/lock" />
			<span class="text">{{ $t(`vip["通过VIP升级获得专属定制化服务"]`) }}</span>
			<SvgIcon class="warning_icon" iconName="/vip/warning" />
		</div>

		<div class="vip_rewards">
			<div class="header">
				<img :src="vip_line_left" alt="" />
				<span class="label">{{ $t(`vip["VIP福利"]`) }}</span>
				<img :src="vip_line_right" alt="" />
			</div>
			<div class="tips">{{ $t(`vip["通过OKSPORT专属VIP福利体系探索最佳游戏体验"]`) }}</div>
			<div class="level_grid">
				<div class="item" v-for="(item, index) in levelData" :key="index">
					<div class="value" :class="{ value_active: activeIndex == index + 1 }" @click="activeIndex = index + 1">
						<div class="icon">
							<img :src="item.icon" />
						</div>
					</div>
					<div class="label">{{ item.label }}</div>
				</div>
			</div>
			<div class="reward_list">
				<div class="reward_list_header">
					<span>{{ levelData[0].label }}</span>
					<span>VIP</span>
					<span>2-7</span>
				</div>

				<div :class="theme === ThemeEnum.default ? 'reward_cell' : 'reward_cell_light'" v-for="item in activeIndex">
					<div class="icon">
						<!-- <img :src="reward_icon1" alt="" /> -->
						<div class="mask">
							<SvgIcon class="lock" iconName="/vip/lock" />
						</div>
					</div>
					<div class="label">升级奖励</div>
					<div class="value">总奖金: <span class="num">18.9$</span></div>
				</div>

				<div :class="theme === ThemeEnum.default ? 'reward_cell' : 'reward_cell_light'">
					<div class="icon">
						<!-- <img :src="reward_icon1" alt="" /> -->
						<div class="mask">
							<SvgIcon class="lock" iconName="/vip/lock" />
						</div>
					</div>
					<div class="label">升级奖励</div>
					<div class="value">总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金总奖金: <span class="num">18.9$</span></div>
				</div>
			</div>

			<div class="vip_rewards_btn" @click="toPath('./vipRewards')">
				{{ $t(`vip["详细了解"]`) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Progress from "/@/views/vip/components/vipProgress.vue";
import icon_bronze from "/@/assets/zh-CN/default/vip/icon_bronze.png";
import icon_silver from "/@/assets/zh-CN/default/vip/icon_silver.png";
import icon_gold from "/@/assets/zh-CN/default/vip/icon_gold.png";
import icon_platinium from "/@/assets/zh-CN/default/vip/icon_platinium.png";
import icon_diamond from "/@/assets/zh-CN/default/vip/icon_diamond.png";
import vip_big from "/@/assets/zh-CN/default/vip/vip_big.png";
import vip_line_left from "/@/assets/zh-CN/default/vip/vip_line_left.png";
import vip_line_right from "/@/assets/zh-CN/default/vip/vip_line_right.png";
import reward_icon1 from "/@/assets/zh-CN/default/vip/reward_icon1.png";
import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const $: any = i18n.global;
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);

const activeIndex = ref(1);

const levelData = [
	{
		label: $.t(`vip['青铜']`),
		icon: icon_bronze,
	},
	{
		label: $.t(`vip['白银']`),
		icon: icon_silver,
	},
	{
		label: $.t(`vip['黄金']`),
		icon: icon_gold,
	},
	{
		label: $.t(`vip['白金I']`),
		icon: icon_platinium,
	},
	{
		label: $.t(`vip['白金II']`),
		icon: icon_platinium,
	},
	{
		label: $.t(`vip['钻石I']`),
		icon: icon_diamond,
	},
	{
		label: $.t(`vip['钻石II']`),
		icon: icon_diamond,
	},
	{
		label: $.t(`vip['钻石III']`),
		icon: icon_diamond,
	},
];

const toPath = (path) => {
	router.push(path);
};

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.vip_content {
	min-height: 100vh;
	padding: 40px 24px 116px;
	background: url("/@/assets/zh-CN/default/vip/vip_content_bg.png") center top / 100% 100% no-repeat;
	background-attachment: fixed; /* 背景图像固定 */
	box-sizing: border-box;

	.tips {
		p {
			@include themeify {
				color: themed("TB");
			}
			text-align: center;
			font-family: "PingFang SC";
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}

	.welfare_btn {
		width: 272px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 16px auto 0px;
		border-radius: 12px;
		border: 1px solid;
		@include themeify {
			border-color: themed("Theme");
			color: themed("Theme");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}

	.vip_card {
		position: relative;
		// height: 341px;
		margin-top: 24px;
		background: url("/@/assets/zh-CN/default/vip/crad_bg.png") center center / 100% 100% no-repeat;

		.vip_big {
			// float: right;
			// margin-top: 13px;
			// margin-right: 26px;
			position: absolute;
			top: 13px;
			right: 26px;
			width: 207px;
			height: 198.049px;
		}

		.head {
			padding-top: 24px;
			height: 48px;
			@include themeify {
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 500;

			.label {
				width: max-content;
				height: 100%;
				padding: 0px 18px;
				display: flex;
				align-items: center;
				border-radius: 18px 0px 18px 0px;
				border: 1px solid rgba(255, 255, 255, 0.2);
				background-color: radial-gradient(96.38% 171% at 50% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(102, 102, 102, 0) 100%);
				box-sizing: border-box;
			}
		}

		.vip_level {
			margin-top: 28px;
			padding: 0px 52px;
			text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			font-family: "112-SS Yi Fang Ti";
			font-size: 46px;
			font-style: normal;
			font-weight: 400;
			line-height: 40px;
			background: linear-gradient(90deg, #fdfdfd 6.39%, #bebebe 35.7%, #fdfdfd 66.76%, #979797 93.89%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.vip_level_progress {
			min-height: 34px;
			display: flex;
			align-items: center;
			gap: 12px;
			margin-top: 16px;
			padding: 0px 52px;
			@include themeify {
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;

			.warning_icon {
				width: 24px;
				height: 24px;
			}
		}

		.vip_progress {
			padding: 53px 56px 58px;
		}
	}
	.notify {
		width: 100%;
		min-height: 116px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 8px;
		margin-top: 36px;
		padding: 20px 66px;
		@include themeify {
			background: themed("vip_bg1");
		}
		border-radius: 20px;
		box-sizing: border-box;

		.lock {
			width: 36px;
			height: 36px;
			padding-right: 24px;
		}

		.text {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}

		.warning_icon {
			width: 30px;
			height: 30px;
			padding-left: 8px;
		}
	}

	.vip_rewards {
		margin-top: 36px;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 28px;

			.label {
				@include themeify {
					color: themed("Theme");
				}
				font-family: "PingFang SC";
				font-size: 36px;
				font-weight: 400;
			}

			img {
				width: 134px;
				height: 18px;
			}
		}

		.tips {
			margin-top: 24px;
			padding: 0px 40px;
			text-align: center;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}

		.level_grid {
			display: flex;
			flex-wrap: wrap;
			row-gap: 24px;
			column-gap: 70px;
			padding: 24px 22px;

			.item {
				flex: 1;
				min-width: 112px;

				.value_active {
					position: relative;
					box-sizing: border-box;

					&::after {
						content: "";
						position: absolute;
						top: 0px;
						left: 0px;
						width: 100%;
						height: 100%;
						border-radius: 20px;
						border: 2px solid #fa667e;
						box-sizing: border-box;
					}
				}

				.value {
					width: 106px;
					height: 106px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 20px;
					@include themeify {
						background: themed("vip_bg2");
					}
					box-sizing: border-box;
					.icon {
						width: 68px;
						height: 68px;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.label {
					display: flex;
					justify-content: center;
					margin-top: 10px;
					@include themeify {
						color: themed("T3");
					}
					font-family: "PingFang SC";
					font-size: 24px;
					font-weight: 400;
					line-height: 42px; /* 175% */
					white-space: nowrap; /* 禁止换行 */
				}
			}
		}

		.reward_list {
			display: grid;
			gap: 24px;
			.reward_list_header {
				position: relative;
				display: flex;
				gap: 10px;
				padding: 18px 24px;
				border-radius: 20px;
				@include themeify {
					background: themed("vip_bg2");
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 600;
				overflow: hidden;
				&::after {
					content: "";
					position: absolute;
					top: 50%;
					left: 0px;
					transform: translate(0, -50%);
					width: 6px;
					height: 48px;
					border-radius: 0px 4px 4px 0px;
					background: #ddae96;
				}
			}

			.reward_cell {
				position: relative;
				width: 100%;
				min-height: 156px;
				display: grid;
				column-gap: 24px;
				row-gap: 12px;
				grid-template-columns: auto 1fr;
				grid-template-rows: auto auto;
				grid-template-areas:
					"icon label"
					"icon value";
				padding: 20px 24px;
				border-radius: 20px;
				@include themeify {
					background: url("../../../assets/zh-CN/default/vip/reward_cell_bg.png") center bottom / 100% 156px no-repeat, themed("vip_bg2");
				}
				box-sizing: border-box;

				&::after {
					content: "";
					position: absolute;
					top: 0px;
					left: 43px;
					width: 400px;
					height: 1px;
					background: url("../../../assets/zh-CN/default/vip/bg_line_top.png") center center / 100% 100% no-repeat;
				}

				&::before {
					content: "";
					position: absolute;
					bottom: 0px;
					right: 20px;
					width: 400px;
					height: 1px;
					background: url("../../../assets/zh-CN/default/vip/bg_line_bottom.png") center center / 100% 100% no-repeat;
				}

				.icon {
					position: relative;
					grid-area: icon;
					align-self: center;
					width: 74px;
					height: 74px;
					border-radius: 18px;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
					.mask {
						position: absolute;
						top: 0px;
						left: 0px;
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: rgba(0, 0, 0, 0.8);
						.lock {
							width: 36px;
							height: 36px;
						}
					}
				}

				.label {
					grid-area: label;
					align-self: end;
					@include themeify {
						color: themed("TB");
					}
					font-family: "PingFang SC";
					font-size: 30px;
					font-weight: 500;
				}

				.value {
					grid-area: value;
					align-self: start;
					@include themeify {
						color: themed("T1");
					}
					font-family: "PingFang SC";
					font-size: 24px;
					font-weight: 400;
					.num {
						@include themeify {
							color: themed("Hint");
						}
					}
				}
			}

			.reward_cell_light {
				position: relative;
				width: 100%;
				min-height: 156px;
				display: grid;
				column-gap: 24px;
				row-gap: 12px;
				grid-template-columns: auto 1fr;
				grid-template-rows: auto auto;
				grid-template-areas:
					"icon label"
					"icon value";
				padding: 20px 24px;
				border-radius: 20px;
				@include themeify {
					background: themed("vip_bg2");
				}
				box-sizing: border-box;

				.icon {
					position: relative;
					grid-area: icon;
					align-self: center;
					width: 74px;
					height: 74px;
					border-radius: 18px;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
					.mask {
						position: absolute;
						top: 0px;
						left: 0px;
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: rgba(0, 0, 0, 0.8);
						.lock {
							width: 36px;
							height: 36px;
						}
					}
				}

				.label {
					grid-area: label;
					align-self: end;
					@include themeify {
						color: themed("TB");
					}
					font-family: "PingFang SC";
					font-size: 30px;
					font-weight: 500;
				}

				.value {
					grid-area: value;
					align-self: start;
					@include themeify {
						color: themed("T1");
					}
					font-family: "PingFang SC";
					font-size: 24px;
					font-weight: 400;
					.num {
						@include themeify {
							color: themed("Hint");
						}
					}
				}
			}
		}
		.vip_rewards_btn {
			width: 640px;
			height: 86px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 36px auto 0px;
			border-radius: 12px;
			border: 1px solid;
			@include themeify {
				border-color: themed("Theme");
				color: themed("Theme");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 400;
			box-sizing: border-box;
		}
	}
}
</style>
