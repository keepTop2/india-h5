import useAxiosApi from "/@/utils/useAxiosApi";
import useAxiosSabaApi from "/@/utils/useAxiosSabaApi";
import qs from "qs";
class sportsApi {
	/**
	 *@description 体育登录
	 */
	static sportsLogin = (data = {}, headers = {}) => {
		return useAxiosApi(`/app-foreign/third/api/loginGame`, {
			method: "POST",
			data,
			headers,
		});
	};
	/**
	 *@description 沙巴体育匿名登陆
	 */
	static sbaAnonLogin = (data = {}) => {
		return useAxiosApi(`/app-foreign/anon/api/sbaAnonLogin`, {
			method: "POST",
			data,
		});
	};
	//获取关注列表
	static getAttentionList = (data = {}) => {
		return useAxiosApi(`/app-foreign/publicSetting/api/getSportsFollowDetail`, {
			method: "POST",
			data,
		});
	};

	//关注赛事
	static saveFollow = (data = {}) => {
		return useAxiosApi(`/app-foreign/publicSetting/api/saveFollow`, {
			method: "POST",
			data,
		});
	};
	//取消关注赛事
	static unFollow = (data = {}) => {
		return useAxiosApi(`/app-foreign/publicSetting/api/unFollow`, {
			method: "POST",
			data,
		});
	};
	/**
	 *@description 获取热门赛事
	 */
	static GetHotEvents = (params) => {
		const requireParams = {};
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/sports/V1/GetPromotions?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};
	/**
	 *@description 获取赛果数量
	 */
	static GetSportResults = (params) => {
		const requireParams = {};
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/sports/V1/GetSportResults?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};
	/**
	 *@description 获取赛果
	 */
	static GetEventResults = (params) => {
		const requireParams = {};
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/sports/V1/GetEventResults?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};
	/**
	 *@description 获取联赛数量
	 */
	static GetLeagues = (params?: object) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/sports/V1/GetLeagues?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};

	/**
	 *@description 获取赛事信息
	 */
	static GetEventInfo = (params?: object) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/sports/V1//GetEvents?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};

	/**
	 *@description 获取视频地址
	 */
	static GetStreaming = (params?: object) => {
		const requireParams = {};
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/sports/V1//GetStreaming?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};

	/**
	 *@description 赛果获取已完成的赛事信息
	 */
	// /betting/{version}/GetGameDetails?eventids=12345,6789
	static GetResultEvents = (params?: object) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1/GetGameDetails?${qs.stringify(requestParams)}`, {
			method: "GET",
		});
	};

	/**
	 *@description 此API用于更新单注的盘口数据
	 */
	static GetSingleTicket = (params?: object, headers = {}) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1//GetSingleTicket?${qs.stringify(requestParams)}`, {
			method: "GET",
			headers,
		});
	};

	/**
	 *@description 取得串关注单的相关信息
	 */
	static GetParlayTickets = (params?: object, headers = {}) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1//GetParlayTickets`, {
			method: "POST",
			data: requestParams,
			headers,
		});
	};

	/**
	 *@description 此API用于更新单注的盘口数据
	 */
	static GetOutrightTicket = (params?: object, headers = {}) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1//GetOutrightTicket?${qs.stringify(requestParams)}`, {
			method: "GET",
			headers,
		});
	};

	/**
	 *@description 此API用于单注注单的下注
	 */
	static placeBet = (params?: object) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1//PlaceBet?${qs.stringify(requestParams)}`, {
			method: "POST",
			// data: requestParams,
		});
	};

	/**
	 *@description 此API用于下注串关的注单
	 */
	static placeParlayBet = (params?: any) => {
		const requireParams = {};
		params.betInfo.language = "zhcn";
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1//PlaceParlayBet`, {
			method: "POST",
			data: requestParams,
		});
	};

	/**
	 *@description 此API用于冠军单注注单的下注
	 */
	static placeOutrightBet = (params?: object) => {
		const requireParams = { language: "zhcn" };
		const requestParams = Object.assign({}, requireParams, params);
		return useAxiosSabaApi(`/betting/V1//PlaceOutrightBet?${qs.stringify(requestParams)}`, {
			method: "POST",
			// data: requestParams,
		});
	};

	/**
	 *@description 获取沙巴体育注单ID
	 */
	static getBetOrderId = (data = {}) => {
		return useAxiosApi(`/app-foreign/third/api/getBetOrderId`, {
			method: "POST",
			data,
		});
	};

	static getBettingRecordList = (data?: object) => {
		return useAxiosApi(`/app-foreign/order/api/client/orderRecord`, {
			method: "POST",
			data,
		});
	};

	/**
	 * @description 查询体育购物车赔率变化配置
	 */
	static getPublicSetting = (data?: object) => {
		return useAxiosApi(`/app-foreign/publicSetting/api/getPublicSetting`, {
			method: "POST",
			data,
		});
	};

	/**
	 * @description 新增体育购物车赔率变化配置
	 */
	static saveSetting = (data?: object) => {
		return useAxiosApi(`/app-foreign/publicSetting/api/saveSetting`, {
			method: "POST",
			data,
		});
	};
}
export default sportsApi;
