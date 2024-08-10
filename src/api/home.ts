import useAxiosApi from "/@/utils/useAxiosApi";

// 登录
export default class HomeApi {
	// 获取体育推荐赛事
	static querySportEventsRecommend = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/querySportEventsRecommend`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 获取游戏大厅热门游戏
	static queryLobbyTopGame = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryLobbyTopGame`, {
			method: "POST",
			// data,
			headers,
		});
	};
}
