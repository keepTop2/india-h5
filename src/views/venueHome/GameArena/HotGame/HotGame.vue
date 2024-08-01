<template>
	<div class="GameSwiper">
		<Swiper
			slidesPerView="auto"
			:loop="true"
			:autoplay="{
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}"
			:modules="modules"
			class="mySwiper"
		>
			<swiper-slide v-for="({ userName, unit, money, collect }, index) in gameList" :key="index">
				<div class="card" @click="handleClickCard({ userName, unit, money, collect })">
					<div class="collect">
						<VantLazyImg v-if="collect" :src="collectImg" alt="" width="100%" />
						<VantLazyImg v-else :src="noCollectImg" alt="" width="100%" />
					</div>
					<VantLazyImg :src="gameImg" alt="" width="100%" />
					<div class="message">
						<span class="gameName color_TB fs_28 fw_600">
							{{ userName }}
							<!-- <SvgIcon iconName="tips" /> -->
						</span>
						<span class="money color_T1">{{ unit }}{{ money }}</span>
					</div>
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
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { gameList } from "./mock";
import gameImg from "./images/gameImg.png";
import collectImg from "./images/collect.png";
import noCollectImg from "./images/noCollect.png";

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
});
const handleClickCard = () => {
	dialogShow.value = true;
};
</script>

<style lang="scss">
@import "./HotGame.scss";
</style>
