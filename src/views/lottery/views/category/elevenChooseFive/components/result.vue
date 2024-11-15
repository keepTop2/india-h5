<template>
	<div class="lottery-result">
		<div class="result-header">
			<span>期号</span>
			<span>中奖号码</span>
		</div>
		<div class="result-content">
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="result-content-item" v-for="item in tableData" :key="item.id">
					<div class="issueNum">{{ item.issueNum }}</div>
					<div class="winnNum">
						<Ball size="30px" :type="3" :ball-number="ball" v-for="ball in formatLotteryNum(item.lotteryNum)" :key="ball" />
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script lang="ts" setup>
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

function formatLotteryNum(lotteryNum = "") {
	return lotteryNum.split(" ").map((v) => +v);
}
</script>
