import { defineStore } from "pinia";

export const useActivityStore = defineStore("activity", {
	state: () => {
		return {
			isShowRedBagRain: false,
		};
	},
	getters: {
		getIsShowRedBagRain(): any {
			return this.isShowRedBagRain;
		},
	},
	actions: {
		/**
		 * @description 全局主题切换
		 * @param str
		 */
		setIsShowRedBagRain(value: boolean) {
			this.isShowRedBagRain = value;
		},
	},
});
