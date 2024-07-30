// 体育静态文件
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import locale from "dayjs/locale/zh-cn"; // 引入中文语言包
import sportsMap from "/@/views/frontPage/home/Sports/sportsMap/sportsMap";
import { i18n } from "/@/i18n/index";
import { convertUtcToUtc5AndFormatMD } from "/@/webWorker/module/utils/formattingChildrenViewData";
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
			153: $.t("sports['全场让盘']"),
			3: $.t("sports['全场让局']"),
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

	// 使用safeAccess函数来安全地访问深层属性 防止多级访问出现undefined报错
	public static safeAccess = (obj, key) => {
		return key.reduce((xs, x) => (xs && xs[x] != null ? xs[x] : null), obj);
	};

	// 动态匹配球类头部信息
	public static getEventsTitle = (event: any): string => {
		const titleMap = {
			1: {
				key: "gameInfo",
				0: {
					0: $.t("sports['中场休息']"),
					1: $.t("sports['延迟开赛']"),
					2: $.t("sports['点球']"),
				},
				1: $.t("sports['上半场']"),
				2: $.t("sports['下半场']"),
			},
			2: {
				key: "gameInfo",
				0: {
					0: $.t("sports['中场休息']"),
					1: $.t("sports['延迟开赛']"),
				},
				1: $.t("sports['第一节']"),
				2: $.t("sports['第二节']"),
				3: $.t("sports['第三节']"),
				4: $.t("sports['第四节']"),
				99: $.t("sports['加时赛']"),
			},
			3: {
				key: "gameInfo",
				0: {
					0: $.t("sports['中场休息']"),
					1: $.t("sports['延迟开赛']"),
				},
				1: $.t("sports['上半场']"),
				2: $.t("sports['下半场']"),
			},
			4: {
				key: "gameInfo",
				0: {
					0: $.t("sports['中场休息']"),
					1: $.t("sports['延迟开赛']"),
				},
				1: $.t("sports['第一节']"),
				2: $.t("sports['第二节']"),
				3: $.t("sports['第三节']"),
				4: $.t("sports['第四节']"),
				99: $.t("sports['加时赛']"),
			},
			5: {
				key: "tennisInfo",
				1: $.t("sports['第一盘']"),
				2: $.t("sports['第二盘']"),
				3: $.t("sports['第三盘']"),
				4: $.t("sports['第四盘']"),
				5: $.t("sports['第五盘']"),
			},
			6: {
				key: "volleyballInfo",
				1: $.t("sports['第一局']"),
				2: $.t("sports['第二局']"),
				3: $.t("sports['第三局']"),
				4: $.t("sports['第四局']"),
				5: $.t("sports['第五局']"),
			},
			7: {
				key: "gameInfo",
				0: {
					0: $.t("sports['中场休息']"),
					1: $.t("sports['延迟开赛']"),
				},
				1: $.t("sports['第一节']"),
				2: $.t("sports['第二节']"),
				3: $.t("sports['第三节']"),
				4: $.t("sports['第四节']"),
				99: $.t("sports['加时赛']"),
			},
			8: {
				key: "baseballInfo",
				1: $.t("sports['第一局']"),
				2: $.t("sports['第二局']"),
				3: $.t("sports['第三局']"),
				4: $.t("sports['第四局']"),
				5: $.t("sports['第五局']"),
				6: $.t("sports['第六局']"),
				7: $.t("sports['第七局']"),
				8: $.t("sports['第八局']"),
				9: $.t("sports['第九局']"),
				延长赛: $.t("sports['延长赛']"),
			},
			9: {
				key: "badmintonInfo",
				1: $.t("sports['第一局']"),
				2: $.t("sports['第二局']"),
				3: $.t("sports['第三局']"),
				4: $.t("sports['第四局']"),
				5: $.t("sports['第五局']"),
			},
			43: {
				key: "gameInfo",
				0: {
					0: $.t("sports['中场休息']"),
					1: $.t("sports['延迟开赛']"),
				},
				1: $.t("sports['第一局']"),
				2: $.t("sports['第二局']"),
				3: $.t("sports['第三局']"),
				4: $.t("sports['第四局']"),
				5: $.t("sports['第五局']"),
				6: $.t("sports['第六局']"),
				7: $.t("sports['第七局']"),
				8: $.t("sports['第八局']"),
				9: $.t("sports['第九局']"),
			},
		};
		// 获取球类标记
		const sportType = event.sportType;
		// 获取信息对象
		const infoKey = titleMap[sportType]?.key;
		console.log(infoKey, "===infoKey", sportType);
		let title = "";
		if (infoKey && event.isLive) {
			// 如果是gameInfo则归集判断 如果不是 直接赋值
			if ([1, 2, 3, 4, 7, 43].includes(sportType)) {
				const { livePeriod, delayLive, isHt } = event[infoKey];
				// 中场休息判断
				if (livePeriod == 0 && !delayLive && isHt) {
					title = titleMap[sportType][0][0];
				}
				// 延迟开赛判断
				if (livePeriod == 0 && delayLive && !isHt) {
					title = titleMap[sportType][0][1];
				}
				if (livePeriod != 0 && !delayLive && !isHt) {
					title = titleMap[sportType][livePeriod];
				}
				if (livePeriod == 0 && !delayLive && !isHt) {
					title = "";
				}
			} else if (sportType == 8) {
				const livePeriod = event[infoKey]?.currentInning;
				if (livePeriod > 9) {
					title = titleMap[sportType]["延长赛"];
				} else {
					title = titleMap[sportType][livePeriod];
				}
			} else {
				const livePeriod = event[infoKey]?.currentSet || event[infoKey]?.latestLivePeriod || event[infoKey]?.currentSet;
				console.log(livePeriod, "==titleMap[sportType][livePeriod]");
				title = titleMap[sportType][livePeriod];
			}
			return title;
		}
		const globalShowTime = this.safeAccess(event, ["globalShowTime"]);
		return convertUtcToUtc5AndFormatMD(globalShowTime);
	};

	/**
	 * @description 判断是否显示比分
	 * @date 比赛开始时间
	 */
	public static isShowScore = (date): boolean => {
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
}

export default SportsCommonFn;
