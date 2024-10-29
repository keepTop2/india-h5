<template>
	<div class="horseRaceLamp">
		<SvgIcon class="bg" iconName="home/HorseRaceLampBg" />
		<van-notice-bar scrollable :text="horseRaceLampList[targetIndex]?.messageContentI18nCode" @replay="handleReplay" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeApi from "/@/api/home";

interface Notice {
	noticeTitleI18nCode: string; // 标题
	messageContentI18nCode: string; // 内容
}

const horseRaceLampList = ref<Notice[]>([]); // 跑马灯消息
const targetIndex = ref(0);

const getHorseRaceLampList = async () => {
	const res = await HomeApi.horseRaceLampList();
	horseRaceLampList.value = res.data.userNoticeList || [];
};
getHorseRaceLampList();

const handleReplay = () => {
	targetIndex.value = (targetIndex.value + 1) % horseRaceLampList.value.length;
};
</script>

<style scoped lang="scss">
.horseRaceLamp {
	margin: 18px 24px 0;
	position: relative;

	.bg {
		fill: var(--BG4-N, #343434);
		opacity: 0.5;
		position: absolute;
		top: 0;
		left: 0;
		height: 52px;
		width: 100%;
	}

	:deep(.van-notice-bar) {
		background: transparent;
		//opacity: 0.5;
		height: 52px;
		border-radius: 99px;
		box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);

		.van-notice-bar__content {
			color: var(--TB-N, #fff);
			font-family: "PingFang SC";
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}
}
</style>
