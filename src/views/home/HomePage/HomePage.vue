<template>
	<div class="content">
		<!-- 轮播图 -->
		<Banner />
		<!-- 最近大奖游戏 -->
		<h3 class="title">
			<VantLazyImg :src="bigwinsIcon" alt="" />
			{{ $t('home["最近大奖游戏"]') }}
		</h3>
		<GameSwiper class="m32" />
		<div class="line_home"></div>
		<!-- 路由跳转，体育、彩票、赌场 -->
		<div class="Options m32">
			<ul>
				<li v-for="(item, index) in optionList" :key="item.key" @click="handleChangeTab(item.key)">
					<VantLazyImg :src="item.imageUrl" width="100%" alt="" />
				</li>
			</ul>
		</div>
		<div class="line_home"></div>
		<!-- 最近投注比赛 -->
		<h3 class="title">
			<SvgIcon iconName="clock" alt="" />
			{{ $t('home["最近投注比赛"]') }}
		</h3>
		<BettingMatches class="m32" />
		<div class="line_home"></div>
		<div class="onlineCasino">
			<VantLazyImg :src="encryption" width="100%" alt="" />
			<p v-text="$t(`home['赌场描述']`)"></p>
			<router-link :to="casinoDescriptionRoute" class="more">{{ $t('home["查看更多"]') }} <SvgIcon iconName="arrowRight" /></router-link>
		</div>
		<div class="line_home"></div>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import Banner from "../components/Banner/banner.vue";
import GameSwiper from "./components/GameSwiper/GameSwiper.vue";
import BettingMatches from "./components/BettingMatches/BettingMatches.vue";
import bigwinsIcon from "../static/images/bigWins.png";
import Footer from "/@/components/Footer/footer.vue";
import encryption from "../static/images/encryption.png";
import gamblingHouse from "../static/images/gamblingHouse.png";
import lottery from "../static/images/lottery.png";
import sports from "../static/images/sports.png";

const optionList = [
	{
		name: "体育",
		message: "赛事最全 赔率最高",
		imageUrl: sports,
		key: 2,
	},
	{
		name: "彩票",
		message: "赛事最全 赔率最高",
		imageUrl: lottery,
		key: 3,
	},
	{
		name: "赌场",
		message: "赛事最全 赔率最高",
		imageUrl: gamblingHouse,
		key: 1,
	},
];
const emit = defineEmits(["handleChangeTab"]);

const handleChangeTab = (val) => {
	emit("handleChangeTab", val);
};

const casinoDescriptionRoute = { path: "/casino/description" };
</script>

<style lang="scss" scoped>
@import "./HomePage.scss";
</style>
