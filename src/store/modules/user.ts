import { defineStore } from "pinia";
import { i18nSetLang } from "/@/i18n/index";
import { LangEnum } from "/@/enum/appConfigEnum";
import EncryptionFn from "/@/utils/encryption";
import CommonApi from "/@/api/common";
import { securityCenterApi } from "/@/api/securityCenter";
import Common from "/@/utils/common";
import { useSportsBetInfoStore } from "./sports/sportsBetInfo";
import activitySocketService from "/@/utils/activitySocketService";
import pubsub from "/@/pubSub/pubSub";

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
	registerInfo: any;
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
			langName: "English",
			// 语言图标
			langIcon: null,
			// 语言选择标记
			langChoice: null,
			// 登录账号信息
			loginInfo: null,
			// 登录标记
			loginStatus: false,

			// 注册信息
			registerInfo: {},
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
		getregisterInfo(): any {
			return this.registerInfo;
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

		setregisterInfo(data) {
			this.registerInfo = data;
		},

		async initUserInfo() {
			await this.setIndexInfo();
			await this.setBasicInfo();
			await this.setUserGlobalSetInfo();
			const sportsBetInfo = useSportsBetInfoStore();
			sportsBetInfo.balance = this.getUserInfo.totalBalance;
			const websocketService = activitySocketService.getInstance();
			websocketService.connect().then(() => {
				pubsub.publish("websocket_reconnected");
			});
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

		async setIndexInfo() {
			const res = await CommonApi.getIndexInfo().catch((err) => err);
			if (res.code == Common.getInstance().ResCode.SUCCESS) {
				this.setInfo({ ...this.getUserInfo, ...res.data });
			}
		},
		async setBasicInfo() {
			CommonApi.getCurrentBasicInfo().then((res: any) => {
				if (res.code == Common.getInstance().ResCode.SUCCESS) {
					this.setInfo({ ...this.getUserInfo, ...res.data });
				}
			});
		},
		async setUserGlobalSetInfo() {
			securityCenterApi.getUserGlobalSetInfo().then((res: any) => {
				if (res.code == Common.getInstance().ResCode.SUCCESS) {
					this.setInfo({ ...this.getUserInfo, ...res.data });
				}
			});
		},

		// 记住密码状态
		setLoginStatus(data: boolean) {
			this.loginStatus = data;
		},
		clearInfo() {
			this.token = "";
			this.userInfo = {};
			this.loginStatus = false;
			const websocketService = activitySocketService.getInstance();
			websocketService.close;
			localStorage.clear();
		},
		logOut() {
			this.clearInfo();
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
