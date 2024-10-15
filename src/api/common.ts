import useAxiosApi from "/@/utils/useAxiosApi";
import useAxiosUploadApi from "/@/utils/useAxiosUploadApi";
class CommonApi {
	/**
	 *@description 上传
	 */
	static uploadFile = (data = {}) => {
		return useAxiosUploadApi(`/app/file/api/upload/baowang`, {
			method: "POST",
			data,
		});
	};
	/**
	 *@description POST 侧边栏
	 */
	static queryLobbyLabelList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/game_lobby/api/queryLobbyLabelList`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};

	/**
	 *@description 下拉框-语言、币种
	 */
	static getCommonBusinessDownBox = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/common/getCommonBusinessDownBox`, {
			method: "POST",
			data,
			headers,
		});
	};

	/**
	 *@description 获取会员首页信息
	 */
	static getIndexInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/api/getIndexInfo`, {
			method: "POST",
			data,
			headers,
		});
	};
	static getUserGlobalSetInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/user-info/global/getUserGlobalSetInfo`, {
			method: "POST",
			data,
			headers,
		});
	};

	/**
	 *@description 获取会员首页信息
	 */
	static getAreaCodeDownBox = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/common/getAreaCodeDownBox`, {
			method: "POST",
			data,
			headers,
		});
	};
	/**
	 *@description 获取会员首页信息
	 */
	static getCurrentBasicInfo = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/common/getCurrentBasicInfo`, {
			method: "POST",
			data,
			headers,
		});
	};
}

export default CommonApi;
