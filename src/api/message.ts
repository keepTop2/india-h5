import useAxiosApi from "/@/utils/useAxiosApi";

const messageApi = {
  // 消息列表
	messagePageList: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/client/user/notice/getUserNoticeList`, {
			method: "POST",
			data,
		});
  },
  // 一键删除
  messageDeleteAll: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/client/user/notice/setDelStateAll`, {
			method: "POST",
      data,
      headers: {
				showLoading: true,
			},
		});
  },
  // 一键已读
  messageReadAll: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/client/user/notice/setReadStateAll`, {
			method: "POST",
      data,
      headers: {
				showLoading: true,
			},
		});
  },
  // 单个已读或删除
  msgDelOrRead: (data = {}, headers = {}) => {
		return useAxiosApi(`/app/client/user/notice/setReadState`, {
			method: "POST",
			data,
		});
  },
} 

export default messageApi