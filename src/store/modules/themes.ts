import { defineStore } from "pinia";
import { ThemeEnum } from "/@/enum/appConfigEnum";

export interface ThemesStore {
	themeName: ThemeEnum;
}

export const useThemesStore = defineStore("Themes", {
	state: (): ThemesStore => {
		return {
			themeName: ThemeEnum.default,
		};
	},
	getters: {
		getTheme(): any {
			return this.themeName || ThemeEnum.default;
		},
	},
	actions: {
		/**
		 * @description 全局主题切换
		 * @param str
		 */
		setTheme(str: ThemeEnum) {
			this.themeName = str || ThemeEnum.default;
			//设置scss主题色
			document.getElementsByTagName("body")[0].setAttribute("data-theme", this.themeName);
		},
	},
	persist: {
		key: "Themes",
		storage: sessionStorage,
		paths: ["themeName"],
	},
});
