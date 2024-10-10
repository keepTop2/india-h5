<template>
	<VantNavBar :title="$t(`home['幸运转盘']`)" @onClickLeft="router.back()" />
	<div class="content">
		<div class="tabs">
			<ul>
				<li :class="['color_Text_a', { active: tab.value === currentTab }]" v-for="tab in tabs" :key="tab.name" @click="selectTab(tab.value)">
					<img v-if="tab.value === currentTab" :src="getImg(tab.value)" alt="" />
					<a>{{ tab.name }}</a>
				</li>
			</ul>
		</div>
		<div class="lottery">
			<Spin
				@start-spinning-callback="spinStart"
				@end-spinning-callback="spinEnd"
				:reward="reward"
				:spinList="currentTab == '1' ? activityData?.bronze : currentTab == '2' ? activityData?.silver : activityData?.gold"
				:balanceCount="activityData?.balanceCount"
				ref="SpinRef"
			/>
			<div class="vipLevel color_TB fw_600" :class="'vip' + currentTab">{{ activityData?.vipRankConfig?.[currentTab - 1]?.maxVipGradeName }}级或以上</div>
		</div>
		<div class="remaining_times_bg">{{ $t('home["剩余抽奖次数"]') }}：{{ activityData?.balanceCount }}</div>
		<div class="container">
			<div class="box bonus_bg">
				<div class="title fs_30 color_TB">转盘奖金总计</div>
				<div class="amount fs_32 color_Theme">{{ activityData?.totalAmount || 0 }}</div>
			</div>
			<div class="box record_bg">
				<div class="reward color_TB fs_30" @click="handleShowRecord">我的抽奖记录<SvgIcon iconName="common/arrow" /></div>
			</div>
		</div>

		<div class="activity-details">
			<div class="details-header">
				<div class="details-header-title-left">
					<img src="../../image/details-header-title-left.png" alt="" />
				</div>
				<span class="color_TB">活动规则</span>
				<div class="details-header-title-right">
					<img src="../../image/details-header-title-right.png" alt="" />
				</div>
			</div>
			<div class="detail-content">
				<div v-html="activityData?.activityRuleI18nCode" class="color_TB"></div>
			</div>
			<div class="detail-footer"></div>
		</div>
	</div>
	<!-- 弹窗1 -->
	<div class="dialog fade-in" v-if="showResult">
		<div class="dialog-content">
			<div class="resultImg">
				<img src="./images/dialogResultImg.png" alt="" />
			</div>
			<div class="dialog-title color_Hint">恭喜您获得</div>
			<div class="dialog-amount">${{ reward?.prizeAmount }}</div>
			<div @click="playAgain" class="button">
				<div>再抽一次</div>
				<span class="remaining_times_btn">剩余次数:5</span>
			</div>
		</div>
		<div class="close" @click="showResult = false">
			<img src="./images/close.png" alt="" />
		</div>
	</div>

	<!-- 弹窗2 -->
	<div class="dialog" v-if="showResult2">
		<div class="dialog-content2">
			<div class="dialog-title color_TB fs_32">温馨提示</div>
			<div class="dialog-text color_T1 mb_21">您的抽奖次数不足</div>
			<Button @click="goToRecharge">去领取</Button>
		</div>
		<div class="close" @click="showResult2 = false">
			<img src="./images/close.png" alt="" />
		</div>
	</div>
	<!-- 弹窗3 -->
	<div class="dialog fade-in" v-if="showResult3">
		<div class="dialog-content2">
			<div class="dialog-title color_TB fs_32">温馨提示</div>
			<div class="dialog-text color_T1 mb_21">您的抽奖次数不足</div>
			<Button @click="goToRecharge">去领取</Button>
		</div>
		<div class="close" @click="showResult3 = false">
			<img src="./images/close.png" alt="" />
		</div>
	</div>

	<!-- 抽奖记录 -->
	<div class="dialog" v-if="showRecord">
		<div class="dialog-wrapper">
			<div class="header">抽奖记录</div>
			<div class="dialogTableBody">
				<div class="dialogTableHeader">
					<span>转盘</span>
					<span>奖品名称</span>
					<span>奖品价值</span>
					<span>中奖时间</span>
				</div>
				<div v-if="recordList.length < 1">
					<Nodata></Nodata>
				</div>
				<div v-for="(item, index) in recordList" :key="index" class="dialogTableItem">
					<span>{{ item.rewardRankText }}</span>
					<span>{{ item.prizeName }}</span>
					<span>{{ item.activityAmount }}</span>
					<span>{{ item.receiveTime }}</span>
				</div>
			</div>
			<div class="close" @click="showRecord = false">
				<img src="./images/close.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Spin from "/@/components/Spin/Spin.vue";
import { activityApi } from "/@/api/activity";
const showResult = ref(false);
const showResult2 = ref(false);
const showResult3 = ref(false);
const showRecord = ref(false);
const SpinRef: any = ref(null);
// 奖项列表
const spinList = ref();
// 获得的奖励
const reward = ref();
// 当前选中的标签
const currentTab: any = ref("1");
const router = useRouter();
// 标签列表
const tabs = ref([
	{
		name: "青铜",
		value: "1",
	},
	{
		name: "白银",
		value: "2",
	},
	{
		name: "黄金及以上",
		value: "3",
	},
]);
const recordList: any = ref([]);

const activityData: any = ref({});
onMounted(() => {
	/**
	 * @description 获取奖项列表
	 */
	activityApi.getSpinDetail().then((res) => {
		activityData.value = res.data;
	});
});

/**
 * @description 根据currentTab返回不同的img
 * @param {string} val - 当前选中的标签值
 * @returns {string} 图片URL
 */
const getImg = (val: string) => {
	return new URL(`./images/tab_bg${val}.png`, import.meta.url).href;
};

/**
 * @description 选择标签
 * @param {string} tabKey - 选中的标签值
 */
const selectTab = (tabKey: string) => {
	currentTab.value = tabKey;
};

/**
 * @description 抽奖开始
 */
const spinStart = () => {
	const params = {
		id: activityData.value.id,
		vipRankCode: currentTab.value,
	};
	activityApi.getSpinPrizeResult(params).then((res) => {
		reward.value = res.data;
	});
};

const playAgain = () => {
	showResult.value = false;
	SpinRef.value?.handleStartSpin();
};
/**
 * @description 处理转盘停止后的逻辑
 */
const spinEnd = () => {
	showResult3.value = true;
};
const goToRecharge = () => {
	showResult2.value = false;
	router.push("/wallet/recharge");
};
const handleShowRecord = () => {
	showRecord.value = true;
	querySpinWheelOrderRecord();
};
const querySpinWheelOrderRecord = () => {
	activityApi.querySpinWheelOrderRecord().then((res) => {
		recordList.value = res.data.records;
	});
};
</script>

<style scoped lang="scss">
.lottery {
	display: flex;
	background: url("./images/content_bg.png") no-repeat;
	background-size: cover;
	background-position: center;
	overflow: hidden;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 755px;
	margin-bottom: 40px;
	position: relative;
	.lottery-footer_img {
		width: 100%;
	}
	.vipLevel {
		position: absolute;
		right: 0;
		top: 30px;
		height: 48px;
		width: 204px;

		text-align: center;
		line-height: 48px;
	}
	.vip1 {
		background: url("./images/vip_level_0.png") no-repeat;
		background-size: 204px 48px;
	}
	.vip2 {
		background: url("./images/vip_level_1.png") no-repeat;
		background-size: 204px 48px;
	}
	.vip3 {
		background: url("./images/vip_level_2.png") no-repeat;
		background-size: 204px 48px;
	}
}
.flex_center {
	display: flex;
	justify-content: center;
}
.container {
	display: flex;
	justify-content: space-between;
	border-radius: 8px;
	margin: 0 auto;
}

.box {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 8px;
	text-align: center;
	justify-content: center;
	margin-top: 24px;
}
.bonus_bg {
	background: url("./images/bonus_bg.png");
	background-size: 100% 100%;
	width: 100%;
}
.record_bg {
	background: url("./images/record_btn_bg.png");
	background-size: 100% 100%;
	width: 100%;
}
.title {
	margin-bottom: 10px;
}

.amount {
	color: #ff6347;
}

.user {
	font-size: 26px;
	line-height: 26px;
}

.reward {
	font-size: 26px;
	display: flex;
	align-items: center;
	svg {
		width: 36px;
		height: 36px;
	}
}

.arrow {
	font-size: 20px;
}
.content {
	padding: 20px 31px;
	padding-top: 40px;

	.remaining_times_bg {
		background: url("./images/remaining_times_bg.png") no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 102px;
		padding-top: 35px;
		padding-left: 30px;
		box-sizing: border-box;
		font-size: 30px;
		@include themeify {
			color: themed("TB1");
		}
	}
}
.tabs {
	// margin-bottom: 60px;
	ul {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		height: 74px;
		border-radius: 25px 25px 0 0;
		@include themeify {
			background: themed("spinTab");
		}
	}

	li {
		list-style: none;
		flex: 1;
		text-align: center;
		height: 74px;
		line-height: 50px;
		line-height: 74px;
		font-size: 26px;
		position: relative;
		cursor: pointer;
		@include themeify {
			color: themed("TB1");
		}
	}
	li.active {
		display: flex;
		justify-content: center;
		img {
			position: absolute;
			width: 100%;
			height: 100%;
		}
		a {
			position: absolute;
		}
	}
	li:first-child.active {
	}
}
.activity-details,
.activity-rules {
	border-radius: 10px;
	width: 100%;
	margin-bottom: 20px;
	margin-top: 40px;
	background: url("../../image/detail_bg.png");
	background-size: 100%;
	position: relative;

	.details-header {
		background: url("../../image/detail_header.png");
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
		background: url("../../image/detail_content.png") no-repeat;
		background-size: 100% 100%;
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
		background: url("../../image/detail_footer.png");
		background-size: 100% 100%;
	}
}
.dialog {
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);

	z-index: 100;
	z-index: 100;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.dialog-content {
		background: url("./images/result_bg.png") no-repeat;
		background-size: 100% 100%;
		height: 833px;
		width: 540px;
		text-align: center;
		font-size: 40px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 40px;
		.resultImg {
			display: flex;
			justify-content: center;
			margin-bottom: 60px;
			img {
				width: 160px;
			}
		}
		.dialog-amount {
			width: 376px;
			height: 62px;
			background: url("./images/amount_bg.png") no-repeat;
			background-size: 100% 100%;
			margin: 60px auto;
			line-height: 60px;
			@include themeify {
				color: themed("Theme");
			}
		}
		.button {
			margin: 0 auto;
			position: relative;
			> div {
				width: 408px;
				height: 86px;
				line-height: 86px;
				font-size: 30px;
				background: url("./images/btn_bg.png") no-repeat;
				background-size: 100% 100%;
				@include themeify {
					color: themed("TB");
				}
			}
			.remaining_times_btn {
				position: absolute;
				right: 0;
				top: -35px;
				padding: 5px 10px 15px 10px;
				font-size: 22px;
				background: url("./images/remaining_times_Icon.png") no-repeat;
				background-size: 100% 100%;
				@include themeify {
					color: themed("TB");
				}
			}
		}
	}
	.dialog-content2 {
		background: url("./images/result_bg2.png") no-repeat;
		background-size: 100% 100%;
		width: 540px;
		height: 625px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 40px;
		box-sizing: border-box;
		text-align: center;
		.dialog-title {
			background: url("./images/title_bg.png") no-repeat;
			background-size: 100% 100%;
			height: 80px;

			line-height: 80px;
		}
		.dialog-text {
			margin: 80px 0;
		}
		button {
			background: url("./images/btn_bg.png") no-repeat;
			background-size: 100% 100%;
		}
	}
	.dialog-wrapper {
		background: url("./images/record_bg.png");
		background-size: 100% 100%;
		width: calc(100% - 60px);
		height: 972px;
		border-radius: 24px;
		text-align: center;
		box-sizing: border-box;
		@include themeify {
			color: themed("TB1");
		}
		.header {
			background: url("./images/record_header_bg.png");
			background-size: 100% 100%;
			height: 92px;
			width: 474px;
			margin: 25px auto;
			text-align: center;
			font-size: 32px;
			line-height: 92px;
			@include themeify {
				color: themed("TB");
			}
		}
		img {
			height: 200px;
			display: inline-block;
			margin: 0 auto;
		}
		.dialogTableBody {
			margin-top: 24px;
			overflow: auto;
			height: 833px;
			> div {
				display: flex;
				height: 90px;
				justify-content: space-around;
				color: var(--Text_s);
				font-size: 26px;
				span {
					flex: 1;
					font-weight: 400;
					text-align: center;
					border-right: 1px solid var(--Line_2);
					display: flex;
					justify-content: center;
					align-items: center;
					@include themeify {
						border-right: 1px solid themed(BG1);
					}
				}
				span:last-child {
					border-right: none;
				}
			}
			.dialogTableHeader {
				font-size: 26px;
				@include themeify {
					background: linear-gradient(180deg, #555657 0%, #444547 100%);
				}
			}
			.dialogTableItem:nth-child(odd) {
				@include themeify {
					background: themed("BG3");
				}
			}
			.dialogTableItem:nth-child(even) {
				@include themeify {
					background: themed("BG4");
				}
			}
		}
	}
	.close {
		img {
			width: 64px;
			height: 64px;
			margin-top: 20px;
		}
	}
}
</style>
