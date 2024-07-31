<template>
	<div class="bet_slip_item">
		<!-- 删除按钮 -->
		<div class="remove_icon"></div>
		<SvgIcon class="sports_remove" iconName="/venueHome/sports/svg/sports_remove" size="3.466667" @click="onDeleteBetEvent(data)" />
		<!-- 投注冠军赛事信息 -->
		<div class="bet_slip_info" :style="{ opacity: opacityFn(props.data) }">
			<div class="bet_slip_label">
				<div>{{ props.data.teamName }}</div>
				<div style="position: relative">
					<!-- <span>@{{ Common.getInstance().formatFloat(props.data.price) }}</span> -->
					<span>@{{ shopCartChampionPubSub.decimalPrice(props.data) }}</span>
				</div>
			</div>
			<div class="bet_slip_type mt_2">
				<div>
					<span>[优胜冠军]</span>
					<span class="ml_8">[欧洲盘]</span>
				</div>
				<div v-if="getEventsStatusText(props.data)">
					<span class="tip">{{ getEventsStatusText(props.data) }}</span>
				</div>
			</div>
			<div class="bet_slip_name mt_5">
				<span>{{ props.data.leagueName }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import shopCartChampionPubSub from "/@/views/venueHome/sports/hooks/shopCartChampionPubSub";
import { SportsRootObject } from "../../../../utils/interface";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
const sportsBetChampion = useSportsBetChampionStore();
const props = withDefaults(
	defineProps<{
		data: SportsRootObject;
	}>(),
	{}
);

/**
 * @description 判断赛事文本
 */
const getEventsStatusText = (item) => {
	// 判断赛事状态 与 盘口状态
	if (item.oddsStatus !== "running") {
		return "盘口已关闭";
	}

	if (sportsBetChampion.championBetData.length > 1) {
		return "不支持串关";
	}
};

/**
 * @description 判断赛事状态
 */
const opacityFn = (item: any) => {
	// 判断赛事状态 与 盘口状态
	if (item.oddsStatus !== "running" || sportsBetChampion.championBetData.length > 1) {
		return 0.4;
	} else {
		return 1;
	}
};

/**
 * 删除赛事
 */
const onDeleteBetEvent = (item) => {
	sportsBetChampion.removeChampionTEventCart(item);
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
