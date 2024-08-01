<template>
	<div class="my_container">
		<NavBar />
		<!-- <NoLogin /> -->

		<!-- 用户信息 -->
		<div class="user">
			<div class="avatar">
				<VantLazyImg :src="avatar" />
			</div>
			<span class="user_name">Athena LEE</span>
			<div class="user_id">
				<span>ID: 455454</span>
			</div>
		</div>

		<!-- vip -->
		<div class="vip_container">
			<VantLazyImg class="vip_big" :src="vip_big" />
			<div class="vip_info">
				<span class="vip_level">VIP0</span>
				<span class="vip_experience">升级所需经验: <span class="warn">200</span> / <span>500</span></span>
				<SvgIcon class="arrow" iconName="/my/arrow" />
			</div>
			<div class="vip_progress">
				<div class="vip_icon">
					<VantLazyImg class="vip_bg" :src="vip_icon_1" />
					<span class="vip_level">LV0</span>
				</div>
				<div class="progress_bar">
					<div class="progress">
						<VantLazyImg class="vip_jdt" :src="vip_jdt" />
					</div>
				</div>
				<div class="vip_icon">
					<VantLazyImg class="vip_bg" :src="vip_icon_1" />
					<span class="vip_level">LV99</span>
				</div>
			</div>
		</div>

		<div class="my-content">
			<!-- 勋章 -->
			<div class="medal">
				<div class="medal_header">
					<VantLazyImg class="line" :src="line" />
					<div class="label">勋章</div>
					<SvgIcon class="arrow" iconName="/common/arrow" />
				</div>
				<div class="medal_content">
					<template v-for="item in 6">
						<VantLazyImg class="medal" :src="medal" />

						<div class="btn"></div>
						<!-- <div class="btn"></div>
						<div class="btn"></div> -->
					</template>
				</div>
			</div>
			<!-- 总余额 -->
			<div class="balance_operation">
				<div class="balance_header">
					<VantLazyImg class="line" :src="line" />
					<div class="label">总余额</div>
					<div class="value">100.00</div>
				</div>
				<div class="balance_content">
					<div class="balance_item" v-for="item in balanceOperationList">
						<VantLazyImg class="balance_icon" :src="item.icon" />
						<div class="label">{{ item.name }}</div>
					</div>
				</div>
			</div>

			<div class="group">
				<div class="cell van-haptics-feedback" v-for="(item, index) in menuData.group1" :key="index" @click="onClickCell(item)">
					<SvgIcon class="icon" :iconName="item.icon" />
					<div class="label">{{ item.name }}</div>
					<div class="value">{{ item.value }}</div>
					<SvgIcon class="arrow" iconName="/common/arrow" />
				</div>
			</div>

			<div class="group">
				<div class="cell van-haptics-feedback" v-for="(item, index) in menuData.group2" :key="index" @click="onClickCell(item)">
					<SvgIcon class="icon" :iconName="item.icon" />
					<div class="label">{{ item.name }}</div>
					<div class="value">{{ item.value }}</div>
					<SvgIcon class="arrow" iconName="/common/arrow" />
				</div>
				<div class="cell">
					<SvgIcon class="icon" iconName="/my/theme" />
					<div class="label">{{ $t('my["主题"]') }}</div>
					<SvgIcon class="themeChange_icon" iconName="/my/themeChange" />
				</div>
			</div>

			<!-- 退出按钮 -->
			<div class="login_out_btn" @click="loginOut">登出</div>
		</div>

		<!-- 邀请好友 -->
		<InviteFriends />

		<!-- 退出弹窗 -->
		<van-popup v-model:show="loginOutShow" position="bottom">
			<header>
				<span class="label">登出</span>
				<SvgIcon class="close_icon" iconName="/common/close" @click="loginOutShow = false" />
			</header>
			<div class="content">您确定要退出登录吗?</div>
			<div class="btns">
				<div class="btn1" @click="loginOutShow = false">取消</div>
				<div class="btn2">登出</div>
			</div>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import NavBar from "/@/views/my/components/navBar.vue";
import NoLogin from "/@/views/my/components/noLogin.vue";
import InviteFriends from "/@/views/my/components/inviteFriends.vue";
import pubsub from "/@/pubSub/pubSub";

import avatar from "/@/assets/zh-CN/default/my/avatar.png";
import vip_big from "/@/assets/zh-CN/default/vip/vip_big.png";
import vip_icon_1 from "/@/assets/zh-CN/default/vip/vip_icon_1.png";
import vip_jdt from "/@/assets/zh-CN/default/my/vip_jdt.png";
import line from "/@/assets/zh-CN/default/common/line.png";
import medal from "/@/assets/zh-CN/default/my/medal.png";
import balance_operation_ck from "/@/assets/zh-CN/default/my/balance_operation_ck.png";
import balance_operation_tx from "/@/assets/zh-CN/default/my/balance_operation_tx.png";
import balance_operation_jy from "/@/assets/zh-CN/default/my/balance_operation_jy.png";
import balance_operation_tz from "/@/assets/zh-CN/default/my/balance_operation_tz.png";

const balanceOperationList = [
	{
		name: "存款",
		icon: balance_operation_ck,
		path: "",
	},
	{
		name: "提现",
		icon: balance_operation_tx,
		path: "",
	},
	{
		name: "交易",
		icon: balance_operation_jy,
		path: "",
	},
	{
		name: "投注记录",
		icon: balance_operation_tz,
		path: "",
	},
];

const menuData = {
	group1: [
		{
			name: "安全中心",
			icon: "/my/aqzx",
			value: "",
			path: "",
		},
		{
			name: "邀请好友",
			icon: "/my/yqhy",
			value: "",
			path: "/inviteFriends",
		},
		{
			name: "代理联盟",
			icon: "/my/dllm",
			value: "",
			path: "",
		},
	],
	group2: [
		{
			name: "意见反馈",
			icon: "/my/yjfk",
			value: "",
			path: "",
		},
		{
			name: "主货币",
			icon: "/my/zhb",
			value: "",
			path: "",
		},
		{
			name: "语言",
			icon: "/my/lang",
			value: "",
			path: "",
		},
		{
			name: "版本号",
			icon: "/my/beh",
			value: "",
			path: "",
		},
	],
};

const loginOutShow = ref(false);

const onClickCell = (item) => {
	if (item.path == "/inviteFriends") {
		pubsub.publish("onOpenInviteFriend");
	}
};

const loginOut = () => {
	loginOutShow.value = true;
};
</script>

<style scoped lang="scss">
.user {
	display: grid;
	column-gap: 20px;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto auto;
	margin-top: 32px;
	padding: 0px 40px;
	.avatar {
		width: 104px;
		height: 104px;
		grid-column: 1;
		grid-row: 1 / span 2;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.user_name {
		align-self: center;
		@include themeify {
			color: themed("TB");
		}
		font-family: Inter;
		font-size: 32px;
		font-weight: 500;
	}
	.user_id {
		width: fit-content;
		height: 40px;
		padding: 0px 20px;
		display: flex;
		align-items: center;
		align-self: center;
		border-radius: 20px;
		border: 1px solid;
		@include themeify {
			color: themed("T1");
			border-color: themed("BG3");
		}
		background-color: rgba(57, 59, 62, 0.2);
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
		box-sizing: border-box;
	}
}

.vip_container {
	position: relative;
	height: 200px;
	margin: 44px 24px 0px;
	background: url("/@/assets/zh-CN/default/my/vip_bg.png") center center / 100% 100% no-repeat;

	.vip_big {
		position: absolute;
		top: -46px;
		right: 36px;
		width: 140px;
		height: 132px;
	}

	.vip_info {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 40px 58px 0px;
		.vip_level {
			text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			font-family: "112-SS Yi Fang Ti";
			font-size: 46px;
			font-style: normal;
			font-weight: 400;
			line-height: 40px;
			background: linear-gradient(250deg, #fdfdfd 6.39%, #bebebe 35.7%, #fdfdfd 66.76%, #979797 93.89%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.vip_experience {
			@include themeify {
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
		.arrow {
			width: 12px;
			height: 20px;
		}
	}
	.vip_progress {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 26px 58px 0px;
		.vip_icon {
			position: relative;
			width: 92px;
			height: 40px;
			.vip_bg {
				width: 92px;
				height: 40px;
			}
			.vip_level {
				position: absolute;
				bottom: 2px;
				right: 0px;
				width: 50px;
				height: 24px;
				display: flex;
				align-items: center;
				justify-content: center;
				@include themeify {
					color: themed("TB");
				}
				font-family: "112-SS Yi Fang Ti";
				font-size: 16px;
				font-weight: 400;
			}
		}
		.progress_bar {
			position: relative;
			flex: 1;
			height: 16px;
			margin-top: 16px;
			background: url("../../assets/zh-CN/default/my/progressBar_bg.png") center center / 100% 100% no-repeat;

			.progress {
				position: absolute;
				width: 0%;
				min-width: calc(40px);
				max-width: calc(100% - 4px);
				height: calc(100% - 4px);
				margin: 2px;
				border-radius: 8px;
				@include themeify {
					background-color: themed("Theme");
				}

				.vip_jdt {
					position: absolute;
					top: 56%;
					right: 0px;
					transform: translate(0, -50%);
					width: 40px;
					height: 22px;
				}
			}
		}
	}
}

.my-content {
	position: relative;
	margin-top: -20px;
	padding-top: 24px;
	@include themeify {
		background-color: themed("BG1");
	}
	border-radius: 20px 0px;
	z-index: 1;

	.medal,
	.balance_operation {
		margin: 0px 24px;
		border-radius: 20px;
		overflow: hidden;
		@include themeify {
			background-color: themed("BG3");
		}

		.medal_header,
		.balance_header {
			position: relative;
			height: 68px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0px 19px 0px 24px;
			border-radius: 20px 20px 0px 0px;
			background: linear-gradient(90deg, rgba(73, 86, 100, 0.4) 0%, rgba(44, 45, 46, 0.4) 100%);

			.line {
				position: absolute;
				top: 50%;
				left: 0px;
				transform: translate(0, -50%);
				width: 6px;
				height: 32px;
			}

			.label {
				@include themeify {
					color: themed("TB1");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 600;
			}

			.value {
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}

			.arrow {
				width: 24px;
				height: 24px;
			}
		}
		.medal_content {
			display: flex;
			padding: 28px 15px;
		}
		.balance_content {
			display: flex;
			padding: 32px 6px;
			.balance_item {
				flex: 1;
				padding: 0px 10px;
				text-align: center;

				.balance_icon {
					width: 60px;
					height: 52px;
					margin: 0 auto;
				}

				.label {
					margin-top: 8px;
					@include themeify {
						color: themed("T1");
					}
					font-family: "PingFang SC";
					font-size: 28px;
					font-weight: 400;
				}
			}
		}
	}
	.balance_operation {
		margin: 24px 24px 0px;
	}

	.group {
		margin: 24px;
		border-radius: 16px;
		@include themeify {
			background-color: themed("BG3");
		}
		.cell {
			position: relative;
			width: 100%;
			height: 88px;
			display: flex;
			gap: 14px;
			align-items: center;
			justify-content: space-between;
			padding: 0px 19px 0px 24px;
			box-sizing: border-box;

			&::after {
				content: "";
				position: absolute;
				bottom: 0px;
				right: 24px;
				width: 606px;
				height: 1px;
				@include themeify {
					background-color: themed("Line");
				}
			}
			&:last-child::after {
				display: none;
			}

			.icon {
				width: 34px;
				height: 34px;
			}
			.label {
				flex: 1;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
			.value {
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}
			.arrow {
				width: 24px;
				height: 24px;
			}
			.themeChange_icon {
				width: 99px;
				height: 46px;
			}
		}
	}
	.login_out_btn {
		height: 86px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 35px 24px 58px;
		border-radius: 20px;
		@include themeify {
			background-color: themed("BG3");
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 400;
	}
}

:deep(.van-overlay) {
	background: rgba(24, 24, 24, 0.73);
}
.van-popup {
	padding: 24px 48px 40px;
	border-radius: 16px 16px 0px 0px;
	@include themeify {
		background-color: themed("BG1");
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.label {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 32px;
			font-weight: 600;
		}
		.close_icon {
			width: 32px;
			height: 32px;
		}
	}
	.content {
		margin-top: 15px;
		@include themeify {
			color: themed("T1");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
	}
	.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 54px;
		margin-top: 30px;
		.btn1 {
			flex: 1;
			height: 86px;
			display: flex;
			align-items: center;
			justify-content: center;
			@include themeify {
				border-color: themed("Theme");
				color: themed("Theme");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 400;
			border-radius: 16px;
			border: 1px solid;
		}
		.btn2 {
			flex: 1;
			height: 86px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 16px;
			@include themeify {
				background-color: themed("Theme");
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 400;
		}
	}
}
</style>
