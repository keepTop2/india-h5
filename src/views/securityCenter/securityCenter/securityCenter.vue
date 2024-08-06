<template>
	<VantNavBar :title="$t(`VantNavBar['安全中心']`)" @onClickLeft="onClickLeft" />

	<div class="group">
		<div class="cell van-haptics-feedback" v-for="(item, index) in menuList" :key="index" @click.stop="onClickCell(item)">
			<div class="label">{{ item.name }}</div>
			<div v-if="item.value" class="value" @click.stop="toPath(item.editPath)">{{ item.value }}</div>
			<div class="arrow">
				<SvgIcon iconName="/common/arrow" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { i18n } from "/@/i18n/index";
const router = useRouter();
const $: any = i18n.global;

const menuList = [
	{
		name: $.t("securityCenter['登录密码']"),
		value: "",
		path: "/loginPassword",
	},
	{
		name: $.t("securityCenter['手机号']"),
		value: "修改",
		path: "/bind/phone",
		editPath: "/editContactDetails/phone",
	},
	{
		name: $.t("securityCenter['邮箱']"),
		value: "修改",
		path: "/bind/email",
		editPath: "/editContactDetails/email",
	},
	{
		name: $.t("securityCenter['交易密码']"),
		value: "修改",
		path: "/setTradingPassword",
		editPath: "/editTradingPassword",
	},
];

const onClickCell = (item) => {
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
		}
		.themeChange_icon {
			width: 99px;
			height: 46px;
		}
	}
}
</style>
