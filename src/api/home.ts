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

	// 获取支付商
	static queryPaymentVendorList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryPaymentVendorList`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 获取站点赞助商
	static queryPartnerList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryPartnerList`, {
			method: "POST",
			data,
			headers,
		});
	};
}
