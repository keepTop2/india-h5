<template>
	<div class="card-item">
		<div class="tournament-header" @click="toggleDisplay">
			<div class="tournament-info">
				<div class="tournament-name">{{ data.leagueName }}</div>
			</div>
			<SvgIcon :class="{ sport_arrow: !displayContent }" iconName="/venueHome/sports/svg/sport_arrow" size="5.333333" />
		</div>
		<ul class="bg_Bg3 leagueList" v-if="displayContent">
			<li class="color_T1 fs_20" v-for="(item, index) in data.events" :key="index">
				<eventItem :data="item" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import eventItem from "./eventItem.vue";
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
	dataIndex: 0,
	data: () => {
		return {};
	},
});

const emit = defineEmits(["oddsChange", "toggleDisplay"]);
const displayContent = ref(true);

watch(
	() => props.isExpand,
	(newValue, oldValue) => {
		displayContent.value = newValue;
	},
	{
		immediate: true,
	}
);

const toggleDisplay = () => {
	displayContent.value = !displayContent.value;
	const params = {
		index: props.dataIndex,
		isExpand: displayContent.value,
	};
	emit("toggleDisplay", params);
};
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

	.sport_arrow {
		transform: rotate(-180deg);
	}
}
</style>
