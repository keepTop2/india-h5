<template>
	<div class="GameSwiper">
		<div v-for="(item, index) in gameInfoList" :key="index">
			<div @click="Common.goToGame(item)">
				<div class="collect">
					<VantLazyImg v-if="item.collect" :src="collectImg" @click.stop="handleCollect(item, false)" alt="" width="100%" />
					<VantLazyImg v-else :src="noCollectImg" alt="" @click.stop="handleCollect(item, true)" width="100%" />
				</div>
				<VantLazyImg class="gameImg" :src="item.icon" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" alt="" width="100%" />
				<div class="gameInfo">
					<p class="color_T1 bg_BG3 color_T1 fs_24">{{ item.name }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * @description 获取热门游戏列表
 */
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GameInfoList, LobbyTopGame } from "/#/game";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import collectImg from "./images/collect.png";
import noCollectImg from "./images/noCollect.png";
import loadingSrc from "../static/loading.png";
import GameApi from "/@/api/venueHome/games";
import pubsub from "/@/pubSub/pubSub";
import { showToast } from "vant";
import Common from "/@/utils/common";
import { useUserStore } from "/@/store/modules/user";
import router from "/@/router";

// 自动播放配置
const autoplay = ref({
	delay: 5500,
	disableOnInteraction: false,
	pauseOnMouseEnter: true,
});

// Swiper模块配置
const modules = ref([Autoplay, Pagination, Navigation]);

// 游戏列表
const gameList = ref<GameInfoList[]>([{ icon: "" }, { icon: "" }, { icon: "" }, { icon: "" }]);

// 对话框显示状态
const dialogShow = ref(false);

// 定义emit事件
const emit = defineEmits(["queryCollection"]);

// 在组件挂载后启用 autoplay
onMounted(() => {
	autoplay.value.delay = 2500;
});

/**
 * @description 定义组件props
 * @param {Number} slidesPerView - 每个视图显示的幻灯片数量
 * @param {Number} spaceBetween - 幻灯片之间的间距
 */
const props = defineProps({
	slidesPerView: {
		type: Number,
		default: 4,
	},
	spaceBetween: {
		type: Number,
		default: 10,
	},
	gameInfoList: {
		type: Array as any,
		default: [],
	},
});

onBeforeMount(() => {
	// 获取热门游戏
});

/**
 * @description 处理游戏收藏
 * @param {Object} item - 游戏项
 * @param {Boolean} collect - 收藏状态
 */
const handleCollect = async (item, collect) => {
	if (!useUserStore().token) {
		return router.push("/login");
	}
	const res: any = await GameApi.gameCollection({
		gameId: item.id,
		type: collect,
	});
	if (res.ok) {
		showToast(res.message);
		item.collect = collect;
		autoplay.value = {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		};
		pubsub.publish("getCollect");
	}
};

/**
 * @description 处理点击游戏卡片
 * @param {Object} item - 游戏项
 */

//  device*	设备：0:后台 1:PC 2:IOS_H5 3:IOS_APP 4:Android_H5 5:Android_APP[...]
// venueCode*	string
// title: 场馆code
// gameCode	string
// title: 游戏code
const handleClickCard = (item) => {
	// dialogShow.value = true;
	// GameApi.gameLogin({
	// 	device: "H5",
	// 	// userAccount: "hida",
	// 	venueCode: item.venueCode,
	// 	gameCode: item.gameCode,
	// }).then((res: any) => {
	// 	if (res.code !== Common.getInstance().ResCode.SUCCESS) {
	// 		showToast(res.message);
	// 	} else {
	// 	}
	// });
};
</script>

<style scoped lang="scss">
@import "./HotGame.scss";
</style>
