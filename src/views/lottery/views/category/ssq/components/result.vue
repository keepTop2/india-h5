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
						<!-- {/* 前六个球为红球 */} -->
						<Ball size="38" :type="2" :ball-number="Number(ball)" v-for="(ball, index) in item.lotteryNum.split(' ').slice(0,6)" :key="ball" />
						<!-- {/* 最后一个球为蓝球 */} -->
						<Ball size="38" :type="1" :ball-number="Number(ball)" v-for="ball in item.lotteryNum.split(' ').slice(6)" :key="ball" />
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

</script>
<style lang="scss" scoped>
.issueNum {
	@include themeify {
		color: themed("T3");
		font-size:24px;
	}
}	
.winnNum {
	display: flex;
	flex-wrap: wrap;
	gap:8px;
}
</style>