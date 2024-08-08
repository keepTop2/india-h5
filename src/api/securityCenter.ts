import useAxiosApi from "/@/utils/useAxiosApi";

// 安全中心基本信息
export class securityCenterApi {
	// 安全中心基本信息
	static getUserGlobalSetInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/getUserGlobalSetInfo`, {
			method: "POST",
			data,
			headers,
		});
	};
}

// 登录密码
export class loginPasswordApi {
	// 修改密码
	static changePassword = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/changePassword`, {
			method: "POST",
			data,
			headers,
		});
	};
}

// 登录密码
export class bindApi {
	// 发送手机验证码
	static sendSms = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/sendSms`, {
			method: "POST",
			data,
			headers,
		});
	};

	// 发送邮箱验证吗
	static sendMail = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/sendMail`, {
			method: "POST",
			data,
			headers,
		});
	};

	// 绑定邮箱或手机
	static bindAccount = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/bindAccount`, {
			method: "POST",
			data,
			headers,
		});
	};

	// 修改邮箱/手机验证码校验
	static checkVerifyCode = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/checkVerifyCode`, {
			method: "POST",
			data,
			headers,
		});
	};
}

// 交易密码
export class tradingPasswordApi {
	// 设置交易密码
	static setWithdrawPwd = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/setWithdrawPwd`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 修改交易密码;
	static changeWithdrawPwd = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/changeWithdrawPwd`, {
			method: "POST",
			data,
			headers,
		});
	};
}
