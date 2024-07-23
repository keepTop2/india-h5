import { ThemeKey } from "/@/models/commonInterface";
/**
 * vant主题色类
 */
class VantThemes {
	private default = {
		//主色/盈利
		Theme: "#3bc116",
		//警告/提示/取消/失败/亏损
		Warn: "#ff0000",
		//温馨提示themes
		Hint: "#ff7a00",
		//收藏
		Favorites: "#ff007a",
		//标签1
		Tag1: "#31333a",
		//文本/文本1
		Text1: "#98a7b5",
		//文本/文本2
		Text2: "#4d565e",
		//文本/文本3
		Text3: "#687083",
		//分割线
		Line: "#373a40",
		//背景/卡片1
		BG1: "#24262b",
		//背景/卡片2
		BG2: "#1a1c20",
		//背景/卡片3
		BG3: "#2e3035",
		//背景/卡片4
		BG4: "#1c1e22",
		//背景/卡片5
		BG5: "#364139",
	};

	private dark = {
		//主色/盈利
		Theme: "#ff0cae",
		//警告/提示/取消/失败/亏损
		Warn: "#ff0000",
		//温馨提示
		Hint: "#ff7a00",
		//收藏
		Favorites: "#ff007a",
		//标签1
		Tag1: "#31333a",
		//文本/文本1
		Text1: "#98a7b5",
		//文本/文本2
		Text2: "#4d565e",
		//文本/文本3
		Text3: "#687083",
		//分割线
		Line: "#373a40",
		//背景/卡片1
		BG1: "#24262b",
		//背景/卡片2
		BG2: "#1a1c20",
		//背景/卡片3
		BG3: "#2e3035",
		//背景/卡片4
		BG4: "#1c1e22",
		//背景/卡片5
		BG5: "#364139",
	};

	/**
	 * @description 设置vant主题色
	 * @param themeKey
	 */
	public setVantThemes(themeKey?: ThemeKey) {
		if (themeKey) {
			document.documentElement.style.setProperty("--van-primary-color", this[themeKey].Theme);
			document.documentElement.style.setProperty("--van-success-color", this[themeKey].Theme);
			document.documentElement.style.setProperty("--van-danger-color", this[themeKey].Warn);
			document.documentElement.style.setProperty("--van-warning-color", this[themeKey].Hint);
		} else {
			document.documentElement.style.setProperty("--van-primary-color", this.default.Theme);
			document.documentElement.style.setProperty("--van-success-color", this.default.Theme);
			document.documentElement.style.setProperty("--van-danger-color", this.default.Warn);
			document.documentElement.style.setProperty("--van-warning-color", this.default.Hint);
		}
	}
}

export default VantThemes;
