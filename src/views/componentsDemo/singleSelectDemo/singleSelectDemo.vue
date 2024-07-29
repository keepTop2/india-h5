<!-- 单项选择器使用示例demo -->
<template>
	<div>
		<!--不使用插槽-->
		<SingleSelect :toText="'webName'" :toValue="'javaName'" v-model:show="state.showPicker" v-model:select="state.activeList" :columns="state.typeList" :title="''" @confirm="onTypeConfrim" />

		<div style="margin-top: 50px"></div>
		<!--使用插槽-->
		<SingleSelect :toText="'webName'" :toValue="'javaName'" v-model:show="state.showPicker2" v-model:select="state.activeList2" :columns="state.typeList2" :title="''" @confirm="onTypeConfrim">
			<!--外部触发插槽-->
			<template #select_conatiner>
				<div>daskldjasldjasldh</div>
			</template>
			<!--自定义内容插槽-->
			<template #option="item">
				<div>aaa{{ item.item.value }}</div>
			</template>
		</SingleSelect>
	</div>
</template>

<script setup lang="ts">
const state = reactive({
	showPicker: false,
	//条件查询选项
	typeList: [
		{
			javaName: "1",
			webName: "存款金额",
		},
		{
			javaName: "2",
			webName: "提款金额",
		},
		{
			javaName: "3",
			webName: "总输赢",
		},
		{
			javaName: "4",
			webName: "总输赢4",
		},
		{
			javaName: "5",
			webName: "总输赢5",
		},
	],
	//激活的选项
	activeList: "3",
	showPicker2: false,
	//条件查询选项
	typeList2: [
		{
			javaName: "1",
			webName: "存款金额",
		},
		{
			javaName: "2",
			webName: "提款金额",
		},
		{
			javaName: "3",
			webName: "总输赢",
		},
		{
			javaName: "4",
			webName: "总输赢4",
		},
		{
			javaName: "5",
			webName: "总输赢5",
		},
	],
	//激活的选项
	activeList2: "3",
});

const onTypeConfrim = (data) => {
	console.log(data);
};
</script>

<style lang="scss" scoped></style>
