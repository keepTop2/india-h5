<template>
	<div class="content">
		<div class="gameplay-container">
			<div style="width: 100%; flex: 1">
				<!-- 展示玩法配置的 Accordion 手风琴组件 -->
				<Accordion
					v-for="(item, index) in gamePlayConfig"
					:key="item.id"
					:isExpanded="item.actived"
					@change="(status) => clearAccordionStatus(status, index)"
					:title="item.gamePlayName"
					style="margin-bottom: 4px"
				>
					<!-- 手风琴内容，仅在激活时渲染 -->
					<template v-if="item.actived" #content>
						<div class="gameplay gameplay-description">
							<!-- 使用 v-html 渲染描述内容，支持 HTML 标签如 <br> -->
							<p v-html="item.desc"></p>
						</div>

						<!-- 展示每个玩法项 -->
						<AccordionItem
							v-for="(plays, i) in item.playMethods"
							:key="plays.id"
							:actived="plays.actived"
							@select="(status) => handleExpanded(status, plays, item)"
							:title="plays.title"
							:info="plays.desc"
							:odds="plays.odds"
						>
							<template v-if="plays.type === 'selectBall'" #right>
								<SvgIcon class="select-ball-icon" iconName="lottery/arrow" width="14px" height="24px" />
							</template>
							<!-- 显示选择球组组件，当玩法类型为 'selectBall' 且激活时渲染 -->
							<template v-if="plays.actived && plays.type === 'selectBall'" #default>
								<div class="accordion-content-item-balls">
									<SelectBallGroup
										@clear="() => (balls = [])"
										:type="3"
										@select="(data) => handleSelectBalls(data, plays, item)"
										:multiple="false"
										:renderBallNum="plays.ballNum"
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

		<BetForm @before-close="closeBetBefore" @submit="handleSubmit" :data="gameInfo">
			<template #betContent>
				<div v-if="!isSelectBall">
					<div class="title">{{ gameInfo.gamePlayName }}</div>
					<div class="desc">{{ gameInfo.playMethod.title }}</div>
				</div>
				<div v-else>
					<Ball v-for="item in balls" :key="item" :ball-number="item" :type="3" />
					<div class="desc">{{ gameInfo.gamePlayName }}</div>
				</div>
			</template>
		</BetForm>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 引入各组件和工具方法
import useAccordion from "/@/views/lottery/components/Tools/Accordion/Index";
import useBall from "/@/views/lottery/components/Tools/Ball/Index";
import playsConfig from "./playsConfig";
import useBetForm from "/@/views/lottery/components/BetForm";
import { i18n } from "/@/i18n/index";
const $: any = i18n.global;

// 使用各自的组件
const { Accordion, AccordionItem } = useAccordion();
const { SelectBallGroup, Ball } = useBall();
const { openBet, BetForm } = useBetForm();

// 游戏玩法配置数据
const gamePlayConfig = ref(playsConfig());

// 选中的球的数组，用于投注表单
const balls = ref([]);
const gameInfo = ref();
const formActived = ref(false);

// 当前玩法是否选择球
const isSelectBall = ref(false);
/**
 * @description 手风琴展开玩法项的处理方法
 * @param status 当前子项选中状态
 * @param childData 当前子项数据
 * @param data 父数据
 */
const handleExpanded = (status: boolean, childData: any, data: any) => {
	gamePlayConfig.value.forEach((v) => {
		v.playMethods.forEach((w) => (w.actived = false));
	});
	childData.actived = status;
	balls.value = [];
	// 排除选择球玩法
	if (childData.type !== "selectBall") {
		formActived.value = status;
		gameInfo.value = status ? { ...data, playMethod: { ...childData } } : null;
		status && openBet();
	}
	isSelectBall.value = status ? childData.type === "selectBall" : false;
};

// 选择球组的处理方法
const handleSelectBalls = ({ list }, childData: any, data: any) => {
	formActived.value = list.length ? true : false;
	gameInfo.value = list.length ? { ...data, playMethod: { ...childData } } : null;
	if (list.length) {
		openBet();
	}

	balls.value = list;
};

// 清除手风琴展开状态的处理方法
const clearAccordionStatus = (status: boolean, index: number) => {
	gamePlayConfig.value.forEach((item, i) => {
		item.actived = index === i && status ? true : false;
	});
};

const closeBetBefore = () => {
	gamePlayConfig.value.forEach((v) => {
		v.playMethods.forEach((w) => {
			if (w.type !== "selectBall") {
				w.actived = false;
			}
		});
	});
};

const handleSubmit = (data) => {
	console.log(data);
};
</script>

<style lang="scss" scoped></style>
