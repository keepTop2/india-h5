<template>
	<div class="GameSwiper">
		<Swiper :modules="modules" class="mySwiper" slidesPerView="auto">
			<swiper-slide v-for="(item, index) in gameList?.gameInfoList" :key="index" class="mr_20">
				<div class="card" @click="Common.goToGame(item)">
					<div class="collect">
						<VantLazyImg v-if="item.collect" @click="onClickCollect(item, false)" :src="collectImg" alt="" width="100%" />
						<VantLazyImg v-else @click="onClickCollect(item, true)" :src="noCollectImg" alt="" width="100%" />
					</div>
					<VantLazyImg :src="item.iconFileUrl" alt="" width="100%" class="gameIcon" />
					<div class="message">
						<span class="gameName color_TB fs_28 fw_600">
							{{ item.name }}
							<!-- <SvgIcon iconName="tips" /> -->
						</span>
						<!-- <span class="money color_T1">{{ unit }}{{ money }}</span> -->
					</div>
				</div>
			</swiper-slide>
		</Swiper>
	</div>
</template>

<script setup lang="ts">
/**
 * @description 游戏大厅 热门游戏布局
 */
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { gameList } from "./mock";
import gameImg from "./images/gameImg.png";
import collectImg from "./images/collect.png";
import noCollectImg from "./images/noCollect.png";
import GameApi from "/@/api/venueHome/games";
import Common from "/@/utils/common";
const modules = ref([Autoplay, Pagination, Navigation]); //swiper配置项

const dialogShow = ref(false);
const props = defineProps({
	slidesPerView: {
		type: Number,
		default: 4,
	},
	spaceBetween: {
		type: Number,
		default: 10,
	},
	gameList: {
		type: Object,
		default: () => {},
	},
});
const handleClickCard = (data) => {
	// dialogShow.value = true;
};

const onClickCollect = async (item, collect) => {
	const res = await GameApi.gameCollection({
		gameId: item.id,
		type: collect,
	});
	if (res.ok) {
		item.collect = collect;
	}
};
</script>

<style scoped lang="scss">
@import "./HotGame.scss";
.gameIcon {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
