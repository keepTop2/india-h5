<template>
	<VantNavBar :title="$t(`VantNavBar['${navTitle}']`)" @onClickLeft="onClickLeft" />
	<div class="deposit-details">
		<div class="status-bar">
			<!-- 动态显示金额 -->
			<span class="value" v-if="displayedAmount">
				<!-- 显示正负号和格式化后的金额 -->
				{{ getPlusMinusSign() }}{{ common.thousands(common.getInstance().formatAmount(Number(common.getInstance().formatFloat(displayedAmount)), 7)) }}
			</span>
			<span class="label ml_12">{{ mainCurrency }}</span>
		</div>

		<div class="deposit-info" v-for="fromFields in fromFieldsList[route.query.tradeWayType]">
			<div class="info-item" v-for="item in fromFields">
				<span class="label">{{ $t(`rechargeDetails['${item.label}']`) }}</span>
				<!-- 值处理 -->
				<span class="value" :class="item.key === 'customerStatus' ? getClass : ''">
					<!-- 状态处理 -->
					<template v-if="item.key === 'customerStatus' && getStatusLabel">
						{{ $t(`rechargeDetails['${getStatusLabel}']`) }}
					</template>
					<!-- 时间处理 -->
					<template v-else-if="timeKeys.includes(item.key)">
						{{ common.getInstance().dayFormat2(depositOrderDetail[item.key as keyof typeof depositOrderDetail]) || "--" }}
					</template>
					<!-- 复制处理 -->
					<template v-else-if="item.key === 'orderNo'">
						<span>{{ depositOrderDetail[item.key as keyof typeof depositOrderDetail] }}</span>
						<SvgIcon @click="common.getInstance().copy(depositOrderDetail[item.key])" class="icon" iconName="common/copy" />
					</template>
					<!-- 手续费处理 -->
					<template v-else-if="item.key === 'feeAmount'">
						{{ common.thousands(common.getInstance().formatFloat(depositOrderDetail[item.key as keyof typeof depositOrderDetail])) }}
						<span>{{ mainCurrency }}</span>
					</template>
					<!-- 金额处理 -->
					<template v-else-if="amountKeys.includes(item.key)">
						{{ common.thousands(common.getInstance().formatAmount(Number(common.getInstance().formatFloat(depositOrderDetail[item.key as keyof typeof depositOrderDetail])), 7)) }}
						<span>{{ getCurrencyLabel(item.key) }}</span>
					</template>
					<!-- 脱敏处理 -->
					<template v-else-if="item.key in maskKeys">
						{{ maskFunctions[item.key as MaskFieldKey](depositOrderDetail[item.key as keyof typeof depositOrderDetail]) }}
					</template>
					<!-- 默认展示 -->
					<template v-else>
						{{ depositOrderDetail[item.key as keyof typeof depositOrderDetail] }}
					</template>
				</span>
			</div>
		</div>

		<!-- 银行卡提现 -->
		<div v-if="route.query.tradeWayType === 'bank_card_withdraw'" class="deposit-info">
			<template v-for="item in BankCardWithdrawalList">
				<div class="info-item" v-if="depositOrderDetail[item.key]">
					<span class="label">{{ $t(`rechargeDetails['${item.label}']`) }}</span>
					<span class="value">
						<!-- 脱敏处理 -->
						<template v-if="item.key in maskKeys">
							<!-- 手机号拼接区号 -->
							<span v-if="item.key === 'userPhone'">{{ "+" + depositOrderDetail.areaCode }}</span>
							<span>{{ maskFunctions[item.key as MaskFieldKey](depositOrderDetail[item.key as keyof typeof depositOrderDetail]) }}</span>
						</template>
						<!-- 默认展示 -->
						<template v-else>
							{{ depositOrderDetail[item.key as keyof typeof depositOrderDetail] }}
						</template>
					</span>
				</div>
			</template>
		</div>

		<!-- 电子钱包提现 -->
		<div v-if="route.query.tradeWayType === 'electronic_wallet_withdraw'" class="deposit-info">
			<template v-for="item in EWalletList">
				<div class="info-item" v-if="depositOrderDetail[item.key]">
					<span class="label">{{ $t(`rechargeDetails['${item.label}']`) }}</span>
					<span class="value">
						<!-- 脱敏处理 -->
						<template v-if="item.key in maskKeys">
							<!-- 手机号拼接区号 -->
							<span v-if="item.key === 'userPhone'">{{ "+" + depositOrderDetail.areaCode }}</span>
							<span>{{ maskFunctions[item.key as MaskFieldKey](depositOrderDetail[item.key as keyof typeof depositOrderDetail]) }}</span>
						</template>
						<!-- 默认展示 -->
						<template v-else>
							{{ depositOrderDetail[item.key as keyof typeof depositOrderDetail] }}
						</template>
					</span>
				</div>
			</template>
		</div>

		<!-- 只有银行卡 电子钱包 存款才显示进度 -->
		<template v-if="route.query.tradeWayType === 'bank_card_recharge' || route.query.tradeWayType === 'electronic_wallet_recharge'">
			<div class="progress">
				<div class="header">
					<SvgIcon class="icon" iconName="wallet/line" />
					<span>{{ $t(`recharge['支付方式']`) }}</span>
				</div>
				<div class="steps">
					<div class="step">
						<div class="circle">
							<div class="header">
								<div class="step_icon">
									<span v-if="!route.query.orderNo">1</span>
									<SvgIcon v-else iconName="wallet/deal_success" />
								</div>
							</div>
							<div class="line" :class="{ highlight: depositOrderDetail.customerStatus }"></div>
						</div>
						<div class="content">
							<div class="title">{{ $t(`rechargeDetails['创建充值订单']`) }}</div>
							<div class="description">
								<p class="text">{{ common.getInstance().dayFormat2(depositOrderDetail.createdTime) }}</p>
							</div>
						</div>
					</div>
					<div class="step">
						<div class="circle">
							<div class="header">
								<div class="step_icon">
									<span v-if="depositOrderDetail.customerStatus == 0">2</span>
									<SvgIcon v-else iconName="wallet/deal_success" />
								</div>
							</div>
							<div class="line" :class="{ highlight: depositOrderDetail.customerStatus != 0 }"></div>
						</div>
						<div class="content">
							<div class="title">{{ $t(`rechargeDetails['第三方商户处理中']`) }}</div>
							<div class="description">
								<p class="text">{{ $t(`rechargeDetails['此过程可能需要1小时，更新于']`, { value: common.getInstance().dayFormat2(depositOrderDetail.updatedTime) }) }}</p>
								<template v-if="depositOrderDetail.customerStatus == '0'">
									<p v-if="!depositOrderDetail.cashFlowFileList || depositOrderDetail.cashFlowFileList.length == '0'">
										<span class="a" @click="isModalVisible = true">{{ $t(`rechargeDetails['提供转账凭证']`) }}</span>
									</p>
									<p class="text">
										<i18n-t keypath="rechargeDetails['超时']" :tag="'p'">
											<template v-slot:value>
												<span class="text_2"> {{ formattedTime }} </span>
											</template>
										</i18n-t>
									</p>
								</template>
							</div>
						</div>
					</div>
					<div class="step">
						<div class="circle">
							<div class="header">
								<div class="step_icon">
									<span v-if="depositOrderDetail.customerStatus == '0'">3</span>
									<SvgIcon v-else-if="depositOrderDetail.customerStatus == '1'" iconName="wallet/deal_success" />
									<SvgIcon v-else-if="depositOrderDetail.customerStatus == '2'" iconName="wallet/deal_error" />
								</div>
							</div>
						</div>
						<div class="content">
							<div class="title">{{ $t(`rechargeDetails['交易完成/失败']`) }}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="proof_list" v-if="depositOrderDetail.voucherFlag === 1">
				<VantLazyImg v-for="(item, index) in depositOrderDetail.cashFlowFileList" :key="index" class="proof_item" :src="item" />
			</div>
		</template>
	</div>
	<!-- 只有银行卡 电子钱包 存款才显示底部 -->
	<template v-if="route.query.tradeWayType === 'bank_card_recharge' || route.query.tradeWayType === 'electronic_wallet_recharge'">
		<div class="footer">
			<template v-if="depositOrderDetail.customerStatus == '0'">
				<template v-if="depositOrderDetail.voucherFlag == 0">
					<div class="cancel_btn" @click="onCancelDepositOrder">{{ $t(`rechargeDetails['取消充值']`) }}</div>
					<div class="confirm_btn" @click="router.back()">{{ $t(`rechargeDetails['继续充值']`) }}</div>
				</template>
				<template v-else-if="depositOrderDetail.voucherFlag == 1">
					<div class="cancel_btn" @click="common.getSiteCustomerChannel">{{ $t(`rechargeDetails['联系客服']`) }}</div>
					<div v-if="depositOrderDetail.urgeOrder == 0" class="confirm_btn" @click="onUrgeOrder">{{ $t(`rechargeDetails['我要催单']`) }}</div>
				</template>
			</template>
			<template v-else>
				<div class="cancel_btn" @click="common.getSiteCustomerChannel">{{ $t(`rechargeDetails['联系客服']`) }}</div>
			</template>
		</div>
	</template>

	<!--上传凭证弹窗 -->
	<Model v-model:modelValue="isModalVisible">
		<template #default>
			<div class="popup_body">
				<div class="popup_header">
					<span>{{ $t(`rechargeDetails['上传凭证']`) }}</span>
					<SvgIcon class="icon" iconName="wallet/popup_close" @click="isModalVisible = false" />
				</div>
				<div class="popup_content">
					<div class="upload_content">
						<div class="upload_header">
							<span class="text_2">*</span>
							<span class="text_1">{{ $t(`rechargeDetails['请提供该笔充值成功信息截图']`) }}</span>
							<span class="text_2">{{ $t(`rechargeDetails['（图片限制10MB）']`) }}</span>
						</div>
						<div class="upload_list">
							<div class="upload_item" v-for="(item, index) in cashFlowFileList" :key="index">
								<img class="close_icon" :src="uploader_close" @click="onDeleteFile(index)" />
								<img :src="item.url" alt="" />
							</div>
							<van-uploader v-if="cashFlowFileList.length < 3" v-model="fileList" :preview-image="false" :show-upload="false" :after-read="afterRead">
								<div class="uploader">
									<img class="icon" :src="uploader_icon" />
								</div>
							</van-uploader>
						</div>
					</div>

					<div class="form_content">
						<div class="label">{{ $t(`rechargeDetails['我们会尽快为您核实']`) }}</div>
						<div class="form-info">
							<div class="info-item">
								<span class="label">{{ $t(`rechargeDetails['金额']`) }}</span>
								<span class="value fw_700">{{ common.getInstance().formatFloat(depositOrderDetail.applyAmount) }} {{ mainCurrency }}</span>
							</div>
							<div class="info-item">
								<span class="label">{{ $t(`rechargeDetails['状态']`) }}</span>
								<span class="value" :class="getClass">{{ depositOrderDetail.customerStatusText }}</span>
							</div>
							<div class="info-item">
								<span class="label">{{ $t(`rechargeDetails['时间']`) }}</span>
								<span class="value">{{ common.getInstance().dayFormat2(depositOrderDetail.createdTime) }}</span>
							</div>
						</div>
					</div>

					<div class="message_content">
						<div class="label">{{ $t(`rechargeDetails['留言(最多0/500个字符)']`, { value: cashFlowRemark.length }) }}</div>
						<van-cell-group class="van-cell-group" inset>
							<div class="field_container">
								<van-field ref="feedbackContent" v-model="cashFlowRemark" class="van-field" autosize type="textarea" :placeholder="$t(`rechargeDetails['请输入']`)" maxlength="500" />
							</div>
						</van-cell-group>
					</div>
					<div class="popup_footer">
						<Button @click="onSubmitProof">{{ $t(`rechargeDetails['提交']`) }}</Button>
					</div>
				</div>
			</div>
		</template>
	</Model>

	<!-- 加速成功弹窗 -->
	<Model v-model:modelValue="isUrgeModalVisible">
		<template #default>
			<div class="urge_content">
				<img class="icon" :src="UrgeOrder_success" alt="" />
				<p class="text mt_40">{{ $t(`rechargeDetails['订单加速成功']`) }}</p>
				<p class="text mt_20">{{ $t(`rechargeDetails['我们会尽快处理您的充值订单']`) }}</p>
				<Button class="mt_50" @click="isUrgeModalVisible = false">{{ $t(`rechargeDetails['好的']`) }}</Button>
			</div>
		</template>
	</Model>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet";
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import pubsub from "/@/pubSub/pubSub";
import { useUserStore } from "/@/store/modules/user";
import Model from "../components/model.vue";
import uploader_icon from "/@/assets/zh-CN/default/my/feedback/uploader_icon.png";
import uploader_close from "/@/assets/zh-CN/default/my/feedback/uploader_close.png";
import UrgeOrder_success from "/@/assets/zh-CN/default/wallet/UrgeOrder_success.png";
const route = useRoute();
const router = useRouter();
const UserStore = useUserStore();
interface depositOrderDetailRootObject {
	arriveAmount: string;
	orderNo: string;
	depositWithdrawWay: string;
	depositWithdrawTypeCode: string;
	depositWithdrawChannelType: string;
	tradeCurrencyAmount: number;
	applyAmount: number;
	exchangeRate?: any;
	feeRate: number;
	feeAmount: number;
	customerStatus: string | number;
	customerStatusText: string;
	createdTime: number;
	updatedTime: number;
	remindTime: number;
	accountName: string;
	accountAddress?: any;
	voucherFlag: number;
	cashFlowFile?: any;
	cashFlowFileList?: any;
	thirdPayUrl?: any;
	urgeOrder: number;
	transferAmount: number;
	areaCode?: string;
}

const depositOrderDetail = ref({} as depositOrderDetailRootObject); // 订单接口详情
const formattedTime = ref<string>(""); // 格式化倒计时为时分秒格式的响应式变量
const isModalVisible = ref(false); // 上传凭证弹窗
const isUrgeModalVisible = ref(false); // 订单加速弹窗
const fileList = ref([]); // 组件库上传文件
const cashFlowFileList = ref([] as any); // 服务器上传文件
const cashFlowRemark = ref(""); // 留言

// 表单映射
const fromFieldsList = {
	// 银行卡存款
	bank_card_recharge: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "充值金额",
				key: "applyAmount",
			},
			{
				label: "手续费",
				key: "feeAmount",
			},
			{
				label: "到账金额",
				key: "tradeCurrencyAmount",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "申请时间",
				key: "createdTime",
			},
			{
				label: "充值方式",
				key: "depositWithdrawWay",
			},
		],
	],
	// 电子钱包存款
	electronic_wallet_recharge: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "充值金额",
				key: "applyAmount",
			},
			{
				label: "手续费",
				key: "feeAmount",
			},
			{
				label: "到账金额",
				key: "tradeCurrencyAmount",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "申请时间",
				key: "createdTime",
			},
			{
				label: "充值方式",
				key: "depositWithdrawWay",
			},
		],
	],
	// 虚拟币存款
	crypto_currency_recharge: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "到账时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "存款方式",
				key: "depositWithdrawWay",
			},
			{
				label: "到账金额",
				key: "tradeCurrencyAmount",
			},
			{
				label: "手续费",
				key: "feeAmount",
			},
			{
				label: "汇率",
				key: "exchangeRate",
			},
			{
				label: "实际到账",
				key: "applyAmount",
			},
		],
	],
	// 上级转入
	superior_transfer: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "转入时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "存款方式",
				key: "tradeWayTypeText",
			},
			{
				label: "上级代理",
				key: "superAgentAccount",
			},
		],
	],
	// 上级转入
	manual_up: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "转入时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "存款方式",
				key: "tradeWayTypeText",
			},
		],
	],
	// 银行卡取款
	bank_card_withdraw: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "申请时间",
				key: "cratedTime",
			},
			{
				label: "到账时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "手续费",
				key: "feeAmount",
			},
			{
				label: "到账金额",
				key: "arriveAmount",
			},
			{
				label: "提款方式",
				key: "tradeWayTypeText",
			},
		],
		[
			{
				label: "银行名称",
				key: "bankName",
			},
			{
				label: "银行代码",
				key: "bankCode",
			},
			{
				label: "银行卡号",
				key: "bankCard",
			},
		],
	],
	// 电子钱包取款
	electronic_wallet_withdraw: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "申请时间",
				key: "cratedTime",
			},
			{
				label: "到账时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "手续费",
				key: "feeAmount",
			},
			{
				label: "到账金额",
				key: "arriveAmount",
			},
			{
				label: "提款方式",
				key: "tradeWayTypeText",
			},
		],
	],
	// 加密货币取款
	crypto_currency_withdraw: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "申请时间",
				key: "cratedTime",
			},
			{
				label: "到账时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "手续费",
				key: "feeAmount",
			},
			{
				label: "汇率",
				key: "exchangeRate",
			},
			{
				label: "到账金额",
				key: "arriveAmount",
			},
			{
				label: "提款方式",
				key: "tradeWayTypeText",
			},
		],
		[
			{
				label: "地址",
				key: "addressNo",
			},
		],
	],
	// 人工减额
	manual_down: [
		[
			{
				label: "状态",
				key: "customerStatus",
			},
			{
				label: "到账时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "提款方式",
				key: "tradeWayTypeText",
			},
		],
	],
	// 转换平台币
	platform_transfer: [
		[
			{
				label: "转换时间",
				key: "updatedTime",
			},
		],
		[
			{
				label: "订单号",
				key: "orderNo",
			},
			{
				label: "平台币转换金额",
				key: "arriveAmount",
			},
			{
				label: "汇率",
				key: "transferRate",
			},
		],
	],
};

// 银行卡取款动态表单，单独判断
const BankCardWithdrawalList = [
	{
		label: "姓名",
		key: "userName",
	},
	{
		label: "省",
		key: "provinceName",
	},
	{
		label: "城市",
		key: "cityName",
	},
	{
		label: "详细地址",
		key: "detailAddress",
	},
	{
		label: "邮箱地址",
		key: "userEmail",
	},
	{
		label: "手机号",
		key: "userPhone",
	},
];

const EWalletList = [
	{
		label: "姓名",
		key: "userName",
	},
	{
		label: "账号",
		key: "userAccount",
	},
	{
		label: "手机号",
		key: "userPhone",
	},
];

// 获取主货币类型
const mainCurrency = computed(() => UserStore.userInfo.mainCurrency);

// 定义通道方式映射表
const tradeWayConfig = {
	// 存款类型，包括银行卡充值、电子钱包充值、虚拟货币充值、人工充值、上级转账
	deposit: [
		"bank_card_recharge", // 银行卡充值
		"electronic_wallet_recharge", // 电子钱包充值
		"crypto_currency_recharge", // 虚拟货币充值
		"manual_up", // 人工充值
		"superior_transfer", // 上级转账
		"platform_transfer", // 平台币转换
	],
	// 提款类型，包括人工提款、银行卡提款、电子钱包提款、虚拟货币提款
	withdraw: [
		"manual_down", // 人工提款
		"bank_card_withdraw", // 银行卡提款
		"electronic_wallet_withdraw", // 电子钱包提款
		"crypto_currency_withdraw", // 虚拟货币提款
	],
	// 平台币转换类型
	platformTransfer: ["platform_transfer"], // 平台币转换
};

// 提取通用映射表，分别对应金额字段、标题
const fieldMap: Record<string, keyof typeof depositOrderDetail.value> = {
	crypto_currency_recharge: "applyAmount", // 虚拟货币充值时显示的申请金额字段
	crypto_currency_withdraw: "applyAmount", // 虚拟货币提现时显示的申请金额字段
	bank_card_recharge: "tradeCurrencyAmount", // 银行卡充值时显示的交易货币金额字段
	electronic_wallet_recharge: "tradeCurrencyAmount", // 电子钱包充值时显示的交易货币金额字段
	platform_transfer: "transferAmount", // 平台币转换时显示的转账金额字段
};

const titleMap: Record<string, string> = {
	...Object.fromEntries(tradeWayConfig.deposit.map((type) => [type, "存款详情"])),
	...Object.fromEntries(tradeWayConfig.withdraw.map((type) => [type, "提款详情"])),
	platform_transfer: "平台币转换详情",
};

// 通用函数：根据 tradeWayType 获取对应值
const getMappedValue = <T>(map: Record<string, T>, defaultValue: T): T => {
	return map[route.query.tradeWayType as string] || defaultValue;
};

// 计算显示的金额
const displayedAmount = computed(() => {
	const field = getMappedValue(fieldMap, "arriveAmount"); // 默认显示实际到账金额
	return depositOrderDetail.value[field];
});

// 获取页面标题
const navTitle = computed(() => {
	return getMappedValue(titleMap, ""); // 默认返回空字符串
});

// 判断加减符号
const getPlusMinusSign = () => {
	if (tradeWayConfig.deposit.includes(route.query.tradeWayType as string)) {
		return "+";
	}
	if (tradeWayConfig.withdraw.includes(route.query.tradeWayType as string)) {
		return "-";
	}
	return ""; // 默认返回空字符串
};

// 状态映射表
type Status = "0" | "1" | "2";
const statusMap: Record<Status, { label: string; className: string }> = {
	"0": { label: "处理中", className: "hint" },
	"1": { label: "成功", className: "success" },
	"2": { label: "失败", className: "error" },
};

// 获取状态名称
const getStatusLabel = computed(() => {
	const status = depositOrderDetail.value.customerStatus as Status | undefined; // 强制类型声明为 Status 或 undefined
	return (status && statusMap[status].label) || "";
});

// 根据状态返回对应的类名
const getClass = computed(() => {
	const status = depositOrderDetail.value.customerStatus as Status | undefined; // 强制类型声明为 Status 或 undefined
	return (status && statusMap[status].className) || "";
});

// 时间字段配置
const timeKeys = ["createdTime", "cratedTime", "updatedTime"];

// 金额字段配置
const amountKeys = ["arriveAmount", "applyAmount", "tradeCurrencyAmount"];

// 定义通用键类型
type MaskFieldKey = "bankCard" | "userAccount" | "addressNo" | "userPhone";

// 脱敏字段配置的类型
const maskKeys: Record<MaskFieldKey, boolean> = {
	bankCard: true, // 银行卡
	userAccount: true, // 电子钱包
	addressNo: true, // 虚拟货币地址
	userPhone: true, // 手机号
};

// 脱敏处理方法的类型
const maskFunctions: Record<MaskFieldKey, (value: any) => string> = {
	bankCard: common.getInstance().bankCardHiding,
	userAccount: common.getInstance().EWalletHiding,
	addressNo: common.getInstance().USDTAddressHiding,
	userPhone: common.maskString,
};

// 根据字段动态获取货币单位
const getCurrencyLabel = (key: string) => {
	if ((route.query.tradeWayType === "crypto_currency_withdraw" && key === "arriveAmount") || (route.query.tradeWayType === "crypto_currency_recharge" && key === "tradeCurrencyAmount")) {
		return "USDT";
	}
	return route.query.tradeWayType === "platform_transfer" ? UserStore.userInfo.platCurrencyName : UserStore.userInfo.mainCurrency;
};

onMounted(() => {
	const { query } = route;
	// 定义支持的充值类型
	const depositTypes = ["bank_card_recharge", "electronic_wallet_recharge"];
	const allRechargeTypes = [...depositTypes, "crypto_currency_recharge"];
	if (allRechargeTypes.includes(query.tradeWayType as string)) {
		getDepositOrderDetail();
		if (depositTypes.includes(query.tradeWayType as string)) {
			pubsub.subscribe("/wallet/rechargeSuccessFail", rechargeSuccessFail);
		}
	} else {
		tradeRecordDetail();
	}
});

// 收到订单推送订阅
const rechargeSuccessFail = (data) => {
	console.log("收到订单更新通知", data);
	if (depositOrderDetail.value.orderNo !== data.orderNo) return; // 订单号不同则就退出
	Object.assign(depositOrderDetail.value, data);
	if (depositOrderDetail.value.customerStatus !== "0") {
		clearInterval(startCountdown);
	}
};

// 获取存款订单详情
const getDepositOrderDetail = async () => {
	const params = {
		orderNo: route.query.orderNo,
	};
	const res = await walletApi.depositOrderDetail(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		depositOrderDetail.value = res.data;
		startCountdown();
	}
};

// 获取存款订单详情
const tradeRecordDetail = async () => {
	const params = { tradeType: route.query.tradeType, tradeWayType: route.query.tradeWayType, orderNo: route.query.orderNo };
	const res = await walletApi.tradeRecordDetail(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		// 银行卡 电子钱包 虚拟货币 取款
		if (
			route.query.tradeWayType === "bank_card_withdraw" ||
			route.query.tradeWayType === "electronic_wallet_withdraw" ||
			route.query.tradeWayType === "crypto_currency_withdraw" ||
			route.query.tradeWayType === "crypto_currency_recharge"
		) {
			depositOrderDetail.value = res.data.withdrawOrderDetailVO || {};
		}
		// 人工加减额
		if (route.query.tradeWayType === "manual_up" || route.query.tradeWayType === "manual_down") {
			depositOrderDetail.value = res.data.manualUpDownDetailVO || {};
		}
		// 上级转入转出
		if (route.query.tradeWayType === "superior_transfer") {
			depositOrderDetail.value = res.data.superTransferDetailVO || {};
		}
		// 平台币转换
		if (route.query.tradeWayType === "platform_transfer") {
			depositOrderDetail.value = res.data.platformTransferDetailVO || {};
		}
	}
};

// 提交上传凭证
const onSubmitProof = async () => {
	const urlString = cashFlowFileList.value.map((file) => file.fileKey).join(",");
	console.log(urlString);
	const params = {
		orderNo: route.query.orderNo,
		cashFlowFile: urlString,
		cashFlowRemark: cashFlowRemark.value,
	};
	const res = await walletApi.uploadVoucher(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		// 关闭弹窗
		isModalVisible.value = false;
		// 清空参数
		clearParams();
		// 重新获取订单状态
		getDepositOrderDetail();
	}
};

// 点击催单
const onUrgeOrder = async () => {
	const params = {
		orderNo: route.query.orderNo,
		channelType: depositOrderDetail.value.depositWithdrawChannelType,
		thirdPayUrl: depositOrderDetail.value.thirdPayUrl,
	};
	const res = await walletApi.urgeOrder(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		isUrgeModalVisible.value = true;
		// 重新获取订单状态
		getDepositOrderDetail();
	}
};

// 撤销充值订单
const onCancelDepositOrder = async () => {
	const params = {
		orderNo: route.query.orderNo,
		channelType: depositOrderDetail.value.depositWithdrawChannelType,
		thirdPayUrl: depositOrderDetail.value.thirdPayUrl,
	};
	const res = await walletApi.cancelDepositOrder(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		router.back();
	}
};

// 将秒数转化为时分秒格式
function formatTime(seconds: number): string {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// 倒计时函数
function startCountdown() {
	formattedTime.value = formatTime(depositOrderDetail.value.remindTime);
	const timer = setInterval(() => {
		if (depositOrderDetail.value.remindTime > 0) {
			depositOrderDetail.value.remindTime--;
			formattedTime.value = formatTime(depositOrderDetail.value.remindTime);
		} else {
			clearInterval(timer); // 倒计时结束，停止计时
		}
	}, 1000);
}

// 上传行为结束
const afterRead = async (file) => {
	if (common.getInstance().beforeAvatarUpload(file.file)) {
		await iconUploadImg(file.file);
	} else {
		fileList.value.pop();
	}
	return false;
};

/**
 * @param file 调用上传接口
 */
const iconUploadImg = async (file) => {
	const formaData = new window.FormData();
	formaData.append("file", file);
	const res: any = await CommonApi.uploadFile(formaData).catch((err) => {
		fileList.value.pop();
	});
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		cashFlowFileList.value.push(res.data);
	} else {
		fileList.value.pop();
	}
};

// 删除上传文件
const onDeleteFile = (index) => {
	// 删除 fileList 中对应 index 的文件
	if (fileList.value && index >= 0 && index < fileList.value.length) {
		fileList.value.splice(index, 1);
	}
	// 删除 cashFlowFileList 中对应 index 的文件
	if (cashFlowFileList.value && index >= 0 && index < cashFlowFileList.value.length) {
		cashFlowFileList.value.splice(index, 1);
	}
};

const clearParams = () => {
	fileList.value = [];
	cashFlowFileList.value = [];
	cashFlowRemark.value = "";
};

const onClickLeft = () => {
	router.back();
};

// 清除倒计时
onUnmounted(() => {
	clearInterval(startCountdown);
});
</script>

<style scoped lang="scss">
.deposit-details {
	font-family: "PingFang SC";
	padding: 24px;
	padding-bottom: 183px;
}

.status-bar {
	width: 100%;
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	background-image: linear-gradient(92deg, rgba(44, 45, 46, 0.6) 0%, #292d32 50%, rgba(44, 45, 46, 0.6) 100%), url("/@/assets/zh-CN/default/wallet/rechargeDetails_bg.png");
	background-size: cover; /* 确保图片覆盖整个元素 */
	background-position: center; /* 将图片居中 */
	background-repeat: no-repeat; /* 防止图片重复 */
	.value {
		@include themeify {
			color: themed("Theme");
		}
		font-family: "PingFang SC";
		font-size: 40px;
		font-weight: 500;
	}
	.label {
		@include themeify {
			color: themed("Theme");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 500;
	}
}

.deposit-info {
	margin-top: 24px;
	padding: 0px 24px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}

	.info-item {
		width: 100%;
		height: 76px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid;
		@include themeify {
			border-color: themed("Line");
		}
		&:last-child {
			border-bottom: 0px;
		}
		.label {
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
		.value {
			display: flex;
			align-items: center;
			gap: 10px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
		.icon {
			width: 36px;
			height: 36px;
		}
	}
}

.info-item {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}

.label {
	color: #9a9a9c;
}

.value {
	color: #ffffff;
}

.progress {
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
	.steps {
		margin-top: 24px;
	}

	.step {
		display: flex;
		align-items: flex-start;
	}

	.circle {
		width: 36px;
		margin-right: 20px;
		.header {
			width: 36px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			.step_icon {
				width: 32px;
				height: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				@include themeify {
					background-color: themed("T3");
					color: themed("TB1");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 500;
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
		.line {
			width: 4px;
			height: 144px;
			margin: 8px auto;
			@include themeify {
				background-color: themed("T3");
			}
			border-radius: 2px;
		}
		.highlight {
			@include themeify {
				background-color: themed("Wam-P1");
			}
		}
	}

	.content {
		flex-grow: 1;
		.title {
			height: 38px;
			min-height: 38px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}

		.description {
			min-height: 144px;
			margin: 8px 0px;
			.text {
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}

			.text_2 {
				@include themeify {
					color: themed("Theme");
				}
			}
			.a {
				@include themeify {
					color: themed("F2");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				text-decoration: underline;
			}
		}
	}
}

.proof_list {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 56px;
	padding: 24px;
	margin-top: 24px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
	.proof_item {
		width: 160px;
		height: 160px;
		border-radius: 14px;
		// border: 1px solid;
		// @include themeify {
		// 	border-color: themed("Theme");
		// }
	}
}

.footer {
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 159px;
	display: flex;
	gap: 26px;
	padding: 24px 24px 50px;
	border-radius: 24px 24px 0px 0px;
	@include themeify {
		background-color: themed("BG4");
	}
	box-sizing: border-box;
	.cancel_btn,
	.confirm_btn {
		flex: 1;
		height: 86px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid;
		@include themeify {
			border-color: themed("Theme");
		}
		border-radius: 12px;
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
	}
	.cancel_btn {
		@include themeify {
			color: themed("Theme");
		}
	}
	.confirm_btn {
		@include themeify {
			color: themed("TB1");
			background-color: themed("Theme");
		}
	}
}

.success {
	@include themeify {
		color: themed("Wam-P1") !important;
	}
}
.error {
	@include themeify {
		color: themed("Hint") !important;
	}
}
.hint {
	@include themeify {
		color: themed("F2") !important;
	}
}

// 弹窗样式

:deep(.modal-container) {
	width: 686px;
}

.popup_body {
	.popup_header {
		width: 100%;
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
		border-bottom: 1px solid;
		@include themeify {
			color: themed("TB");
			border-color: themed("Line");
		}
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 500;
		box-sizing: border-box;
		.icon {
			width: 48px;
			height: 48px;
		}
	}

	.popup_content {
		padding: 24px;
		.upload_content {
			.upload_header {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				.text_2 {
					font-size: 22px;
					@include themeify {
						color: themed("Theme");
					}
				}
			}
			.upload_list {
				display: flex;
				padding: 24px 17px 12px 17px;
				gap: 24px;
				.upload_item {
					position: relative;
					width: 130px;
					height: 130px;
					margin: 0px;

					.close_icon {
						position: absolute;
						top: -12px;
						right: -12px;
						width: 32px;
						height: 32px;
					}
					img {
						width: 100%;
						height: 100%;
						border-radius: 12px;
					}
				}

				.uploader {
					width: 130px;
					height: 130px;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 2px solid;
					@include themeify {
						border-color: themed("T2");
					}
					border-radius: 12px;
					.icon {
						width: 36px;
						height: 36px;
					}
				}
			}
		}

		.form_content,
		.message_content {
			margin-top: 12px;
			.label {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}

			.form-info {
				margin: 12px 20px;

				.info-item {
					width: 100%;
					height: 62px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid;
					@include themeify {
						border-color: themed("Line");
					}
					&:last-child {
						border-bottom: 0px;
					}
					.label {
						@include themeify {
							color: themed("T1");
						}
						font-family: "PingFang SC";
						font-size: 28px;
						font-weight: 400;
					}
					.value {
						@include themeify {
							color: themed("TB");
						}
						font-family: "PingFang SC";
						font-size: 28px;
						font-weight: 400;
					}

					.fw_700 {
						font-weight: 700;
					}
				}
			}
		}

		.popup_footer {
			margin-top: 36px;
		}
	}
}

.van-cell-group {
	margin: 0px;
	margin-top: 12px;
	height: 193px;
	border-radius: 20px;
	@include themeify {
		background: themed("BG3");
	}
	.field_container {
		width: 100%;
		height: 100%;
		.van-cell {
			width: calc(100% - 30px);
			height: calc(100% - 24px);
			margin: 15px 12px;
			padding: 0px;
			border: none;
			@include themeify {
				background: themed("BG3");
			}
			overflow-y: auto; /* 添加垂直滚动 */
		}
		/* 隐藏 Chrome、Safari 和 Edge 中的滚动条 */
		.van-cell::-webkit-scrollbar {
			display: none;
		}
	}
}

.message_content {
	:deep(.van-field__control) {
		@include themeify {
			color: themed("TB") !important;
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		&::placeholder {
			@include themeify {
				color: themed("T3") !important;
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
	}
}

.urge_content {
	padding: 24px;
	.icon {
		width: 128px;
		height: 112px;
		margin: 18px auto 0px;
	}
	.text {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
		text-align: center;
	}
}
</style>
