<template>
	<van-action-sheet v-model:show="show" @close="cancel">
		<div class="content">
			<div class="flex header">
				<div @click="cancel">
					<svg-icon iconName="common/close" size="30px"></svg-icon>
				</div>
				<div class="color_TB fs_32">{{ $t(`common['选择主货币']`) }}</div>
				<div></div>
			</div>
			<div class="langList">
				<div v-for="item in filterSearch" class="langItem flex" :class="currentActiveLang === item.code ? ' active' : ''" @click="setActive(item)">
					<div class="flex">{{ item.currencyNameI18 }}/{{ item.currencyCode }}</div>
					<div>
						<svg-icon :iconName="currency.currencyCode === item.currencyCode ? 'common/circle_theme' : 'common/circle'" size="30px"></svg-icon>
					</div>
				</div>
			</div>
		</div>
	</van-action-sheet>
</template>

<script setup lang="ts">
import CommonApi from "/@/api/common";
import { useUserStore } from "/@/store/modules/user";
import common from "/@/utils/common";
const userStore = useUserStore();
const langList: any = ref([]);
const props = defineProps({
	modelValue: Boolean,
	currency: String as any,
});
const state = reactive({
	currencyList: [],
	value: "",
	dataLoaded: false,
});

const show = ref(false);
const currentActiveLang = ref(userStore.getlangInfo.code);
const currentLangInfo: any = ref({});

watch(
	() => props.modelValue,
	() => {
		if (props.modelValue) {
			show.value = true;
			currentActiveLang.value = userStore.getlangInfo.code;
		} else {
			show.value = false;
		}
	}
);
const emit = defineEmits(["update:modelValue", "setmainCurrency"]);
const cancel = () => {
	emit("update:modelValue", false);
	show.value = false;
};

onMounted(() => {
	getCurrencyList();
});
const searchValue = ref("");
const getCurrencyList = async () => {
	const res = await CommonApi.getCurrencyList().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.currencyList = res.data;
		state.dataLoaded = true;
	}
};
const filterSearch: any = computed(() => {
	// 获取输入框中的搜索值，并将其转换为小写
	const searchValue = state.value.toLowerCase();
	// 过滤 currencyList 数组，返回包含搜索值的对象
	return state.currencyList.filter((item: any) => {
		// 检查 item 的 code 属性是否包含搜索值（忽略大小写）
		// 或者 item 的 value 属性是否包含搜索值（忽略大小写）
		return (
			item.currencyCode?.toLowerCase().includes(searchValue) || // 如果 code 中包含搜索值，返回 true
			item.currencyNameI18?.toLowerCase().includes(searchValue) // 或者如果 value 中包含搜索值，返回 true
		);
	});
});

const setActive = async (value) => {
	emit("setmainCurrency", value);
	cancel();
};
</script>
<style lang="scss"></style>
<style scoped lang="scss">
.van-popup {
	@include themeify {
		background: themed("BG1");
	}
}
.content {
	min-height: 70vh;
	@include themeify {
		background: themed("BG1");
	}
	.header {
		padding: 20px 48px;
		@include themeify {
			color: themed("T1");
			font-size: 30px;
			border-bottom: 1px solid themed("Line");
		}
	}
	.search {
		margin: 12px 44px;
		height: 64px;
	}
	.langList {
		padding: 0 48px;
		margin-top: 30px;
	}
	.langItem {
		display: flex;
		height: 76px;
		display: flex;
		align-items: center;
		gap: 16px;
		position: relative;
		@include themeify {
			color: themed("T1");
			font-size: 28px;
		}
		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}
	.active::after {
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

	.active::before {
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
