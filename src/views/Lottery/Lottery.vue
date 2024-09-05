<template>
	<VantNavBar :title="$t(`home['幸运转盘']`)" @onClickLeft="onClickLeft" />
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
		<div class="flex_center">
			<button>{{ $t('home["免费旋转"]') }}：1</button>
		</div>
		<div class="container">
			<div class="box bg_BG3">
				<div class="title fs_30 color_T1">转盘奖金总计</div>
				<div class="amount fs_32 color_Theme">987,654,321.00</div>
			</div>
			<div class="userInfo bg_BG3">
				<img src="https://picsum.photos/200/200" />
				<div class="">
					<div class="user color_T1">soqiegkl123</div>
					<div class="reward color_TB">
						获得:&nbsp;<span class="color_Theme">$0.446</span>
						<SvgIcon iconName="common/arrow" />
					</div>
					<div class="arrow color_TB">In The Lucky Turntable</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Spin from "/@/components/Spin/Spin.vue";
import { mockDoGetReward, mockGetSpinList } from "./api.ts";
import bronze from "./images/bronze_footer.png";

// 奖项列表
const spinList = ref();
// 获得的奖励
const reward = ref();
// 当前选中的标签
const currentTab = ref("1");
const router = useRouter();
// 标签列表
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

/**
 * @description 根据currentTab返回不同的img
 * @param {string} val - 当前选中的标签值
 * @returns {string} 图片URL
 */
const getImg = (val: string) => {
	return new URL(`./images/tab_bg${val}.png`, import.meta.url).href;
};

/**
 * @description 处理返回按钮点击事件
 */
const onClickLeft = () => {
	router.go(-1);
};

/**
 * @description 选择标签
 * @param {string} tabKey - 选中的标签值
 */
const selectTab = (tabKey: string) => {
	currentTab.value = tabKey;
};

/**
 * @description 抽奖开始
 */
const spinStart = () => {
	mockDoGetReward().then((res: { data: {} }) => {
		reward.value = res.data;
	});
};

/**
 * @description 处理转盘停止后的逻辑
 */
const spinEnd = () => {
	// 处理转盘停止后的逻辑
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
	height: 900px;
	margin-bottom: 40px;
	.lottery-footer_img {
		width: 100%;
	}
}
.flex_center {
	display: flex;
	justify-content: center;
}
.container {
	display: flex;
	justify-content: space-between;
	gap: 24px;
	border-radius: 8px;
	margin: 0 auto;
}

.box {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 8px;
	text-align: center;
	justify-content: center;
}
.userInfo {
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20px;
	border-radius: 8px;
	text-align: center;
	justify-content: center;
	gap: 12px;
	img {
		width: 80px;
		height: 80px;
	}
}
.userInfo > div {
	display: flex;
	text-align: left;
	flex-direction: column;
	gap: 12px;
}
.title {
	margin-bottom: 10px;
}

.amount {
	color: #ff6347;
}

.user {
	font-size: 26px;
	line-height: 26px;
}

.reward {
	font-size: 26px;
	display: flex;
	align-items: center;
	svg {
		width: 36px;
		height: 36px;
	}
}

.arrow {
	font-size: 20px;
}
.content {
	padding: 20px 31px;
	padding-top: 40px;
	button {
		width: 640px;
		height: 86px;
		margin-bottom: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border: 0;
		border-radius: 12px;
		@include themeify {
			background: themed("Theme");
			color: themed("TB1");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
		transition: all 0.1s ease;
		box-sizing: border-box;
	}
}
.tabs {
	// margin-bottom: 60px;
	ul {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		height: 50px;
		border-radius: 8px 8px 0 0;
		@include themeify {
			background: themed("spinTab");
		}
	}

	li {
		list-style: none;
		width: 25%;
		text-align: center;
		height: 64px;
		line-height: 50px;
		line-height: 64px;
		font-size: 26px;
		position: relative;
		cursor: pointer;
		@include themeify {
			color: themed("TB1");
		}
	}
	li.active {
		display: flex;
		justify-content: center;
		img {
			position: absolute;
			width: 100%;
			height: 110%;
			top: -10px;
		}
		a {
			position: absolute;
		}
	}
	li:first-child.active {
	}
}
</style>
