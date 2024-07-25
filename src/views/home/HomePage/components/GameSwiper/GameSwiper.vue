<template>
	<div class="GameSwiper">
		<Swiper
			:slidesPerView="slidesPerView"
			:spaceBetween="spaceBetween"
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
				<div @click="handleClickCard({ userName, unit, money, collect })">
					<div class="collect">
						<VantLazyImg v-if="collect" :src="collectImg" alt="" width="100%" />
						<VantLazyImg v-else :src="noCollectImg" alt="" width="100%" />
					</div>
					<VantLazyImg :src="gameImg" alt="" width="100%" />
					<div class="message">
						<span class="gameName">
							{{ userName }}
							<SvgIcon iconName="tips" />
						</span>
						<span class="money">{{ unit }}{{ money }}</span>
					</div>
				</div>
			</swiper-slide>
		</Swiper>
		<Dialog class="dialog" width="100%" :title="$t('home.投注单')" :visible="dialogShow" @close="dialogShow = false">
			<div class="content">
				<p class="color_T1 fs_32">{{ $t('home["奖金"]') }}</p>
				<p>
					<span class="money color_Theme fw_700 fs_48 flex">
						<VantLazyImg :src="icon" alt="" />
						800,000,00
					</span>
				</p>
				<div class="flex card">
					<div class="bg_BG3">
						<p class="color_T1 fs_32 fw_500">{{ $t('home["数量"]') }}</p>
						<p>
							<span class="money color_TB fw_700 fs_32 flex">
								<VantLazyImg class="size_20" :src="icon" alt="" />
								800,000,00
							</span>
						</p>
					</div>
					<div class="bg_BG3">
						<p class="color_T1 fs_32 fw_500">{{ $t('home["投注额"]') }}</p>
						<p class="color_TB fs_32 fw_700">10.25 x</p>
					</div>
				</div>
				<div class="flex userInfo">
					<VantLazyImg :src="userIcon" class="userIcon" alt="" />
					<div style="line-height: 24px">
						<h3 class="userName color_TB fw_600 fs_28">xxxxxx</h3>
						<p class="color_T1 fs_24 fw_400">2023/2/14 14:18:53</p>
						<p class="color_T1 fs_24 fw_400 flex">
							{{ $t('home["投注ID"]') }}: 351167332258811412
							<VantLazyImg :src="copy" class="size_32" @click="copyText('351167332258811412')" alt="" />
						</p>
					</div>
				</div>
				<div class="gameCard flex bg_BG3 p_24">
					<span class="gameInfo flex color_TB">
						<VantLazyImg :src="gameImg" alt="" />
						游戏名称
					</span>
					<span class="play">
						<VantLazyImg :src="play" alt="" />
					</span>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Dialog from "../../../components/Dialog/Dialog.vue";
import { gameList } from "./mock.ts";
import icon from "./images/icon.png";
import gameImg from "./images/gameImg.png";
import collectImg from "./images/collect.png";
import noCollectImg from "./images/noCollect.png";
import userIcon from "./images/userIcon.png";
import copy from "./images/copy.png";
import gamImg from "./images/gameImg.png";
import play from "./images/play.png";

const modules = ref([Autoplay, Pagination, Navigation]); //swiper配置项

const dialogShow = ref(false);
const cardInfo = ref({});
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
	// cardInfo.value = val;
};
const copyText = (val: string) => {
	navigator.clipboard.writeText(val);
};
</script>

<style lang="scss">
@import "./gameswiper.scss";
</style>
