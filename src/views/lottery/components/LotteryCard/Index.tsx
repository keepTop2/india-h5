import { useUserStore } from "/@/store/modules/user"; // 引入用户信息 store
import Common from "/@/utils/common";
import useTimer from "/@/views/lottery/components/Tools/Timer";
import { defineComponent } from "vue";
import SvgIcon from "/@/components/svgIcon/index.vue";
import "./index.scss";
export default ({ onSelect }) => {
	// 获取用户信息 store
	const {
		userInfo: { currencySymbol },
	} = useUserStore();

	// 定义卡片头部组件
	const Header = defineComponent({
		props: {
			icon: { type: String },
			seconds: { type: Number, required: true },
		},
		setup(props) {
			const { ClockTime } = useTimer({ value: props });
			return () => (
				<div class="hot-card-header">
					{/* 左侧图片 */}
					<div class="left">
						<img src={props.icon || "/@/assets/zh-CN/default/lottery/national.png"} alt="Header Image" />
					</div>
					{/* 右侧倒计时 */}
					<div class="right">
						<ClockTime />
					</div>
				</div>
			);
		},
	});

	// 定义卡片内容组件，可以根据需要传入 props 以便更灵活的显示不同内容
	const Content = defineComponent({
		props: {
			icon: { type: String },
			iconH5: { type: String },
			gameName: { type: String, required: true },
			gameDesc: { type: String, required: true },
		},
		setup(props, { slots }) {
			return () => (
				<div class="card-content">
					<div class="content">
						{/* 左侧内容区域 */}
						<div class="left">
							<img src={props.iconH5} alt="Content Image" />
						</div>
						{/* 右侧类型名称和标题 */}
						<div class="right">
							<div class="title-box">
								<div class="type-name-box">
									{/* 国旗 */}
									{slots?.nationalIcon?.()}
									<span class="type-name">{props.gameName || "-"}</span>
								</div>
								<span class="title">{props.gameDesc || "-"}</span>
							</div>
						</div>
					</div>
					{/* 时间 */}
					{slots.timer?.()}
					<div class="right">
						{/* 最近获奖 */}
						{slots.maxWin?.()}
						<div class="more">
							<SvgIcon onClick={() => onSelect(props)} size="5" iconName="lottery/arrow" />
						</div>
					</div>
				</div>
			);
		},
	});

	// 定义卡片底部组件
	const Footer = defineComponent({
		props: {
			maxWin: { type: Number, required: true },
		},
		setup(props) {
			return () => (
				<div class="card-footer">
					<div class="left">
						<span>最高奖</span>
					</div>
					<div class="right">
						<span>
							{currencySymbol}&nbsp;
							{Common.thousands(props.maxWin)}
						</span>
					</div>
				</div>
			);
		},
	});
	const HotLotteryCard = defineComponent({
		name: "HotLotteryCard",
		emits: ["select"],
		props: {
			data: { type: Object, required: true },
		},
		setup(props, { emit }) {
			return () => (
				<div class="lottery-card hot-lottery-card">
					{/* 卡片头部 */}
					<Header {...props.data} />
					<div class="line" />
					{/* 卡片内容 */}
					<Content {...props.data} />
					{/* 卡片底部 */}
					<Footer {...props.data} />
				</div>
			);
		},
	});

	const LotteryCard = defineComponent({
		name: "LotteryCard",
		props: {
			data: { type: Object, required: true },
		},
		emits: ["select"],
		setup(props) {
			const { ClockTime } = useTimer({ value: props.data });
			return () => (
				<div class="lottery-card lottery-card-item">
					{/* 卡片内容 */}
					<Content {...props.data}>
						{{
							nationalIcon: () => <img src={props.data?.icon || "/@/assets/zh-CN/default/lottery/national.png"} alt="Header Image" />,
							timer: () => <ClockTime />,
							maxWin: () => <Footer {...props.data} />,
						}}
					</Content>
				</div>
			);
		},
	});

	return {
		HotLotteryCard,
		LotteryCard,
	};
};
