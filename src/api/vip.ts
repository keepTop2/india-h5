import useAxiosApi from "/@/utils/useAxiosApi";

// 获取会员VIP信息
export class vipApi {
	// 获取会员VIP信息;
	static getUserVipInfo = (params = {}, headers = {}) => {
		return useAxiosApi(`/app/user-vip/api/getUserVipInfo`, {
			method: "GET",
			params,
			headers,
		});
	};

	// 获取VIP等级制度;
	static getUserVipBenefitDetail = (params = {}, headers = {}) => {
		return useAxiosApi(`/app/user-vip/api/getUserVipBenefitDetail`, {
			method: "GET",
			params,
			headers,
		});
	};
}
