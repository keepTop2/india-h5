<template>
	<VantNavBar :title="$t(`VantNavBar['反馈详情']`)" @onClickLeft="onClickLeft" />

	<div class="feedbackDetails">
		<div class="header">
			<div class="left">2020-05-04 10:10:10</div>
			<div class="right">
				<span>ID:{{ 123123123123 }}</span>
			</div>
		</div>
		<div class="content">
			<p class="text">超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏</p>
			<div class="img-list">
				<div class="img"></div>
			</div>
		</div>
	</div>

	<div class="feedbackDetails">
		<div class="header">
			<div class="left">2020-05-04 10:10:10</div>
		</div>
		<div class="content">
			<p class="text">超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏超出部分隐藏</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.feedbackDetails {
	padding: 0px 24px;
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
		.left {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
		.right {
			@include themeify {
				color: themed("T2");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
	}
	.content {
		padding: 24px;
		border-radius: 8px;
		@include themeify {
			background: themed("BG3");
		}
		.text {
			@include themeify {
				color: themed("T2");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
		.img-list {
			display: flex;
			gap: 20px;
			.img {
				width: 160px;
				height: 160px;
			}
		}
	}
}
</style>
