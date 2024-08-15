<template>
	<div class="no_login">
		<div class="login_card">
			<div class="info">
				<div class="avatar">
					<VantLazyImg :src="theme === ThemeEnum.default ? avatar : avatar_light" />
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
				<div class="icon"><SvgIcon iconName="/my/lang" /></div>
				<div class="label">{{ $t('my["语言"]') }}</div>
				<div class="value">中文</div>
				<div class="arrow"><SvgIcon iconName="/common/arrow" /></div>
			</div>
			<div class="cell">
				<div class="icon"><SvgIcon iconName="/my/theme" /></div>
				<div class="label">{{ $t('my["主题"]') }}</div>
				<div class="themeChange_icon">
					<SvgIcon :iconName="theme === ThemeEnum.default ? '/my/themeChange' : '/my/themeChange_light'" @click="changeTheme" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ThemeEnum } from "/@/enum/appConfigEnum";
import { useThemesStore } from "/@/store/modules/themes";
import avatar from "/@/assets/zh-CN/default/my/avatar.png";
import avatar_light from "/@/assets/zh-CN/light/my/avatar.png";
import { useRouter } from "vue-router";
const themesStore = useThemesStore();
const router = useRouter();

const theme = computed(() => themesStore.themeName);

const changeTheme = () => {
	themesStore.setTheme(theme.value === ThemeEnum.light ? ThemeEnum.default : ThemeEnum.light);
};

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
		@include themeify {
			background-color: themed("BG3");
		}
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
					@include themeify {
						color: themed("TB");
					}
					font-family: "PingFang SC";
					font-size: 26px;
					font-weight: 500;
				}
				span {
					@include themeify {
						color: themed("Theme");
					}
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
				border: 1px solid;
				@include themeify {
					color: themed("Theme");
					border-color: themed("Theme");
				}
			}
			.register {
				@include themeify {
					color: themed("TB1");
					background: themed("Theme");
				}
			}
		}
	}

	.group {
		margin: 24px;
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
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
					background: themed("Line");
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
				@include themeify {
					color: themed("T1");
				}
				svg {
					vertical-align: top;
				}
			}
			.themeChange_icon {
				width: 99px;
				height: 46px;
			}
		}
	}
}
</style>
