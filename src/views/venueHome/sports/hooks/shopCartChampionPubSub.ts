import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import Common from "/@/utils/common";
export default (function () {
	class shopCartChampionPubSub {
		// 单例实例变量
		private static instance: shopCartChampionPubSub;
		// 私有构造函数，确保单例模式
		private constructor() {
			// 初始化视图数据实体
			this.betValueState = reactive({
				// 键盘状态
				betNumberShow: true,
				singleTicketBetValue: "",
				singleTicketWinningAmount: 0,
			});
		}
		public betValueState;

		// 获取单例实例的静态方法
		public static getInstance(): shopCartChampionPubSub {
			if (!shopCartChampionPubSub.instance) {
				// 如果实例不存在，则创建
				shopCartChampionPubSub.instance = new shopCartChampionPubSub();
			}
			// 返回单例实例
			return shopCartChampionPubSub.instance;
		}

		//设置单关投注金额
		public setSingleTicketBetValue(value) {
			const sportsBetInfo = useSportsBetInfoStore();
			const { singleTicketBetValue } = this.betValueState;
			const balance = Number(sportsBetInfo.balance);
			const { maxBet, minBet } = sportsBetInfo.championSingleTicketInfo;
			if (value === "{close}") {
				this.betValueState.betNumberShow = false;
				return;
			}
			if (value === "{bksp}") {
				if (balance < 0 && singleTicketBetValue) {
					this.betValueState.singleTicketBetValue = singleTicketBetValue.slice(0, -1);
				}
			} else {
				if (balance < 0) {
					this.betValueState.singleTicketBetValue = "0";
					this.getSingleTicketBetValue();
					return;
				}
			}
			if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "000"].includes(value)) {
				if ((singleTicketBetValue === "" || singleTicketBetValue === "0") && (value === "0" || value === "00" || value === "000")) {
					this.betValueState.singleTicketBetValue = "0";
				} else {
					this.betValueState.singleTicketBetValue += value;
				}
			} else if (value === "{100}") {
				this.betValueState.singleTicketBetValue = "100";
			} else if (value === "{200}") {
				this.betValueState.singleTicketBetValue = "200";
			} else if (value === "{500}") {
				this.betValueState.singleTicketBetValue = "500";
			} else if (value === "{1000}") {
				this.betValueState.singleTicketBetValue = "1000";
			} else if (value === "{max}") {
				this.betValueState.singleTicketBetValue = maxBet.toString();
			} else if (value === "{min}") {
				this.betValueState.singleTicketBetValue = minBet.toString();
			} else if (value === "{bksp}") {
				this.betValueState.singleTicketBetValue = singleTicketBetValue.slice(0, -1);
			} else {
				this.betValueState.singleTicketBetValue = value;
			}
			this.getSingleTicketBetValue();
		}

		// 读取单关投注金额
		public getSingleTicketBetValue() {
			const sportsBetInfo = useSportsBetInfoStore();
			const balance = Math.floor(Number(sportsBetInfo.balance));
			const maxBet = Math.floor(Number(sportsBetInfo.championSingleTicketInfo.maxBet));
			if (balance < 0) {
				this.betValueState.singleTicketBetValue == "0";
			} else {
				if (balance < maxBet) {
					if (this.betValueState.singleTicketBetValue > balance) {
						this.betValueState.singleTicketBetValue = balance.toString();
					}
				} else {
					if (this.betValueState.singleTicketBetValue > maxBet) {
						this.betValueState.singleTicketBetValue = maxBet.toString();
					}
				}
			}
			return this.betValueState.singleTicketBetValue;
		}

		// 获取单关键盘显示状态
		public getBetNumberShow() {
			return this.betValueState.betNumberShow;
		}

		// 改变单关键盘显示状态
		public setBetNumberShow() {
			console.log("触发了吗？");
			this.betValueState.betNumberShow = true;
		}

		// 单关赔率变化计算
		public decimalPrice(item) {
			const amount = Common.getInstance().mul(item.price, this.betValueState.singleTicketBetValue);
			this.betValueState.singleTicketWinningAmount = Common.getInstance().sub(amount, this.betValueState.singleTicketBetValue);
			return Common.getInstance().formatFloat(item.price);
		}

		// 单关动态计算额度
		public getSingleTicketWinningAmount() {
			return Common.getInstance().formatFloat(this.betValueState.singleTicketWinningAmount);
		}

		// 初始化
		public initializeState() {
			this.betValueState.betNumberShow = true;
			this.betValueState.singleTicketBetValue = "";
			this.betValueState.singleTicketWinningAmount = 0;
		}
	}

	return shopCartChampionPubSub.getInstance();
})();
