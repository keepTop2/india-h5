<template>
	<div class="my_container">
		<NavBar />
		<NoLogin v-if="!store.token" />

		<!-- 用户信息 -->
		<template v-else>
			<div class="user">
				<div class="avatar">
					<VantLazyImg :src="theme === ThemeEnum.default ? avatar : avatar_light" />
				</div>
				<span class="user_name">{{ store.userInfo.userAccount }}</span>
				<div class="user_id">
					<span>ID: {{ store.userInfo.userId }}</span>
					<div class="icon" @click="common.getInstance().copy(store.userInfo.userId)"><SvgIcon iconName="common/copy" /></div>
				</div>
			</div>

			<!-- vip -->
			<div class="vip_container">
				<!-- <VantLazyImg class="vip_big" :src="vip_big" /> -->
				<span class="vip_level">{{ state.userVipInfo.vipGradeName }}</span>
				<div class="vip_info">
					<span class="vip_experience"
						>升级所需经验: <span class="color_Warn">{{ state.userVipInfo.currentVipExp }}</span> / <span>{{ state.userVipInfo.upgradeVipExp }}</span></span
					>
					<SvgIcon class="arrow" iconName="my/arrow" @click="toPath('/vip')" />
				</div>
				<!-- VIP进度条 -->
				<Progress class="vip_progress" :userVipInfo="state.userVipInfo" />
			</div>

			<div class="my-content">
				<!-- 勋章 -->
				<div class="medal">
					<div class="medal_header" @click="toPath('/medalCollection')">
						<VantLazyImg class="line" :src="line" />
						<div class="label">勋章</div>
						<div class="badge" v-if="state.medalQuantity > 0">{{ state.medalQuantity }}</div>
						<SvgIcon class="arrow" iconName="common/arrow" />
					</div>
					<div class="medal_content">
						<div class="item" :class="{ item_bg: item.lockStatus == 1 }" v-for="(item, index) in state.medalListData" :key="index" @click="onLightUpMedal(item)">
							<template v-if="item.lockStatus === 0">
								<i></i>
								<div class="bg"></div>
								<VantLazyImg class="medal_icon1" :src="item.lockStatus == 0 || item.lockStatus == 2 ? item.inactivatedPicUrl : item.activatedPicUrl" :class="{ animation: item.lockStatus === 0 }" />
							</template>
							<VantLazyImg class="medal_icon" :src="item.lockStatus == 0 || item.lockStatus == 2 ? item.inactivatedPicUrl : item.activatedPicUrl" v-else />
						</div>
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
						<div class="balance_item" v-for="item in balanceOperationList" @click="onClickCell(item)">
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
						<SvgIcon class="arrow" iconName="common/arrow" />
					</div>
				</div>

				<div class="group">
					<div class="cell van-haptics-feedback" v-for="(item, index) in menuData.group2" :key="index" @click="onClickCell(item)">
						<SvgIcon class="icon" :iconName="item.icon" />
						<div class="label">{{ item.name }}</div>
						<div class="value">{{ item.value }}</div>
						<SvgIcon v-if="item.arrow" class="arrow" iconName="common/arrow" />
					</div>
					<div class="cell">
						<SvgIcon class="icon" iconName="my/theme" />
						<div class="label">{{ $t('my["主题"]') }}</div>
						<SvgIcon class="themeChange_icon" :iconName="theme === ThemeEnum.default ? '/my/themeChange' : '/my/themeChange_light'" @click="changeTheme" />
					</div>
				</div>

				<!-- 退出按钮 -->
				<div class="login_out_btn" @click="loginOut">登出</div>
			</div>
		</template>

		<!-- 邀请好友 -->
		<InviteFriends />

		<!-- 退出弹窗 -->
		<van-popup v-model:show="loginOutShow" position="bottom">
			<header>
				<span class="label">登出</span>
				<SvgIcon class="close_icon" iconName="common/close" @click="loginOutShow = false" />
			</header>
			<div class="content">您确定要退出登录吗?</div>
			<div class="btns">
				<div class="btn1" @click="loginOutShow = false">取消</div>
				<div class="btn2" @click="onLoginOut">登出</div>
			</div>
		</van-popup>

		<!-- 交易密码弹窗提示 -->
		<Model v-model:modelValue="isPasswordModal">
			<template #header>
				<div class="header">{{ $t('withdraw["温馨提示"]') }}</div>
			</template>
			<template #default>
				<div class="content">
					<p class="text">{{ $t('withdraw["您还未设置交易密码，请先设置交易密码"]') }}</p>
				</div>
			</template>
			<template #footer>
				<div class="footer">
					<div class="cancel" @click="onCancelPassWord">{{ $t('withdraw["取消"]') }}</div>
					<div class="confirm" @click="toPath('/setTradingPassword')">{{ $t('withdraw["去设置"]') }}</div>
				</div>
			</template>
		</Model>

		<!-- 手机号弹窗提示 -->
		<Model v-model:modelValue="isPhoneModal">
			<template #header>
				<div class="header">{{ $t('withdraw["温馨提示"]') }}</div>
			</template>
			<template #default>
				<div class="content">
					<p class="text">{{ $t('withdraw["您还未绑定手机号，请先绑定手机号"]') }}</p>
				</div>
			</template>
			<template #footer>
				<div class="footer">
					<div class="cancel" @click="isPhoneModal = false">{{ $t('withdraw["取消"]') }}</div>
					<div class="confirm" @click="toPath('/bind/phone')">{{ $t('withdraw["去设置"]') }}</div>
				</div>
			</template>
		</Model>
	</div>
</template>

<script setup lang="ts">
import { medalApi } from "/@/api/my";
import { walletApi } from "/@/api/wallet";
import { vipApi } from "/@/api/vip";
import { useThemesStore } from "/@/store/modules/themes";
import { UserCenterMedalDetailRespVoList } from "./interface";
import { VIP } from "/@/views/vip/interface";
import { ThemeEnum } from "/@/enum/appConfigEnum";
import common from "/@/utils/common";
import NavBar from "/@/views/my/components/navBar.vue";
import NoLogin from "/@/views/my/components/noLogin.vue";
import Progress from "/@/views/vip/components/vipProgress.vue";
import InviteFriends from "/@/views/my/components/inviteFriends.vue";
import pubsub from "/@/pubSub/pubSub";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
import avatar from "/@/assets/zh-CN/default/my/avatar.png";
import avatar_light from "/@/assets/zh-CN/light/my/avatar.png";
import line from "/@/assets/zh-CN/default/common/line.png";
import balance_operation_ck from "/@/assets/zh-CN/default/my/balance_operation_ck.png";
import balance_operation_tx from "/@/assets/zh-CN/default/my/balance_operation_tx.png";
import balance_operation_jy from "/@/assets/zh-CN/default/my/balance_operation_jy.png";
import balance_operation_tz from "/@/assets/zh-CN/default/my/balance_operation_tz.png";
import { i18n } from "/@/i18n/index";
import { loginApi } from "/@/api/loginRegister";
import Model from "/@/views/wallet/components/model.vue";
import { showToast } from "vant";
const $: any = i18n.global;
const router = useRouter();
const store = useUserStore();
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);
const loginOutShow = ref(false);
const isPasswordModal = ref(false);
const isPhoneModal = ref(false);
const balanceOperationList = [
	{
		name: $.t("my['存款']"),
		icon: balance_operation_ck,
		path: "/wallet/recharge",
		verify: true,
	},
	{
		name: $.t("my['提款']"),
		icon: balance_operation_tx,
		path: "/wallet/withdraw",
		verify: true,
	},
	{
		name: $.t("my['交易']"),
		icon: balance_operation_jy,
		path: "",
	},
	{
		name: $.t("my['投注记录']"),
		icon: balance_operation_tz,
		path: "",
	},
];

const menuData = {
	group1: [
		{
			name: $.t("my['安全中心']"),
			icon: "/my/aqzx",
			value: "",
			path: "/securityCenter",
		},
		{
			name: $.t("my['邀请好友']"),
			icon: "/my/yqhy",
			value: "",
			path: "/inviteFriends",
		},
		{
			name: $.t("my['代理联盟']"),
			icon: "/my/dllm",
			value: "",
			path: "",
		},
	],
	group2: [
		{
			name: $.t("my['意见反馈']"),
			icon: "/my/yjfk",
			value: "",
			path: "/feedback",
			arrow: true,
		},
		{
			name: $.t("my['主货币']"),
			icon: "/my/zhb",
			value: store.userInfo.mainCurrency,
			path: "",
			arrow: false,
		},
		{
			name: $.t("my['语言']"),
			icon: "/my/lang",
			value: store.langName,
			path: "/language",
			arrow: true,
		},
	],
};

let state = reactive({
	userVipInfo: {} as VIP,
	medalQuantity: 0 as number,
	medalListData: [] as UserCenterMedalDetailRespVoList[],
	securityCenter: {},
});

onMounted(() => {
	if (store.token) {
		topNList();
		getUserVipInfo();
	}
});

// 获取VIP信息
const getUserVipInfo = async () => {
	const res = await vipApi.getUserVipInfo().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.userVipInfo = res.data;
	}
};

// 获取勋章信息
const topNList = async () => {
	const res = await medalApi.topNList().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.medalQuantity = res.data.canLightNum;
		state.medalListData = res.data.userCenterMedalDetailRespVoList;
	}
};

const onClickCell = async (item) => {
	if (!item.path) return;
	if (item.path === "/inviteFriends") {
		pubsub.publish("onOpenInviteFriend");
		return;
	}
	// 如果 item 不需要验证，直接跳转
	if (!item.verify) {
		toPath(item.path);
		return;
	}
	// 处理提款路径的逻辑
	if (item.path === "/wallet/withdraw") {
		const { isSetPwd, phone } = store.getUserInfo;
		if (isSetPwd || phone) {
			const res = await walletApi.withdrawWayList().catch((err) => err);
			if (res.code === common.getInstance().ResCode.SUCCESS && (!res.data || res.data.length === 0)) {
				showToast($.t("my['暂无提款方式']"));
				return;
			}
			toPath(item.path);
		} else {
			isPasswordModal.value = true;
		}
		return;
	}
	// 处理充值路径的逻辑
	if (item.path === "/wallet/recharge") {
		const res = await walletApi.rechargeWayList().catch((err) => err);
		if (res.code === common.getInstance().ResCode.SUCCESS && (!res.data || res.data.length === 0)) {
			showToast($.t("my['暂无存款方式']"));
			return;
		}
		toPath(item.path);
		return;
	}
	// 如果是其他路径，直接跳转
	toPath(item.path);
};

// 取消设置交易密码
const onCancelPassWord = () => {
	isPasswordModal.value = false;
	const { phone } = store.getUserInfo;
	if (!phone) {
		isPhoneModal.value = true;
	}
};

const changeTheme = () => {
	themesStore.setTheme(theme.value === ThemeEnum.light ? ThemeEnum.default : ThemeEnum.light);
};

const toPath = (path) => {
	router.push(path);
};

const onLoginOut = () => {
	loginApi
		.logout()
		.then(() => {})
		.finally(() => {
			store.clearInfo();
			router.push("/login");
		});
};

// 点亮勋章
const onLightUpMedal = async (item) => {
	if (item.lockStatus !== 0) {
	} else {
		const params = {
			medalCode: item.medalCode,
		};
		const res = await medalApi.lightUpMedal(params).catch((err) => err);
		if (res.code == common.getInstance().ResCode.SUCCESS) {
			topNList();
		}
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
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 500;
	}
	.user_id {
		width: fit-content;
		height: 40px;
		padding: 0px 20px;
		display: flex;
		column-gap: 10px;
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

		.icon {
			width: 28px;
			height: 28px;
			display: flex;
			align-items: center;
			svg {
				width: 24px;
				height: 24px;
			}
		}
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

	.vip_level {
		padding: 22px 58px 0px;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-family: "112-SS Yi Fang Ti";
		font-size: 46px;
		font-style: normal;
		font-weight: 400;
		line-height: 40px;
		background: linear-gradient(90deg, #fdfdfd 6.39%, #bebebe 35.7%, #fdfdfd 66.76%, #979797 93.89%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
	}

	.vip_info {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 11px 58px 0px;

		.vip_experience {
			@include themeify {
				color: themed("TB1");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
		.arrow {
			width: 24px;
			height: 24px;
			@include themeify {
				color: themed("T1");
			}
			svg {
				vertical-align: top;
			}
		}
	}

	.vip_progress {
		padding: 12px 58px 0px;
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
			@include themeify {
				background: themed("my-header");
			}

			.line {
				position: absolute;
				top: 50%;
				left: 0px;
				transform: translate(0, -50%);
				width: 6px;
				height: 32px;
			}

			.label {
				flex: 1;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 600;
			}

			.badge {
				min-width: 28px;
				height: 28px;
				padding: 0 5px;
				margin-right: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				@include themeify {
					background-color: themed("Theme");
					color: themed("TB");
				}

				font-family: Inter;
				font-size: 22px;
				font-weight: 500;
				box-sizing: border-box;
			}

			.value {
				@include themeify {
					color: themed("T3");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}

			.arrow {
				width: 24px;
				height: 24px;
				@include themeify {
					color: themed("T1");
				}
			}
		}
		.medal_content {
			display: flex;
			min-height: 92px;
			padding: 22px 25px;
			gap: 20px;
			.item {
				position: relative;
				width: 92px;
				height: 92px;
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 2;

				i {
					position: absolute;
					top: 4px;
					right: 4px;
					width: 16px;
					height: 16px;
					border: 2px solid #fff;
					border-radius: 50%;
					@include themeify {
						background: themed("Theme");
					}
					z-index: 1;
					box-sizing: border-box;
				}
				.bg {
					position: absolute;
					top: -17px;
					left: 50%;
					transform: translate(-50%, 0%);
					width: 132px;
					height: 132px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: url("./image.png");
					background-position-x: center;
					background-position-y: bottom;
					background-repeat: no-repeat;
					background-size: 132px 132px;
					/* 添加旋转和缩放动画 */
					animation: rotateIcon 4s linear infinite;
				}
				.medal_icon {
					width: 72px;
					height: 78px;
					z-index: 20;
				}
				.medal_icon1 {
					position: absolute;

					width: 72px;
					height: 78px;
					text-align: center;
				}
			}
			.animation {
				animation: scaleIcon 1.5s ease-in-out infinite;
			}
			.item_bg {
				width: 92px;
				height: 92px;
				background: url("/@/assets/zh-CN/default/my/medalCollection/highlight.png") no-repeat center bottom;
				background-size: 92px 92px;
			}
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
				font-size: 28px;
				font-weight: 400;
			}
			.arrow {
				width: 24px;
				height: 24px;
				@include themeify {
					color: themed("T1");
				}
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

.my_container {
	// 交易密码弹窗样式
	:deep(.modal-container) {
		width: 448px;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px;
			border-bottom: 1px solid;
			@include themeify {
				color: themed("TB");
				border-color: themed("Line");
			}
			/* Title1-标题1 */
			font-family: "PingFang SC";
			font-size: 32px;
			font-weight: 400;
			box-sizing: border-box;
		}

		.content {
			min-height: 190px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0px 46px;
			box-sizing: border-box;
			.text {
				@include themeify {
					color: themed("T1");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
		}

		.footer {
			position: relative;
			width: 100%;
			height: 76px;
			display: flex;
			gap: 1px;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid;
			@include themeify {
				border-color: themed("Line");
			}
			&::after {
				position: absolute;
				content: "";
				top: 0px;
				left: 50%;
				width: 1px;
				height: 100%;
				@include themeify {
					background-color: themed("Line");
				}
			}
			.cancel,
			.confirm {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 32px;
				font-weight: 400;
			}
			.confirm {
				@include themeify {
					color: themed("Theme");
				}
			}
		}
	}
}
/* 旋转动画 */
@keyframes rotateIcon {
	0% {
		transform: translate(-50%, 0%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, 0%) rotate(180deg);
	}
}

/* 缩放动画 */
@keyframes scaleIcon {
	0%,
	100% {
		transform: translate(0%, 0%) scale(1);
	}
	50% {
		transform: translate(0%, 0%) scale(1.13);
	}
}
:deep(.van-popover__content) {
	background: rgba(0, 0, 0, 0.7) !important;
	margin-right: 60px !important;
}
</style>
