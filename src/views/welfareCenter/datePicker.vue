<!--查询条件 日期范围选择器-->
<template>
	<van-picker ref="Picker" v-model="defaultDate" :columns="props.columns" confirm-button-text="" cancel-button-text="" class="van_picker_custom" @change="onChange" @confirm="onOneConfirm" />
</template>

<script lang="ts" setup>
const emit = defineEmits(["confirmPicker", "cancelPicker", "onChange"]);
const props = withDefaults(
	defineProps<{
		// 对象数组，配置每一列显示的数据
		columns?: any[];
		title?: string;
	}>(),
	{}
);
const Picker: any = ref(null);
const defaultDate: any = ref();

// 点击快捷选项完成按钮时触发
const onOneConfirm = (): any => {
	return Picker.value.getSelectedOptions().map((item) => item.value);
};
defineExpose({
	onOneConfirm,
	defaultDate,
});
const onChange = (value) => {
	emit("onChange", value.selectedValues);
};
</script>

<style lang="scss" scoped>
.dateRangeSelect_columnstop {
	margin-top: 40px;
	//margin-bottom: 40px;
	padding: 0 40px;
	@include flex_align_center;
	@include flex_space_between;

	.dateRangeSelect_text1 {
		font-size: 28px;
		font-weight: 600;
		@include themeify {
			color: themed("TB");
		}
	}

	.dateRangeSelect_timebox {
		font-size: 28px;
		width: 280px;
		height: 90px;
		border-radius: 12px;
		box-sizing: border-box;
		@include flex_center;
		@include themeify {
			background: themed("BG3");
			color: themed("T1");
		}
	}

	.dateRangeSelect_active {
		border: 2px solid;
		@include themeify {
			border-color: themed("Theme");
			color: themed("Theme");
		}
	}
}

.van_picker_custom {
	@include themeify {
		background: themed("BG1");
		border-color: themed("Line");
	}

	:deep(.van-picker__toolbar) {
		display: none;
		.van-haptics-feedback {
			@include themeify {
				color: themed("T1");
			}
		}
	}

	:deep(.van-picker__title) {
		@include themeify {
			color: themed("TB");
		}
	}

	:deep(.van-picker-column) {
	}

	:deep(.van-picker__columns) {
		//height: auto !important;
	}

	:deep(.van-picker-column__item) {
		@include themeify {
			color: themed("T1");
		}
	}

	//选中的颜色
	:deep(.van-picker-column__item.van-picker-column__item--selected) {
		@include themeify {
			color: themed("Theme") !important;
		}
	}

	//遮罩隐藏
	:deep(.van-picker__mask) {
		display: none;
	}

	//选中的线
	:deep(.van-hairline-unset--top-bottom.van-picker__frame)::after {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2");
		}
	}

	:deep(.van-hairline-unset--top-bottom.van-picker__frame)::before {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2");
		}
	}
}
</style>
