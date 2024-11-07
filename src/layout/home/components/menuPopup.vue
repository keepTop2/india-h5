<template>
	<van-popup v-model:show="show" position="left">
		<div class="menu_header">
			<div>
				<SvgIcon iconName="common/collapse_icon" size="60px" @click="show = false" />
			</div>
			<div class="logo">
				<img :src="logo" alt="" />
			</div>
		</div>
		<div class="line"></div>
		<div class="menu_content">
			<div class="menu_content_header">
				<div class="task van-haptics-feedback" @click="toPath('/activity/TASK')">
					<div class="icon"><img :src="task_icon" alt="" /></div>
					<div class="label">{{ $t(`menuPopup["任务"]`) }}</div>
				</div>
				<div class="wheel van-haptics-feedback" @click="toPath('/activity/SPIN_WHEEL')">
					<div class="icon"><img :src="wheel_icon" alt="" /></div>
					<div class="label">{{ $t(`menuPopup["转盘"]`) }}</div>
				</div>
			</div>

			<div class="menu_list">
				<div class="menu van-haptics-feedback" @click="toPath('/activity/DAILY_COMPETITION')" v-if="activityTemplate.includes('DAILY_COMPETITION')">
					<div class="icon">
						<img :src="mrjs" />
					</div>
					<div class="label">{{ $t(`menuPopup["每日竞赛"]`) }}</div>
				</div>
				<div class="menu van-haptics-feedback">
					<div class="icon">
						<img :src="home" />
					</div>
					<div class="label">{{ $t(`menuPopup["首页"]`) }}</div>
				</div>

				<div class="menu van-haptics-feedback" v-for="(item, index) in state.menuList" @click="handleMenuClick(item)" :key="index">
					<div class="icon">
						<img :src="item.icon" alt="" />
					</div>
					<div class="label">{{ item.directoryName }}</div>
				</div>

				<div class="menu van-haptics-feedback">
					<div class="icon">
						<img :src="helpCenter" />
					</div>
					<div class="label" @click="toPath('/helpCenter')">{{ $t(`menuPopup["帮助中心"]`) }}</div>
				</div>
				<div
					class="menu van-haptics-feedback"
					@click="
						common.getSiteCustomerChannel(() => {
							show = false;
						})
					"
				>
					<div class="icon">
						<img :src="kefu" />
					</div>
					<div class="label">{{ $t(`menuPopup["线上客服"]`) }}</div>
				</div>
				<div class="menu van-haptics-feedback">
					<div class="icon">
						<img :src="helpCenter" />
					</div>
					<div class="label" @click="toPath('/helpCenter')">{{ $t(`menuPopup["加入我们"]`) }}</div>
				</div>
				<div class="menu van-haptics-feedback">
					<div class="icon">
						<img :src="helpCenter" />
					</div>
					<div class="label" @click="toPath('/helpCenter')">{{ $t(`menuPopup["语言切换"]`) }}</div>
				</div>
				<div class="menu themeDarkBg">
					<div @click="changeTheme('light')"><SvgIcon class="mr_16" iconName="common/light" size="36px" />白天</div>
					<div class="dark" @click="changeTheme('dark')"><SvgIcon class="mr_16" iconName="common/dark_on" size="36px" />黑夜</div>
				</div>
			</div>
		</div>
	</van-popup>
	<activityDialog v-model="showDialog" title="温馨提示" :confirm="confirmDialog" :goToLogin="true"> 您的账号暂未登录无法参与活动， 如已有账号请登录，如还未有账号 请前往注册 </activityDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import activityDialog from "../../../views/discount/components/Dialog.vue";
import logo from "/@/assets/zh-CN/default/menuPopup/logo.png";
import task_icon from "./image/taskIcon.png";
import wheel_icon from "./image/spinIcon.png";
import close from "/@/assets/zh-CN/default/menuPopup/close.png";
import close_light from "/@/assets/zh-CN/light/menuPopup/close.png";
import mrjs from "/@/assets/zh-CN/default/menuPopup/mrjs.png";
import home from "/@/assets/zh-CN/default/menuPopup/home.png";
import kefu from "/@/assets/zh-CN/default/menuPopup/kefu.png";
import helpCenter from "/@/assets/zh-CN/default/menuPopup/helpCenter.png";
import pubsub from "/@/pubSub/pubSub";
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
import { activityApi } from "/@/api/activity";
import { showToast } from "vant";
const showDAILY_COMPETITION = ref(false);
const userStore = useUserStore();
const router = useRouter();
const show = ref(false);
const showDialog = ref(false);
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);
const activityTemplate: any = ref([]);
let state: any = reactive({
	menuList: [],
});
const confirmDialog = () => {
	showDialog.value = false;
};
const onCollapseMenu = () => {
	show.value = true;
	queryLobbyLabelList();
	queryLobbyLabelActivitySwitch();
};
const changeTheme = (value) => {
	themesStore.setTheme(value === ThemeEnum.light ? ThemeEnum.light : ThemeEnum.default);
};

const handleMenuClick = (item) => {
	show.value = false;
	if (item.modelCode === "SBA") {
		router.push({ name: "rollingBallList", params: { sportType: 1 } });
	} else if (item.modelCode === "SIGN_VENUE") {
		Common.goToGame(item.gameInfo);
	} else {
		router.push({
			name: "GameArena",
			query: {
				title: item.homeName,
				gameOneId: item.gameOneClassId,
			},
		});
	}
};
const queryLobbyLabelList = async () => {
	const res = await CommonApi.queryLobbyLabelList().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.menuList = res.data;
	}
};
const queryLobbyLabelActivitySwitch = () => {
	activityApi.queryLobbyLabelActivitySwitch({ activityTemplate: "DAILY_COMPETITION" }).then((res: any) => {
		activityTemplate.value = res.data.activityTemplate;
	});
};
const toPath = (path) => {
	if ("/activity/SPIN_WHEEL" === path) {
		if (activityTemplate.value.includes("SPIN_WHEEL")) {
			router.push(path);
			show.value = false;
		} else {
			showToast("敬请期待");
		}
	} else if (path === "/activity/DAILY_COMPETITION" || path === "/activity/TASK") {
		if (useUserStore().token) {
			router.push(path);
			show.value = false;
		} else {
			showDialog.value = true;
			show.value = false;
		}
	} else {
		router.push(path);
		show.value = false;
	}
};
onMounted(() => {
	pubsub.subscribe("onCollapseMenu", onCollapseMenu);
});
</script>

<style scoped lang="scss">
.van-popup {
	width: 100%;
	height: 100%;
	@include themeify {
		background: linear-gradient(352.19deg, #24262b 80.86%, #df2745 293.82%);
	}
	overflow-y: auto;
	padding: 0 24px;
	.close {
		position: absolute;
		top: 50%;
		right: -40px;
		transform: translate(0, -50%);
		width: 40px;
		height: 124px;
	}
	.menu_header {
		display: flex;
		align-items: center;
		gap: 47px;
		padding: 60px 10px 27px;
		.logo {
			width: 240px;
			height: 29px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.menuClose {
			width: 36px;
			height: 36px;
		}
	}
	.line {
		height: 1px;
		width: 100%;
		margin: 0 0 20px;
		@include themeify {
			background: themed("T1");
		}
		transform: scale(1, 0.2);
	}

	.menu_content {
		.menu_content_header {
			display: flex;
			gap: 20px;
			justify-content: space-between;
			padding: 0px;
			.task,
			.wheel {
				width: 50%;
				height: 105px;
				display: flex;
				align-items: center;
				padding: 14px 30px;
				border-radius: 8px;
				box-sizing: border-box;
				background-size: 100% 100%;
				.icon {
					width: 79px;
					height: 79px;
					margin-bottom: 10px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.label {
					margin-left: 20px;
					color: #fff;
					font-family: "PingFang SC";
					font-size: 28px;
					font-weight: 500;
				}
			}
			.task {
				background: url("./image/taskBg.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.wheel {
				background: url("./image/spinBg.png") center center no-repeat;
				background-size: 100% 100%;
			}
		}

		.menu_list {
			display: grid;
			gap: 20px;
			padding: 40px 0px;
			.menu {
				width: 100%;
				height: 80px;
				display: flex;
				align-items: center;
				padding: 20px 40px;

				box-sizing: border-box;
				@include themeify {
					background: themed("BG3");
				}
				.icon {
					width: 32px;
					height: 32px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.label {
					margin-left: 16px;
					@include themeify {
						color: themed("TB");
					}
					font-family: Inter;
					font-size: 28px;
					font-weight: 400;
				}
			}
			.menu.themeDarkBg {
				padding: 0;
				background: url("./image/themeDarkBg.png") no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: space-around;
				> div {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					@include themeify {
						color: themed("T1");
					}
				}
				.dark {
					height: 100%;
					@include themeify {
						color: themed("TB");
					}
					background: url("./image/darkBg.png") no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
}

:deep(.van-overlay) {
	background: rgba(24, 24, 24, 0.73);
}
</style>
