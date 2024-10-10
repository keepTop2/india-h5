import useAxiosApi from "/@/utils/useAxiosApi";

export const activityApi = {
	// 活动列表
	activityPageList: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/activityPageList`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 活动分类
	activityTabsList: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityLabs/api/queryList`, {
			method: "GET",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 活动详情
	getConfigDetail: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/getConfigDetail`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 参加活动校验
	toActivity: (data = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/toActivity`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 领取活动
	getActivityReward: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/getActivityReward`, {
			method: "POST",
			data,
			headers,
		});
	},
	// 红包雨活动信息
	getRedBagInfo: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityRedBag/api/clientInfo`, {
			method: "POST",
			data,
		});
	},
	// 红包雨校验
	redBagParticipate: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityRedBag/api/participate`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 每日竞赛分类
	queryActivityDailyContestVenueCode: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/queryActivityDailyContestVenueCode`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},

	// 每日竞赛信息
	queryActivityDailyContest: (data = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/queryActivityDailyContest`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 每日竞赛奖池
	queryActivityDailyPrizePool: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/queryActivityDailyPrizePool`, {
			method: "POST",
			data,
			headers,
		});
	},
	// 每日竞赛奖池
	queryActivityDailyRecord: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/queryActivityDailyRecord`, {
			method: "POST",
			data,
			headers,
		});
	},
	// 转盘详情
	getSpinDetail: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/activity/spin/api/detail`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 参加转盘校验
	toSpinActivity: (data = {}) => {
		return useAxiosApi(`/app/activity/spin/api/toActivity`, {
			method: "POST",
			data,
			headers: {
				showLoading: true,
			},
		});
	},
	// 获取转盘奖品
	getSpinPrizeResult: (data = {}) => {
		return useAxiosApi(`/app/activity/spin/api/prizeResult`, {
			method: "POST",
			data,
		});
	},
	// 转盘中奖记录
	querySpinWheelOrderRecord: (data = {}) => {
		return useAxiosApi(`/app/activityParticipate/api/querySpinWheelOrderRecord`, {
			method: "POST",
			data,
		});
	},
};
