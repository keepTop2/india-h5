import { defineStore } from "pinia";
import { i18nSetLang } from "/@/i18n/index";
import { LangEnum } from "/@/enum/appConfigEnum";
import EncryptionFn from "/@/utils/encryption";
export interface StoreUser {
	token: string;
	userInfo: Record<any, any>;
	lang: LangEnum | null;
	langName: string | null;
	langIcon: null | string;
	langChoice: null | boolean;
	loginInfo: {
		userAccount?: string;
		password?: string;
	} | null;
	loginStatus: boolean;
}

export const useUserStore = defineStore("User", {
	state: (): StoreUser => {
		return {
			// 密钥
			token: "",
			// 用户信息
			userInfo: {},
			// 语言
			lang: LangEnum["en-US"],
			// 语言名称
			langName: null,
			// 语言图标
			langIcon: null,
			// 语言选择标记
			langChoice: null,
			// 登录账号信息
			loginInfo: null,
			// 登录标记
			loginStatus: false,
		};
	},
	getters: {
		getUserInfo(): any {
			return this.userInfo || {};
		},
		getLoginInfo(): any {
			if (!this.loginInfo) return null;
			const decryptedInfo = EncryptionFn.decrypt(this.loginInfo);
			return decryptedInfo;
		},
		getLang(): any {
			return this.lang;
		},
	},
	actions: {
		//设置语言；
		setLang(data: LangEnum) {
			this.lang = data;
			i18nSetLang(this.lang);
		},
		setLangName(data) {
			this.langName = data;
		},
		setLangIcon(data) {
			this.langIcon = data;
		},
		// 设置语言选择标识
		setLangChoice() {
			this.langChoice = true;
		},
		// 获取用户信息
		setInfo(data: any) {
			this.token = data.token;
			this.userInfo = data ? data : {};
		},
		// 获取登录信息
		setLoginInfo(data?: any) {
			if (!data) {
				this.loginInfo = null;
				return;
			}
			const loginInfoObj = {
				userAccount: data.userAccount ?? "",
				password: data.password ?? "",
			};
			// 将 loginInfo 对象加密后转换为字符串
			this.loginInfo = EncryptionFn.encryption(JSON.stringify(loginInfoObj));
		},
		// 记住密码状态
		setLoginStatus(data: boolean) {
			this.loginStatus = data;
		},
		clearInfo() {
			this.token = "";
			this.userInfo = {};
			this.loginStatus = false;
			localStorage.clear();
		},
	},
	persist: [
		{
			key: "useUserStore",
			storage: localStorage,
			paths: ["lang", "langName", "langIcon", "langChoice", "loginStatus"],
		},
		{
			key: "loginInfo",
			storage: localStorage,
			paths: ["loginInfo"],
		},
		{
			key: "user",
			storage: sessionStorage,
			paths: ["token", "userInfo"],
		},
	],
});
