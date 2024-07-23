import LoginEvents from "./module/loginEvents";

import WorkerEvents from "./module/workerEvents";
import SportEvents from "./module/sportEvents";
import SportAEvents from "./module/sportAEvents";
import PreFetchViewEvents from "./module/preFetchViewEvents";
/**
 * @description 统一订阅事件(主题)出口
 */
const PubSubEvents = {
	/**
	 * @description — 登录模块发布订阅事件名(主题)
	 */
	LoginEvents,

	/**
	 * @description 线程事件
	 */
	WorkerEvents,
	/**
	 * @description 体育视图事件
	 */
	SportEvents,
	/**
	 * @description 体育子应用A事件
	 */
	SportAEvents,
	/**
	 * @description 子页面预加载页面事件
	 */
	PreFetchViewEvents,
};

export default PubSubEvents;
