<template>
	<div ref="draggable" class="draggable" :style="{ position: 'fixed', left: `${position.x}px`, top: `${position.y}px` }" @touchstart="onTouchStart">
		<div class="parent">
			<div class="child curp">
				<div class="curp">
					<img class="close" src="./image/redbagRainCountdownClose.png" alt="" @click="closeRedbagRainCountdown" />
				</div>
				<img class="CountdownImg" src="./image/redbagRainCountdown.png" alt="" @click="handleClickCountdown" />
				<div class="countdown" @click="handleClickCountdown">
					<p>倒计时</p>
					<p>{{ countdown }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import pubsub from "../../pubSub/pubSub";
import { useCountdown } from "../../hooks/countdown";
import { activityApi } from "/@/api/activity";

import router from "/@/router";
const { countdown } = useCountdown();
const draggable = ref<HTMLElement | null>(null);
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const clickDisabled = ref(false);
let startMousePosition = ref({ x: 0, y: 0 });
let startTouchPosition = ref({ x: 0, y: 0 });

pubsub.subscribe("/activity/redBagRain", (data) => {
	console.log("Received:", data);
});
const handleClickCountdown = async () => {
	console.log(123123);

	await activityApi.getRedBagInfo().then((res) => {
		router.push("/activity/RED_BAG_RAIN");
	});
};

const closeRedbagRainCountdown = () => {
	// Implement close functionality if needed
};

const onTouchStart = (event: TouchEvent) => {
	const touch = event.touches[0];
	startDrag(touch.clientX, touch.clientY);
	// 添加触摸事件监听
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("touchend", onTouchEnd);
};

const onTouchMove = (event: TouchEvent) => {
	const touch = event.touches[0];
	moveDrag(touch.clientX, touch.clientY);
};

const onTouchEnd = () => {
	endDrag();
	// 移除触摸事件监听
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("touchend", onTouchEnd);
};

const startDrag = (x: number, y: number) => {
	startMousePosition.value = { x, y };

	offset.value = {
		x: x - position.value.x,
		y: y - position.value.y,
	};
};

const moveDrag = (x: number, y: number) => {
	const distanceMoved = Math.sqrt(Math.pow(x - startMousePosition.value.x, 2) + Math.pow(y - startMousePosition.value.y, 2));
	if (distanceMoved > 5) {
		isDragging.value = true;

		position.value.x = Math.max(0, Math.min(window.innerWidth - 90, x - offset.value.x));
		position.value.y = Math.max(60, Math.min(window.innerHeight - 100, y - offset.value.y));
	}
};

const endDrag = () => {
	isDragging.value = false;
};

onMounted(() => {
	position.value.x = 0;
	position.value.y = 500;
	window.addEventListener("resize", updatePosition);
});

const updatePosition = () => {
	const grandParentElement: any = draggable.value?.parentElement?.parentElement;
	const grandParentRect = grandParentElement?.getBoundingClientRect();
	if (grandParentElement) {
		position.value.x = Math.max(grandParentRect.left, Math.min(grandParentRect.right - 100, position.value.x));
		position.value.y = Math.max(64, Math.min(window.innerHeight - 100, position.value.y));
	}
};

onBeforeUnmount(() => {
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("touchend", onTouchEnd);
});
</script>

<style lang="scss">
.draggable {
	cursor: grab;
	user-select: none;

	position: absolute;
	z-index: 1000;
}
.parent {
	cursor: move;
	z-index: 500;
	transition: all 0.2s ease;
	cursor: grab;
	.child {
		text-align: right;
		position: relative;
		animation: shake 3s ease infinite;
		.countdown {
			position: absolute;
			bottom: 5px;
			left: 50%;
			transform: translateX(-50%);

			text-align: center;
			font-size: 20px;
			@include themeify {
				color: #ffffff;
			}
		}
		.close {
			width: 22px;
			height: 22px;
			margin-left: auto;
		}
		.CountdownImg {
			width: 152px;
			height: 130px;
		}
	}
	@keyframes shake {
		0% {
			transform: translateX(0) rotate(0deg);
		}
		5% {
			transform: translateX(-10px) rotate(-5deg);
		}
		10% {
			transform: translateX(10px) rotate(5deg);
		}
		15% {
			transform: translateX(-10px) rotate(-5deg);
		}
		20% {
			transform: translateX(10px) rotate(5deg);
		}
		25% {
			transform: translateX(0) rotate(0deg);
		}
		100% {
			transform: translateX(0) rotate(0deg);
		}
	}
}
</style>
