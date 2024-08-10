<template>
	<VantNavBar :title="$t(`VantNavBar['勋章收藏者']`)" @onClickLeft="onClickLeft" />
	<div class="treasure_card">
		<div class="treasure_list">
			<div class="treasure_item" v-for="(item, index) in treasureData" :key="index">
				<div class="icon">
					<VantLazyImg :src="item.icon" />
				</div>
				<div class="value">{{ index }}</div>
				<div class="arrow">
					<VantLazyImg v-if="index == 0" :src="arrow" />
				</div>
			</div>
		</div>
		<div class="progress">
			<div class="value" :style="`width: ${10}%`"></div>
		</div>

		<div class="text_list">
			<div class="tip">
				<VantLazyImg :src="tips_icon" />
			</div>
			<i18n-t v-for="(item, index) in 4" :key="index" keypath="medalCollection.解锁勋章" :tag="'p'">
				<template v-slot:value>
					<span class="text">{{ $t("medalCollection.枚", { value: item }) }}</span>
				</template>
				<template v-slot:num>{{ item }} </template>
			</i18n-t>
		</div>
	</div>

	<div class="unlocked_content">
		<div class="unlocked_header">
			<span class="title">{{ $t('medalCollection["已解锁"]') }}</span>
			<span class="tips">{{ $t('medalCollection["(您还未获得任何勋章，积极玩游戏获得更多勋章)"]') }}</span>
		</div>
		<div class="medal_list">
			<div class="medal_item">
				<i></i>
				<div class="bg"></div>
				<div class="icon">
					<VantLazyImg :src="medal" />
				</div>
				<div class="name">铁粉</div>
			</div>
		</div>
	</div>
	<div class="no_unlocked_content">
		<div class="no_unlocked_header">
			<span class="title">{{ $t('medalCollection["未解锁"]') }}</span>
			<span class="tips">{{ $t('medalCollection["(提示：点击勋章图标查看勋章奖励和详情)"]') }}</span>
		</div>
		<div class="medal_list">
			<div class="medal_item">
				<i></i>
				<div class="bg"></div>
				<div class="icon">
					<VantLazyImg :src="medal" />
				</div>
				<div class="name">铁粉</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import medal from "/@/assets/zh-CN/default/my/medal.png";
import funnel from "/@/assets/zh-CN/default/my/medalCollection/funnel.png";
import arrow from "/@/assets/zh-CN/default/my/medalCollection/arrow.png";
import tips_icon from "/@/assets/zh-CN/default/my/medalCollection/tips_icon.png";
import treasure_box from "/@/assets/zh-CN/default/my/medalCollection/treasure_box.png";
import treasure_box_no from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_no.png";
import treasure_box_open from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_open.png";
import { useRouter } from "vue-router";
const router = useRouter();

const treasureData = [
	{
		icon: funnel,
	},
	{
		icon: treasure_box_open,
	},
	{
		icon: treasure_box,
	},
	{
		icon: treasure_box_no,
	},
	{
		icon: treasure_box_no,
	},
];

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.treasure_card {
	margin: 36px 24px 0px;
	padding: 23px 23px 24px;
	border-radius: 18px;
	background-image: linear-gradient(180deg, #2c2d2e 0%, #353a3e 100%);
	.treasure_list {
		display: flex;
		gap: 34px;

		.treasure_item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.icon {
				width: 104px;
				height: 104px;

				img {
					width: 100%;
					height: 100%;
				}
			}
			.value {
				@include themeify {
					color: themed("TB");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 24px;
				font-style: normal;
				font-weight: 500;
				line-height: 34px; /* 141.667% */
			}
			.arrow {
				width: 16px;
				height: 16px;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.progress {
		position: relative;
		width: 100%;
		height: 12px;
		border-radius: 12px;
		@include themeify {
			background: themed("BG3");
		}
		.value {
			position: absolute;
			top: 0px;
			left: 0px;
			height: 12px;
			border-radius: 12px;
			@include themeify {
				background: themed("Theme");
			}
		}
	}

	.text_list {
		position: relative;
		margin-top: 23px;

		.tip {
			position: absolute;
			top: 2px;
			right: 4px;
			width: 30px;
			height: 30px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		p {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 42px;
			span {
				@include themeify {
					color: themed("Theme");
				}
			}
		}
	}
}
.unlocked_content,
.no_unlocked_content {
	margin: 36px 24px 0px;
	padding-bottom: 24px;
	.unlocked_header,
	.no_unlocked_header {
		display: flex;
		align-items: center;
		gap: 8px;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 500;
		.tips {
			font-size: 24px;
			font-weight: 400;
			@include themeify {
				color: themed("T3");
			}
		}
	}
	.no_unlocked_header {
		.tips {
			font-size: 24px;
			font-weight: 400;
			@include themeify {
				color: themed("Theme");
			}
		}
	}

	.medal_list {
		padding: 24px 0px;
		.medal_item {
			position: relative;
			width: 160px;
			height: 196px;

			background: url("/@/assets/zh-CN/default/my/medalCollection/highlight_bg.png") no-repeat center bottom;
			background-size: 160px 160px;

			.bg {
				position: absolute;
				top: -17px;
				left: 50%;
				transform: translate(-50%, 0%);
				width: 162px;
				height: 162px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: url("/@/assets/zh-CN/default/my/medalCollection/highlight.png") no-repeat center bottom;
				background-size: 162px 162px;
				/* 添加旋转和缩放动画 */
				animation: rotateIcon 4s linear infinite;
			}
			.icon {
				position: absolute;
				top: -17px;
				left: 50%;
				transform: translate(-50%, 0%);
				width: 162px;
				height: 162px;
				display: flex;
				align-items: center;
				justify-content: center;
				animation: scaleIcon 1.5s ease-in-out infinite;

				img {
					width: 116px;
					height: 127px;
				}
			}
			i {
				position: absolute;
				top: 0px;
				right: 33px;
				width: 16px;
				height: 16px;
				border: 2px solid #fff;
				border-radius: 50%;
				@include themeify {
					background: themed("Theme");
				}
				z-index: 1;
				box-sizing: border-box;
			}
			.name {
				padding-top: 142px;
				@include themeify {
					color: themed("T3");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 20px;
				font-weight: 400;
			}
		}
	}
}
.unlocked_content {
	border-bottom: 1px solid;
	@include themeify {
		border-color: themed("Line");
	}
}

/* 旋转动画 */
@keyframes rotateIcon {
	0% {
		transform: translate(-50%, 0%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, 0%) rotate(180deg);
	}
}

/* 缩放动画 */
@keyframes scaleIcon {
	0%,
	100% {
		transform: translate(-50%, 0%) scale(1);
	}
	50% {
		transform: translate(-50%, 0%) scale(1.13);
	}
}
</style>
