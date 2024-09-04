<template>
	<div class="table-container">
		<table class="styled-table">
			<thead>
				<tr>
					<th></th>
					<th v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">{{ item.vipRankNameI18nCode }}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ $t(`vip['升级奖励']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.upgradeFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
				<tr>
					<td>{{ $t(`vip['幸运转盘']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.luckFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
				<tr>
					<td>{{ $t(`vip['每周流水礼金']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.weekAmountFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
				<tr>
					<td>{{ $t(`vip['每月流水礼金']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.monthAmountFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
				<tr>
					<td>{{ $t(`vip['周体育流水礼金']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.weekSportFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
				<tr>
					<td>{{ $t(`vip['SVIP专属福利']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.svipWelfareFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
				<tr>
					<td>{{ $t(`vip['豪华赠品']`) }}</td>
					<td v-for="(item, index) in state.userVipInfo.vipBenefit" :key="index">
						<img v-if="item.luxuriousGiftsFlag != 0" :src="item.icon" />
						<span v-else>-</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import vipRankCodeIcon_0 from "/@/assets/zh-CN/default/vip/vipRewards/vipRankCodeIcon_0.png";
import vipRankCodeIcon_1 from "/@/assets/zh-CN/default/vip/vipRewards/vipRankCodeIcon_1.png";
import vipRankCodeIcon_2 from "/@/assets/zh-CN/default/vip/vipRewards/vipRankCodeIcon_2.png";
import vipRankCodeIcon_3 from "/@/assets/zh-CN/default/vip/vipRewards/vipRankCodeIcon_3.png";
import vipRankCodeIcon_4 from "/@/assets/zh-CN/default/vip/vipRewards/vipRankCodeIcon_4.png";
import { vipApi } from "/@/api/vip";
import common from "/@/utils/common";
import { i18n } from "/@/i18n/index";
import { VIP } from "/@/views/vip/interface";
const $: any = i18n.global;

const state = reactive({
	userVipInfo: {} as VIP,
});

// 获取VIP信息
const getUserVipInfo = async () => {
	const res = await vipApi.getUserVipInfo().catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		state.userVipInfo = res.data;
		state.userVipInfo.vipBenefit.forEach((item) => {
			if (item.vipRankCode == 0) {
				item.icon = vipRankCodeIcon_0;
			} else if (item.vipRankCode == 1) {
				item.icon = vipRankCodeIcon_1;
			} else if (item.vipRankCode == 2) {
				item.icon = vipRankCodeIcon_2;
			} else if (item.vipRankCode == 3) {
				item.icon = vipRankCodeIcon_3;
			} else if (item.vipRankCode == 4) {
				item.icon = vipRankCodeIcon_3;
			} else if (item.vipRankCode == 5) {
				item.icon = vipRankCodeIcon_4;
			} else if (item.vipRankCode == 6) {
				item.icon = vipRankCodeIcon_4;
			} else if (item.vipRankCode == 7) {
				item.icon = vipRankCodeIcon_4;
			}
		});
	}
};

getUserVipInfo();
</script>

<style scoped lang="scss">
/* 表格容器样式 */
.table-container {
	overflow-x: auto; /* 启用横向滚动条 */
	width: 100%; /* 确保容器宽度为100% */
}

/* 表格整体样式 */
.styled-table {
	min-width: 1787px;
	border-collapse: collapse;
	width: 100%;
	border-radius: 20px; /* 圆角属性 */
	border-collapse: separate; /* 使用 separate 确保圆角效果 */
	border-spacing: 0; /* 设置为0来减少间距 */
	overflow: hidden; /* 确保圆角生效 */
	border: 1px solid;
	box-sizing: border-box;
	@include themeify {
		border-color: themed("Line");
	}
}

/* 表头样式 */
.styled-table thead {
	@include themeify {
		background-color: themed("BG1");
	}
}

.styled-table thead th {
	height: 86px;
	padding: 18px 24px; /* 单元格内边距 */
	text-align: center; /* 标题居中 */
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 500;
	border-bottom: 1px solid;
	border-left: 1px solid;
	@include themeify {
		color: themed("TB");
		border-color: themed("Line");
	}
	box-sizing: border-box;

	&:first-child {
		border-left: none;
	}
}

/* 表格主体行样式 */
.styled-table tbody tr {
	height: 76px;
	@include themeify {
		background-color: themed("BG1");
	}
}

/* 第一列样式 */
.styled-table tbody td:first-child {
	width: 259px;
	text-align: left;
	padding: 18px 24px; /* 单元格内边距 */
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 500;
	border-bottom: 1px solid;
	border-left: none;
	@include themeify {
		color: themed("TB");
		border-color: themed("Line");
		background-color: themed("BG3");
	}
}

/* 其余列样式 */
.styled-table td:not(:first-child) {
	width: 191px;
	text-align: center;
	padding: 18px 24px; /* 单元格内边距 */
	border-bottom: 1px solid;
	border-left: 1px solid;
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 500;
	@include themeify {
		color: themed("T3");
		background-color: themed("BG3");
		border-color: themed("Line");
	}
	img {
		width: 40px;
		height: 40px;
		margin: 0px auto;
	}
}

/* 确保表头和表格主体的圆角效果一致 */
.styled-table thead th:first-child {
	border-top-left-radius: 20px; /* 左上角圆角 */
}

.styled-table thead th:last-child {
	border-top-right-radius: 20px; /* 右上角圆角 */
}
</style>
