<template>
	<!-- 定义一个 canvas 画布，并绑定点击事件 -->
	<canvas ref="canvas" @touchend="handleClick"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue"; // 引入 Vue 的组合式 API

// 红包类定义，包含红包的位置、大小、速度、点击状态、以及曲线掉落的控制逻辑
class RedPacket {
	x: number; // 红包的横坐标
	y: number; // 红包的纵坐标
	width: number; // 红包的宽度
	height: number; // 红包的高度
	speed: number; // 红包的下落速度
	targetX: number | null; // 红包点击后，曲线运动的目标 X 坐标
	targetY: number | null; // 红包点击后，曲线运动的目标 Y 坐标
	clicked: boolean; // 是否被点击的状态
	image: HTMLImageElement; // 红包的图片元素
	curveProgress: number; // 曲线进度，0 表示开始，1 表示结束
	controlPointX: number; // 贝塞尔曲线控制点 X 坐标
	controlPointY: number; // 贝塞尔曲线控制点 Y 坐标

	constructor(x: number, y: number, width: number, height: number, speed: number, image: HTMLImageElement) {
		// 初始化红包的位置、大小、速度、图片
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.image = image;

		// 初始状态：没有点击，曲线掉落目标为空
		this.targetX = null;
		this.targetY = null;
		this.clicked = false;
		this.curveProgress = 0;

		// 随机生成贝塞尔曲线的控制点，影响红包掉落曲线的形状
		this.controlPointX = x + Math.random() * 100 - 50;
		this.controlPointY = y - Math.random() * 200;
	}

	// 更新红包位置：若未被点击，红包垂直下落；若被点击，则沿曲线运动
	update(canvasHeight: number) {
		if (!this.clicked) {
			// 红包未被点击时，垂直下落
			this.y += this.speed;

			// 如果红包掉出屏幕底部，重新从顶部出现
			if (this.y > canvasHeight) {
				this.y = -this.height;
			}
		} else {
			// 红包被点击时，更新曲线进度
			this.curveProgress += 0.01;

			// 根据贝塞尔曲线计算新的位置，直到曲线进度到达 1
			if (this.curveProgress < 1 && this.targetX !== null && this.targetY !== null) {
				// 使用二次贝塞尔曲线公式更新 X 坐标
				this.x =
					(1 - this.curveProgress) * (1 - this.curveProgress) * this.x +
					2 * this.curveProgress * (1 - this.curveProgress) * this.controlPointX +
					this.curveProgress * this.curveProgress * this.targetX;

				// 使用二次贝塞尔曲线公式更新 Y 坐标
				this.y =
					(1 - this.curveProgress) * (1 - this.curveProgress) * this.y +
					2 * this.curveProgress * (1 - this.curveProgress) * this.controlPointY +
					this.curveProgress * this.curveProgress * this.targetY;
			}
		}
	}

	// 绘制红包
	draw(ctx: CanvasRenderingContext2D) {
		// 使用画布的 drawImage 方法绘制红包图片
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}

	// 设置点击后的目标位置，并开始曲线掉落
	setClickTarget(targetX: number, targetY: number) {
		this.clicked = true; // 设置红包为已点击状态
		this.targetX = targetX; // 设置目标 X 坐标
		this.targetY = targetY; // 设置目标 Y 坐标
		this.curveProgress = 0; // 重置曲线进度
	}

	// 判断是否点击到了红包
	isClicked(mouseX: number, mouseY: number) {
		// 检查鼠标点击位置是否在红包的范围内
		return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
	}
}

// 引用 canvas 元素，使用 ref 绑定
const canvas = ref<HTMLCanvasElement | null>(null);

// 红包数组，存储所有红包对象
const redPackets: RedPacket[] = [];

// 红包图片的路径
const imgSrc = "https://cdn.pixabay.com/photo/2022/04/12/07/05/red-envelope-7127397_1280.png";

onMounted(() => {
	// 当组件挂载时，获取 canvas 元素
	const canvasEl = canvas.value;
	if (!canvasEl) return;

	// 获取 canvas 上下文，准备绘制图像
	const ctx = canvasEl.getContext("2d");
	const image = new Image(); // 创建图片对象
	image.src = imgSrc; // 设置图片来源

	// 图片加载完成后初始化红包
	image.onload = () => {
		initRedPackets(canvasEl, image); // 初始化红包数组
		animate(); // 开始动画循环
	};

	// 监听窗口调整大小，确保画布大小合适
	window.addEventListener("resize", resizeCanvas);
	resizeCanvas(); // 初始化时也调整一次
});

onUnmounted(() => {
	// 组件卸载时，移除事件监听器
	window.removeEventListener("resize", resizeCanvas);
});

// 初始化红包，创建多个红包对象并添加到数组中
function initRedPackets(canvasEl: HTMLCanvasElement, image: HTMLImageElement) {
	for (let i = 0; i < 30; i++) {
		const width = 50; // 红包宽度
		const height = 50; // 红包高度
		const x = Math.random() * (canvasEl.width - width); // 随机位置
		const y = Math.random() * canvasEl.height - 300; // 增加初始 Y 坐标的范围，避免红包堆积
		const speed = Math.random() * 2 + 2; // 随机下落速度
		const redPacket = new RedPacket(x, y, width, height, speed, image); // 创建红包对象
		redPackets.push(redPacket); // 添加到红包数组中
	}
}

// 动画循环，通过 requestAnimationFrame 实现平滑动画
function animate() {
	const canvasEl = canvas.value;
	if (!canvasEl) return;

	// 获取 canvas 上下文
	const ctx = canvasEl.getContext("2d");
	if (!ctx) return;

	// 清除画布，准备绘制下一帧
	ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

	// 更新并绘制每一个红包
	redPackets.forEach((packet) => {
		packet.update(canvasEl.height); // 更新红包位置
		packet.draw(ctx); // 绘制红包
	});

	// 递归调用自身，生成动画
	requestAnimationFrame(animate);
}

// 处理点击事件，检查点击的红包并触发曲线掉落效果
function handleClick(event: TouchEvent) {
	const canvasEl = canvas.value;
	console.log(canvasEl, "--------------");
	if (!canvasEl) return;

	// 计算鼠标在 canvas 中的坐标
	const rect = canvasEl.getBoundingClientRect();
	console.log(event, "aaaaaaaaaaaaaaaaaaaaaa");
	const touch = event.changedTouches[0];
	// const mouseX = event.clientX - rect.left;
	// const mouseY = event.clientY - rect.top;
	const mouseX = touch.clientX - rect.left;
	const mouseY = touch.clientY - rect.top;
	console.log(mouseX, mouseY, "++++++++++++++");
	// 遍历红包，判断哪个红包被点击
	redPackets.forEach((packet) => {
		if (packet.isClicked(mouseX, mouseY)) {
			// 设置点击后的目标位置（如画布底部中心）
			packet.setClickTarget(canvasEl.width / 2, canvasEl.height);
		}
	});
}

const handleClick2 = (event: TouchEvent) => {
	console.log(event, "======");
};

// 调整画布大小，确保适应窗口大小
function resizeCanvas() {
	const canvasEl = canvas.value;
	if (!canvasEl) return;

	// 设置 canvas 的宽度和高度为窗口大小
	canvasEl.width = window.innerWidth;
	canvasEl.height = window.innerHeight;
}
</script>

<style>
/* 让 canvas 占满整个屏幕 */
canvas {
	display: block;
}
</style>
