<template>
	<van-popup v-model:show="show" position="left">
		<VantLazyImg class="close" :src="theme === ThemeEnum.default ? close : close_light" />
		<div class="menu_header">
			<div class="logo">
				<img :src="logo" alt="" />
			</div>
		</div>
		<div class="menu_content">
			<div class="menu_content_header">
				<div class="task van-haptics-feedback">
					<div class="icon"><img :src="task_icon" alt="" /></div>
					<div class="label">{{ $t(`menuPopup["任务"]`) }}</div>
				</div>
				<div class="wheel van-haptics-feedback">
					<div class="icon"><img :src="wheel_icon" alt="" /></div>
					<div class="label">{{ $t(`menuPopup["转盘"]`) }}</div>
				</div>
			</div>

			<div class="menu_list">
				<div class="menu van-haptics-feedback">
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

				<div class="menu van-haptics-feedback" v-for="(item, index) in state.menuList" :key="index">
					<div class="icon">
						<img :src="item.gameOneIcon" alt="" />
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
</template>

<script setup lang="ts">
import { ref } from "vue";
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
const userStore = useUserStore();
const router = useRouter();
const show = ref(false);
const themesStore = useThemesStore();
const theme = computed(() => themesStore.themeName);

let state = reactive({
	menuList: [],
});

const onCollapseMenu = () => {
	show.value = true;
	queryLobbyLabelList();
};

const queryLobbyLabelList = async () => {
	const res = await CommonApi.queryLobbyLabelList().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.menuList = res.data;
	}
};

pubsub.subscribe("onCollapseMenu", onCollapseMenu);

const toPath = (path) => {
	show.value = false;
	router.push(path);
};
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
		right: -41px;
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
