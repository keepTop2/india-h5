import axios from "axios";
import { showToast } from "vant";
import ResCode from "./resCode";
import EncryptionFn from "/@/utils/encryption";
import { useLoading } from "/@/directives/loading/hooks";
import { useUserStore } from "/@/store/modules/user";
// import router from "/@/router";
import { useRequestError } from "/@/hooks/requestError";
const { startLoading, stopLoading } = useLoading();
const { handleRequestError } = useRequestError();

// 获取 config 配置请求 api
function getUrl() {
	switch (import.meta.env.VITE_BASEENV) {
		case "development":
			return window["PLATFROM_CONFIG"].developmentBaseURL;
		case "production":
			return window["PLATFROM_CONFIG"].productionBaseURL;
		default:
			return "";
	}
}

// 创建 axios 实例
const instance = axios.create({
	baseURL: getUrl(),
	withCredentials: false,
	timeout: 30000,
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		//判断当前请求头是否设置了不显示 Loading，没有设置则默认加载
		if (config.headers.showLoading !== false) {
			startLoading();
		}
		config["headers"]["Sign"] = EncryptionFn.encryption();
		// Accept-Language:zh-CN
		const UserStore = useUserStore();
		const language = UserStore.getLang;
		if (language) {
			config["headers"]["Accept-Language"] = language;
		}
		return config;
	},
	(error) => {
		// console.log(error, "做一些请求错误的事情");
		//判断当前请求是否设置了不显示Loading
		if (error.headers.showLoading !== false) {
			stopLoading();
		}
		return Promise.reject(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	(response) => {
		// const UserStore = useUserStore();
		// console.log("请求成功");
		//判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
		if (response.config.headers.showLoading !== false) {
			stopLoading();
		}
		const res = response.data;
		if (res.code === 10008) {
			useUserStore().logOut();
		}

		return res;
		// 如果自定义代码不是 200，则判断为错误。
		// if (res.code !== ResCode.SUCCESS) {
		// 	if (res.type == "image/png") {
		// 		return res;
		// 	}
		// 	handleRequestError({
		// 		name: "mainApp",
		// 		res,
		// 	});
		// 	return Promise.reject("ERR" || "Error");
		// } else {
		// 	return res;
		// }
	},
	(error) => {
		console.log("请求失败", error);
		//判断当前请求是否设置了不显示 Loading（不显示自然无需隐藏）
		if (error.config.headers.showLoading !== false) {
			stopLoading();
		}
		showToast(error.message);
		return Promise.reject(error);
	}
);

export default instance;
