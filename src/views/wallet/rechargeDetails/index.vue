<template>
	<VantNavBar :title="$t(`VantNavBar['存款详情']`)" @onClickLeft="onClickLeft" />
	<div class="deposit-details">
		<div class="status-bar">
			<span class="value">+{{ depositOrderDetail.tradeCurrencyAmount }}</span
			>&nbsp;<span class="label">{{ UserStore.userInfo.mainCurrency }}</span>
		</div>

		<div class="deposit-info">
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['状态']`) }}</span>
				<span class="value" :class="getClass">{{ depositOrderDetail.customerStatusText }}</span>
			</div>
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['充值金额']`) }}</span>
				<span class="value">{{ common.getInstance().formatFloat(depositOrderDetail.applyAmount) }} {{ UserStore.userInfo.mainCurrency }}</span>
			</div>
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['手续费']`) }}</span>
				<span class="value">
					<span v-if="depositOrderDetail.feeAmount > 0">-</span>
					<span>{{ common.getInstance().formatFloat(depositOrderDetail.feeAmount) }}</span>
					<span>{{ UserStore.userInfo.mainCurrency }}</span>
				</span>
			</div>
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['到账金额']`) }}</span>
				<span class="value">{{ common.getInstance().formatFloat(depositOrderDetail.tradeCurrencyAmount) }} {{ UserStore.userInfo.mainCurrency }}</span>
			</div>
		</div>

		<div class="deposit-info">
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['订单号']`) }}</span>
				<span class="value">{{ depositOrderDetail.orderNo }}</span>
			</div>
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['申请时间']`) }}</span>
				<span class="value">{{ common.getInstance().dayFormat2(depositOrderDetail.createdTime) }}</span>
			</div>
			<div class="info-item">
				<span class="label">{{ $t(`rechargeDetails['充值方式']`) }}</span>
				<span class="value">{{ depositOrderDetail.depositWithdrawWay }}</span>
			</div>
		</div>

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
								<span v-if="depositOrderDetail.customerStatus != 0">2</span>
								<SvgIcon v-else iconName="wallet/deal_success" />
							</div>
						</div>
						<div class="line"></div>
					</div>
					<div class="content">
						<div class="title">{{ $t(`rechargeDetails['第三方商户处理中']`) }}</div>
						<div class="description">
							<p class="text">{{ $t(`rechargeDetails['此过程可能需要1小时，更新于']`, { value: common.getInstance().dayFormat2(depositOrderDetail.updatedTime) }) }}</p>
							<p v-if="depositOrderDetail.voucherFlag == 0">
								<span class="a" @click="isModalVisible = true">{{ $t(`rechargeDetails['提供转账凭证']`) }}</span>
							</p>
							<p v-if="depositOrderDetail.customerStatus == 0" class="text">
								<i18n-t keypath="rechargeDetails['超时']" :tag="'p'">
									<template v-slot:value>
										<span class="text_2"> {{ formattedTime }} </span>
									</template>
								</i18n-t>
							</p>
						</div>
					</div>
				</div>
				<div class="step">
					<div class="circle">
						<div class="header">
							<div class="step_icon">3</div>
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
	</div>
	<div class="footer">
		<template v-if="depositOrderDetail.voucherFlag === 0">
			<div class="cancel_btn" @click="onCancelDepositOrder">{{ $t(`rechargeDetails['取消充值']`) }}</div>
			<div class="confirm_btn" @click="router.push('/wallet/recharge')">{{ $t(`rechargeDetails['继续充值']`) }}</div>
		</template>
		<template v-else-if="depositOrderDetail.voucherFlag === 1">
			<div class="cancel_btn">{{ $t(`rechargeDetails['联系客服']`) }}</div>
			<div v-if="depositOrderDetail.urgeOrder === 0" class="confirm_btn" @click="onUrgeOrder">{{ $t(`rechargeDetails['我要催单']`) }}</div>
		</template>
	</div>

	<!--上传凭证弹窗 -->
	<Model v-model:modelValue="isModalVisible">
		<template #default>
			<div class="popup_body">
				<div class="popup_header">
					<span>{{ $t(`rechargeDetails['上传凭证']`) }}</span>
					<SvgIcon class="icon" iconName="wallet/popup_close" />
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
								<span class="value fw_700">{{ common.getInstance().formatFloat(depositOrderDetail.applyAmount) }} {{ UserStore.userInfo.mainCurrency }}</span>
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
import activitySocketService from "/@/utils/activitySocketService";
const websocketService = activitySocketService.getInstance();
const route = useRoute();
const router = useRouter();
const UserStore = useUserStore();
interface depositOrderDetailRootObject {
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
}

const depositOrderDetail = ref({} as depositOrderDetailRootObject); // 订单接口详情
const formattedTime = ref<string>(""); // 格式化倒计时为时分秒格式的响应式变量
const isModalVisible = ref(false); // 上传凭证弹窗
const isUrgeModalVisible = ref(false); // 订单加速弹窗
const fileList = ref([]); // 组件库上传文件
const cashFlowFileList = ref([] as any); // 服务器上传文件
const cashFlowRemark = ref(""); // 留言

onMounted(() => {
	getDepositOrderDetail();
	console.log("开始推送数据");
	// websocketService.connect().then(() => {
	// 	websocketService.send("/wallet/rechargeSuccessFail");
	// });
	// 监听 WebSocket 重连事件，以便局部组件可以重新订阅消息
	// pubsub.subscribe("websocket_reconnected", () => {
	// 	websocketService.send("/wallet/rechargeSuccessFail");
	// });
	pubsub.subscribe("/wallet/rechargeSuccessFail", rechargeSuccessFail);
});

// 收到订单推送订阅
const rechargeSuccessFail = (data) => {
	console.log("收到订单更新通知", data, depositOrderDetail);
	Object.assign(depositOrderDetail.value, data);
	console.log("depositOrderDetail.value", depositOrderDetail.value);
};

// 获取订单详情
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
		router.push("/wallet/recharge");
	}
};

// 根据状态返回对应的类名
const getClass = computed(() => {
	switch (depositOrderDetail.value.customerStatus) {
		case "0":
			return "hint"; // 处理中
		case "1":
			return "success"; // 成功
		case "2":
			return "error"; // 失败
		default:
			return ""; // 默认类
	}
});

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
	window.history.back();
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
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
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
					color: themed("Wam-P1");
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
	color: themed("Wam-P1") !important;
}
.error {
	color: themed("Theme") !important;
}
.hint {
	color: themed("Hint") !important;
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
