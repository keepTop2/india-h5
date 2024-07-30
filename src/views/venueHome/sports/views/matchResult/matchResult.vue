<template>
	<div class="content">
		<DateSelector v-model="activeDate" :daysNumber="7" :other="false" :direction="false" />
		<div class="list-content">
			<VirtualScrollVirtualList ref="VirtualScrollVirtualListRef" v-if="eventResultData.length" :list-data="eventResultData" :item-max-size="170" :item-min-size="20" :is-expand="true">
				<template #default="{ item, index, isExpand }">
					<Card v-if="item.events.length" :data="item" :isExpand="isExpand" :dataIndex="index" @toggleDisplay="toggleDisplay" />
				</template>
			</VirtualScrollVirtualList>

			<NoData v-else />
		</div>
	</div>
</template>
<script setup lang="ts">
import common from ".././@/views/venueHome/sports/utils/common";
import sportsApi from "/@/api/venueHome/sports";
// import DateSelector from "../../components/DateSelector/DateSelector.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo";
import { VirtualScrollVirtualList, Card } from "./components/index";
import { formatDateToTimeStamp } from "/@/webWorker/module/utils/formattingChildrenViewData";
import NoData from "/@/views/Sports/components/noData/noData.vue";
import { defineAsyncComponent } from "vue";
// const NoData = defineAsyncComponent(() => import("/@/views/Sports/components/noData/noData.vue"));
const DateSelector = defineAsyncComponent(() => import("/@/views/Sports/components/DateSelector/DateSelector.vue"));
const route = useRoute();
const eventResultData = ref([]);
const activeDate = ref(common.todayDate());
const VirtualScrollVirtualListRef = ref();
const sportsInfoStore = useSportsInfoStore();

function preprocessData(items) {
	items.forEach((item) => {
		if (item.events.length) {
			item.events?.forEach((event) => {
				event.timestamp = formatDateToTimeStamp(event.eventTime);
			});
			item.events?.sort((a, b) => b.timestamp - a.timestamp);
		}
	});
	return items;
}

const getEventResultsData = async () => {
	const dateRange = common.getResultDateRange(activeDate.value);
	/**
	 * @description 获取赛果
	 */
	if (!route.params.sportType) return;
	const res = await sportsApi
		.GetEventResults({
			language: "zhcn",
			from: dateRange.startDate, //按日期查询赛果数据
			until: dateRange.endDate,
			query: `$filter=sportType eq ${route.params.sportType} and gameStatus eq 'completed'`,
		})
		.catch((err) => err);
	if (res.data) {
		eventResultData.value = preprocessData(res.data.result);
	}
};

watch(
	() => activeDate.value,
	(newVal) => {
		eventResultData.value = [];
	}
);

onMounted(() => {
	/**
	 * @description 获取运动的赛果数据
	 */
	if (sportsInfoStore.getSportsToken && route.params.sportType && route.params.sportType != "undefined") {
		getEventResultsData();
	}
});
watch([() => route.params.sportType, () => activeDate.value, () => sportsInfoStore.getSportsToken], (newToken, oldToken) => {
	/**
	 * @description 获取运动的赛果数据
	 */
	if (route.params.sportType && route.params.sportType != "undefined") {
		getEventResultsData();
	}
});

watch(
	() => route.params.sportType,
	() => {
		VirtualScrollVirtualListRef.value?.setScollTop(0);
	}
);
const toggleDisplay = (val?: number) => {
	VirtualScrollVirtualListRef.value.setlistDataEisExpand(val);
};
</script>

<style lang="scss" scoped>
.flex_space_between {
	display: flex;
	justify-content: space-between;
}
.time {
	text-align: center;
	height: 60px;
	line-height: 60px;
}
.leagueList {
	@include themeify {
		.price {
			color: themed("TB");
		}
		.rise {
			color: themed("Warn-P");
		}
		.descend {
			color: themed("Theme-P");
		}
	}
}

.list-content {
	height: calc(100vh - 595px);
}
</style>
