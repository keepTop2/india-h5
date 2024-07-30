import { WorkerTransfer } from "/@/models/webWorkerModel";

import sportsProcess from "/@/webWorker/module/sportWorker/dataProcess/sportsProcess";
import leaguesProcess from "/@/webWorker/module/sportWorker/dataProcess/leaguesProcess";
import eventsProcess from "/@/webWorker/module/sportWorker/dataProcess/eventsProcess";
import marketsProcess from "/@/webWorker/module/sportWorker/dataProcess/marketsProcess";
import outrightsProcess from "/@/webWorker/module/sportWorker/dataProcess/outrightsProcess";
import shopCartProcess from "/@/webWorker/module/sportWorker/dataProcess/shopCartProcess";
import { Sports, SportData, SportViewData } from "/@/views/venueHome/sports/utils/interface";

/**
 * @description 体育线程
 */
(function () {
	const state = {
		/**
		 * @description Sports视图数据
		 */
		viewSportData: {
			/**
			 * @description 外层Sports组件视图数据
			 */
			sports: [] as Sports[],
			leagues: [],
			events: [],
			markets: [],
			outrights: [],
			results: [],
			/**
			 * @description 各个子路由视图数据
			 */
			childrenViewData: {},
		} as SportViewData,
	};

	// 体育线程处理对应事件方法
	const sportsThreadFn = {
		sports: sportsProcess,
		events: eventsProcess,
		leagues: leaguesProcess,
		markets: marketsProcess,
		outrights: outrightsProcess,
		shopCart: shopCartProcess,
	};

	/**
	 * @description 接收体育主线程消息
	 * @param data
	 */
	onmessage = (event) => {
		const strData: string = new TextDecoder().decode(event.data);

		const jsonData: WorkerTransfer = JSON.parse(strData);
		const mainData = jsonData.data;
		// console.log("第五步 sportWoker收到线程管理器数据", jsonData);
		// 处理购物车数据 购物车数据特殊判断

		/**
		 * @description  线程推送更新 赔率变化事件
		 * @param {
		 * 	serverType: "sportServer",
		 *	webToPushApi: sportEventSource.webToPushApi["updateOddsChange"],
		 *	oddsChange: { marketId, selections },
		 * }
		 * @description oddsChange 传入需要修改oddsChange的 盘口id 与对应的 selections
		 */
		if (jsonData.webToPushApi == "updateOddsChange") {
			const { oddsChange } = jsonData;
			// 获取 盘口index；
			const index = state.viewSportData.markets.findIndex((item) => item.marketId == oddsChange.marketId);
			if (index != -1) {
				//获取market
				const market = state.viewSportData.markets[index];
				//匹配对应的selection
				const selectionIndex = market?.selections.findIndex((item) => item.key == oddsChange.selections.key);
				//设置oddsChange为空
				state.viewSportData.markets[index].selections[selectionIndex].oddsChange = "";
			}
			return;
		}

		if (jsonData.webToPushApi === "sportsShopCart") {
			if (mainData.sportServerData?.payload?.events) {
				const processData = sportsThreadFn.shopCart(mainData.sportServerData, mainData.sportsBetEventData);
				senDataMain(processData, jsonData);
			}
			// 购物车直接退出 不执行以下判断
			return;
		}
		// 处理sports数据变化方法
		if (mainData.sportServerData?.payload?.sports) {
			/**
			 * 今日 早盘 滚球 冠军 都走的这里，需要将 webToPushApi 传给 senDataMain 判断 一下是否为冠军，处理冠军的赛事count展示
			 */
			const processData = sportsThreadFn.sports(mainData.sportServerData, state.viewSportData, jsonData.webToPushApi) as SportData;
			//处理好的数据赋值给state
			state.viewSportData.sports = processData.sportViewData.sports;
			senDataMain(processData, jsonData);
		}
		// 处理events数据变化方法
		if (mainData.sportServerData?.payload?.events) {
			const processData = sportsThreadFn.events(mainData.sportServerData, state.viewSportData) as SportData;
			//处理好的数据赋值给state
			state.viewSportData.events = processData.sportViewData.events;
			senDataMain(processData, jsonData);
		}
		// 处理outrights数据变化方法
		if (mainData.sportServerData?.payload?.outrights) {
			const processData = sportsThreadFn.outrights(mainData.sportServerData, state.viewSportData) as SportData;
			//处理好的数据赋值给state
			state.viewSportData.outrights = processData.sportViewData.outrights;
			senDataMain(processData, jsonData);
		}
	};

	const senDataMain = (processData, jsonData: ServerData) => {
		// console.log(processData, "====processData");
		// 是否为购物车处理流程
		if (jsonData.webToPushApi == "sportsShopCart") {
			const mainData: ServerData = {
				serverType: jsonData.serverType,
				webToPushApi: jsonData.webToPushApi,
				sportPushApi: jsonData.sportPushApi,
				data: {
					sportsBetEventData: processData.sportsBetEventData,
				},
			};
			// console.log("子线程抛回主线程", mainData);
			// console.log("第六步 从SportWorker 抛回线程管理器", mainData);
			postMessage(JSON.stringify(mainData));
		} else {
			const mainData: ServerData = {
				serverType: jsonData.serverType,
				webToPushApi: jsonData.webToPushApi,
				sportPushApi: jsonData.sportPushApi,
				data: {
					sportViewData: {
						/**
						 * @description 外层Sports组件视图数据
						 */
						sports: processData.sportViewData.sports,
						leagues: [],
						events: [],
						markets: [],
						outrights: [],
						results: [],
						/**
						 * @description 各个子路由视图数据
						 */
						childrenViewData: processData.sportViewData.childrenViewData,
					} as SportViewData,
				},
			};
			// console.log("子线程抛回主线程", mainData);
			// console.log("第六步 从SportWorker 抛回线程管理器", mainData);

			postMessage(JSON.stringify(jsonData));
		}
	};
})();
