<template>
	<div class="tabList">
		<div class="border">
			<img :src="tab_border" alt="" />
		</div>
		<div v-for="(item, index) in tabData" :key="index" :class="{ item: item.path != '/home', 'home-item': item.path == '/home' }" @click="toPath(item)">
			<div v-if="item.path != '/home'" class="content" :class="{ active: item.path == route.path }">
				<div v-if="item.path == route.path" class="line"><img :src="line" alt="" /></div>
				<div class="icon"><img :src="item.path != route.path ? item.icon : item.active_icon" alt="" /></div>
				<span class="label" :class="{ label_active: item.path == route.path }">{{ item.label }}</span>
			</div>

			<div v-else class="content" :class="{ active: item.path == route.path }">
				<div class="home-icon"><img :src="item.path != route.path ? item.icon : item.active_icon" alt="" /></div>
				<span class="label" :class="{ label_active: item.path == route.path }">{{ item.label }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import discount from "/@/assets/zh-CN/default/layout/discount.png";
import discount_active from "/@/assets/zh-CN/default/layout/discount_active.png";
import records from "/@/assets/zh-CN/default/layout/records.png";
import records_active from "/@/assets/zh-CN/default/layout/records_active.png";
import home from "/@/assets/zh-CN/default/layout/home.png";
import home_active from "/@/assets/zh-CN/default/layout/home_active.png";
import wallet from "/@/assets/zh-CN/default/layout/wallet.png";
import wallet_active from "/@/assets/zh-CN/default/layout/wallet_active.png";
import my from "/@/assets/zh-CN/default/layout/my.png";
import my_active from "/@/assets/zh-CN/default/layout/my_active.png";
import tab_border from "/@/assets/zh-CN/default/layout/tab_border.png";
import line from "/@/assets/zh-CN/default/layout/line.png";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";

const route = useRoute();
const router = useRouter();
const $: any = i18n.global;

console.log("route", route);

const toPath = (item) => {
	router.push(item.path);
};

const tabData = [
	{
		icon: discount,
		active_icon: discount_active,
		label: $.t('layout["优惠"]'),
		path: "/discount",
	},
	{
		icon: records,
		active_icon: records_active,
		label: $.t('layout["记录"]'),
		path: "/records",
	},
	{
		icon: home,
		active_icon: home_active,
		label: $.t('layout["首页"]'),
		path: "/home",
	},
	{
		icon: wallet,
		active_icon: wallet_active,
		label: $.t('layout["钱包"]'),
		path: "/wallet",
	},
	{
		icon: my,
		active_icon: my_active,
		label: $.t('layout["我的"]'),
		path: "/my",
	},
];
</script>

<style scoped lang="scss">
.tabList {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 103px;
	display: flex;
	background-color: #2f3032;
	border-radius: 28px 28px 0px 0px;

	.border {
		position: absolute;
		top: -35px;
		width: 100%;
		z-index: -1;
	}

	.item {
		position: relative;
		flex: 1;
		cursor: pointer;

		.content {
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		.active {
			background: url("../../assets/zh-CN/default/layout/item_bg.png") center center no-repeat;
			background-size: 100% 100%;
		}

		.line {
			position: absolute;
			width: 50px;
			height: 3px;
		}

		.icon {
			width: 36px;
			height: 36px;
			margin-top: 15px;
		}
	}
	.home-item {
		width: 166px;
		display: flex;
		align-items: center;
		flex-direction: column;
		cursor: pointer;

		.content {
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		.active {
			background: url("../../assets/zh-CN/default/layout/home_item_bg.png") center center no-repeat;
			background-size: 100% 100%;
		}
		.home-icon {
			position: absolute;
			top: -28px;
			width: 90px;
			height: 90px;
		}

		.label {
			position: absolute;
			bottom: 5px;
		}
	}

	.label {
		margin-top: 6px;
		text-align: center;
		font-family: "PingFang SC";
		font-size: 22px;
		font-weight: 400;
		@include themeify {
			color: themed("Tag2");
		}
	}

	.label_active {
		@include themeify {
			color: themed("Theme-P");
		}
	}
}

img {
	width: 100%;
	height: 100%;
}
</style>
