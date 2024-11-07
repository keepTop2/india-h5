/* eslint-disable */
import axios from "axios";
import { showToast } from "vant";
import ResCode from "./resCode";
import EncryptionFn from "/@/utils/encryption";
import { useUserStore } from "/@/store/modules/user";
import router from "/@/router";
import { useLoading } from "/@/directives/loading/hooks";
const { startLoading, stopLoading } = useLoading();

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

// create an axios instance
const instance = axios.create({
	baseURL: getUrl(),
	withCredentials: false,
	timeout: 30000,
});

// request interceptor
instance.interceptors.request.use(
	(config) => {
		//判断当前请求头是否设置了不显示 Loading，没有设置则默认加载
		if (config.headers.showLoading !== false) {
			startLoading();
		}
		config["headers"]["Sign"] = EncryptionFn.encryption();
		return config;
	},
	(error) => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		if (response.config.headers.showLoading !== false) {
			stopLoading();
		}
		const UserStore = useUserStore();
		const res = response.data;
		if (res.code !== ResCode.SUCCESS) {
			if (res.code === ResCode.LOGIN_EXPIRE || res.code === ResCode.TOKEN_INVALID || res.code === ResCode.TOKEN_MISSION) {
				//退出登陆（清除用户信息及跳转登陆）
				UserStore.clearInfo();
				router.replace({ path: "/login" });
			} else if (res.code === ResCode.SERVICE_MAINTENANCE) {
				// 服务维护
				router.replace({ path: "/maintain" });
			} else if (res.code === ResCode.REGIONAL_RESTRICTIONS) {
				// 区域限制
				router.replace({ path: "/accessRestriction" });
			} else {
				showToast(res.message);
			}
			return Promise.reject(res.message || "Error");
		} else {
			return res;
		}
	},
	(error) => {
		//判断当前请求是否设置了不显示Loading
		if (error.headers.showLoading !== false) {
			stopLoading();
		}
		showToast(error);
		return Promise.reject(error);
	}
);

export default instance;
