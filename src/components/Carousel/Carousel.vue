<!-- 顶部轮播组件 -->

<template>
	<div class="Carousel">
		<!-- Swiper 组件用于创建轮播效果 -->
		<Swiper
			@swiper="setSwiperRef"
			:slidesPerView="slidesPerView"
			:slidesPerGroup="slidesPerGroup"
			:spaceBetween="spaceBetween"
			:pagination="paginationDom"
			:loop="true"
			:autoplay="{
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}"
			:modules="modules"
			class="Carousel__swiper"
		>
			<!-- 遍历 gameList 创建轮播项 -->
			<swiper-slide v-for="(item, index) in gameList" :key="index">
				<!-- 使用 VantLazyImg 组件实现图片懒加载 -->
				<VantLazyImg :src="item.icon || game" alt="" />
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
import game from "./banner.png";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// 定义 Swiper 使用的模块
const modules = ref([Autoplay, Pagination, Navigation]);

// 自定义分页配置
const paginationDom = {
	clickable: true, // 启用可点击的分页
	renderBullet: (index, className) => {
		return `<span class="${className}"><span></span></span>`; // 自定义分页小点的渲染
	},
};

// 定义 Game 类型
type Game = {
	icon: string;
};

// 组件属性定义
const props = defineProps({
	imageKey: {
		// image对应后端字段中的key
		type: String,
		default: "icon", // 默认图标key
	},
	gameList: {
		type: Array<Game>,
		default: [
				// 默认值
				{
					icon: "", // 默认图标
				},
				{
					icon: "", // 默认图标
				},
				{
					icon: "", // 默认图标
				},
		],
	},
	slidesPerView: {
		type: Number,
		default: 1, // 默认每个视图显示的幻灯片数
	},
	slidesPerGroup: {
		type: Number,
		default: 1, // 默认每组幻灯片数
	},
	spaceBetween: {
		type: Number,
		default: 12, // 默认幻灯片之间的间距
	},
	pagination: {
		type: Boolean,
		default: true, // 默认启用分页
	},
});

// 存储 Swiper 实例的引用
const SwiperRef = ref(); // Swiper 实例的引用

// 设置 Swiper 实例的引用
const setSwiperRef = (swiper: any) => {
	console.log("swiper", swiper);

	SwiperRef.value = swiper; // 设置 Swiper 实例的引用
};
</script>

<style lang="scss">
@import "./Carousel.scss";
</style>
