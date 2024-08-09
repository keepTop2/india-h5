import useAxiosApi from "/@/utils/useAxiosApi";

// 登录
export default class HomeApi {
	// 登录检验
	static querySportEventsRecommend = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/querySportEventsRecommend`, {
			method: "POST",
			data,
			headers,
		});
	};
}
