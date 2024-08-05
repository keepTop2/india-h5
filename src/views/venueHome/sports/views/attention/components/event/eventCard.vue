<template>
	<div class="card-item">
		<div class="tournament-header" @click="toggleDisplay">
			<div class="tournament-info">
				<div class="tournament-icon">
					<img :src="data.leagueIconUrl" alt="" />
				</div>
				<div class="tournament-name">{{ data.leagueName }}</div>
			</div>
			<SvgIcon :class="{ sport_arrow: !displayContent }" iconName="/venueHome/sports/svg/sport_arrow" size="5.333333" />
		</div>
		<template v-if="displayContent">
			<component v-for="(event, index) in data.events" :key="index" :is="sportsMap[event.sportType]" :event="event" :sportType="event.sportType" />
		</template>
	</div>
</template>

<script setup lang="ts">
// import eventItem from "./eventItem.vue";

// 足球列表
import Football from "/@/views/venueHome/sports/tournamentViews/football/components/card/eventItem.vue";
// 篮球列表
import Basketball from "/@/views/venueHome/sports/tournamentViews/basketball/components/card/eventItem.vue";
// 美式足球列表
import AmericanSoccer from "/@/views/venueHome/sports/tournamentViews/americanSoccer/components/card/eventItem.vue";
// 冰上曲棍球列表
import IceHockey from "/@/views/venueHome/sports/tournamentViews/iceHockey/components/card/eventItem.vue";
// 网球列表
import Tennis from "/@/views/venueHome/sports/tournamentViews/tennis/components/card/eventItem.vue";
// 排球列表
import Volleyball from "/@/views/venueHome/sports/tournamentViews/volleyball/components/card/eventItem.vue";
// 斯诺克/台球列表
import Billiards from "/@/views/venueHome/sports/tournamentViews/billiards/components/card/eventItem.vue";
// 棒球列表
import Baseball from "/@/views/venueHome/sports/tournamentViews/baseball/components/card/eventItem.vue";
// 羽毛球列表
import Badminton from "/@/views/venueHome/sports/tournamentViews/badminton/components/card/eventItem.vue";
// 电子竞技列表
import ESports from "/@/views/venueHome/sports/tournamentViews/eSports/components/card/eventItem.vue";

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

const sportsMap = {
	1: Football,
	2: Basketball,
	3: AmericanSoccer,
	4: IceHockey,
	5: Tennis,
	6: Volleyball,
	7: Billiards,
	8: Baseball,
	9: Badminton,
	43: ESports,
};

// console.log("props", props.data);

const emit = defineEmits(["oddsChange", "toggleDisplay"]);
const displayContent = ref(true);

const toggleDisplay = () => {
	displayContent.value = !displayContent.value;
	const params = {
		index: props.dataIndex,
		isExpand: displayContent.value,
	};
	emit("toggleDisplay", params);
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
		box-shadow: 0px 1px 4px 0px themed("--JBS-CARD--shadow");
	}
	box-sizing: border-box;

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
</style>
