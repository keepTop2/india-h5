<template>
	<div class="mainCurrency-container">
		<VantNavBar :title="$t(`VantNavBar['选择主货币']`)" @onClickLeft="onClickLeft" />
		<div class="selector">
			<FormInput v-model="state.value" type="text" :placeholder="$t(`mainCurrency['请输入货币名称或简称']`)" />

			<div class="option mt_18" v-if="filteredCurrencyList.length > 0">
				<div class="item" :class="{ active_item: item.code == route.query.currency }" v-for="(item, index) in filteredCurrencyList" :key="index" @click="onSelectCurrency(item)">
					<span class="value">{{ item.value }}</span>
					
					<span class="label">{{ item.code }}</span>
				</div>
			</div>

			<div v-else-if="state.dataLoaded && state.value !== ''" class="noData">{{ $t(`mainCurrency['暂不支持此货币']`) }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";

interface CurrencyEnums {
	type?: any;
	code?: string;
	value?: string;
}

const route = useRoute();
const router = useRouter();

const state = reactive({
	currencyList: [] as CurrencyEnums[],
	value: "",
	dataLoaded: false,
});

console.log("route", route);

// 获取语言配置
const getCommonBusinessDownBox = async () => {
	const res = await CommonApi.getCommonBusinessDownBox().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		state.currencyList = res.data.currencyEnums;
		state.dataLoaded = true;
	}
};

getCommonBusinessDownBox();

//  选择币种
const onSelectCurrency = (item: CurrencyEnums) => {
	router.push({ path: "/register", query: { currency: item.code } });
};

// 创建一个计算属性 filteredCurrencyList，用于根据输入的搜索值动态过滤 currencyList 中的对象
const filteredCurrencyList = computed(() => {
	// 获取输入框中的搜索值，并将其转换为小写
	const searchValue = state.value.toLowerCase();
	// 过滤 currencyList 数组，返回包含搜索值的对象
	return state.currencyList.filter((item) => {
		// 检查 item 的 code 属性是否包含搜索值（忽略大小写）
		// 或者 item 的 value 属性是否包含搜索值（忽略大小写）
		return (
			item.code?.toLowerCase().includes(searchValue) || // 如果 code 中包含搜索值，返回 true
			item.value?.toLowerCase().includes(searchValue) // 或者如果 value 中包含搜索值，返回 true
		);
	});
});

const onClickLeft = () => {
	window.history.back();
};
</script>

<style scoped lang="scss">
.mainCurrency-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.selector {
		padding: 32px 55px;

		.option {
			.item {
				height: 69px;
				display: flex;
				align-items: center;
				padding: 18px 24px;
				justify-content: space-between;
				@include themeify {
					color: themed("TB");
				}
				font-size: 26px;
				font-weight: 400;
				border-bottom: 1px solid;
				@include themeify {
					border-color: themed("Line");
				}
				box-sizing: border-box;

				.value {
					margin-left: 16px;
				}
			}
			.active_item {
				@include themeify {
					color: themed("Theme");
				}
			}
		}

		.noData {
			margin-top: 270px;
			@include themeify {
				color: themed("T1");
			}
			text-align: center;
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
	}
}
</style>
