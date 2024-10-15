<template>
	<div class="navBar bg_BG1">
		<!-- <CollapseIcon class="collapseIcon van-haptics-feedback" @click="onCollapse" /> -->
		<SvgIcon class="collapseIcon van-haptics-feedback" iconName="common/collapse_icon_on" @click="onCollapse" size="44px" />
		<div v-if="!store.token" class="noLogin">
			<div class="register van-haptics-feedback" @click="router.push('/register')">{{ $t(`navBar["注册"]`) }}</div>
			<div class="login van-haptics-feedback" @click="router.push('/login')">{{ $t(`navBar["登录"]`) }}</div>
		</div>

		<div v-else class="account_info">
			<div class="userIcon">
				<img :src="userIcon" alt="" />
			</div>
			<div class="user">
				<div class="userName">{{ store.userInfo.userAccount }}</div>
				<div class="balance">{{ store.userInfo.platCurrencySymbol }}{{ common.getInstance().formatFloat(store.userInfo.totalBalance) }}</div>
			</div>
			<Notify />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "/@/store/modules/user";
import CollapseIcon from "/@/assets/zh-CN/default/common/collapse_icon.svg";
import userIcon from "/@/assets/zh-CN/default/common/userIcon.png";
import Notify from "/@/components/Notify/Notify.vue";
import common from "/@/utils/common";
import pubsub from "/@/pubSub/pubSub";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useUserStore();

const onCollapse = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};
</script>

<style scoped lang="scss">
.navBar {
	position: sticky;
	top: 0px;
	width: 100%;
	height: 88px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	// background: rgba(49, 49, 49, 0.5);
	z-index: 99;
	.collapseIcon {
		width: 64px;
		height: 64px;
		margin-left: 28px;
		@include themeify {
			color: themed("TB");
			stroke: themed("TB");
		}
	}

	.noLogin {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: end;
		.register {
			margin-right: 16px;
			padding: 8px 28px;
			border-radius: 12px;
			border: 2px solid;
			@include themeify {
				border-color: themed("T3");
				color: themed("TB");
			}
		}
		.login {
			margin-right: 24px;
			padding: 8px 28px;
			border-radius: 12px;
			border: 2px solid;
			@include themeify {
				border-color: themed("Theme");
				background: themed("Theme");
				color: themed("TB1");
			}
		}
		.register,
		.login {
			text-align: center;
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 600;
		}
	}

	.account_info {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 24px;
		.userIcon {
			img {
				width: 64.729px;
				padding-left: 20px;
			}
		}
		.user {
			flex: 1;
			margin-left: 18px;
			.userName {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 500;
			}
			.balance {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 600;
			}
		}
	}
}
</style>
