<template>
	<div>
		<DateRangeSelect
			v-model:select="dateRangeSelectDemoState.timeShortcutOptionsValue"
			v-model:start-time-u="dateRangeSelectDemoState.startTime"
			v-model:end-time-u="dateRangeSelectDemoState.endTime"
			@on-confirm-date="onConfirmDate"
		/>
	</div>
</template>

<script setup lang="ts">
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";

const dateRangeSelectDemoState = reactive({
	timeShortcutOptionsValue: TimeShortcutOptionsEnum.d1,
	startTime: 0,
	endTime: 0,
});

onMounted(() => {
	console.log("外部MOunted", dateRangeSelectDemoState.startTime, dateRangeSelectDemoState.endTime);
});

//日期时间选择器组件点击确认
const onConfirmDate = () => {
	console.log(dateRangeSelectDemoState.startTime, dateRangeSelectDemoState.endTime, "点击确认");
};
</script>

<style lang="scss" scoped></style>
