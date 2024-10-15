<template>
	<div class="wrapper">
		<VantNavBar title="任务" @onClickLeft="router.back()" />
		<VantLazyImg :src="image" class="main-image" />
		<div class="content">
			<div class="rewardbg">
				<div>累计奖励</div>
				<div>123123123123</div>
			</div>

			<div class="tabs">
				<div class="tab" v-for="(item, index) in tasktype" :key="index" :class="item.value == currentTab ? 'active' : ''">{{ item.label }}</div>
			</div>
			<div class="taskList"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { activityApi } from "/@/api/activity";
import dayjs from "dayjs";
import { showToast } from "vant";
import image from "./image/image.png";
import { useUserStore } from "/@/store/modules/user";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const showDialog = ref(false);
const showDialog2 = ref(false);
const dialogInfo: any = ref({});
const activityData = ref();
const currentTab = ref(0);
const tasktype = [
	{
		label: "每日任务",
		value: 0,
	},
	{
		label: "每周任务",
		value: 1,
	},
	{
		label: "新人任务",
		value: 2,
	},
];
onMounted(() => {
	getTaskDetail();
});
const getTaskDetail = () => {
	activityApi.getTaskDetail().then((res) => {
		console.log(res);
	});
};
const apply = () => {
	if (!userStore.token) {
		showDialog2.value = true;
		return;
	}
};
const confirmDialog = () => {
	if (dialogInfo.value.status === 30049) {
		router.push("/wallet/recharge");
	}
	showDialog.value = false;
	showDialog2.value = false;
};
</script>

<style lang="scss" scoped>
.wrapper {
	background: url("./image/bg.png") no-repeat;
	background-size: 100% 100%;

	.main-image {
		height: 640px;
		width: 100%;
		object-fit: cover;
		margin-bottom: 20px;
	}
	.content {
		padding: 0 24px;
		.rewardbg {
			height: 174px;
			background: url("./image/rewardbg.png") no-repeat;
			background-size: 100% 100%;
			display: flex;

			padding: 0 40px;
			flex-direction: column;
			justify-content: center;
			gap: 20px;
		}
		.tabs {
			display: flex;
			margin-top: 24px;
			gap: 20px;
			justify-content: space-around;
			line-height: 72px;
			@include themeify {
				color: themed("TB");
			}
			.tab {
				width: 33%;
				text-align: center;
				background: url("./image/tabBg.png") no-repeat;
				height: 72px;
				background-size: 100% 100%;
			}
			.tab.active {
				height: 79px;
				background: url("./image/tabActive.png") no-repeat;
				background-size: 100% 100%;
			}
		}
		.taskList {
		}
	}
}
</style>
