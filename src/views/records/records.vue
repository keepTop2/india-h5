<!-- 单项选择器使用示例demo -->
<template>
	<div>
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
						<span class="value">{{ orderRecordsData.totalVO.betAmount }}</span>
					</div>
					<div class="stat-item">
						<span class="label">{{ $t('records["输赢金额"]') }}：</span>
						<span class="value negative">{{ orderRecordsData.totalVO.winLoseAmount }}</span>
					</div>
					<div class="stat-item">
						<span class="label">{{ $t('records["投注笔数"]') }}：</span>
						<span class="value">{{ orderRecordsData.totalVO.betNum }}</span>
					</div>
				</div>

				<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
					<Sports v-for="(item, index) in orderRecordsData.sabOrderList" :key="index" :item="item" />
					<Chuanguan v-for="(item, index) in orderRecordsData.eventOrderPage.records" :key="index" :item="item" />
					<Qipai v-for="(item, index) in orderRecordsData.basicOrderPage" :key="index" :item="item" />
					<Zhenren v-for="(item, index) in orderRecordsData.tableOrderPage" :key="index" :item="item" />
					<!-- <Dianzi /> -->
				</van-list>

				<!-- <Sports />
				<Chuanguan :list="matches" />
				<Qipai />
				<Zhenren />
				<Dianzi /> -->
			</div>
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
import Dianzi from "./components/Dianzi.vue";
// 接口
import sportsApi from "/@/api/venueHome/sports";
import { onActivated } from "vue";
import { ClientOrderRecordRes } from "./type";
import { showToast } from "vant";

onActivated(() => {
	console.log("进入页面执行");
	pageVo.pageNumber = 1;
	getList();
});
const orderRecordsData = reactive<ClientOrderRecordRes>({
	basicOrderPage: {},
	tableOrderPage: {},
	sabOrderList: {},
	eventOrderPage: {},
	totalVO: {
		betAmount: 0,
		winLoseAmount: 0,
		betNum: 0,
	},
} as ClientOrderRecordRes);
const getList = () => {
	const data = {
		...pageVo,
		venueType: state.activeList,
		betStartTime: dateRangeSelectDemoState.startTime,
		betEndTime: dateRangeSelectDemoState.endTime,
	};
	sportsApi
		.getBettingRecordList(data)
		.then((res) => {
			console.log(res, "res+++++++++++++");
		})
		.catch((err) => {
			console.log(err, "errrrrrrrrrrr");
		});
};
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
	console.log("加载");
	pageVo.pageNumber++;
	getList();
};

const onClickLeft = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};

const pageVo = reactive({
	pageNumber: 1,
	pageSize: 100,
});
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
	activeList: "1",
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
	{ team1: "荷兰", team2: "英格兰", betContent: "荷兰全场独赢", result: "赢", odds: "2.98" },
	{ team1: "ColorasddColorasddColorasdd", team2: "BetContentbetContent", betContent: "荷兰全场独赢", result: "输", odds: "2.98" },
	{ team1: "荷兰", team2: "英格兰", betContent: "荷兰全场独赢", result: "-", odds: "2.98" },
]);

/**
 * @description: 复制单号
 * @return {*}
 */
const copyOrderNumber = () => {
	navigator.clipboard.writeText("2103102391230123").then(() => {
		showToast("复制成功");
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
				gap: 24px;

				.stat-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
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
		background-color: themed("BG3");
	}
	svg {
		width: 24px;
		height: 24px;
	}
}
</style>
