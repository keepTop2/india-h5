<template>
	<div class="areaCode_picker">
		<van-action-sheet :show="modelShow" @update:show="handleShowUpdate" :closeable="false" style="min-height: 80%">
			<template #default>
				<div class="header">
					<div class="icon" @click="close">
						<SvgIcon class="close_icon" iconName="common/close" />
					</div>
					<div class="title">{{ title }}</div>
					<div class="right_text" @click="confirm">确定</div>
				</div>
				<div v-if="enableSearch" class="search_input">
					<div class="icon"><SvgIcon iconName="common/search_input_icon" /></div>
					<input type="text" v-model="searchModel" :placeholder="placeholder" />
					<div class="clear_icon" v-if="searchModel" @click="clearSearch">
						<SvgIcon iconName="common/close" />
					</div>
				</div>
				<ul>
					<li v-for="(item, index) in filteredAreaCodeList" :key="index" :class="{ cell_item: true, cell_item_active: selectedItem === item }" @click="onChoose(item)">
						<slot name="cell" :item="item"></slot>
						<span class="icon">
							<svg-icon :iconName="selectedItem === item ? 'common/circle_theme' : 'common/circle'" size="30px"></svg-icon>
						</span>
					</li>
				</ul>
			</template>
		</van-action-sheet>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const emit = defineEmits(["update:modelShow", "update:searchModel", "confirm"]);

/**
 * SearchSelector 组件的 Props 类型定义。
 * @typedef {Object} Props
 * @property {boolean} modelShow - 控制选择器的显示与隐藏。
 * @property {string} [title] - 选择器的标题。
 * @property {string} [searchModel] - 当前搜索输入的值。
 * @property {string} [placeholder] - 搜索输入框的占位符文本。
 * @property {boolean} [enableSearch] - 是否启用搜索输入框。
 * @property {string[]} [searchCodeList] - 用于搜索的数据项的键名列表。
 * @property {unknown[]} [dataList] - 要在选择器中显示的数据项列表。
 */
const props = withDefaults(
	defineProps<{
		modelShow: boolean; // 控制选择器的显示与隐藏。
		title?: string; // 选择器的标题。
		searchModel?: string; // 当前搜索输入的值。
		placeholder?: string; // 搜索输入框的占位符文本。
		enableSearch?: boolean; // 是否启用搜索输入框。
		searchCodeList?: string[]; // 用于搜索的数据项的键名列表。
		dataList?: Array<Record<string, any>>; // 要在选择器中显示的数据项列表。
	}>(),
	{
		modelShow: false, // modelShow 的默认值为 false。
		title: "标题", // 默认标题。
		searchModel: "", // 默认搜索模型为空字符串。
		placeholder: "搜索", // 默认占位符文本。
		enableSearch: true, // 默认启用搜索输入框。
		searchCodeList: [], // 默认搜索键名列表为空数组。
		dataList: [], // 默认数据列表为空数组。
	}
);

const searchModel = ref(props.searchModel || ""); // 初始化为 props 中的值或空字符串
const selectedItem = ref<unknown | null>(null); // 选中的项

const onChoose = (item: unknown) => {
	selectedItem.value = item;
};

const close = () => {
	emit("update:modelShow", false);
};

const confirm = () => {
	emit("update:modelShow", false);
	emit("confirm", selectedItem.value);
};

const clearSearch = () => {
	searchModel.value = "";
};

// 数据过滤，根据 searchCodeList 进行过滤
const filteredAreaCodeList = computed(() => {
	if (!searchModel.value) return props.dataList; // 如果没有搜索内容，返回原始数据
	return props.dataList.filter((item) => {
		return props.searchCodeList.some((code) => {
			const value = item[code]; // 取出相应字段的值
			return value && String(value).toLowerCase().includes(searchModel.value.toLowerCase());
		});
	});
});

// 监听 modelShow 更新并发出事件
const handleShowUpdate = (value: boolean) => {
	emit("update:modelShow", value);
};

// 监听 searchModel 更新并发出事件
watch(
	() => searchModel.value,
	(newVal) => {
		emit("update:searchModel", newVal);
	}
);
</script>

<style scoped lang="scss">
.areaCode_picker {
	:deep(.van-popup) {
		@include themeify {
			background: themed("BG1");
		}
	}
}

.header {
	position: relative;
	width: 100%;
	height: 82px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px 48px;
	border-bottom: 1px solid;
	@include themeify {
		border-color: themed("Line");
	}
	box-sizing: border-box;

	.icon {
		position: absolute;
		left: 48px;
		width: 32px;
		height: 32px;
		.close_icon {
			width: 32px;
			height: 32px;
		}
	}
	.title {
		text-align: center; /* 水平居中 */
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 500;
	}
	.right_text {
		position: absolute;
		right: 48px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
	}
}
.search_input {
	height: 64px;
	display: flex;
	align-items: center;
	gap: 16px;
	margin: 24px 48px;
	padding: 0px 24px;
	@include themeify {
		background: themed("BG3");
	}
	border-radius: 12px;
	.icon {
		width: 38px;
		height: 38px;
		svg {
			width: 100%;
			height: 100%;
		}
	}
	input {
		flex: 1;
		background-color: transparent;
		border: 0;
		margin: 0;
		padding: 0;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
	}

	.clear_icon {
		width: 32px;
		height: 32px;
		svg {
			width: 100%;
			height: 100%;
		}
	}
}

.cell_item {
	width: 100%;
	min-height: 76px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 48px;
	box-sizing: border-box;
}

.cell_item .icon {
	margin: 0px 10px;
}

.cell_item_active {
	position: relative;
	&::before,
	&::after {
		content: "";
		position: absolute;
		left: 0;
		width: 100%;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, rgba(255, 40, 75, 0.8) 50%, transparent 100%);
		will-change: transform, opacity;
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	&::before {
		top: 0;
	}
	&::after {
		bottom: 0;
	}
}
</style>
