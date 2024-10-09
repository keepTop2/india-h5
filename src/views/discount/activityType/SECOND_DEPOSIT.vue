<template>
	<div class="first-deposit-activity">
		<VantNavBar :title="activityData?.activityNameI18nCode" @onClickLeft="router.back()" />
		<img :src="activityData?.headPicturePcI18nCode" class="main-image" />
		<div class="content">
			<div class="bonus-card">
				<div class="bonus-header">红利赠送</div>
				<div class="bonus-content">
					<div class="bonus-row1">
						<div class="bonus-row">
							<span class="text">存款金额</span>
							<span class="Amount"
								>{{ activityData?.depositAmount }} <span>{{ activityData?.depositCurrencyCode }}</span></span
							>
						</div>
						<div class="bonus-row1-line"></div>
						<div class="bonus-row">
							<span class="text">需打流水</span>
							<span class="Amount"
								>{{ activityData?.runningWater }} <span>{{ activityData?.runningWaterCurrencyCode }}</span>
							</span>
						</div>
					</div>
					<div class="bonus-row-line"></div>
					<div class="bonus-row2">
						<span>可得金额:</span>
						<span class="Amount highlight"
							>{{ activityData?.activityAmount }} <span>{{ activityData?.activityAmountCurrencyCode }}</span></span
						>
					</div>
				</div>
				<button class="apply-button active" @click="apply">{{ activityData?.status == 10000 ? "立即申请" : "您已申请" }}</button>
			</div>

			<div class="activity-details">
				<div class="detail_icon">
					<img src="../image/detail_icon.png" alt="" />
				</div>
				<div class="details-header">
					<div class="details-header-title-left">
						<img src="../image/details-header-title-left.png" alt="" />
					</div>
					活动条件
					<div class="details-header-title-right">
						<img src="../image/details-header-title-right.png" alt="" />
					</div>
				</div>
				<div class="detail-content">
					<div class="detail-row">
						<p class="label">
							<span>活动对象</span>
						</p>
						<p class="value">{{ activityData?.userTypeName }}</p>
					</div>
					<div class="detail-row">
						<p class="label">
							<span>活动时间</span>
						</p>
						<p class="value">{{ dayjs(activityData?.activityStartTime).format("YYYY-MM-DD HH:mm:ss") }}~{{ dayjs(activityData?.activityEndTime).format("YYYY-MM-DD HH:mm:ss") }}</p>
					</div>
					<div class="detail-row">
						<p class="label">
							<span>活动描述</span>
						</p>
						<p class="value">{{ activityData?.activityDescI18nCode }}</p>
					</div>
				</div>
				<div class="detail-footer"></div>
			</div>

			<div class="activity-details">
				<div class="details-header">
					<div class="details-header-title-left">
						<img src="../image/details-header-title-left.png" alt="" />
					</div>
					活动规则
					<div class="details-header-title-right">
						<img src="../image/details-header-title-right.png" alt="" />
					</div>
				</div>
				<div class="detail-content">
					<div v-html="activityData?.activityRuleI18nCode"></div>
				</div>
				<div class="detail-footer"></div>
			</div>
		</div>
		<activityDialog v-model="showDialog" title="温馨提示" :confirm="confirmDialog">
			{{ dialogInfo.message }}
			<template v-slot:footer v-if="dialogInfo.status === 30049"> 去存款 </template>
		</activityDialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { activityApi } from "/@/api/activity";
import activityDialog from "../components/Dialog.vue";
import dayjs from "dayjs";
import { useUserStore } from "/@/store/modules/user";
import { showToast } from "vant";
const router = useRouter();
const route = useRoute();
const showDialog = ref(false);
const dialogInfo: any = ref({});
const activityInfo = JSON.parse(decodeURIComponent(route.query.data as string));
const activityData = ref();
onBeforeMount(() => {
	getConfigDetail();
});
const getConfigDetail = () => {
	const params = {
		activityTemplate: activityInfo.activityTemplate,
		id: activityInfo.id,
	};
	activityApi.getConfigDetail(params).then((res) => {
		activityData.value = res.data;
	});
};
const apply = () => {
	if (!useUserStore().getUserInfo.phone && !useUserStore().getUserInfo.email) {
		dialogInfo.value = {
			message: "很抱歉，您不符合参与活动条件, 参与活动前需要验证绑定您的手机号和邮箱号码，请尽快完善资料",
		};
		showDialog.value = true;
		return;
	}

	activityApi.toActivity({ id: activityInfo.id }).then((res: any) => {
		if (res.code === 10000) {
			if (res.data.status !== 10000) {
				dialogInfo.value = res.data;
				showDialog.value = true;
			} else {
				showToast("申请成功");
				getConfigDetail();
			}
		}
	});
};
const confirmDialog = () => {
	if (dialogInfo.value.status === 30049) {
		router.push("/wallet/recharge");
	}
	showDialog.value = false;
};
</script>

<style lang="scss" scoped>
.first-deposit-activity {
	min-height: 100vh;
	background: url("/@/assets/zh-CN/default/vip/vip_content_bg.png") center top / 100% 100% no-repeat;
	background-attachment: fixed;
	/* 背景图像固定 */
	box-sizing: border-box;
	@include themeify {
		color: themed("TB");
	}
	padding: 0;
	font-size: 24px;
	:deep(.vantNavBar) {
		box-shadow: none;
	}

	header {
		text-align: center;
		margin-bottom: 20px;
		margin-top: 60px;
		h1 {
			background: linear-gradient(90deg, #ff284b 0%, #ff667f 50%, #ff284b 100%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin-bottom: 22px;
			text-align: center;
			text-shadow: 0px 4px 4px rgba(255, 40, 75, 0.3);
			font-family: "Paytone One";
			font-size: 50px;
			font-style: normal;
			font-weight: 400;
			line-height: 42px; /* 84% */
			text-transform: uppercase;
		}

		h2 {
			font-size: 18px;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 24px;
	}

	.main-image {
		height: 580px;
		width: 100%;
		object-fit: cover;
		margin-bottom: 20px;
	}
	.bonus-card {
		background: url("../image/bonus-card.png");
		background-size: 100% 100%;
		border-radius: 10px;
		overflow: hidden;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		.bonus-header {
			color: white;
			margin-top: -8px;
			text-align: center;
		}

		.bonus-content {
			color: black;
			padding: 15px 45px;
			.bonus-row1 {
				display: flex;
				margin: 40px 0 20px;
				padding-bottom: 20px;

				@include themeify {
					border-bottom: 1px solid themed("T3");
				}
			}
			.bonus-row {
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 10px;
				.text {
					font-size: 26px;
					margin-bottom: 5px;
				}
			}
			.bonus-row2 {
				margin-top: 16px;
				height: 50px;
				line-height: 50px;
				text-align: center;
			}
			.Amount {
				font-size: 38px;

				font-weight: 900;
				@include themeify {
					color: themed("T4");
				}
				span {
					font-size: 26px;
				}
				&.highlight {
					color: #ff4d4d;
				}
			}

			.bonus-row1-line {
				width: 1px;
				@include themeify {
					background: themed("T3");
				}
			}
		}

		.apply-button {
			background: url("../image/btnBg.png");
			background-size: 100% 100%;
			color: white;
			border: none;
			width: calc(100% - 95px);
			padding: 20px 20px 30px;
			margin: 20px 42.5px 42px;
			border-radius: 10px;
			box-sizing: border-box;
			font-size: 26px;
			cursor: pointer;
		}
		.apply-button.active {
			background: url("../image/btnActiveBg.png");
			background-size: 100% 100%;
		}
	}

	.activity-details,
	.activity-rules {
		border-radius: 10px;
		padding: 15px;
		width: 100%;
		margin-bottom: 20px;
		background: url("../image/detail_bg.png");
		background-size: 100%;
		position: relative;
		.detail_icon {
			position: absolute;
			right: 62px;
			top: 120px;
			img {
				height: 160px;
				border-radius: 16px;
			}
		}
		.details-header {
			background: url("../image/detail_header.png");
			background-size: 100% 100%;
			height: 112px;
			line-height: 112px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				height: 6px;
				margin: 0 56px;
			}
		}
		.detail-content {
			padding: 0 62px;
			background: url("../image/detail_content.png") no-repeat;
			background-size: 100% 100%;
			.detail-row {
				.label {
					height: 50px;
					line-height: 50px;
					background: url("../image/detail_label_bg.png") no-repeat;
					background-size: auto 100%;
					margin-bottom: 16px;
					span {
						padding-left: 60px;
					}
				}
				.value {
					margin-bottom: 24px;
				}
				&:last-child {
					.value {
						margin-bottom: 0;
					}
				}
			}
			.rules-row {
				margin: 0 24px 24px;
			}
		}
		.detail-footer {
			height: 66px;
			background: url("../image/detail_footer.png");
			background-size: 100% 100%;
		}
	}

	.activity-rules {
		ol {
			padding-left: 20px;
		}

		li {
			margin-bottom: 10px;
		}
	}
}
</style>
