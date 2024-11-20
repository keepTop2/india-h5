<!-- 顶部轮播组件 -->

<template>
	<div class="banner">
		<!-- Swiper 组件用于创建轮播效果 -->
		<Swiper
			@swiper="setSwiperRef"
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
			<swiper-slide v-for="(item, index) in bannerList" :key="index">
				<!-- 使用 VantLazyImg 组件实现图片懒加载 -->
				<VantLazyImg :src="item.h5IconFileUrl || item.iconFileUrl" alt="" />
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
	bannerList: [],
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
.banner {
	position: relative;
	height: 514px;
	.Carousel__swiper {
		height: 100%;
		.swiper-slide {
			border-radius: 10px;
			overflow: hidden;
			height: 100%;
		}
	}
	@include themeify {
		// margin-bottom: 56px;
		img {
			width: 100%;
			height: 100% !important;
		}
		.swiper-pagination {
			// position: relative;
			margin-bottom: 10px;
			height: 28px;
			display: flex;
			justify-content: center;
			align-items: center;
			.swiper-pagination-bullet {
				width: 24px;
				height: 24px;
				background: none;
				text-align: center;
				display: inline-block;
				border-radius: 24px;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					background-color: themed("TB");
					width: 12px;
					height: 12px;
					border-radius: 12px;
					display: inline-block;
					opacity: 0.7;
				}
			}
			.swiper-pagination-bullet-active {
				// width: 40px;
				border: 1px solid themed("Theme");
				span {
					background-color: themed("Theme");
					width: 20px;
					height: 20px;
					border-radius: 12px;
					display: inline-block;
					opacity: 0.7;
				}
			}
		}
	}
}
</style>
