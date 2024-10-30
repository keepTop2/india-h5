<template>
	<div class="canvas-container">
		<div class="getReadyCountdown fade-in">
			<div><img src="./image/getReadyCountdownText.png" alt="" /></div>
			<div class="getReadyCountdownNumber" :class="getReadyCountdown == 0 ? 'animate' : ''">
				<img src="./image/getReadyCountdownBg.png" alt="" />
				<div class="getReadyCountdownNumber">
					<img src="./image/getReadyCountdown3.png" alt="" v-if="getReadyCountdown == 3" />
					<img src="./image/getReadyCountdown2.png" alt="" v-if="getReadyCountdown == 2" />
					<img src="./image/getReadyCountdown1.png" alt="" v-if="getReadyCountdown == 1" />
					<img src="./image/getReadyCountdown0.png" alt="" v-if="getReadyCountdown == 0" @click="startRedbagRain" />
				</div>
			</div>
			<div>
				<img src="./image/close2.png" alt="" class="close2" @click="confirmDialog" />
			</div>
		</div>
	</div>
	<RED_BAG_RAIN_Dialog v-model="shwoDialog" title="温馨提示" :confirm="confirmDialog" class="redBagRainResult">
		<div class="mt_20 mb_20">
			{{ dialogInfo.message }}
		</div>
	</RED_BAG_RAIN_Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import redBagImg from "./image/redbag.png";
import openRedBagImg from "./image/opened_redbag.png";
import { activityApi } from "/@/api/activity";
import { useActivityStore } from "/@/store/modules/activity";
import { useLoading } from "/@/directives/loading/hooks";
import { redbagRainSingleton } from "/@/hooks/useRedbagRain";
import RED_BAG_RAIN_Dialog from "./RED_BAG_RAIN_Dialog/index.vue";
import router from "/@/router";
const { startLoading, stopLoading } = useLoading();
const props = defineProps({
	modelValue: Boolean,
	redBagInfo: {} as any,
});
const activityStore = useActivityStore();
const emit = defineEmits(["update:modelValue"]);

const shwoDialog = ref(false);
const getReadyCountdown = ref(3);
const dialogInfo: any = ref({});
// 创建红包图片对象
const activityData: any = computed(() => activityStore.getActivityData);
const img = new Image();
img.src = redBagImg;
const openedImg = new Image();
openedImg.src = openRedBagImg;

const initReadyTime = () => {
	const timer = setInterval(() => {
		if (getReadyCountdown.value == 0) {
			clearInterval(timer);
		} else {
			getReadyCountdown.value = getReadyCountdown.value - 1;
		}
	}, 1000);
};

const startRedbagRain = () => {
	startLoading();
	activityApi
		.redBagParticipate({ redbagSessionId: activityData.value.redbagSessionId })
		.then((res: any) => {
			if (res.data?.status === 10000) {
				dialogInfo.value = res.data;
				shwoDialog.value = true;
			} else {
				redbagRainSingleton.hideCountdown();
				redbagRainSingleton.showRedbagRain();
			}
		})
		.finally(() => {
			stopLoading();
		});
};

const confirmDialog = () => {
	redbagRainSingleton.hideCountdown();
};
// 生命周期管理
onMounted(async () => {
	initReadyTime();
});
</script>

<style scoped lang="scss">
.canvas-container {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	height: 100vh;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.5);
	.getReadyCountdown {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		img {
			width: 500px;
			cursor: pointer;
		}

		.getReadyCountdownNumber {
			position: relative;
			img {
				width: 324px;
			}
			> div {
				position: absolute;
				left: 168px;
				top: 160px;
				transform: translate(-50%, -50%);
				img {
					width: auto;
					height: 120px;
				}
			}
		}
		.animate {
			animation: shake 1s ease infinite;
		}
		.close2 {
			width: 72px;
			margin-top: 40px;
		}
	}
	.redbag-rain-wrapper {
		width: 100%;
		height: 100vh;
		position: relative;

		.redayGo {
			text-align: center;
			display: flex;
			height: 100vh;
			align-items: center;
			justify-content: center;
		}
		.redbag-rain-canvas {
			width: 100vw;
			height: 100vh;
			background: url("./image/redBagBg.png") no-repeat center;
			background-size: 100% 100%;
			cursor: pointer;
			> div {
				width: 100%;
				margin: 0 auto;
				position: relative;
			}
		}
	}
}

.exit-button {
	position: absolute;
	top: 20px; /* 距离顶部的距离 */
	right: 20px; /* 距离右侧的距离 */
	border: none; /* 去掉边框 */
	border-radius: 5px; /* 圆角 */
	cursor: pointer; /* 鼠标悬停变为指针 */
	background: transparent;
	img {
		width: 54px;
		height: 54px;
	}
}

@keyframes shake {
	0% {
		transform: translateX(0) rotate(0deg);
	} /* 初始位置 */
	10% {
		transform: translateX(-10px) rotate(-5deg);
	} /* 向左移动并倾斜 */
	20% {
		transform: translateX(10px) rotate(5deg);
	} /* 向右移动并倾斜 */
	30% {
		transform: translateX(-10px) rotate(-5deg);
	} /* 向左移动并倾斜 */
	40% {
		transform: translateX(10px) rotate(5deg);
	} /* 向右移动并倾斜 */
	50% {
		transform: translateX(0) rotate(0deg);
	} /* 回到原位，结束摇晃 */
	100% {
		transform: translateX(0) rotate(0deg);
	}
}

.redBagRainResult {
	.result {
		height: 46px;
		line-height: 46px;
		background-color: rgba(255, 40, 75, 0.2);

		border-radius: 5px;
		@include themeify {
			color: themed("Theme");
		}
	}
	img {
		height: 160px;
		width: 160px;
	}
}
</style>
