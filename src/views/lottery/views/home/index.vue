<template>
	<div class="lottery-home bg_BG1">
		<!-- 顶部搜素 -->
		<div class="navBar bg_BG1">
			<SvgIcon class="collapse_icon mt_14" iconName="common/collapse_icon_on" @click="onClickLeft" size="40px" />
			<div class="nav_bar_input bg_BG3">
				<SvgIcon iconName="venueHome/gameArena/search" />
				<input @focus="router.push('/lottery/search')" :placeholder="$t(`game['输入游戏名称']`)" type="text" class="color_T2" />
			</div>
		</div>
		<!-- 轮播图 -->
		<div class="banner">
			<Carousel :gameList="new Array(3).fill({ icon: '' })" />
		</div>

		<div class="containers">
			<!-- 热门推荐 -->
			<div class="module-card">
				<p class="module-card-title">热门推荐</p>
				<Swiper :modules="modules" class="mySwiper" slidesPerView="auto">
					<swiper-slide v-for="(item, index) in hotGames" :key="index" class="mr_20">
						<HotLotteryCard :data="item.data" />
					</swiper-slide>
				</Swiper>
			</div>
			<!-- 其他彩种 -->
			<div class="module-card" :key="item._key" v-for="item in gameData.filter((game) => game._key !== 1)">
				<p class="module-card-title">{{ item.name }}</p>
				<div class="module-item-box">
					<LotteryCard :data="game.data" :key="game.id" v-for="game in item.gameInfoList" />
				</div>
			</div>
		</div>
	</div>
	<TabBar />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import Carousel from "/@/components/Carousel/Carousel.vue";
import useLotteryCard from "/@/views/lottery/components/LotteryCard/Index";
import TabBar from "/@/layout/home/components/tabBar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import gameApi from "/@/api/venueHome/games";
import pubsub from "/@/pubSub/pubSub";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const modules = ref([Autoplay, Pagination, Navigation]); //swiper配置项

// 模拟数据，用于显示在页面头部
const mockData = {
	iconPc: "https://ctopalistat3.zengchenglm.com/pc/images/db_DB5FC2cea4e2f859029cdbda33fffda6ea1f2.png",
	gameName: "时时彩",
	gameDesc: "五分钟一期",
	seconds: 100,
	betStatusName: "投注中",
	issueNum: "20230812-084",
	maxWin: 5403.23,
};

const handleClick = (data) => {
	router.push("/lottery/shishicai");
};

const { HotLotteryCard, LotteryCard } = useLotteryCard({ onSelect: handleClick });

const onClickLeft = () => {
	// 发布折叠菜单事件
	pubsub.publish("onCollapseMenu");
};
const gameData = ref<any[]>([]);
const router = useRouter();
const route = useRoute();
const requestGames = async () => {
	const gameOneId = route.query.gameOneId;
	await gameApi
		.queryGameInfoByOneClassId({ gameOneId })
		.then((res) => {
			gameData.value = res.data.map((item: any) => {
				return {
					...item,
					_key: item.label == 1 ? 1 : item.label == 2 ? 2 : item.id,
					name: item.label == 1 ? "热门推荐" : item.label == 2 ? "新游戏" : item.name,
					gameInfoList: item.gameInfoList?.map((game) => ({ ...game, data: { ...game.data, seconds: Math.floor((game.data.lotteryDate - game.data.lotteryTime) / 1000) } })),
				};
			});
			console.log(gameData.value, "gameData.value");
		})
		.finally(() => {})
		.catch((err) => {
			err;
		});
};

const hotGames = computed(() => {
	const games = gameData.value
		.filter((game) => game._key === 1)
		?.map((game) => game.gameInfoList)
		.flatMap((game) => game);

	return games;
});

onMounted(() => {
	requestGames();
});
</script>

<style lang="scss" scoped>
.lottery-home {
	padding-bottom: 100px;
	.search_list_container {
		padding: 24px 26px;
		.game-grid {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
		}
	}

	.collapse_icon {
		width: 64px;
		height: 64px;
		@include themeify {
			stroke: themed("TB");
		}
	}

	.navBar {
		height: 88px;
		padding: 12px 28px;
		display: flex;
		box-sizing: border-box;
		position: sticky;
		top: 0;
		z-index: 2;
		@include themeify {
			box-shadow: 0px 4px 8px 0px themed("Shadow");
		}
		.nav_bar_input {
			display: flex;
			width: 600px;
			height: 64px;
			padding: 10px 24px;
			margin-left: 30px;
			display: flex;
			gap: 16px;
			border-radius: 12px;
			box-sizing: border-box;
			input {
				width: 500px;
				background: none;
				border: none;
				outline: none;
			}
			svg {
				width: 44px;
				height: 44px;
			}
		}
	}

	.banner {
		height: 428px;
	}
	.containers {
		padding: 24px;
		.module-item-box {
			border-radius: 20px;
			overflow: hidden;
			@include themeify {
				background-color: themed("BG2");
			}
			.lottery-card-item.lottery-card {
				border-radius: 0;
				&:last-child:after {
					display: none;
				}
			}
		}
		.module-card {
			margin-bottom: 24px;

			.module-card-title {
				font-size: 32px;
				font-weight: 600;
				margin-bottom: 24px;
				@include themeify {
					color: themed("TB");
				}
			}

			.mySwiper {
				.swiper-slide {
					width: 456px;
				}
			}
		}
	}
}
</style>
