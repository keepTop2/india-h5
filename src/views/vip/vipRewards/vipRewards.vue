<template>
	<VantNavBar :title="$t(`VantNavBar['VIP俱乐部']`)" @onClickLeft="onClickLeft"></VantNavBar>

	<div class="vipRewards_content">
		<div class="banner">
			<div class="title">{{ $t(`vipRewards["VIP专属福利"]`) }}</div>
			<p class="text">{{ $t(`vipRewards["加入我们"]`) }}</p>

			<div class="btns">
				<div class="btn1" @click="router.push('/')">{{ $t(`vipRewards["去玩游戏"]`) }}</div>
				<div class="btn2" @click="router.push('/vipHierarchy')">{{ $t(`vipRewards["查看详情"]`) }}</div>
			</div>
		</div>

		<div class="list">
			<div :class="theme === ThemeEnum.default ? 'card_default' : ''" class="card" v-for="(item, index) in welfareList" :key="index">
				<div class="icon">
					<VantLazyImg :src="item.icon" />
				</div>
				<div class="content">
					<div class="title">{{ item.title }}</div>
					<div class="text">{{ item.text }}</div>
				</div>
			</div>
		</div>

		<div class="table">
			<div class="title">{{ $t(`vipRewards["VIP奖励明细"]`) }}</div>
			<Table />
		</div>

		<div class="footer">
			<!-- 赞助 -->
			<Sponsor />
			<!-- 转账方式 -->
			<Currency />
			<!-- 负责任游戏 -->
			<Footer />
		</div>
	</div>
</template>

<script setup lang="ts">
import Table from "./components/table.vue";
// 赞助
import Sponsor from "/@/views/home/Sponsor/sponsor.vue";
// 转账方式
import Currency from "/@/views/home/Currency/Currency.vue";
// 负责任游戏
import Footer from "/@/views/home/Footer/Footer.vue";

import icon1 from "/@/assets/zh-CN/default/vip/vipRewards/icon1.png";
import icon2 from "/@/assets/zh-CN/default/vip/vipRewards/icon2.png";
import icon3 from "/@/assets/zh-CN/default/vip/vipRewards/icon3.png";
import icon4 from "/@/assets/zh-CN/default/vip/vipRewards/icon4.png";

import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const $: any = i18n.global;
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);

const welfareList = [
	{
		title: $.t(`vipRewards['加密货币免费提现']`),
		text: $.t(`vipRewards['解锁 VIP 38 的加密货币免费提款特权轻松提取您的奖金，无需支付额外费用。']`),
		icon: icon1,
	},
	{
		title: $.t(`vipRewards['奖励幸运旋转']`),
		text: $.t(`vipRewards['旋转轮盘，随着您等级的提高，通过我们激动人心的幸运旋转获得更大的奖品。']`),
		icon: icon2,
	},
	{
		title: $.t(`vipRewards['惊人的升级奖金']`),
		text: $.t(`vipRewards['惊喜的奖励正在等着你，随着你等级的提升，奖励会被多次解锁。']`),
		icon: icon3,
	},
	{
		title: $.t(`vipRewards['专属 VIP 接待员']`),
		text: $.t(`vipRewards['解锁 VIP 38 的免费提款特权，享受 VIP 主机的个性化关注和专属福利。']`),
		icon: icon4,
	},
];

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.vipRewards_content {
	min-height: 100vh;
	padding-bottom: 100px;
	background: url("/@/assets/zh-CN/default/vip/vip_content_bg.png") center top / 100% 100% no-repeat;
	background-attachment: fixed; /* 背景图像固定 */
	box-sizing: border-box;
}

.banner {
	position: relative;
	width: 100%;
	height: 938px;
	background: url("/@/assets/zh-CN/default/vip/vipRewards/vipRewards_bg.png") center center / 100% 100% no-repeat;
	text-align: center;

	.title {
		padding-top: 70px;
		text-shadow: 0px 6px 6px rgba(0, 0, 0, 0.1);
		font-family: "PingFang SC";
		font-size: 60px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		text-transform: uppercase;
		background: linear-gradient(180deg, #feeed5 50%, #e8c192 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.text {
		padding: 13px 65px 0px;
		color: #fff;
		text-align: center;
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 500;
	}

	.btns {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 24px;
		bottom: 24px;

		.btn1 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 295px;
			height: 86px;
			border-radius: 12px;
			@include themeify {
				background: themed("Theme");
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 400;
		}
		.btn2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 295px;
			height: 86px;
			border-radius: 12px;
			@include themeify {
				background: transparent;
				color: themed("Theme");
				border: 1px solid themed("Theme");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 400;
		}
	}
}

.list {
	display: grid;
	padding: 24px;
	gap: 24px;

	.card {
		position: relative;
		width: 100%;
		min-height: 224px;
		display: flex;
		align-items: center;
		padding: 20px 0px;
		border-radius: 20px;
		@include themeify {
			background: themed("vip_bg3");
		}
		box-sizing: border-box;

		.icon {
			width: 150px;
			height: 150px;
			padding: 0px 24px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			max-width: 432px;
			text-align: center;
			.title {
				margin-top: 28px;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 30px;
				font-weight: 600;
			}
			.text {
				margin-top: 16px;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 20px;
				font-weight: 400;
			}
		}
	}
	.card_default {
		&::after {
			content: "";
			position: absolute;
			top: 0px;
			left: 43px;
			width: 400px;
			height: 1px;
			background: url("/@/assets/zh-CN/default/vip/bg_line_top.png") center center / 100% 100% no-repeat;
		}

		&::before {
			content: "";
			position: absolute;
			bottom: 0px;
			right: 20px;
			width: 400px;
			height: 1px;
			background: url("/@/assets/zh-CN/default/vip/bg_line_bottom.png") center center / 100% 100% no-repeat;
		}
	}
}

.table {
	padding: 0px 24px;

	.title {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 36px;
		font-weight: 600;
		margin-bottom: 24px;
	}
}

.footer {
	padding: 0px 30px;
}
</style>
