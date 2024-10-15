<template>
	<!-- 顶部导航栏 -->
	<VantNavBar :title="$t(`VantNavBar['勋章收藏者']`)" @onClickLeft="onClickLeft" />

	<!-- 宝藏卡片区域 -->
	<div class="treasure_card">
		<template v-if="state.medalRewardRespVOS.length > 0">
			<!-- 宝藏勋章列表 -->
			<div class="treasure_list">
				<!-- 遍历展示每个勋章项目 -->
				<div class="treasure_item" v-for="(item, index) in state.medalRewardRespVOS" :key="index">
					<!-- 勋章图标 -->
					<div class="icon" @click="onOpenMedalReward(item)">
						<VantLazyImg :src="item.icon" />
					</div>
					<!-- 解锁勋章数量 -->
					<div class="value">{{ item.unlockMedalNum }}</div>
					<!-- 箭头图标，根据是否解锁显示不同的箭头 -->
					<div class="arrow">
						<VantLazyImg :src="state.canLightNum >= item.unlockMedalNum ? arrow : theme === ThemeEnum.default ? arrow2 : arrow3" />
					</div>
				</div>
			</div>

			<!-- 进度条区域 -->
			<div class="progress">
				<div class="value" :style="{ width: totalProgress + '%' }"></div>
			</div>

			<!-- 文本提示列表 -->
			<div class="text_list">
				<!-- 提示图标 -->
				<div class="tooltip">
					<van-popover v-model:show="showPopover" theme="dark" :show-arrow="false">
						<div class="p_10 popup">{{ $t('medalCollection["宝箱奖励流水倍数为8倍"]') }}</div>
						<template #reference>
							<VantLazyImg class="icon" :src="theme === ThemeEnum.default ? tips_icon : tips_icon_light" />
						</template>
					</van-popover>
				</div>
				<!-- 遍历展示解锁勋章的提示信息 -->
				<i18n-t v-for="(item, index) in state.medalRewardRespVOS" :key="index" keypath="medalCollection.解锁勋章" :tag="'p'">
					<template v-slot:value>
						<span class="text">{{ $t("medalCollection.枚", { value: item.unlockMedalNum }) }}</span>
					</template>
					<template v-slot:num>{{ item.rewardAmount }}{{ useUserStore().getUserInfo.platCurrencyName }} </template>
				</i18n-t>
			</div>
		</template>
	</div>

	<!-- 已解锁勋章内容区域 -->
	<div class="unlocked_content">
		<div class="unlocked_header">
			<span class="title">{{ $t('medalCollection["已解锁"]') }}</span>
			<!-- 如果没有已解锁勋章，显示提示 -->
			<span class="tips" v-if="state.hasUnlockList.length == 0">{{ $t('medalCollection["(您还未获得任何勋章，积极玩游戏获得更多勋章)"]') }}</span>
		</div>
		<!-- 已解锁勋章列表 -->
		<div class="medal_list" v-if="state.hasUnlockList.length > 0">
			<div class="medal_item" :class="theme" v-for="(item, index) in state.hasUnlockList" :key="index" @click="toPath(item)">
				<div class="icon">
					<VantLazyImg :src="item.activatedPicUrl" />
				</div>
				<div class="name">{{ item.medalName }}</div>
				<div class="date">{{ item.unlockTime }}</div>
			</div>
		</div>
	</div>

	<!-- 未解锁勋章内容区域 -->
	<div class="no_unlocked_content">
		<div class="no_unlocked_header">
			<span class="title">{{ $t('medalCollection["未解锁"]') }}</span>
			<span class="tips">{{ $t('medalCollection["(提示：点击勋章图标查看勋章奖励和详情)"]') }}</span>
		</div>
		<!-- 未解锁勋章列表 -->
		<div class="medal_list">
			<div class="medal_item" :class="theme" v-for="(item, index) in state.notUnlockList" :key="index" @click="onLightUpMedal(item)">
				<template v-if="item.lockStatus === 0">
					<i></i>
					<div class="bg"></div>
				</template>
				<div class="icon" :class="{ animation: item.lockStatus === 0, theme }">
					<VantLazyImg :src="item.lockStatus == 0 || item.lockStatus == 2 ? item.inactivatedPicUrl : item.activatedPicUrl" />
				</div>
				<div class="name">{{ item.medalName }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { medalApi } from "/@/api/my";
import { MedalRewardRespVOS, NotUnlockList } from "./interface";
import common from "/@/utils/common";
import arrow from "/@/assets/zh-CN/default/my/medalCollection/arrow.png";
import arrow2 from "/@/assets/zh-CN/default/my/medalCollection/arrow2.png";
import arrow3 from "/@/assets/zh-CN/default/my/medalCollection/arrow3.png";
import tips_icon from "/@/assets/zh-CN/default/my/medalCollection/tips_icon.png";
import tips_icon_light from "/@/assets/zh-CN/light/my/medalCollection/tips_icon.png";
import treasure_box_1 from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_1.png";
import treasure_box_1_open from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_1_open.png";
import treasure_box_1_receive from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_1_receive.png";
import treasure_box_2 from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_2.png";
import treasure_box_2_open from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_2_open.png";
import treasure_box_2_receive from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_2_receive.png";
import treasure_box_3 from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_3.png";
import treasure_box_3_open from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_3_open.png";
import treasure_box_3_receive from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_3_receive.png";
import treasure_box_4 from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_4.png";
import treasure_box_4_open from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_4_open.png";
import treasure_box_4_receive from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_4_receive.png";
import treasure_box_5 from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_5.png";
import treasure_box_5_open from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_5_open.png";
import treasure_box_5_receive from "/@/assets/zh-CN/default/my/medalCollection/treasure_box_5_receive.png";
import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
const router = useRouter();
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);
const showPopover = ref(false);
const state = reactive({
	canLightNum: 0 as number,
	hasUnlockList: [] as NotUnlockList[],
	medalRewardRespVOS: [] as MedalRewardRespVOS[],
	notUnlockList: [] as NotUnlockList[],
	rewardRemarkList: [],
});

// 计算总进度 totalProgress
const totalProgress = computed(() => {
	let progress = 0; // 初始化总进度为0
	for (let i = 0; i < state.medalRewardRespVOS.length; i++) {
		const unlockNum = state.medalRewardRespVOS[i].unlockMedalNum; // 获取当前阶段的 unlockMedalNum
		if (state.canLightNum >= unlockNum) {
			// 如果当前勋章数量超过该阶段的上限，增加25%的总进度
			progress += 20;
		} else {
			// 如果当前勋章数量在该阶段内部，计算该阶段的具体进度
			const prevStage = i === 0 ? 0 : state.medalRewardRespVOS[i - 1].unlockMedalNum; // 获取前一个阶段的边界值
			const stageRange = unlockNum - prevStage; // 计算该阶段的跨度
			const stageProgress = ((state.canLightNum - prevStage) / stageRange) * 20; // 计算该阶段内部的进度占比
			progress += stageProgress; // 累加到总进度
			break; // 退出循环，因为进度已计算完毕
		}
	}
	return progress; // 返回计算后的总进度
});

const getUserMedalInfo = async () => {
	const res = await medalApi.getUserMedalInfo().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		// 更新状态数据
		state.medalRewardRespVOS = res.data.medalRewardRespVOS;
		state.canLightNum = res.data.hasUnlockList.length;
		state.hasUnlockList = res.data.hasUnlockList;
		state.notUnlockList = res.data.notUnlockList;

		// 定义每个状态对应的图标
		const treasureIcons = [
			{
				normal: treasure_box_1,
				receive: treasure_box_1_receive,
				open: treasure_box_1_open,
			},
			{
				normal: treasure_box_2,
				receive: treasure_box_2_receive,
				open: treasure_box_2_open,
			},
			{
				normal: treasure_box_3,
				receive: treasure_box_3_receive,
				open: treasure_box_3_open,
			},
			{
				normal: treasure_box_4,
				receive: treasure_box_4_receive,
				open: treasure_box_4_open,
			},
			{
				normal: treasure_box_5,
				receive: treasure_box_5_receive,
				open: treasure_box_5_open,
			},
		];

		// 根据openStatus设置图标
		state.medalRewardRespVOS.forEach((item, index) => {
			switch (item.openStatus) {
				case 2:
					item.icon = treasureIcons[index].normal;
					break;
				case 0:
					item.icon = treasureIcons[index].receive;
					break;
				case 1:
					item.icon = treasureIcons[index].open;
					break;
			}
		});
	}
};

// 领取宝箱
const onOpenMedalReward = async (item) => {
	// 确保勋章数量达到要求且宝箱状态为未领取
	if (state.canLightNum >= item.unlockMedalNum && item.openStatus === 0) {
		const params = {
			condNum: item.unlockMedalNum,
		};
		const res = await medalApi.openMedalReward(params).catch((err) => err);

		if (res.code == common.getInstance().ResCode.SUCCESS) {
			// 成功领取后更新用户的勋章信息
			await getUserMedalInfo();
		}
	}
};

// 点亮勋章
const onLightUpMedal = async (item) => {
	if (item.lockStatus !== 0) {
		toPath(item);
	} else {
		const params = {
			medalCode: item.medalCode,
		};
		const res = await medalApi.lightUpMedal(params).catch((err) => err);
		if (res.code == common.getInstance().ResCode.SUCCESS) {
			getUserMedalInfo();
		}
	}
};

const toPath = (item) => {
	router.push({ path: "/medalDetails", query: { data: encodeURIComponent(JSON.stringify(item)) } });
};

getUserMedalInfo();

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.treasure_card {
	min-height: 400px;
	margin: 36px 24px 0px;
	padding: 23px 0px 24px;
	border-radius: 18px;
	// background-image: linear-gradient(180deg, #2c2d2e 0%, #353a3e 100%);
	@include themeify {
		background: themed("vip_bg2");
	}
	.treasure_list {
		min-height: 180px;
		padding: 0px 21px 0px 111px;
		display: flex;
		gap: 25px;

		.treasure_item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.icon {
				width: 94px;
				height: 94px;

				img {
					width: 100%;
					height: 100%;
				}
			}
			.value {
				@include themeify {
					color: themed("TB");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 24px;
				font-style: normal;
				font-weight: 500;
				line-height: 34px; /* 141.667% */
			}
			.arrow {
				width: 16px;
				height: 16px;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.progress {
		position: relative;
		height: 12px;
		margin: 0px 56px 0px 27px;
		border-radius: 12px;
		@include themeify {
			background: themed("BG3");
		}
		box-sizing: border-box;
		.value {
			position: absolute;
			top: 0px;
			left: 0px;
			height: 12px;
			border-radius: 12px;
			@include themeify {
				background: themed("Theme");
			}
		}
	}

	.text_list {
		position: relative;
		margin-top: 23px;
		padding: 0px 23px;

		.tooltip {
			position: absolute;
			top: 2px;
			right: 27px;
			.icon {
				width: 30px;
				height: 30px;
			}
			.tooltipText {
				display: none;
			}
		}

		p {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 42px;
			span {
				@include themeify {
					color: themed("Theme");
				}
			}
		}
	}
}
.unlocked_content,
.no_unlocked_content {
	margin: 36px 24px 0px;
	padding-bottom: 24px;
	.unlocked_header,
	.no_unlocked_header {
		display: flex;
		align-items: center;
		gap: 8px;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 500;
		.title {
			// width: min-content;
		}
		.tips {
			font-size: 24px;
			font-weight: 400;
			@include themeify {
				color: themed("T3");
			}
		}
	}
	.no_unlocked_header {
		.tips {
			font-size: 24px;
			font-weight: 400;
			@include themeify {
				color: themed("Theme");
			}
		}
	}

	.medal_list {
		padding: 24px 0px;
		display: flex;
		flex-wrap: wrap;
		row-gap: 24px;
		column-gap: 20px;
		.medal_item {
			position: relative;
			width: 160px;
			height: 196px;
			@include theme-bg("/my/medalCollection/highlight_bg.png");
			background-position-x: center;
			background-position-y: bottom;
			background-repeat: no-repeat;
			background-size: 160px 160px;

			// .bg {
			// 	position: absolute;
			// 	top: -17px;
			// 	left: 50%;
			// 	transform: translate(-50%, 0%);
			// 	width: 162px;
			// 	height: 162px;
			// 	display: flex;
			// 	align-items: center;
			// 	justify-content: center;
			// 	@include theme-bg("/my/medalCollection/highlight.png");
			// 	background-position-x: center;
			// 	background-position-y: bottom;
			// 	background-repeat: no-repeat;
			// 	background-size: 162px 162px;
			// 	/* 添加旋转和缩放动画 */
			// 	animation: rotateIcon 4s linear infinite;
			// }
			.icon {
				position: absolute;
				top: -17px;
				left: 50%;
				transform: translate(-50%, 0%);
				width: 162px;
				height: 162px;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					width: 116px;
					height: 127px;
				}
			}
			.animation {
				animation: scaleIcon 1.5s ease-in-out infinite;
			}
			i {
				position: absolute;
				top: 0px;
				right: 33px;
				width: 16px;
				height: 16px;
				border: 2px solid #fff;
				border-radius: 50%;
				@include themeify {
					background: themed("Theme");
				}
				z-index: 1;
				box-sizing: border-box;
			}
		}
	}
}

.no_unlocked_content {
	.name {
		padding-top: 142px;
		@include themeify {
			color: themed("T3");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 20px;
		font-weight: 400;
	}
}

.unlocked_content {
	border-bottom: 1px solid;
	@include themeify {
		border-color: themed("Line");
	}
	.name {
		padding-top: 132px;
		@include themeify {
			color: themed("TB");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 20px;
		font-weight: 400;
	}
	.date {
		width: 144px;
		height: 26px;
		margin: 2px auto 0px;
		border-radius: 8px;
		@include themeify {
			background: themed("BG1");
			color: themed("T1");
		}
		text-align: center;
		font-size: 16px;
		font-weight: 400;
		line-height: 26px;
	}
}

/* 旋转动画 */
@keyframes rotateIcon {
	0% {
		transform: translate(-50%, 0%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, 0%) rotate(180deg);
	}
}

/* 缩放动画 */
@keyframes scaleIcon {
	0%,
	100% {
		transform: translate(-50%, 0%) scale(1);
	}
	50% {
		transform: translate(-50%, 0%) scale(1.13);
	}
}
:deep(.van-popover__content) {
	background: rgba(0, 0, 0, 0.7) !important;
	margin-right: 60px !important;
}
</style>
