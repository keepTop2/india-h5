<template>
	<VantNavBar :title="$t(`VantNavBar['存款']`)" @onClickLeft="onClickLeft" />
	<div class="container">
		<div class="pay_methods">
			<div class="header">
				<SvgIcon class="icon" iconName="wallet/line" />
				<span>{{ $t(`recharge['支付方式']`) }}</span>
			</div>
			<div class="pay_list">
				<!-- 遍历支付方式列表 -->
				<div class="pay_item" :class="{ pay_active: item.rechargeTypeCode == rechargeWayData?.rechargeTypeCode }" v-for="(item, index) in rechargeWayList" @click="onRechargeWay(item)">
					<div class="tag" v-if="item.recommendFlag == 1">{{ $t(`recharge['推荐']`) }}</div>
					<div class="pay_logo">
						<VantLazyImg class="logo" :src="item.wayIconUrl" />
					</div>
					<div class="label">{{ item.rechargeWay }}</div>
				</div>
			</div>
		</div>

		<div class="form">
			<!-- 动态组件根据支付方式渲染 -->
			<component :is="componentsMapsName[rechargeWayData?.rechargeTypeCode]" :rechargeWayData="rechargeWayData" />
		</div>
	</div>
	<div></div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet";
import common from "/@/utils/common";
// 引入支付方式对应的组件
import bankCard from "/@/views/wallet/recharge/components/bankCard/bankCard.vue";
import Ewallet from "/@/views/wallet/recharge/components/Ewallet/Ewallet.vue";
import USDTTRC20 from "/@/views/wallet/recharge/components/USDTTRC20/USDTTRC20.vue";

// 使用 Vue Router
const router = useRouter();

interface rechargeWayDataRootObject {
	rechargeTypeCode: string;
	id: string;
	rechargeWay: string;
	wayIcon: string;
	wayIconUrl: string;
	wayFee: number;
	quickAmount: string;
	rechargeMin: number;
	rechargeMax: number;
	recommendFlag: number;
	networkType?: any;
	currencyCode: string;
}

// 定义组件映射
const componentsMapsName = {
	bank_card: bankCard,
	electronic_wallet: Ewallet,
	crypto_currency: USDTTRC20, // 修复: 应该是 'usdt_trc20' 而不是 'rechargeTypeCode'
};

// 定义响应式变量
const rechargeWayData = ref({} as rechargeWayDataRootObject); // 当前选择的支付方式
const rechargeWayList = ref([] as rechargeWayDataRootObject[]); // 支付方式列表

// 选择支付方式时的处理
const onRechargeWay = (item) => {
	rechargeWayData.value = item;
};

// 获取支付方式列表
const getRechargeWayList = async () => {
	const res = await walletApi.rechargeWayList().catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		rechargeWayList.value = res.data; // 存储支付方式列表
		rechargeWayData.value = res.data[0]; // 默认选择第一个支付方式
	}
};

// 初始化数据
getRechargeWayList();

// 返回上一页的处理
const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.container {
	.pay_methods {
		margin: 24px;
		padding: 24px;
		border-radius: 16px;
		@include themeify {
			background-color: themed("BG3");
		}
		.header {
			position: relative;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 500;

			.icon {
				position: absolute;
				top: 0px;
				left: -24px;
				width: 6px;
				height: 40px;
			}
		}

		.pay_list {
			display: grid;
			grid-template-columns: repeat(3, 1fr); /* 每行三个项目 */
			row-gap: 22px; /* 行间距 */
			column-gap: 12px; /* 列间距 */
			margin-top: 16px;
			.pay_item {
				position: relative;
				flex: 1;
				border-radius: 20px;
				border: 2px solid rgba(98, 102, 106, 0.5);

				.tag {
					position: absolute;
					top: -2px;
					right: -2px;
					min-width: 76px;
					max-width: 80%;
					height: 33px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0px 20px;
					border-top-right-radius: 20px;
					border-bottom-left-radius: 20px;
					@include themeify {
						color: themed("TB");
						background-color: themed("Theme");
					}
					font-family: "PingFang SC";
					font-size: 22px;
					font-weight: 400;
					white-space: nowrap; /* 不换行 */
					overflow: hidden; /* 隐藏超出部分 */
					text-overflow: ellipsis; /* 显示省略号 */
					box-sizing: border-box;
				}

				.pay_logo {
					width: 100%;
					height: 100px;
					border-top-left-radius: 20px;
					border-top-right-radius: 20px;
					overflow: hidden;

					.logo {
						width: 100%;
						height: 100%;
					}
				}

				.label {
					width: 100%;
					height: 46px;
					display: flex;
					align-items: center;
					justify-content: center;
					@include themeify {
						color: themed("TB");
					}
					font-family: "PingFang SC";
					font-size: 24px;
					font-weight: 400;
				}
			}

			.pay_active {
				border: 2px solid;
				@include themeify {
					border-color: themed("Theme");
				}
				transition: all 0.2s;

				.label {
					@include themeify {
						color: themed("Theme");
					}
				}
			}
		}
	}
}
</style>
