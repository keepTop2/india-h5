<template>
	<div>
		<div
			v-for="(item, index) in data"
			:key="item.id"
			class="swipe-item"
			@touchstart="onTouchStart($event, index)"
			@touchmove="onTouchMove($event, index)"
			@touchend="onTouchEnd(index)"
			@click="goToDetails(item)"
		>
			<!-- 内容区域 -->
			<div class="content" :style="{ transform: `translateX(${translateX[index]}px)` }">
				<div class="imgBox">
					<img :src="getImage(item.type)" alt="" />
				</div>
				<div class="right">
					<div class="flex mb_10">
						<div class="fs_28 color_TB">{{ item.typeText }}</div>
						<div class="fs_24 color_T2">{{ dayjs(item.createdTime).format("YYYY/MM/DD hh:mm:ss") }}</div>
					</div>
					<div class="ellipsis fs_24 color_T1">{{ item.content }}</div>
				</div>
			</div>

			<!-- 删除按钮 -->
			<div class="delete-btn" @click.stop="handleDelete(item)">
				<img src="./image/deleteIcon.png" alt="" />
			</div>
		</div>
		<OkDialog v-model="showDialog" :confirm="confirmDelete">删除后无法恢复，确认删除吗？</OkDialog>
	</div>
</template>

<script lang="ts" setup>
import type1Icon from "./image/type1.png";
import type2Icon from "./image/type2.png";
import type3Icon from "./image/type3.png";
import type4Icon from "./image/type4.png";
import type5Icon from "./image/type5.png";

import { ref } from "vue";
import router from "/@/router";
import dayjs from "dayjs";
const emit = defineEmits(["handleDelete"]);
const showDialog = ref(false);
const currentItem = ref({});
const getImage = (type) => {
	return type == 1 ? type1Icon : type == 2 ? type2Icon : type == 3 ? type3Icon : type == 4 ? type4Icon : type5Icon;
};
const confirmDelete = () => {
	// 遍历其他项，将其他已滑动的项复位
	for (let i = 0; i < translateX.value.length; i++) {
		translateX.value[i] = 0;
	}

	emit("handleDelete", currentItem.value);
};
const handleDelete = (item) => {
	currentItem.value = item;
	showDialog.value = true;
};
const props = defineProps({
	data: [] as any,
});

// 用于保存每个 item 的滑动位移
const translateX = ref<number[]>(props.data.map(() => 0));

// 保存开始触摸的X坐标
const startX = ref(0);
// 判断是否在滑动
const isSwiping = ref(false);

// 触摸开始，记录起始位置
const onTouchStart = (e: TouchEvent, index: number) => {
	startX.value = e.touches[0].clientX;
	isSwiping.value = true;
};

// 触摸滑动，计算滑动距离并实时更新位移
const onTouchMove = (e: TouchEvent, index: number) => {
	if (isSwiping.value) {
		const deltaX = e.touches[0].clientX - startX.value;
		// 左滑时更新位移
		if (deltaX < 0) {
			translateX.value[index] = Math.max(deltaX, -80); // 最大左滑 80px
		}
		// 右滑时复位
		if (deltaX > 0 && translateX.value[index] < 0) {
			translateX.value[index] = Math.min(translateX.value[index] + deltaX, 0);
		}
	}
};

// 触摸结束，根据滑动距离判断是否显示删除按钮或复位
const onTouchEnd = (index: number) => {
	isSwiping.value = false;

	// 遍历其他项，将其他已滑动的项复位
	for (let i = 0; i < translateX.value.length; i++) {
		if (i !== index) {
			translateX.value[i] = 0; // 关闭其他打开的项
		}
	}

	if (Math.abs(translateX.value[index]) > 40) {
		// 左滑超过40px，显示删除按钮
		translateX.value[index] = -70;
	} else {
		// 右滑或者滑动距离不足，复位
		translateX.value[index] = 0;
	}
};

const goToDetails = (item) => {
	router.push({
		path: "/feedbackDetails",
		query: {
			id: item.id,
		},
	});
};
</script>

<style scoped lang="scss">
.swipe-item {
	display: flex;
	position: relative;
	overflow: hidden;
	margin-bottom: 16px;
	flex-direction: column;
	padding: 0 24px;
}

.content {
	@include themeify {
		background: themed("BG3");
	}
	transition: transform 0.3s ease;
	z-index: 1;
	border-radius: 20px;
	display: flex;
	align-items: center;
	padding: 36px 24px;
	box-sizing: border-box;
	overflow: hidden;
	.imgBox {
		display: flex;
		align-items: center;
		height: 80px;
		width: 80px;
		justify-content: center;
		margin-right: 24px;
		@include themeify {
			background: themed("BG4");
		}
		border-radius: 50%;
		img {
			height: 44px;
			width: 44px;
		}
	}
	.right {
		width: 544px;
	}
}

.delete-btn {
	position: absolute;
	top: 0;
	right: 24px;
	height: 100%;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 0;
	transition: opacity 0.3s ease;
	img {
		width: 98px;
		height: 98px;
	}
}
</style>
