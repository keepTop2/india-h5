<template>
	<van-popup v-model:show="show" position="left">
		<VantLazyImg class="close" :src="theme === ThemeEnum.default ? close : close_light" @click="show = false" />
		<div class="menu_header">
			<div class="logo">
				<img :src="logo" alt="" />
			</div>
		</div>
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
				<div class="menu van-haptics-feedback" @click="toPath('/activity/DAILY_COMPETITION')">
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
					<div class="label">{{ item.homeName }}</div>
				</div>
			</div>
		</div>
		<div class="menu_footer">
			<div class="menu van-haptics-feedback" @click="toPath('/language')">
				<div class="icon">
					<img :src="userStore.langIcon" />
				</div>
				<div class="label">{{ userStore.langName }}</div>
			</div>
			<div class="menu van-haptics-feedback">
				<div class="icon">
					<img :src="kefu" />
				</div>
				<div class="label">{{ $t(`menuPopup["客服"]`) }}</div>
			</div>
		</div>
	</van-popup>
	<activityDialog v-model="showDialog" title="温馨提示" :confirm="confirmDialog" :goToLogin="true"> 您的账号暂未登录无法参与活动， 如已有账号请登录，如还未有账号 请前往注册 </activityDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import activityDialog from "../../../views/discount/components/Dialog.vue";
import logo from "/@/assets/zh-CN/default/menuPopup/logo.png";
import task_icon from "/@/assets/zh-CN/default/menuPopup/task_icon.png";
import wheel_icon from "/@/assets/zh-CN/default/menuPopup/wheel_icon.png";
import close from "/@/assets/zh-CN/default/menuPopup/close.png";
import close_light from "/@/assets/zh-CN/light/menuPopup/close.png";
import mrjs from "/@/assets/zh-CN/default/menuPopup/mrjs.png";
import home from "/@/assets/zh-CN/default/menuPopup/home.png";
import kefu from "/@/assets/zh-CN/default/menuPopup/kefu.png";
import pubsub from "/@/pubSub/pubSub";
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
import { activityApi } from "/@/api/activity";
import { showToast } from "vant";
const userStore = useUserStore();
const router = useRouter();
const show = ref(false);
const showDialog = ref(false);
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);

let state: any = reactive({
	menuList: [],
});
const confirmDialog = () => {
	showDialog.value = false;
};
const onCollapseMenu = () => {
	show.value = true;
	queryLobbyLabelList();
};
const handleMenuClick = (item) => {
	show.value = false;
	console.log(item, "===item");
	if (item.modelCode === "SBA") {
		router.push({ name: "rollingBallList", params: { sportType: 1 } });
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

const toPath = (path) => {
	if ("/activity/SPIN_WHEEL" === path) {
		activityApi.getSpinDetail().then((res: any) => {
			if (res.code === 10000 && res.data) {
				router.push(path);
				show.value = false;
			} else {
				showToast("敬请期待");
			}
		});
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
	}
};
onMounted(() => {
	pubsub.subscribe("onCollapseMenu", onCollapseMenu);
});
</script>

<style scoped lang="scss">
.van-popup {
	width: 530px;
	height: 100%;
	@include themeify {
		background: themed("BG1");
	}
	overflow-y: unset;

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
		justify-content: space-between;
		padding: 60px 40px;
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

	.menu_content {
		border-bottom: 1px solid;
		@include themeify {
			border-color: themed("Line");
		}
		.menu_content_header {
			display: flex;
			gap: 20px;
			justify-content: space-between;
			padding: 0px 40px;
			.task,
			.wheel {
				width: 218px;
				height: 80px;
				display: flex;
				align-items: center;
				padding: 14px 16px;
				border-radius: 8px;
				box-sizing: border-box;
				background-size: 100% 100%;
				.icon {
					width: 52px;
					height: 52px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.label {
					margin-left: 16px;
					color: #fff;
					font-family: "PingFang SC";
					font-size: 28px;
					font-weight: 500;
				}
			}
			.task {
				background: url("/@/assets/zh-CN/default/menuPopup/task_bg.png") center center no-repeat;
			}
			.wheel {
				background: url("/@/assets/zh-CN/default/menuPopup/wheel_bg.png") center center no-repeat;
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
						color: themed("T1");
					}
					font-family: Inter;
					font-size: 28px;
					font-weight: 400;
				}
			}
		}
	}

	.menu_footer {
		padding: 40px;
		.menu {
			width: 100%;
			height: 80px;
			display: flex;
			align-items: center;
			padding: 20px 0px;
			box-sizing: border-box;
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
					color: themed("T1");
				}
				font-family: Inter;
				font-size: 28px;
				font-weight: 400;
			}
		}
	}
}

:deep(.van-overlay) {
	background: rgba(24, 24, 24, 0.73);
}
</style>
