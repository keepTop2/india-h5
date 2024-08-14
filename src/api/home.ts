import useAxiosApi from "/@/utils/useAxiosApi";
export default class HomeApi {
	// 获取体育推荐赛事
	static querySportEventsRecommend = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/querySportEventsRecommend`, {
			method: "POST",
			data,
			headers,
		});
	};
}
