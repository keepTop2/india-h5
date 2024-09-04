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
			<div class="stats-container color_T1 bg_BG3">
				<div class="stat-item">
					<span class="label">{{ $t('records["投注金额"]') }}：</span>
					<span class="value">99999999</span>
				</div>
				<div class="stat-item">
					<span class="label">{{ $t('records["输赢金额"]') }}：</span>
					<span class="value negative">-99999999</span>
				</div>
				<div class="stat-item">
					<span class="label">{{ $t('records["投注笔数"]') }}：</span>
					<span class="value">999999</span>
				</div>
			</div>
			<Sports />
			<Chuanguan :list="matches" />
			<Qipai />
			<Zhenren />
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * @description 投注记录
 */
import { TimeShortcutOptionsEnum } from "/@/enum/componentsEnum";
import VantNavBar from "/@/components/vant/VantNavBar.vue";
import pubsub from "/@/pubSub/pubSub";
import Sports from "./components/Tiyu.vue";
import Chuanguan from "./components/Chuanguan.vue";
import Qipai from "./components/Qipai.vue";
import Zhenren from "./components/Zhenren.vue";
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

/**
 * @description: 复制单号
 * @return {*}
 */
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
	padding-bottom: 160px;
	@include themeify {
		.label {
			color: themed("T1");
		}
		.Settled {
			color: themed("Wam-P1");
		}
		.win {
			color: themed("Wam-P1");
		}

		.lose {
			color: themed("Warn");
		}
		.PendingSettlement {
			color: themed("Hint");
		}
		.BettingRecord_Top {
			display: flex;
			gap: 12px;
			padding: 24px;
		}
		.BettingRecord_List {
			padding: 0 24px;
			.stats-container {
				padding: 24px;
				margin-bottom: 24px;
				border-radius: 12px;
				font-family: "PingFang SC";
				font-size: 26px;
				display: flex;
				flex-direction: column;
				flex-direction: row;
				// gap: 3.2vw;
				flex-wrap: wrap;
				gap: 10px;

				.stat-item {
					// display: flex;
					// align-items: center;
					width: 320px;
					.label {
						flex-shrink: 0;
					}

					.value {
						font-weight: 400;

						&.negative {
							color: themed("Warn");
						}
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
