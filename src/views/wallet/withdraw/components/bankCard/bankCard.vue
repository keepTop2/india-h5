<template>
	<div class="card">
		<div class="header">
			<SvgIcon class="icon" iconName="wallet/line" />
			<span>{{ $t(`withdraw['收款信息']`) }}</span>
		</div>

		<!-- 通过循环生成输入字段 -->
		<div v-for="field in inputFields" :key="field.code">
			<div class="cell" v-if="isFieldVisible(field.code)">
				<div
					class="cell_input"
					:class="{ phone: field.code === 'userPhone', error: field.code === 'userPhone' && !isPhoneValid && state.userPhone }"
					@click="field.code === 'bankName' ? (backShow = true) : null"
				>
					<div v-if="field.code === 'userPhone'" class="area_code" @click="showAreaCode = true">
						<span>+{{ state.areaCode }}</span> <SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
					</div>
					<input v-model="state[field.model]" :type="field.type" :placeholder="$t(`withdraw['${field.placeholder}']`)" :readonly="field.readonly" />
					<SvgIcon v-if="field.code === 'bankName'" class="arrow" iconName="wallet/arrow" />
					<!-- 如果是手机号码且不合法，则显示错误信息 -->
				</div>
				<div v-if="field.code === 'userPhone' && !isPhoneValid && state.userPhone" class="error_text">
					{{ $t(`withdraw['请输入位数字']`, { min: areaCodeObj.minLength, max: areaCodeObj.maxLength }) }}
				</div>
			</div>
		</div>
	</div>

	<!-- 手机号验证 -->
	<div class="card" v-if="!UserStore.getUserInfo.isSetPwd && UserStore.getUserInfo.phone">
		<div class="header">
			<SvgIcon class="icon" iconName="wallet/line" />
			<span>{{ $t(`withdraw['手机号验证']`) }}</span>
		</div>

		<div class="user_phone">
			<div class="label">{{ $t(`withdraw['手机号']`) }}</div>
			<div class="value">
				<span>+{{ UserStore.getUserInfo.areaCode }}</span>
				<span>&nbsp;</span>
				<span>{{ common.maskString(UserStore.getUserInfo.phone) }}</span>
			</div>
		</div>

		<div class="cell">
			<div class="cell_input operate">
				<input v-model="state.smsCode" :placeholder="$t(`withdraw['验证码']`)" />
				<div class="operate_content">
					<!-- <span>{{ $t(`withdraw['获取验证码']`) }}</span> -->
					<CaptchaButton ref="captchaButton" @onCaptcha="onCaptcha" />
				</div>
			</div>
		</div>
	</div>

	<!-- 银行卡选择器 -->
	<VantPicker :multiple="true" v-model:show="backShow" :columns="withdrawWayConfig.bankList" title="" toText="bankName" toValue="bankCode" @confirm="handleConfirm">
		<template #option="item">
			<div class="lang_cell">
				<span> {{ item.item.text }}</span>
			</div>
		</template>
	</VantPicker>

	<!-- 手机区号选择器 -->
	<AreaCodePicker
		v-model:showAreaCode="showAreaCode"
		v-model:searchAreaCode="searchAreaCode"
		:indexList="indexList"
		:areaCode="areaCode"
		:stateAreaCode="state.areaCode"
		@selectAreaCode="selectAreaCode"
	/>
</template>

<script setup lang="ts">
import CommonApi from "/@/api/common";
import common from "/@/utils/common";
import { useUserStore } from "/@/store/modules/user";
import { bindApi } from "/@/api/securityCenter";
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";

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

const UserStore = useUserStore();

const captchaButton = ref<{
	startCountdown: () => void;
} | null>(null);

const backShow = ref(false); // 控制银行卡选择器的显示
const showAreaCode = ref(false); // 控制区号选择器的显示
const indexList: any = ref([]); // 存储区号索引列表
const searchAreaCode = ref(""); // 存储搜索的区号
const areaCode: any = ref([]); // 存储区号数据
const countries: any = ref([]); // 存储国家数据
const areaCodeObj: any = ref({}); // 存储当前选中的区号对象
const state = reactive({
	userPhone: "",
	areaCode: "", // 存储当前选中的区号
	smsCode: "", // 手机号验证码
});

// 输入字段的映射数组
const inputFields = [
	{ code: "bankCard", model: "bankCard", type: "text", placeholder: "请输入银行卡号" },
	{ code: "bankName", model: "bankName", type: "text", placeholder: "请选择银行", readonly: true },
	{ code: "bankCode", model: "bankCode", type: "text", placeholder: "请输入银行代码" },
	{ code: "userName", model: "userName", type: "text", placeholder: "请输入名" },
	{ code: "surname", model: "surname", type: "text", placeholder: "请输入姓" },
	{ code: "provinceName", model: "provinceName", type: "text", placeholder: "请输入省" },
	{ code: "cityName", model: "cityName", type: "text", placeholder: "请输入城市" },
	{ code: "detailAddress", model: "detailAddress", type: "text", placeholder: "请输入详细地址" },
	{ code: "userEmail", model: "userEmail", type: "text", placeholder: "请输入邮箱地址" },
	{ code: "userPhone", model: "userPhone", type: "text", placeholder: "请输入手机号" },
];

// 检查字段是否可见的函数
const isFieldVisible = (code) => {
	return props.withdrawWayConfig.collectInfoVOS && Array.isArray(props.withdrawWayConfig.collectInfoVOS) && props.withdrawWayConfig.collectInfoVOS.some((item) => item.filedCode === code);
};

// 监听区号搜索变化
watch(
	() => searchAreaCode.value,
	() => {
		const filterData = countries.value.filter(
			(item: any) =>
				item.areaCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryName.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase())
		);
		// 按首字母分组区号
		areaCode.value = groupByFirstLetter(filterData || []);
		indexList.value = Object.keys(areaCode.value); // 更新索引列表
	}
);

// 手机号正则验证
const isPhoneValid = computed(() => new RegExp(`^\\d{${areaCodeObj.value.minLength},${areaCodeObj.value.maxLength}}$`).test(state.userPhone));

// 组件挂载时获取区号数据
onMounted(() => {
	getAreaCodeDownBox();
});

// 获取区号下拉框数据的函数
const getAreaCodeDownBox = () => {
	CommonApi.getAreaCodeDownBox().then((res: any) => {
		if (res.code == common.getInstance().ResCode.SUCCESS) {
			countries.value = res.data; // 设置国家数据
			// 按首字母分组国家
			areaCode.value = groupByFirstLetter(countries.value || []);
			indexList.value = Object.keys(areaCode.value); // 更新索引列表
			state.areaCode = countries.value[0].areaCode; // 默认选中第一个国家的区号
			areaCodeObj.value = countries.value[0]; // 存储第一个国家的区号信息
		}
	});
};

// 按首字母分组国家的函数
const groupByFirstLetter = (countries) => {
	return countries.reduce((acc, country) => {
		const firstLetter = country.countryCode[0].toUpperCase(); // 获取首字母并大写处理
		if (!acc[firstLetter]) {
			acc[firstLetter] = []; // 如果字母组不存在，则初始化
		}
		acc[firstLetter].push(country); // 将国家添加到相应字母组
		return acc;
	}, {} as any);
};

// 发送验证码
const onCaptcha = async () => {
	let params = {} as any;
	params = { phone: UserStore.getUserInfo.areaCode, areaCode: UserStore.getUserInfo.phone };
	const res = await bindApi.sendSms(params).catch();
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		captchaButton.value?.startCountdown();
	}
};

// 选择银行卡时的确认处理
const handleConfirm = (selectedValues) => {
	const { selectedOptions } = selectedValues;
	const options = selectedOptions[0];
	state.bankName = options.text; // 设置银行名称
	state.bankCode = options.value; // 设置银行代码
};

// 选择区号的处理
const selectAreaCode = (item, i) => {
	areaCodeObj.value = i; // 更新区号对象
	state.areaCode = i.areaCode; // 更新选中的区号
	showAreaCode.value = false; // 关闭区号选择器
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
	isPhoneValid,
	clearParams,
});
</script>

<style scoped lang="scss">
@import "../common.scss"; // 引入公共样式
</style>
