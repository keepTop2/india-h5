<template>
	<div ref="draggable" class="draggable" :style="{ position: 'fixed', left: `${position.x}px`, top: `${position.y}px` }" @touchstart="onTouchStart" v-if="modelValue">
		<div class="parent">
			<div class="child curp">
				<div class="curp">
					<img class="close" src="./image/redbagRainCountdownClose.png" alt="" @click="closeRedbagRainCountdown" />
				</div>
				<img class="CountdownImg" src="./image/redbagRainCountdown.png" alt="" @click="handleClickCountdown" />
				<div class="countdown" @click="handleClickCountdown">
					<p v-if="countdown > 0">倒计时</p>
					<p>{{ countdown > 0 ? Common.convertMilliseconds(countdown * 1000) : "进行中" }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useCountdown } from "../../hooks/countdown";
import router from "/@/router";
import Common from "/@/utils/common";
import pubsub from "/@/pubSub/pubSub";
const { countdown, startCountdown, stopCountdown } = useCountdown();
const draggable = ref<HTMLElement | null>(null);
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
let startMousePosition = ref({ x: 0, y: 0 });
const props = defineProps({
	modelValue: Boolean,
	redBagInfo: {} as any,
});
const emit = defineEmits(["update:modelValue"]);
const confirmDialog = () => {};
// 点击红包进入详情页
const handleClickCountdown = async () => {
	router.push("/activity/RED_BAG_RAIN");
};
// 关闭倒计时
const closeRedbagRainCountdown = () => {
	emit("update:modelValue", false);
};

// 拖动功能
const onTouchStart = (event: TouchEvent) => {
	const touch = event.touches[0];
	startDrag(touch.clientX, touch.clientY);
	// 添加触摸事件监听
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("touchend", onTouchEnd);
};
// 拖动功能
const onTouchMove = (event: TouchEvent) => {
	const touch = event.touches[0];
	moveDrag(touch.clientX, touch.clientY);
};
// 拖动功能
const onTouchEnd = () => {
	endDrag();
	// 移除触摸事件监听
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("touchend", onTouchEnd);
};
// 拖动功能
const startDrag = (x: number, y: number) => {
	startMousePosition.value = { x, y };
	offset.value = {
		x: x - position.value.x,
		y: y - position.value.y,
	};
};
// 拖动功能
const moveDrag = (x: number, y: number) => {
	const distanceMoved = Math.sqrt(Math.pow(x - startMousePosition.value.x, 2) + Math.pow(y - startMousePosition.value.y, 2));
	if (distanceMoved > 5) {
		isDragging.value = true;

		position.value.x = Math.max(0, Math.min(window.innerWidth - 90, x - offset.value.x));
		position.value.y = Math.max(60, Math.min(window.innerHeight - 100, y - offset.value.y));
	}
};
// 拖动功能
const endDrag = () => {
	isDragging.value = false;
};
// 更新位置
const updatePosition = () => {
	const grandParentElement: any = draggable.value?.parentElement?.parentElement;
	const grandParentRect = grandParentElement?.getBoundingClientRect();
	if (grandParentElement) {
		position.value.x = Math.max(grandParentRect.left, Math.min(grandParentRect.right - 100, position.value.x));
		position.value.y = Math.max(64, Math.min(window.innerHeight - 100, position.value.y));
	}
};
watch(
	() => countdown.value,
	() => {
		if (countdown.value == 0) {
			stopCountdown();
		}
		if (countdown.value == 3) {
			pubsub.publish("ShowRedBagRain", true);
		}
	}
);
watch(
	() => props.redBagInfo,
	() => {
		if (props.redBagInfo?.advanceTime) {
			startCountdown(props.redBagInfo.advanceTime);
		}
	},
	{ once: true }
);
// 初始化，设置定位
onMounted(() => {
	position.value.x = 0;
	position.value.y = 500;
	window.addEventListener("resize", updatePosition);
	pubsub.subscribe("/activity/redBagRain/settlement", () => {
		emit("update:modelValue", true);
	});
});

// 卸载事件
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
