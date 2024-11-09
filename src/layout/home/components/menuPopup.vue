<template>
	<van-popup v-model:show="show" position="left">
		<div class="menu_header">
			<div>
				<SvgIcon iconName="common/collapse_icon" size="40px" @click="show = false" />
			</div>
			<div class="logo">
				<img :src="logo" alt="" @click="goToHome" />
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

				<div v-for="(item, index) in state.menuList" @click.stop="handleMenuClick(item)" :key="index">
					<div class="menu" :class="openMenuIndex == index ? 'active' : ''">
						<div class="icon">
							<img :src="item.iconFileUrl" alt="" />
						</div>
						<div class="label">{{ item.directoryName }}</div>
						<div class="arrow" v-if="item.twoList?.length">
							<svg-icon :iconName="openMenuIndex !== index ? 'common/arrowDown' : 'common/arrowTop'" width="24px" height="12px" @click.stop="openSubMenu(index)"></svg-icon>
						</div>
					</div>

					<div v-show="item.twoList?.length && openMenuIndex == index" class="subMenuBox">
						<div class="menu subMenu" @click="goTogame" v-for="item2 in item.twoList">
							<div class="icon">
								<img :src="item2.iconFileUrl" />
							</div>
							<div class="label">{{ item2.name }}</div>
						</div>
					</div>
				</div>
				<!-- 帮助中心 -->
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
						<img :src="joinUs" />
					</div>
					<div class="label" @click="toPath('/helpCenter')">{{ $t(`menuPopup["加入我们"]`) }}</div>
				</div>

				<!-- 语言 -->
				<div class="menu van-haptics-feedback">
					<div class="icon langIcon">
						<img :src="useUserStore().getlangInfo.iconFileUrl" />
					</div>
					<div class="label">{{ $t(`menuPopup["语言切换"]`) }}</div>
					<div class="arrow" @click="setLang">
						<svg-icon iconName="common/arrowRight"></svg-icon>
					</div>
				</div>
				<!-- 切换主题 -->
				<div class="menu themeDarkBg">
					<div @click="changeTheme('light')"><SvgIcon class="mr_16" iconName="common/light" size="36px" />白天</div>
					<div class="dark" @click="changeTheme('dark')"><SvgIcon class="mr_16" :iconName="theme == 'default' ? 'common/dark_on' : 'common/dark'" size="36px" />黑夜</div>
				</div>
			</div>
		</div>
		<set-lang-pop v-model="showSetLang" />
	</van-popup>

	<activityDialog v-model="showDialog" title="温馨提示" :confirm="confirmDialog" :goToLogin="true"> 您的账号暂未登录无法参与活动， 如已有账号请登录，如还未有账号 请前往注册 </activityDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import activityDialog from "../../../views/discount/components/Dialog.vue";
import logo from "/@/assets/zh-CN/default/menuPopup/logo.png";
import task_icon from "./image/taskIcon.png";
import wheel_icon from "./image/spinIcon.png";
import mrjs from "/@/assets/zh-CN/default/menuPopup/mrjs.png";
import home from "/@/assets/zh-CN/default/menuPopup/home.png";
import kefu from "/@/assets/zh-CN/default/menuPopup/kefu.png";
import helpCenter from "/@/assets/zh-CN/default/menuPopup/helpCenter.png";
import joinUs from "/@/assets/zh-CN/default/menuPopup/joinUs.png";
import pubsub from "/@/pubSub/pubSub";
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/modules/user";
import { activityApi } from "/@/api/activity";
import { showToast } from "vant";
import Common from "/@/utils/common";

const router = useRouter();
const show = ref(false);
const showSetLang = ref(false);
const showDialog = ref(false);
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);
const activityTemplate: any = ref([]);
const openMenuIndex: any = ref(null);
let state: any = reactive({
	menuList: [],
});

const openSubMenu = (index) => {
	if (openMenuIndex.value === index) {
		openMenuIndex.value = null;
	} else {
		openMenuIndex.value = index;
	}
};
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
const goToHome = () => {
	show.value = false;
	router.push("/");
};
const setLang = () => {
	showSetLang.value = true;
	console.log(showSetLang.value);
};
const handleMenuClick = (item) => {
	show.value = false;
	if (item.modelCode === "SBA") {
		router.push({ name: "rollingBallList", params: { sportType: 1 } });
	} else if (item.modelCode === "SIGN_VENUE") {
		Common.goToGame(item);
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
		background: themed("menuBg");
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
		gap: 37px;
		padding: 30px 10px 17px;
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
			gap: 8px;
			padding: 40px 0px;
			.menu {
				width: 100%;
				height: 80px;
				border-radius: 8px;
				display: flex;
				align-items: center;
				padding: 20px 40px;
				flex-wrap: wrap;
				box-sizing: border-box;
				@include themeify {
					background: themed("BG3");
				}
				border-bottom: 4px solid rgba(255, 255, 255, 0.05);

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
				.langIcon {
					img {
						border-radius: 50%;
					}
				}
				.arrow {
					text-align: right;
					width: 40px;
					height: 40px;
					margin-left: auto;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 12px;
					@include themeify {
						background: themed("BG4");
					}
					svg {
						height: 21px;
						width: 12px;
						@include themeify {
							color: themed("T2");
						}
					}
				}
			}
			.menu.themeDarkBg {
				padding: 0;
				@include themeify {
					background: themed("BG1");
				}
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
						background: themed("BG3");
					}
				}
			}
			.subMenuBox {
				@include themeify {
					background: themed("BG1");
				}
				.subMenu {
					border-bottom: none;
					height: 80px;
					padding-left: 60px;
					border-radius: 0;
				}
			}

			.menu.active {
				@include themeify {
					background: themed("menuActiveBg");
					border-bottom: 4px solid rgba(#ff284b, 0.4);
				}
			}
		}
	}
}

:deep(.van-overlay) {
	background: rgba(24, 24, 24, 0.73);
}
</style>
