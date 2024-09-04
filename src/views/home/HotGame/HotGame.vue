<template>
	<div class="GameSwiper">
		<Swiper slidesPerView="auto" :loop="true" :autoplay="autoplay" :modules="modules" class="mySwiper">
			<swiper-slide v-for="(item, index) in gameList" :key="index">
				<div @click="handleClickCard(item)">
					<div class="collect">
						<VantLazyImg v-if="item.collect" :src="collectImg" @click="handleCollect(item, false)" alt="" width="100%" />
						<VantLazyImg v-else :src="noCollectImg" alt="" @click="handleCollect(item, true)" width="100%" />
					</div>
					<VantLazyImg class="gameImg" :src="item.icon" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" alt="" width="100%" />
					<div class="gameInfo">
						<p class="color_T1 bg_BG3 color_T1 fs_24">{{ item.name }}</p>
					</div>
				</div>
			</swiper-slide>
		</Swiper>
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
const autoplay = ref({
	delay: 5500,
	disableOnInteraction: false,
	pauseOnMouseEnter: true,
});
const modules = ref([Autoplay, Pagination, Navigation]); //swiper配置项
const gameList = ref<GameInfoList[]>([{ icon: "" }, { icon: "" }, { icon: "" }, { icon: "" }]);
const dialogShow = ref(false);
const emit = defineEmits(["queryCollection"]);

// 在组件挂载后启用 autoplay
onMounted(() => {
	autoplay.value.delay = 2500;
});

const props = defineProps({
	slidesPerView: {
		type: Number,
		default: 4,
	},
	spaceBetween: {
		type: Number,
		default: 10,
	},
});

onBeforeMount(() => {
	// 获取热门游戏
	getGameInfoDetail();
});

// 获取热门游戏
const getGameInfoDetail = () => {
	GameApi.queryGameInfoDetail({
		// "pageNumber": 1,
		label: 0,
		pageSize: -1,
	}).then((res) => {
		console.log(res, "==queryGameInfoDetail");
		gameList.value = res.data.records;
	});
};
// 触发收藏
const handleCollect = async (item, collect) => {
	const res = await GameApi.gameCollection({
		gameId: item.id,
		type: collect,
	});
	if (res.ok) {
		item.collect = collect;
		autoplay.value = {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		};
		pubsub.publish("getCollect");
	}
};
const handleClickCard = (item) => {
	// dialogShow.value = true;
};
</script>

<style scoped lang="scss">
@import "./HotGame.scss";
</style>
