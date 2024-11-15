import { Ref, ref } from "vue";
import { SELECT_BALL } from "/@/views/lottery/constant/index";
import { type GameplayItem, type MergedGameplayItem, type MergedGameplayList, type OddsListItem } from "/@/views/lottery/types/index";

type Balls = number[];

interface BallParams {
	value?: number;
	list: Balls;
}

export function useAccordion(mergedGameplayList: Ref<MergedGameplayList>) {
	const formActived = ref(false);
	const balls = ref([] as Balls);
	const currentGameplayItem = ref({} as MergedGameplayItem); // 当前选中的大菜单
	const currentOddsListItem = ref({} as OddsListItem); // 当前选中高亮的项
	const currentK10OddsList = ref<string[]>([]); // 当前选中高亮的项
	const isSelectBall = ref(false); // 当前玩法是否选择球

	// 清除手风琴展开状态的处理方法
	const clearAccordionStatus = (status: boolean, index: number) => {
		mergedGameplayList.value.forEach((item, i) => {
			item.actived = index === i && status;
		});
	};

	// 选择球组的处理方法
	const handleSelectBalls = ({ list }: BallParams, oddsListItem: OddsListItem, gameplayItem: GameplayItem, openBet = Function.prototype) => {
		console.log("handleSelectBalls");
		console.log("list", list);
		console.log("oddsListItem", oddsListItem);
		console.log("gameplayItem", gameplayItem);

		formActived.value = (list as Balls).length ? true : false;
		balls.value = list as Balls;

		if (list.length > 0) {
			openBet();
			currentGameplayItem.value = { ...gameplayItem, oddsList: { ...oddsListItem } };
		}
	};

	// const handleSelectBalls = ({ list }, childData: any, data: any) => {
	// 	formActived.value = list.length ? true : false;
	// 	currentGameplayItem.value = list.length ? { ...data, oddsList: { ...childData } } : null;
	// 	console.log("currentGameplayItem.value", currentGameplayItem.value);
	// 	balls.value = list;
	// 	currentOddsListItem.value = childData;
	// };

	// k10 选择球
	const handleSelectBallsK10 = (childData: any, parentData: any) => {
		console.log("handleSelectBallsK10");
		if (currentK10OddsList.value.includes(childData.optionCode)) {
			balls.value = [];
			currentK10OddsList.value = [];
			currentOddsListItem.value = {} as OddsListItem;
			return;
		}
		balls.value = [childData.optionName];
		currentK10OddsList.value = [childData.optionCode];
		currentOddsListItem.value = {
			...parentData,
			...childData,
		};
		console.log("currentOddsListItem.value", currentOddsListItem.value);
	};

	/**
	 * @description 手风琴展开玩法项的处理方法
	 * @param status 当前子项选中状态
	 * @param childData 当前子项数据
	 * @param data 父数据
	 */
	const handleExpanded = (status: boolean, oddsListItem: OddsListItem, gameplayItem: GameplayItem, openBet = Function.prototype) => {
		console.log("handleExpanded");
		console.log("status", status);
		console.log("oddsListItem", oddsListItem);
		console.log("gameplayItem", gameplayItem);
		console.log("openBet", openBet);
		mergedGameplayList.value.forEach((v) => {
			v.oddsList.forEach((w) => (w.actived = false));
		});
		oddsListItem.actived = status;
		currentOddsListItem.value = oddsListItem;
		balls.value = [];
		currentK10OddsList.value = [];
		// 排除选择球玩法
		if (oddsListItem.type !== "selectBall") {
			formActived.value = status;
			currentGameplayItem.value = gameplayItem as MergedGameplayItem;
			status && openBet();
		}
		isSelectBall.value = status ? oddsListItem.type === SELECT_BALL : false;
	};

	return {
		formActived,
		balls,
		isSelectBall,
		clearAccordionStatus,
		handleSelectBalls,
		handleSelectBallsK10,
		currentK10OddsList,
		handleExpanded,
		currentGameplayItem,
		currentOddsListItem,
	};
}
