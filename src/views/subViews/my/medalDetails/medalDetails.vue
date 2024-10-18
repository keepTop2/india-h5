<template>
	<!-- 顶部导航栏 -->
	<VantNavBar :title="$t(`VantNavBar['勋章详情']`)" @onClickLeft="onClickLeft" />
	<div class="medalDetails_content">
		<div class="content" :class="theme">
			<div class="icon" :class="theme">
				<VantLazyImg :src="data.lockStatus == 1 ? data.activatedPicUrl : data.inactivatedPicUrl" />
			</div>
		</div>
		<div class="header">
			<span>{{ data.unlockTime }}</span>
			<span v-if="data.lockStatus == 1">{{ $t('medalDetails["获奖"]') }}</span>
		</div>
		<div class="describe" v-html="data.medalDescI18"></div>

		<div class="cell_list">
			<div class="cell">
				<div class="label">{{ $t('medalDetails["奖励"]') }}</div>
				<div class="value">{{ data.rewardAmount }} {{ useUserStore().getUserInfo.platCurrencyName }}</div>
			</div>
			<div class="cell">
				<div class="label">{{ $t('medalDetails["流水倍数"]') }}</div>
				<div class="value">{{ data.typingMultiple }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { NotUnlockList } from "../medalCollection/interface";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
const route = useRoute();
const router = useRouter();
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);
let data = reactive({} as NotUnlockList);
data = JSON.parse(decodeURIComponent(route.query.data as any));

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.medalDetails_content {
	min-height: 100vh;
	background: url("/@/assets/zh-CN/default/vip/vip_content_bg.png") center top / 100% 100% no-repeat;

	background-attachment: fixed; /* 背景图像固定 */
	box-sizing: border-box;
	.content {
		position: relative;
		width: 100%;
		height: 712px;
		@include theme-bg("/my/medalDetails/content_bg.png");
		background-position-x: center;
		background-position-y: top;
		background-repeat: no-repeat;
		background-size: 100% 712px;

		.icon {
			position: absolute;
			left: 50%;
			bottom: 27px;
			transform: translate(-50%, 0);
			width: 460px;
			height: 460px;
			display: flex;
			align-items: center;
			justify-content: center;
			@include theme-bg("/my/medalDetails/icon_bg.png");
			background-position-x: center;
			background-position-y: top;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			img {
				width: 328px;
				height: 360px;
			}
		}
	}
	.header {
		min-height: 34px;
		@include themeify {
			color: themed("TB");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 26px;
		font-weight: 600;
	}
	.describe {
		margin-top: 24px;
		word-wrap: break-word;
		@include themeify {
			color: themed("TB");
		}
		padding: 0 24px;
		text-align: center;
		font-family: "PingFang SC";
		font-size: 26px;
		font-weight: 400;
	}
	.cell_list {
		margin-top: 88px;
		.cell {
			height: 94px;
			margin: 0px 24px;
			padding: 0px 24px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid;
			@include themeify {
				border-color: themed("Line");
			}
			.label {
				@include themeify {
					color: themed("T1");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
			.value {
				@include themeify {
					color: themed("TB");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
		}
	}
}
</style>
