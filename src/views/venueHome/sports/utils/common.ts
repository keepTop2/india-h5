// 体育静态文件
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import locale from "dayjs/locale/zh-cn"; // 引入中文语言包
import sportsMap from "/@/views/venueHome/sports/sportsMap/sportsMap";
import { i18n } from "/@/i18n/index";
import { convertUtcToUtc5AndFormatMD } from "/@/webWorker/module/utils/formattingChildrenViewData";
import common from "/@/utils/common";
const $: any = i18n.global;

dayjs.extend(relativeTime);
dayjs.locale("zh-cn"); // 设置为中文环境

interface DateData {
	date: string;
	label: string;
	week: number;
}

/**
 * @description 体育公用方法类 -- 根据体育球类字典筛选sportType
 */
class SportsCommonFn {
	public static comboTypeNameMaps = {
		Doubles: "2串1",
		Trebles: "3串1",
		Trixie: "3串4",
		Lucky7: "幸运7",
		Fold4: "4串1",
		Yankee: "4串11",
		Lucky15: "幸运15",
		Fold5: "5串1",
		Canadian: "5串26",
		Lucky31: "幸运31",
		Fold6: "6串1",
		Heinz: "6串57",
		Lucky63: "幸运63",
		Fold7: "7串1",
		SuperHeinz: "7串120",
		Lucky127: "幸运127",
		Fold8: "8串1",
		Goliath: "8串247",
		Lucky255: "幸运255",
		Fold9: "9串1",
		Fold10: "10串1",
		Fold11: "11串1",
		Fold12: "12串1",
		Fold13: "13串1",
		Fold14: "14串1",
		Fold15: "15串1",
		Fold16: "16串1",
		Fold17: "17串1",
		Fold18: "18串1",
		Fold19: "19串1",
		Fold20: "20串1",
	};

	/**
	 * 体育投注类型
	 * 1:全场让球
	 * 2:全场单双
	 * 3:全场大小
	 * 5:全场独赢
	 * 7:半场让球
	 * 8:半场大小
	 * 15:半场独赢
	 * 12:半场单双
	 * 20:全场胜负
	 * 21:半场胜负
	 * 153:局数获胜
	 * 704:羽毛球比赛让分
	 * 705:羽毛球比赛大小
	 */
	public static BetTypeEnum = {
		FULL_TIME_HANDICAP: 1, // 全场让球
		FULL_TIME_OVER_UNDER: 3, // 全场大小
		FULL_TIME_WIN: 5, // 全场独赢
		HALF_TIME_HANDICAP: 7, // 半场让球
		HALF_TIME_OVER_UNDER: 8, // 半场大小
		HALF_TIME_WIN: 15, // 半场独赢
		OVERALL_WIN: 20, // 全场胜负
		NUMBER_ROUNDS_WON: 153, // 局数获胜
		FULL_HANDICAP: 1303, // 局数获胜
		BADMINTON_FULL_TIME_HANDICAP: 704, // 羽毛球比赛让分
		BADMINTON_FULL_TIME_OVER_UNDER: 705, // 羽毛球比赛大小
	};

	public static betTypeMap = {
		// 足球
		1: {
			5: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让球']"),
			3: $.t("sports['全场大小']"),
			15: $.t("sports['半场独赢']"),
			7: $.t("sports['半场让球']"),
			8: $.t("sports['半场大小']"),
		},
		// 篮球
		2: {
			20: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让分']"),
			3: $.t("sports['全场大小']"),
		},
		// 美式足球
		3: {
			20: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让球']"),
			3: $.t("sports['全场大小']"),
		},
		// 冰上曲球
		4: {
			20: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让球']"),
			3: $.t("sports['全场大小']"),
		},
		// 网球
		5: {
			20: $.t("sports['全场独赢']"),
			1303: $.t("sports['全场让盘']"),
			153: $.t("sports['全场让局']"),
		},
		// 排球
		6: {
			20: $.t("sports['全场独赢']"),
			704: $.t("sports['全场让分']"),
			705: $.t("sports['全场总分']"),
		},
		// 台球
		7: {
			20: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让局']"),
			3: $.t("sports['总局数']"),
		},
		// 棒球
		8: {
			20: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让球']"),
			3: $.t("sports['全场大小']"),
		},
		// 羽毛球
		9: {
			20: $.t("sports['全场独赢']"),
			704: $.t("sports['全场让分']"),
			705: $.t("sports['全场总分']"),
		},
		// 电竞
		43: {
			20: $.t("sports['全场独赢']"),
			1: $.t("sports['全场让球']"),
			3: $.t("sports['全场大小']"),
		},
	};

	/**
	 * @description 判断是否显示比分
	 * @date 比赛开始时间
	 */
	public static isStartMatch = (date): boolean => {
		const timestampStr = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
		const easternTimestamp = dayjs.utc(timestampStr).valueOf(); // 开赛时间戳（UTC+0）
		const currentEasternTimestamp = dayjs.utc().valueOf(); // 当前时间戳（UTC+0）
		if (easternTimestamp > currentEasternTimestamp) {
			return false;
		} else {
			return true;
		}
	};

	/**
	 * @description 获取体育类型请求参数
	 * @returns 体育类型请求参数
	 */
	public static getRequestSportsType = (): string => {
		let requestStr = "";
		const sportsKeyTypeList = Object.keys(sportsMap);
		sportsKeyTypeList.forEach((key, index) => {
			if (index != sportsKeyTypeList.length - 1) {
				requestStr += key + ",";
			} else {
				requestStr += key;
			}
		});
		return requestStr;
	};

	/**
	 * @description 格式化日期为时间戳
	 */
	public static formatDateToTimeStamp = (date: string): number => {
		return dayjs(date).valueOf();
	};

	/**
	 * @description 格式关注数据 提取对应的 events列表与 eventsid
	 */
	public static formatAttention = (data) => {
		/**
		 * 递归函数用于提取'thirdId'值
		 * @param {Object|Array} element - 当前处理的数据元素，可以是对象或数组
		 * @returns {string[]} 收集到的'id'值数组
		 */
		const ids: number[] = [];
		function recursiveExtract(element) {
			if (Array.isArray(element)) {
				// 如果当前元素是数组，则遍历每个子元素
				for (const item of element) {
					recursiveExtract(item);
				}
			} else if (typeof element === "object" && element !== null) {
				// 如果当前元素是对象，则检查'id'键并递归处理'list'键
				if ("thirdId" in element) {
					ids.push(Number(element.thirdId));
				}
				if ("list" in element) {
					recursiveExtract(element.list);
				}
			}
			return {
				eventIds: ids,
			};
		}
		// console.log(recursiveExtract(data), "===recursiveExtract(data)");
		return recursiveExtract(data);
	};

	/**
	 * @description 根据utc-5的当天日期 生成当天零点与23点59分59秒
	 * @description 提供一个数据区间 startDate 今天12点 endDate 明天12点
	 * */
	public static getResultDateRange = (date) => {
		// 传入的日期为UTC-5时间
		const easternTime = dayjs(date);
		// 计算0点（开始时间）
		const startDate = easternTime.startOf("day").add(5, "hour").format("YYYY-MM-DDTHH:mm:ss");
		// 计算23:59:59（结束时间），注意endOf返回的是下一周期的开始，所以需要减去1毫秒
		const endDate = easternTime.endOf("day").add(5, "hour").subtract(1, "millisecond").format("YYYY-MM-DDTHH:mm:ss");

		return { startDate, endDate };
	};
	// 获取 utc-5的当天 日期
	public static todayDate = () => {
		console.info(dayjs.utc());
		console.info(dayjs.utc().subtract(5, "hour").format("YYYY-MM-DD"));
		// console.info(dayjs.utc());
		return dayjs.utc().subtract(5, "hour").format("YYYY-MM-DD");
	};
	/**
	 * @description 生成指定日期区间内的日期数组
	 * @param {string} startDate - 起始日期
	 * @param {number} numDays - 需要生成的日期数量
	 * @param {boolean} direction - true 生成起始日期之后的日期，false 生成起始日期之前的日期，默认 false
	 * @returns {DateData[]} - 日期数组
	 */
	public static generateDateArray(startDate: string, numDays: number, direction = false): DateData[] {
		const dates: DateData[] = [];
		const startDay = dayjs(startDate).startOf("day");
		if (direction) {
			for (let i = 0; i < numDays; i++) {
				const dateObj = {
					date: startDay.add(i, "day").format("YYYY-MM-DD"),
					label: startDay.add(i, "day").format("MM-DD"),
					week: startDay.add(i, "day").day(),
				};
				dates.push(dateObj);
			}
		} else {
			for (let i = 0; i < numDays; i++) {
				const dateObj = {
					date: startDay.subtract(i, "day").format("YYYY-MM-DD"),
					label: startDay.subtract(i, "day").format("MM-DD"),
					week: startDay.subtract(i, "day").day(),
				};
				dates.push(dateObj);
			}
		}
		return dates;
	}

	/**
	 * @description 格式化让球Point
	 */
	public static formatPoint = (data) => {
		// console.log("data", data);
		const { betType, point, key } = data;
		const primaryBetTypes = [1, 7, 17, 219, 609, 637, 701, 704, 708, 153, 155, 1303, 1308, 1316, 3904, 9002, 9008, 9012, 9018, 9024, 9028, 9034, 9040, 9046, 9052, 9059, 9076, 9077, 9091, 9093, 9116];
		const secondaryBetTypes = [28, 124, 125, 453, 477, 478, 646];
		if (primaryBetTypes.includes(betType)) return this.formatPositiveNum(point);
		if (secondaryBetTypes.includes(betType) && key !== "x") return this.formatPositiveNum(point);
		if (secondaryBetTypes.includes(betType) && key === "x") return null;
		return point;
	};

	/**
	 * @description 正数拼接+号
	 */
	public static formatPositiveNum = (value: number) => {
		const isPositive = value > 0;
		return (isPositive ? "+" : "") + value;
	};

	/**
	 * @description 获取沙巴体育apiUrl
	 */
	public static getSportPushApiUrl(): string {
		switch (import.meta.env.VITE_BASEENV) {
			case "development":
				return window["PLATFROM_CONFIG"].developSportUrl;
			case "production":
				return window["PLATFROM_CONFIG"].productionSportUrl;
			default:
				return "";
		}
	}

	/**
	 * @description 获取体育语言
	 */
	public static getSportLanguage(): string {
		return "zhcn";
	}

	// 使用safeAccess函数来安全地访问深层属性 防止多级访问出现undefined报错
	// public static safeAccess = (obj, key) => {
	// 	return key.reduce((xs, x) => (xs && xs[x] != null ? xs[x] : null), obj);
	// };
	public static safeAccessMultiple = (obj, keysArray) => {
		return keysArray.reduce((result, keys) => {
			const value = keys.reduce((xs, x) => (xs && xs[x] != null ? xs[x] : null), obj);
			const lastKey = keys[keys.length - 1];
			result[lastKey] = value;
			return result;
		}, {});
	};

	// 动态匹配球类头部信息
	public static getEventsTitle = (event: any) => {
		// console.log("event", event);
		if (!event) return;
		if (event.sportType === 1) {
			const { gameInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["gameInfo"], ["eventStatus"], ["globalShowTime"]]);
			const { livePeriod, delayLive, isHt } = gameInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (livePeriod == 0 && !delayLive && isHt) {
					return $.t("sports['中场休息']");
				}
				if (livePeriod == 0 && delayLive && !isHt) {
					return $.t("sports['延迟开赛']");
				}
				if (livePeriod == 1 && !delayLive && !isHt) {
					return $.t("sports['上半场']");
				}
				if (livePeriod == 2 && !delayLive && !isHt) {
					return $.t("sports['下半场']");
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 2) {
			const { gameInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["gameInfo"], ["eventStatus"], ["globalShowTime"]]);
			const { livePeriod, delayLive, isHt } = gameInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (livePeriod == 0 && !delayLive && isHt) {
					return $.t("sports['中场休息']");
				}
				if (livePeriod == 0 && delayLive && !isHt) {
					return $.t("sports['延迟开赛']");
				}
				if (livePeriod == 1 && !delayLive && !isHt) {
					return $.t("sports['第一节']");
				}
				if (livePeriod == 2 && !delayLive && !isHt) {
					return $.t("sports['第二节']");
				}
				if (livePeriod == 3 && !delayLive && !isHt) {
					return $.t("sports['第三节']");
				}
				if (livePeriod == 4 && !delayLive && !isHt) {
					return $.t("sports['第四节']");
				}
				if (livePeriod == 99 && !delayLive && !isHt) {
					return $.t("sports['加时赛']");
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 3) {
			const { gameInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["gameInfo"], ["eventStatus"], ["globalShowTime"]]);
			const { livePeriod, delayLive, isHt } = gameInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (livePeriod == 0 && !delayLive && isHt) {
					return $.t("sports['中场休息']");
				}
				if (livePeriod == 1 && !delayLive && !isHt) {
					return $.t("sports['第一节']");
				}
				if (livePeriod == 2 && !delayLive && !isHt) {
					return $.t("sports['第二节']");
				}
				if (livePeriod == 3 && !delayLive && !isHt) {
					return $.t("sports['第三节']");
				}
				if (livePeriod == 4 && !delayLive && !isHt) {
					return $.t("sports['第四节']");
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 4) {
			const { gameInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["gameInfo"], ["eventStatus"], ["globalShowTime"]]);
			const { livePeriod, delayLive, isHt } = gameInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (livePeriod == 0 && delayLive && !isHt) {
					return $.t("sports['延迟开赛']");
				}
				if (livePeriod == 1 && !delayLive && !isHt) {
					return $.t("sports['第一节']");
				}
				if (livePeriod == 2 && !delayLive && !isHt) {
					return $.t("sports['第二节']");
				}
				if (livePeriod == 3 && !delayLive && !isHt) {
					return $.t("sports['第三节']");
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 5) {
			const { tennisInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["tennisInfo"], ["eventStatus"], ["globalShowTime"]]);
			const { currentSet } = tennisInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (currentSet == 1) {
					return "第一盘";
				}
				if (currentSet == 2) {
					return "第二盘";
				}
				if (currentSet == 3) {
					return "第三盘";
				}
				if (currentSet == 4) {
					return "第四盘";
				}
				if (currentSet == 5) {
					return "第五盘";
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 6) {
			const { volleyballInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["volleyballInfo"], ["eventStatus"], ["globalShowTime"]]);
			if (!volleyballInfo) {
				return convertUtcToUtc5AndFormatMD(globalShowTime);
			}
			const { latestLivePeriod } = volleyballInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (latestLivePeriod == 1) {
					return "第一局";
				}
				if (latestLivePeriod == 2) {
					return "第二局";
				}
				if (latestLivePeriod == 3) {
					return "第三局";
				}
				if (latestLivePeriod == 4) {
					return "第四局";
				}
				if (latestLivePeriod == 5) {
					return "第五局";
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 7) {
			const { gameInfo, eventStatus, globalShowTime, parentId } = this.safeAccessMultiple(event, [["gameInfo"], ["eventStatus"], ["globalShowTime"], ["parentId"]]);
			const { liveHomeScore, liveAwayScore } = gameInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (parentId > 0) {
					return convertUtcToUtc5AndFormatMD(globalShowTime);
				} else {
					return `第${common.getInstance().add(liveHomeScore, liveAwayScore) + 1}局`;
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 8) {
			const { baseballInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["baseballInfo"], ["eventStatus"], ["globalShowTime"]]);
			if (!baseballInfo) {
				return convertUtcToUtc5AndFormatMD(globalShowTime);
			}
			const { currentInning } = baseballInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (currentInning == 1) {
					return "第一局";
				}
				if (currentInning == 2) {
					return "第二局";
				}
				if (currentInning == 3) {
					return "第三局";
				}
				if (currentInning == 4) {
					return "第四局";
				}
				if (currentInning == 5) {
					return "第五局";
				}
				if (currentInning == 6) {
					return "第六局";
				}
				if (currentInning == 7) {
					return "第七局";
				}
				if (currentInning == 8) {
					return "第八局";
				}
				if (currentInning == 9) {
					return "第九局";
				}
				if (currentInning > 9) {
					return "延长赛";
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 9) {
			const { badmintonInfo, eventStatus, globalShowTime } = this.safeAccessMultiple(event, [["badmintonInfo"], ["eventStatus"], ["globalShowTime"]]);
			if (!badmintonInfo) {
				return convertUtcToUtc5AndFormatMD(globalShowTime);
			}
			const { currentSet } = badmintonInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (this.isStartMatch(globalShowTime)) {
				if (currentSet == 1) {
					return "第一局";
				}
				if (currentSet == 2) {
					return "第二局";
				}
				if (currentSet == 3) {
					return "第三局";
				}
				if (currentSet == 4) {
					return "第四局";
				}
				if (currentSet == 5) {
					return "第五局";
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		} else if (event.sportType === 43) {
			const { gameInfo, eventStatus, globalShowTime, isLive } = this.safeAccessMultiple(event, [["gameInfo"], ["eventStatus"], ["globalShowTime"], ["isLive"]]);
			const { livePeriod } = gameInfo;
			if (eventStatus == "closed") {
				return $.t("sports['比赛已关闭']");
			}
			if (eventStatus == "postponed") {
				return $.t("sports['比赛已推迟']");
			}
			if (isLive) {
				if (livePeriod == 1) {
					return $.t("sports['第一局']");
				}
				if (livePeriod == 2) {
					return $.t("sports['第二局']");
				}
				if (livePeriod == 3) {
					return $.t("sports['第三局']");
				}
				if (livePeriod == 4) {
					return $.t("sports['第四局']");
				}
				if (livePeriod == 5) {
					return $.t("sports['第五局']");
				}
				if (livePeriod == 6) {
					return $.t("sports['第六局']");
				}
				if (livePeriod == 7) {
					return $.t("sports['第七局']");
				}
				if (livePeriod == 8) {
					return $.t("sports['第八局']");
				}
				if (livePeriod == 9) {
					return $.t("sports['第九局']");
				}
			}
			return convertUtcToUtc5AndFormatMD(globalShowTime);
		}
	};
}

export default SportsCommonFn;
