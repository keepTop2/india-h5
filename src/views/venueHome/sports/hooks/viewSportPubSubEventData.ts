import { SportViewModels } from "/@/views/venueHome/sports/models/sportViewModels";
import { SportViewData } from "/@/views/venueHome/sports/utils/interface";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { formatDateToTimeStamp } from "/@/webWorker/module/utils/formattingChildrenViewData";

export default (function () {
	class viewSportPubSubEventData implements SportViewModels {
		// 单例实例变量
		private static instance: viewSportPubSubEventData;
		// 私有构造函数，确保单例模式
		private constructor() {
			// 初始化视图数据实体
			this.viewSportData = reactive({
				sports: [],
				leagues: [],
				events: [],
				markets: [],
				outrights: [],
				results: [],
				childrenViewData: {},
			}) as SportViewData;
		}
		// 获取单例实例的静态方法
		public static getInstance(): viewSportPubSubEventData {
			if (!viewSportPubSubEventData.instance) {
				// 如果实例不存在，则创建
				viewSportPubSubEventData.instance = new viewSportPubSubEventData();
			}
			// 返回单例实例
			return viewSportPubSubEventData.instance;
		}

		public viewSportData: SportViewData;
		/**
		 * 清空数据
		 */
		public clearState() {
			Object.assign(this.viewSportData, {
				sports: [],
				leagues: [],
				events: [],
				markets: [],
				outrights: [],
				results: [],
				childrenViewData: {},
			});
		}
		/**
		 * 清空赛事数据保留sports
		 */
		public clearEventsState() {
			Object.assign(this.viewSportData, {
				childrenViewData: {},
			});
		}

		/**
		 * 设置数据
		 */
		public setSportData(viewSportData: SportViewData) {
			try {
				// 使用Object.assign来确保响应式数据的正确更新
				// console.log("viewSportData", viewSportData);

				Object.assign(this.viewSportData, viewSportData);
			} catch (error) {
				console.error("Error occurred while setting sport data:", error);
			}
		}
		/**
		 * @description 关注直接给出所有的events 不区分sportType
		 */
		public getEvents() {
			// return Object.values(this.viewSportData.childrenViewData);
			const leagues = Object.values(this.viewSportData.childrenViewData);
			return [].concat(...leagues);
		}
		/**
		 * 处理数据
		 */
		public getSportData(sportType?: string) {
			console.log(sportType, "=========sportType");
			const sportsBetEvent = useSportsBetEventStore();
			const leagueSelect = sportsBetEvent.getLeagueSelect;
			if (!sportType) {
				return this.viewSportData.childrenViewData;
			}
			const leagues = this.viewSportData.childrenViewData[sportType];
			// 如果有筛选 则处理数据，只给出筛选的联赛列表。
			if (leagues && leagueSelect.length > 0) {
				return leagues.filter((item) => leagueSelect.includes(item.leagueId));
			}
			// 如果有热门赛事，则处理数据给出热门赛事。
			const hotLeagueList = JSON.parse(JSON.stringify(sportsBetEvent.hotLeagueList));
			if (leagues && hotLeagueList) {
				const hotEventId = hotLeagueList.map((item) => item.eventId);
				return leagues.filter((item) => {
					item.event = item.events.filter((eventItem) => hotEventId.includes(eventItem.eventId));
					item.event.sort((a, b) => {
						return formatDateToTimeStamp(a.globalShowTime) - formatDateToTimeStamp(b.globalShowTime);
					});
					return item.event.length;
				});
			}
			return leagues;
		}
	}

	return viewSportPubSubEventData.getInstance();
})();
