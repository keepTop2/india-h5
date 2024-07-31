import ResCode from "/@/utils/resCode";

//主题色类型
export type ThemeKey = "default" | "light";
//语言包
export type LangType = "zh" | "en" | "Türkiye";

/**
 * @description 常用于前端Promise返回
 */
export interface WebResponse {
	/**
	 * @description 响应状态码
	 */
	code?: ResCode;

	/**
	 * @description 响应数据
	 */
	data?: any;

	/**
	 * @description 响应提示
	 */
	message?: string;
}
