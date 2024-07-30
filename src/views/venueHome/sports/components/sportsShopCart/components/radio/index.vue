<template>
	<div>
		<div class="radio" @click="onRadio">
			<SvgIcon style="fill: none" :iconName="sportsBetEvent.radioStatus ? 'sports_radio_active' : 'sports_radio'" size="3.466667" />
			<span>自动接受较优赔率</span>
		</div>

		<van-popup v-model:show="show">
			<div class="container">
				<div class="title">取消后您将“自动接受较优赔率”</div>
				<div class="content">即无论下注时的赔率如何变化，系统都将默认您可以接受，页面会出现赔率变化提示，但不会中断您的下注行为。</div>
				<div class="footer" @click="show = false">我知道了</div>
			</div>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import { useSportsInfoStore } from "/@/store/modules/sports/sportsInfo.ts";
import sportsApi from "/@/api/venueHome/sports";
import Common from "/@/utils/common";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { getPublicSetting } from "../../../../utils/commonFn";
const sportsBetEvent = useSportsBetEventStore();
const sportsInfoStore = useSportsInfoStore();

const show = ref(false);

const saveSetting = async () => {
	const params = {
		type: "sport_odds",
		value: sportsBetEvent.radioStatus ? 1 : 0,
	};
	const res = await sportsApi.saveSetting(params).catch((err) => err);
	if (res.code == Common.getInstance().ResCode.SUCCESS) {
		getPublicSetting();
	}
};

const onRadio = () => {
	if (!sportsInfoStore.sportRadioStatus && sportsBetEvent.radioStatus) {
		sportsInfoStore.setSportRadioStatus();
		show.value = true;
	}
	sportsBetEvent.radioStatus = !sportsBetEvent.radioStatus;
	saveSetting();
};
</script>

<style scoped lang="scss">
.radio {
	display: flex;
	align-items: center;
	@include themeify {
		color: themed("Theme-P");
	}
}
span {
	margin: 0px 10px;
	@include themeify {
		color: themed("T1");
	}
	font-family: "PingFang SC";
	font-size: 22px;
	font-weight: 400;
}
:deep(.van-popup) {
	background-color: transparent;
}

.container {
	width: 540px;
	border-radius: 20px;
	@include themeify {
		background-color: themed("BG1");
	}
}
.title {
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 18px 30px;
	box-sizing: border-box;
	border-bottom: 1px solid;
	@include themeify {
		color: themed("TB");
		border-color: themed("Line");
	}
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 400;
}
.content {
	padding: 16px 46px;
	@include themeify {
		color: themed("T1");
	}
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 400;
	line-height: 38px;
}
.footer {
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid;
	@include themeify {
		color: themed("Theme-P");
		border-color: themed("Line");
	}
	font-family: "PingFang SC";
	font-size: 32px;
	font-weight: 400;
}
</style>
