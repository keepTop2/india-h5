import "./index.scss";

import BetNumber from "/@/views/venueHome/sports/components/Bet/BetNumber.vue";
import Common from "/@/utils/common";
import { Popup } from "vant";
import SvgIcon from "/@/components/svgIcon/index.vue";
import { getIndexInfo } from "/@/views/venueHome/sports/utils/commonFn";
import { i18n } from "/@/i18n/index";
import { reactive } from "vue";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import { useUserStore } from "/@/store/modules/user";

export default () => {
	const $: any = i18n.global;
	const state = reactive({
		showPopup: false,
		stake: "",
	});
	const openBet = async () => {
		await useUserStore().setIndexInfo();
		// 更新余额
		getIndexInfo();
		state.showPopup = true;
	};
	const clearForm = () => {
		state.stake = "";
	};
	const closeBet = () => {
		state.showPopup = false;
		clearForm();
	};

	const Order = defineComponent({
		name: "Order",
		setup() {
			return () => (
				<div class="shopping-cart-icon" onClick={() => openBet()}>
					<div class="badge">1</div>
					<SvgIcon iconName="venueHome/sports/svg/sport_checklist" size="6.15384" />
				</div>
			);
		},
	});

	const Header = defineComponent({
		name: "Header",
		props: {
			icon: { type: String },
			title: { type: String },
			currentOddsListItem: { type: Object, default: () => ({}) },
			currentGameplayItem: { type: Object, default: () => ({}) },
			lotteryDetail: { type: Object, default: () => ({}) },
		},
		emits: ["close", "getGetBalanceAfter"],
		setup(props, { slots, emit }) {
			const sportsBetInfo = useSportsBetInfoStore();
			const UserStore = useUserStore();
			const rotate = ref(0);
			const handleGetBalance = async () => {
				rotate.value += 360;
				// 刷新余额后的回调
				await UserStore.setIndexInfo();

				emit("getGetBalanceAfter");
			};
			return () => (
				<div class="lottery-bet-form-header">
					<div class="header-left">
						{/* 自定义title */}
						{slots.title ? (
							slots.title()
						) : (
							<div class="title-box">
								<img class="icon" src={props.lotteryDetail.iconPc} alt="" />
								<span class="title">{props.lotteryDetail.gameName}</span>
							</div>
						)}
					</div>
					<div class="header-right">
						<div class="amount-info" onClick={handleGetBalance}>
							<span class="value">{Common.getInstance().formatAmount(Number(sportsBetInfo.balance))}</span>
							<SvgIcon class="color_Theme" style={{ transform: `rotate(${rotate.value}deg)` }} iconName="venueHome/sports/svg/sports_refresh" />
						</div>
						<div class="close">
							<SvgIcon iconName="venueHome/sports/svg/close" onClick={() => emit("close")} />
						</div>
					</div>
				</div>
			);
		},
	});

	const BetInput = defineComponent({
		name: "BetInput",
		props: { minLimit: { type: Number, default: 0 }, maxLimit: { type: Number, default: 0 } },
		emits: ["select"],
		setup(props, { emit }) {
			const UserStore = useUserStore();
			return () => (
				<div onClick={() => emit("select")} class="lottery-bet-input">
					<div class="input-content">
						<input
							v-model={state.stake}
							type="number"
							placeholder={`${$.t("sports['限额']")} ${Common.getInstance().formatFloat(props.minLimit)} ~ ${Common.getInstance().formatFloat(props.maxLimit)}`}
							readonly
						/>
						<div class="unit">{UserStore.userInfo.mainCurrency}</div>
					</div>
				</div>
			);
		},
	});

	const BetForm = defineComponent({
		name: "BetForm",
		props: {
			actived: { type: Boolean, default: false }, // 控制显示投注输入框
			currentGameplayItem: { type: Object, default: () => ({}) },
			currentOddsListItem: { type: Object, default: () => ({}) },
			lotteryDetail: { type: Object, default: () => ({}) },
		},
		emits: ["before-close", "submit"],
		setup(props, { slots, emit }) {
			const showKeyBoard = ref(true);

			const onkeyPress = (value) => {
				switch (value) {
					// 最大
					case "{max}":
						state.stake = props.currentOddsListItem.maxLimit;
						break;
					// 最小
					case "{min}":
						state.stake = props.currentOddsListItem.minLimit;
						break;
					// 删除
					case "{bksp}":
						console.log(state.stake, "state.stake");
						const stake = state.stake + "";
						state.stake = stake.slice(0, stake.length - 1);
						break;
					// 隐藏键盘
					case "{close}":
						showKeyBoard.value = false;
						break;
					default:
						state.stake += value;

						// 控制最大最小数值
						if (Number(state.stake) > Number(props.currentOddsListItem.maxLimit || 0)) {
							state.stake = props.currentOddsListItem.maxLimit;
						}
						if (Number(state.stake) < Number(props.currentOddsListItem.minLimit) || 0) {
							// state.stake = props.currentOddsListItem.minLimit;
						}
				}
			};

			return () => (
				<Popup
					round
					overlay-class="lottery-bet-popup"
					position="bottom"
					show={state.showPopup}
					before-close={() => {
						emit("before-close");
						state.stake = "";
						return true;
					}}
					onUpdate:show={(val) => (state.showPopup = val)}
				>
					<Header
						currentGameplayItem={props.currentGameplayItem}
						lotteryDetail={props.lotteryDetail}
						onClose={() => {
							emit("before-close");
							closeBet();
						}}
					/>
					<div class="line" />
					<div class="bet-content">
						{/* 投注内容插槽 */}
						<div class="content">{slots?.betContent?.()}</div>
						{/* 赔率 */}
						<div class="odds">{props.currentOddsListItem.itemOdds}x</div>
					</div>
					<BetInput
						minLimit={props.currentOddsListItem.minLimit}
						maxLimit={props.currentOddsListItem.maxLimit}
						onSelect={() => {
							showKeyBoard.value = true;
						}}
					/>

					<div class="bet-number-box">
						<BetNumber class={{ hideKeyBoard: !showKeyBoard.value, keyBoard: true }} onOnKeyPress={onkeyPress} />
						<div
							onClick={() => {
								emit("submit", { stake: state.stake });
							}}
							class="now-bet"
						>
							立即投注
						</div>
					</div>
				</Popup>
			);
		},
	});

	return {
		BetForm,
		clearForm,
		Order,
		openBet,
		closeBet,
	};
};
