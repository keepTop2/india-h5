<template>
	<div class="main">
		<!-- 存款金额输入区域 -->
		<div class="cell">
			<div class="label">{{ $t(`recharge['存款金额']`) }}</div>
			<div class="cell_input">
				<!-- 输入框，显示最小和最大存款金额 -->
				<input v-model="state.amount" type="number" :placeholder="`${rechargeConfig.rechargeMinAmount ?? 0} - ${rechargeConfig.rechargeMaxAmount ?? 0}`" @input="amountItemActive = null" />
				<!-- 显示货币单位 -->
				<div class="input_label">{{ rechargeConfig.currencyCode }}</div>
			</div>
		</div>

		<!-- 快捷金额列表 -->
		<div class="amount_list">
			<div
				class="amount_item"
				:class="{ amount_item_active: amountItemActive === index }"
				v-for="(item, index) in quickAmountList"
				:key="index"
				@click="
					{
						state.amount = item;
						amountItemActive = index;
					}
				"
			>
				{{ item }}
			</div>
		</div>
	</div>

	<!-- 手机号码输入区域 -->
	<!--	<div class="main mt_24">
		<div class="cell">
			<div class="label">{{ $t(`recharge['手机号码']`) }}</div>
			<div class="cell_input phone">
				<!~~ 区号选择 ~~>
				<div class="area_code" @click="showAreaCode = true">
					<span>+{{ state.areaCode }}</span>
					<SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
				</div>
				<!~~ 手机号码输入框 ~~>
				<input v-model="state.telephone" type="number" :placeholder="$t(`recharge['请输入手机号码']`)" />
			</div>
		</div>
	</div>-->

	<!-- 提交按钮 -->
	<div class="footer">
		<Button class="mt_40" :type="buttonType" @click="onRecharge">{{ $t('recharge["立即存款"]') }}</Button>
	</div>

	<!-- 区号选择器 -->
	<AreaCodePicker
		v-model:showAreaCode="showAreaCode"
		v-model:searchAreaCode="searchAreaCode"
		:currentAreaCodeIndex="currentAreaCodeIndex"
		:indexList="indexList"
		:areaCode="areaCode"
		@selectAreaCode="selectAreaCode"
	/>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue"; // 导入必要的 Vue 函数
import { useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet"; // 导入钱包 API
import common from "/@/utils/common"; // 导入公共工具
import CommonApi from "/@/api/common"; // 导入公共 API
const router = useRouter();
// 定义组件的 props
const props = defineProps<{
	rechargeWayData: {
		id: string; // 充值方式 ID
	};
}>();

interface CountryData {
	areaCode: string; // 国家区号
	countryName: string; // 国家名称
	countryCode: string; // 国家代码
	icon: string | null; // 国家图标
	maxLength: number; // 最大长度
	minLength: number; // 最小长度
}

// 定义响应式状态
const showAreaCode = ref(false); // 是否显示区号选择器
const areaCode = ref<Record<string, CountryData[]>>({});
const searchAreaCode = ref(""); // 区号搜索内容
const currentAreaCodeIndex = ref<number | string>(""); // 当前选中的区号索引
const indexList = ref<string[]>([]); // 区号索引列表
const areaCodeObj = ref<CountryData | null>(null); // 当前区号对象
const state = reactive<{ areaCode: string }>({
	amount: "",
	depositWayId: props.rechargeWayData.id,
});

// 通道配置信息
const rechargeConfig = ref<{
	rechargeMinAmount: number;
	rechargeMaxAmount: number;
	currencyCode: string;
}>({
	rechargeMinAmount: 0,
	rechargeMaxAmount: 0,
	currencyCode: "",
});

// 快捷金额选项
const quickAmountList = ref<number[]>([]);
const amountItemActive = ref(null) as unknown as null | number;

// 计算属性，判断按钮类型
const buttonType = computed(() => {
	// return Number.isFinite(state.amount) && state.areaCode && state.telephone ? "default" : "disabled";
	return Number.isFinite(state.amount) ? "default" : "disabled";
});

// 监听搜索区号的变化
watch(
	() => searchAreaCode.value,
	() => {
		const filterData = countries.value.filter(
			(item: CountryData) =>
				item.areaCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryName.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase())
		);
		areaCode.value = groupByFirstLetter(filterData || []);
		indexList.value = Object.keys(areaCode.value);
	}
);

const countries = ref<CountryData[]>([]); // 国家数据

// 点击充值
const onRecharge = async () => {
	const res = await walletApi.userRecharge(state).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		router.push({
			path: "/wallet/rechargeDetails",
			query: {
				orderNo: res.data.orderNo,
			},
		});
		window.open(res.data.thirdPayUrl, "_blank");
	}
};

// 获取区号下拉框数据
const getAreaCodeDownBox = () => {
	CommonApi.getAreaCodeDownBox().then((res: any) => {
		if (res.code === common.getInstance().ResCode.SUCCESS) {
			countries.value = res.data; // 设置国家数据
			areaCode.value = groupByFirstLetter(countries.value || []);
			indexList.value = Object.keys(areaCode.value);
			state.areaCode = countries.value[0].areaCode; // 默认选择第一个区号
			areaCodeObj.value = countries.value[0]; // 设置当前区号对象
		}
	});
};

// 获取充值配置
const getRechargeConfig = async () => {
	const params = {
		rechargeWayId: props.rechargeWayData.id,
	};
	const res = await walletApi.getRechargeConfig(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		rechargeConfig.value = res.data;
		quickAmountList.value = res.data.quickAmount.split(",").map(Number); // 转换快捷金额列表为数字
	}
};

// 按首字母分组国家数据
const groupByFirstLetter = (countries: CountryData[]) => {
	return countries.reduce((acc, country) => {
		const firstLetter = country.countryCode[0].toUpperCase(); // 获取首字母并大写处理
		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(country); // 将国家添加到相应字母组
		return acc;
	}, {} as Record<string, CountryData[]>);
};

// 初始化获取充值配置和区号数据
getRechargeConfig();
getAreaCodeDownBox();

// 选择区号的处理函数
const selectAreaCode = (item: string, i: CountryData) => {
	currentAreaCodeIndex.value = item; // 更新当前选择的区号索引
	areaCodeObj.value = i; // 更新区号对象
	state.areaCode = i.areaCode; // 更新区域代码
	showAreaCode.value = false; // 隐藏区号选择器
};
</script>

<style scoped lang="scss">
.main {
	margin: 0 24px;
	padding: 24px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
}
.mt_24 {
	margin-top: 24px;
}

.cell {
	.label {
		margin-bottom: 8px;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
	}

	.cell_input {
		width: 100%;
		height: 82px;
		display: flex;
		align-items: center;
		padding: 0px 24px;
		border-radius: 12px;
		border: 1px solid;
		@include themeify {
			border-color: themed("Line");
			background-color: themed("BG1");
		}
		box-sizing: border-box;

		.area_code {
			position: relative;
			width: 160px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16px;
			padding-right: 20px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
			box-sizing: border-box;
			.down {
				width: 22px;
				height: 14px;
			}
			&::after {
				content: "";
				position: absolute;
				right: 0px;
				width: 2px;
				height: 84px;
				@include themeify {
					background: themed("Line");
				}
			}
		}
		input {
			flex: 1;
			border: 0;
			background-color: transparent;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-style: normal;
			font-weight: 400;
			&::placeholder {
				@include themeify {
					color: themed("T3");
				}
			}
		}

		.input_label {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
	}

	.phone {
		input {
			padding-left: 20px;
		}
	}
}

.amount_list {
	display: grid; /* 使用 Grid 布局 */
	grid-template-columns: repeat(4, 1fr); /* 一行四个项目 */
	gap: 16px; /* 设置项目之间的间距 */
	margin-top: 16px; /* 顶部外边距 */

	.amount_item {
		width: 100%;
		height: 66px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		border: 1px solid rgba(125, 128, 134, 0.5);
		padding: 10px; /* 可选：添加内边距 */
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		box-sizing: border-box;
	}
	.amount_item_active {
		@include themeify {
			border-color: themed("Theme");
		}
	}
}

.footer {
	margin: 36px 55px;
}
</style>
