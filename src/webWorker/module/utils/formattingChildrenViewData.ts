// 体育静态文件
import sportsMap from "/@/views/venueHome/sports/sportsMap/sportsMap";
import dayjs from "dayjs";
import { formatEvent2League } from "/@/views/venueHome/sports/utils/formattingViewData";

/**
 * @description 格式化markets数据为对象 以betType为key
 */
function formattingMarkets(markets) {
	const obj = {};
	markets.forEach((item) => {
		if (item.sort == 1 || item.sort == 0) {
			if (obj[item.betType]) {
				obj[`${item.betType}-${item.marketId}`] = item;
			} else {
				obj[item.betType] = item;
			}
		} else {
			obj[`${item.betType}-${item.marketId}`] = item;
		}
	});
	return obj;
}

/**
 * @description 格式化赛事数据，格式化后的数据结构为：
 * {
 *   sportType:[]
 * }
 * 在球类路由组件中 直接 state.childrenViewData[sportType] 即可取到对应的球类数据
 *
 * @param data： viewSportData
 * @param sportKey events | outrights
 * @param webToPushApi 目前仅用于格式化markets时判断是处理详情的还是列表的
 */
export const formattingChildrenViewData = (data: any, sportKey: string, webToPushApi?: string) => {
	// 获取体育字典 球类型
	const sportsType = Object.keys(sportsMap);
	// 遍历data将体育类型提取为一级分类，对应的冠军列表配置在children
	const childrenViewData = {};

	sportsType.forEach((type) => {
		let arr;
		if (sportKey == "events") {
			// 除电子竞技 其他都取等于0的数据
			arr = data["events"].filter((sport) => sport.sportType == type);
			// 电子竞技单独处理，其他类型统一处理
			arr.forEach((item) => {
				const markets = data.markets.filter((market) => market.eventId == item.eventId);
				item.markets = formattingMarkets(markets);
			});
			//格式化为联赛
			arr = formatEvent2League(arr);
		}
		if (sportKey == "outrights") {
			// 冠军赛事排序：
			// 赛事开始时间＞赛事ID，若同开始时间，赛事ID小的放前面
			// 盘口排序：
			// 玩法序号＞盘口ID，同玩法序号，盘口ID小的放前面；
			// 超过投注截止时间赛事 将不显示在列表中

			/**
			 * @description 获取scopeType相匹配的冠军数据
			 */
			arr = data[sportKey].filter((sport) => {
				if (sport.sportType == type) {
					// 对冠军下的队伍信息 按照 orid（优胜冠军赔率ID）进行排序
					sport.teams.sort((a, b) => {
						return a.orid - b.orid;
					});
					return sport;
				}
			});
		}
		childrenViewData[type] = arr;
	});
	return childrenViewData;
};

/**
 * @description 格式化日期为时间戳用于排序
 */
export const formatDateToTimeStamp = (date: string): number => {
	return dayjs(date).valueOf();
};

// 将UTC时间转换为用户当前时区的时间
export const convertUtcToUtc5AndFormat = (date) => {
	return dayjs.utc(date).local().format("YYYY-MM-DD HH:mm:ss");
};

// 将UTC时间转换为用户当前时区的时间，并格式化为MM-DD HH:mm
export const convertUtcToUtc5AndFormatMD = (date) => {
	return dayjs.utc(date).local().format("MM-DD HH:mm");
};
