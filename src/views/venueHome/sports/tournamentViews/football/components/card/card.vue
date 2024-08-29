<template>
	<div class="card-item">
		<div class="tournament-header" @click="toggleDisplay">
			<div class="tournament-info">
				<div class="tournament-icon">
					<img :src="data.leagueIconUrl" alt="" />
				</div>
				<div class="tournament-name">{{ data.leagueName }}</div>
			</div>
			<SvgIcon class="arrow" :class="{ sport_arrow: !displayContent }" iconName="/venueHome/sports/svg/sport_arrow" />
		</div>
		<template v-if="displayContent">
			<eventItem v-for="(event, index) in data.events" :key="index" :event="event" :sportType="props.sportType" />
		</template>
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
	/** 球类类型 */
	sportType: string;
}
const props = withDefaults(defineProps<teamDataType>(), {
	isExpand: true,
	dataIndex: 0,
	data: () => {
		return {};
	},
	sportType: "",
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
@import "/@/views/venueHome/sports/common.scss";
</style>
