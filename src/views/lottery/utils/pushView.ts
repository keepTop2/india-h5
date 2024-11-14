import { stringify } from "qs";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { GameListItem } from "/@/views/lottery/types/game";

interface Maps {
	[key: string]: string;
}

const maps: Maps = {
	K3: "/lottery/kuaisan", // 快三
	SSQ: "/lottery/unionLotto",
	PK10: "/lottery/pk10",
	_28: "/lottery/lucky28", // 幸运 28
	SSC: "/lottery/shishicai",
	SYXW: "/lottery/elevenChooseFive", // 11 选 5
};

export function pushView(game: GameListItem) {
	console.log("game", game);
	const router = useRouter();
	const { gameCategoryCode, venueCode, gameCode } = game;
	const searchParams = { venueCode, gameCode };
	const targetView = maps[gameCategoryCode];
	if (!targetView) {
		showToast("Error: Path Not Found!");
		return;
	}
	router.push(`${targetView}?${stringify(searchParams)}`);
}
