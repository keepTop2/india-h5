import _ from "lodash";
// 购物车赛事信息处理
export default (function () {
	/**
	 * @description shopCartProcess数据处理
	 * @params sportServerData 数据源数据
	 * @params sportsBetEventData 购物车数据
	 * @returns processData 处理好的数据
	 */

	const data = {
		events: [] as any,
		markets: [] as any,
	};

	const shopCartProcess = (sportServerData) => {
		// console.log("sportServerData-----------?", sportServerData);
		let processData = {} as any;
		// 处理 payload.events 数据
		if (sportServerData.payload.events.add.length > 0) {
			processData = Object.assign({}, processData, shopCartProcessAdd(sportServerData));
		}

		// 处理 payload.markets 数据
		// if (sportServerData.payload.markets && sportServerData.payload.markets.add.length > 0) {
		// 	processData = Object.assign({}, processData, marketsProcessAdd(sportServerData));
		// }

		if (sportServerData.payload.events.add.length > 0 || sportServerData.payload.markets.add.length > 0) {
			// console.log("每次都会触发？？？？？？？？", data);
			processData.sportsBetEventData = formattingShopCartData(data);
		}
		return processData.sportsBetEventData;
	};

	// events 新增
	const shopCartProcessAdd = (sportServerData) => {
		data.events = [];
		data.events = data.events.concat(sportServerData.payload.events.add);
		return { sportServerData };
	};

	// markets 新增
	const marketsProcessAdd = (sportServerData) => {
		data.markets = [];
		data.markets = data.markets.concat(sportServerData.payload.markets.add);
		return { sportServerData };
	};

	/**
	 * @description 格式化markets数据为对象 以betType为key
	 */
	function formattingMarkets(markets) {
		const obj = {};
		markets.forEach((item) => {
			obj[item.betType] = item;
		});
		return obj;
	}

	// 格式话购物车需要的数据格式
	const formattingShopCartData = (data) => {
		data.events.forEach((item) => {
			// const sortValue = item.sportType === "43" ? 0 : 1;
			const markets = data.markets.filter((market) => market.eventId === item.eventId);
			item.markets = formattingMarkets(markets);
		});
		return data.events;
	};

	return shopCartProcess;
})();
