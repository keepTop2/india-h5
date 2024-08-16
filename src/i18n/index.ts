import { createI18n } from "vue-i18n";
import { Locale } from "vant";
import maindian from "/@/i18n/vant/miandian";
import zh from "vant/es/locale/lang/zh-CN";
import { langMaps } from "/@/maps/appConfigMaps";
import { LangEnum } from "/@/enum/appConfigEnum";

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
	legacy: false,
	locale: langMaps.get(LangEnum["en-US"])?.serverLang,
	fallbackLocale: langMaps.get(LangEnum["en-US"])?.serverLang,
	messages: loadLang(),
});

/**
 * @description 设置界面语言
 * @param lang
 */
export function i18nSetLang(lang: LangEnum) {
	// const LangList = loadLang();
	// console.log('LangList',LangList);
	i18n.global.locale.value = lang;
	setVantLang(lang);
}

/**
 * @description 设置 vant 语言
 * @param lang
 */
function setVantLang(lang?: LangEnum) {
	if (lang != LangEnum["zh-CN"]) {
		//vant 添加自定义语言
		Locale.add({
			miandian: maindian,
		});
		Locale.use("miandian", maindian);
	} else {
		Locale.use(LangEnum["zh-CN"], zh);
	}
}
