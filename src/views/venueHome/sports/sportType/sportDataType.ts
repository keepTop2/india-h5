import { ServerData } from "/@/models/commonInterface";
import { Sports } from "/@/views/venueHome/sports/utils/interface";

/**
 * @description 线程管理器处理好的数据
 */
interface SportData extends ServerData {
	data: {
		sportViewData: {
			/**
			 * @description 外层Sports组件视图数据
			 */
			sports: Sports[];

			leagues: Array<any>;
			events: Array<any>;
			marikets: Array<any>;
			outrights: Array<any>;
			results: Array<any>;

			/**
			 * @description 各个子路由视图数据
			 */
			childrenViewData: [];
		};
		sportServerData: any;
	};
}

export default SportData;
