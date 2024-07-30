<template>
	<div class="bg_BG2 content" ref="myDiv">
		<VantNavBar title="联赛筛选" @onClickLeft="onClickLeft" />
		<div class="leagueSelect bg_BG1">
			<div class="search bg_BG2 mb_24">
				<SvgIcon iconName="/venueHome/sports/svg/magnifier" class="size_32 color_Tag1" />
				<input class="color_T3-P fs_26 fw_400" autocomplete="off" v-model="searchValue" placeholder="请输入联赛名" type="text" name="search" />
			</div>
			<ul>
				<li class="bg_BG3 mb_8 fs_26 fw_400" v-for="(item, index) in leaguesList" :key="index" @click="handleChange(item)">
					<span class="leagueName color_T1">{{ item.leagueName }}</span>
					<SvgIcon style="fill: none" :iconName="isActive(item) ? 'sport_checked' : 'sport_unChecked'" class="size_32 color_Theme" />
				</li>
			</ul>
		</div>
		<div class="league_select_footer">
			<div class="mr_50">
				<span class="theme" @click="handleAllLeague"
					><SvgIcon style="fill: none" :iconName="isAll ? 'sport_checked' : 'sport_unChecked'" class="size_32 mr_16" /><span class="color_T1 fs_26 fw_500 mr_50">全选</span></span
				>
				<span @click="handleInvert" class="color_T1 fs_26 fw_500">反选</span>
			</div>
			<span class="color_T3-P fs_24 fw_400">{{ count }}个联赛</span>
			<button :class="['fs_30', 'fw_400', 'color_TB-P']" @click="handleSubmit">确定</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import sportsApi from "/@/api/venueHome/sports";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
import { useRouter, useRoute } from "vue-router";
import _ from "lodash";
import { ChildrenToMainCommon } from "/@/ChildrenAppportAManage/childrenAppDTOs/childrenToMain/childrenToMainCommon";
import { ControllersEnum } from "/@/ChildrenAppportAManage/childrenAppEnums/controllersEnum";
import childrenAppportAManage from "/@/ChildrenAppportAManage/ChildrenAppportAManage";
const sportsBetEvent = useSportsBetEventStore();
const myDiv = ref(null);
const router = useRouter();
const route = useRoute();
const searchValue = ref("");
const activeLeagues = ref<any>();
console.log(router, route, "======toureee");
interface League {
	leagueId: number | never;
	leagueName: string;
}
const leaguesList = ref<League[]>([]);

onMounted(() => {
	console.log("Component mounted");
	console.log(sportsBetEvent.getLeagueSelect, "======sportsBetEvent.getLeagueSelect");
	activeLeagues.value = JSON.parse(JSON.stringify(sportsBetEvent.getLeagueSelect));
	//获取联赛数据
	getLeagues();
});

onUnmounted(() => {
	activeLeagues.value = [];
});

const isAll = computed(() => {
	return activeLeagues.value?.length === leaguesList.value?.length && activeLeagues.value?.length > 0;
});
const count = computed(() => activeLeagues.value?.length);

watch(
	() => searchValue.value,
	() => {
		searchLeagues();
	}
);

//回退至上一个路由
const onClickLeft = () => {
	router.go(-1);
	// const childrenToMainCommonData: ChildrenToMainCommon = {
	// 	transactionName: ControllersEnum.SportAContainerChangeController,
	// 	apiName: "sportAContainerToSportProcess",
	// 	data: {},
	// };
	// childrenAppportAManage.forceDispatch(childrenToMainCommonData);
};
/**
 * @description 判断是否选中了
 */
const isActive = (item) => {
	return activeLeagues.value.includes(item.leagueId);
};
/**
 * @description 全选与取消全选
 */

const handleAllLeague = () => {
	if (isAll.value) {
		activeLeagues.value = [];
	} else {
		activeLeagues.value = leaguesList.value.map((item) => item.leagueId);
	}
};
/**
 * @description 反选
 */
const handleInvert = () => {
	const arr = <any>[];
	leaguesList.value.forEach((item) => {
		if (!activeLeagues.value.includes(item.leagueId)) {
			arr.push(item.leagueId);
		}
	});
	console.log(arr.length, "=====length");
	activeLeagues.value = arr;
};
/**
 * @description 选中联赛触发事件
 */
const handleChange = (item: League) => {
	const index = activeLeagues.value.indexOf(item.leagueId);

	if (index != -1) {
		activeLeagues.value.splice(index, 1);
	} else {
		activeLeagues.value.push(item.leagueId);
	}
};

/**
 * @description 获取联赛列表
 */

const getLeagues = async () => {
	// const filterLeagueId = (activeLeagues.value.length > 0 && ` and leagueid in (${activeLeagues.value})`) || "";
	const res = await sportsApi.GetLeagues({ query: `$filter=contains(leaguename,'${searchValue.value}') and sporttype eq ${route.params.sportType} ` }).catch((err) => err);
	//获取联赛数据
	if (res.data) {
		// 使用Map来去重，基于leagueId
		const uniqueLeaguesMap = new Map();
		res.data.leagues.forEach((item) => {
			uniqueLeaguesMap.set(item.leagueId, item);
		});
		// 从Map中提取去重后的值，转换回数组
		leaguesList.value = Array.from(uniqueLeaguesMap.values());
	}
};
/**
 * @description 添加防抖函数
 */
const searchLeagues = _.debounce(getLeagues, 300);

/**
 * @description 保存联赛数据到pinia中
 */

const handleSubmit = () => {
	// if (activeLeagues.value.length > 0) {
	sportsBetEvent.setSportsLeagueSelect(activeLeagues.value);
	onClickLeft();
	// }
};
</script>

<style scoped lang="scss">
.content {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
}
.leagueSelect {
	height: calc(100vh - 216px);
	overflow-y: scroll;
	padding: 24px;
	box-sizing: border-box;
	.leagueName {
		display: inline-block;
		width: 500px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search {
		height: 72px;
		display: flex;
		align-items: center;
		border-radius: 12px;
		padding: 18px 24px;
		box-sizing: border-box;
		svg {
			margin-right: 24px;
		}
		@include themeify {
			input {
				height: 36px;
				width: 100%;
				border: 0;
				background-color: themed("BG2");
			}
		}
	}
	ul {
		li {
			display: flex;
			border-radius: 16px;
			align-items: center;
			padding: 20px 24px;
			box-sizing: border-box;
			justify-content: space-between;
			gap: 20px;
		}
	}
}
.theme {
	@include themeify {
		color: themed("Theme");
	}
}
.league_select_footer {
	height: 116px;
	display: flex;
	align-items: center;
	padding: 0 24px;
	gap: 0;
	justify-content: space-between;
	button {
		width: 256px;
		height: 86px;
		border-radius: 80px;
		border: 0;
		float: right;
		@include themeify {
			background: themed("Theme");
		}
	}
	button.disable {
		@include themeify {
			color: themed("T3");
			background: themed("BG3");
		}
	}
}
</style>
