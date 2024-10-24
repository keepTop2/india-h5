import { WorkerName } from "/@/enum/workerTransferEnum";
import { WorkerItem } from "/@/models/webWorkerModel";
// 体育视图处理线程
import sportViewProcessWorker from "/@/webWorker/module/sportViewProcessWorker/sportViewProcessWorker?worker&url";
// import a from "/@/webWorker/module/sportViewProcessWorker/a.js";
// import sportViewProcessWorker from "../";
//体育购物车处理线程
import sportShopCartProcessWorker from "/@/webWorker/module/sportShopCartProcessWorker/sportShopCartProcessWorker?worker&url";
//彩票线程
import lotteryWorker from "/@/webWorker/module/lotteryWorker/lotteryWorker?worker&url";

/**
 * @description 线程字典
 */
export const WorkerMap = {
	/**
	 * @description 体育视图处理线程
	 */
	sportViewProcessWorker: {
		workerName: WorkerName.sportViewProcessWorker,
		// url: "./example.sportViewProcessWorker",
		url: sportViewProcessWorker,
	} as WorkerItem,

	/**
	 * @description 体育购物车处理线程
	 */
	sportShopCartProcessWorker: {
		workerName: WorkerName.sportShopCartProcessWorker,
		url: sportShopCartProcessWorker,
	} as WorkerItem,

	/**
	 * @description 彩票线程名称及文件路径
	 */
	lotteryWorker: {
		workerName: WorkerName.lottery,
		url: lotteryWorker,
	} as WorkerItem,
};
