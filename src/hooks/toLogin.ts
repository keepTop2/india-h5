import { useUserStore } from "/@/store/modules/user"; // 引入用户信息状态
import Common from "../utils/common";
import pubsub from "/@/pubSub/pubSub";
export function useToLogin() {
	const store = useUserStore();

	/**
	 * @description 前往登录
	 */
	const toLogin = () => {
		pubsub.publish("toLogin");
	};

	/**
	 * @description 前往注册
	 */
	const toRegister = () => {
		pubsub.publish("register");
	};

	interface TokenResponse {
		code: number;
	}
	/**
	 * @description 判断登录状态
	 */
	const isHaveToken = () => {
		return new Promise<TokenResponse>((resolve, reject) => {
			if (!store.token) {
				toLogin();
				reject({ code: Common.getInstance().ResCode.ERR });
			} else {
				resolve({ code: Common.getInstance().ResCode.SUCCESS });
			}
		});
	};

	return {
		toLogin,
		toRegister,
		isHaveToken,
	};
}
