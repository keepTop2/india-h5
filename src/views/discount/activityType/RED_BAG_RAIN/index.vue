<template>
	<div class="activityWrapper">
		<VantNavBar title="红包雨" @onClickLeft="onClickLeft" />

		<div class="activityMain">
			<div class="activityImg">
				<VantLazyImg :src="redBagInfo?.headPicturePcI18nCode" class="main-image" />
				<div class="shadow"></div>
			</div>
			<div class="content">
				<div class="pr_20 pl_20">
					<div class="bonus-card">
						<div class="bonus-header">红包雨</div>
						<div class="bonus-content">
							<div class="bonus-row1 color_Theme">{{ redBagInfo.clientStatus == 1 ? "距离本场红包雨结束" : redBagInfo.clientStatus == 2 ? "本期红包雨已结束" : "距离下一场红包雨还有" }}</div>
							<div class="countdown" :class="redBagInfo.clientStatus == 2 ? 'isOver' : ''">
								<span class="">{{ Common.convertMilliseconds(countdown * 1000) }}</span>
							</div>
						</div>
						<button class="apply-button" @click="getActivityReward" :class="redBagInfo.clientStatus == 1 ? 'active' : ''">抢</button>
					</div>
				</div>
				<div class="activity-details">
					<div class="details-header">
						<div class="details-header-title-left">
							<img src="../../image/details-header-title-left.png" alt="" />
						</div>
						红包雨场次
						<div class="details-header-title-right">
							<img src="../../image/details-header-title-right.png" alt="" />
						</div>
					</div>
					<div class="detail-content">
						<div class="sessionsBox">
							<div class="sessions">
								<div v-for="(item, index) in redBagInfo.sessionInfoList" class="session" :key="index">
									<div class="color_T1">{{ Common.dayFormatHM(item.startTime) }}</div>
									<div class="sideBox">
										<img src="./image/sessionCricle.png" alt="" v-if="item.status == 0" />
										<img src="./image/sessionCricle1.png" alt="" v-if="item.status == 1" />
										<img src="./image/sessionCricle2.png" alt="" v-if="item.status == 2" />
									</div>
									<div :class="'status' + item.status">{{ item.status == 0 ? "未开始" : item.status == 1 ? "进行中" : "已结束" }}</div>
									<span class="side" :class="'type' + item.status"></span>
								</div>
							</div>
						</div>
					</div>
					<div class="detail-footer"></div>
				</div>

				<div class="activity-details" v-if="redBagInfo.winnerList?.length > 0">
					<div class="details-header">
						<div class="details-header-title-left">
							<img src="../../image/details-header-title-left.png" alt="" />
						</div>
						<span>中奖名单</span>
						<div class="details-header-title-right">
							<img src="../../image/details-header-title-right.png" alt="" />
						</div>
					</div>
					<div class="detail-content">
						<div class="winnerListTable">
							<div class="winnerListHeader">
								<div>会员账号</div>
								<div>获得红包</div>
								<div>时间</div>
							</div>
							<div class="winnerListBody" v-for="(item, index) in redBagInfo.winnerList" :key="index">
								<div>{{ item.userId }}</div>
								<div>{{ item.redBagAmount }}</div>
								<div>{{ item.hitTime }}</div>
							</div>
						</div>
					</div>
					<div class="detail-footer"></div>
				</div>
				<div class="activity-details">
					<div class="details-header">
						<div class="details-header-title-left">
							<img src="../../image/details-header-title-left.png" alt="" />
						</div>
						<span>活动规则</span>
						<div class="details-header-title-right">
							<img src="../../image/details-header-title-right.png" alt="" />
						</div>
					</div>
					<div class="detail-content">
						<div v-html="redBagInfo.ruleDesc"></div>
					</div>
					<div class="detail-footer"></div>
				</div>
			</div>
		</div>
		<RED_BAG_RAIN_Dialog v-model="shwoDialog" title="温馨提示" :confirm="confirmDialog" class="redBagRainResult">
			<div class="mt_20 mb_20">
				{{ dialogInfo.message }}
			</div>
			<template v-slot:footer v-if="[30045, 30053].includes(dialogInfo.status)"> 去绑定 </template>
			<!-- <div class="Text3">您领取的红包太多啦，请下一场次再参与</div>
			<img src="./image/pityIcon.png" alt="" /> -->
		</RED_BAG_RAIN_Dialog>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { activityApi } from "/@/api/activity";
import { useRouter } from "vue-router";
import { useActivityStore } from "/@/store/modules/activity";
import Common from "/@/utils/common";
import { useCountdown } from "/@/hooks/countdown";
import RED_BAG_RAIN_Dialog from "./RED_BAG_RAIN_Dialog/index.vue";
const { countdown, startCountdown, stopCountdown } = useCountdown();
const activityStore = useActivityStore();
const router = useRouter();
const redBagInfo: any = ref({});
const shwoDialog = ref(false);
const dialogInfo: any = ref({});

onMounted(() => {
	getRedBagInfo();
});
watch(
	() => countdown.value,
	() => {
		if (countdown.value == 0) {
			stopCountdown();
			getRedBagInfo();
		}
	}
);
const getRedBagInfo = async () => {
	stopCountdown();
	await activityApi.getRedBagInfo().then((res: any) => {
		if (res.code === 10000) {
			redBagInfo.value = res.data;
			activityStore.setActivityData(res.data);
			// 判断活动在进行中
			if (redBagInfo.value.clientStatus === 1) {
				// 进行中倒计时
				startCountdown(redBagInfo.value.advanceTime);
				// 判断活动已活动已全部结束
			} else if (redBagInfo.value.clientStatus === 2) {
				//  获取明天第一场的时间z
				// startCountdown();
			} else if (redBagInfo.value.clientStatus === 0) {
				//  获取下一场比赛的时间
				const time = res.data.sessionInfoList.find((item) => item.redbagSessionId == res.data.redbagSessionId).startTime - new Date().getTime();
				startCountdown(Math.floor(time / 1000));
			}
		} else {
			router.back();
		}
	});
};
const getActivityReward = async () => {
	if (redBagInfo.value.clientStatus == 1) {
		await activityApi.redBagParticipate({ redbagSessionId: redBagInfo.value.redbagSessionId }).then((res: any) => {
			if (res.data.status === 10000) {
				activityStore.setIsShowRedBagRain(true);
				router.push("/");
			} else {
				dialogInfo.value = res.data;
				shwoDialog.value = true;
			}
		});
	} else {
		// 活动不在进行中
		await getRedBagInfo();
		if (redBagInfo.value.clientStatus == 1) {
			getActivityReward();
		}
		// 校验参与资格
	}
};
const onClickLeft = () => {
	router.back();
};
const confirmDialog = () => {
	if ([30045, 30053].includes(dialogInfo.value.status)) {
		router.push("/securityCenter");
	}
	shwoDialog.value = false;
};
</script>
<style scoped lang="scss">
.activityWrapper {
	@include themeify {
		color: themed("TB");
	}
	.activityImg {
		width: 100%;
		background-size: 100% auto;
		position: relative;
		img {
			width: 100%;
		}
		.shadow {
			height: 84px;
			background: linear-gradient(180deg, rgba(34, 36, 42, 0) 0%, #22242a 100%);
			position: absolute;
			bottom: 0;
			width: 100%;
		}
	}
}

.bonus-card {
	background: url("../../image/bonus-card.png");
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
			margin: 40px 0 20px;
			padding-bottom: 20px;
			text-align: center;
		}
		.countdown {
			background: url("./image/countdownBg.png") no-repeat;
			width: 320px;
			background-size: 100% 100%;
			text-align: center;
			margin: 0 auto;
			height: 68px;
			line-height: 68px;
			font-weight: 600;
			@include themeify {
				color: themed("Theme");
			}
		}
		.isOver {
			background: url("./image/overCountdownBg.png") no-repeat;
			width: 320px;
			background-size: 100% 100%;
			text-align: center;
			margin: 0 auto;
			height: 68px;
			line-height: 68px;
			font-weight: 600;
			@include themeify {
				color: themed("Theme");
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
		background: url("./image/btnBg.png") no-repeat;
		background-size: 100% 100%;
		color: white;
		border: none;
		height: 68px;
		width: calc(100% - 95px);
		margin: 20px 42.5px 42px;
		border-radius: 10px;
		padding-bottom: 13px;
		font-size: 26px;
		cursor: pointer;
	}
	.apply-button.active {
		background: url("./image/btn_active.png") no-repeat;
		background-size: 100% 100%;
	}
}
.main-image {
	height: 580px;
	width: 100%;
	object-fit: cover;
	margin-bottom: 20px;
}

.activity-details {
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 20px;
	background: url("../../image/detail_bg.png");
	background-size: 100%;
	position: relative;
	box-sizing: border-box;
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
		background: url("../../image/detail_header.png") no-repeat;
		background-size: 100% 100%;
		height: 112px;
		line-height: 112px;
		width: 100%;
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

		background: url("../../image/detail_content.png") no-repeat;
		background-size: 100% 100%;
		font-size: 24px;
		.detail-row {
			.label {
				height: 50px;
				line-height: 50px;
				background: url("../../image/detail_label_bg.png") no-repeat;
				background-size: auto 100%;
				margin-bottom: 16px;
				span {
					padding-left: 60px;
				}
			}
			.value {
				margin-bottom: 24px;
			}
		}
		.detail-row:last-child {
			.label {
				margin-bottom: 0;
			}
			.value {
				margin-bottom: 0;
			}
		}
		.rules-row {
			margin: 24px 0;
		}
		.winnerListTable {
			border: 2px solid rgba(255, 40, 75, 0.4);
			border-radius: 12px;
			border-top: none;
			.winnerListHeader,
			.winnerListBody {
				display: flex;
				> div {
					flex: 1;
					height: 64px;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					border-bottom: 2px solid rgba(255, 40, 75, 0.4);
					border-right: 2px solid rgba(255, 40, 75, 0.4);
				}
				> div:last-child {
					border-right: none;
				}
			}
			.winnerListHeader {
				border-radius: 12px 12px 0 0;
				background: linear-gradient(180deg, rgba(255, 40, 75, 0.7) 0%, rgba(255, 40, 75, 0.4) 100%);
			}
		}
		.sessionsBox {
			padding-bottom: 10px;

			overflow-y: auto;
			.sessions {
				display: flex;
				justify-content: space-around;
				.session {
					min-width: 130px;
					text-align: center;
					position: relative;
					.sideBox {
						margin: 20px 0;
						position: relative;
						display: flex;
						justify-content: center;
					}
					img {
						height: 30px;
					}
					.side {
						display: inline-block;
						width: 68px;
						height: 6px;
						@include themeify {
							background-color: themed("T1");
						}
						position: absolute;
						left: calc(50% + 31px);
						top: 50%;
						transform: translateY(-50%);
					}

					.type2 {
						@include themeify {
							background-color: themed("Theme");
						}
					}
					.status2 {
						@include themeify {
							color: themed("Theme");
						}
					}
					.status1 {
						@include themeify {
							color: themed("Hint");
						}
					}
				}
				.session:last-child {
					.side {
						display: none;
					}
				}
			}
		}
	}
	.detail-footer {
		height: 66px;
		background: url("../../image/detail_footer.png") no-repeat;
		background-size: 100% 100%;
	}
}
</style>
