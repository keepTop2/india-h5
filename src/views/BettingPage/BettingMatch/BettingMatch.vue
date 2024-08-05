<template>
	<div class="BettingMatch">
		<VantNavBar title="每日竞赛" @onClickLeft="onClickLeft" />
		<div class="content">
			<Tabs class="plr" v-model="tabsActiveKey" :list="tabList" />

			<div class="top mt_70">
				<div>
					<h3 class="color_TB fs_36 fw_400">{{ $t('betting["比赛奖池"]') }}</h3>
					<span class="money color_Theme fw_700 fs_64 flex">
						<img :src="icon" alt="" />
						800,000,00
					</span>
				</div>
				<img class="topimg" :src="topimg" alt="" />
				<SvgIcon class="hint" @click="rulePage" iconName="common/hint" />
			</div>
			<div class="top2 flex">
				<div class="countDown br_8">
					<h3 class="color_TB fw_400 fs_30 mb_12">{{ $t('betting["剩余时间"]') }}</h3>
					<countDown />
				</div>
				<div class="championInfo bg_BG3 br_8">
					<img class="jiao" :src="jiao" alt="" />
					<h3 class="title fw_500 flex fs_24"><img class="size_24" :src="winner" alt="" />{{ $t('betting["上届冠军"]') }}</h3>
					<div class="line_home"></div>
					<div class="winnerInfo flex">
						<img :src="userIcon" alt="" />
						<div>
							<h3 class="userName color_TB fw_600 fs_24">用户昵称</h3>
							<span class="color_TB fs_22 fw_400">{{ $t('betting["奖金"]') }}</span>
							<span class="color_TB fs_20 flex fw_700"> <img class="size_20" :src="icon" alt="" /><span class="color_Theme">987,654,321.00</span><span></span> (50%) </span>
						</div>
					</div>
				</div>
			</div>
			<div class="userInfo" v-if="!participation">
				<div class="userInfo_Top">
					<img :src="userIcon" class="userIcon" alt="" />
					<span class="userName color_TB fw_600 fs_24">用户昵称</span>
				</div>
				<div class="userInfo_Bottom">
					<div class="userInfo_Bottom_left">
						<p class="color_T3 fs_24 fw_400 lh_34">{{ $t('betting["我的位置"]') }}</p>
						<p class="color_yellow-ffe-500 fs30 fw_400 lh_40">50+</p>
					</div>
					<div class="rightLine"></div>
					<div class="userInfo_Bottom_right" style="text-align: center">
						<h3 class="userName color_T3 fs_24 fw_500 lh_38">{{ $t('betting["投注金额"]') }}</h3>
						<span class="fw_500 color_green-00-ff-47 fs_24">$900.999</span>
					</div>
				</div>
				<p class="color_T3 fs_20">距离上榜还需 <span class="color_TB">$713,395.15</span> {{ $t('betting["投注金额"]') }}</p>
			</div>
			<div class="participation" v-else>
				<p class="color_T1 fs_24 fw_400">{{ $t('betting["描述"]') }}</p>
				<a class="color_TB bg_Theme">{{ $t('betting["立即参与"]') }}</a>
			</div>
			<!-- <div class="fs_24 mtb24" style="text-align: center">
				<span class="color_T1">{{ $t('betting["下注"]') }} ¥458,422.80 {{ $t('betting["达到"]') }}</span> <span class="color_Hint-P">前10名</span>
			</div> -->
			<div class="BettingTable mt_24">
				<div class="color_T1 flex fs_24 date">
					<div>
						<button class="bg_Theme color_TB fs_24 fw_400">{{ $t('betting["今天"]') }}</button>
						2023/4/24 ~ 2023/4/25
					</div>
					<SvgIcon @click="dialogShow = true" class="history size_32" iconName="common/history" />
				</div>
				<Table :tableData="defaultProps.data" :height="68" :columns="defaultProps.columns">
					<template #cell-name="{ index }">
						<span class="home_paihang" v-if="index + 1 == 1">
							<SvgIcon iconName="venueHome/bettingMatch/jinpai" />
						</span>
						<span class="home_paihang" v-if="index + 1 == 2">
							<SvgIcon iconName="venueHome/bettingMatch/yinpai" />
						</span>
						<span class="home_paihang" v-if="index + 1 == 3">
							<SvgIcon iconName="venueHome/bettingMatch/tongpai" />
						</span>
						<span class="home_paihang Text1" v-if="index + 1 > 3">{{ index + 1 }}</span>
						<!-- #3bc116 -->
					</template>
					<template #cell-Profit="{ data }">
						<span class="color_Warn-P">{{ data.Profit }}</span>
						<!-- #3bc116 -->
					</template>
				</Table>
			</div>
			<Dialog class="dialog" :visible="dialogShow" @close="dialogShow = false">
				<template #title>
					<div class="title fs_24 color_T1">
						<img class="history size_32" :src="history" alt="" />
						2023/4/23 ~ 2023/4/24
					</div>
				</template>
				<Table :tableData="defaultProps.data" :height="68" :columns="defaultProps.columns">
					<template #cell-name="{ data, index }">
						<span class="home_paihang" v-if="index + 1 == 1">
							<SvgIcon iconName="venueHome/bettingMatch/jinpai" />
						</span>
						<span class="home_paihang" v-if="index + 1 == 2">
							<SvgIcon class="home_" iconName="venueHome/bettingMatch/yinpai" />
						</span>
						<span class="home_paihang" v-if="index + 1 == 3">
							<SvgIcon class="home_" iconName="venueHome/bettingMatch/tongpai" />
						</span>
						<span class="home_paihang Text1" v-if="index + 1 > 3">{{ index + 1 }}</span>
					</template>
					<template #cell-Profit="{ data }">
						<span class="color_Warn-P">{{ data.Profit }}</span>
					</template>
				</Table>
			</Dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Table from "./components/Table/Table.vue";
import Dialog from "./components/Dialog/Dialog.vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import countDown from "./components/CountDown/CountDown.vue";
import { useUserStore } from "/@/store/modules/user";
import jiao from "./images/jiao.png";
import icon from "./images/icon.png";
import userIcon from "./images/userIcon.png";
import winner from "./images/winner.png";
import topimg from "./images/topimg.png";
import history from "./images/history.png";
import close from "./images/close.png";
const router = useRouter();
/**
 * 投注比赛
 */

const dialogShow = ref(false);
const UserStore = useUserStore();
const userInfo = computed(() => {
	return UserStore.getUserInfo;
});

const participation = ref(false);
const defaultProps = {
	// 表格数据
	data: [
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
	],

	// 列定义
	columns: [
		{ field: "name", label: "排行" },
		{ field: "player", label: "玩家" },
		{ field: "multiple", label: "投注金额" },
		{ field: "Profit", label: "奖金" },
	],
};

//初始化当前选中tab
const tabsActiveKey = ref("all");
const searchValue = ref();
//tabs 切换
const tabList = [
	{
		name: "电子竞赛",
		value: "all",
	},
	{
		name: "真人竞赛",
		value: "1",
	},
];
const onClickLeft = () => {
	router.go(-1);
};

const rulePage = () => {
	router.push({
		path: "/betRule",
	});
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
