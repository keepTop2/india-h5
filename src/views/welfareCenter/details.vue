<template>
	<!-- 活动 -->
	<div>
		<VantNavBar :title="$t(`welfareCenter['福利中心']`)" @onClickLeft="router.back()" />
	</div>
	<div class="content">
		<div class="amount mb_28">
			+{{ detailsInfo?.amount }}&nbsp; <span class="fs_32"> {{ detailsInfo?.currencyCode }}</span>
		</div>
		<div class="card">
			<div class="cell flex">
				<div class="color_T1">{{ $t(`welfareCenter['状态']`) }}</div>
				<div :class="'status' + detailsInfo?.receiveStatus">{{ detailsInfo?.receiveStatusText }}</div>
			</div>
			<div class="cell flex">
				<div class="color_T1">{{ $t(`welfareCenter['福利类型']`) }}</div>
				<div class="color_TB">{{ detailsInfo?.welfareCenterRewardTypeText }}</div>
			</div>
		</div>
		<div class="card">
			<div class="cell flex">
				<div class="color_T1">
					{{ $t(`welfareCenter['发放时间']`) }}

					{{ detailsInfo?.receiveStatus == 1 ? $t(`welfareCenter['领取时间']`) : detailsInfo?.receiveStatus == 2 ? $t(`welfareCenter['过期时间']`) : $t(`welfareCenter['发放时间']`) }}
				</div>
				<div class="color_TB">{{ dayjs(detailsInfo?.receiveStatus == 2 ? detailsInfo?.pfEndTime : detailsInfo?.pfTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
			</div>
			<div class="cell flex">
				<div class="color_T1">{{ $t(`welfareCenter['订单号']`) }}</div>
				<div class="color_TB orderNo ellipsis">
					<span>{{ detailsInfo?.orderNo }}</span>
				</div>
				<SvgIcon iconName="common/copy2" size="40px" @click="copyOrder(detailsInfo?.orderNo)" />
			</div>
		</div>

		<Button class="mt_42 mb_42" @click="clickReceive" v-if="detailsInfo?.receiveStatus == 0">{{ $t(`welfareCenter['立即领取']`) }}</Button>
		<div class="text-center fs_24 color_T1">
			{{ $t(`welfareCenter['如需帮助，请']`) }} <span class="color_Theme" @click="Common.getSiteCustomerChannel">{{ $t(`welfareCenter['联系客服']`) }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import { welfareCenterApi } from "/@/api/welfareCenter";
import router from "/@/router";
import { useClipboard } from "@vueuse/core";

import dayjs from "dayjs";
import Common from "/@/utils/common";
import { i18n } from "/@/i18n/index";
const $: any = i18n.global;
const detailsInfo: any = ref({});

const source = ref(detailsInfo.value.orderNo);

onMounted(() => {
	welfareCenterDetail();
});
const welfareCenterDetail = () => {
	const params = {
		id: router.currentRoute.value.query.id,
		welfareCenterRewardType: router.currentRoute.value.query.welfareCenterRewardType,
	};
	welfareCenterApi.welfareCenterDetail(params).then((res) => {
		detailsInfo.value = res.data;
	});
};
const copyOrder = (value) => {
	Common.getInstance().copy(value);
};
const clickReceive = (item) => {
	const params = {
		id: detailsInfo.value.id,
		welfareCenterRewardType: detailsInfo.value.welfareCenterRewardType,
	};
	welfareCenterApi
		.clickReceive(params)
		.then((res: any) => {
			if (res.code === 10000) {
				showToast($.t(`welfareCenter['领取成功']`));
			}
		})
		.finally(() => {
			welfareCenterDetail();
		});
};
</script>

<style lang="scss" scoped>
.amount {
	height: 120px;
	border-radius: 16px;
	background: url("./image/amountBg.png") no-repeat;
	background-size: 100% 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
	@include themeify {
		color: themed("Theme");
	}
}
.content {
	padding: 24px;
	.card {
		margin: 24px 0;
		padding: 4px 24px;
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
		}
		> div:first-child {
			@include themeify {
				border-bottom: 1px solid themed("Line");
			}
		}
		> div {
			height: 38px;
			padding: 20px 0;
			font-size: 28px;
			white-space: nowrap;
		}
		.status0 {
			@include themeify {
				color: themed("F2");
			}
		}
		.status1 {
			@include themeify {
				color: themed("Wam-P1");
			}
		}
		.status2 {
			@include themeify {
				color: themed("T3");
			}
		}
		.orderNo {
			flex: 1;
			text-align: right;
		}
	}
}
</style>
