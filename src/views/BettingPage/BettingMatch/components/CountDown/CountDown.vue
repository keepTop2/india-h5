<template>
	<div class="countdown color_T2">
		<div class="card">
			<p>H</p>
			{{ hours }}
		</div>
		<span class="">:</span>
		<div class="card">
			<p>M</p>
			{{ minutes }}
		</div>
		<span class="">:</span>
		<div class="card">
			<p>S</p>
			{{ seconds }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineEmits, PropType } from "vue";

const props = defineProps({
	defaultTime: {
		type: Number as PropType<number>,
		default: 3600, // 默认为 1 小时
	},
});

const emit = defineEmits(["countdownFinished"]);

// 使用 ref 来保存倒计时剩余的总秒数
const totalSeconds = ref(props.defaultTime);

// 用于存储定时器的标识符
let intervalId: number | null = null;

// 计算小时、分钟和秒
const hours = computed(() => String(Math.floor(totalSeconds.value / 3600)).padStart(2, "0"));
const minutes = computed(() => String(Math.floor((totalSeconds.value % 3600) / 60)).padStart(2, "0"));
const seconds = computed(() => String(totalSeconds.value % 60).padStart(2, "0"));

// 开始倒计时
const startCountdown = () => {
	intervalId = window.setInterval(() => {
		if (totalSeconds.value > 0) {
			totalSeconds.value -= 1;
		} else {
			// 倒计时结束后清除定时器
			clearInterval(intervalId as number);
			intervalId = null;
			emit("countdownFinished");
		}
	}, 1000);
};

// 停止倒计时
const stopCountdown = () => {
	if (intervalId !== null) {
		clearInterval(intervalId);
		intervalId = null;
	}
};

// 重置倒计时
const resetCountdown = (newTime?: number) => {
	totalSeconds.value = newTime !== undefined ? newTime : props.defaultTime;
	stopCountdown();
	startCountdown();
};

// 在组件挂载时开始倒计时
onMounted(() => {
	startCountdown();
});

// 在组件卸载前清除定时器
onUnmounted(() => {
	stopCountdown();
});
</script>

<style scoped lang="scss">
@font-face {
	font-family: "MyFont";
	src: url("./DS.ttf") format("truetype");
	/* 可以添加其他字体格式，如 woff2、ttf、otf 等 */
}
/* 样式设置 */
.countdown {
	display: flex;
	gap: 6px;
	justify-content: space-between;
	align-items: center;
	border-radius: 20px;
	span {
		@include themeify {
			color: themed("TB");
		}
	}
}
.card {
	width: 72px;
	height: 72px;
	background-color: #eaecf2;
	border: 1px solid #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	font-weight: bold;
	flex-direction: column;
	font-family: "MyFont", sans-serif;
	border-radius: 10px;
	font-size: 40px;
	p {
		font-size: 24px;
		margin: 0;
		padding: 0;
	}
}
</style>
