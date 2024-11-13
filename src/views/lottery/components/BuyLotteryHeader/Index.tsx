import { defineComponent } from "vue";
import useTimer from "/@/views/lottery/components/Tools/Timer";
import "./index.scss";
export default () => {
	const BuyLotteryHeader = defineComponent({
		name: "BuyLotteryHeader",
		props: {
			data: {
				type: Object,
				required: true,
			},
		},
		setup(props) {
			const { Timer } = useTimer({ value: props.data });
			return () => (
				<div class="buy-lottery-header">
					<header>
						<img src={props.data.iconH5} alt="" />
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
								<Timer showDesc={true} />
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
