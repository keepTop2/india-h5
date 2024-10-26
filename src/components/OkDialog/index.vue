<template>
	<div v-if="modelValue" class="common-dialog" :style="{ zIndex: currentZIndex }">
		<div class="dialog fade-in">
			<div class="fs_32 color_TB title">{{ title }}</div>
			<div class="content fs_30">
				<div class="p_20">
					<slot></slot>
				</div>
			</div>
			<div class="dialog-footer">
				<div class="color_T1" @click="close">取消</div>
				<div class="color_Theme" @click="confirm">确定</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["update:modelValue", "confirm"]);
const props = defineProps({
	modelValue: Boolean,
	title: {
		type: String,
		default: "温馨提示",
	},
	confirm: {
		type: Function,
		default: () => {},
	},
});

const baseZIndex = 1000;
const currentZIndex = ref(baseZIndex);
onMounted(() => {
	currentZIndex.value += document.getElementsByClassName("common-dialog").length + 1;
});
const confirm = () => {
	props.confirm() ? props.confirm() : emit("update:modelValue", false);
};
const close = () => {
	emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
.common-dialog {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	:deep(img) {
		max-width: 100% !important;
	}
	.dialog {
		position: relative;
		width: 594px;
		border-radius: 20px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		@include themeify {
			background-color: themed("BG1");
		}
		.title {
			padding: 20px;
			box-sizing: border-box;
			width: 100%;
			line-height: 52px;
			text-align: center;
			@include themeify {
				border-bottom: 1px solid themed("Line");
			}
		}
		.content {
			word-wrap: break-word; /* 支持 IE 11 和旧版浏览器 */
			overflow-wrap: break-word; /* 标准属性 */
			white-space: normal; /* 确保文本在正常情况下换行 */
			width: calc(100% - 20px);
			padding: 10px; /* 可选：添加内边距 */
			min-height: 150px;
			text-align: center;
			@include themeify {
				border-bottom: 1px solid themed("Line");
			}
			@include themeify {
				color: themed("T1");
			}
		}
		.dialog-footer {
			height: 76px;
			display: flex;
			width: 100%;
			line-height: 76px;
			font-size: 32px;
			justify-content: space-around;
			> div {
				flex: 1;
				text-align: center;
			}
			> div:first-child {
				@include themeify {
					border-right: 1px solid themed("Line");
				}
			}
		}
	}
}
</style>
