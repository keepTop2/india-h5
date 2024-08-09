<!-- 单项选择器使用示例demo -->
<template>
	<VantNavBar :title="$t(`VantNavBar['投注订单']`)" @onClickLeft="onClickLeft">
		<template v-slot:left>
			<SvgIcon size="8.53" class="collapse_icon" iconName="common/collapse_icon" />
		</template>
	</VantNavBar>
	<div class="BettingRecord">
		<div class="BettingRecord_Top">
			<!--使用插槽-->
			<SingleSelect
				class="color_T1 fs_28 fw_400"
				:toText="'webName'"
				:toValue="'javaName'"
				v-model:show="state.showPicker2"
				v-model:select="state.activeList2"
				:columns="state.typeList2"
				:title="''"
				@confirm="onTypeConfrim"
			>
				<!--外部触发插槽-->
				<template v-slot:active-name="{ activeName }">
					<div class="bettingSelect">
						{{ activeName }}
						<SvgIcon iconName="common/arrowDown" />
					</div>
				</template>
			</SingleSelect>
			<!--使用插槽-->
			<SingleSelect
				class="color_T1 fs_28 fw_400"
				:toText="'webName'"
				:toValue="'javaName'"
				v-model:show="state.showPicker"
				v-model:select="state.activeList"
				:columns="state.typeList"
				:title="''"
				@confirm="onTypeConfrim"
			>
				<!--外部触发插槽-->
				<template v-slot:active-name="{ activeName }">
					<div class="bettingSelect">
						{{ activeName }}
						<SvgIcon iconName="common/arrowDown" />
					</div>
				</template>
			</SingleSelect>
			<DateRangeSelect
				v-model:select="dateRangeSelectDemoState.timeShortcutOptionsValue"
				v-model:start-time-u="dateRangeSelectDemoState.startTime"
				v-model:end-time-u="dateRangeSelectDemoState.endTime"
				@on-confirm-date="onConfirmDate"
			/>
		</div>
		<div class="BettingRecord_List">
			<div class="stats-container">
				<div class="stat-item">
					<span class="label">投注金额：</span>
					<span class="value">99999999999.00</span>
				</div>
				<div class="stat-item">
					<span class="label">输赢金额：</span>
					<span class="value negative">-999999999999.00</span>
				</div>
				<div class="stat-item">
					<span class="label">投注笔数：</span>
					<span class="value">999999</span>
				</div>
			</div>
			<div class="bet-detail">
				<div class="header">
					<div class="match-info">
						<!-- <img src="path/to/flag.png" alt="flag" class="flag" /> -->
						<span class="match-type">国际 | 2024 欧洲杯 卡塔尔世界杯</span>
					</div>
					<span class="status">已结算</span>
				</div>
				<div class="teams">
					<span>荷兰 VS 英格兰</span>
				</div>
				<div class="order-info">
					<div class="order-number">
						<span>单号：</span>
						<span>2103102391230123</span>
						<!-- <button @click="copyOrderNumber">📋</button> -->
					</div>
					<div class="order-date">
						<span>2024-07-18 16:42:08</span>
					</div>
				</div>
				<div class="bet-info">
					<div class="bet-item">
						<span class="label">投注内容：</span>
						<span class="value">荷兰 全场独赢 2.98</span>
					</div>
					<div class="bet-item">
						<span class="label">投注金额：</span>
						<span class="value">999999.00</span>
					</div>
					<div class="bet-item">
						<span class="label">输赢金额：</span>
						<span class="value negative">-999999999.00</span>
					</div>
				</div>
			</div>
			<div class="bet-detail2">
				<div class="header">
					<span class="bet-type">串关 | 3串1 @5.98</span>
					<span class="status">已结算</span>
				</div>
				<div class="order-info">
					<div class="order-number">
						<span>单号：</span>
						<span>2103102391230123</span>
						<!-- <button @click="copyOrderNumber">📋</button> -->
					</div>
					<div class="order-date">
						<span>2024-07-18 16:42:08</span>
					</div>
				</div>
				<div class="bet-amount">
					<span>投注金额：</span>
					<span>999999.00</span>
				</div>
				<div class="match-details" v-for="(match, index) in matches" :key="index">
					<div class="match-info">
						<span>2024 欧洲杯 卡塔尔世界杯</span>
						<span>{{ match.teams }}</span>
						<span>{{ match.betContent }}</span>
					</div>
					<div class="match-result" :class="{ win: match.result === '赢', lose: match.result === '输' }">
						<span>{{ match.result }}</span>
						<span>@{{ match.odds }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";
import VantNavBar from "/@/components/vant/VantNavBar.vue";
import pubsub from "/@/pubSub/pubSub";

const onClickLeft = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};
const state = reactive({
	showPicker: false,
	//条件查询选项
	typeList: [
		{
			javaName: "1",
			webName: "存款金额",
		},
		{
			javaName: "2",
			webName: "提款金额",
		},
		{
			javaName: "3",
			webName: "总输赢",
		},
		{
			javaName: "4",
			webName: "总输赢4",
		},
		{
			javaName: "5",
			webName: "总输赢5",
		},
	],
	//激活的选项
	activeList: "3",
	showPicker2: false,
	//条件查询选项
	typeList2: [
		{
			javaName: "1",
			webName: "存款金额",
		},
		{
			javaName: "2",
			webName: "提款金额",
		},
		{
			javaName: "3",
			webName: "总输赢",
		},
		{
			javaName: "4",
			webName: "总输赢4",
		},
		{
			javaName: "5",
			webName: "总输赢5",
		},
	],
	//激活的选项
	activeList2: "3",
});

const onTypeConfrim = (data) => {
	console.log(data);
};
const dateRangeSelectDemoState = reactive({
	timeShortcutOptionsValue: TimeShortcutOptionsEnum.d1,
	startTime: 0,
	endTime: 0,
});

const matches = ref([
	{ teams: "荷兰 VS 英格兰", betContent: "荷兰全场独赢", result: "赢", odds: "2.98" },
	{ teams: "荷兰 VS 英格兰", betContent: "荷兰全场独赢", result: "输", odds: "2.98" },
	{ teams: "荷兰 VS 英格兰", betContent: "荷兰全场独赢", result: "-", odds: "2.98" },
]);

const copyOrderNumber = () => {
	navigator.clipboard.writeText("2103102391230123").then(() => {
		alert("单号已复制");
	});
};

//日期时间选择器组件点击确认
const onConfirmDate = () => {
	console.log(dateRangeSelectDemoState.startTime, dateRangeSelectDemoState.endTime, "点击确认");
};
</script>

<style lang="scss" scoped>
.BettingRecord {
	.BettingRecord_Top {
		display: flex;
		gap: 12px;
		padding: 24px;
	}
	.BettingRecord_List {
		.stats-container {
			background-color: #333;
			padding: 16px;
			border-radius: 8px;
			color: #fff;
			font-family: Arial, sans-serif;
			font-size: 16px;
			display: flex;
			flex-direction: column;
			gap: 8px;

			.stat-item {
				display: flex;
				align-items: center;

				.label {
					flex-shrink: 0;
					color: #bbb;
					margin-right: 8px;
				}

				.value {
					font-weight: bold;

					&.negative {
						color: #ff4d4f;
					}
				}
			}
		}
		.bet-detail {
			background-color: #333;
			padding: 16px;
			border-radius: 8px;
			color: #fff;
			font-family: Arial, sans-serif;
			font-size: 14px;
			line-height: 1.6;

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.match-info {
					display: flex;
					align-items: center;

					.flag {
						width: 20px;
						height: 20px;
						margin-right: 8px;
					}

					.match-type {
						color: #ccc;
					}
				}

				.status {
					color: #52c41a;
				}
			}

			.teams {
				font-weight: bold;
				margin-bottom: 8px;
			}

			.order-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.order-number {
					display: flex;
					align-items: center;

					button {
						background: none;
						border: none;
						color: #aaa;
						cursor: pointer;
						margin-left: 8px;

						&:hover {
							color: #fff;
						}
					}
				}

				.order-date {
					color: #aaa;
				}
			}

			.bet-info {
				.bet-item {
					display: flex;
					justify-content: space-between;
					margin-bottom: 4px;

					.label {
						color: #bbb;
					}

					.value {
						font-weight: bold;

						&.negative {
							color: #ff4d4f;
						}
					}
				}
			}
		}
		.bet-detail2 {
			background-color: #333;
			padding: 16px;
			border-radius: 8px;
			color: #fff;
			font-family: Arial, sans-serif;
			font-size: 14px;
			line-height: 1.6;

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.bet-type {
					color: #ccc;
				}

				.status {
					color: #52c41a;
				}
			}

			.order-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.order-number {
					display: flex;
					align-items: center;

					button {
						background: none;
						border: none;
						color: #aaa;
						cursor: pointer;
						margin-left: 8px;

						&:hover {
							color: #fff;
						}
					}
				}

				.order-date {
					color: #aaa;
				}
			}

			.bet-amount {
				margin-bottom: 8px;
			}

			.match-details {
				margin-bottom: 8px;
				padding-bottom: 8px;
				border-bottom: 1px solid #444;

				.match-info {
					margin-bottom: 4px;
				}

				.match-result {
					display: flex;
					justify-content: space-between;

					&.win {
						color: #52c41a;
					}

					&.lose {
						color: #ff4d4f;
					}
				}
			}
		}
	}
}

.bettingSelect {
	width: 226px;
	height: 80px;
	box-sizing: border-box;
	display: inline-flex;
	// padding: 20px 24px 20px 24px;
	align-items: center;
	// gap: 98px;
	justify-content: space-around;
	border-radius: 12px;
	@include themeify {
		border: 1px solid themed("Line");
	}
	svg {
		width: 24px;
		height: 24px;
	}
}
</style>
