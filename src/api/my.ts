import useAxiosApi from "/@/utils/useAxiosApi";

// 获取会员首页信息
export class myApi {
	// 获取会员首页信息
	static getIndexInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/getIndexInfo`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 获取会员金额信息
	static getUserBalance = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/getUserBalance`, {
			method: "POST",
			data,
			headers,
		});
	};
}

export class medalApi {
	// 个人中心-前N个勋章
	static topNList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/topNList`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 获取会员勋章信息
	static getUserMedalInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/getUserMedalInfo`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 打开宝箱
	static openMedalReward = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/openMedalReward`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 点亮勋章
	static lightUpMedal = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/lightUpMedal`, {
			method: "POST",
			data,
			headers,
		});
	};
}
