import { defineStore } from "pinia";
import { i18nSetLang } from "/@/i18n/index";
import { LangEnum } from "/@/enum/appConfigEnum";
export interface StoreUser {
	token: string;
	userInfo: Record<any, any>;
	lang: LangEnum;
}

export const useUserStore = defineStore("User", {
	state: (): StoreUser => {
		return {
			token: "",
			userInfo: {},
			lang: LangEnum["en-US"],
		};
	},
	getters: {
		getUserInfo(): any {
			return this.userInfo || {};
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
		setInfo(data: any) {
			this.token = data.token;
			this.userInfo = data ? data : {};
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
			key: "user",
			storage: sessionStorage,
			paths: ["token", "userInfo"],
		},
	],
});
