<template>
	<div>
		<van-popup v-model:show="sportsBetEvent.sportsBetShow" position="bottom" @closed="onClosed">
			<!-- 头部 -->
			<Header :isShowBet="props.isShowBet" />

			<div class="content">
				<div class="list">
					<img v-if="arrowShow" class="arrow" :src="left_arrow" />
					<div ref="container" class="content_list" @scroll="checkScroll">
						<!-- 赛事列表 -->
						<EventCard v-for="(data, index) in sportsBetEvent.sportsBetEventData" :key="index" :data="data" />
						<!-- 单关表单 -->
						<SingleTicketFrom v-if="sportsBetEvent.sportsBetEventData.length == 1" />
						<!-- 串关表单 -->
						<ParlayTicketsFrom v-if="sportsBetEvent.sportsBetEventData.length > 1" />
					</div>
				</div>

				<!-- 单关键盘投注 -->
				<SingleTicketFooter v-if="sportsBetEvent.sportsBetEventData.length == 1" @singleTicketSuccess="getSingleTicketSuccess" />
				<!-- 串关键盘投注 -->
				<ParlayTicketsFooter v-if="sportsBetEvent.sportsBetEventData.length > 1" @parlayTicketsSuccess="getParlayTicketsSuccess" />
			</div>
		</van-popup>

		<van-popup v-model:show="betInfoShow" position="bottom" @closed="onInfoClosed">
			<!-- 单关投注详情 -->
			<FinishHeader v-if="ComponentMarkup.value == 1" :betStatus="state.singleTicketSuccess.betStatus" @close="onClose" />
			<SingleTicketFinish v-if="ComponentMarkup.value == 1" :data="state.singleTicketSuccess" @close="onClose" />
			<!-- 串关投注详情 -->
			<FinishHeader v-if="ComponentMarkup.value == 2" :betStatus="state.parlayTicketsSuccess.betStatus" @close="onClose" />
			<ParlayTicketsFinish v-if="ComponentMarkup.value == 2" :data="state.parlayTicketsSuccess" @close="onClose" @onSecondBet="onSecondBet" />
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
import ParlayTicketsFrom from "./components/parlayTicketsFrom/parlayTicketsFrom.vue";
import ParlayTicketsFooter from "./components/parlayTicketsFooter/parlayTicketsFooter.vue";
import ParlayTicketsFinish from "./components/parlayTicketsFinish/parlayTicketsFinish.vue";
import shopCartPubSub from "/@/views/venueHome/sports/hooks/shopCartPubSub";
import { getIndexInfo, getBetOrderId, getPublicSetting, restoreStatus } from "/@/views/venueHome/sports/utils/commonFn";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useToLogin } from "/@/hooks/toLogin";
const { isHaveToken } = useToLogin();
const sportsBetEvent = useSportsBetEventStore();

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
	parlayTicketsSuccess: {}, // 串关下注详情
});
const ComponentMarkup = reactive({
	value: 0,
});
const container = ref<HTMLElement | null>(null);
const hasScrollbar = ref(false);
const arrowShow = ref(false);

watch(
	() => sportsBetEvent.sportsBetShow,
	(newValue) => {
		if (newValue) {
			// 重新打开清空之前状态;不再关闭时清空是因为投注成功之后需要输入金额做展示
			shopCartPubSub.initializeState();
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
			// 恢复状态 重新判断投注状态
			restoreStatus();
		}
	}
);

watch(
	() => sportsBetEvent.sportsBetEventData.length,
	(newValue, oldValue) => {
		// 长度变化则监听
		if (newValue == 1 && !oldValue) {
			sportsBetEvent.openShopCart();
		}
		if (sportsBetEvent.sportsBetShow) {
			nextTick(() => {
				getHasScrollbar();
			});
			// 开启线程
			sportsBetEvent.sportsOpenSse();
		}
	}
);

// 判断是否出现滚动条
const getHasScrollbar = () => {
	const element = container.value;
	if (element) {
		const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;
		hasScrollbar.value = hasVerticalScrollbar;
		if (hasScrollbar.value) {
			arrowShow.value = true;
		} else {
			arrowShow.value = false;
		}
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
	sportsBetEvent.closeShopCart(); // 关闭购物车弹窗
	ComponentMarkup.value = 1;
	betInfoShow.value = true;
	state.singleTicketSuccess = result;
};

/**
 * @description 串关请求回调执行
 */
const getParlayTicketsSuccess = (result) => {
	sportsBetEvent.closeShopCart(); // 关闭购物车弹窗
	betInfoShow.value = true;
	ComponentMarkup.value = 2;
	state.parlayTicketsSuccess = result;
	// 结束线程
};

/**
 * @description 二次投注执行
 */
const onSecondBet = () => {
	betInfoShow.value = false;
	sportsBetEvent.openShopCart();
};

/**
 * @description 关闭详情弹窗
 */
const onClose = () => {
	betInfoShow.value = false;
	sportsBetEvent.clearShopCart();
};

// 弹窗动画结束
const onClosed = () => {};

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
