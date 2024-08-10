export interface MedalNameI18List {
	messageKey: string;
	message: string;
	language: string;
}

export interface MedalDescI18List {
	messageKey: string;
	message: string;
	language: string;
}

export interface UserCenterMedalDetailRespVoList {
	sortNum: number;
	siteCode: string;
	userId?: number;
	userAccount?: string;
	medalCode: string;
	medalName: string;
	unlockCondName: string;
	rewardAmount: number;
	typingMultiple: number;
	condNum1: string;
	condNum2?: any;
	medalDesc: string;
	activatedPic: string;
	activatedPicUrl: string;
	inactivatedPic: string;
	inactivatedPicUrl: string;
	lockStatus: number;
	lockStatusSortNum: number;
	lockStatusName: string;
	completeTime?: any;
	unlockTime?: any;
	medalNameI18: string;
	medalNameI18List: MedalNameI18List[];
	medalDescI18: string;
	medalDescI18List: MedalDescI18List[];
}

export interface TopNList {
	canLightNum: number;
	userCenterMedalDetailRespVoList: UserCenterMedalDetailRespVoList[];
}
