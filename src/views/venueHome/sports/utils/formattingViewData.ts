/*
 * @Author: Hida
 * @Date: 2024-06-02 21:49:42
 * @LastEditors: hida
 * @LastEditTime: 2024-09-04 13:06:01
 * @Description: 格式化体育赛事数据
 *
 */
import sportsMap from "/@/views/venueHome/sports/sportsMap/sportsMap";

/**
 * @description 格式化赛果体育项目数据
 */

export const formattingResultViewData = (data: any) => {
	// 获取体育字典 球类型
	const sportsType = Object.keys(sportsMap);
	const arr = [] as Array<Object>;
	sportsType.forEach((item) => {
		//根据sportType筛选出对应的数据
		const result = data.find((bItem) => bItem.sportType == item);
		// 遍历data将字典中的icon等字段添加到赛果体育项目中
		if (result) {
			arr.push({
				...sportsMap[item],
				...result,
				count: result?.eventResults,
			});
		}
	});
	return arr;
};

/**
 * @description 获取体育数据并格式化为联赛
 */
export const formatEvent2League = (events) => {
	const leagueList = {};
	// console.log(events, "=====event");
	events.forEach((item) => {
		const { leagueId, leagueName, leagueIconUrl } = item;
		const league = leagueList[`${leagueId}-${item.sportType}`];
		if (league) {
			leagueList[`${leagueId}-${item.sportType}`].events.push(item);
		} else {
			leagueList[`${leagueId}-${item.sportType}`] = {
				leagueId,
				leagueName,
				leagueIconUrl,
				events: [item],
			};
		}
	});
	// console.log(leagueList, "===leagueList");
	return Object.values(leagueList);
};
