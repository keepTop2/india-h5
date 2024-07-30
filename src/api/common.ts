import useAxiosApi from "/@/utils/useAxiosApi";
class CommonApi {
	/**
	 *@description 手机验证码请求
	 */
	static sendSms = (data = {}, headers = {}) => {
		return useAxiosApi(`/app-foreign/login/api/sendSms`, {
			method: "POST",
			data,
			headers,
		});
	};
	/**
	 *@description 邮箱验证码请求
	 */
	static sendMail = (data = {}, headers = {}) => {
		return useAxiosApi(`/app-foreign/login/api/sendMail`, {
			method: "POST",
			data,
			headers,
		});
	};
	/**
	 *@description 根据 ip 获取语言
	 */
	static getLanguage = (data = {}, headers = {}) => {
		return useAxiosApi(`/app-foreign/lang/api/getLang`, {
			method: "POST",
			data,
			headers,
		});
	};
	/**
	 *@description 获取会员首页信息
	 */
	static getIndexInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app-foreign/user-info/api/getIndexInfo`, {
			method: "POST",
			data,
			headers,
		});
	};
}

export default CommonApi;
