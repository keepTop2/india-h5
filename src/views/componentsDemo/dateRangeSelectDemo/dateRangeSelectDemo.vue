<template>
	<div>
		<DateRangeSelect v-model:select="dateRangeSelectDemoState.timeShortcutOptionsValue" />
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

	console.log(currentTimestamp, "-----------------");
	console.log(timestamp24HoursAgo, "++++++++++++++");
});

const dateRangeSelectDemoState = reactive({
	timeShortcutOptionsValue: TimeShortcutOptionsEnum.d1,
});
</script>

<style lang="scss" scoped></style>
