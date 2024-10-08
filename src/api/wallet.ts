import useAxiosApi from "/@/utils/useAxiosApi";

export const walletApi = {
	// 用户充值方式列表
	rechargeWayList: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userRecharge/api/rechargeWayList`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 用户充值
	userRecharge: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/userRecharge/api/userRecharge`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
};
