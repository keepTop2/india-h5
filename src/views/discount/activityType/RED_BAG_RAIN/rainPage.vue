<template>
	<div class="canvas-container" v-if="modelValue">
		<div class="getReadyCountdown fade-in" v-if="setp == 0">
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
		<div class="redbag-rain-wrapper" v-show="setp == 1 || setp == 2">
			<div class="redbag-rain-canvas">
				<div v-if="setp == 1" class="redayGo">
					<img src="./image/readyGo.png" alt="" />
				</div>
				<div v-show="setp == 2">
					<canvas ref="canvas"></canvas>
					<button class="exit-button" @click="exitGame">
						<img src="./image/close.png" alt="" />
					</button>
				</div>
			</div>
		</div>
		<!-- 结算弹窗 -->
		<RED_BAG_RAIN_Dialog v-model="showRedBagRainResult" :title="dialogTitle" :confirm="confirmDialog" class="redBagRainResult">
			<div v-if="settlement.redbagCount > 0">
				<div class="Text2">本轮共抢到{{ settlement.redbagCount }}个红包</div>
				<div class="result mt_20">共计 {{ settlement.amount }}{{ useUserStore().getUserInfo.platCurrencyName }}</div>
			</div>
			<div v-if="settlement.redbagCount < 1">
				<div class="mt_20 mb_20">没有戳中有奖红包</div>
				<div class="flex-center">
					<img src="./image/pityIcon.png" alt="" />
				</div>
			</div>
		</RED_BAG_RAIN_Dialog>

		<RED_BAG_RAIN_Dialog v-model="shwoDialog" title="温馨提示" :confirm="confirmDialog" class="redBagRainResult">
			<div class="mt_20 mb_20">
				{{ dialogInfo.message }}
			</div>
			<template v-slot:footer v-if="[30045, 30053].includes(dialogInfo.status)"> 去绑定 </template>
			<!-- <div class="Text3">您领取的红包太多啦，请下一场次再参与</div>
			<img src="./image/pityIcon.png" alt="" /> -->
		</RED_BAG_RAIN_Dialog>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import redBagImg from "./image/redbag.png";
import openRedBagImg from "./image/opened_redbag.png";
import { useCountdown } from "/@/hooks/countdown";
import activitySocketService from "/@/utils/activitySocketService";
import pubsub from "/@/pubSub/pubSub";
import { activityApi } from "/@/api/activity";
import readyGo from "./image/readyGo.png";
import RED_BAG_RAIN_Dialog from "./RED_BAG_RAIN_Dialog/index.vue";
import { useActivityStore } from "/@/store/modules/activity";
import { useUserStore } from "/@/store/modules/user";
import { useLoading } from "/@/directives/loading/hooks";
import router from "/@/router";
const { startLoading, stopLoading } = useLoading();
const props = defineProps({
	modelValue: Boolean,
	redBagInfo: {} as any,
});

const activityStore = useActivityStore();
const activitySocket = activitySocketService.getInstance();
const { countdown, startCountdown } = useCountdown();
const canvas = ref<HTMLCanvasElement | null>(null);
const emit = defineEmits(["update:modelValue"]);

const isPaused = ref(false);
const setp: any = ref(null);
const showRedBagRainResult = ref(false);
const shwoDialog = ref(false);
const getReadyCountdown = ref(3);
const dialogTitle = ref("温馨提示");
const dialogInfo: any = ref({});
const settlement: any = ref({});
let ctx: CanvasRenderingContext2D | null = null;
let redBagInterval: ReturnType<typeof setInterval> | null = null;
// 创建红包图片对象
const activityData: any = computed(() => activityStore.getActivityData);
const img = new Image();
img.src = redBagImg;
const openedImg = new Image();
openedImg.src = openRedBagImg;

// 红包对象接口
interface RedBag {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	img: HTMLImageElement;
	openedImg: HTMLImageElement;
	isHovered: boolean;
	isClicked: boolean;
	alpha: number; // 用于透明度
	draw: () => void;
	update: () => void;
	checkHover: (mouseX: number, mouseY: number) => boolean;
}
// 红包类实现
class RedBagImpl implements RedBag {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	img: HTMLImageElement;
	openedImg: HTMLImageElement;
	isHovered: boolean = false;
	isClicked: boolean = false;
	alpha: number = 1;
	constructor(x: number, y: number, width: number, height: number, speed: number, img: HTMLImageElement, openedImg: HTMLImageElement) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.img = img;
		this.openedImg = openedImg;
	}
	draw(): void {
		if (ctx) {
			const drawImg = this.isClicked ? this.openedImg : this.img;
			ctx.globalAlpha = this.alpha;
			ctx.drawImage(drawImg, this.x, this.y, this.width, this.height);
			ctx.globalAlpha = 1; // 重置透明度
		}
	}

	update(): void {
		if (!this.isClicked) {
			this.y += this.speed; // 红包下落
		}

		if (this.isClicked) {
			this.alpha -= 0.02; // 渐变透明度
			if (this.alpha <= 0) {
				this.alpha = 0;
			}
		}

		// 如果红包超出画布范围，则从数组中移除
		if (this.y > canvas.value!.height) {
			this.alpha = 0; // 设置透明度为0
			return; // 直接返回
		}
	}

	checkHover(mouseX: number, mouseY: number): boolean {
		return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
	}
}

// 红包数组
const redBags: RedBag[] = [];

watch(
	() => countdown.value,
	() => {
		if (countdown.value === 2) {
			if (redBagInterval) {
				clearInterval(redBagInterval);
			}
		}
		if (countdown.value === 0) {
			exitGame();
		}
	}
);
// 动画函数
function animate(): void {
	if (ctx && !isPaused.value) {
		ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height); // 清空画布
		drawCountdown(); // 绘制倒计时
		redBags.forEach((redBag, index) => {
			redBag.update();
			redBag.draw();
			// 红包点击后或超出画布边界后移除
			if ((redBag.isClicked && redBag.alpha <= 0) || redBag.y > canvas.value!.height) {
				redBags.splice(index, 1);
			}
		});

		requestAnimationFrame(animate);
	}
}

// 绘制倒计时
function drawCountdown() {
	if (ctx && canvas.value) {
		const countdownText = "倒计时: ";
		const countdownValue = countdown.value.toString();

		// 设置倒计时文本的样式和大小
		ctx.font = "20px Arial"; // 较小的字体
		const textWidth1 = ctx.measureText(countdownText).width; // 计算 "倒计时:" 的宽度

		// 设置倒计时值的样式和大小
		ctx.font = "32px Arial"; // 较大的字体
		const textWidth2 = ctx.measureText(countdownValue).width; // 计算倒计时值的宽度

		// 总文本宽度
		const totalTextWidth = textWidth1 + textWidth2;

		// 计算文本在画布的中心位置
		const centerX = (canvas.value.width - totalTextWidth) / 2;
		const centerY = 76;

		// 清空画布
		ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

		// 绘制 "倒计时:" 文本
		ctx.font = "16px Arial"; // 较小的字体
		ctx.fillStyle = "white"; // 设置字体颜色
		ctx.fillText(countdownText, centerX, centerY);

		// 绘制倒计时值
		ctx.font = "20px Arial"; // 较大的字体
		ctx.fillText(countdownValue, centerX + textWidth1, centerY);
	}
}

// 鼠标点击监听
function handleClick(event: MouseEvent) {
	if (isPaused.value) return;
	// 获取鼠标相对画布的位置
	const rect = canvas.value!.getBoundingClientRect();
	const mouseX = event.clientX - rect.left;
	const mouseY = event.clientY - rect.top;
	let clickedRedBag: RedBag | null = null;
	// 倒序遍历，查找最上面的红包
	for (let i = redBags.length - 1; i >= 0; i--) {
		const redBag = redBags[i];
		if (redBag.checkHover(mouseX, mouseY)) {
			clickedRedBag = redBag; // 记录最上面的红包
			break; // 找到后停止遍历
		}
	}
	// 如果找到被点击的红包，发送请求并标记为已点击
	if (clickedRedBag) {
		activitySocket.send("/activity/redBagRain/grab:" + JSON.stringify({ redbagSessionId: activityData.value.redbagSessionId }));
		clickedRedBag.isClicked = true;
	}
}

// 调整画布大小
const adjustCanvasSize = () => {
	if (canvas.value) {
		canvas.value.width = window.innerWidth; // 设置画布宽度
		canvas.value.height = window.innerHeight; // 设置画布高度
		ctx = canvas.value.getContext("2d");
	}
};

// 添加新红包
function addNewRedBag() {
	const width = 83; // 红包宽度
	const height = 105; // 红包高度
	const x = Math.random() * (canvas.value!.width - width); // 随机生成 X 坐标
	const speed = Math.random() * 3 + 1; // 随机生成速度
	const newRedBag = new RedBagImpl(x, -height, width, height, speed, img, openedImg);
	redBags.push(newRedBag); // 添加红包到数组
}

const initReadyTime = () => {
	setp.value = 0;
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
	console.log(props.redBagInfo?.redbagSessionId, activityData.value.redbagSessionId);

	activityApi
		.redBagParticipate({ redbagSessionId: props.redBagInfo?.redbagSessionId || activityData.value.redbagSessionId })
		.then((res: any) => {
			if (res.data?.status !== 10000) {
				dialogInfo.value = res.data;
				shwoDialog.value = true;
				// emit("update:modelValue", false);
			} else {
				setp.value = 1;
				const timer = setTimeout(() => {
					setp.value = 2;
					animate(); // 启动动画
					redBagInterval = setInterval(() => {
						if (!isPaused.value) {
							addNewRedBag();
						}
					}, 250);
					startCountdown(props.redBagInfo?.dropTime);
					clearTimeout(timer);
				}, 3000);
			}
		})
		.finally(() => {
			stopLoading();
		});
};

const initRedbagRain = () => {
	adjustCanvasSize();
	// canvas.value?.addEventListener("mousemove", handleMouseMove);
	canvas.value?.addEventListener("click", handleClick);
};

// 退出游戏函数
function exitGame() {
	isPaused.value = true; // 暂停游戏
	setp.value = 3;
	if (canvas.value) {
		ctx!.clearRect(0, 0, canvas.value.width, canvas.value!.height); // 清空画布
		redBags.length = 0; // 清空红包数组
		// pubsub.subscribe("/activity/redBagRain/settlement", (data) => {});
		const parmas =
			"/activity/redBagRain/settlement" +
			":" +
			JSON.stringify({
				redbagSessionId: activityData.value.redbagSessionId,
			});
		activitySocket.send(parmas);
	}
}
const confirmDialog = () => {
	if ([30045, 30053].includes(dialogInfo.value.status)) {
		router.push("/securityCenter");
	}
	emit("update:modelValue", false);
	activityStore.setIsShowRedBagRain(false);
};
// 生命周期管理
onMounted(async () => {
	initReadyTime();
	initRedbagRain();
	pubsub.subscribe("/activity/redBagRain/settlement", (data) => {
		if (data.code === 10000) {
			settlement.value = data.data;
			if (data.data.redbagCount > 0) {
				dialogTitle.value = "恭喜你";
			} else {
				dialogTitle.value = "很遗憾";
			}
			showRedBagRainResult.value = true;
		}
	});
});

onBeforeUnmount(() => {
	if (redBagInterval) {
		clearInterval(redBagInterval);
	}
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
	z-index: 1200;
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
