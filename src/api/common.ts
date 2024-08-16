import useAxiosApi from "/@/utils/useAxiosApi";
class CommonApi {
	/**
	 *@description 游戏目录
	 */
	static queryLobbyLabelList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryLobbyLabelList`, {
			method: "POST",
			data,
			headers,
		});
	};

	/**
	 *@description 多语言数据
	 */
	static getLanguageDownBox = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/common/getLanguageDownBox`, {
			method: "POST",
			data,
			headers,
		});
	};
}

export default CommonApi;
