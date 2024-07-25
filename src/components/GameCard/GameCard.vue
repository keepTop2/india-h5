<template>
	<div class="gameItem">
		<div class="collect" v-if="CardItem.status != 2">
			<SvgIcon :iconName="gameData.collect ? `collect2` : `collect`" @click="clickCollect" class="collectSvg" />
		</div>
		<div class="detail">
			<div class="image-plan" @click="gameClick">
				<VantImage class="icon" :src="CardItem.pcIcon" />
				<div class="egis" v-if="CardItem.status == 2">
					<div class="backSvg">
						<SvgIcon iconName="Vector" class="Vector" />
					</div>
					<div class="msg">
						<h6>{{ $t(`gameList.gameItem['维护时间']`) }}</h6>
						<p>{{ CardItem.maintenanceStartTime }}</p>
						<van-icon name="minus" />
						<p>{{ CardItem.maintenanceEndTime }}</p>
					</div>
				</div>
			</div>
			<p class="name">{{ CardItem.name }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
// import pubSub from "/@/pubSub/pubSub";
// import { Notification } from "/@/components/index";
// import { Popover } from "./commoments/Popover";
import Common from "/@/utils/common";
import { CasionApi } from "/@/api/casion/casion";
import { useUserStore } from "/@/store/modules/user";
import { useRouter } from "vue-router";
const router = useRouter();
const UserStore = useUserStore();

const emit = defineEmits(["clickCollect"]);

interface CardItemType {
	/** id */
	id?: string | any;
	/**是否收藏 */
	collect: boolean; //是否收藏
	status: string | number; //是否维护 //1:开启中,2:维护中,3:已禁用
	remark: string;
	name: string;
	maintenanceStartTime: string;
	sort: number | null;
	maintenanceEndTime: string;
	pcIcon: string;
	/**场馆 */
	venueCode: string;
	/**游戏 code */
	gameCode: string;
}

class CardClass implements CardItemType {
	/** id对象 */
	id: string = "";
	/** 是否收藏  */
	collect = false; //是否收藏
	/** 是否维护 1:开启中,2:维护中,3:已禁用 */
	status = 1;
	remark = "";
	name = "游戏名称";
	maintenanceStartTime = "10.30 00:00";
	sort = null;
	maintenanceEndTime = "10.31 23:59";
	pcIcon = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
	venueCode = "";
	gameCode = "";
}
/**
 * @description: 游戏卡片
 * @return {*}
 */
interface GameCard {
	/** 是否拥有帮助 */
	help?: boolean;
	/** 游戏对象 */
	CardItem: CardClass;
}
const props = withDefaults(defineProps<GameCard>(), {
	help: false,
	CardItem: () => {
		return {} as CardClass;
	},
});

//转内部对象；可操作属性
const gameData = ref({ ...props.CardItem });

watch(
	() => props.CardItem,
	(newValue, oldValue) => {
		gameData.value = Object.assign(gameData.value, newValue);
	}
);

// const showLogin = () => {
// 	nextTick(() => {
// 		//订阅登陆弹窗事件
// 		pubSub.publish(
// 			pubSub.PubSubEvents.LoginEvents.showOrHiddenLoginDialog.eventName,
// 			pubSub.PubSubEvents.LoginEvents.showOrHiddenLoginDialog.params[1]
// 		);
// 		Notification({
// 			title: "提示",
// 			content: "请登陆后再进行收藏。",
// 		});
// 	});
// };

//游戏收藏或者取消收藏
const clickCollect = async () => {
	// pubSub.publish('showOrHiddenLoginDialog', 1);
	const { token } = UserStore.getUserInfo;
	if (token) {
		// if (gameData.value.collect) {
		// } else {
		// }
		let params: any = {
			gameId: gameData.value.id,
			type: !gameData.value.collect,
		};
		const res: any = await CasionApi.gameCollection(params).catch((err: any) => err);
		const { code, data } = res;
		if (code == Common.getInstance().ResCode.SUCCESS) {
			if (data == 1) {
				gameData.value.collect = !gameData.value.collect;
			}
		}
	} else {
		// showLogin();
	}
	emit("clickCollect", props.CardItem);
};

/** 游戏图片区域点击 */
const gameClick = () => {
	// const { token } = UserStore.getUserVipInfo;
	// if (token) {
	const params = {
		id: gameData.value.id,
		collect: gameData.value.collect,
		name: gameData.value.name,
		venueCode: gameData.value.venueCode,
		gameCode: gameData.value.gameCode,
	};
	const routeParam: any = {
		path: "/gameDetail/" + gameData.value.id,
		query: { ...params },
	};
	router.push(routeParam);
	// } else {
	// 	showLogin();
	// }
};
</script>

<style lang="scss" scoped>
.gameItem {
	// width: 220px;
	width: 100%;
	position: relative;
	border-radius: 16px;
	background: var(--Tag1-N, #31333a);
	overflow: hidden;

	.collect {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 32px;
		height: 32px;
		z-index: 10;
		display: flex;
		justify-items: center;
		align-items: center;
		.collectSvg {
			width: 100%;
			height: 100%;
			vertical-align: top;
		}
	}

	.detail {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 100%;
		.image-plan {
			width: 100%;
			// min-width: 220px;
			flex: 1;
			position: relative;
			min-height: 220px;
			flex-shrink: 0;
			display: flex;
			:deep() {
				.van-image {
					.van-image__img,
					.van-image__error,
					.van-image__loading {
						height: 220px;
					}
				}
			}
			.egis {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 1;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.8);
				backdrop-filter: blur(4px);
				.backSvg {
					width: 100%;
					height: 100%;
					flex-shrink: 0;
					position: absolute;
					display: flex;
					align-items: center;
					justify-content: center;
					top: 0;
					.Vector {
						width: 100%;
						height: 100%;
					}
				}
				.msg {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					z-index: 1;
					width: 100%;
					height: 100%;
					h6,
					p {
						color: var(--TB-P, #fdfdfd);
						text-align: center;
						font-family: "PingFang SC";
						font-size: 24px;
						font-style: normal;
						font-weight: 500;
						line-height: normal;
					}
					:deep() {
						.van-icon {
							color: var(--TB-P, #fdfdfd);
							font-size: 24px;
						}
					}
					p {
						font-weight: 400;
					}
				}
			}
		}
		.name {
			min-height: 58px;
			color: var(--TB-N, #fbfbfb);
			text-align: center;
			/* Text1-文本 1 */
			font-family: "PingFang SC";
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: 58px; /* 141.667% */
		}
	}
}
</style>
