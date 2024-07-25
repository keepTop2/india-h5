<template>
	<div class="navBar">
		<CollapseIcon class="collapseIcon van-haptics-feedback" @click="onCollapse" />

		<div class="noLogin">
			<div class="register van-haptics-feedback">{{ $t(`navBar["注册"]`) }}</div>
			<div class="login van-haptics-feedback">{{ $t(`navBar["登录"]`) }}</div>
		</div>

		<!--<div class="account_info">
			<div class=""></div>
			<div class="user">
				<div class="userName">苏秦</div>
				<div class="balance">${{ common.getInstance().formatFloat(6000) }}</div>
			</div>
			<div class="notify">
				<div class="badge"></div>
				<Notify class="notifyIcon van-haptics-feedback" />
			</div>
		</div>-->
	</div>
</template>

<script setup lang="ts">
import CollapseIcon from "/@/assets/zh-CN/default/common/collapse_icon.svg";
import Notify from "/@/assets/zh-CN/default/common/notify.svg";
import common from "/@/utils/common";
import pubsub from "/@/pubSub/pubSub";

const onCollapse = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};
</script>

<style scoped lang="scss">
.navBar {
	position: fixed;
	top: 0px;
	width: 100%;
	height: 88px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(49, 49, 49, 0.5);

	.collapseIcon {
		width: 64px;
		height: 64px;
		margin-left: 24px;
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
			border: 2px solid var(--T3-P, #6d727a);
		}
		.login {
			margin-right: 24px;
			padding: 8px 28px;
			border-radius: 12px;
			border: 2px solid #ff4588;
			background: var(--Theme-P, #ff284b);
		}
		.register,
		.login {
			color: var(--TB-P, #fdfdfd);
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
		.user {
			flex: 1;
			margin-left: 18px;
			.userName {
				color: var(--TB-P, #fdfdfd);
				font-family: Inter;
				font-size: 24px;
				font-weight: 500;
			}
			.balance {
				margin-top: 1px;
				color: var(--TB-P, #fdfdfd);
				font-family: Inter;
				font-size: 28px;
				font-weight: 700;
			}
		}

		.notify {
			position: relative;
			width: 64px;
			height: 64px;
			margin-right: 24px;

			.badge {
				position: absolute;
				top: 6px;
				right: 6px;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background-color: var(--Theme-P, #ff284b);
			}

			.notifyIcon {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
