<template>
	<div class="bettingMatches">
		<span class="more" @click="handleCHangeHistory">{{ $t('home["查看更多"]') }} <SvgIcon iconName="common/arrowRight" /></span>
		<Tabs class="" bg="bg_BG2" v-model="tabsActiveKey" @change="handleTabChange" :list="tabList" />
		<div class="bg_BG2 p_20">
			<!-- Betting content based on tabsActiveKey -->
			<Table :tableData="defaultProps.data" :height="68" :columns="defaultProps.columns">
				<!-- <template #cell-name="{ data }">
					<span style="color: red">{{ data.name }}</span>
				</template> -->
				<template #cell-Profit="{ data }">
					<span style="color: #ff0000">{{ data.Profit }}</span>
					<!-- #3bc116 -->
				</template>
			</Table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import Table from "/@/components/Table/Table.vue";
import Tabs from "../../../components/Tabs/Tabs.vue";
import { useRouter } from "vue-router";
const router = useRouter();
/**
 * 投注比赛
 */
const tabsActiveKey = ref(0);

const handleTabChange = (val: number) => {
	// tabsActiveKey.value = val;
	console.log(val, "====handleClick");
	if (val == 2) {
		router.push({
			path: "/bettingMatch",
		});
		tabsActiveKey.value = 0;
	}
};
const handleCHangeHistory = () => {
	switch (tabsActiveKey.value) {
		case 0:
			router.push({
				path: "/betLatest",
			});
			break;
		case 1:
			router.push({
				path: "/betBig",
			});
			break;
		case 2:
			break;

		default:
			break;
	}
};
const tabList = [
	{
		name: "最近投注",
		value: 0,
	},
	{
		name: "大额投注",
		value: 1,
	},
	{
		name: "投注比赛",
		value: 2,
	},
];
const defaultProps = {
	// 表格数据
	data: [
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
	],

	// 列定义
	columns: [
		{ field: "name", label: "游戏" },
		{ field: "player", label: "玩家" },
		{ field: "multiple", label: "倍数" },
		{ field: "Profit", label: "盈利" },
	],

	// 排序字段（初始为空表示无排序）
	sortField: null,

	// 排序顺序（'asc' 为升序，'desc' 为降序）
	sortOrder: null,
};
</script>

<style lang="scss">
@import "./bettingMatches.scss";
</style>
