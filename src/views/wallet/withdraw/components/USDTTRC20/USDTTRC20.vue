<template>
	<div class="card">
		<div class="header">
			<SvgIcon class="icon" iconName="wallet/line" />
			<span>{{ $t(`withdraw['收款信息']`) }}</span>
		</div>

		<div class="user_phone">
			<div class="label">{{ $t(`withdraw['协议']`) }}</div>
			<div class="value">
				<span>{{ withdrawWayData.networkType }}</span>
			</div>
		</div>

		<!-- 通过循环生成输入字段 -->
		<div v-for="field in inputFields" :key="field.code">
			<div class="cell" v-if="isFieldVisible(field.code)">
				<div class="cell_input">
					<input v-model="state[field.model]" :type="field.type" :placeholder="$t(`withdraw['${field.placeholder}']`)" @focus="onFocus(field.model)" @blur="onBlur(field.model)" />
				</div>
				<div v-if="field.code === 'addressNo' && withdrawWayConfig.lastWithdrawInfoVO.addressNo && lastWithdrawInfoShow && !state.addressNo" class="last_info">
					<div class="last_cell" @mousedown="onGetLastWithdrawInfo">
						<SvgIcon class="icon" iconName="wallet/history_Icon" />
						<div class="value">{{ common.getInstance().USDTAddressHiding(withdrawWayConfig.lastWithdrawInfoVO.addressNo) }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "/@/utils/common";

// 定义组件的props
const props = defineProps({
	withdrawWayData: {
		type: Object,
		default: {},
	},
	withdrawWayConfig: {
		type: Object,
		default: {},
	},
});
const lastWithdrawInfoShow = ref(false); // 控制区号选择器的显示
const state = reactive({
	networkType: props.withdrawWayData.networkType, // 网络协议
	addressNo: "", // 加密货币收款地址
});

// 输入字段的映射数组
const inputFields = [{ code: "addressNo", model: "addressNo", type: "text", placeholder: "请输入地址" }];

// 检查字段是否可见的函数
const isFieldVisible = (code) => {
	return props.withdrawWayConfig.collectInfoVOS && Array.isArray(props.withdrawWayConfig.collectInfoVOS) && props.withdrawWayConfig.collectInfoVOS.some((item) => item.filedCode === code);
};

// 选择上一次提款信息
const onGetLastWithdrawInfo = () => {
	Object.assign(state, props.withdrawWayConfig.lastWithdrawInfoVO);
	console.log("state", state);
	lastWithdrawInfoShow.value = false;
};

// 银行卡号输入框聚焦
const onFocus = (code) => {
	if (code === "bankCard") {
		if (props.withdrawWayConfig.lastWithdrawInfoVO.bankCard) {
			lastWithdrawInfoShow.value = true;
		}
	}
};

// 银行卡号输入框失去焦点
const onBlur = (code) => {
	if (code === "bankCard") {
		lastWithdrawInfoShow.value = false;
	}
};

// 清空表单参数
const clearParams = () => {
	Object.keys(state).forEach((key) => {
		state[key] = ""; // 将每个属性设置为空字符串
	});
};

// 暴露变量和方法
defineExpose({
	state,
	clearParams,
});
</script>

<style scoped lang="scss">
@import "../common.scss"; // 引入公共样式
</style>
