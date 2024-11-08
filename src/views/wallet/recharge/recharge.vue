<template>
	<VantNavBar :title="$t(`VantNavBar['存款']`)" :leftArrow="!route.meta.firstLevelPage" @onClickLeft="onClickLeft" />
	<template v-if="!NoDataShow">
		<div class="container" :class="{ pb_120: route.meta.firstLevelPage }">
			<div class="pay_methods">
				<div class="header">
					<SvgIcon class="icon" iconName="wallet/line" />
					<span>{{ $t(`recharge['支付方式']`) }}</span>
				</div>
				<div class="pay_list">
					<!-- 遍历支付方式列表 -->
					<div
						class="pay_item"
						:class="{ pay_active: item.rechargeTypeCode == rechargeWayData?.rechargeTypeCode && item.networkType == rechargeWayData?.networkType }"
						v-for="(item, index) in rechargeWayList"
						@click="onRechargeWay(item)"
					>
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
				<component :is="componentsMapsName[rechargeWayData?.rechargeTypeCode]" :rechargeWayData="rechargeWayData" :rechargeConfig="rechargeConfig" />
			</div>

			<Model v-model:modelValue="isModalVisible">
				<template #default>
					<div class="popup_body">
						<div class="header">{{ $t(`recharge['温馨提示']`) }}</div>
						<div class="content">
							<div class="text">
								<i18n-t keypath="recharge['请使用']" :tag="'p'">
									<template v-slot:value>
										<span v-if="rechargeWayData.networkType === 'TRC20'" class="text_2"> {{ $t(`recharge['波场链']`) }} </span>
										<span v-if="rechargeWayData.networkType === 'ERC20'" class="text_2"> {{ $t(`recharge['以太坊链']`) }} </span>
									</template>
									<template v-slot:currency>
										<span class="text_2">({{ rechargeWayData.networkType }}){{ $t(`recharge['协议']`) }}</span>
									</template>
								</i18n-t>
							</div>
							<div class="popup_tips" @click="checkbox = !checkbox">
								<SvgIcon class="icon" :iconName="checkbox ? 'wallet/checkbox_active' : 'wallet/checkbox'" />
								<span>{{ $t(`recharge['24小时内不再提示']`) }}</span>
							</div>
						</div>
						<div class="footer" @click="onNotRemind">{{ $t(`recharge['我已知晓']`) }}</div>
					</div>
				</template>
			</Model>
		</div>
	</template>

	<template v-if="NoDataShow">
		<div class="noData">
			<img :src="NoData" alt="" />
			<p>{{ $t("my['暂无可用存款方式']") }}</p>
		</div>
	</template>
</template>
<script setup lang="ts">
import NoData from "/@/assets/zh-CN/default/wallet/recharge_nodata.png";

import { useRoute, useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet";
import common from "/@/utils/common";
// 引入支付方式对应的组件
import bankCard from "/@/views/wallet/recharge/components/bankCard/bankCard.vue";
import EWallet from "/@/views/wallet/recharge/components/EWallet/EWallet.vue";
import VirtualCurrency from "/@/views/wallet/recharge/components/VirtualCurrency/VirtualCurrency.vue";
import Model from "../components/model.vue";

// 使用 Vue Router
const route = useRoute();
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
	electronic_wallet: EWallet,
	crypto_currency: VirtualCurrency,
};

// 定义响应式变量
const rechargeWayData = ref({} as rechargeWayDataRootObject); // 当前选择的支付方式
const rechargeWayList = ref([] as rechargeWayDataRootObject[]); // 支付方式列表
const rechargeConfig = ref({
	quickAmountList: [] as string[],
}); // 通道配置

const isModalVisible = ref(false);
const checkbox = ref(false);

const NoDataShow = ref(false);

// 选择支付方式时的处理
const onRechargeWay = (item) => {
	if (item.rechargeTypeCode == rechargeWayData.value.rechargeTypeCode && item.networkType == rechargeWayData.value.networkType) {
		return;
	}
	rechargeConfig.value = {} as any;
	rechargeWayData.value = item;
	getRechargeConfig();
};

// 获取支付方式列表
const getRechargeWayList = async () => {
	const res: any = await walletApi.rechargeWayList().catch((err) => {
		if (route.meta.firstLevelPage) {
			NoDataShow.value = true;
		}
	});
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		rechargeWayList.value = res.data; // 存储支付方式列表
		// rechargeWayList.value = []; // 存储支付方式列表
		if (route.meta.firstLevelPage && rechargeWayList.value.length === 0) {
			NoDataShow.value = true;
			return;
		}
		rechargeWayData.value = res.data[0]; // 默认选择第一个支付方式
		getRechargeConfig();
	}
};

// 获取通道配置
const getRechargeConfig = async () => {
	const params = {
		rechargeWayId: rechargeWayData.value.id,
	};
	const res = await walletApi.getRechargeConfig(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		if (rechargeWayData.value.rechargeTypeCode === "crypto_currency" && res.data.isRemind === 1) {
			checkbox.value = false;
			isModalVisible.value = true;
		}
		rechargeConfig.value = res.data;
		rechargeConfig.value.quickAmountList = res.data.quickAmount.split(",").map(Number);
	}
};

// 不再提醒
const onNotRemind = async () => {
	if (checkbox.value) {
		const params = {
			netWorkType: rechargeWayData.value.networkType,
		};
		const res = await walletApi.notRemind(params).catch((err) => err);
		if (res.code === common.getInstance().ResCode.SUCCESS) {
			checkbox.value = false;
			isModalVisible.value = false;
		}
	} else {
		isModalVisible.value = false;
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
.popup_body {
	.header {
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid;
		@include themeify {
			color: themed("TB");
			border-color: themed("Line");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
	}

	.content {
		padding: 40px;
		.text {
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
			line-height: 38px;
			text-align: center;
		}
		.text_2 {
			@include themeify {
				color: themed("Hint");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
			line-height: 38px;
			text-align: center;
		}
		.popup_tips {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16px;
			margin-top: 40px;
			@include themeify {
				color: themed("T2");
			}
			font-family: "PingFang SC";
			font-size: 22px;
			font-weight: 400;
			.icon {
				width: 32px;
				height: 32px;
				transition: all 0.2s;
			}
		}
	}
	.footer {
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid;
		@include themeify {
			color: themed("Theme");
			border-color: themed("Line");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
	}
}

.noData {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);

	img {
		width: 314px;
		height: 250px;
		margin: 0 auto;
	}
	p {
		margin-top: 24px;
		text-align: center;
		@include themeify {
			color: themed("T3");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}
}
</style>
