import useAxiosApi from "/@/utils/useAxiosApi";

// 登录
export class loginApi {
	// 登录检验
	static userLogin = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/userLogin`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 登录检验
	static logout = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/logout`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 登录
	// static submitUserLogin = (data = {}, headers = {}) => {
	// 	return useAxiosApi(`/app/login/api/submitUserLogin`, {
	// 		method: "POST",
	// 		data,
	// 		headers,
	// 	});
	// };
}

// 注册
export class registerApi {
	// 注册校验
	static userRegister = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/userRegister`, {
			method: "POST",
			data,
			headers,
		});
	};
	// // 注册
	// static submitRegister = (data = {}, headers = {}) => {
	// 	return useAxiosApi(`/app/login/api/submitRegister`, {
	// 		method: "POST",
	// 		data,
	// 		headers,
	// 	});
	// };
}

// 验证码
export class verifyCodeApi {
	static verifyCode = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/verifyCode`, {
			method: "POST",
			data,
			headers,
		});
	};
}

// 忘记密码
export class forgetPasswordApi {
	// 验证账号
	static submitAccount = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/submitAccount`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 发送手机验证码
	static sendSms = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/sendSms`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 发送邮箱验证码
	static sendMail = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/sendMail`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 邮箱手机验证码校验
	static checkVerifyCode = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/checkVerifyCode`, {
			method: "POST",
			data,
			headers,
		});
	};
	// 重置密码
	static resetPassword = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/resetPassword`, {
			method: "POST",
			data,
			headers,
		});
	};
}
