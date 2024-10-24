<template>
	<VantNavBar :title="$t(`VantNavBar['提款']`)" @onClickLeft="onClickLeft" />

	<div class="withdraw">
		<!-- 中心钱包 -->
		<div class="wallet_center">
			<div class="tutorial">{{ $t(`withdraw['提款教程']`) }}</div>
			<div class="wallet_center_container">
				<div class="label">{{ $t(`withdraw['中心钱包']`) }}</div>
				<div class="value">
					<span>{{ common.getInstance().formatFloat(UserStore.userInfo.totalBalance) }}</span>
					<span>&nbsp;</span>
					<span>{{ UserStore.userInfo.mainCurrency }}</span>
				</div>
			</div>
			<div class="wallet_center_footer">
				<div class="label">
					<SvgIcon class="icon" iconName="wallet/frozen_amount_icon" />
					<span>{{ $t(`withdraw['冻结金额']`) }}</span>
				</div>
				<div class="value">
					<span>{{ common.getInstance().formatFloat(state.freezeAmount) }}</span>
					<span>&nbsp;</span>
					<span>{{ UserStore.userInfo.mainCurrency }}</span>
				</div>
			</div>
		</div>

		<!-- 提款方式 -->
		<div class="card">
			<div class="header">
				<SvgIcon class="icon" iconName="wallet/line" />
				<span>{{ $t(`withdraw['提款方式']`) }}</span>
			</div>
			<div class="list">
				<!-- 遍历支付方式列表 -->
				<div
					class="item"
					:class="{ pay_active: item.withdrawTypeCode == withdrawWayData?.withdrawTypeCode && item.networkType == withdrawWayData?.networkType }"
					v-for="(item, index) in withdrawWayList"
					@click="onRechargeWay(item)"
				>
					<div class="tag" v-if="item.recommendFlag == 1">{{ $t(`withdraw['推荐']`) }}</div>
					<div class="logo">
						<VantLazyImg class="logo" :src="item.wayIcon" />
					</div>
					<div class="label">{{ item.withdrawWay }}</div>
				</div>
			</div>
		</div>

		<!-- 提款金额 -->
		<div class="card">
			<div class="header">
				<SvgIcon class="icon" iconName="wallet/line" />
				<span>{{ $t(`withdraw['提款金额']`) }}</span>
			</div>

			<div class="cell">
				<div class="cell_input operate">
					<input
						v-model="state.amount"
						type="number"
						:placeholder="`${withdrawWayConfig.withdrawMinAmount ?? 0} ${UserStore.userInfo.mainCurrency} ~ ${withdrawWayConfig.withdrawMaxAmount ?? 0} ${UserStore.userInfo.mainCurrency} `"
						@input="calculateFeeAndEstimatedAmount"
					/>
					<div class="operate_content">
						<span @click="state.amount = UserStore.userInfo.totalBalance">{{ $t(`withdraw['全部金额']`) }}</span>
					</div>
				</div>
				<div v-if="errorMessage" class="error_text">{{ errorMessage }}</div>
				<!-- 银行卡 电子钱包 预计到账计算 -->
				<div v-else class="amount_info mt_10">
					<div class="item">
						<span class="label">{{ $t(`withdraw['预计到账']`) }}</span>
						<span class="value">&nbsp;{{ common.getInstance().formatFloat(estimatedAmount) }}</span>
						<span class="sign" v-if="withdrawWayData.withdrawTypeCode !== 'crypto_currency'">&nbsp;{{ UserStore.userInfo.mainCurrency }}</span>
						<span class="sign" v-else>&nbsp;USDT</span>
					</div>
					<div class="item">
						<span class="label">{{ $t(`withdraw['手续费']`) }}({{ withdrawWayConfig.feeRate }}%):</span>
						<span class="value">&nbsp;{{ common.getInstance().formatFloat(feeAmount) }}</span>
						<span class="sign" v-if="withdrawWayData.withdrawTypeCode !== 'crypto_currency'">&nbsp;{{ UserStore.userInfo.mainCurrency }}</span>
						<span class="sign" v-else>&nbsp;USDT</span>
					</div>
				</div>
				<!-- 虚拟币预计到账计算 -->
				<div v-if="withdrawWayData.withdrawTypeCode === 'crypto_currency'" class="amount_info mt_4">
					<div class="item">
						<span class="value">≈{{ common.getInstance().formatFloat(estimatedAmount * exchangeRate) }}</span>
						<span class="sign">&nbsp;{{ UserStore.userInfo.mainCurrency }}</span>
					</div>
					<div class="item">
						<span class="label">{{ $t(`withdraw['当前汇率']`, { value: exchangeRate }) }}</span>
						<SvgIcon class="icon ml_6" iconName="wallet/refresh" @click="getWithdrawExchange" />
					</div>
				</div>
			</div>
		</div>

		<!-- 动态组件根据支付方式渲染 -->
		<component ref="childRef" :is="componentsMapsName[withdrawWayData?.withdrawTypeCode]" :withdrawWayData="withdrawWayData" :withdrawWayConfig="withdrawWayConfig" />

		<div class="footer">
			<!-- 提示1 -->
			<p class="tips">
				<span class="theme">{{ $t(`withdraw['注意']`) }}</span>
				<span>{{ $t(`withdraw['请确保填写真实有效信息，信息不正确导致提现失败或无法到账，平台不承担任何责任，若出现充值异常']`) }}</span>
				<span class="theme">{{ $t(`withdraw['请联系客服']`) }}</span>
			</p>
			<!-- 提交按钮 -->
			<Button class="mt_44" :type="buttonType" @click="onWithdrawApply">{{ $t('recharge["立即提款"]') }}</Button>
			<!-- 提示2 -->
			<i18n-t class="tips" keypath="withdraw['提示']" :tag="'p'">
				<template v-slot:value>
					<span class="theme"> {{ withdrawWayConfig.singleDayRemindWithdrawCount ?? 0 }} </span>
				</template>
				<template v-slot:amount>
					<span class="theme"> {{ withdrawWayConfig.singleDayRemindMaxWithdrawAmount ?? 0 }} </span>
				</template>
				<template v-slot:currency>
					<span> {{ UserStore.userInfo.mainCurrency }} </span>
				</template>
			</i18n-t>
		</div>
	</div>

	<PassWordInput v-model:modelValue="state.withdrawPassWord" :passWordShow="passWordShow" @onClose="onTransactionPasswordEntered" @onOverlay="passWordShow = false" />
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import { useUserStore } from "/@/store/modules/user";
import { useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet";
import { myApi } from "/@/api/my";

// 引入支付方式对应的组件
import bankCard from "/@/views/wallet/withdraw/components/bankCard/bankCard.vue";
import Ewallet from "/@/views/wallet/withdraw/components/Ewallet/Ewallet.vue";
import USDTTRC20 from "/@/views/wallet/withdraw/components/USDTTRC20/USDTTRC20.vue";

import PassWordInput from "../components/passWordInput.vue";
import { i18n } from "/@/i18n/index";
import { showToast } from "vant";
const router = useRouter();
const UserStore = useUserStore();
const $: any = i18n.global;
// 定义组件映射
const componentsMapsName = {
	bank_card: bankCard,
	electronic_wallet: Ewallet,
	crypto_currency: USDTTRC20, // 修复: 应该是 'usdt_trc20' 而不是 'rechargeTypeCode'
};

interface withdrawWayDataRootObject {
	withdrawTypeCode: string;
	id: string;
	withdrawWay: string;
	wayIcon: string;
	wayFee: number;
	quickAmount: string;
	recommendFlag: number;
	networkType: string;
	currencyCode: string;
}

const withdrawWayData = ref({} as withdrawWayDataRootObject); // 当前选择的支付方式
const withdrawWayList = ref([] as withdrawWayDataRootObject[]); // 支付方式列表
const withdrawWayConfig = ref({
	withdrawMinAmount: 0,
	withdrawMaxAmount: 1000,
} as any); // 支付方式列表

const childRef = ref(null);
const state = reactive({
	freezeAmount: "",
	withdrawPassWord: "" as string,
	amount: "" as string | number,
});

const feeAmount = ref(0); // 手续费
const estimatedAmount = ref(0); // 预计到账金额
const exchangeRate = ref(0); // 预计到账金额

const passWordShow = ref(false);

const errorMessage = computed(() => {
	const amount = parseFloat(state.amount as string);
	// 检查是否为有效数字
	if (isNaN(amount)) {
		return "";
	}
	// 获取账户余额
	const totalBalance = UserStore.userInfo.totalBalance;
	// 判断输入的金额
	if (amount > totalBalance || !totalBalance) {
		return $.t(`withdraw["余额不足"]`);
	} else if (amount < withdrawWayConfig.value.withdrawMinAmount) {
		return `${$.t('withdraw["单次最低提款"]')}: ${withdrawWayConfig.value.withdrawMinAmount} ${UserStore.userInfo.mainCurrency}`;
	} else if (amount > withdrawWayConfig.value.withdrawMaxAmount) {
		return `${$.t('withdraw["单次最高提款"]')}: ${withdrawWayConfig.value.withdrawMaxAmount} ${UserStore.userInfo.mainCurrency}`;
	}
	return "";
});

watch(
	() => childRef.value,
	(newValue) => {},
	{
		deep: true,
	}
);

const buttonType = computed(() => {
	// 检查手机号是否有效（仅在银行卡和电子钱包表单中使用）
	const isPhoneValid = withdrawWayData.value.withdrawTypeCode !== "crypto_currency" && childRef.value?.isPhoneValid;

	// 获取当前的提现类型
	const withdrawTypeCode = withdrawWayData.value.withdrawTypeCode;

	// 定义 requiredFields 和 dynamicFields
	let requiredFields: string[] = [];
	let dynamicFields = {};
	let smsCode = "";

	// 动态构建表单字段
	const buildDynamicFields = () => {
		const collectInfoVOS = withdrawWayConfig.value.collectInfoVOS || [];
		return collectInfoVOS.reduce((acc, { filedCode, checkFlag }) => {
			if (checkFlag) {
				acc[filedCode] = childRef.value?.state?.[filedCode] || "";
			}
			return acc;
		}, {});
	};

	// 添加 SMS 代码的检查
	const addSmsCodeCheck = () => {
		if (!UserStore.getUserInfo.isSetPwd && UserStore.getUserInfo.phone) {
			smsCode = childRef.value?.state?.smsCode || "";
			requiredFields.push("smsCode");
		}
	};

	// 根据提现类型动态处理表单
	switch (withdrawTypeCode) {
		case "bank_card":
			dynamicFields = buildDynamicFields();
			requiredFields = Object.keys(dynamicFields);
			addSmsCodeCheck();
			break;

		case "electronic_wallet":
			dynamicFields = buildDynamicFields();
			requiredFields = Object.keys(dynamicFields);
			addSmsCodeCheck();
			break;

		case "crypto_currency":
			dynamicFields = buildDynamicFields();
			requiredFields = Object.keys(dynamicFields);
			break;

		default:
			break;
	}

	// 检查所有属性是否有值
	const allFieldsHaveValue = requiredFields.every((key) => dynamicFields[key] !== undefined && dynamicFields[key] !== "");

	// 按钮状态判断
	if (errorMessage.value || !state.amount || !allFieldsHaveValue || (requiredFields.includes("userPhone") && !isPhoneValid && withdrawTypeCode !== "crypto_currency")) {
		return "disabled";
	} else {
		return "default";
	}
});

// 计算手续费和预计到账金额
const calculateFeeAndEstimatedAmount = () => {
	// 将输入的 amount 转换为数字
	let amount = Number(state.amount);
	let isCrypto = withdrawWayData.value.withdrawTypeCode === "crypto_currency";
	let feeRate = withdrawWayConfig.value.feeRate;
	let maxWithdrawAmount = withdrawWayConfig.value.singleDayRemindMaxWithdrawAmount;
	let remainingWithdrawCount = withdrawWayConfig.value.singleDayRemindWithdrawCount;

	// 检查是否满足免费提款条件
	if (isNaN(amount) || (remainingWithdrawCount > 0 && amount <= maxWithdrawAmount)) {
		feeAmount.value = 0; // 免费提款条件下手续费为0
	} else {
		// 计算手续费
		feeAmount.value = isCrypto ? (amount * feeRate) / 100 / exchangeRate.value : (amount * feeRate) / 100;
	}
	// 预计到账金额计算
	estimatedAmount.value = isCrypto ? amount / exchangeRate.value - feeAmount.value : amount - feeAmount.value;
};

// 获取冻结金额
const getUserBalance = async () => {
	const res = await myApi.getUserBalance().catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		state.freezeAmount = res.data.freezeAmount;
	}
};

// 交易密码输入完成
const onTransactionPasswordEntered = () => {
	passWordShow.value = false;
	if (state.withdrawPassWord.length === 6) {
		const params = {
			amount: state.amount,
			withdrawWayId: withdrawWayData.value.id,
			withdrawPassWord: state.withdrawPassWord,
			...childRef.value?.state,
		};
		getWithdrawApply(params);
	}
};

// 会员提款申请
const onWithdrawApply = async () => {
	if (UserStore.getUserInfo.isSetPwd) {
		passWordShow.value = true;
	} else if (UserStore.getUserInfo.phone) {
		const params = {
			amount: state.amount,
			withdrawWayId: withdrawWayData.value.id,
			...childRef.value?.state,
		};
		getWithdrawApply(params);
	}
};

const getWithdrawApply = async (params) => {
	const res = await walletApi.withdrawApply(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		showToast($.t('withdraw["申请成功"]'));
		clearParams();
	}
};

// 选择支付方式时的处理
const onRechargeWay = (item) => {
	withdrawWayData.value = item;
	clearParams();
	getWithdrawConfig(); // 获取通道配置

	if (item.withdrawTypeCode == "crypto_currency") {
		getWithdrawExchange();
	}
};

// 获取支付方式列表
const getRechargeWayList = async () => {
	const res = await walletApi.withdrawWayList().catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		withdrawWayList.value = res.data; // 存储支付方式列表
		withdrawWayData.value = res.data[0]; // 默认选择第一个支付方式
		getWithdrawConfig(); // 获取通道配置
	}
};

// 获取通道配置
const getWithdrawConfig = async () => {
	const params = {
		withdrawWayId: withdrawWayData.value.id,
	};
	const res = await walletApi.getWithdrawConfig(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		withdrawWayConfig.value = res.data;
	}
};

// 获取提款汇率
const getWithdrawExchange = async () => {
	const res = await walletApi.getWithdrawExchange().catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		exchangeRate.value = res.data;
	}
};

// 初始化数据
getRechargeWayList();
getUserBalance();

// 清空表单参数
const clearParams = () => {
	Object.keys(state).forEach((key) => {
		state[key] = ""; // 将每个属性设置为空字符串
	});
	feeAmount.value = 0;
	estimatedAmount.value = 0;
	childRef.value?.clearParams();
};

// 返回上一页的处理
const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.withdraw {
	padding: 24px;
}
.wallet_center {
	position: relative;
	width: 100%;
	height: 202px;
	border-radius: 18px;
	overflow: hidden;
	background: url("../../../assets/zh-CN/default/wallet/wallet_center_bg.png") center center / 100% 100% no-repeat;
	.tutorial {
		position: absolute;
		top: 40px;
		right: 0px;
		padding: 6px 15px 6px 30px;
		border-radius: 24px 0px 0px 24px;
		background: rgba(255, 255, 255, 0.3);
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 22px;
	}
	.wallet_center_container {
		width: 100%;
		height: 140px;
		padding: 23px 140px 23px 50px;
		box-sizing: border-box;
		.label {
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
			line-height: 40px;
		}
		.value {
			margin-top: 10px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 36px;
			font-weight: 500;
		}
	}
	.wallet_center_footer {
		width: 100%;
		height: 62px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 50px;
		box-sizing: border-box;
		.label {
			display: flex;
			align-items: center;
			gap: 8px;
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			.icon {
				width: 23px;
				height: 29px;
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
		.value {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
	}
}

.card {
	margin-top: 24px;
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

	.list {
		display: grid;
		grid-template-columns: repeat(3, 1fr); /* 每行三个项目 */
		row-gap: 22px; /* 行间距 */
		column-gap: 12px; /* 列间距 */
		margin-top: 16px;
		.item {
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

			.logo {
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

	.cell {
		margin-top: 16px;

		.cell_input {
			width: 100%;
			height: 80px;
			display: flex;
			align-items: center;
			padding: 0px 24px;
			border-radius: 12px;
			border: 1px solid;
			@include themeify {
				border-color: themed("Line");
				background-color: themed("BG1");
			}
			box-sizing: border-box;
			input {
				flex: 1;
				border: 0;
				background-color: transparent;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-style: normal;
				font-weight: 400;
				&::placeholder {
					@include themeify {
						color: themed("T3");
					}
				}
			}
		}
		.operate {
			padding: 0px 0px 0px 24px;
			.operate_content {
				position: relative;
				height: 100%;
				display: flex;
				align-items: center;
				padding: 0px 24px;
				span {
					@include themeify {
						color: themed("Theme");
					}
					font-family: "PingFang SC";
					font-size: 24px;
					font-weight: 400;
				}

				&::after {
					position: absolute;
					content: "";
					left: 0px;
					top: 50%;
					transform: translateY(-50%);
					width: 2px;
					height: 52px;
					@include themeify {
						background: themed("Line");
					}
				}
			}
		}
		.amount_info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item {
				display: flex;
				align-items: center;
			}

			.label {
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 22px;
				font-weight: 400;
			}
			.value {
				@include themeify {
					color: themed("Theme");
				}
				font-family: "DIN Alternate";
				font-size: 24px;
				font-weight: 700;
			}
			.sign {
				@include themeify {
					color: themed("TB");
				}
				font-family: "DIN Alternate";
				font-size: 24px;
				font-weight: 700;
			}
			.icon {
				width: 30px;
				height: 30px;
			}
		}
		.error_text {
			margin-top: 10px;
			@include themeify {
				color: themed("Warn");
			}
			font-family: "PingFang SC";
			font-size: 22px;
			font-weight: 400;
		}
	}
}

.footer {
	.tips {
		margin-top: 24px;
		@include themeify {
			color: themed("T3");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}
	.theme {
		@include themeify {
			color: themed("Theme");
		}
	}
}
</style>
