<template>
	<VantNavBar :title="title" @onClickLeft="onClickLeft">
		<template v-slot:left>
			<SvgIcon class="collapse_icon color_TB" iconName="/common/arrowLeft" alt="" />
		</template>
	</VantNavBar>
	<div class="GameLists">
		<GameCard v-for="(game, index) in gameLists" :key="index" :game-info="game" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import GameApi from "/@/api/venueHome/games";
import GameCard from "../components/GameCard.vue";

interface QueryParams {
	gameOneId: number;
	label: number;
	title: string;
	gameTwoId: string;
}

const router = useRouter();
const route = useRoute();
const gameLists = ref();
const { gameOneId, label, title, gameTwoId } = route.query as unknown as QueryParams;

onMounted(() => {
	console.log(route, "====route");
	if (label == 0 || !label) {
		queryLobbyTopGame();
	} else {
		queryGameInfoByOneClassId();
	}
});

const onClickLeft = () => {
	console.log("onClickLeft");
	router.back();
};
const queryLobbyTopGame = async () => {
	const res = await GameApi.queryLobbyTopGame({ gameTwoId: gameTwoId });
	if (res?.ok) {
		gameLists.value = res.data;
	}
};

const queryGameInfoByOneClassId = async () => {
	const res = await GameApi.queryGameInfoByOneClassId({ gameOneId, label });
	if (res?.ok) {
		gameLists.value = res.data?.[0].gameInfoList;
	}
};
</script>

<style scoped lang="scss">
.GameLists {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding: 24px;
}
.collapse_icon {
	width: 32px;
	height: 32px;
}
</style>
