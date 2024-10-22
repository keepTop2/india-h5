import useAxiosApi from "/@/utils/useAxiosApi";

// 获取会员VIP信息
export class TutorialApi {
	// 获取一层信息
	static showTutorialPreLayer = (params = {}, headers = {}) => {
		return useAxiosApi(`/app/tutorial-display/api/showTutorialPreLayer`, {
			method: "POST",
			params,
			headers: {
				showLoading: true,
			},
		});
	};

	// 获取二层信息
	static showTutorialTurnLayer = (params = {}, headers = {}) => {
		return useAxiosApi(`/app/tutorial-display/api/showTutorialTurnLayer`, {
			method: "POST",
			params,
			headers: {
				showLoading: true,
			},
		});
	};
}
