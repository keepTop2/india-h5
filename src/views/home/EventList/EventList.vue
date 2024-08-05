<template>
	<div class="container bg_BG3">
		<div class="header">
			<SvgIcon class="icon" v-if="event.sportType == 1" iconName="home/event_football" />
			<SvgIcon class="icon" v-if="event.sportType == 2" iconName="home/event_basketBall" />
			<span class="title color_T1">{{ event.leagueName }}</span>
			<SvgIcon class="star" onName="home/event_collect" />
		</div>
		<div class="time color_T1">明天 02:00</div>
		<div class="match-info mb_24">
			<div class="team">
				<img :src="event.teamInfo.homeIconUrl" alt="France" />
				<span class="color_TB">{{ event.teamInfo.homeName }}</span>
			</div>
			<div class="score color_TB bg_BG4">{{ event.gameInfo?.liveHomeScore }}</div>
		</div>
		<div class="match-info">
			<div class="team">
				<img :src="event.teamInfo.awayIconUrl" alt="" />
				<span class="color_TB">{{ event.teamInfo.awayName }}</span>
			</div>
			<div class="score color_TB bg_BG4">{{ event.gameInfo?.liveAwayScore }}</div>
		</div>
		<div class="line bg_Line"></div>

		<div class="price_title">全场独赢</div>
		<div class="odds">
			<div class="odds-item">
				<span>主胜</span>
				<span class="value" :class="[changeClass(event.markets[5].selections[0])]">
					{{ event.markets[5].selections[0].oddsPrice.decimalPrice }}
					<RiseOrFall
						v-if="event.markets[5].selections[0].oddsChange"
						:time="3000"
						:status="event.markets[5].selections[0].oddsChange == 'oddsUp' ? 1 : 2"
						@animationEnd="animationEnd(event.markets[5].marketId, event.markets[5].selections[0])"
					/>
				</span>
			</div>
			<div class="odds-item">
				<span>平局</span>
				<span class="value" :class="[changeClass(event.markets[5].selections[1])]"
					>{{ event.markets[5].selections[1].oddsPrice.decimalPrice }}
					<RiseOrFall
						v-if="event.markets[5].selections[1].oddsChange"
						:time="3000"
						:status="event.markets[5].selections[1].oddsChange == 'oddsUp' ? 1 : 2"
						@animationEnd="animationEnd(event.markets[5].marketId, event.markets[5].selections[1])"
					/>
				</span>
			</div>
			<div class="odds-item">
				<span>客胜</span>
				<span class="value" :class="[changeClass(event.markets[5].selections[2])]"
					>{{ event.markets[5].selections[2].oddsPrice.decimalPrice }}
					<RiseOrFall
						v-if="event.markets[5].selections[2].oddsChange"
						:time="3000"
						:status="event.markets[5].selections[2].oddsChange == 'oddsUp' ? 1 : 2"
						@animationEnd="animationEnd(event.markets[5].marketId, event.markets[5].selections[2])"
					/>
				</span>
			</div>
			<!-- <span v-if="market.betType == 20"><template v-if="item?.key == 'h'">主胜</template> <template v-if="item?.key == 'a'">客胜</template></span>
						<span v-if="market.betType == 1">{{ SportsCommon.formatPoint({ betType: market.betType, point: item?.point, key: item?.key }) }}</span>
						<span v-if="market.betType == 3">
							{{ item?.keyName }}
							{{ item?.point }}
						</span> -->
		</div>
		<div class="price_title">全场让球</div>
		<div class="handicap">
			<div class="handicap-item">
				<span>{{ SportsCommon.formatPoint({ betType: event.markets[1].betType, point: event.markets[1].selections[0].point, key: event.markets[1].selections[0].point?.key }) }}</span>
				<span class="value" :class="[changeClass(event.markets[1].selections[0])]"
					>{{ event.markets[1].selections[0].oddsPrice.decimalPrice }}
					<RiseOrFall
						v-if="event.markets[1].selections[0].oddsChange"
						:time="3000"
						:status="event.markets[1].selections[0].oddsChange == 'oddsUp' ? 1 : 2"
						@animationEnd="animationEnd(event.markets[1].marketId, event.markets[1].selections[0])"
					/>
				</span>
			</div>
			<div class="handicap-item">
				<span>{{ SportsCommon.formatPoint({ betType: event.markets[1].betType, point: event.markets[1].selections[1].point, key: event.markets[1].selections[1].point?.key }) }}</span>
				<span class="value" :class="[changeClass(event.markets[1].selections[1])]"
					>{{ event.markets[1].selections[1].oddsPrice.decimalPrice }}
					<RiseOrFall
						v-if="event.markets[1].selections[1].oddsChange"
						:time="3000"
						:status="event.markets[1].selections[1].oddsChange == 'oddsUp' ? 1 : 2"
						@animationEnd="animationEnd(event.markets[1].marketId, event.markets[1].selections[1])"
					/>
				</span>
			</div>
		</div>
		<div class="price_title">全场大小</div>
		<div class="handicap">
			<div class="handicap-item">
				<span
					>{{ event.markets[3].selections[0].keyName
					}}{{ SportsCommon.formatPoint({ betType: event.markets[3].betType, point: event.markets[3].selections[0].point, key: event.markets[3].selections[0].point?.key }) }}</span
				>
				<span class="value" :class="[changeClass(event.markets[3].selections[0])]">{{ event.markets[3].selections[0].oddsPrice.decimalPrice }}</span>
				<RiseOrFall
					v-if="event.markets[3].selections[0].oddsChange"
					:time="3000"
					:status="event.markets[3].selections[0].oddsChange == 'oddsUp' ? 1 : 2"
					@animationEnd="animationEnd(event.markets[3].marketId, event.markets[3].selections[0])"
				/>
			</div>
			<div class="handicap-item">
				<span
					>{{ event.markets[3].selections[1].keyName
					}}{{ SportsCommon.formatPoint({ betType: event.markets[3].betType, point: event.markets[3].selections[1].point, key: event.markets[3].selections[1].point?.key }) }}</span
				>
				<span class="value" :class="[changeClass(event.markets[3].selections[1])]">{{ event.markets[3].selections[1].oddsPrice.decimalPrice }}</span>
				<RiseOrFall
					v-if="event.markets[3].selections[1].oddsChange"
					:time="3000"
					:status="event.markets[3].selections[1].oddsChange == 'oddsUp' ? 1 : 2"
					@animationEnd="animationEnd(event.markets[3].marketId, event.markets[3].selections[1])"
				/>
			</div>
			<!-- <div class="handicap-item lock-container">
				<SvgIcon class="lock" iconName="home/event_lock" />
			</div> -->
		</div>
		<div class="more-bets">
			<span class="fs_28 color_T1">更多投注</span>
			<SvgIcon iconName="home/right_arrow" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import SportsCommon from "/@/views/venueHome/sports/utils/common";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import RiseOrFall from "/@/views/venueHome/sports/components/riseOrFall/riseOrFall.vue";
import { WebToPushApi } from "/@/views/venueHome/sports/enum/sportEventSourceEnum";

const { startPolling, stopPolling, initSportPubsub, unSubSport, clearState, sportsLogin, clearSportsOddsChange } = useSportPubSubEvents();

const props = defineProps({
	event: {
		type: Object,
		required: true,
	},
});
/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (marketId, selection) => {
	if (selection.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		clearSportsOddsChange({ webToPushApi: WebToPushApi.sportsEventDetail, marketId, selection });
		//删除 childrenViewData中的状态
		selection.oddsChange = "";
	}
};

/**
 * @description 切换类名
 */
const changeClass = (item) => {
	if (!item.oddsChange) {
		return "";
	} else if (item.oddsChange == "oddsUp") {
		return "oddsUp";
	} else if (item.oddsChange == "oddsDown") {
		return "oddsDown";
	}
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
	.oddsUp {
		@include themeify {
			color: themed("Theme") !important;
		}
	}

	.oddsDown {
		@include themeify {
			color: themed("Wam-P1") !important;
		}
	}
	.lock {
		width: 32px;
		height: 32px;
	}
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

	.odds {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		gap: 16px;
		.odds-item {
			width: 159px;
			height: 39px;
			padding: 15px 24px;
			border-radius: 12px;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-evenly;
			@include themeify {
				background: themed("BG4");
				span {
					display: block;
					font-size: 28px;
					color: themed("T1");
				}

				.value {
					font-size: 28px;
					color: themed("TB");
				}
			}
		}
	}

	.handicap {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		gap: 16px;
		.handicap-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 319px;
			height: 68px;
			padding: 17px 24px;
			box-sizing: border-box;
			font-size: 28px;
			@include themeify {
				background: themed("BG4");
				span {
					display: block;
					color: themed("T1");
				}
				.value {
					font-weight: bold;
				}
				.green {
					color: themed("Wam-P1");
				}

				.red {
					color: themed("Theme");
				}
			}
		}
		.lock-container {
			display: flex;
			justify-content: center;
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
