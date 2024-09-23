import useAxiosApi from "/@/utils/useAxiosApi";
class CommonApi {
	/**
	 *@description POST 侧边栏
	 */
	static queryLobbyLabelList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryLobbyLabelList`, {
			method: "POST",
			data,
			headers,
		});
	};

	/**
	 *@description 下拉框-语言、币种
	 */
	static getCommonBusinessDownBox = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/common/getCommonBusinessDownBox`, {
			method: "POST",
			data,
			headers,
		});
	};

	/**
	 *@description 获取会员首页信息
	 */
	static getIndexInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/getIndexInfo`, {
			method: "POST",
			data,
			headers,
		});
	};

	/**
	 *@description 获取会员首页信息
	 */
	static getAreaCodeDownBox = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/common/getAreaCodeDownBox`, {
			method: "POST",
			data,
			headers,
		});
	};
}

export default CommonApi;
