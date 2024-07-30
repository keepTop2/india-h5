import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import Common from "/@/utils/common";
export default (function () {
	class shopCartPubSub {
		// 单例实例变量
		private static instance: shopCartPubSub;
		// 私有构造函数，确保单例模式
		private constructor() {
			// 初始化视图数据实体
			this.betValueState = reactive({
				// 键盘状态
				betNumberShow: true,
				// 串关键盘状态
				betParlayTicketsNumberShow: false,
				// 串关选择输入索引
				inputActive: "",
				singleTicketBetValue: "",
				singleTicketWinningAmount: 0,
			});
		}
		public betValueState;

		// 获取单例实例的静态方法
		public static getInstance(): shopCartPubSub {
			if (!shopCartPubSub.instance) {
				// 如果实例不存在，则创建
				shopCartPubSub.instance = new shopCartPubSub();
			}
			// 返回单例实例
			return shopCartPubSub.instance;
		}

		//设置单关投注金额
		public setSingleTicketBetValue(value) {
			const sportsBetInfo = useSportsBetInfoStore();
			const { singleTicketBetValue } = this.betValueState;
			const balance = Number(sportsBetInfo.balance);
			const { maxBet, minBet } = sportsBetInfo.singleTicketInfo;
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

		//设置串关投注金额
		public setParlayTicketsBetValue(value) {
			const sportsBetInfo = useSportsBetInfoStore();
			const { inputActive } = this.betValueState;
			const activeObj = sportsBetInfo.parlayTicketsInfo.combos.find((v) => v.comboType === inputActive);
			const balance = Math.floor(Number(sportsBetInfo.balance));
			const maxBet = Math.floor(Number(activeObj.maxBet));

			if (this.betValueState.inputActive === "") {
				return;
			}
			if (value === "{close}") {
				this.betValueState.betParlayTicketsNumberShow = false;
				return;
			} else if (value === "{bksp}") {
				if (balance < 0 && this.betValueState[inputActive]) {
					this.betValueState[inputActive] = this.betValueState[inputActive].slice(0, -1);
					return;
				}
			} else {
				if (balance < 0) {
					this.betValueState[inputActive] = "0";
					return;
				}
			}
			if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "000"].includes(value)) {
				if ((this.betValueState[inputActive] === "" || this.betValueState[inputActive] === "0") && (value === "0" || value === "00" || value === "000")) {
					this.betValueState[inputActive] = "0";
				} else {
					if (!this.betValueState[inputActive]) {
						this.betValueState[inputActive] = value;
					} else {
						this.betValueState[inputActive] += value;
					}
				}
			} else if (value === "{100}") {
				this.betValueState[inputActive] = "100";
			} else if (value === "{200}") {
				this.betValueState[inputActive] = "200";
			} else if (value === "{500}") {
				this.betValueState[inputActive] = "500";
			} else if (value === "{1000}") {
				this.betValueState[inputActive] = "1000";
			} else if (value === "{max}") {
				this.betValueState[inputActive] = activeObj.maxBet.toString();
			} else if (value === "{min}") {
				this.betValueState[inputActive] = activeObj.minBet.toString();
			} else if (value === "{bksp}") {
				if (this.betValueState[inputActive]) {
					this.betValueState[inputActive] = this.betValueState[inputActive].slice(0, -1);
				}
			} else {
				this.betValueState[inputActive] = value;
			}
			if (balance < 0) {
				this.betValueState.singleTicketBetValue == "0";
			} else {
				if (balance < maxBet) {
					if (this.betValueState[inputActive] > balance) {
						this.betValueState[inputActive] = balance.toString();
					}
				} else {
					if (this.betValueState[inputActive] > maxBet) {
						this.betValueState[inputActive] = maxBet.toString();
					}
					this.getParlayTicketsWinningAmount();
				}
			}
		}

		// 读取单关投注金额
		public getSingleTicketBetValue() {
			const sportsBetInfo = useSportsBetInfoStore();
			const balance = Math.floor(Number(sportsBetInfo.balance));
			const maxBet = Math.floor(Number(sportsBetInfo.singleTicketInfo.maxBet));
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

		// 设置串关key
		public setParlayTicketsKey(item) {
			this.betValueState.inputActive = item.comboType;
		}

		// 获取串关高亮标识
		public getParlayTicketsActive() {
			return this.betValueState.inputActive;
		}

		// 获取单关键盘显示状态
		public getBetNumberShow() {
			return this.betValueState.betNumberShow;
		}

		// 改变单关键盘显示状态
		public setBetNumberShow() {
			this.betValueState.betNumberShow = true;
		}

		// 获取单关键盘显示状态
		public getParlayTicketsBetNumberShow() {
			return this.betValueState.betParlayTicketsNumberShow;
		}

		// 改变单关键盘显示状态
		public setParlayTicketsBetNumberShow() {
			this.betValueState.betParlayTicketsNumberShow = true;
		}

		// 单关赔率变化计算
		public decimalPrice(item) {
			const amount = Common.getInstance().mul(item.betMarketInfo.decimalPrice, this.betValueState.singleTicketBetValue);
			this.betValueState.singleTicketWinningAmount = Common.getInstance().sub(amount, this.betValueState.singleTicketBetValue);
			return item.betMarketInfo.decimalPrice;
		}

		// 单关动态计算额度
		public getSingleTicketWinningAmount() {
			return Common.getInstance().formatFloat(this.betValueState.singleTicketWinningAmount);
		}

		// 串关动态计算可赢额度
		public getParlayTicketsWinningAmount() {
			const sportsBetInfo = useSportsBetInfoStore();
			let totalValue = 0;
			if (Array.isArray(sportsBetInfo.parlayTicketsInfo?.combos)) {
				totalValue = sportsBetInfo.parlayTicketsInfo?.combos.reduce((total, obj) => {
					// 计算小计
					const amount = Common.getInstance().mul(obj.payoutRate, parseFloat(this.betValueState[obj.comboType]));
					const stake = Common.getInstance().mul(obj.betCount, parseFloat(this.betValueState[obj.comboType]));
					const value = isNaN(stake) ? 0 : Common.getInstance().sub(amount, stake);
					return total + value;
				}, 0);
			}
			return Common.getInstance().formatFloat(totalValue);
		}

		// 初始化
		public initializeState() {
			this.betValueState.betNumberShow = true;
			this.betValueState.betParlayTicketsNumberShow = false;
			this.betValueState.inputActive = "";
			this.betValueState.singleTicketBetValue = "";
			this.betValueState.singleTicketWinningAmount = 0;
			const sportsBetInfo = useSportsBetInfoStore();
			if (sportsBetInfo.parlayTicketsInfo.combos) {
				sportsBetInfo.parlayTicketsInfo.combos.forEach((v) => {
					if (this.betValueState[v.comboType]) {
						this.betValueState[v.comboType] = "";
					}
				});
			}
		}
	}

	return shopCartPubSub.getInstance();
})();
