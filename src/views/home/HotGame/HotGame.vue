<template>
	<div class="GameSwiper">
		<Swiper slidesPerView="auto" :loop="true" :autoplay="autoplay" :modules="modules" class="mySwiper">
			<swiper-slide v-for="(item, index) in gameList" :key="index">
				<div @click="handleClickCard(item)">
					<div class="collect">
						<VantLazyImg v-if="item.collect" :src="collectImg" @click="handleCollect(item, false)" alt="" width="100%" />
						<VantLazyImg v-else :src="noCollectImg" alt="" @click="handleCollect(item, true)" width="100%" />
					</div>
					<VantLazyImg :src="item.icon" :loadingSrc="loadingSrc" :errorSrc="loadingSrc" alt="" width="100%" />
				</div>
			</swiper-slide>
		</Swiper>
	</div>
</template>

<script setup lang="ts">
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
	getGameInfoDetail();
});

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
		emit("queryCollection");
	}
};
const handleClickCard = (item) => {
	// dialogShow.value = true;
};
</script>

<style lang="scss">
@import "./HotGame.scss";
</style>
