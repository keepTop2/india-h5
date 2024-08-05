<template>
	<div class="dutyTitle color_Theme">{{ $t('home["负责任游戏"]') }}</div>
	<div class="duty">
		<VantLazyImg :src="duty" class="dutyImg" />
	</div>
	<p class="dutyMsg color_T1">{{ $t('home["负责任游戏描述"]') }}</p>
</template>

<script setup lang="ts">
import duty from "/@/views/home/static/images/duty.png";
</script>

<style scoped lang="scss">
@import "../home.scss";
.dutyTitle {
	text-align: center;
	font-family: "PingFang SC";
	font-size: 36px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	text-decoration-line: underline;
	text-transform: uppercase;
}

.duty {
	display: flex;
	justify-content: center;
	margin: 24px 0;
	.dutyImg {
		width: 370px;
		height: 140px;
	}
}
.dutyMsg {
	text-align: center;
	font-family: "PingFang SC";
	font-size: 28px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}
</style>
