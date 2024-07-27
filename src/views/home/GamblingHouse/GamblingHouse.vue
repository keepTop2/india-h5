<template>
	<div class="content">
		<Banner />
		<template v-for="(item, index) in hallList" :key="index">
			<!-- POPULAR:热门，GAME:游戏，VENUE:游戏供应商 -->
			<div class="categories m32" v-if="item?.type == 'POPULAR' || item?.type == 'GAME'">
				<h3 class="title">
					<span>
						<SvgIcon :iconName="item?.iconCode" alt="" />
						{{ item?.name }}
					</span>
					<div class="router_link" @click="routerLink(item)">{{ $t('home["查看全部"]') }}</div>
				</h3>
				<GameList :gameList="item?.gameInfoList" v-if="!loading" />
				<div v-else class="loading-indicator">Loading...</div>
				<div class="line_home"></div>
			</div>
			<GameSupplierGroupCard v-if="item?.type == 'VENUE'" key="index" :supplierGroupCard="item" />
		</template>

		<div class="line_home"></div>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Banner, GameList, GameSupplierGroupCard } from "../components";
// import Footer from "/@/components/Footer/footer.vue";
import Common from "/@/utils/common";
import { CasionApi } from "/@/api/casion/casion";
import { useRouter, useRoute } from "vue-router";
import { useMenuStore } from "/@/store/modules/menu";

const MenuStore = useMenuStore();
const router = useRouter();

// const props = withDefaults(
// 	defineProps<{
// 		/** 菜单信息 */
// 		menuMessage: any;
// 	}>(),
// 	{
// 		menuMessage: {},
// 	}
// );

const loading = ref(false);

const hallList = ref([]);
/**
 * @description: 菜单单元
 */
interface menuItem {
	id?: string;
	name?: string;
	iconCode?: string;
	sort?: number;
	modelCode?: string;
}
/**
 * @description: 获取菜单信息
 */
const menuMessage = computed(() => {
	let menuMes: menuItem = {};
	const serverData: any = MenuStore.getServerData;
	for (const item of serverData) {
		if (item.modelCode == "CA") {
			const obj = {
				id: item.id || item.gameOneClassId,
				name: item.name || item.gameOneClassName,
				iconCode: item.iconCode,
				sort: item.sort,
				modelCode: item.modelCode,
			};
			menuMes = obj;
			break;
		}
	}
	return menuMes;
});

/**
 * @description: 获取游戏大厅
 * @return {*}
 */
const getGroupList = async () => {
	const params = {
		gameOneId: menuMessage.value.id,
		// label: 0,
		// gameTwoId: "string",
		// sortFile: 0,
		// venueId: "string",
	};
	const res = await CasionApi.gameHallList(params).catch((err) => err);
	const { code, data } = res;
	if (code == Common.getInstance().ResCode.SUCCESS) {
		hallList.value = data;
	}
};

/**
 * @description:
 * @param {*} menuItem {菜单信息对象}
 * @return {*}
 */
const routerLink = (menuItem: any) => {
	if (menuItem?.id) {
		switch (menuItem?.type) {
			case "POPULAR":
			case "GAME":
				router.push({ name: "gameList", query: { id: menuItem.id, name: menuItem.name } });
				break;
			case "VENUE":
				router.push({ name: "gameList", query: { id: menuItem.id, name: menuItem.name } });
				break;
			default:
				break;
		}
	}
};

onMounted(() => {
	getGroupList();
});
</script>

<style lang="scss" scoped>
@import "./GamblingHouse.scss";

.loading-indicator {
	font-size: 1.5em;
	color: #ccc;
}
</style>
