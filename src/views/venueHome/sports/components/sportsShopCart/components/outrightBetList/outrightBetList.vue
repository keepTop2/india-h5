<template>
	<div>
		<van-popup v-model:show="sportsBetChampion.championBetShow" position="bottom" @closed="onClosed">
			<!-- 头部 -->
			<Header :isShowBet="props.isShowBet" />

			<div class="content">
				<div class="list">
					<img v-if="arrowShow" class="arrow" :src="left_arrow" />
					<div ref="container" class="content_list" @scroll="checkScroll">
						<!-- 赛事列表 -->
						<EventCard v-for="(data, index) in sportsBetChampion.championBetData" :key="index" :data="data" />
						<!-- 单关表单 -->
						<SingleTicketFrom v-if="sportsBetChampion.championBetData.length == 1" />
					</div>
				</div>

				<!-- 单关键盘投注 -->
				<SingleTicketFooter @singleTicketSuccess="getSingleTicketSuccess" />
			</div>
		</van-popup>

		<van-popup v-model:show="betInfoShow" position="bottom" @closed="onInfoClosed">
			<!-- 单关投注详情 -->
			<FinishHeader :betStatus="state.singleTicketSuccess.betStatus" @close="onClose" />
			<SingleTicketFinish :data="state.singleTicketSuccess" @close="onClose" />
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import left_arrow from "/@/assets/zh-CN/default/venueHome/sports/left_arrow.gif";
import Header from "../../components/betListHeader/betListHeader.vue";
import FinishHeader from "/@/views/venueHome/sports/components/sportsShopCart/components/betFinishheader/betFinishheader.vue";
import EventCard from "./components/eventCard/eventCard.vue";
import SingleTicketFrom from "./components/singleTicketFrom/singleTicketFrom.vue";
import SingleTicketFooter from "./components/singleTicketFooter/singleTicketFooter.vue";
import SingleTicketFinish from "./components/singleTicketFinish/singleTicketFinish.vue";
import shopCartChampionPubSub from "/@/views/venueHome/sports/hooks/shopCartChampionPubSub";
import { getIndexInfo, getBetOrderId, getPublicSetting } from "/@/views/venueHome/sports/utils/commonFn";
import { useSportsBetChampionStore } from "/@/store/modules/sports/sportsBetChampionData";
const sportsBetChampion = useSportsBetChampionStore();

const props = withDefaults(
	defineProps<{
		isShowBet: boolean;
	}>(),
	{
		isShowBet: true,
	}
);
const betInfoShow = ref(false);
const state = reactive({
	singleTicketSuccess: {}, // 单关下注详情
});
const container = ref<HTMLElement | null>(null);
const hasScrollbar = ref(false);
const arrowShow = ref(false);

watch(
	() => sportsBetChampion.championBetShow,
	(newValue) => {
		if (newValue) {
			// 判断容器是否出现滚动条
			nextTick(() => {
				getHasScrollbar();
			});
			// 请求余额信息
			getIndexInfo();
			// 请求注单ID
			getBetOrderId();
			// 请求赔率设置
			getPublicSetting();
		}
	}
);

watch(
	() => sportsBetChampion.championBetData.length,
	(newValue, oldValue) => {
		// 长度变化则监听
		if (newValue == 1 && !oldValue) {
			sportsBetChampion.openChampionShopCart();
		}
		if (sportsBetChampion.championBetShow) {
			nextTick(() => {
				getHasScrollbar();
			});
			// 开启线程
			sportsBetChampion.championOpenSse();
		}
	}
);

// 判断是否出现滚动条
const getHasScrollbar = () => {
	const element = container.value;
	if (element) {
		nextTick(() => {
			const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;
			hasScrollbar.value = hasVerticalScrollbar;
			if (hasScrollbar.value) {
				arrowShow.value = true;
			} else {
				arrowShow.value = false;
			}
		});
	}
};

// 容器滑动
const checkScroll = () => {
	const element = container.value;
	if (element) {
		const hasScrollbar = element.scrollHeight > element.clientHeight;
		const isAtBottom = element.scrollTop + element.clientHeight === element.scrollHeight;
		if (hasScrollbar && !isAtBottom) {
			arrowShow.value = true;
		} else {
			arrowShow.value = false;
		}
	}
};

/**
 * @description 单关请求回调执行
 */
const getSingleTicketSuccess = (result) => {
	sportsBetChampion.closeChampionShopCart(); // 关闭购物车弹窗
	betInfoShow.value = true;
	state.singleTicketSuccess = result;
};

/**
 * @description 关闭详情弹窗
 */
const onClose = () => {
	betInfoShow.value = false;
	sportsBetChampion.clearChampionShopCart();
};

// 弹窗动画结束清空购物车数据 关闭购物车线程
const onClosed = () => {
	shopCartChampionPubSub.initializeState();
};

const onInfoClosed = () => {};
</script>

<style scoped lang="scss">
:deep(.van-popup) {
	background-color: transparent;
}
.content {
	padding: 0px 24px 30px;
	@include themeify {
		background-color: themed("BG1");
	}
	.list {
		position: relative;

		.arrow {
			position: absolute;
			left: 50%;
			bottom: 0px;
			width: 30px;
			height: 20px;
			transform: translate(-50%, 0) rotate(-90deg);
			z-index: 2;
		}
	}

	.content_list {
		max-height: 725px;
		overflow-y: auto;
		margin-bottom: 10px;
	}
}
</style>
