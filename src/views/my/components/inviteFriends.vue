<template>
	<div>
		<van-popup v-model:show="inviteFriendsShow" position="bottom">
			<SvgIcon class="close_icon van-haptics-feedback" iconName="/common/close" @click="inviteFriendsShow = false" />
			<div class="invite">
				<div class="banner">
					<VantLazyImg class="icon" :src="icon" />
					<div class="value">{{ $t(`inviteFriends["邀请好友赚取海量奖金！"]`) }}</div>
				</div>
				<p>{{ $t(`inviteFriends["分享您的推荐链接："]`) }}</p>
				<input type="text" value="https://bc.game/i-bb442t-n/" readonly />
				<Button class="mt_32">{{ $t(`inviteFriends["复制链接"]`) }}</Button>
			</div>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import icon from "/@/assets/zh-CN/default/my/inviteFriends/icon.png";
import pubsub from "/@/pubSub/pubSub";

const inviteFriendsShow = ref(false);

const onOpenInviteFriend = () => {
	inviteFriendsShow.value = true;
};
pubsub.subscribe("onOpenInviteFriend", onOpenInviteFriend);
</script>

<style scoped lang="scss">
.van-popup {
	border-radius: 16px 16px 0px 0px;
	@include themeify {
		background-color: themed("BG1");
	}
	padding: 80px 24px;
}

.close_icon {
	position: absolute;
	top: 24px;
	right: 24px;
	width: 32px;
	height: 32px;
}

.invite {
	.banner {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 24px;
		padding: 24px;
		border-radius: 16px;
		background: var(--BG6-P, linear-gradient(90deg, #495867 0%, #6d7e90 100%));
		box-sizing: border-box;
		.icon {
			width: 140px;
			height: 140px;
		}
		.value {
			@include themeify {
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 36px;
			font-weight: 400;
		}
	}

	p {
		margin-top: 32px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 26px;
		font-style: normal;
		font-weight: 400;
		line-height: 36px; /* 138.462% */
		text-transform: uppercase;
	}
	input {
		margin-top: 12px;
		border: none;
		@include themeify {
			background-color: themed("BG3");
			color: themed("T1");
		}
		width: 100%;
		height: 64px;
		border-radius: 12px;
		text-align: center;
		font-family: "PingFang SC";
		font-size: 26px;
		font-style: normal;
		font-weight: 400;
		line-height: 36px; /* 138.462% */
	}
}
</style>
