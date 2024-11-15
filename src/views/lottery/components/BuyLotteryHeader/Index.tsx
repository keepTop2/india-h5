import "./index.scss";

import { defineComponent } from "vue";
import useTimer from "/@/views/lottery/components/Tools/Timer";

export default () => {
	const BuyLotteryHeader = defineComponent({
		name: "BuyLotteryHeader",
		props: {
			data: { type: Object, required: true, default: () => ({}) },
			timerEndCallback: { type: Function, default: Function.prototype },
		},
		setup(props) {
			const propsData = computed(() => props.data);

			const { Timer } = useTimer(propsData, props.timerEndCallback);
			return () => (
				<div class="buy-lottery-header">
					<header>
						<img src={props.data.iconPc} alt="" />
						<span class="gameName">{props.data.gameName}</span>
					</header>

					<div class="content">
						<div class="content-item">
							<div class="label">当期期号</div>
							<div class="value">{props.data.issueNum}</div>
						</div>
						<div class="content-item">
							<div class="label">下一期开奖</div>
							<div class="value">
								<Timer showDesc={true} data={props.data} />
							</div>
						</div>

						<div class="footer">
							<div class="left">
								<img src="/@/assets/zh-CN/default/lottery/caijin.png" alt="" /> <span class="label">最近获奖</span>
							</div>
							<div class="right">
								<span class="value">{props.data.maxWin}</span>
							</div>
						</div>
					</div>
				</div>
			);
		},
	});

	return {
		BuyLotteryHeader,
	};
};
