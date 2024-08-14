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
}

export default CommonApi;
