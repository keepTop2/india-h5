export interface GameInfoList {
	id?: string;
	name?: string;
	icon?: string;
	status?: number;
	remark?: string;
	sort?: number;
	label?: number;
	cornerLabels?: number;
	maintenanceStartTime?: number;
	maintenanceEndTime?: number;
	collect?: boolean;
}
/**
 * @description 热门游戏列表
 */
export interface LobbyTopGame {
	gameOneId: string;
	name: string;
	icon: string;
	gameInfoList: GameInfoList[];
}
/**
 * @description 搜索游戏列表
 */
export interface searchGameListRequestBody {
	orderField?: "string";
	orderType?: "string";
	orderName?: "string";
	orderValue?: "string";
	pageNumber?: 1;
	pageSize?: 10;
	gameName?: "string";
}
