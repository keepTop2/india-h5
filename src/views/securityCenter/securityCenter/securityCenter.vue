<template>
	<VantNavBar :title="$t(`VantNavBar['安全中心']`)" @onClickLeft="onClickLeft" />

	<div class="group">
		<div class="cell" :class="{ 'van-haptics-feedback': !item.edit }" v-for="(item, index) in menuList" :key="index" @click.stop="onClickCell(item)">
			<div class="label">{{ item.name }}</div>
			<div v-if="item.edit" class="color_T1">{{ item.editText }}</div>
			<div v-if="item.edit" class="value van-haptics-feedback" @click.stop="toPath(item.editPath)">{{ item.value }}</div>
			<div v-else class="arrow">
				<SvgIcon iconName="common/arrow" size="24px" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { securityCenterApi } from "/@/api/securityCenter";
import common from "/@/utils/common";
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
import Common from "/@/utils/common";
const router = useRouter();
const $: any = i18n.global;

// 定义 UserInfo 类型
interface UserInfo {
	userAccount?: string;
	nickName?: string;
	areaCode?: string;
	phone?: string | number;
	email?: string | number;
	isSetPwd?: string;
}

let state = reactive<UserInfo>({});

const menuList = ref([
	{
		name: $.t("securityCenter['登录密码']"),
		value: "",
		path: "/loginPassword",
		edit: false,
		editText: "",
	},
	{
		name: $.t("securityCenter['手机号']"),
		value: $.t("securityCenter['修改']"),
		path: "/bind/phone",
		editPath: "/editContactDetails/phone",
		edit: false,
		editText: "",
	},
	{
		name: $.t("securityCenter['邮箱']"),
		value: $.t("securityCenter['修改']"),
		path: "/bind/email",
		editPath: "/editContactDetails/email",
		edit: false,
		editText: "",
	},
	{
		name: $.t("securityCenter['交易密码']"),
		value: $.t("securityCenter['修改']"),
		path: "/setTradingPassword",
		editPath: "/editTradingPassword",
		edit: false,
		editText: "",
	},
]);

// 安全中心基本信息
const getUserGlobalSetInfo = async () => {
	const res = await securityCenterApi.getUserGlobalSetInfo().catch((err) => err);
	if (res.code == common.getInstance().ResCode.SUCCESS) {
		Object.assign(state, res.data);
		// 更新 menuList 中的 edit 值
		menuList.value = menuList.value.map((item) => {
			if (item.path === "/bind/phone") {
				return { ...item, edit: !!state.phone, editText: state.phone ? "+" + state.areaCode + " " + Common.maskString(state.phone as string) : "" };
			} else if (item.path === "/bind/email") {
				return { ...item, edit: !!state.email, editText: state.email ? Common.maskEmail(state.email as string) : "" };
			} else if (item.path === "/setTradingPassword") {
				return { ...item, edit: !!state.isSetPwd };
			} else {
				return item;
			}
		});
	}
};

getUserGlobalSetInfo();

const onClickCell = (item) => {
	if (item.edit) return;
	toPath(item.path);
};

const toPath = (path) => {
	router.push(path);
};

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.group {
	margin: 24px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
	.cell {
		position: relative;
		width: 100%;
		height: 104px;
		display: flex;
		gap: 14px;
		align-items: center;
		justify-content: space-between;
		padding: 20px 32px 20px 20px;
		box-sizing: border-box;

		&::after {
			content: "";
			position: absolute;
			bottom: 0px;
			left: 0px;
			width: 686px;
			height: 1px;
			@include themeify {
				background-color: themed("Line");
			}
		}
		&:last-child::after {
			display: none;
		}

		.icon {
			width: 34px;
			height: 34px;
		}
		.label {
			flex: 1;
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
		.value {
			min-width: 160px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid;
			border-radius: 12px;
			@include themeify {
				border-color: themed("Theme");
				color: themed("Theme");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
		.arrow {
			width: 24px;
			height: 24px;
			@include themeify {
				color: themed("T1");
			}
			svg {
				vertical-align: top;
			}
		}
		.themeChange_icon {
			width: 99px;
			height: 46px;
		}
	}
}
</style>
