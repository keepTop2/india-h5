<template>
	<div>
		<van-dialog
			:style="`width:${props.width}% ;`"
			v-model:show="props.show"
			:showConfirmButton="showConfirmButton"
			:showCancelButton="showCancelButton"
			:confirmButtonText="confirmButtonText"
			:cancelButtonText="cancelButtonText"
			@confirm="confirm"
			@cancel="cancel"
		>
			<template #title>
				<div>{{ title }}</div>
				<VantLazyImg v-if="close" class="close van-haptics-feedback" :src="close" @click="cancel" />
			</template>

			<div class="main">
				<slot name="main"> </slot>
			</div>
		</van-dialog>
	</div>
</template>

<script setup lang="ts">
import close from "./images/close.png";
// import closeImg from "/@/assets/zh/default/components/Dialog/close.png";

const emit = defineEmits(["update:show", "confirm", "cancel"]);

const props = withDefaults(
	defineProps<{
		show: boolean;
		width?: number;
		title?: string;
		close?: boolean;
		showConfirmButton?: boolean;
		showCancelButton?: boolean;
		confirmButtonText?: string;
		cancelButtonText?: string;
	}>(),
	{
		show: false,
		width: 74,
		title: "温馨提示",
		close: false,
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: "确认",
		cancelButtonText: "取消",
	}
);

//点击确认按钮时触发
const confirm = () => {
	emit("confirm");
	console.log(123);
};

//点击取消按钮时触发
const cancel = () => {
	emit("cancel");
};
</script>

<style scoped lang="scss">
.main {
	min-height: 100px;

	.uploading {
		color: var(--TB-N, #fbfbfb);
		font-family: "PingFang SC";
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-transform: uppercase;
		.uploading_one {
			color: var(--Theme-P, #3bc116);
			font-family: "PingFang SC";
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			text-transform: uppercase;
		}
	}
}

:deep(.van-dialog) {
	border-radius: 20px;
	background: #24262b;
	// @include themeify {
	// 	background: themed("BG1");
	// }
	.van-dialog__header {
		display: flex;
		position: relative;
		padding: 0 24px;
		font-weight: 400;
		font-size: 32px;
		height: 82px;
		line-height: 82px;
		text-align: center;
		color: #fbfbfb;
		border-bottom: 1px solid #373a40;
		// @include themeify {
		// 	border-color: themed("Line");
		// }
		box-sizing: border-box;

		.close {
			position: absolute;
			top: 26px;
			right: 25px;
			width: 32px;
			height: 32px;
		}
	}

	.van-hairline--top:after,
	.van-hairline--left:after {
		// border-top-width: 2px;
		border-color: #373a40;
	}
	.van-dialog__footer {
		// height: 74px;
		line-height: 74px;
	}
	.van-dialog__confirm,
	.van-dialog__cancel {
		height: 74px;
		background-color: unset;
	}

	.van-button {
		font-size: 32px;
		color: #98a7b5;
		font-weight: 400;
		border: none;
		height: 74px;
		line-height: 74px;
	}
	.van-dialog__confirm {
		color: #3bc116;
	}
}
</style>
