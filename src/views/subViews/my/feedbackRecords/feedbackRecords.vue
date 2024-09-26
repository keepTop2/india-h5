<template>
	<VantNavBar :title="$t(`VantNavBar['反馈记录']`)" @onClickLeft="onClickLeft" />

	<div class="cellList">
		<div class="cell" v-for="item in 10">
			<div class="header">
				<div class="left">2020-05-04 10:10:10</div>
				<div class="right">
					<span>ID:{{ 123123123123 }}</span>
					<div class="icon" @click="common.getInstance().copy(123123123123)"><SvgIcon iconName="common/copy2" /></div>
				</div>
			</div>
			<div class="content">
				<p class="text">回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容</p>
				<span @click="toPath('/feedbackDetails')">详情</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import { useRouter } from "vue-router";
const router = useRouter();

const toPath = (path) => {
	router.push(path);
};

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.cellList {
	display: flex;
	flex-direction: column;
	row-gap: 24px;
	padding: 24px;
	.cell {
		padding: 24px;
		border-radius: 8px;
		@include themeify {
			background: themed("BG3");
		}

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}
			.right {
				display: flex;
				column-gap: 10px;
				@include themeify {
					color: themed("T2");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;

				.icon {
					width: 32px;
					height: 32px;
				}
			}
		}
		.content {
			display: flex;
			gap: 50px;
			margin-top: 14px;
			.text {
				@include themeify {
					color: themed("T2");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				white-space: nowrap; /* 不换行 */
				overflow: hidden; /* 超出部分隐藏 */
				text-overflow: ellipsis; /* 显示省略号 */
			}
			span {
				@include themeify {
					color: themed("Theme");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				white-space: nowrap; /* 不换行 */
				text-decoration-line: underline;
			}
		}
	}
}
</style>
