<template>
	<!-- 赛事内容区域 -->
	<div class="content">
		<!-- 内容区域 头部 -->
		<div class="content-header">
			<!-- 上下半场及时间 -->
			<div class="left">
				<!-- 关注 -->
				<SvgIcon v-if="isAttention" iconName="/venueHome/sports/svg/collection2" size="5.333333" @click="attentionEvent(true)" />
				<!-- 取消关注 -->
				<SvgIcon v-else iconName="/venueHome/sports/svg/collection" size="5.333333" @click="attentionEvent(false)" />
				<div class="label" :class="{ 'color_Theme-P': event.isLive, color_TB: !event.isLive }">
					<span class="mr_6">{{ SportsCommonFn.getEventsTitle(event) }}</span>
				</div>
			</div>
			<!-- 盘口表头  -->
			<div class="right">
				<div class="title">{{ SportsCommonFn.betTypeMap[43][20] }}</div>
				<div class="title">{{ SportsCommonFn.betTypeMap[43][1] }}</div>
				<div class="title">{{ SportsCommonFn.betTypeMap[43][3] }}</div>
			</div>
		</div>
		<!-- 内容区域 主体 -->
		<div class="content-info">
			<div class="content-left" @click="showDetail(event.eventId, event.leagueId)">
				<div class="team-tournament-info" :class="SportsCommonFn.isStartMatch(event.globalShowTime) ? 'mt_18' : 'mt_58'">
					<!-- 队伍icon -->
					<div class="icon">
						<VantLazyImg :src="event.teamInfo?.homeIconUrl" />
					</div>
					<!-- 队伍名称 -->
					<div class="name">{{ event.teamInfo.homeName }}</div>
				</div>
				<div class="team-tournament-info" :class="SportsCommonFn.isStartMatch(event.globalShowTime) ? 'mt_32' : 'mt_52 pb_23'">
					<!-- 队伍icon -->
					<div class="icon">
						<VantLazyImg :src="event.teamInfo?.awayIconUrl" />
					</div>
					<!-- 队伍名称 -->
					<div class="name">{{ event.teamInfo.awayName }}</div>
				</div>
				<!-- 主队客队比分 -->
				<div class="score-info" v-if="SportsCommonFn.isStartMatch(event.globalShowTime)">
					<span>{{ event.gameInfo?.liveHomeScore }}</span>
					<i class="icon"></i>
					<span>{{ event.gameInfo?.liveAwayScore }}</span>
				</div>
				<!-- 角球等信息 -->
				<div class="others">
					<!-- 上半场比分 下半场不显示 -->

					<div v-if="event.streamingOption != 0 && event.channelCode" class="other3">
						<SvgIcon iconName="/venueHome/sports/svg/sport_live" size="4.266667" />
					</div>
					<!-- <div class="other4">
						<SvgIcon iconName="/venueHome/sports/svg/sport_match_status" size="4.266667" />
					</div> -->
					<div class="other5">{{ event.marketCount }}</div>
				</div>
			</div>
			<!-- 全场 半场 swiper  -->
			<div class="content-right">
				<div class="content">
					<marketItem v-for="market in filterMarkets(event.markets, [20, 1, 3])" :key="`${event.eventId}-${market.betType}`" :event="event" :market="market" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import marketItem from "./marketItem.vue";
import { useRouter } from "vue-router";
import { Market, SportsRootObject } from "/@/views/venueHome/sports/utils/interface";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import sportsApi from "/@/api/venueHome/sports";
import pubsub from "/@/pubSub/pubSub";
const sportsBetData = useSportsBetEventStore();
// import { convertUtcToUtc5AndFormatMD } from "/@/webWorker/module/utils/formattingChildrenViewData";
import SportsCommonFn from "/@/views/venueHome/sports/utils/common";
import { i18n } from "/@/i18n/index";
import childrenAppportAManage from "/@/ChildrenAppportAManage/ChildrenAppportAManage";
import { ChildrenToMainCommon, ChildrenToMainRouterPush } from "/@/ChildrenAppportAManage/childrenAppDTOs/childrenToMain/childrenToMainCommon";
import { TransactionNameCommonEnum } from "/@/ChildrenAppportAManage/childrenAppEnums/transactionNameCommonEnum";
import { ControllersEnum } from "/@/ChildrenAppportAManage/childrenAppEnums/controllersEnum";
const props = defineProps<{
	event: SportsRootObject;
	sportType: String;
}>();

const $: any = i18n.global;
const router = useRouter();

const isAttention = computed(() => {
	return sportsBetData.attentionEventIdList.includes(props.event.eventId);
});

// 点击关注按钮
const attentionEvent = async (isActive: boolean) => {
	if (isActive) {
		await sportsApi.unFollow({
			thirdId: [props.event.eventId],
		});
	} else {
		await sportsApi.saveFollow({
			thirdId: props.event.eventId,
			type: 2,
		});
	}
	pubsub.publish(pubsub.PubSubEvents.SportEvents.attentionChange.eventName, {});
};

// row字典 不同的betType显示几行
const DEFAULT_SELECTIONS_MAP: Record<number, number> = {
	[SportsCommonFn.BetTypeEnum.OVERALL_WIN]: 2,
	[SportsCommonFn.BetTypeEnum.FULL_TIME_HANDICAP]: 2,
	[SportsCommonFn.BetTypeEnum.FULL_TIME_OVER_UNDER]: 2,
};

// 生成盘口信息
const filterMarkets = (markets: Market[], betTypes: number[]): Market[] => {
	const results: Market[] = [];
	betTypes.forEach((type) => {
		const marketItem = markets[type];
		if (marketItem) {
			results.push(marketItem);
		} else {
			const selectionsCount = DEFAULT_SELECTIONS_MAP[type] || 0;
			results.push({ betType: type, selections: Array(selectionsCount).fill(null) } as Market);
		}
	});

	return results;
};

// 使用safeAccess函数来安全地访问深层属性 防止多级访问出现undefined报错
// function safeAccess(obj, path) {
// 	return path.reduce((xs, x) => (xs && xs[x] != null ? xs[x] : null), obj);
// }

// 计算是上半场还是下半场 根据 livePeriod 判断当前是第几节
// const livePeriod = computed(() => {
// 	const gameInfo = safeAccess(props.event, ["gameInfo"]);
// 	const { livePeriod } = gameInfo;
// 	const eventStatus = safeAccess(props.event, ["eventStatus"]);
// 	const globalShowTime = safeAccess(props.event, ["globalShowTime"]);
// 	if (eventStatus == "closed") {
// 		return $.t("sports['比赛已关闭']");
// 	}
// 	if (eventStatus == "postponed") {
// 		return $.t("sports['比赛已推迟']");
// 	}
// 	if (SportsCommonFn.isStartMatch(globalShowTime)) {
// 		if (livePeriod == 1) {
// 			return $.t("sports['第一局']");
// 		}
// 		if (livePeriod == 2) {
// 			return $.t("sports['第二局']");
// 		}
// 		if (livePeriod == 3) {
// 			return $.t("sports['第三局']");
// 		}
// 		if (livePeriod == 4) {
// 			return $.t("sports['第四局']");
// 		}
// 		if (livePeriod == 5) {
// 			return $.t("sports['第五局']");
// 		}
// 		if (livePeriod == 6) {
// 			return $.t("sports['第六局']");
// 		}
// 		if (livePeriod == 7) {
// 			return $.t("sports['第七局']");
// 		}
// 		if (livePeriod == 8) {
// 			return $.t("sports['第八局']");
// 		}
// 		if (livePeriod == 9) {
// 			return $.t("sports['第九局']");
// 		}
// 	}
// 	return convertUtcToUtc5AndFormatMD(globalShowTime);
// });

// 定义计算属性 格式化比赛开始时间
/*const formattedGameTime = computed(() => {
	const minutes = Math.floor(props.event.gameInfo.seconds / 60);
	const seconds = props.event.gameInfo.seconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});
*/
// 跳转详情
// 跳转详情
const showDetail = (eventId, leagueId) => {
	const childrenToMainCommonData: ChildrenToMainCommon = {
		transactionName: ControllersEnum.SportAContainerChangeController,
		apiName: "toSportAcontainerProcess",
		data: {
			path: "/sports/event/detail",
			eventId,
			leagueId,
			sportType: props.event.sportType,
		},
	};
	childrenAppportAManage.forceDispatch(childrenToMainCommonData);
};
</script>

<style scoped lang="scss">
.content {
	.content-header {
		height: 60px;
		display: flex;
		padding: 10px 18px 10px 12px;
		@include themeify {
			background-color: themed("Line");
		}

		box-sizing: border-box;
		.left {
			width: 304px;
		}
		.right {
			width: 368px;
			gap: 4px;
		}
		.left,
		.right {
			display: flex;
			align-items: center;
			.label {
				margin-left: 12px;
				@include themeify {
					// color: themed("Theme");
				}
				font-family: "PingFang SC";
				font-size: 22px;
				font-weight: 500;
				line-height: 34px;
			}

			.title {
				@include themeify {
					color: themed("T1");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				line-height: 34px;

				&:nth-child(1) {
					width: 136px;
				}
				&:nth-child(2) {
					width: 112px;
				}
				&:nth-child(3) {
					width: 112px;
				}
			}
		}
	}

	.content-info {
		height: 276px;
		display: flex;
		padding: 0px 18px 0px 12px;
		.content-left {
			width: 304px;
			padding-right: 10px;
			padding-bottom: 20px;
			.team-tournament-info {
				height: 32px;
				display: flex;
				align-items: center;
				.icon {
					width: 32px;
					height: 32px;
					margin-right: 14px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.name {
					width: 178px;
					@include themeify {
						color: themed("TB");
					}
					font-family: "PingFang SC";
					font-size: 22px;
					font-weight: 400;
					line-height: 26px;
					white-space: nowrap; /* 禁止换行 */
					overflow: hidden; /* 隐藏超出部分 */
					text-overflow: ellipsis; /* 显示省略号 */
				}
			}

			.score-info {
				display: flex;
				align-items: center;
				margin-top: 31px;
				margin-left: 46px;
				.icon {
					width: 27px;
					height: 4px;
					margin: 0px 6px;
					@include themeify {
						background-color: themed("Line");
					}
					border-radius: 2px;
				}
				span {
					display: block;
					width: 50px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 8px;
					@include themeify {
						background-color: themed("BG9");
						color: themed("TB");
					}
					font-family: "DIN Alternate";
					font-size: 32px;
					font-weight: 700;
					line-height: 34px;
				}
			}

			.others {
				height: 32px;
				display: flex;
				align-items: center;
				margin-top: 32px;

				.other2 {
					margin-left: 8px;
					font-family: "DIN Alternate";
					font-size: 18px;
					font-weight: 700;
					span {
						&:nth-child(1) {
							@include themeify {
								color: themed("T1");
							}
						}
						&:nth-child(2) {
							margin-left: 4px;
							@include themeify {
								color: themed("Theme");
							}
						}
					}
				}
				.other3 {
					margin-left: 14px;
					color: #798d9f;
					svg {
						fill: none;
					}
				}
				.other4 {
					margin-left: 14px;
				}
				.other5 {
					width: 56px;
					height: 26px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 18px;
					border-radius: 4px;
					@include themeify {
						background-color: themed("T3");
						color: themed("TB-P");
					}
					font-family: "PingFang SC";
					font-size: 20px;
					font-weight: 400;
				}
			}
		}
		.content-right {
			width: 368px;
			margin-top: 4px;

			.content {
				display: flex;
				gap: 4px;
			}
		}

		:deep(.swiper) {
			.arrow {
				position: absolute;
				top: 118px;
				right: 0;
				z-index: 10;
				img {
					width: 30px;
					height: 20px;
				}
			}

			.swiper-pagination {
				bottom: 4px;

				.swiper-pagination-bullet {
					width: 8px;
					height: 4px;
					border-radius: 2px;
					@include themeify {
						background-color: themed("T3");
					}
				}
				.swiper-pagination-bullet-active {
					width: 14px;
					height: 4px;
					border-radius: 2px;
					@include themeify {
						background-color: themed("Theme");
					}
				}
			}
		}
	}
}
</style>
