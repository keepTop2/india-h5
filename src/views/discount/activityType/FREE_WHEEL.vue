<template>
	<div class="first-deposit-activity">
		<VantNavBar title="免费旋转" @onClickLeft="router.back()" />

		<div class="content">
			<img src="../image/firstDeposit.png" class="main-image" />
			<div class="bonus-card">
				<div class="bonus-header">红利赠送</div>
				<div class="bonus-content">
					<div class="bonus-row1">
						<div class="bonus-row">
							<span class="text">存款金额</span>
							<span class="Amount"><span>$</span>{{ depositAmount }}</span>
						</div>
						<div class="bonus-row1-line"></div>
						<div class="bonus-row">
							<span class="text">需打流水</span>
							<span class="Amount"><span>$</span>{{ requiredTurnover }}</span>
						</div>
					</div>
					<div class="bonus-row-line"></div>
					<div class="bonus-row2">
						<span>可得金额:</span>
						<span class="Amount highlight"><span>$</span>{{ bonusAmount }}</span>
					</div>
				</div>
				<button class="apply-button">立即申请</button>
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
						<p class="value">全体会员</p>
					</div>
					<div class="detail-row">
						<p class="label">
							<span>活动时间</span>
						</p>
						<p class="value">{{ activityPeriod }}</p>
					</div>
					<div class="detail-row">
						<p class="label">
							<span>活动描述</span>
						</p>
						<p class="value">{{ activityDescription }}</p>
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
					<div class="detail-row">
						<p>活动时间：2024年1月15日~长期</p>
					</div>
					<div class="detail-row">
						<p>活动对象：首存会员</p>
					</div>
					<div class="rules-row">
						<p>1、这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是</p>
					</div>
					<div class="rules-row">
						<p>1、这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是</p>
					</div>
				</div>
				<div class="detail-footer"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import firstDeposit from "../image/firstDeposit.svg";

import { ref } from "vue";
import { activityApi } from "/@/api/activity";
const router = useRouter();
const route = useRoute();
const depositAmount = ref(100.0);
const requiredTurnover = ref(100.0);
const bonusAmount = ref(50.0);

const activityPeriod = ref("2024-08-10 12:00:00 ~2024-08-10 12:00:00");
const activityDescription = ref("所有会员每日（美东时间）在真人场馆投注即可参与流水排名，每日前10名将按比例瓜分奖池");

const rulesPeriod = ref("2024年1月15日~长期");
const rulesTarget = ref("首存会员");
const activityRules = ref([
	"这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是活动内容活动内容这是活动内容活动内容活动内容活动内容这是",
	"这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是活动内容活动内容这是活动内容活动内容活动内容活动内容这是",
]);
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
</script>

<style lang="scss" scoped>
.first-deposit-activity {
	@include themeify {
		color: themed("TB");
	}
	padding: 0 22px;
	font-size: 24px;
	:deep(.vantNavBar) {
		box-shadow: none;
	}
	min-height: 100vh;
	background: url("/@/assets/zh-CN/default/vip/vip_content_bg.png") center top / 100% 100% no-repeat;
	background-attachment: fixed;
	/* 背景图像固定 */
	box-sizing: border-box;

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
	}

	.main-image {
		width: 100%;
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
			background: linear-gradient(283deg, #ff284b 7.2%, #fd677f 97.93%);
			color: white;
			border: none;
			width: calc(100% - 95px);
			padding: 20px;
			margin: 20px 42.5px 42px;
			border-radius: 10px;
			box-sizing: border-box;
			font-size: 26px;
			cursor: pointer;
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
			min-height: 300px;
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
				margin: 24px 0;
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
