<template>
	<div>
		<van-popup v-model:show="show" position="left">
			<VantLazyImg class="close" :src="close" />
			<div class="menu_header">
				<div class="logo">
					<img :src="logo" alt="" />
				</div>
				<MenuClose class="menuClose van-haptics-feedback" @click="show = false" />
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
					<div class="menu van-haptics-feedback" v-for="(item, index) in 10" :key="index">
						<div class="icon">
							<Contest />
						</div>
						<div class="label">目录{{ item }}</div>
					</div>
				</div>
			</div>
			<div class="menu_footer">
				<div class="menu van-haptics-feedback">
					<div class="icon">
						<Contest />
					</div>
					<div class="label">{{ $t(`menuPopup["中文"]`) }}</div>
				</div>
				<div class="menu van-haptics-feedback">
					<div class="icon">
						<helpIcon />
					</div>
					<div class="label">{{ $t(`menuPopup["客服"]`) }}</div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import logo from "/@/assets/zh-CN/default/menuPopup/logo.png";
import task_icon from "/@/assets/zh-CN/default/menuPopup/task_icon.png";
import wheel_icon from "/@/assets/zh-CN/default/menuPopup/wheel_icon.png";
import Contest from "/@/assets/zh-CN/default/menuPopup/contest.svg";
import helpIcon from "/@/assets/zh-CN/default/menuPopup/helpIcon.svg";
import close from "/@/assets/zh-CN/default/menuPopup/close.png";
import pubsub from "/@/pubSub/pubSub";
import { ref } from "vue";
const show = ref(false);

const onCollapseMenu = () => {
	show.value = true;
};

pubsub.subscribe("onCollapseMenu", onCollapseMenu);
</script>

<style scoped lang="scss">
.van-popup {
	width: 530px;
	height: 100%;
	background: var(--BG1-N, #222324);
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
		border-color: var(--TB-D, #333);
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
					color: var(--Text_a, #fff);
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
				}
				.label {
					margin-left: 16px;
					color: var(--Tag1-D, #eaecf2);
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
			}
			.label {
				margin-left: 16px;
				color: var(--Tag1-D, #eaecf2);
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
