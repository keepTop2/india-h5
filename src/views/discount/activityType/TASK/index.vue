<template>
	<div class="wrapper">
		<VantNavBar title="任务" @onClickLeft="router.back()" />
		<VantLazyImg :src="image" class="main-image" />
		<div class="content">
			<div class="rewardbg">
				<div class="color_TB fs_28">累计奖励:</div>
				<div class="color_Hint">{{ detailData?.platCurrencySymbol }} {{ detailData?.totalAmount }}</div>
			</div>

			<div class="tabs">
				<div class="tab" @click="changeTab(item.value)" v-for="(item, index) in tasktype" :key="index" :class="item.value == currentTab ? 'active' : ''">{{ item.label }}</div>
			</div>
		</div>
		<div class="taskList">
			<div v-if="currentTab == 0">
				<div v-for="item in detailData?.dailyTask" class="card">
					<div>
						<VantLazyImg :src="item.taskPictureI18nCode" alt="" />
					</div>
					<div>
						<div class="fs_24 color_TB fw_500">{{ item.taskNameI18nCode }}</div>
						<div class="progress">
							<div class="value" :style="{ width: calculatePercentage(item.achieveAmount, item.minBetAmount) + '%' }"></div>
						</div>
						<div class="fs_18 color_TB bottom">
							<span
								>奖励：<span class="color_Hint"> {{ item.platCurrencySymbol }} {{ item.rewardAmount }}</span></span
							>
							<span
								><span class="color_Theme">{{ item.achieveAmount }}</span
								>/{{ item.minBetAmount }}</span
							>
						</div>
					</div>
					<div>
						<div :class="'btnType btnType' + item.taskStatus" @click="HandleBtn(item)">{{ taskStatus[item.taskStatus] }}</div>
					</div>
					<div class="help_icon" @click="openDialog(item)">
						<img src="./image/help_icon.png" />
					</div>
				</div>
			</div>
			<div v-if="currentTab == 1">
				<div v-for="item in detailData?.weeklyTask" class="card">
					<div>
						<VantLazyImg :src="item.taskPictureI18nCode" alt="" />
					</div>
					<div>
						<div class="fs_24 color_TB fw_500">{{ item.taskNameI18nCode }}</div>
						<div class="progress">
							<div class="value" :style="{ width: calculatePercentage(item.achieveAmount, item.minBetAmount) + '%' }"></div>
						</div>
						<div class="fs_18 color_TB bottom">
							<span
								>奖励：<span class="color_Hint"> {{ item.platCurrencySymbol }} {{ item.rewardAmount }}</span></span
							>
							<span
								><span class="color_Theme">{{ calculatePercentage(item.achieveAmount, item.minBetAmount) }}</span
								>/{{ item.minBetAmount }}</span
							>
						</div>
					</div>
					<div>
						<div :class="'btnType btnType' + item.taskStatus" @click="HandleBtn(item)">{{ taskStatus[item.taskStatus] }}</div>
					</div>
					<div class="help_icon" @click="openDialog(item)">
						<img src="./image/help_icon.png" />
					</div>
				</div>
			</div>
			<div v-if="currentTab == 2">
				<div class="daojishiBg fs_24">
					<span class="color_TB">剩余时间：</span><span class="color_Theme">{{ Common.convertMilliseconds(countdown * 1000) }}</span>
				</div>
				<div v-for="item in detailData?.noviceTask" class="card" :class="item.subTaskType">
					<div>
						<VantLazyImg :src="item.taskPictureI18nCode" alt="" />
					</div>
					<div>
						<div class="fs_24 color_TB fw_500">{{ item.taskNameI18nCode }}</div>
						<div class="fs_18 color_TB htmlDesc ellipsis" v-html="item.taskDescriptionI18nCode"></div>
						<div class="fs_18 color_TB bottom">
							<span
								>奖励：<span class="color_Hint"> {{ item.platCurrencySymbol }} {{ item.rewardAmount }}</span></span
							>
						</div>
					</div>
					<div>
						<div :class="'btnType btnType' + item.taskStatus" @click="HandleBtn(item)">{{ taskStatus[item.taskStatus] }}</div>
					</div>
					<div class="help_icon" @click="openDialog(item)">
						<img src="./image/help_icon.png" />
					</div>
				</div>
			</div>
		</div>
		<activityDialog v-model="showDialog" title="温馨提示" :confirm="confirmDialog">
			<div>恭喜你获得</div>
			<div class="result">{{ dialogInfo.platCurrencySymbol }} {{ dialogInfo.rewardAmount }}</div>
		</activityDialog>
		<activityDialog v-model="showRule" title="任务说明" :confirm="confirmDialog" :dialog2="true">
			<div v-html="rule" class="RuleDialog"></div>
		</activityDialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { activityApi } from "/@/api/activity";
import activityDialog from "./dialog.vue";
import image from "./image/image.png";
import Common from "/@/utils/common";
import { useCountdown } from "/@/hooks/countdown";
const { countdown, startCountdown, stopCountdown } = useCountdown();
const router = useRouter();
const showDialog = ref(false);
const showRule = ref(false);
const rule = ref("");
const dialogInfo: any = ref({});
const detailData: any = ref({});
const currentTab = ref(0);
const taskStatus = {
	0: "去完成",
	1: "领取",
	2: "已领取",
	3: "已经过期",
};
const tasktype = ref([
	{
		label: "每日任务",
		value: 0,
	},
	{
		label: "每周任务",
		value: 1,
	},
]);
const changeTab = (value) => {
	currentTab.value = value;
};
const openDialog = (item) => {
	showRule.value = true;
	rule.value = item.taskDescI18nCode;
};
onMounted(() => {
	getTaskDetail();
});
const getTaskDetail = () => {
	activityApi.getTaskDetail().then((res) => {
		detailData.value = res.data;
		if (detailData.value.noviceTask) {
			startCountdown(detailData.value?.noviceTask[0].expireTime);
			tasktype.value.push({
				label: "新手任务",
				value: 2,
			});
		}
	});
};
const HandleBtn = (item) => {
	if (item.subTaskType === "phone") {
		return router.push("/bind/phone");
	} else if (item.subTaskType === "email") {
		return router.push("/bind/email");
	}

	if (item.taskStatus == 1) {
		activityApi
			.Taskreceive({
				id: item.id,
				subTaskType: item.subTaskType,
			})
			.then((res: any) => {
				if (res.code === 10000) {
					showDialog.value = true;
					dialogInfo.value = res.data;
					dialogInfo.value.platCurrencySymbol = item.platCurrencySymbol;
					getTaskDetail();
				}
			});
	} else if (item.taskStatus == 0) {
		router.push("/");
	}
};

const confirmDialog = () => {
	if (dialogInfo.value.status === 30049) {
		router.push("/wallet/recharge");
	}
	showDialog.value = false;
};
const calculatePercentage = (part, whole) => {
	return (part / whole) * 100 || 0;
};
</script>

<style lang="scss" scoped>
.wrapper {
	background: url("./image/bg.png") no-repeat;
	background-size: 100% 100%;

	.main-image {
		height: 640px;
		width: 100%;
		object-fit: cover;
		margin-bottom: 20px;
	}
	.content {
		padding: 0 24px;
		.rewardbg {
			height: 174px;
			background: url("./image/rewardbg.png") no-repeat;
			background-size: 100% 100%;
			display: flex;

			padding: 0 40px;
			flex-direction: column;
			justify-content: center;
			gap: 20px;
		}
		.tabs {
			display: flex;
			margin-top: 24px;
			gap: 20px;
			justify-content: space-around;
			line-height: 72px;
			@include themeify {
				color: themed("TB");
			}
			.tab {
				flex: 1;
				text-align: center;
				height: 72px;
				background-size: 100% 100%;
				@include themeify {
					border-radius: 24px 24px 0px 0px;
					background: themed("BG3");
				}
			}
			.tab.active {
				position: relative;
				height: 72px;
				background-size: 100% 100%;
				@include themeify {
					border-radius: 24px 24px 0px 0px;
					background: themed("Theme");
				}
			}
			.tab.active::after {
				content: ""; /* 必须设置内容为 "" */
				position: absolute; /* 绝对定位 */
				left: 50%; /* 水平居中 */
				bottom: -12px; /* 距离容器底部 */
				transform: translateX(-50%); /* 水平居中 */
				width: 0;
				height: 0;
				border-left: 12px solid transparent; /* 左边框透明 */
				border-right: 12px solid transparent; /* 右边框透明 */
				@include themeify {
					border-top: 12px solid themed("Theme"); /* 顶部边框为黑色 */
				}
			}
		}
	}
	.taskList {
		border-radius: 24px 24px 0px 0px;
		padding: 24px 24px;
		margin-top: -1px;
		@include themeify {
			background: themed("BG1");
		}
		.card {
			background: url("./image/cardBg.png") no-repeat;
			background-size: 100% 100%;
			height: 148px;
			margin: 10px 4px 24px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 40px 0 20px;
			gap: 30px;
			position: relative;
			> div:first-child {
				width: 80px;
				img {
					width: 80px;
					height: 80px;
				}
			}
			.help_icon {
				position: absolute;
				right: 12px;
				top: 12px;
				img {
					width: 22px;
					height: 22px;
				}
			}
			> div:nth-child(2) {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 8px;
				.progress {
					background: url("./image/progress.png") no-repeat;
					background-size: 100% 100%;
					height: 12px;
					width: 100%;
					.value {
						height: 12px;
						border-radius: 10px;
						background-color: Wam-P1;
						max-width: 100%;
						@include themeify {
							background-color: themed("Wam-P1");
						}
					}
				}
			}
			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.btnType {
				width: 120px;
				padding: 10px;
				height: 42px;
				line-height: 42px;
				text-align: center;
				font-size: 20px;
				@include themeify {
					color: themed("TB");
				}
				border-radius: 6px 6px 5px 5px;
			}
			.btnType0 {
				background: linear-gradient(270deg, #ebb360 0%, #eb7933 100%);
			}
			.btnType1 {
				background: linear-gradient(270deg, #fd6780 0%, #ff405e 100%);
			}
			.btnType2 {
				background: linear-gradient(270deg, #afafb3 0%, #87878b 100%);
			}
			.daojishiBg {
				height: 45px;
				width: 100%;
				background: url("./image/daojishiBg.png") no-repeat;
			}
			.htmlDesc {
				width: 350px;
			}
		}
		.card.welcome {
			background: url("./image/cardBg2.png") no-repeat;
			background-size: 100% 100%;
		}
		.card.currency {
			background: url("./image/cardBg3.png") no-repeat;
			background-size: 100% 100%;
		}
		.card.email {
			background: url("./image/cardBg3.png") no-repeat;
			background-size: 100% 100%;
		}
		.card.phone {
			background: url("./image/cardBg4.png") no-repeat;
			background-size: 100% 100%;
		}
		.daojishiBg {
			height: 45px;
			width: 100%;
			background: url("./image/daojishiBg.png") no-repeat;
			background-size: auto 100%;
			padding-left: 60px;
			line-height: 45px;
			margin: 24px 0;
		}
	}
}
.result {
	margin-top: 20px;
	height: 66px;
	line-height: 66px;
	background-color: rgba(255, 40, 75, 0.2);

	border-radius: 5px;
	@include themeify {
		color: themed("Theme");
	}
}
</style>
