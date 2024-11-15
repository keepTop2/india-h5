import "./index.scss";

import { Popup } from "vant";
import { reactive } from "vue";
import SvgIcon from "/@/components/svgIcon/index.vue";
import { i18n } from "/@/i18n/index";
import { useSportsBetInfoStore } from "/@/store/modules/sports/sportsBetInfo";
import { useUserStore } from "/@/store/modules/user";
import Common from "/@/utils/common";
import BetNumber from "/@/views/venueHome/sports/components/Bet/BetNumber.vue";
import { getIndexInfo } from "/@/views/venueHome/sports/utils/commonFn";

export default () => {
	const $: any = i18n.global;
	const state = reactive({
		showPopup: false,
		stake: "",
	});
	const openBet = () => {
		state.showPopup = true;
	};
	const closeBet = () => {
		state.showPopup = false;
	};

	const Header = defineComponent({
		name: "Header",
		props: {
			icon: { type: String },
			title: { type: String },
		},
		emits: ["close", "getGetBalanceAfter"],
		setup(props, { slots, emit }) {
			const sportsBetInfo = useSportsBetInfoStore();
			const handleGetBalance = async () => {
				// 刷新余额后的回调
				await getIndexInfo();
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
								<img class="icon" src={props.icon || "https://ctopalistat3.zengchenglm.com/pc/images/db_DB5FC2cea4e2f859029cdbda33fffda6ea1f2.png"} alt="" />
								<span class="title">时时彩</span>
							</div>
						)}
					</div>
					<div class="header-right">
						<div class="amount-info" onClick={handleGetBalance}>
							<span class="value">{Common.getInstance().formatAmount(Number(sportsBetInfo.balance))}</span>
							<SvgIcon class="color_Theme" iconName="venueHome/sports/svg/sports_refresh" />
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
		props: { minBet: { type: Number, default: 0 }, maxBet: { type: Number, default: 0 } },
		emits: ["select"],
		setup(props, { emit }) {
			const UserStore = useUserStore();
			return () => (
				<div onClick={() => emit("select")} class="lottery-bet-input">
					<div class="input-content">
						<input
							v-model={state.stake}
							type="number"
							placeholder={`${$.t("sports['限额']")} ${Common.getInstance().formatFloat(props.minBet)} ~ ${Common.getInstance().formatFloat(props.maxBet)}`}
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
			value: { type: Object, default: () => ({}) },
			currentOddsListItem: { type: Object, default: () => ({}) },
		},
		emits: ["before-close", "submit"],
		setup(props, { slots, emit }) {
			const showKeyBoard = ref(true);
			const onkeyPress = (value) => {
				switch (value) {
					// 最大
					case "{max}":
						state.stake = props.data.maxBet;
						break;
					// 最小
					case "{min}":
						state.stake = props.data.minBet;
						break;
					// 删除
					case "{bksp}":
						state.stake = state.stake.slice(0, state.stake.length - 1);
						break;
					// 隐藏键盘
					case "{close}":
						showKeyBoard.value = false;
						break;
					default:
						state.stake += value;
						if (Number(state.stake) > Number(props.data.maxBet || 0)) {
							state.stake = props.data.maxBet;
						}
						if (Number(state.stake) < Number(props.data.minBet) || 0) {
							state.stake = props.data.minBet;
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
						return true;
					}}
					onUpdate:show={(val) => (state.showPopup = val)}
				>
					<Header
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
		openBet,
		closeBet,
	};
};
