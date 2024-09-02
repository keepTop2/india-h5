<template>
	<VantNavBar :title="$t(`VantNavBar['VIP等级制度']`)" @onClickLeft="onClickLeft"></VantNavBar>

	<div class="content">
		<Collapse v-for="(item, index) in state.vipHierarchyData.siteVIPSystemRankVOList" :key="index">
			<template #header>
				<div class="header" :class="getClass(item)">
					<div>
						<span>{{ item.vipRankNameI18nCode }}</span>
						<span>VIP</span>
						<span>{{ item.minVipGrade }}-{{ item.maxVipGrade }}</span>
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

				<div class="content_cell" v-for="(i, idx) in item.siteVIPGradeVOList" :key="idx">
					<div>
						<img class="icon" :src="i.picIcon" alt="" />
						<span>{{ i.vipGradeName }}</span>
					</div>
					<div>{{ i.upgradeXp }}</div>
					<div>{{ i.upgradeBonus }}</div>
				</div>
			</template>
		</Collapse>
	</div>
</template>

<script setup lang="ts">
import { vipApi } from "/@/api/vip";
import common from "/@/utils/common";
import icon_bronze from "/@/assets/zh-CN/default/vip/icon_bronze.png";
import icon_silver from "/@/assets/zh-CN/default/vip/icon_silver.png";
import icon_gold from "/@/assets/zh-CN/default/vip/icon_gold.png";
import icon_platinium from "/@/assets/zh-CN/default/vip/icon_platinium.png";
import icon_diamond from "/@/assets/zh-CN/default/vip/icon_diamond.png";
import Collapse from "./Collapse/index.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const state = reactive({
	vipHierarchyData: {},
});

const getUserVipBenefitDetail = async () => {
	const res = await vipApi.getUserVipBenefitDetail().catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		state.vipHierarchyData = res.data;
	}
};

const getClass = (item) => {
	if (item.vipRankCode === 0) {
		return "icon_0";
	} else if (item.vipRankCode === 1) {
		return "icon_1";
	} else if (item.vipRankCode === 2) {
		return "icon_2";
	} else if (item.vipRankCode === 3) {
		return "icon_3";
	} else if (item.vipRankCode === 4) {
		return "icon_3";
	} else if (item.vipRankCode === 5) {
		return "icon_4";
	} else if (item.vipRankCode === 6) {
		return "icon_4";
	} else if (item.vipRankCode === 7) {
		return "icon_4";
	}
};

getUserVipBenefitDetail();

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
	@include themeify {
		background: themed("vip_bg2");
	}
	box-sizing: border-box;

	div {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 12px;
		span {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 600;
		}
	}

	.arrow {
		width: 24px;
		height: 24px;
		@include themeify {
			color: themed("TB");
		}
		svg {
			width: 100%;
			height: 100%;
		}
	}
}

.icon_0,
.icon_1,
.icon_2,
.icon_3,
.icon_4 {
	&::after {
		content: "";
		position: absolute;
		left: 0px;
		width: 6px;
		height: 48px;
		border-radius: 0px 4px 4px 0px;
	}
}
.icon_0 {
	&::after {
		background: #ddae96;
	}
}
.icon_1 {
	&::after {
		background: #abe3ff;
	}
}
.icon_2 {
	&::after {
		background: #fcab1c;
	}
}
.icon_3 {
	&::after {
		background: #83f0f6;
	}
}
.icon_4 {
	&::after {
		background: #dbb4f5;
	}
}

.content_header {
	height: 76px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 22px;
	padding: 0px 24px;
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
