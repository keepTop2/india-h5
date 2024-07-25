<!--查询条件 条件选择器 -->
<template>
	<div>
		<van-popup
			v-model:show="isShow"
			position="bottom"
			@closed="onClosed"
			@opened="onOpened"
			:close-on-popstate="true"
			:close-on-click-overlay="closeOnClickOverlay"
			class="VanPopup"
		>
			<div class="picker">
				<div class="van-picker__toolbar" v-if="showToolbar">
					<button type="button" @click="onCancel" class="van-picker__cancel">
						<SvgIcon iconName="close" />
					</button>
					<div class="title">语言选择</div>
					<button type="button" @click="onConfirm" class="van-picker__confirm">
						<div class="right">确定</div>
					</button>
				</div>
				<!-- <p class="checkAll" @click="onCheckAll">全选</p> -->
				<van-checkbox-group :style="`height:${boxHeight}`" class="CheckboxGroup" v-model="state.activeList">
					<van-checkbox
						v-for="(option, index) in state.columnsMap"
						:key="index"
						:name="option.value"
						label-position="left"
						checked-color="#3BC116"
						:disabled="state.readonly"
						:class="`VanCheckbox ${(state.activeList.includes(option.value) && 'checked') || ''}`"
						:style="`height:${state.optionHeight};line-height:${state.optionHeight};`"
					>
						<template #icon="props">
							<img class="img-icon" :src="!props.checked ? circle : circle_theme" />
						</template>
						{{ option.text }}
					</van-checkbox>
				</van-checkbox-group>
			</div>
		</van-popup>
		<input type="text" v-model="activeValue" style="display: none" />
	</div>
</template>

<script setup lang="ts">
import type { PickerOption, PickerToolbarPosition } from "vant";
import circle from "./images/circle.png";
import circle_theme from "./images/circle_theme.png";
import { ModelRef } from "vue";

const emit = defineEmits(["update:show", "update:select", "confirm", "cancel", "change", "onClickOption", "opened", "closed"]);

interface CustomFieldName {
	text: string;
	value: string | number;
	children: any;
}

const props = withDefaults(
	defineProps<{
		show: boolean;
		// 对象数组，配置每一列显示的数据
		columns?: PickerOption[] | PickerOption[][];
		// 顶部栏标题
		title?: string;
		//确认按钮文字，设置为空字符串可以隐藏按钮
		confirmButtonText?: string;
		//取消按钮文字，设置为空字符串可以隐藏按钮
		cancelButtonText?: string;
		//顶部栏位置，可选值为 bottom
		// toolbarPosition?: PickerToolbarPosition;
		//是否为只读状态，只读状态下无法切换选项
		readonly?: boolean;
		//是否显示顶部栏
		showToolbar?: boolean;
		//选项高度，支持 px vw vh rem 单位，默认 px  44
		optionHeight?: number | string;
		//容器高度
		boxHeight?: number | string;
		//是否点击遮罩时关闭
		closeOnClickOverlay?: boolean;
		//需要映射到组件text的后端字段key 默认为name
		toText?: string;
		//需要映射到组件value的后端字段key 默认为code
		toValue?: string | number;
	}>(),
	{
		show: false,
		title: "标题",
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		toolbarPosition: "top",
		readonly: false,
		showToolbar: true,
		closeOnClickOverlay: true,
		optionHeight: "8.9vw",
		boxHeight: "77.333333vw",
		toText: "name",
		toValue: "code",
	}
);

const state = reactive({
	//是否点击确认
	isConfirm: false,
	oldActiveValue: [],
	columnsMap: [] as CustomFieldName[],
	activeList: [] as Array<string>,
	//后端数据类型
	valueType: "" as number | string,
});

//双向绑定语法糖
const isShow = computed({
	get() {
		return props.show;
	},
	set(value) {
		emit("update:show", value);
	},
});

//双向绑定语法糖
const activeValue: ModelRef<string[]> = defineModel("checked", {
	get(value) {
		state.activeList = value;
		return value;
	},
	set(value) {
		return value;
	},
	default: () => [],
});

//数据映射
const dataMap = () => {
	state.columnsMap = props.columns?.map((item) => {
		let newObj: CustomFieldName = {} as CustomFieldName;
		newObj.text = item[props.toText];
		newObj.value = String(item[props.toValue]);
		newObj.children = "";
		return newObj;
	}) as Array<CustomFieldName>;
};

watch(
	[() => props.columns],
	([newCloumns]) => {
		dataMap();
	},
	{
		deep: true,
		immediate: true,
	}
);

watch(
	[() => state.activeList],
	([newList]) => {
		activeValue.value = state.activeList;
	},
	{
		deep: true,
	}
);

const onCheckAll = () => {
	state.activeList = state.columnsMap.map((item) => {
		return item.value;
	});
};

// 点击完成按钮时触发
const onConfirm = () => {
	state.isConfirm = true;
	isShow.value = false;
	emit("confirm", state.activeList);
};

// 点击取消按钮时触发
const onCancel = () => {
	isShow.value = false;
	emit("cancel");
};

//打开弹出层且动画结束后触发
const onOpened = () => {
	state.oldActiveValue = activeValue.value;
	state.isConfirm = false;
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isConfirm) {
		//还原数据
		activeValue.value = state.oldActiveValue;
		state.isConfirm = false;
	}
	emit("closed");
};
</script>

<style lang="scss">
// .checkAll {
// 	@include themeify {
// 		color: themed("Theme") !important;
// 	}
// }
.VanPopup {
	border-radius: 24px 24px 0px 0px;
	background: transparent !important;
}
.CheckboxGroup {
	padding-bottom: 28px;
	overflow-y: scroll;
	.checked {
		.van-checkbox__label {
			@include themeify {
				color: themed("Theme") !important;
			}
		}
	}
	.van-checkbox {
		display: block;
		position: relative;
		text-align: center;
		height: 67px;
		line-height: 67px;
		@include themeify {
			border-bottom: 1px dashed themed("Line");
		}
		.van-checkbox__label {
			font-size: 28px;
			@include themeify {
				color: themed("T1");
			}
		}

		.van-checkbox__icon {
			position: absolute;
			right: 66px;
			top: 0;
			height: 100%;
			display: flex;
			align-items: center;
			.img-icon {
				width: 32px;
				height: 32px;
			}
		}
	}
}

.picker {
	@include themeify {
		background: themed("BG1");
	}
	.van-picker__toolbar {
		position: relative;
		height: 82px;
		display: flex;
		align-items: center;
		justify-content: center !important;
		padding: 0px 20px;
		@include themeify {
			background: themed("BG1");
			border-color: themed("Line");
		}
		border-bottom: 1px solid;
		.van-picker__cancel {
			position: absolute;
			left: 20px;
			padding: 0px 28px;
		}
		.title {
			@include themeify {
				color: themed("TB");
			}
			text-align: center;
			font-family: "PingFang SC";
			font-size: 32px;
			font-weight: 500;
			line-height: 42px;
		}

		.van-picker__confirm {
			position: absolute;
			right: 20px;
			.right {
				@include themeify {
					color: themed("T1");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 30px;
				font-weight: 400;
				line-height: 40px;
			}
		}
	}
}
</style>
