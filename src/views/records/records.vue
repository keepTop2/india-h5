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
					:toText="'value'"
					:toValue="'code'"
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
					:toText="'value'"
					:toValue="'code'"
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
				<!--				<div class="stats-container color_T1 bg_BG3">-->
				<!--					<div class="stat-item">-->
				<!--						<span class="label">{{ $t('records["投注金额"]') }}：</span>-->
				<!--						<span class="value">{{ orderRecordsData.totalVO.betAmount }}</span>-->
				<!--					</div>-->
				<!--					<div class="stat-item">-->
				<!--						<span class="label">{{ $t('records["输赢金额"]') }}：</span>-->
				<!--						<span class="value negative">{{ orderRecordsData.totalVO.winLoseAmount }}</span>-->
				<!--					</div>-->
				<!--					<div class="stat-item">-->
				<!--						<span class="label">{{ $t('records["投注笔数"]') }}：</span>-->
				<!--						<span class="value">{{ orderRecordsData.totalVO.betNum }}</span>-->
				<!--					</div>-->
				<!--				</div>-->
				<van-list v-if="hasData" v-model:loading="loading" :finished="finished" @load="onLoad">
					<van-pull-refresh v-model="loading" @refresh="getList">
						<Sports v-for="(item, index) in orderRecordsData.sabOrderList" :key="index" :item="item" />
						<Chuanguan v-for="(item, index) in orderRecordsData.eventOrderPage?.records" :key="index" :item="item" />
						<Qipai v-for="(item, index) in orderRecordsData.basicOrderPage?.records" :key="index" :item="item" />
						<Zhenren v-for="(item, index) in orderRecordsData.tableOrderPage?.records" :key="index" :item="item" />
						<!-- <Dianzi /> -->
					</van-pull-refresh>
				</van-list>

				<NoData v-else info="暂无投注记录" />

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
// 接口
import sportsApi from "/@/api/venueHome/sports";
import { onActivated } from "vue";
import { ClientOrderRecordRes } from "./type";
import { showToast } from "vant";
import NoData from "/@/views/subViews/my/messageCenter/components/noData.vue";

onActivated(() => {
	console.log("进入页面执行");
	pageVo.pageNumber = 1;
	getDownBox();
	getList();
});
const loading = ref(false);
const orderRecordsData = ref<ClientOrderRecordRes>({
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
const state = reactive({
	showPicker: false,
	//条件查询选项
	typeList: [],
	//激活的选项
	activeList: "1",
	showPicker2: false,
	//条件查询选项
	typeList2: [],
	//激活的选项
	activeList2: "3",
});
const getList = () => {
	loading.value = true;
	const data = {
		...pageVo,
		venueType: +state.activeList2,
    orderclass: [+state.activeList],
		betStartTime: dateRangeSelectDemoState.startTime,
		betEndTime: dateRangeSelectDemoState.endTime,
	};
	sportsApi
		.getBettingRecordList(data)
		.then((res) => {
			console.log(res, "res");
			if (res.code !== 10000) return showToast(res.message);
			orderRecordsData.value = res.data;
		})
		.catch((err) => {
			console.log(err, "errrrrrrrrrrr");
		})
		.finally(() => {
			loading.value = false;
		});
};
const getDownBox = () => {
	const params = ["order_status_client", "order_date_num", "venue_type"];
	sportsApi
		.requestGetTypeList(params)
		.then((res) => {
			console.log(res, "res");
			if (res.code !== 10000) return showToast(res.message);
			state.typeList = res.data.order_status_client;
			state.typeList2 = res.data.venue_type;
			console.log(res.data, "res.data");
		})
		.catch((err) => {
			console.log(err, "errrrrrrrrrrr");
		});
};
const finished = ref(true);
const pageVo = reactive({
	pageNumber: 1,
	pageSize: 100,
});
const onLoad = () => {
	getList();
	pageVo.pageNumber++;
};

const onClickLeft = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};

const onTypeConfrim = (data) => {
	console.log(data, "data");
	getList();
};
const dateRangeSelectDemoState = reactive({
	timeShortcutOptionsValue: TimeShortcutOptionsEnum.d1,
	startTime: 0,
	endTime: 0,
});

const hasData = computed(() => {
	return (
		orderRecordsData.value.sabOrderList?.length > 0 ||
		orderRecordsData.value.eventOrderPage?.records?.length > 0 ||
		orderRecordsData.value.basicOrderPage?.records?.length > 0 ||
		orderRecordsData.value.tableOrderPage?.records?.length > 0
	);
});
//日期时间选择器组件点击确认
const onConfirmDate = () => {
	console.log(dateRangeSelectDemoState.startTime, dateRangeSelectDemoState.endTime, "点击确认");

	getList();
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
