<!--
 * @Author: HiDa
 * @Date: 2024-06-07 14:40:39
 * @LastEditors: HiDa
 * @LastEditTime: 2024-06-14 22:58:34
 * @Description:  盘口信息组件
-->
<template>
	<div class="columns">
		<div class="item" v-for="(item, index) in market.selections" :key="index">
			<div class="data_item" v-if="item">
				<div v-if="market.marketStatus === 'running'" :class="{ isBright: isBright(item) }" @click="onSetSportsEventData(item)">
					<div class="label">
						<span v-if="market.betType == 20"> <template v-if="item?.key == 'h'">主胜</template> <template v-if="item?.key == 'a'">客胜</template></span>
						<span v-if="market.betType == 1">{{ SportsCommon.formatPoint({ betType: market.betType, point: item?.point, key: item?.key }) }}</span>
						<span v-if="market.betType == 3">
							{{ item?.keyName }}
							{{ item?.point }}
						</span>
					</div>
					<div class="value" :class="oddsClass(item)">
						<div>{{ item?.oddsPrice?.decimalPrice }}</div>
					</div>
					<RiseOrFall v-if="item.oddsChange" :time="3000" :status="item.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(item)" />
				</div>
				<template v-else>
					<div>
						<SvgIcon iconName="/venueHome/sports/svg/sport_lock" size="4.6" />
					</div>
				</template>
			</div>
			<template v-else>
				<i class="noData"></i>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import RiseOrFall from "/@/views/venueHome/sports/components/riseOrFall/riseOrFall.vue";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { WebToPushApi } from "/@/views/venueHome/sports/enum/sportEventSourceEnum";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import SportsCommon from "/@/views/venueHome/sports/utils/common";

const { clearSportsOddsChange } = useSportPubSubEvents();
const sportsBetEvent = useSportsBetEventStore();
const props = defineProps({
	event: {
		type: Object,
		default: () => {},
	},
	market: {
		type: Object,
		default: () => {},
	},
});

/**
 * @description 判断当前盘口是否存在pinia中
 */
const isBright = (selection) => {
	return sportsBetEvent.getEventInfo[props.event.eventId]?.listKye == `${props.market.marketId}-${selection.key}`;
};

/**
 * @description 处理盘口高亮状态，拼接 marketid 与 selection key 作为唯一标识，存储值pinia中
 */
const onSetSportsEventData = (selection) => {
	const { market, event } = props;
	//存储盘口唯一标识
	if (isBright(selection)) {
		// 删除Pinia数据
		sportsBetEvent.removeEventCart(event);
	} else {
		sportsBetEvent.storeEventInfo(event.eventId, {
			marketId: market.marketId,
			betType: market.betType,
			selectionKey: selection.key,
		});
		// 存储Pinia数据
		// console.log("JSON.parse(JSON.stringify(event))", JSON.parse(JSON.stringify(event)));
		sportsBetEvent.addEventToCart(JSON.parse(JSON.stringify(event)));
	}
};

/**
 * @description 赔率状态类名
 */
const oddsClass = (item) => {
	if (!item.oddsChange) {
		return "";
	} else if (item.oddsChange == "oddsUp") {
		return "oddsUp";
	} else if (item.oddsChange == "oddsDown") {
		return "oddsDown";
	}
};

/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (item) => {
	if (item.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		clearSportsOddsChange({ webToPushApi: WebToPushApi.rollingBall, marketId: props.market.marketId, selection: item });
		//删除 childrenViewData中的状态
		item.oddsChange = "";
	}
};
</script>

<style scoped lang="scss">
@import "/@/views/venueHome/sports/common.scss";
.columns {
	.item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 4px;
		text-align: center;
		border-radius: 8px;
		@include themeify {
			background-color: themed("Line");
		}

		.data_item {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.isBright {
				position: relative;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				&::after {
					content: "";
					position: absolute;
					width: 100%;
					height: 100%;
					border-radius: 8px;
					border: 2px solid;
					@include themeify {
						border-color: themed("Theme");
					}
					box-sizing: border-box;
				}
			}
			.label {
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 20px;
				font-weight: 400;
				line-height: 34px;
			}
			.value {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 600;
				line-height: 34px;
			}
		}
	}
	&:nth-child(1) {
		width: 136px;
		.item {
			width: 100%;
			height: 106px;
		}
	}
	&:nth-child(2) {
		width: 112px;
		.item {
			width: 100%;
			height: 106px;
		}
	}
	&:nth-child(3) {
		width: 112px;
		.item {
			width: 100%;
			height: 106px;
		}
	}

	.noData {
		display: inline-block;
		width: 14px;
		height: 1px;
		border-radius: 2px;
		@include themeify {
			background-color: themed("T1");
		}
	}
}
</style>
