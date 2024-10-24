/**
 * @description 体育SSE service  业务层
 */

import shopCartProcess from "/@/webWorker/module/utils/dataProcess/shopCartProcess";
import shopOutrightProcess from "/@/webWorker/module/utils/dataProcess/shopOutrightProcess";
import { WorkerToViewSportsShopCart } from "/@/views/venueHome/sports/models/sportViewModels";
import { SportEventSourceResponse } from "/@/views/venueHome/sports/models/sportEventSourceModel";

import { WorkerTransfer } from "/@/models/webWorkerModel";

import { SportShopCartProcessWorkerCommandType, WorkerName } from "/@/enum/workerTransferEnum";
import senDataMain from "/@/webWorker/module/sportShopCartProcessWorker/sportShopCartProcessWorker";

export default (function () {
	/**
	 * @description 体育购物车SSE service业务处理类
	 */
	class SportsShopCartSSEServices {
		/**
		 * @description 购物车sse 消息处理业务
		 */
		public startSEEProcess(data: SportEventSourceResponse) {
			console.log("第六步 购物车sse对应service处理对应业务");
			const workerToViewData: WorkerTransfer<WorkerToViewSportsShopCart<any>, SportShopCartProcessWorkerCommandType> = {
				workerName: WorkerName.sportShopCartProcessWorker,
				commandType: SportShopCartProcessWorkerCommandType.sportsShopCartViewChanges,
				data: {
					webToPushApi: data.webToPushApi,
					sportPushApi: data.sportPushApi,
					data: Object.keys(data.payload).length !== 0 ? (shopCartProcess(data) as Array<any>) : [],
				},
			};
			senDataMain(workerToViewData);
		}

		/**
		 * @description 冠军购物车sse 消息处理业务
		 */
		public startOutrightSEEProcess(data: SportEventSourceResponse) {
			console.log("第六步 冠军购物车对应service处理对应业务");

			const workerToViewData: WorkerTransfer<WorkerToViewSportsShopCart<any>, SportShopCartProcessWorkerCommandType> = {
				workerName: WorkerName.sportShopCartProcessWorker,
				commandType: SportShopCartProcessWorkerCommandType.championShopCartViewChanges,
				data: {
					webToPushApi: data.webToPushApi,
					sportPushApi: data.sportPushApi,
					data: Object.keys(data.payload).length !== 0 ? (shopOutrightProcess(data) as Array<any>) : [],
				},
			};

			senDataMain(workerToViewData);
		}
	}

	return SportsShopCartSSEServices;
})();
