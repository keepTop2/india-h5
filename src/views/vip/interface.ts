export interface VipWeekSportVO {
	weekSportMin?: number;
	weekSportMax?: number;
	weekSportBonus?: number;
}

export interface VipBenefit {
	vipRankCode?: number;
	vipRankName?: string;
	rankNameI18nCodeList?: any;
	minVipGrade?: any;
	maxVipGrade?: any;
	upgradeFlag?: number;
	upgrade?: number;
	weekAmountFlag?: number;
	weekAmountProp1?: number;
	weekAmountProp2?: number;
	monthAmountProp1?: any;
	monthAmountProp2?: any;
	monthAmountFlag?: number;
	weekSportFlag?: number;
	encryCoinFee?: number;
	vipWeekSportVOS?: VipWeekSportVO[];
	luxuriousGiftsFlag?: number;
	svipWelfareFlag?: number;
	luckFlag?: number;
}

export interface VIP {
	id?: string;
	userAccount?: string;
	vipRank?: number;
	vipGradeCode?: number;
	vipGradeUp?: number;
	avatarCode?: any;
	currentExp: number;
	currentVipExp: number;
	upgradeVipExp: number;
	upgradeVipNeedExp: number;
	vipBenefit: VipBenefit[];
}
