<template>
	<div class="lottery">
		<Spin @start-spinning-callback="spinStart" @end-spinning-callback="spinEnd" :reward="reward" :spinList="spinList" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Spin from "/@/components/Spin/Spin.vue";
import { mockDoGetReward, mockGetSpinList } from "./api.ts";
const spinList = ref();
const reward = ref();

onMounted(() => {
	/**
	 * @description 获取奖项列表
	 */

	mockGetSpinList().then((res: { data: Array<object> }) => {
		spinList.value = res.data;
	});
});
const spinStart = () => {
	/**
	 * @description 抽奖开始
	 */
	mockDoGetReward().then((res: { data: {} }) => {
		reward.value = res.data;
	});
};
const spinEnd = () => {
	/**
	 * 处理转盘停止后的逻辑
	 */
};
</script>

<style scoped lang="scss">
.lottery {
	padding-top: 50px;
	display: flex;
	justify-content: center;
}
</style>
