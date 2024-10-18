<template>
	<div class="main">
		<div class="cell">
			<div class="label">{{ $t(`recharge['存款人姓名']`) }}</div>
			<div class="cell_input">
				<input v-model="state.depositName" type="text" :placeholder="$t(`recharge['请输入存款人姓名']`)" />
			</div>
		</div>
		<div class="cell">
			<div class="label">{{ $t(`recharge['存款金额']`) }}</div>
			<div class="cell_input">
				<input v-model="state.amount" type="number" :placeholder="`${rechargeConfig.rechargeMinAmount ?? 0} - ${rechargeConfig.rechargeMaxAmount ?? 0}`" @input="amountItemActive = null" />
				<div class="input_label">{{ rechargeConfig.currencyCode }}</div>
			</div>
		</div>

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

	<div class="footer">
		<Button class="mt_40" :type="buttonType" @click="onRecharge">{{ $t('recharge["立即存款"]') }}</Button>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet";
import common from "/@/utils/common";
const router = useRouter();
const props = defineProps({
	rechargeWayData: {
		type: Object,
		default: {},
	},
});

const state = reactive({
	depositName: "",
	amount: "",
	depositWayId: props.rechargeWayData.id,
});

// 通道配置信息
const rechargeConfig = ref({
	rechargeMinAmount: 0,
	rechargeMaxAmount: 0,
});
// 快捷金额选项
const quickAmountList = ref([]);
const amountItemActive = ref(null) as unknown as null | number;

// 计算属性，判断按钮类型
const buttonType = computed(() => {
	return state.depositName && Number.isFinite(state.amount) ? "default" : "disabled";
});

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

const getRechargeConfig = async () => {
	const params = {
		rechargeWayId: props.rechargeWayData.id,
	};
	const res = await walletApi.getRechargeConfig(params).catch((err) => err);
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		rechargeConfig.value = res.data;
		quickAmountList.value = res.data.quickAmount.split(",").map(Number);
	}
};

getRechargeConfig();
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

.cell {
	margin-top: 16px;
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
