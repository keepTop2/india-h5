import { defineStore } from "pinia";
import { i18nSetLang } from "/@/i18n/index";
import { LangEnum } from "/@/enum/appConfigEnum";
import EncryptionFn from "/@/utils/encryption";
export interface StoreUser {
	token: string;
	userInfo: Record<any, any>;
	lang: LangEnum;
	loginInfo: {
		userAccount?: string;
		password?: string;
	} | null;
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
			// 登录账号信息
			loginInfo: null,
		};
	},
	getters: {
		getUserInfo(): any {
			return this.userInfo || {};
		},
		getLoginInfo(): any {
			// console.log("this.loginInfo", this.loginInfo);
			if (!this.loginInfo) return null;
			const decryptedInfo = EncryptionFn.decrypt(this.loginInfo);
			// console.log("decryptedInfo", decryptedInfo);
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
		clearInfo() {
			this.token = "";
			this.userInfo = {};
			localStorage.clear();
		},
	},
	persist: [
		{
			key: "useUserStore",
			storage: localStorage,
			paths: ["lang"],
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
