import axios from "axios";
import { useLoading } from "/@/directives/loading/hooks";
import { showToast } from "vant";
const { startLoading, stopLoading } = useLoading();

// 获取 config 配置请求 api
function getUrl() {
	switch (import.meta.env.VITE_BASEENV) {
		case "development":
			return window["PLATFROM_CONFIG"].developSportUrl;
		case "production":
			return window["PLATFROM_CONFIG"].productionSportUrl;
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
		if (sportsInfoStore.getSportsToken) {
			config["headers"]["Authorization"] = `Bearer ${sportsInfoStore.getSportsToken}`;
		}
		return config;
	},
	(error) => {
		console.log(error, "做一些请求错误的事情");
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
		//判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
		if (response.config.headers.showLoading !== false) {
			stopLoading();
		}
		return response;
	},
	(error) => {
		//判断当前请求是否设置了不显示 Loading（不显示自然无需隐藏）
		if (error.config.headers.showLoading !== false) {
			stopLoading();
		}
		console.log("请求失败", error);
		const response = error.response;
		if (!["B005", "B015", "B016", "B033", "B036", "B039"].includes(response.data.errorCode)) {
			showToast(error.response.data.message || error.message);
		}
		//判断当前请求是否设置了不显示 Loading（不显示自然无需隐藏）
		return Promise.reject(error);
	}
);

export default instance;
