<template>
	<div class="card-item">
		<div class="tournament-header" @click="toggleDisplay">
			<SvgIcon v-if="isAttention" iconName="collection2" size="5.333333" @click.stop="attentionEvent(true)" />
			<SvgIcon v-else iconName="collection" size="5.333333" @click.stop="attentionEvent(false)" />
			<div class="tournament-info">
				<div class="tournament-name">{{ data.leagueName }}</div>
			</div>
			<span class="count">
				{{ data?.teams?.length }}
			</span>
			<!-- <SvgIcon :class="{ sport_arrow: !displayContent }" iconName="sport_arrow" size="5.333333" /> -->
		</div>
		<template v-if="displayContent">
			<ul class="bg_Bg3 leagueList">
				<li
					class="bg_Tag1 color_T1 flex_space_between fs_20 content"
					:class="{ isBright: isBright(team, data) }"
					v-for="(team, index) in data.teams"
					:key="index"
					@click="onAddOutrightToCart(team, data)"
				>
					{{ team.teamName }} <span :class="['price', 'fs_28', team?.oddsChange]">{{ Common.getInstance().formatFloat(team.price) }}</span>
					<RiseOrFall v-if="team?.oddsChange" :time="3000" :status="team?.oddsChange == 'oddsUp' ? 1 : 2" @animationEnd="animationEnd(data.leagueId, team)" />
				</li>
			</ul>
		</template>
	</div>
</template>

<script setup lang="ts">
import sportsApi from "/@/api/venueHome/sports";
import pubsub from "/@/pubSub/pubSub";
import Common from "/@/utils/common";
import useSportPubSubEvents from "/@/views/venueHome/sports/hooks/useSportPubSubEvents";
import { WebToPushApi } from "/@/views/venueHome/sports/enum/sportEventSourceEnum";
import { computed, ref } from "vue";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
const sportsBetEvent = useSportsBetEventStore();
const sportsBetChampion = useSportsBetChampionStore();
const { clearSportsOddsChange } = useSportPubSubEvents();

interface teamDataType {
	/** 数据索引 */
	dataIndex: number;
	/** 队伍数据 */
	data: any;
	/** 是展开状态？ */
	isExpand?: boolean;
}
const props = withDefaults(defineProps<teamDataType>(), {
	isExpand: true,
	/** 数据索引 */
	dataIndex: 0,
	/** 队伍数据 */
	data: () => {
		return {};
	},
});

const isAttention = computed(() => {
	return sportsBetEvent.attentionLeagueIdList.includes(props.data.leagueId);
});
const emit = defineEmits(["oddsChange", "toggleDisplay"]);
const displayContent = ref(true);
const attentionEvent = async (isActive: boolean) => {
	if (isActive) {
		await sportsApi.unFollow({
			thirdId: [props.data.leagueId],
		});
	} else {
		await sportsApi.saveFollow({
			thirdId: props.data.leagueId,
			type: 1,
		});
	}
	pubsub.publish(pubsub.PubSubEvents.SportEvents.attentionChange.eventName, {});
};

const toggleDisplay = () => {
	displayContent.value = !displayContent.value;
	const params = {
		index: props.dataIndex,
		isExpand: displayContent.value,
	};
	emit("toggleDisplay", params);
};

const outrightSelect = computed(() => sportsBetChampion.getChampionBetObj);

/**
 * @description 判断当前盘口是否存在pinia中
 */
const isBright = (item, data) => {
	return outrightSelect.value[data.leagueId]?.orid == item.orid;
};

// 添加数据到购物车
const onAddOutrightToCart = (item, data) => {
	item.leagueId = data.leagueId;
	item.leagueName = data.leagueName;
	item.sportType = data.sportType;
	if (isBright(item, data)) {
		sportsBetChampion.removeChampionTEventCart(item);
	} else {
		sportsBetChampion.addChampionToCart(JSON.parse(JSON.stringify(item)));
	}
};

/**
 * @description 动画结束删除oddsChange字段状态
 */
const animationEnd = (leagueId, team) => {
	if (team.oddsChange) {
		//删除 markets中的 oddsChange字段状态
		clearSportsOddsChange({ webToPushApi: WebToPushApi.champion, leagueId, team });
		//删除 childrenViewData中的状态
		team.oddsChange = "";
	}
};

watch(
	() => props.isExpand,
	(newValue, oldValue) => {
		displayContent.value = newValue;
	},
	{
		immediate: true,
	}
);
</script>

<style scoped lang="scss">
.card-item {
	margin: 0px 24px 24px 24px;
	border-radius: 16px;
	overflow: hidden;
	@include themeify {
		background-color: themed("BG3");
	}
}
.tournament-header {
	height: 56px;
	display: flex;
	align-items: center;
	padding: 8px 12px;
	border-radius: 16px 16px 0px 0px;
	@include themeify {
		background: themed("--JBS-CARD");
	}
	box-sizing: border-box;
	.count {
		// width: 34px;
		height: 34px;
		font-size: 22px;
		padding: 0px 10px;
		margin-right: 4px;
		text-align: center;
		line-height: 34px;
		border-radius: 8px;
		@include themeify {
			background: themed("Tag2-P");
			color: themed("TB-P");
		}
	}
	.tournament-info {
		flex: 1;
		display: flex;
		align-items: center;
		margin-right: 18px;

		.tournament-icon {
			width: 30px;
			height: 30px;
			margin: 0 12px;
			img {
				width: 100%;
				height: 100%;
			}
		}

		.tournament-name {
			width: 526px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
			line-height: 34px;
			white-space: nowrap; /* 禁止换行 */
			overflow: hidden; /* 隐藏超出部分 */
			text-overflow: ellipsis; /* 显示省略号 */
		}
	}

	.sport_arrow {
		transform: rotate(-180deg);
	}
}
.flex_space_between {
	display: flex;
	justify-content: space-between;
}
.time {
	text-align: center;
	height: 60px;
	line-height: 60px;
}

.isBright {
	position: relative;
	width: 100%;
	height: 100%;
	&::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		right: 0px;
		border-radius: 8px;
		border: 2px solid;
		@include themeify {
			border-color: themed("Theme-P");
		}
		box-sizing: border-box;
	}
}
.leagueList {
	padding: 8px 12px 0px 12px;
	li {
		padding: 0 24px;
		height: 58px;
		line-height: 58px;
		border-radius: 8px;
		margin-bottom: 8px;
		box-sizing: border-box;
	}
	@include themeify {
		.price {
			color: themed("TB");
		}
		.up {
			color: themed("Warn-P");
		}
		.down {
			color: themed("Theme-P");
		}
	}
}

.list-content {
	height: calc(100vh - 595px);
	.container {
		padding: 0px 24px;
	}
	.card-item {
		margin-bottom: 24px;
		border-radius: 16px;
		overflow: hidden;
		@include themeify {
			background-color: themed("BG3");
		}
	}
	.tournament-header {
		height: 56px;
		display: flex;
		align-items: center;
		padding: 8px 12px;
		border-radius: 16px 16px 0px 0px;
		@include themeify {
			background: themed("--JBS-CARD");
		}
		box-sizing: border-box;
		p {
			text-align: center;
			line-height: 34px;
		}
		.tournament-info {
			flex: 1;
			display: flex;
			align-items: center;
			margin-right: 18px;

			.tournament-name {
				width: 526px;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				line-height: 34px;
				white-space: nowrap; /* 禁止换行 */
				overflow: hidden; /* 隐藏超出部分 */
				text-overflow: ellipsis; /* 显示省略号 */
			}
		}
	}
}
</style>
