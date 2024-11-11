/*
 * @Author: WangMingxin
 * @Description: 菜单管理；
 */
import { defineStore } from "pinia";
import GameApi from "/@/api/venueHome/games";

export const useCollectGamesStore = defineStore("collectGames", {
	state: () => {
		return {
			collectGamesList: [] as any,
		};
	},
	getters: {
		/**
		 * @description: 左侧菜单是否是缩小
		 * @return {*}
		 */
		getCollectGamesList(): any {
			return this.collectGamesList;
		},
	},

	actions: {
		setCollectGamesList() {
			GameApi.queryCollection().then((res) => {
				this.collectGamesList = res.data.records.filter((item) => item.collect);
			});
		},
	},
});
