<template>
	<div class="Home_Page bg_BG1">
		<!-- 轮播图 -->
		<Banner class="Home_Banner" />
		<div class="Home_Content">
			<!-- 热门游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/fire" alt="" />
				{{ $t('home["热门游戏"]') }}
			</h3>
			<HotGame class="m24" />
			<!-- 收藏游戏 -->
			<h3 class="title">
				<SvgIcon iconName="home/star" alt="" />
				{{ $t('home["收藏游戏"]') }}
			</h3>
			<CollectGames class="m24" />
			<h3 class="title">
				<SvgIcon iconName="home/clock" alt="" />
				{{ $t('home["收藏游戏"]') }}
			</h3>
			<BettingMatches class="m24" />
			<div class="line_home"></div>
			<div class="onlineCasino">
				<VantLazyImg :src="encryption" width="100%" alt="" />
				<p v-text="$t(`home['赌场描述']`)"></p>
				<router-link :to="casinoDescriptionRoute" class="more">{{ $t('home["查看更多"]') }} <SvgIcon iconName="common/arrowRight" /></router-link>
			</div>
			<div class="line_home"></div>
			<!-- <Footer /> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import Banner from "../components/Banner/banner.vue";
import HotGame from "./components/HotGame/HotGame.vue";
import CollectGames from "./components/CollectGames/CollectGames.vue";
import BettingMatches from "./components/BettingMatches/BettingMatches.vue";
// import Footer from "/@/components/Footer/footer.vue";
import encryption from "../static/images/encryption.png";
const casinoDescriptionRoute = { path: "/casino/description" };
</script>

<style lang="scss" scoped>
@import "./HomePage.scss";
</style>
