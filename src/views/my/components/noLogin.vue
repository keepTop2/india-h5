<template>
	<div class="no_login">
		<div class="login_card">
			<div class="info">
				<div class="avatar">
					<VantLazyImg :src="avatar" />
				</div>
				<div class="tips">
					<p>{{ $t('common["欢迎来到"]') }}<span>OKsport</span></p>
					<p class="text2">{{ $t('my["请先注册或登录"]') }}</p>
				</div>
			</div>

			<div class="btns">
				<div class="login" @click="toPath('/login')">{{ $t('navBar["登录"]') }}</div>
				<div class="register" @click="toPath('/register')">{{ $t('navBar["注册"]') }}</div>
			</div>
		</div>

		<div class="group">
			<div class="cell">
				<SvgIcon class="icon" iconName="/my/lang" />
				<div class="label">{{ $t('my["语言"]') }}</div>
				<div class="value">中文</div>
				<SvgIcon class="arrow" iconName="/common/arrow" />
			</div>
			<div class="cell">
				<SvgIcon class="icon" iconName="/my/theme" />
				<div class="label">{{ $t('my["主题"]') }}</div>
				<SvgIcon class="themeChange_icon" iconName="/my/themeChange" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import avatar from "/@/assets/zh-CN/default/my/avatar.png";
import { useRouter } from "vue-router";
const router = useRouter();

const toPath = (path) => {
	console.log("path", path);
	router.push(path);
};
</script>

<style scoped lang="scss">
.no_login {
	padding-top: 24px;
	.login_card {
		margin: 0px 24px;
		padding: 24px;
		border-radius: 16px;
		background: var(--BG3-N, #2c2d2e);
		.info {
			display: flex;
			align-items: center;
			gap: 27px;
			.avatar {
				width: 80px;
				height: 80px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.tips {
				flex: 1;
				p {
					color: var(--TB-N, #fff);
					font-family: "PingFang SC";
					font-size: 26px;
					font-weight: 500;
				}
				span {
					color: var(--Theme, #ff284b);
				}
				.text2 {
					margin-top: 10px;
					font-size: 28px;
				}
			}
		}
		.btns {
			display: flex;
			align-items: center;
			gap: 24px;
			margin-top: 32px;
			.login,
			.register {
				flex: 1;
				height: 86px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10px;
				border-radius: 16px;
				box-sizing: border-box;
				font-family: "PingFang SC";
				font-size: 30px;
				font-weight: 400;
			}
			.login {
				border: 1px solid var(--Theme, #ff284b);
				color: var(--Theme, #ff284b);
			}
			.register {
				background: var(--Theme, #ff284b);
				color: var(--TB1-P, #fdfdfd);
			}
		}
	}

	.group {
		margin: 24px;
		border-radius: 16px;
		background: var(--BG3-N, #2c2d2e);
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
				background-color: var(--Line-N, #343434);
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
				color: var(--TB-N, #fff);
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
			.value {
				color: var(--T1-N, #999ba0);
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
}
</style>
