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
import dayjs from "dayjs";
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";

onMounted(() => {
	// 获取当前时间戳（毫秒）
	const currentTimestamp = dayjs().valueOf();

	// 获取24小时前的时间戳（毫秒）
	const timestamp24HoursAgo = dayjs().subtract(24, "hour").valueOf();
});

const dateRangeSelectDemoState = reactive({
	timeShortcutOptionsValue: TimeShortcutOptionsEnum.d2,
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
