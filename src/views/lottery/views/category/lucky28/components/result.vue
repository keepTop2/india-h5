<template>
	<div class="lottery-result">
		<div class="result-header">
			<span>期号</span>
			<span>中奖号码</span>
		</div>
		<div class="result-content">
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="result-content-item" v-for="item in tableData" :key="item.id">
					<div class="issue-num">{{ item.issueNum }}</div>
					<div class="win-num">
						<Ball size="30px" :type="3" :ball-number="ball" v-for="ball in formatLotteryNum(item.lotteryNum)" :key="ball" />
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { chunk, sum } from "lodash";
import { useRoute } from "vue-router";
import { lotteryApi } from "/@/api/lottery";
import { useUserStore } from "/@/store/modules/user";
import useBall from "/@/views/lottery/components/Tools/Ball/Index";
import { DEFAULT_LANG, langMaps } from "/@/views/lottery/constant/index";
import { useInfiniteScroll } from "/@/views/lottery/hooks/useInfiniteScroll";
import { useLoginGame } from "/@/views/lottery/stores/loginGameStore";

interface TableDataItem {
	endTime: number;
	gameCode: string;
	gameName: string;
	id: string;
	issueNum: string;
	lotteryNum: string;
	startTime: number;
	state: number;
}

interface SubmitData {
	gameCode: string;
	lang: string;
	operatorId: string;
	lotteryTimeSort: number;
	page: number;
	size: number;
}

const { Ball } = useBall();
const userStore = useUserStore();
const route = useRoute();
const { merchantInfo } = useLoginGame();
const { tableData, pagination, loading, finished, issueHistory: onLoad } = useInfiniteScroll<TableDataItem, SubmitData>(lotteryApi.issueHistory, getSubmitData);

// 这个函数是准备入参用的
function getSubmitData() {
	const language = userStore.getLang;
	const lang = (langMaps as any)[language] || DEFAULT_LANG;
	const { merchantNo: operatorId } = merchantInfo.value;
	const { gameCode = "" } = route.query;
	const { page, size } = pagination;
	const submitData = { operatorId, gameCode, lotteryTimeSort: 0, page, size, lang };
	return submitData;
}

// 幸运28每一期开奖是 20 个号码，1～6 位开奖号码之和尾数作为第一位号码，7～12 位开奖号码之和尾数作为第二位号码，取 13～18 位开奖号码之和尾数作为第三位号码。三个号码相加之和为特码（特码展示完整号码。）
// 第19位、第 20位这个俩号码不取值。
// 例如 "02 04 09 16 18 25 29 30 33 36 39 46 47 49 56 61 66 67 73 79" 返回 [4, 3, 6, 13]
function formatLotteryNum(lotteryNum = "") {
	const numberArray = lotteryNum
		.split(" ")
		.filter(Boolean)
		.map((v) => +v);
	const resultArray = chunk(numberArray, 6)
		.slice(0, 3)
		.map((v) => sum(v) % 10);
	const renderArray = [...resultArray, sum(resultArray)];
	return renderArray;
}
</script>
