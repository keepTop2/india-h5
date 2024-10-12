<template>
	<form class="form">
		<!-- 邮箱 -->
		<div v-if="route.params.type == 'email'">
			<span class="title">{{ $t('bindPhone["邮箱账号"]') }}</span>
			<FormInput v-model="state.email" type="text" :placeholder="$t(`forgetPassword['请输入电子邮箱']`)" :errorBorder="!isEmailValid && state.email !== '' ? true : false">
				<template v-slot:right>
					<SvgIcon v-if="state.email" class="clearIcon" iconName="loginOrRegister/clear" @click="state.email = ''" />
				</template>
			</FormInput>
			<div class="error_text">
				<span v-if="!isEmailValid && state.email !== ''" class="text">{{ $t('forgetPassword["邮箱格式不正确"]') }}</span>
			</div>
		</div>

		<!-- 手机号码 -->

		<div v-if="route.params.type == 'phone'">
			<span class="title">{{ $t('bindPhone["手机号"]') }}</span>
			<div class="phone" :class="{ 'form-input-error': !isPhoneValid && state.phone !== '' ? true : false }">
				<div class="area_code" @click="showAreaCode = true">
					<span>+{{ state.areaCode }}</span
					><SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
				</div>
				<FormInput v-model="state.phone" type="text" :placeholder="$t(`forgetPassword['请输入手机号']`)">
					<template v-slot:right>
						<SvgIcon v-if="state.phone" class="clearIcon" iconName="loginOrRegister/clear" @click="state.phone = ''" />
					</template>
				</FormInput>
			</div>
			<div class="error_text">
				<span v-if="!isPhoneValid && state.phone !== ''" class="text">{{ $t('forgetPassword["请输入8-12位数字"]', { min: areaCodeObj.minLength, max: areaCodeObj.maxLength }) }}</span>
			</div>
		</div>

		<span class="title">{{ $t('bindPhone["验证码"]') }}</span>
		<FormInput v-model="state.verifyCode" type="text" :placeholder="$t(`common['验证码']`)">
			<template v-slot:right>
				<CaptchaButton ref="captchaButton" :disabled="captchaDisabled" @onCaptcha="onCaptcha" />
			</template>
		</FormInput>

		<div class="tips">
			{{ $t('forgetPassword["重新发送"]') }}<span class="help">{{ $t('common["联系客服"]') }}</span>
		</div>

		<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onSubmit">{{ $t('bindPhone["确定"]') }}</Button>
	</form>
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
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";
import { bindApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { showToast } from "vant";
import CommonApi from "/@/api/common";
const showAreaCode = ref(false);
const route = useRoute();
const indexList: any = ref([]);
const router = useRouter();
const searchAreaCode = ref("");
const areaCode: any = ref([]);
const areaCodeObj: any = ref({});

const captchaButton = ref<{
	startCountdown: () => void;
} | null>(null);
const countries: any = ref([]);
const state = reactive({
	email: "",
	phone: "",
	verifyCode: "",
	areaCode: "",
});
onMounted(() => {
	getAreaCodeDownBox();
});
watch(
	() => searchAreaCode.value,
	() => {
		const filterData = countries.value.filter(
			(item: any) =>
				item.areaCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryName.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase())
		);
		areaCode.value = groupByFirstLetter(filterData || []);
		indexList.value = Object.keys(areaCode.value);
	}
);
const getAreaCodeDownBox = () => {
	CommonApi.getAreaCodeDownBox().then((res: any) => {
		if (res.code == common.getInstance().ResCode.SUCCESS) {
			countries.value = res.data;
			countries.value = [
				{
					areaCode: "44",
					countryName: "英国",
					countryCode: "GB",
					icon: "https://oss.example.com/flags/uk.jpg",
					maxLength: 10,
					minLength: 10,
				},
				{
					areaCode: "91",
					countryName: "印度",
					countryCode: "IN",
					icon: "https://oss.example.com/flags/india.jpg",
					maxLength: 10,
					minLength: 10,
				},
				{
					areaCode: "81",
					countryName: "日本",
					countryCode: "JP",
					icon: "https://oss.example.com/flags/japan.jpg",
					maxLength: 11,
					minLength: 10,
				},
				{
					areaCode: "49",
					countryName: "德国",
					countryCode: "DE",
					icon: "https://oss.example.com/flags/germany.jpg",
					maxLength: 11,
					minLength: 10,
				},
				{
					areaCode: "86",
					countryName: "中国",
					countryCode: "CN",
					icon: "https://oss.example.com/flags/china.jpg",
					maxLength: 11,
					minLength: 11,
				},
				{
					areaCode: "33",
					countryName: "法国",
					countryCode: "FR",
					icon: "https://oss.example.com/flags/france.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "61",
					countryName: "澳大利亚",
					countryCode: "AU",
					icon: "https://oss.example.com/flags/australia.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "7",
					countryName: "俄罗斯",
					countryCode: "RU",
					icon: "https://oss.example.com/flags/russia.jpg",
					maxLength: 10,
					minLength: 10,
				},
				{
					areaCode: "39",
					countryName: "意大利",
					countryCode: "IT",
					icon: "https://oss.example.com/flags/italy.jpg",
					maxLength: 10,
					minLength: 9,
				},
				{
					areaCode: "34",
					countryName: "西班牙",
					countryCode: "ES",
					icon: "https://oss.example.com/flags/spain.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "27",
					countryName: "南非",
					countryCode: "ZA",
					icon: "https://oss.example.com/flags/south_africa.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "55",
					countryName: "巴西",
					countryCode: "BR",
					icon: "https://oss.example.com/flags/brazil.jpg",
					maxLength: 11,
					minLength: 10,
				},
				{
					areaCode: "64",
					countryName: "新西兰",
					countryCode: "NZ",
					icon: "https://oss.example.com/flags/new_zealand.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "46",
					countryName: "瑞典",
					countryCode: "SE",
					icon: "https://oss.example.com/flags/sweden.jpg",
					maxLength: 10,
					minLength: 7,
				},
				{
					areaCode: "41",
					countryName: "瑞士",
					countryCode: "CH",
					icon: "https://oss.example.com/flags/switzerland.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "32",
					countryName: "比利时",
					countryCode: "BE",
					icon: "https://oss.example.com/flags/belgium.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "31",
					countryName: "荷兰",
					countryCode: "NL",
					icon: "https://oss.example.com/flags/netherlands.jpg",
					maxLength: 9,
					minLength: 9,
				},
				{
					areaCode: "66",
					countryName: "泰国",
					countryCode: "TH",
					icon: "https://oss.example.com/flags/thailand.jpg",
					maxLength: 10,
					minLength: 9,
				},
				{
					areaCode: "82",
					countryName: "韩国",
					countryCode: "KR",
					icon: "https://oss.example.com/flags/south_korea.jpg",
					maxLength: 11,
					minLength: 10,
				},
				{
					areaCode: "90",
					countryName: "土耳其",
					countryCode: "TR",
					icon: "https://oss.example.com/flags/turkey.jpg",
					maxLength: 10,
					minLength: 10,
				},
			];
			areaCode.value = groupByFirstLetter(countries.value || []);
			indexList.value = Object.keys(areaCode.value);
			state.areaCode = countries.value[0].areaCode;
			areaCodeObj.value = countries.value[0];
		}
	});
};
const groupByFirstLetter = (countries) => {
	return countries.reduce((acc, country) => {
		const firstLetter = country.countryCode[0].toUpperCase(); // 获取首字母并大写处理
		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(country); // 将国家添加到相应字母组
		return acc;
	}, {} as any);
};
// 邮箱正则
const isEmailValid = computed(() => common.emailRG.test(state.email));
const isPhoneValid = computed(() => new RegExp(`^\\d{${areaCodeObj.value.minLength},${areaCodeObj.value.maxLength}}$`).test(state.phone));
// 手机号正则
// const isPhoneValid = computed(() => common.phoneRG.test(state.phone));

// 验证码按钮禁用状态
const captchaDisabled = computed(() => {
	if (route.params.type === "email") return !isEmailValid.value || state.email === "";
	if (route.params.type === "phone") return !isPhoneValid.value || state.phone === "";
	return true;
});

// 确定按钮禁用状态
const btnDisabled = computed(() => {
	if (route.params.type === "email") return !isEmailValid.value || state.email === "" || state.verifyCode === "";
	if (route.params.type === "phone") return !isPhoneValid.value || state.phone === "" || state.verifyCode === "";
	return true;
});

const onCaptcha = async () => {
	let params = {} as any;
	let res;
	if (route.params.type === "phone") {
		params = { phone: state.phone, areaCode: state.areaCode };
		res = await bindApi.sendSms(params);
	} else if (route.params.type === "email") {
		params = { email: state.email };
		res = await bindApi.sendMail(params);
	}
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		captchaButton.value?.startCountdown();
	}
};

const onSubmit = async () => {
	const params = {
		areaCode: state.areaCode,
		account: route.params.type === "email" ? state.email : state.phone,
		type: route.params.type === "email" ? 1 : 2,
		verifyCode: state.verifyCode,
	};
	const res = await bindApi.bindAccount(params).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		showToast(res.message);
		router.go(-1);
	}
};
const selectAreaCode = (item, i) => {
	areaCodeObj.value = i;
	state.areaCode = i.areaCode;
	showAreaCode.value = false;
};
</script>

<style scoped lang="scss">
.form {
	padding: 40px 55px;

	.title {
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 16px;
		display: inline-block;
	}

	.phone {
		display: flex;
		align-items: center;
		border-radius: 12px;
		@include themeify {
			background: themed("BG3");
		}
		box-sizing: border-box;
		.area_code {
			position: relative;
			width: 148px;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
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
		:deep(.from-input) {
			flex: 1;
		}
	}
	.form-input-error {
		position: relative;

		&::after {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			border-radius: 12px;
			border: 1px solid;
			@include themeify {
				// box-shadow: 0 0 0 1px themed("Theme");
				border-color: themed("Theme");
			}
			transition: box-shadow 20s;
			box-sizing: border-box;
			pointer-events: none; /* 确保伪元素不会阻止用户与实际内容交互 */
		}
	}

	.right {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	:deep(.clearIcon),
	:deep(.icon) {
		width: 32px;
		height: 32px;
	}

	.error_text {
		min-height: 40px;
		.text {
			display: block;
			margin-top: 4px;
			font-family: "PingFang SC";
			font-size: 20px;
			font-weight: 400;
			@include themeify {
				color: themed("Theme");
			}
		}
	}

	.tips {
		margin-top: 20px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
		.help {
			@include themeify {
				color: themed("Theme");
			}
		}
	}
}
</style>
