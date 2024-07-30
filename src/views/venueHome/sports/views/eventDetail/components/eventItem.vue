<template>
	<div class="eventItem">
		<div class="header bg_Line">
			<div class="header_left">
				<span class="color_TB fw_500 fs_22 mr_24">
					{{ convertUtcToUtc5AndFormat(data.eventTime) }}
				</span>
				<!-- <SvgIcon iconName="sport_score" />
				&nbsp;
				<span class="color_T1 fs_22 fw_700">{{ Score }}</span> -->
			</div>
			<div class="header_right">
				<span class="color_T1 fw_400 fs_20">半场</span>
				<span class="color_T1 fw_400 fs_20">全场</span>
			</div>
		</div>
		<div class="content">
			<div class="list">
				<div>
					<span class="color_TB fw_500 fs_22 mr_24 name">{{ data.homeName }}</span>
				</div>
				<div class="header_right">
					<span class="fs_32 fw_700 color_TB">{{ data.htHomeScore }}</span>
					<span class="fs_32 fw_700 color_TB">{{ data.homeScore }}</span>
				</div>
			</div>
			<div class="list">
				<div>
					<span class="color_TB fw_500 fs_22 mr_24 name">{{ data.awayName }}</span>
				</div>
				<div class="header_right">
					<span class="fs_32 fw_700 color_TB">{{ data.htAwayScore }}</span>
					<span class="fs_32 fw_700 color_TB">{{ data.awayScore }}</span>
				</div>
			</div>
			<SvgIcon class="arrow_right" iconName="sport_arrow_right" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { EventResult } from "../../../utils/interface";
import { convertUtcToUtc5AndFormat } from "/@/webWorker/module/utils/formattingChildrenViewData";
const props = withDefaults(
	defineProps<{
		data: EventResult;
	}>(),
	{}
);

const Score = computed(() => {
	const { data } = props;
	const HomeScore = (Number(data.htHomeScore) || 0) + (Number(data.homeScore) || 0);
	const AwayScore = (Number(data.htAwayScore) || 0) + (Number(data.awayScore) || 0);
	return `${HomeScore}-${AwayScore}`;
});
</script>
<style lang="scss" scoped>
.name {
	width: 178px;
	//超出省略号
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.header {
	font-family: "DIN Alternate";
	height: 54px;
	line-height: 54px;
	width: 100%;
	padding: 0 12px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	.header_left {
		display: flex;
		align-items: center;
		svg {
			width: 22px;
			height: 26px;
		}
	}
	.header_right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 60px;
		padding-right: 50px;
		box-sizing: border-box;

		span {
			width: 40px;
		}
	}
}
.content {
	font-family: "DIN Alternate";
	padding: 0 12px;
	box-sizing: border-box;
	position: relative;
	.arrow_right {
		position: absolute;
		right: 12px;
		width: 28px;
		height: 24px;
		top: calc(50% - 12px);
	}
	.list {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		height: 60px;
		line-height: 60px;
	}
	.header_right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 60px;
		padding-right: 50px;
		box-sizing: border-box;

		span {
			width: 40px;
			text-align: center;
			display: inline-block;
		}
	}
}
</style>
<!-- 
awayName	string	客队名称	Yes	$filter=contains(awayname,'Lakers')
htHomeScore	string	主队半场得分	No	—
htAwayScore	string	客队半场得分	No	—
homeScore	string	主队终场得分	No	—
awayScore	string	客队终场得分	No	—
firstHomeScore	string	主队第一局的得分
仅适用 板球(50)	No	—
firstAwayScore	string	客队第一局的得分
仅适用 板球(50)	No	—
secondHomeScore	string	主队第二局的得分
仅适用 板球(50)	No	— -->
