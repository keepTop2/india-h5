<template>
	<div class="header-bg">
		<div class="content">
			<p class="text">{{ $t('common["你好"]') }}</p>
			<p class="mt_15">
				<span class="text">{{ $t('common["欢迎来到"]') }}</span>
				<span class="ml_12 app-name">OKsport</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header-bg {
	position: relative;
	width: 100%;
	height: 568px;
	background: url("/@/assets/zh-CN/default/loginOrRegister/header-bg.png") center center / 100% 100% no-repeat;

	.content {
		position: absolute;
		left: 50%;
		bottom: 50px;
		transform: translate(-50%, 0);
		.text,
		.app-name {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 36px;
			font-weight: 600;
			line-height: 46px;
			text-align: center;
		}
		.app-name {
			@include themeify {
				color: themed("Theme");
			}
		}
	}
}
</style>
