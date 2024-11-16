<template>
	<div class="content">
		<div class="gameplay-container">
			<div style="width: 100%; flex: 1">
				<!-- 展示玩法配置的 Accordion 手风琴组件 -->
				<Accordion
					v-for="(gameplayItem, index) in mergedGameplayList"
					:key="gameplayItem.id"
					:isExpanded="gameplayItem.actived"
					@change="(status) => clearAccordionStatus(status, index)"
					:title="gameplayItem.gamePlayName"
					style="margin-bottom: 4px"
				>
					<!-- 手风琴内容，仅在激活时渲染 -->
					<template v-if="gameplayItem.actived" #content>
						<div class="gameplay gameplay-description">
							<!-- 使用 v-html 渲染描述内容，支持 HTML 标签如 <br> -->
							<p v-html="gameplayItem.desc"></p>
						</div>

						<!-- 展示每个玩法项 -->
						<AccordionItem
							v-for="(oddsListItem, i) in gameplayItem.oddsList"
							:key="oddsListItem.id"
							:actived="oddsListItem.actived"
							@select="(status) => handleExpanded(status, oddsListItem, gameplayItem, openBet)"
							:title="oddsListItem.title"
							:info="oddsListItem.desc"
							:odds="oddsListItem.itemOdds"
						>
							<template v-if="oddsListItem.type === 'selectBall'" #right>
								<SvgIcon class="select-ball-icon" iconName="lottery/arrow" width="14px" height="24px" />
							</template>
							<!-- 显示选择球组组件，当玩法类型为 'selectBall' 且激活时渲染 -->
							<template v-if="oddsListItem.actived && oddsListItem.type === 'selectBall'" #default>
								<div class="accordion-content-item-balls">
									<SelectBallGroup
										@clear="() => (balls = [])"
										:type="Number(currentGameplayItem.iconType)"
										@select="(data) => handleSelectBalls(data, oddsListItem, gameplayItem, openBet)"
										:multiple="false"
										:renderBallNum="(oddsListItem.ballNum as number)"
										:maxLeng="1"
										:value="balls"
										class="no-bg-img"
									/>
								</div>
							</template>
						</AccordionItem>
					</template>
				</Accordion>
			</div>
		</div>

		<BetForm ref="betFormRef" @submit="handleSubmit" :value="currentGameplayItem" :actived="formActived" :currentOddsListItem="currentOddsListItem" :lotteryDetail="lotteryDetail">
			<template #betContent>
				<div v-if="!isSelectBall">
					<div class="title">{{ currentGameplayItem.gamePlayName }}</div>
					<div class="desc">{{}}</div>
				</div>
				<div v-else>
					<Ball v-for="item in balls" :key="item" :ball-number="item" :type="Number(currentGameplayItem.iconType)" />
					<div class="desc">{{ currentGameplayItem.gamePlayName }}</div>
				</div>
			</template>
		</BetForm>
	</div>
</template>

<script setup lang="ts">
import { gameplayList } from "./playsConfig";
import useBetForm from "/@/views/lottery/components/BetForm/index";
import useAccordion from "/@/views/lottery/components/Tools/Accordion/Index";
import useBall from "/@/views/lottery/components/Tools/Ball/Index";
import { useAccordion as useAccordionHook } from "/@/views/lottery/hooks/useAccordion";
import { useBet, type Props } from "/@/views/lottery/hooks/useBet";
import { useGameplayList } from "/@/views/lottery/hooks/useGameplayList";
// import { SELECT_BALL } from "/@/views/lottery/constant/index";
// import { type OddsListItem } from "/@/views/lottery/types/index";

const props = defineProps({
	lotteryDetail: { type: Object, default: () => ({}) },
});

// 使用各自的组件
const { Accordion, AccordionItem } = useAccordion();
const { Ball, SelectBallGroup } = useBall();
const { BetForm, openBet, closeBet } = useBetForm();

// hooks
const { mergedGameplayList } = useGameplayList(gameplayList);
const { formActived, balls, isSelectBall, clearAccordionStatus, handleSelectBalls, handleExpanded, currentGameplayItem, currentOddsListItem } = useAccordionHook(mergedGameplayList);
const { betFormRef, handleSubmit } = useBet(currentGameplayItem, currentOddsListItem, props as Props, balls, closeBet);

// const closeBetBefore = () => {
// 	mergedGameplayList.value.forEach((v) => {
// 		v.oddsList.forEach((w) => {
// 			if (w.type !== SELECT_BALL) {
// 				w.actived = false;
// 			}
// 		});
// 	});
// };
</script>
