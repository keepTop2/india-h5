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
		>
			<van-picker
				class="picker"
				:title="title"
				:columns="state.columnsMap"
				:confirm-button-text="confirmButtonText"
				:columns-field-names="customFieldName"
				:cancel-button-text="cancelButtonText"
				:toolbar-position="toolbarPosition"
				:loading="loading"
				:readonly="readonly"
				:show-toolbar="showToolbar"
				:allow-html="allowHtml"
				:option-height="optionHeight"
				:visible-option-num="visibleOptionNum"
				v-bind="$attrs"
				@confirm="onConfirm"
				@cancel="onCancel"
				@click-option="onClickOption"
			>
				<template #cancel>
					<SvgIcon iconName="close" />
				</template>
				<template #title>
					<div class="title">{{ title }}</div>
				</template>
				<template #confirm>
					<div class="right">{{ confirmButtonText }}</div>
				</template>
			</van-picker>
		</van-popup>

		<input type="text" v-model="activeView" style="display: none" />
	</div>
</template>

<script setup lang="ts">
import type { PickerOption, PickerToolbarPosition } from "vant";

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
		// 自定义 columns 结构中的字段 默认值 { text: 'text', value: 'value', children: 'children' }
		customFieldName?: object;
		// 顶部栏标题
		title?: string;
		//确认按钮文字，设置为空字符串可以隐藏按钮
		confirmButtonText?: string;
		//取消按钮文字，设置为空字符串可以隐藏按钮
		cancelButtonText?: string;
		//顶部栏位置，可选值为 bottom
		toolbarPosition?: PickerToolbarPosition;
		//是否显示加载状态
		loading?: boolean;
		//是否为只读状态，只读状态下无法切换选项
		readonly?: boolean;
		//是否显示顶部栏
		showToolbar?: boolean;
		//是否允许选项内容中渲染 HTML
		allowHtml?: boolean;
		//选项高度，支持 px vw vh rem 单位，默认 px  44
		optionHeight?: number | string;
		//可见的选项个数 7
		visibleOptionNum?: number | string;
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
		loading: false,
		readonly: false,
		showToolbar: true,
		allowHtml: true,
		visibleOptionNum: 7,
		closeOnClickOverlay: true,
		optionHeight: "10.933333vw",
		toText: "name",
		toValue: "code",
	}
);

const state = reactive({
	acitveName: "",
	//是否点击确认
	isConfirm: false,
	oldctiveView: "",
	oldctiveVal: [] as Array<any>,
	columnsMap: [] as CustomFieldName[],
	activeVal: [] as Array<any>,
	selectList: [] as Array<any>, //选中的对象
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

// 查找选中的对象；
const findCheckBox = () => {
	let selects = [] as Array<any>;
	props.columns &&
		props.columns?.forEach((item) => {
			const valkey = `picker_checkbox_` + String(item[props.toValue]);
			const checkDome: any = window.document.querySelector("#" + valkey);
			if (checkDome?.checked) {
				selects.push(item);
			}
		});
	state.selectList = JSON.parse(JSON.stringify(selects));
};
/**
 * @description: 设置所有 checkBox 状态
 * @param {*} status:boolean
 * @return {*}
 */
const setAllChecked = (status: boolean) => {
	props.columns &&
		props.columns?.forEach((item) => {
			const valkey = `picker_checkbox_` + String(item[props.toValue]);
			const checkDome: any = window.document.querySelector("#" + valkey);
			checkDome.checked = status;
		});
};

/**
 * @description:设置 chekBox 选中值为 true；
 * @param {*} valList 值数组
 * @return {*}
 */
const setChecked = (valList) => {
	setAllChecked(false);
	valList &&
		valList.forEach((vl: any) => {
			const toValue = props.toValue;
			const index: number = props.columns?.findIndex((e) => e[toValue] == vl) || 0;
			const column = (props.columns as any)[index][toValue];
			const valkey = `picker_checkbox_` + String(column);
			const checkDome: any = window.document.querySelector("#" + valkey);
			if (checkDome) {
				checkDome.checked = true;
			}
		});
};

//双向绑定语法糖 (选中的可见值)
const activeView: ModelRef<string | number, string | number> = defineModel("selectView", {
	get(value) {
		return value;
	},
	set(value) {
		return value;
	},
	default: () => "",
});

//选中的参数值
const activeVal: ModelRef<any> = defineModel("selectVal", {
	get(value) {
		return value;
	},
	set(value) {
		// state. selectList
		return value;
	},
	default: () => [],
});

//数据映射
const dataMap = () => {
	state.columnsMap = props.columns?.map((item) => {
		let newObj: CustomFieldName = {} as CustomFieldName;
		const valKey = `picker_checkbox_` + String(item[props.toValue]);
		const val = +String(item[props.toValue]);
		newObj.text = `
				<div class ="picker_checkbox">
						<input type="checkbox" id="${valKey}" name="picker_checkbox" value="${val}" />
						<label class="checkbox_plan" for="${valKey}">
							<span class="text_center">${item[props.toText]}  </span>
							<span class="check_Tag"></span>
						</label>
				</div>
		`;
		newObj.value = val;
		newObj.children = "";
		return newObj;
	}) as Array<CustomFieldName>;
	// console.log(state.columnsMap, "映射数据==============");
};

onBeforeMount(() => {
	dataMap();
});

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
	() => state.selectList,
	(newValue, oldValue) => {
		if (newValue && newValue.length > 0) {
			let valList: Array<any> = [],
				viewList: Array<any> = [];
			newValue.forEach((item: any) => {
				valList.push(item[props.toValue]);
				viewList.push(item[props.toText]);
			});
			activeVal.value = valList;
			activeView.value = viewList.join(",");
		} else {
			activeView.value = "";
			activeVal.value = [];
		}
	},
	{
		// deep: true,
	}
);

// 点击完成按钮时触发
const onConfirm = () => {
	findCheckBox();
	state.isConfirm = true;
	isShow.value = false;
	emit("confirm");
};

// 点击取消按钮时触发
const onCancel = ({ selectedValues, selectedOptions, selectedIndexes }) => {
	isShow.value = false;
	emit("cancel", { selectedValues, selectedOptions, selectedIndexes });
};

//点击选项时触发
const onClickOption = ({ currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex }) => {
	findCheckBox();
	emit("onClickOption", { currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex });
};

//打开弹出层且动画结束后触发
const onOpened = () => {
	state.oldctiveView = activeView.value as string;
	state.oldctiveVal = activeVal.value as Array<any>;
	state.isConfirm = false;
	nextTick(() => {
		setChecked(activeVal.value);
	});
	emit("opened");
};

// 关闭弹出层且动画结束后触发;
const onClosed = () => {
	if (!state.isConfirm) {
		//还原数据
		activeView.value = state.oldctiveView;
		activeVal.value = state.oldctiveVal;
		state.isConfirm = false;
	}
	emit("closed");
};
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
	border-radius: 24px 24px 0px 0px;
	background-color: transparent;
}

.picker {
	@include themeify {
		background: themed("BG1");
	}
	:deep(.van-picker__toolbar) {
		position: relative;
		height: 82px;
		display: flex;
		align-items: center;
		justify-content: center;
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

	:deep(.van-picker-column__item) {
		@include themeify {
			color: themed("T1");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		line-height: 36px;

		border-top: 1px solid;
		border-bottom: 1px solid;

		@include themeify {
			$gradient-center: themed("Line");
			-webkit-border-image: -webkit-linear-gradient(left, rgba(59, 193, 22, 0) 0%, $gradient-center 50%, rgba(59, 193, 22, 0) 100%) 2 2 2 2;
			border-image: linear-gradient(90deg, rgba(59, 193, 22, 0) 0%, $gradient-center 50%, rgba(59, 193, 22, 0) 100%) 2 2 2 2;
		}

		.van-ellipsis {
			width: 100%;
		}
		.picker_checkbox {
			// background: red;
			width: 100%;
			input[type="checkbox"] {
				display: none;
			}

			label.checkbox_plan {
				display: block;
				position: relative;
				.check_Tag {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: 58px;
					top: 0px;
					width: 32px;
					height: 32px;
					border-radius: 50%;
					@include themeify {
						$box-shadow: themed("Line");
						background-color: themed("Tag2-P");
						box-shadow: 0px 2px 5px 1px $box-shadow inset;
					}
				}
			}

			input[type="checkbox"]:checked + label.checkbox_plan {
				@include themeify {
					color: themed("Theme-P");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 32px;
				font-weight: 500;
				line-height: 36px; /* 112.5% */

				// background: red;
				.check_Tag {
					&::after {
						content: "";
						display: block;
						width: 18px;
						height: 18px;
						border-radius: 50%;
						// background: red;
						@include themeify {
							background-color: themed("Theme");
						}
					}
				}
			}
		}
	}
	:deep(.van-picker-column__item--selected) {
		@include themeify {
			color: themed("Theme-P");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 500;
		line-height: 36px; /* 112.5% */

		label.checkbox_plan {
			@include themeify {
				color: themed("T1");
			}
		}

		input[type="checkbox"]:checked + label.checkbox_plan {
			@include themeify {
				color: themed("Theme-P");
			}
			.check_Tag {
				&::after {
					@include themeify {
						background-color: themed("Theme");
					}
				}
			}
		}
	}

	:deep(.van-picker__mask) {
		display: none;
	}

	:deep(.van-hairline-unset--top-bottom) {
		display: none !important;

		// border-top: 1px solid;
		// border-bottom: 1px solid;
		// border-image: linear-gradient(90deg, rgba(59, 193, 22, 0) 0%, #3bc116 50%, rgba(59, 193, 22, 0) 100%) 2 2 2 2;
	}
}
</style>
