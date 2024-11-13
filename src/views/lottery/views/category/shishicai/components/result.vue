<template>
	<div class="lottery-result">
		<div class="result-header">
			<span>期号</span>
			<span>中奖号码</span>
		</div>
		<div class="result-content">
			<div class="result-content-item">
				<div class="issue-num">20241003-097</div>
				<div class="win-num">
					<Ball v-for="item in 5" :type="3" :ball-number="item" :key="item" />
				</div>
			</div>
			<div class="result-content-item">
				<div class="issue-num">20241003-098</div>
				<div class="win-num">
					<Ball v-for="item in 5" :type="1" :ball-number="item" :key="item" />
				</div>
			</div>
			<div class="result-content-item">
				<div class="issue-num">20241003-099</div>
				<div class="win-num">
					<Ball v-for="item in 5" :type="2" :ball-number="item" :key="item" />
				</div>
			</div>
			<div class="result-content-item">
				<div class="issue-num">20241003-099</div>
				<div class="win-num win-num-dice">
					<Dice v-for="item in 6" :type="2" :points="item" :key="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useBall from "/@/views/lottery/components/Tools/Ball/Index";
import useDice from "/@/views/lottery/components/Tools/Dice/Index";
const { Ball } = useBall();
const { Dice } = useDice();
</script>

<style lang="scss" scoped></style>
