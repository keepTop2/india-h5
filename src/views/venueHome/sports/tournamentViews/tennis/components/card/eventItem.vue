<template>
	<!-- 赛事内容区域 -->
	<div class="content">
		<!-- 内容区域 头部 -->
		<div class="content-header">
			<!-- 上下半场及时间 -->
			<div class="left">
				<div class="icon">
					<!-- 关注 -->
					<SvgIcon class="icon" v-if="isAttention" iconName="venueHome/sports/svg/collection2" @click="attentionEvent(true)" />
					<!-- 取消关注 -->
					<SvgIcon class="icon" v-else iconName="venueHome/sports/svg/collection" @click="attentionEvent(false)" />
				</div>
				<div class="label" :class="{ 'color_Theme-P': event.isLive, color_TB: !event.isLive }">
					<span class="mr_6">{{ SportsCommonFn.getEventsTitle(event) }}</span>
					<!-- <span v-if="[1, 2, 3, 4, 99].includes(event.gameInfo.livePeriod) ">{{ formattedGameTime }}</span> -->
				</div>
			</div>
			<!-- 盘口表头  -->
			<div class="right">
				<div class="title">{{ SportsCommonFn.betTypeMap[5][20] }}</div>
				<div class="title">{{ SportsCommonFn.betTypeMap[5][1303] }}</div>
				<div class="title">{{ SportsCommonFn.betTypeMap[5][153] }}</div>
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
					<div v-if="event.streamingOption != 0 && event.channelCode" class="other3">
						<SvgIcon iconName="venueHome/sports/svg/sport_live" />
					</div>
					<!-- <div class="other4">
						<SvgIcon iconName="venueHome/sports/svg/sport_match_status" size="4.266667" />
					</div> -->
					<div class="other5">{{ event.marketCount }}</div>
				</div>
			</div>
			<!-- 全场 半场 swiper  -->
			<div class="content-right">
				<div class="content" style="padding-bottom: 0px">
					<marketItem v-for="market in filterMarkets(event.markets, [20, 1303, 153])" :key="`${event.eventId}-${market.betType}`" :event="event" :market="market" />
				</div>

				<div class="tennis-score-info">
					<!-- 节数比分 -->
					<div class="score-list" v-if="SportsCommonFn.isStartMatch(event.globalShowTime)">
						<div class="item" :class="{ theme: event.tennisInfo.currentSet == item }" v-for="(item, index) in event.tennisInfo.currentSet" :key="item">
							{{ event.tennisInfo.homeGameScore[index] }}-{{ event.tennisInfo.awayGameScore[index] }}
						</div>
					</div>
					<span class="ml_8">{{ event.gameSession == 3 ? "3盘2胜" : "5盘3胜" }}</span>
					<template v-if="SportsCommonFn.isStartMatch(event.globalShowTime)">
						<span class="ml_4">总局数</span>
						<span class="ml_2 theme">{{ event.tennisInfo.homeGameScore.flat().reduce((a, b) => a + b, 0) }}-{{ event.tennisInfo.awayGameScore.flat().reduce((a, b) => a + b, 0) }}</span>
						<span class="theme">({{ event.tennisInfo.homeGameScore.flat().reduce((a, b) => a + b, 0) + event.tennisInfo.awayGameScore.flat().reduce((a, b) => a + b, 0) }})</span>
					</template>
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
	[SportsCommonFn.BetTypeEnum.FULL_HANDICAP]: 2,
	[SportsCommonFn.BetTypeEnum.NUMBER_ROUNDS_WON]: 2,
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

// 跳转详情
const showDetail = (eventId, leagueId) => {};
</script>

<style scoped lang="scss">
@import "/@/views/venueHome/sports/common.scss";

.tennis-score-info {
	display: flex;
	align-items: center;
	justify-content: end;
	margin-top: 10px;
	@include themeify {
		color: themed("T1");
	}
	font-family: "DIN Alternate";
	font-size: 18px;
	font-weight: 700;
	line-height: 32px;
	.score-list {
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 15px;
		padding: 0px 5px;
	}
	.theme {
		@include themeify {
			color: themed("Theme");
		}
	}
}
</style>
