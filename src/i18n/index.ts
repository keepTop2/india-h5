import { createI18n } from "vue-i18n";
import { LangType } from "/@/models/commonInterface";
import { Locale } from "vant";
import maindian from "/@/i18n/vant/miandian";
import zh from "vant/es/locale/lang/zh-CN";

/**
 * @description 加载语言列表
 * @returns
 */
export function loadLang() {
	const modules: Record<string, any> = import.meta.glob("./lang/*.ts", { eager: true });
	const langs: Record<string, any> = {};

	for (const path in modules) {
		const name = path.replace(/(\.\/lang\/|\.ts)/g, "");
		langs[name] = modules[path].lang;
	}
	return langs;
}

export const i18n = createI18n({
	// globalInjection: true,
	legacy: false,
	locale: "zh-CN",
	fallbackLocale: "zh-CN",
	messages: loadLang(),
});

/**
 * @description 设置界面语言
 * @param lang
 */
export function setLang(lang: LangType) {
	const LangList = loadLang();
	if (LangList[lang]) {
		i18n.global.locale.value = lang;
		setVantLang(lang);
	} else {
		i18n.global.locale.value = "en-US";
		setVantLang(lang);
	}
}

/**
 * @description 设置 vant 语言
 * @param lang
 */
function setVantLang(lang?: LangType) {
	if (lang != "zh") {
		//vant 添加自定义语言
		Locale.add({
			miandian: maindian,
		});
		Locale.use("miandian", maindian);
	} else {
		console.log("1111");
		Locale.use("zh-CN", zh);
	}
}
