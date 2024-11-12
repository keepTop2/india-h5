<template>
	<div>{{ formattedTime }}</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// 定义传入的倒计时时间（单位：秒）
const props = defineProps<{
	endTime: Date; // 目标结束时间，比如 "2024-10-25 00:00:00"
}>();

const formattedTime = ref("");

// 定义定时器的 ID
let intervalId: any | null = null;

// 格式化倒计时为 X天HH:mm:ss
const formatTime = (remainingTime: number) => {
	const durationObj = dayjs.duration(remainingTime, "seconds");
	const days = Math.floor(durationObj.asDays()); // 计算剩余的天数
	const hours = durationObj.hours().toString().padStart(2, "0");
	const minutes = durationObj.minutes().toString().padStart(2, "0");
	const seconds = durationObj.seconds().toString().padStart(2, "0");

	return `${days}天${hours}:${minutes}:${seconds}`;
};

// 开始倒计时
const startCountdown = () => {
	const endTime = dayjs(props.endTime);

	intervalId = setInterval(() => {
		const now = dayjs();
		const remainingTime = endTime.diff(now, "second"); // 剩余时间（秒）

		if (remainingTime <= 0) {
			formattedTime.value = "0天00:00:00"; // 倒计时结束
			clearInterval(intervalId!); // 清除定时器
			intervalId = null; // 重置 intervalId
		} else {
			formattedTime.value = formatTime(remainingTime);
		}
	}, 1000);
};

// 清除定时器函数
const clearCountdown = () => {
	if (intervalId !== null) {
		clearInterval(intervalId);
		intervalId = null;
	}
};

// 生命周期钩子
onMounted(() => {
	startCountdown();
});

onBeforeUnmount(() => {
	clearCountdown(); // 清除组件销毁时的定时器
});
</script>

<style scoped>
/* 根据需要自定义样式 */
</style>
