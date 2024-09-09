<template>
	<div class="container bg_BG3">
		<div class="header">
			<SvgIcon class="icon" v-if="event.sportType == 1" iconName="home/event_football" />
			<SvgIcon class="icon" v-if="event.sportType == 2" iconName="home/event_basketBall" />
			<span class="title color_T1">{{ event.leagueName }}</span>
			<!-- 关注 -->
			<SvgIcon v-if="isAttention" iconName="home/event_collect" size="5.333333" @click="attentionEvent(true)" />
			<!-- 取消关注 -->
			<SvgIcon v-else iconName="home/event_collect_no" size="5.333333" @click="attentionEvent(false)" />
		</div>
		<div class="time color_T1">
			{{ SportsCommonFn.getEventsTitle(event) }}
			<span v-if="(event.gameInfo?.livePeriod == 2 || event.gameInfo?.livePeriod == 1) && !event.gameInfo?.delayLive && !event.gameInfo?.isHt">{{ formattedGameTime }}</span>
		</div>
		<div class="match-info mb_24">
			<div class="team">
				<VantLazyImg :src="event.teamInfo?.homeIconUrl" alt="France" />
				<span class="color_TB">{{ event.teamInfo?.homeName }}</span>
			</div>
			<div class="score color_TB bg_BG4">{{ event.gameInfo?.liveHomeScore }}</div>
		</div>
		<div class="match-info">
			<div class="team">
				<VantLazyImg :src="event.teamInfo?.awayIconUrl" alt="" />
				<span class="color_TB">{{ event.teamInfo?.awayName }}</span>
			</div>
			<div class="score color_TB bg_BG4">{{ event.gameInfo?.liveAwayScore }}</div>
		</div>
		<div class="line bg_Line"></div>
		<Markets :event="event" :markets="event.markets" :sportType="event.sportType" />
		<div class="more-bets">
			<span class="fs_28 color_T1" @click="showDetail()">{{ $t('home["更多投注"]') }}</span>
			<SvgIcon iconName="home/right_arrow" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import Markets from "./components/markets/markets.vue";
import sportsApi from "/@/api/venueHome/sports";
import pubsub from "/@/pubSub/pubSub";
import SportsCommonFn from "/@/views/venueHome/sports/utils/common";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import VantLazyImg from "/@/components/vant/VantLazyImg.vue";

const sportsBetData = useSportsBetEventStore();
const router = useRouter();

/**
 * @description 接受入参event 赛事详细信息
 * @param {Object} event - 赛事详细信息对象
 */
const props = defineProps({
	event: {
		type: Object,
		required: true,
	},
});

// 判断赛事是否关注
const isAttention = computed(() => {
	return sportsBetData.attentionEventIdList.includes(props.event.eventId);
});

// 定义计算属性 格式化比赛开始时间
const formattedGameTime = computed(() => {
	const minutes = Math.floor(props.event.gameInfo.seconds / 60);
	const seconds = props.event.gameInfo.seconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

/**
 * @description 点击关注按钮
 * @param {boolean} isActive - 是否激活关注
 */
const attentionEvent = async (isActive: boolean) => {
	if (isActive) {
		await sportsApi.unFollow({
			thirdId: [props.event.eventId],
		});
	} else {
		console.log(props.event, "==event info");
		await sportsApi.saveFollow({
			thirdId: props.event.eventId,
			type: 2,
		});
	}
	pubsub.publish(pubsub.PubSubEvents.SportEvents.attentionChange.eventName, {});
};

/**
 * @description 跳转体育详情页
 */
const showDetail = () => {
	router.push(`/venueHome/sports/event/detail/${props.event.eventId}/${props.event.leagueId}/${props.event.sportType}`);
};
</script>
<style scoped lang="scss">
$background-color: #333;
$text-color: #fff;
$secondary-text-color: #aaa;
$green-color: #0f0;
$red-color: #f00;

.container {
	padding: 24px;
	border-radius: 20px;

	.line {
		height: 1px;
		margin: 24px 0;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;

		.icon {
			height: 32px;
			width: 32px;
		}
		.star {
			width: 30px;
			height: 30px;
		}
		.title {
			width: 427px;
			flex: 1;
			margin: 0 10px;
			font-size: 28px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.time {
		font-size: 24px;
		margin-bottom: 36px;
	}
	.price_title {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 12px;
		@include themeify {
			color: themed("T1");
		}
	}

	.match-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: "PingFang SC";
		.team {
			display: flex;
			align-items: center;

			img {
				width: 50px;
				height: 50px;
				margin-right: 20px;
			}

			span {
				font-size: 32px;
				width: 282px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.score {
			font-size: 28px;
			text-align: center;
			width: 76px;
			height: 62px;
			line-height: 62px;
			border-radius: 12px;
		}
	}

	.more-bets {
		text-align: center;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 26px;
		svg {
			width: 34px;
			height: 28px;
		}
	}
}
</style>
