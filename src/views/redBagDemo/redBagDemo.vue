<template>
	<div class="red_conatiner">
		<!-- 绑定 click 事件来处理点击红包 -->
		<canvas ref="canvas" @touchend="handleClick"></canvas>

		<div class="receive_container"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

// 红包类定义
class RedPacket {
	x: number; // 红包的 x 坐标
	y: number; // 红包的 y 坐标
	width: number; // 红包的宽度
	height: number; // 红包的高度
	speed: number; // 红包的下落速度
	targetX: number | null; // 点击后掉落的目标 x 坐标
	targetY: number | null; // 点击后掉落的目标 y 坐标
	clicked: boolean; // 是否已被点击
	image: HTMLImageElement; // 红包的图像
	curveProgress: number; // 掉落动画的进度
	controlPointX!: number; // 贝塞尔曲线的控制点 x 坐标
	controlPointY!: number; // 贝塞尔曲线的控制点 y 坐标

	// 构造函数，初始化红包属性
	constructor(x: number, y: number, width: number, height: number, speed: number, image: HTMLImageElement) {
		this.x = x; // 初始化 x 坐标
		this.y = y; // 初始化 y 坐标
		this.width = width; // 初始化宽度
		this.height = height; // 初始化高度
		this.speed = speed; // 初始化下落速度
		this.image = image; // 初始化图像
		this.targetX = null; // 初始没有目标 x 坐标
		this.targetY = null; // 初始没有目标 y 坐标
		this.clicked = false; // 初始状态为未点击
		this.curveProgress = 0; // 初始曲线进度为 0
		// // 设置初始控制点，使得红包有小幅度的上升
		// this.controlPointX = x + Math.random() * 100 - 50; // 随机控制点 x 坐标
		// this.controlPointY = this.y; // 随机控制点 y 坐标（使上升幅度在150到300之间）
		this.setControlPoints();
	}

	// 更新红包的下落位置或点击后的掉落动画
	update(canvasEl: HTMLCanvasElement) {
		if (!this.clicked) {
			// 如果没有点击，红包执行下落逻辑
			this.y += this.speed; // 红包下落，y 坐标增加
			if (this.y > canvasEl.height) {
				this.reset(canvasEl); // 如果下落超出画布底部，重置红包位置
			}
		} else {
			// 如果被点击，执行曲线掉落动画
			this.curveProgress += 0.01; // 更新曲线进度
			if (this.curveProgress < 1 && this.targetX !== null && this.targetY !== null) {
				// 贝塞尔曲线公式计算 x 和 y 坐标
				this.x =
					(1 - this.curveProgress) * (1 - this.curveProgress) * this.x +
					2 * this.curveProgress * (1 - this.curveProgress) * this.controlPointX +
					this.curveProgress * this.curveProgress * this.targetX;

				this.y =
					(1 - this.curveProgress) * (1 - this.curveProgress) * this.y +
					2 * this.curveProgress * (1 - this.curveProgress) * this.controlPointY +
					this.curveProgress * this.curveProgress * this.targetY;
			} else {
				// 曲线运动完成后，重置红包状态
				this.reset(canvasEl);
			}
		}
	}

	// 绘制红包到 canvas 上
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // 使用红包图像绘制红包
	}

	// 设置控制点，使得红包滑落路径自然
	private setControlPoints() {
		// 控制点 Y 位置比当前 Y 高出一点，制造坠落的弧线
		this.controlPointY = this.y - Math.random() * 100;

		if (this.x < window.innerWidth / 2) {
			// 左侧红包向右侧滑动
			this.controlPointX = this.x + Math.random() * 50; // 向右偏移
		} else {
			// 右侧红包向左侧滑动
			this.controlPointX = this.x - Math.random() * 50; // 向左偏移
		}
	}

	// 设置点击后的目标掉落位置
	setClickTarget(targetX: number, targetY: number) {
		this.clicked = true; // 标记为已点击
		this.targetX = targetX; // 设置目标 x 坐标
		this.targetY = targetY; // 设置目标 y 坐标
		this.curveProgress = 0; // 重置曲线进度
		// 更新控制点位置，使得红包在掉落过程中有小幅度上升
		// this.controlPointX = this.x + (Math.random() * 100 - 50); // 更新控制点 x 坐标
		// this.controlPointY = this.y; // 更新控制点 y 坐标
		this.setControlPoints();
	}

	// 判断鼠标点击位置是否在红包区域内
	isClicked(mouseX: number, mouseY: number) {
		return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
	}

	// 重置红包位置和状态，模拟重新生成红包
	reset(canvasEl: HTMLCanvasElement) {
		this.x = Math.random() * (canvasEl.width - this.width); // 随机生成红包的 x 位置
		// this.x = Math.random() * window.innerWidth; // 随机 x 位置
		this.y = -this.height; // 从顶部重新出现
		this.speed = Math.random() * 1 + 3; // 重新随机下落速度
		this.clicked = false; // 重置点击状态
		this.curveProgress = 0; // 重置曲线进度
		// 设置新的控制点，使得红包在下落时有小幅度的上升
		this.controlPointX = this.x + Math.random() * 100 - 50; // 随机控制点 x 坐标
		this.controlPointY = this.y - Math.random() * 300 + 150; // 随机控制点 y 坐标（使上升幅度在150到300之间）
	}
}

// 定义 canvas 相关的 ref
const canvas = ref<HTMLCanvasElement | null>(null);
const redPackets: RedPacket[] = []; // 存储所有红包的数组

// 红包图像的路径
const imgSrc = "https://cdn.pixabay.com/photo/2022/04/12/07/05/red-envelope-7127397_1280.png";

onMounted(() => {
	const canvasEl = canvas.value; // 获取 canvas 元素
	if (!canvasEl) return;

	const ctx = canvasEl.getContext("2d"); // 获取 canvas 的 2D 绘制上下文
	const image = new Image(); // 创建图像对象
	image.src = imgSrc; // 设置图像的来源路径

	image.onload = () => {
		// 图像加载完成后，初始化红包
		initRedPackets(canvasEl, image);
		animate(); // 开始动画循环
	};

	// 监听窗口大小变化，调整 canvas 大小
	window.addEventListener("resize", resizeCanvas);
	resizeCanvas(); // 初始化时调整 canvas 大小
});

onUnmounted(() => {
	// 组件卸载时，移除事件监听器
	window.removeEventListener("resize", resizeCanvas);
});

// 初始化红包的函数
function initRedPackets(canvasEl: HTMLCanvasElement, image: HTMLImageElement) {
	const packetCount = 20; // 设置红包数量
	for (let i = 0; i < packetCount; i++) {
		const width = 70; // 红包宽度
		const height = 70; // 红包高度
		const x = Math.random() * (canvasEl.width - width); // 随机生成红包的 x 位置
		const y = Math.random() * canvasEl.height - 300; // 随机生成红包的 y 位置
		const speed = Math.random() * 1 + 3; // 红包的下落速度
		const redPacket = new RedPacket(x, y, width, height, speed, image); // 创建红包实例
		redPackets.push(redPacket); // 将红包加入红包数组
	}
}

// 动画循环，刷新画布并更新红包状态
function animate() {
	const canvasEl = canvas.value; // 获取 canvas 元素
	if (!canvasEl) return;

	const ctx = canvasEl.getContext("2d"); // 获取 2D 绘制上下文
	if (!ctx) return;

	ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); // 清除画布

	redPackets.forEach((packet) => {
		packet.update(canvasEl); // 更新红包位置
		packet.draw(ctx); // 绘制红包
	});

	requestAnimationFrame(animate); // 请求下一帧动画
}

// 处理点击事件
function handleClick(touchevent: TouchEvent) {
	const canvasEl = canvas.value; // 获取 canvas 元素
	if (!canvasEl) return;

	// const rect = canvasEl.getBoundingClientRect(); // 获取 canvas 的边界信息
	console.log(event);

	// const mouseX = event.clientX - rect.left; // 计算点击的 x 坐标相对于 canvas
	// const mouseY = event.clientY - rect.top; // 计算点击的 y 坐标相对于 canvas
	const mouseX = touchevent.changedTouches[0].clientX; // 计算点击的 x 坐标相对于 canvas
	const mouseY = touchevent.changedTouches[0].clientY; // 计算点击的 y 坐标相对于 canvas

	for (const packet of redPackets) {
		if (packet.isClicked(mouseX, mouseY) && !packet.clicked) {
			packet.setClickTarget(canvasEl.width / 2, canvasEl.height); // 设置点击后红包的目标位置
			break; // 一次点击只能点中一个红包，处理完第一个点击的红包后退出循环
		}
	}
}

// 调整 canvas 大小
function resizeCanvas() {
	const canvasEl = canvas.value; // 获取 canvas 元素
	if (!canvasEl) return;

	canvasEl.width = window.innerWidth; // 将 canvas 宽度设置为窗口宽度
	canvasEl.height = window.innerHeight; // 将 canvas 高度设置为窗口高度
}
</script>

<style>
.red_conatiner {
	position: relative;
	width: 100%;
	height: 100vh;
}
canvas {
	display: block; /* 让 canvas 占满页面 */
	z-index: 2;
	position: absolute;
}
.receive_container {
	width: 200px;
	height: 300px;
	position: absolute;
	border: 3px solid green;
	bottom: 0;
	left: 50%;
	background-color: green;
	transform: translate(-50%);
	z-index: 0;
}
</style>
