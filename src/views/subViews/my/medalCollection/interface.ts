export interface MedalRewardRespVOS {
	siteCode: string;
	unlockMedalNum: number;
	rewardAmount: number;
	typingMultiple: number;
	userAccount?: any;
	condNum?: any;
	openStatus: number;
	icon?: string;
}

export interface NotUnlockList {
	sortNum: number;
	siteCode: string;
	userId?: any;
	userAccount?: any;
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
	medalNameI18List?: any;
	medalDescI18: string;
	medalDescI18List?: any;
}
