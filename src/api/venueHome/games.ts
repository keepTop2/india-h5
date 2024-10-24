import useAxiosApi from "/@/utils/useAxiosApi";

export default class GameApi {
	/**
	 *@description 游戏登录
	 */
	static gameLogin = (data, headers = {}) => {
		return useAxiosApi(`/app/third/api/loginGame`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	// 获取游戏大厅热门游戏
	static queryLobbyTopGame = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryLobbyTopGame`, {
			method: "POST",
			data,
			headers,
		});
	};
	//获取游戏列表
	static queryGameInfoDetail = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryGameInfoDetail`, {
			method: "POST",
			data,
			headers,
		});
	};
	//获取游戏收藏列表
	static queryCollection = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game/api/queryCollection`, {
			method: "POST",
			data,
			headers,
		});
	};
	//关注游戏
	static gameCollection = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game/api/collection`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	// /app/game_lobby/api/queryGameInfoByOneClassId
	static queryGameInfoByOneClassId = (data = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryGameInfoByOneClassId`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	//搜索游戏接口
	static queryGameInfoByName = (data = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryGameInfoByName`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
}
