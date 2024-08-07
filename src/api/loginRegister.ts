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
	// 登录
	static submitUserLogin = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/submitUserLogin`, {
			method: "POST",
			data,
			headers,
		});
	};
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
	// 注册
	static submitRegister = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/login/api/submitRegister`, {
			method: "POST",
			data,
			headers,
		});
	};
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
