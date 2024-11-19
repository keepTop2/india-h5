import useAxiosApi from "/@/utils/useAxiosApi";

// 获取会员VIP信息
export class TutorialApi {
	// 获取一层信息
	static showTutorialPreLayer = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/tutorial-display/api/showTutorialPreLayer`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};

	// 获取二层信息
	static showTutorialTurnLayer = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/tutorial-display/api/showTutorialTurnLayer`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};

	static getHelpCenterConfigList = (data = {}, headers = {}) => {
		return useAxiosApi(`/app/app-helpCenter/api/getHelpCenterConfigList`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	};
}
