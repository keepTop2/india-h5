import useAxiosApi from "/@/utils/useAxiosApi";

// 获取会员VIP信息
export class welfareCenterApi {
	// 获取下拉
	static getDownBox = (params = {}, headers = {}) => {
		return useAxiosApi(`/app/user-welfareCenter/api/getDownBox`, {
			method: "GET",
			params,
			headers: {
				showLoading: true,
			},
		});
	};

	// 一键领取
	static oneClickReceive = (params = {}, headers = {}) => {
		return useAxiosApi(`/app/user-welfareCenter/api/oneClickReceive`, {
			method: "GET",
			params,
			headers: {
				showLoading: true,
			},
		});
	};
	// 点击领取
	static clickReceive = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-welfareCenter/api/clickReceive`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	// 点击领取
	static pageQuery = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-welfareCenter/api/pageQuery`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
	// 点击领取
	static welfareCenterDetail = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-welfareCenter/api/detail`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
}
