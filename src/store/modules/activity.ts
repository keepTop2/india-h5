import { defineStore } from "pinia";

export const useActivityStore = defineStore("activity", {
	state: () => {
		return {
			isShowRedBagRain: false,
			ActivityData: {},
		};
	},
	getters: {
		getIsShowRedBagRain(): any {
			return this.isShowRedBagRain;
		},
		getActivityData() {
			return this.ActivityData;
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
		setActivityData(value: {}) {
			this.ActivityData = value;
		},
	},
});
