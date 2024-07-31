export interface Sports {
	count?: number;
	sportType: number;
	liveGameCount: number;
	icon: string;
	activeIcon: string;
	sportName: string;
}

/**
 * @description 体育视图数据模型
 */
export interface SportViewData {
	/**
	 * @description 外层Sports组件视图数据
	 */
	sports: Sports[];
	leagues: Array<any>;
	events: Array<any>;
	markets: Array<any>;
	outrights: Array<any>;
	results: Array<any>;

	/**
	 * @description 各个子路由视图数据
	 */
	childrenViewData: Array<any> | {};
}

/**
 * @description 线程管理器处理好的数据
 */
export interface SportData {
	sportViewData: SportViewData;
	sportServerData: any;
}

export interface SoccerDetail {
	firstGoal: string;
	lastGoal: string;
	firstHtGoal?: any;
	lastHtGoal?: any;
	goalSequence: string;
	cornerSequence?: any;
	penaltySequence?: any;
	firstGoalMethod?: any;
	specialData: any[];
	deathSuddenPenaltySequence?: any;
	isPenaltyHandicap: boolean;
	isPenaltyOverUnder: boolean;
}

export interface EventResult {
	eventId: number;
	homeId: number;
	homeName: string;
	awayId: number;
	awayName: string;
	htHomeScore: string;
	htAwayScore: string;
	homeScore: string;
	awayScore: string;
	firstHomeScore?: any;
	firstAwayScore?: any;
	secondHomeScore?: any;
	secondAwayScore?: any;
	homeGameScore?: any;
	awayGameScore?: any;
	sessionScores?: any;
	overTimeScores?: any;
	gameStatus: string;
	winDetail?: any;
	eventTime: string;
	soccerDetail: SoccerDetail;
	eSportMapDetail?: any;
}

export interface TeamInfo {
	homeId: number;
	homeName: string;
	homeIconUrl: string;
	awayId: number;
	awayName: string;
	awayIconUrl: string;
}

export interface GameInfo {
	livePeriod: number;
	clockDirection: string;
	seconds: number;
	isNeutral: boolean;
	isHt: boolean;
	isBreak: boolean;
	isClosed: boolean;
	inJuryTime: number;
	gameStatus: number;
	inPlayTime: string;
	delayLive: boolean;
	liveHomeScore: number;
	liveAwayScore: number;
}

export interface SoccerInfo {
	homeRedCard: number;
	awayRedCard: number;
	homeYellowCard: number;
	awayYellowCard: number;
}

export interface OddsPrice {
	americanPrice: number;
	decimalPrice: number;
	hongKongPrice: number;
	indoPrice: number;
	malayPrice: number;
	parlayPrice: number;
}

export interface Selection {
	key: string;
	keyName: string;
	marketId?: number;
	oddsChange: string;
	point: number;
	oddsPrice: OddsPrice;
}

export interface Market {
	sportType: number;
	eventId: number;
	betType: number;
	betTypeName: string;
	marketId: number;
	maxBet: number;
	isLive: boolean;
	marketStatus: string;
	resourceId: string;
	category: number;
	showCategory: string;
	sort: number;
	combo: number;
	selections: Selection[];
}

export interface BetMarketInfo {
	betType: number;
	betTypeName?: string;
	marketId?: number;
	key?: string;
	keyName?: string;
	point?: number;
	decimalPrice?: number;
	differentBalls?: boolean;
	marketStatus?: string;
	oddsChange?: string;
	stateCode?: number;
	combo?: number;
}

export interface BasketballInfo {
	homeGameScore: number[];
	awayGameScore: number[];
	homeGameScoreString: string;
	awayGameScoreString: string;
	latestLivePeriod: number;
	homeOverTimeScore: number;
	awayOverTimeScore: number;
}

export interface TennisInfo {
	homeGameScore: number[];
	awayGameScore: number[];
	homeGameScoreString: string;
	awayGameScoreString: string;
	homePointScore: string;
	awayPointScore: string;
	currentSet: number;
	currentServe: number;
}

export interface VolleyballInfo {
	homeGameScore: number[];
	awayGameScore: number[];
	homeGameScoreString: string;
	awayGameScoreString: string;
	homePointScore: number;
	awayPointScore: number;
	currentServe: number;
	homeCurrentPoint: number;
	awayCurrentPoint: number;
	playerInjury: number;
	latestLivePeriod: number;
}
// 网球
export interface TennisInfo {
	homeGameScore: number[];
	awayGameScore: number[];
	homeGameScoreString: string;
	awayGameScoreString: string;
	homePointScore: string;
	awayPointScore: string;
	currentSet: number;
	currentServe: number;
}

// 棒球
export interface BaseballInfo {
	homeGameScore: number[];
	awayGameScore: number[];
	homeGameScoreString: string;
	awayGameScoreString: string;
	homeOverTimeScore: number;
	awayOverTimeScore: number;
	baseHasRunner: boolean[];
	currentInning: number;
	currentBattingTeam: number;
	currentOuts: number;
}

// 羽毛球
export interface BadmintonInfo {
	homeGameScore: number[];
	awayGameScore: number[];
	homeCurrentPoint: number;
	awayCurrentPoint: number;
	homeSetScore: number;
	awaySetScore: number;
	playerInjury: number;
	currentSet: number;
	currentServe: number;
}

// 电子竞技
export interface ESportInfo {
	bestOfMap: number;
	isStartingSoon: boolean;
	moveBO3Down: boolean;
	overTimeSession: number;
	leagueGroup: string;
	leagueGroupId: number;
}

// 冠军
export interface championInfo {
	orid: number;
	teamId: number;
	teamName: string;
	price: number;
	maxBet: number;
	oddsStatus: string;
	isUpdate: boolean;
	teamIconUrl: string;
	leagueId: number;
	leagueName: string;
	sportType: number;
}

export interface SportsRootObject {
	sportType: number;
	sportName: string;
	leagueId: number;
	leagueName: string;
	leagueIconUrl: string;
	eventId: number;
	eventCode: string;
	eventStatus: string;
	isMainMarket: boolean;
	kickOffTime: string;
	globalShowTime: string;
	countryCode: string;
	gameSession: number;
	parentId: number;
	isTest: boolean;
	isLive: boolean;
	isParlay: boolean;
	isCashout: boolean;
	isVirtualEvent: boolean;
	hasLiveMarket: boolean;
	marketCount: number;
	marketCategories: number[];
	streamingOption: number;
	channelCode: string;
	teamInfo: TeamInfo;
	gameInfo: GameInfo;
	soccerInfo: SoccerInfo;
	markets: Market[];
	betMarketInfo: BetMarketInfo;
	basketballInfo: BasketballInfo;
	volleyballInfo: VolleyballInfo;
	baseballInfo: BaseballInfo;
	badmintonInfo: BadmintonInfo;
	tennisInfo: TennisInfo;
	eSportInfo: ESportInfo;
}
