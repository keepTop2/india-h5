<template>
	<div class="tabList">
		<!-- 边框区域 -->
		<div class="border">
			<img :src="tab_border" />
		</div>
		<!-- 遍历 tabData 渲染每个 tab 项 -->
		<div v-for="(item, index) in tabData" :key="index" :class="{ item: item.path !== '/home', 'home-item': item.path === '/home' }" @click="toPath(item)">
			<!-- 非首页的 tab 项 -->
			<div v-if="item.path !== '/home'" class="content" :class="getHighlightBG(item)">
				<!-- 显示高亮的分隔线 -->
				<div v-if="getHighlightLine(item)" class="line">
					<img :src="line" />
				</div>
				<!-- 显示图标 -->
				<div class="icon">
					<img :src="getHighlightStatus(item)" />
				</div>
				<!-- 显示标签 -->
				<span class="label" :class="getHighlightClass(item)">
					{{ item.label }}
				</span>
			</div>

			<!-- 首页的 tab 项 -->
			<div v-else class="content" :class="{ active: item.path === route.path }">
				<!-- 显示首页的图标 -->
				<div class="home-icon">
					<img :src="item.path !== route.path ? item.icon : item.active_icon" />
				</div>
				<!-- 显示首页的标签 -->
				<span class="label" :class="{ label_active: item.path === route.path }">
					{{ item.label }}
				</span>
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

// 钱包二级页
const walletPaths = ["/wallet/recharge", "/wallet/withdraw", "/wallet/records"];

// 检查 tab 项是否活跃
const isActivePath = (itemPath) => {
	// 钱包相关路径
	// 判断当前路径是否为 itemPath 或者 itemPath 是否为钱包相关路径且当前路径在钱包路径中
	return itemPath === route.path || (itemPath === "/wallet" && walletPaths.includes(route.path));
};

// 获取 tab 项的图标
const getHighlightStatus = (item) => {
	if (item.path === "/wallet" && walletPaths.includes(route.path)) {
		return item.active_icon;
	}
	return item.path === route.path ? item.active_icon : item.icon;
};

// 获取 tab 项的背景色
const getHighlightBG = (item) => {
	// 如果 tab 项活跃，则返回 "active" 类，否则返回空字符串
	if (isActivePath(item.path)) return "active";
};

// 获取 tab 项的标签样式
const getHighlightClass = (item) => {
	// 如果 tab 项活跃，则返回 "label_active" 类，否则返回空字符串
	if (isActivePath(item.path)) return "label_active";
};

// 判断是否显示高亮分隔线
const getHighlightLine = (item) => {
	// 如果 item.path 是 "/wallet" 且当前路径在钱包路径中，则返回 true，否则返回 false
	if (item.path === "/wallet" && walletPaths.includes(route.path)) {
		return true;
	}
	if (item.path === route.path) return true;
};

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
	height: 97px;
	display: flex;
	border-radius: 28px 28px 0px 0px;
	z-index: 99;

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
			background: url("/@/assets/zh-CN/default/layout/item_bg.png") center center no-repeat;
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
			background: url("/@/assets/zh-CN/default/layout/home_item_bg.png") center center no-repeat;
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
			bottom: 1px;
		}
	}

	.label {
		margin-top: 6px;
		text-align: center;
		font-family: "PingFang SC";
		font-size: 22px;
		font-weight: 400;
		@include themeify {
			color: themed("T3");
		}
	}

	.label_active {
		@include themeify {
			color: themed("Theme");
		}
	}
}

img {
	width: 100%;
	height: 100%;
}
</style>
