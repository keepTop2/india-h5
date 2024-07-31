<template>
	<div class="bet_slip_item">
		<!-- 删除按钮 -->
		<div class="remove_icon"></div>
		<SvgIcon class="sports_remove" iconName="/venueHome/sports/svg/sports_remove" size="3.466667" @click="onDeleteBetEvent(props.data)" />
		<!-- 投注赛事信息 -->
		<div class="bet_slip_info" :style="{ opacity: opacityFn(props.data) }">
			<div class="bet_slip_label">
				<div>
					<span>{{ getName(props.data) }}</span
					>&nbsp;<span v-if="props.data.betMarketInfo.point !== undefined" class="ml_8">{{
						SportsCommon.formatPoint({
							betType: props.data.betMarketInfo?.betType,
							point: props.data.betMarketInfo?.point,
							key: props.data.betMarketInfo?.key,
						})
					}}</span>
				</div>
				<div v-if="props.data.eventStatus !== 'running' || props.data.betMarketInfo?.marketStatus !== 'running'" style="position: relative">
					<span>@-</span>
				</div>
				<div v-else style="position: relative">
					<span :class="changeClass(props.data.betMarketInfo)">@{{ shopCartPubSub.decimalPrice(props.data) }}</span>
					<div class="change-icon">
						<RiseOrFall v-if="props.data.betMarketInfo.oddsChange" :status="props.data.betMarketInfo?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(props.data.betMarketInfo)" />
					</div>
				</div>
			</div>
			<div class="bet_slip_type mt_2">
				<div>
					<span v-if="props.data.isLive" class="theme mr_8">[滚球]</span>
					<span class="mr_8">{{ props.data.betMarketInfo.betTypeName }}</span>
					<span>[欧洲盘]</span>
				</div>
				<div v-if="getEventsStatusText(props.data)">
					<span class="tip">{{ getEventsStatusText(props.data) }}</span>
				</div>
			</div>

			<div class="bet_slip_name">
				<span>{{ props.data.teamInfo.homeName }}</span> v <span>{{ props.data.teamInfo.awayName }}</span>
				<span class="ml_8">({{ props.data.gameInfo.liveHomeScore }} - {{ props.data.gameInfo.liveAwayScore }})</span>
			</div>
			<div class="bet_slip_name mt_10">
				<span>{{ props.data.leagueName }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import RiseOrFall from "/@/views/venueHome/sports/components/riseOrFall/riseOrFall.vue";
import shopCartPubSub from "/@/views/venueHome/sports/hooks/shopCartPubSub";
import { SportsRootObject } from "/@/views/venueHome/sports/utils/interface";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import SportsCommon from "/@/views/venueHome/sports/utils/common";

const sportsBetEvent = useSportsBetEventStore();

const props = withDefaults(
	defineProps<{
		data: SportsRootObject;
	}>(),
	{}
);

// 删除赛事
const onDeleteBetEvent = (item) => {
	sportsBetEvent.removeEventCart(item);
};

// 判断名称
const getName = (item) => {
	if ((item.betMarketInfo.betType == 5 || item.betMarketInfo.betType == 15) && item.betMarketInfo.key == "1") {
		return item.teamInfo.homeName;
	} else if ((item.betMarketInfo.betType == 5 || item.betMarketInfo.betType == 15) && item.betMarketInfo.key == "2") {
		return item.teamInfo.awayName;
	} else if ((item.betMarketInfo.betType == 5 || item.betMarketInfo.betType == 15) && item.betMarketInfo.key == "x") {
		return "平局";
	} else if ((item.betMarketInfo.betType == 1303 || item.betMarketInfo.betType == 704) && item.betMarketInfo.key == "h") {
		return item.teamInfo.homeName;
	} else if ((item.betMarketInfo.betType == 1303 || item.betMarketInfo.betType == 704) && item.betMarketInfo.key == "a") {
		return item.teamInfo.awayName;
	} else {
		return item.betMarketInfo.keyName;
	}
};

/**
 * @description 判断赛事状态
 */
const opacityFn = (item: any) => {
	// 判断赛事状态 与 盘口状态 当前投注赛事信息 球类 是否支持串关 赛事小节是否支持串关
	if (sportsBetEvent.sportsBetEventData.length == 1) {
		// 判断赛事状态 与 盘口状态
		if (item.eventStatus !== "running" || item.betMarketInfo?.marketStatus !== "running") {
			return 0.4;
		} else {
			return 1;
		}
	}
	if (sportsBetEvent.sportsBetEventData.length > 1) {
		if (
			item.eventStatus !== "running" ||
			item.betMarketInfo?.marketStatus !== "running" ||
			item.betMarketInfo?.differentBalls ||
			!item.isParlay ||
			item.betMarketInfo?.combo == 0 ||
			(item.betMarketInfo.stateCode && item.betMarketInfo.stateCode != 0)
		) {
			return 0.4;
		} else {
			return 1;
		}
	}
};

/**
 * @description 判断按钮文本
 */
const getEventsStatusText = (item) => {
	// 判断赛事状态 与 盘口状态
	if (item.eventStatus !== "running" || item.betMarketInfo?.marketStatus !== "running") {
		return "盘口已关闭";
	}
	if (sportsBetEvent.sportsBetEventData.length > 1) {
		// 判断当前投注赛事信息 球类 是否支持串关 赛事小节是否支持串关
		if (item.betMarketInfo?.differentBalls || !item.isParlay || item.betMarketInfo?.combo == 0) {
			return "不支持串关";
		}
		if (item.betMarketInfo.stateCode && item.betMarketInfo.stateCode != 0) {
			return "暂不支持投注";
		}
	}
};

/**
 * @description 切换上升下降类名
 */
const changeClass = (item) => {
	if (!item?.oddsChange) {
		return "";
	} else if (item?.oddsChange == "oddsUp") {
		return "oddsUp";
	} else if (item?.oddsChange == "oddsDown") {
		return "oddsDown";
	}
};

/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (item) => {
	if (item.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		//删除 childrenViewData中的状态
		item.oddsChange = "";
	}
};
</script>

<style scoped lang="scss">
@import "/@/views/venueHome/sports/common.scss";

.bet_slip_item {
	position: relative;
	display: flex;
	align-items: center;
	margin-top: 10px;
	border-radius: 16px;
	padding: 11px 40px;

	@include themeify {
		background-color: themed("BG3");
	}

	.remove_icon {
		position: absolute;
		width: 60px;
		height: 36px;
		bottom: 0px;
		right: 0px;
		border-radius: 16px 0px;

		@include themeify {
			background-color: themed("Tag2-P");
		}

		opacity: 0.2;
	}

	.sports_remove {
		position: absolute;
		height: 36px;
		bottom: 0px;
		right: 17px;
		z-index: 10;
	}

	.bet_slip_info {
		flex: 1;

		.bet_slip_label {
			display: flex;
			align-items: center;
			justify-content: space-between;

			@include themeify {
				color: themed("TB");
			}

			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 500;

			.change-icon {
				position: absolute;
				top: 50%;
				right: -35px;
				transform: translate(-50%, 0);
			}
		}

		.bet_slip_type {
			display: flex;
			justify-content: space-between;

			.tip {
				display: block;
				padding: 2px 7px;
				border-radius: 5px;

				@include themeify {
					background-color: themed("Tag2-P");
					color: themed("TB");
				}
			}

			.theme {
				@include themeify {
					color: themed("Theme");
				}
			}
		}

		.bet_slip_type,
		.bet_slip_name,
		.bet_slip_name {
			@include themeify {
				color: themed("T1");
			}

			font-family: "PingFang SC";
			font-size: 22px;
			font-weight: 400;
		}
	}
}
</style>
