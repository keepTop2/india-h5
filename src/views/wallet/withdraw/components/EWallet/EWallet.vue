<template>
	<div class="card">
		<div class="header">
			<SvgIcon class="icon" iconName="wallet/line" />
			<span>{{ $t(`withdraw['收款信息']`) }}</span>
		</div>

		<!-- 通过循环生成输入字段 -->
		<template v-for="field in inputFields" :key="field.code">
			<div class="cell">
				<div class="cell_input" v-if="isFieldVisible(field.code) && !['userAccount', 'userPhone'].includes(field.code)">
					<input v-model="state[field.model]" :type="field.type" :placeholder="$t(`withdraw['${field.placeholder}']`)" />
				</div>
				<!-- 用户账号 -->
				<template v-if="isFieldVisible(field.code) && field.code === 'userAccount'">
					<div class="cell_input">
						<input v-model="state[field.model]" :type="field.type" :placeholder="$t(`withdraw['${field.placeholder}']`)" @focus="lastWithdrawInfoShow = true" @blur="lastWithdrawInfoShow = false" />
					</div>
					<div v-if="withdrawWayConfig.lastWithdrawInfoVO.userAccount && lastWithdrawInfoShow && !state.userAccount" class="last_info">
						<div class="last_cell" @mousedown="onGetLastWithdrawInfo">
							<SvgIcon class="icon" iconName="wallet/history_Icon" />
							<div class="value">{{ common.getInstance().EWalletHiding(withdrawWayConfig.lastWithdrawInfoVO.userAccount) }}</div>
						</div>
					</div>
				</template>
				<!-- 手机号 -->
				<template v-if="isFieldVisible(field.code) && field.code === 'userPhone'">
					<div class="cell_input phone">
						<div class="area_code" :class="{ error: !isPhoneValid && state.userPhone }" @click="showAreaCode = true">
							<span v-if="state.areaCode">+{{ state.areaCode }}</span> <SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
						</div>
						<input v-model="state[field.model]" :type="field.type" :placeholder="$t(`withdraw['${field.placeholder}']`)" />
					</div>
					<div v-if="!isPhoneValid && state.userPhone" class="error_text">
						{{ $t(`withdraw['请输入位数字']`, { min: areaCodeObj.minLength, max: areaCodeObj.maxLength }) }}
					</div>
				</template>
			</div>
		</template>
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
					<CaptchaButton ref="captchaButton" type="text" :text="$t('withdraw.获取验证码')" @onCaptcha="onCaptcha" />
				</div>
			</div>
		</div>
	</div>

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
	stopCountdown: () => void;
} | null>(null);

const showAreaCode = ref(false); // 控制区号选择器的显示
const lastWithdrawInfoShow = ref(false); // 控制区号选择器的显示
const indexList: any = ref([]); // 存储区号索引列表
const searchAreaCode = ref(""); // 存储搜索的区号
const areaCode: any = ref([]); // 存储区号数据
const countries: any = ref([]); // 存储国家数据
const areaCodeObj: any = ref({}); // 存储当前选中的区号对象
const state = reactive({
	userAccount: "",
	userPhone: "",
	areaCode: "", // 存储当前选中的区号
	smsCode: "", // 手机号验证码
});

// 输入字段的映射数组
const inputFields = [
	{ code: "userAccount", model: "userAccount", type: "text", placeholder: "请输入账号" },
	{ code: "userPhone", model: "userPhone", type: "text", placeholder: "请输入手机号" },
	{ code: "userName", model: "userName", type: "text", placeholder: "请输入名" },
	{ code: "surname", model: "surname", type: "text", placeholder: "请输入姓" },
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
	params = { phone: UserStore.getUserInfo.phone, areaCode: UserStore.getUserInfo.areaCode };
	const res = await bindApi.sendSms(params).catch();
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		captchaButton.value?.startCountdown();
	}
};

// 归零验证码
const stopCountdown = () => {
	captchaButton.value?.stopCountdown();
};

// 选择区号的处理
const selectAreaCode = (item, i) => {
	areaCodeObj.value = i; // 更新区号对象
	state.areaCode = i.areaCode; // 更新选中的区号
	showAreaCode.value = false; // 关闭区号选择器
};

// 选择上一次提款信息
const onGetLastWithdrawInfo = () => {
	Object.assign(state, props.withdrawWayConfig.lastWithdrawInfoVO);
	lastWithdrawInfoShow.value = false;
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
	inputFields,
	clearParams,
	getAreaCodeDownBox,
	stopCountdown,
});
</script>

<style scoped lang="scss">
@import "../common.scss"; // 引入公共样式
</style>
