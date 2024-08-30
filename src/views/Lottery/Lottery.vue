<template>
	<VantNavBar title="幸运装盘" @onClickLeft="onClickLeft" />
	<div class="content">
		<div class="tabs">
			<ul>
				<li :class="['color_Text_a', { active: tab.value === currentTab }]" v-for="tab in tabs" :key="tab.name" @click="selectTab(tab.value)">
					<img v-if="tab.value === currentTab" :src="getImg(tab.value)" alt="" />
					<a>{{ tab.name }}</a>
				</li>
			</ul>
		</div>
		<div class="lottery">
			<Spin @start-spinning-callback="spinStart" @end-spinning-callback="spinEnd" :reward="reward" :spinList="spinList" />
			<VantLazyImg class="lottery-footer_img" :src="bronze" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Spin from "/@/components/Spin/Spin.vue";
import { mockDoGetReward, mockGetSpinList } from "./api.ts";
import bronze from "./images/bronze_footer.png";
const spinList = ref();
const reward = ref();
const currentTab = ref("1");
const tabs = ref([
	{
		name: "青铜",
		value: "1",
	},
	{
		name: "白银",
		value: "2",
	},
	{
		name: "黄金",
		value: "3",
	},
	{
		name: "钻石",
		value: "4",
	},
]);
onMounted(() => {
	/**
	 * @description 获取奖项列表
	 */

	mockGetSpinList().then((res: { data: Array<object> }) => {
		spinList.value = res.data;
	});
});

// 根据currentTab返回不同的img
const getImg = (val: string) => {
	return new URL(`./images/tab_bg${val}.png`, import.meta.url).href;
};
const onClickLeft = () => {
	router.go(-1);
};
const selectTab = (tabKey: string) => {
	currentTab.value = tabKey;
};
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
	display: flex;
	background: url("./images/content_bg.png") no-repeat;
	background-size: cover;
	background-position: center;
	overflow: hidden;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 846px;
	.lottery-footer_img {
		width: 100%;
	}
}
.content {
	padding: 20px 31px;
}
.tabs {
	// margin-bottom: 60px;
	height: 64px;
	ul {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		height: 50px;
		@include themeify {
			background: themed("spinTab");
		}
	}

	li {
		list-style: none;
		width: 25%;
		text-align: center;
		height: 100%;
		line-height: 50px;
		position: relative;
		cursor: pointer;
	}
	li.active {
		@include themeify {
			color: themed("TB");
		}
		display: flex;
		justify-content: center;
		img {
			position: absolute;
			width: 124%;
			height: 100%;
		}
		a {
			position: absolute;
		}
	}
	li:first-child.active {
	}
}
</style>
