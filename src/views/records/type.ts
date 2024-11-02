// Response interface
export interface ClientOrderRecordRes {
	/* */
	eventOrderPage: EventOrderPage;
	sabOrderList: SabOrderList[];
	basicOrderPage: BasicOrderPage /* */;
	tableOrderPage: {
		/* */
		records: TableOrderPageRecords[] /* */;
		total: number /* */;
		size: number /* */;
		current: number /* */;
		orders: {
			/* */
			column: string /* */;
			asc: boolean;
		}[] /* */;
		optimizeCountSql: boolean /* */;
		searchCount: boolean /* */;
		optimizeJoinOfCountSql: boolean /* */;
		maxLimit: number /* */;
		countId: string /* */;
		pages: number;
	} /* */;
	totalVO: {
		/*投注金额 */
		betAmount: number /*输赢金额 */;
		winLoseAmount: number /*投注笔数 */;
		betNum: number;
	};
}
export interface TableOrderPageRecords {
	/*注单号 */
	orderId: string /*游戏id */;
	gameId: string /*游戏名称 */;
	gameName: string /*投注内容 */;
	betContent: string /*投注内容-文本 */;
	betContentText: string /*局号 */;
	gameNo: string /*桌号 */;
	deskNo: string /*投注结果 */;
	resultList: string /*投注金额 */;
	betAmount: number /*输赢金额 */;
	winLossAmount: number /*赔率 */;
	odds: string /*投注时间 */;
	betTime: number /* */;
	orderClassify: number /*注单状态-文本 */;
	orderClassifyText: string;
}

export interface BasicOrderPage {
	/* */
	records: BasicOrderPageRecords[] /* */;
	total: number /* */;
	size: number /* */;
	current: number /* */;
	orders: {
		/* */
		column: string /* */;
		asc: boolean;
	}[] /* */;
	optimizeCountSql: boolean /* */;
	searchCount: boolean /* */;
	optimizeJoinOfCountSql: boolean /* */;
	maxLimit: number /* */;
	countId: string /* */;
	pages: number;
}

export interface BasicOrderPageRecords {
	/*注单号 */
	orderId: string /*三方游戏id */;
	thirdGameCode: string /*游戏名称 */;
	gameName: string /*投注金额 */;
	betAmount: number /*输赢金额 */;
	winLossAmount: number /*投注时间 */;
	betTime: number /* */;
	orderClassify: number /*注单状态-文本 */;
	orderClassifyText: string;
}

export interface EventOrderPage {
	/* */
	records: EventOrderPageRecords[] /* */;
	total: number /* */;
	size: number /* */;
	current: number /* */;
	orders: {
		/* */
		column: string /* */;
		asc: boolean;
	}[] /* */;
	optimizeCountSql: boolean /* */;
	searchCount: boolean /* */;
	optimizeJoinOfCountSql: boolean /* */;
	maxLimit: number /* */;
	countId: string /* */;
	pages: number;
} /*赛事注单信息 沙巴专属 */

export interface EventOrderPageRecords {
	/*注单号 */
	orderId: string /*赛事信息 */;
	eventInfo: string /*队伍信息 */;
	teamInfo: string /*投注内容 */;
	betContent: string /*投注金额 */;
	betAmount: number /*输赢金额 */;
	winLossAmount: number /*赔率 */;
	odds: number /*投注时间 */;
	betTime: number /*注单状态 */;
	orderClassify: number /*注单状态-文本 */;
	orderClassifyText: string /*是否串关 true:是 false:否 */;
	multipleBet: boolean /*串关注单信息 */;
	orderMultipleBetList: {
		/*注单号 */
		orderId: string /*赛事信息 */;
		eventInfo: string /*队伍信息 */;
		teamInfo: string /*投注内容 */;
		betContent: string /*投注金额 */;
		betAmount: number /*输赢金额 */;
		winLossAmount: number /*赔率 */;
		odds: number /*输赢状态 赢1 和0 输-1 */;
		winlossStatus: number /*输赢状态-文本 */;
		winlossStatusText: string /*注单状态 */;
		orderClassify: number /*注单状态-文本 */;
		orderClassifyText: string;
	}[];
}

export interface SabOrderList {
	/*注单号 */
	orderId: string /*赛事信息 */;
	eventInfo: string /*队伍信息 */;
	teamInfo: string /*投注内容 */;
	betContent: string /*投注金额 */;
	betAmount: number /*输赢金额 */;
	winLossAmount: number /*赔率 */;
	odds: number /*投注时间 */;
	betTime: number /*注单状态 */;
	orderClassify: number /*注单状态-文本 */;
	orderClassifyText: string /*是否串关 true:是 false:否 */;
	multipleBet: boolean /*串关注单信息 */;
	orderMultipleBetList: {
		/*注单号 */
		orderId: string /*赛事信息 */;
		eventInfo: string /*队伍信息 */;
		teamInfo: string /*投注内容 */;
		betContent: string /*投注金额 */;
		betAmount: number /*输赢金额 */;
		winLossAmount: number /*赔率 */;
		odds: number /*输赢状态 赢1 和0 输-1 */;
		winlossStatus: number /*输赢状态-文本 */;
		winlossStatusText: string /*注单状态 */;
		orderClassify: number /*注单状态-文本 */;
		orderClassifyText: string;
	}[];
}
[] /* */;
