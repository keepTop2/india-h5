<!-- 最近投注 列表 -->
<template>
	<div class="BetLatest">
		<VantNavBar title="最近投注" @onClickLeft="onClickLeft" />
		<div class="content bg_BG2 p_20 m_20">
			<Table :tableData="defaultProps.data" :height="68" :columns="defaultProps.columns">
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
import Table from "/@/components/Table/Table.vue";
import { RouteRecordRaw, useRouter } from "vue-router";
const router = useRouter();
/**
 * 投注比赛
 */
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
};
const onClickLeft = () => {
	router.push({ path: "/frontPage/home" });
};
</script>

<style lang="scss">
.BetLatest {
	height: 100vh;
	@include themeify {
		background: themed("BG1");
	}
	.content {
		padding: 24px;
	}
}
</style>
