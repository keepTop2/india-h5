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
			headers: {
				showLoading: true,
			},
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

	// 意见反馈提交
	static submitFeedback = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userFeedback/api/submit`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};

	// 意见反馈列表
	static FeedbackList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userFeedback/api/pageList`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	// 历史意见反馈详情
	static FeedbackDetail = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userFeedback/api/detail`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	// 意见反馈问题下拉
	static getDownBox = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userFeedback/api/getDownBox`, {
			method: "GET",
			data,
			headers,
		});
	};
	// 删除意见反馈
	static delFeedback = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userFeedback/api/del`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
}
