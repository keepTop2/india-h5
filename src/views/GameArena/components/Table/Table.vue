<template>
	<div class="table">
		<div v-for="(item, i) in columns" :key="i" class="table">
			<div class="table-item">
				<div class="table-top">{{ item.label }}</div>
				<div v-for="(op, index) in tableData" :key="index" :style="op.color && `color:${op.color}`" class="table-line">
					<!-- 使用插槽来渲染自定义单元格内容 -->
					<slot :name="`cell-${item.field}`" :data="op">
						<!-- 默认内容为当前单元格的数据 -->
						{{ op[item.field] }}
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { i18n } from "/@/i18n/index";
const $: any = i18n.global;

// 定义列类型
interface Column {
	label: string;
	id: number;
	prop: string;
}

// 定义数据类型
interface TableData {
	date: string;
	name: string;
	address: string;
}

// 使用 as() 关键字为 props 定义类型和默认值
const props = defineProps({
	columns: {
		type: Array as () => Array<Column>,
		required: true,
		default: () => [
			{ field: "name", label: "游戏" },
			{ field: "player", label: "玩家" },
			{ field: "multiple", label: "倍数" },
			{ field: "Profit", label: "盈利" },
		],
	},
	tableData: {
		type: Array as () => Array<TableData>,
		default: () => [
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
	},
});
</script>

<style lang="scss" scoped>
@import "./table.scss";
</style>
