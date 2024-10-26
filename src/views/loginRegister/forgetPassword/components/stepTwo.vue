<template>
	<div class="content">
		<div class="title">{{ state.type == "email" ? $t('forgetPassword["邮箱验证"]') : $t('forgetPassword["手机号验证"]') }}</div>
		<div class="change" @click="onChange">{{ $t('forgetPassword["其他方式"]') }}</div>
		<div class="form">
			<!-- 邮箱 -->
			<div v-show="state.type == 'email'">
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
			<div v-show="state.type == 'phone'">
				<div class="phone" :class="{ 'form-input-error': !isPhoneValid && state.phone !== '' ? true : false }">
					<div class="area_code" @click="showAreaCode = true">
						<span>+{{ state.areaCode }}</span> <SvgIcon class="down" iconName="loginOrRegister/navBar/down" />
					</div>
					<FormInput v-model="state.phone" type="text" :placeholder="$t(`forgetPassword['请输入手机号']`)" :maxlength="areaCodeObj.maxLength">
						<template v-slot:right>
							<SvgIcon v-if="state.phone" class="clearIcon" iconName="loginOrRegister/clear" @click="state.phone = ''" />
						</template>
					</FormInput>
				</div>
				<div class="error_text">
					<span v-if="!isPhoneValid && state.phone !== ''" class="text">{{ $t(`forgetPassword["请输入8-12位数字"]`, { min: areaCodeObj.minLength, max: areaCodeObj.maxLength }) }}</span>
				</div>
			</div>

			<FormInput v-model="state.verifyCode" type="text" :placeholder="$t(`common['验证码']`)" :maxlength="6">
				<template v-slot:right>
					<CaptchaButton ref="captchaButton" :disabled="captchaDisabled" @onCaptcha="onCaptcha" />
				</template>
			</FormInput>

			<div class="tips">
				{{ $t('forgetPassword["重新发送"]') }}<span class="help">{{ $t('common["联系客服"]') }}</span>
			</div>

			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="onStep">{{ $t('forgetPassword["下一步"]') }}</Button>
		</div>
		<!-- 手机区号选择器 -->
		<AreaCodePicker
			v-model:showAreaCode="showAreaCode"
			v-model:searchAreaCode="searchAreaCode"
			:currentAreaCodeIndex="currentAreaCodeIndex"
			:indexList="indexList"
			:areaCode="areaCode"
			@selectAreaCode="selectAreaCode"
		/>
	</div>
</template>

<script setup lang="ts">
import { forgetPasswordApi } from "/@/api/loginRegister";
import CaptchaButton from "/@/views/loginRegister/forgetPassword/components/captchaButton/captchaButton.vue";
import common from "/@/utils/common";
import { showToast } from "vant";
import CommonApi from "/@/api/common";

const props = withDefaults(
	defineProps<{
		data?: any;
	}>(),
	{ data: {} }
);
interface CountryData {
	areaCode: string;
	countryName: string;
	countryCode: string;
	icon: string | null;
	maxLength: number;
	minLength: number;
}
const captchaButton = ref<{
	startCountdown: () => void;
	stopCountdown: () => void;
} | null>(null);

const emit = defineEmits(["onStep"]);
const areaCode: any = ref([]);
const indexList: any = ref([]);
const showAreaCode = ref(false);
const searchAreaCode = ref("");
const areaCodeObj: any = ref({});
const currentAreaCodeIndex: Ref<number | string> = ref("");
const state = reactive({
	type: "email" as "email" | "phone",
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
			(item: CountryData) =>
				item.areaCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryCode.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase()) ||
				item.countryName.toLocaleLowerCase().includes(searchAreaCode.value.toLocaleLowerCase())
		);
		areaCode.value = groupByFirstLetter(filterData || []);
		indexList.value = Object.keys(areaCode.value);
	}
);
const countries: Ref<CountryData[]> = ref([]);
const getAreaCodeDownBox = () => {
	CommonApi.getAreaCodeDownBox().then((res: any) => {
		if (res.code == common.getInstance().ResCode.SUCCESS) {
			countries.value = res.data;
			areaCode.value = groupByFirstLetter(countries.value || []);
			console.log("areaCode.value", areaCode.value);
			indexList.value = Object.keys(areaCode.value);
			state.areaCode = countries.value[0].areaCode;
			areaCodeObj.value = countries.value[0];
		}
	});
};
// 邮箱正则
const isEmailValid = computed(() => common.emailRG.test(state.email));

// 手机号正则
const isPhoneValid = computed(() => new RegExp(`^\\d{${areaCodeObj.value.minLength},${areaCodeObj.value.maxLength}}$`).test(state.phone));

// 验证码按钮禁用状态
const captchaDisabled = computed(() => {
	if (state.type === "email") return !isEmailValid.value || state.email === "";
	if (state.type === "phone") return !isPhoneValid.value || state.phone === "";
	return true;
});

// 下一步按钮禁用状态
const btnDisabled = computed(() => {
	if (state.type === "email") return !isEmailValid.value || state.email === "" || state.verifyCode === "";
	if (state.type === "phone") return !isPhoneValid.value || state.phone === "" || state.verifyCode === "";
	return true;
});

const onChange = () => {
	state.type = state.type === "email" ? "phone" : "email";
	captchaButton.value?.stopCountdown();
};

const onCaptcha = async () => {
	let params = { userAccount: props.data.userAccount } as any;
	let res;
	if (state.type === "phone") {
		params = { ...params, phone: state.phone, areaCode: state.areaCode };
		res = await forgetPasswordApi.sendSms(params);
	} else if (state.type === "email") {
		params = { ...params, email: state.email };
		res = await forgetPasswordApi.sendMail(params);
	}
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		captchaButton.value?.startCountdown();
	} else {
		showToast(res.message);
	}
};

const onStep = async () => {
	const params = {
		userAccount: props.data.userAccount,
		account: state.type === "email" ? state.email : state.phone,
		type: state.type === "email" ? 1 : 2,
		verifyCode: state.verifyCode,
	};
	const res = await forgetPasswordApi.checkVerifyCode(params).catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		emit("onStep", state);
	} else {
		showToast(res.message);
	}
};
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

const selectAreaCode = (item, i: CountryData) => {
	currentAreaCodeIndex.value = item;
	areaCodeObj.value = i;
	state.areaCode = i.areaCode;
	showAreaCode.value = false;
};
</script>

<style scoped lang="scss">
.content {
	padding: 0px 55px;
	.title {
		font-size: 36px;
		font-weight: 600;
		@include themeify {
			color: themed("TB");
		}
	}
	.change {
		margin-top: 20px;
		@include themeify {
			color: themed("Theme");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 500;
		text-decoration-line: underline;
	}
	.form {
		margin-top: 40px;

		.phone {
			display: flex;
			align-items: center;
			border-radius: 12px;
			@include themeify {
				background: themed("BG3");
			}
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
					border-color: themed("Theme");
				}
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
	.areaCodeBox {
		.itemAreacodeCell {
			display: flex;
			justify-content: space-between;
		}
		.p .icon {
			width: 32px;
			height: 32px;
		}
	}
	.activeCode {
		color: themed("Theme");
	}
}
</style>
