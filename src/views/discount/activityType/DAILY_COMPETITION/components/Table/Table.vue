<template>
	<div class="table">
		<div v-for="(item, i) in columns" :key="i" class="table">
			<div class="table-item">
				<div class="table-top">{{ item.label }}</div>

				<div v-for="(line, index) in tableData" :key="index" class="table-line">
					<!-- 使用插槽来渲染自定义单元格内容 -->
					<slot :name="`cell-${item.field}`" :data="line" :index="index">
						<!-- 默认内容为当前单元格的数据 -->
						{{ line[item.field] }}
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
// 定义列类型
interface Column {
	field: any;
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

/**
 * @description 定义组件的props
 * @param columns 表格列配置数组
 * @param tableData 表格数据数组
 */
const props = defineProps({
	columns: {
		type: Array as () => Array<any>,
		required: true,
	},
	tableData: {
		type: Array as () => Array<TableData>,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
@import "./table.scss";
</style>
