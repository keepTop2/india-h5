<template>
	<VantNavBar :title="$t(`VantNavBar['VIP等级制度']`)" @onClickLeft="onClickLeft"></VantNavBar>

	<div class="content">
		<Collapse v-for="(item, index) in vipHierarchyData" :key="index">
			<template #header>
				<div class="header">
					<div>
						<span>{{ item.title }}</span>
						<span>VIP</span>
						<span>{{ item.level }}</span>
					</div>
					<SvgIcon class="arrow" iconName="/vip/vipRewards/arrow" />
				</div>
			</template>
			<template #content>
				<div class="content_header">
					<span>{{ $t('vipHierarchy["等级"]') }}</span>
					<span>{{ $t('vipHierarchy["所需经验"]') }}</span>
					<span>{{ $t('vipHierarchy["升级奖金"]') }}$</span>
				</div>

				<div class="content_cell" v-for="(i, index) in item.list" :key="idx">
					<div>
						<img class="icon" :src="i.icon" alt="" />
						<span>{{ i.level }}</span>
					</div>
					<div>{{ i.experience }}</div>
					<div>{{ i.bonus }}</div>
				</div>
			</template>
		</Collapse>
	</div>
</template>

<script setup lang="ts">
import icon_bronze from "/@/assets/zh-CN/default/vip/icon_bronze.png";
import icon_silver from "/@/assets/zh-CN/default/vip/icon_silver.png";
import icon_gold from "/@/assets/zh-CN/default/vip/icon_gold.png";
import icon_platinium from "/@/assets/zh-CN/default/vip/icon_platinium.png";
import icon_diamond from "/@/assets/zh-CN/default/vip/icon_diamond.png";
import Collapse from "./Collapse/index.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const vipHierarchyData = [
	{
		title: "青铜",
		level: "2-7",
		list: [
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_bronze,
			},
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_bronze,
			},
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_bronze,
			},
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_bronze,
			},
		],
	},
	{
		title: "白银",
		level: "8-21",
		list: [
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_silver,
			},
		],
	},
	{
		title: "黄金",
		level: "2-7",
		list: [
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_gold,
			},
		],
	},
	{
		title: "铂金",
		level: "2-7",
		list: [
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_platinium,
			},
		],
	},
	{
		title: "钻石",
		level: "2-7",
		list: [
			{
				level: "VIP2",
				experience: 100,
				bonus: 0.5,
				icon: icon_diamond,
			},
		],
	},
];

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.content {
	display: grid;
	row-gap: 20px;
	padding: 20px 24px 36px;

	:deep(.accordion-item) {
		border-radius: 0px 0px 20px 20px;

		.accordion-body {
			@include themeify {
				background: themed("BG3");
			}
			padding: 16px 20px;
		}
	}
}

.header {
	position: relative;
	width: 100%;
	height: 76px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 24px;
	border-radius: 20px 20px 0px 0px;
	background: linear-gradient(90deg, #353a3e 0%, #2c2d2e 100%);
	box-sizing: border-box;

	&::after {
		content: "";
		position: absolute;
		left: 0px;
		width: 6px;
		height: 48px;
		border-radius: 0px 4px 4px 0px;
		background: #ddae96;
	}

	div {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 12px;
		span {
			@include themeify {
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 600;
		}
	}

	.arrow {
		width: 24px;
		height: 24px;
	}
}

.content_header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 22px;
	padding: 20px 24px;
	box-sizing: border-box;

	span {
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 26px;
		font-weight: 400;
		display: inline-block;
	}

	span:nth-child(1) {
		width: 182px;
		text-align: start;
	}
	span:nth-child(2) {
		width: 198px;
		text-align: center;
	}
	span:nth-child(3) {
		width: 190px;
		text-align: end;
	}
}

.content_cell {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 22px;
	padding: 20px 24px;
	box-sizing: border-box;
	&:nth-child(even) {
		border-radius: 16px;
		@include themeify {
			background-color: themed("BG1");
		}
	}
	div {
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 26px;
		font-weight: 400;
		display: inline-block;
	}

	div:nth-child(1) {
		width: 182px;
		display: flex;
		align-items: center;
		gap: 12px;
		text-align: start;

		.icon {
			width: 40px;
			height: 40px;
		}
	}
	div:nth-child(2) {
		width: 198px;
		text-align: center;
	}
	div:nth-child(3) {
		width: 190px;
		text-align: end;
		@include themeify {
			color: themed("TB");
		}
	}
}
</style>
