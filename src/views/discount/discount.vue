<template>
	<!-- 活动 -->
	<div v-loading="state.pageLoading" class="discount_container">
		<Banner class="home_banner mb_35" />
		<NavBar class="mb_24 discount_navbar" v-model:active="active" :tab-list="state.tabList" @on-change-nav-bar="onChangeNavBar" />
		<!-- 轮播图 -->
		<div class="activityList_item bg_Tag1" @click="onToDeatils('12')">
			<div class="img_container">
				<div class="activityGraph">
					<VantLazyImg class="discount_img" :src="discount1" />
				</div>
				<div class="text_container">
					<div class="date">
						<div class="deadline">截止时间：2024.1.5 24:00:00</div>
						<div class="activity_name">2024年新年投注赛</div>
					</div>
					<Button class="mt_40"> 进行中</Button>
				</div>
			</div>
		</div>
		<div class="activityList_item bg_Tag1">
			<div class="img_container">
				<VantLazyImg class="discount_img" :src="discount1" />
				<div class="text_container">
					<div class="date">
						<div class="deadline">截止时间：2024.1.5 24:00:00</div>
						<div class="activity_name">2024年新年投注赛</div>
					</div>
					<!-- <Button class="mt_40"> 进行中</Button> -->
					<span class="mt_40 color_T3 fs_24"> 活动结束</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import discount1 from "./image/discount1.png";
import { reactive } from "vue";
import { onBeforeMount } from "vue";
import Banner from "./Banner/banner.vue";
import NavBar from "./components/Navbar.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
	tabList: [
		{
			code: "0",
			value: "最新活动",
		},
		{
			code: "1",
			value: "已过期",
		},
	],
	activityList: [],
	pageLoading: false,
});
// const store = useUserStore();
const active = ref<string | number>("");

onBeforeMount(async () => {
	await getActivityTab();
	await getActivity();
});
// const discountIndexApi: DiscountIndexApi = new DiscountIndexApi();

// 查活动页签
const getActivityTab = async (): Promise<void> => {
	// const params = {
	// 	supportTerminal: Common.getInstance().getDevice(),
	// };
	state.pageLoading = true;
	// const res = await discountIndexApi.getActivityTab(params).catch((err) => err);
	state.pageLoading = false;
	// if (res.code == Common.getInstance().ResCode.SUCCESS) {
	// 	const allObj: SystemParamVO = {
	// 		code: "",
	// 		type: "",
	// 		value: "全部",
	// 	};
	// state.tabList.push(allObj);
	// state.tabList = state.tabList.concat(res.data);
	active.value = state.tabList[0].code;
	// }
};

// 点击切换页签
const onChangeNavBar = () => {
	getActivity();
};

//跳转活动详情
const onToDeatils = (item) => {
	router.push({
		path: "/discount/activityParticulars",
		query: { data: encodeURIComponent(JSON.stringify(item)) },
	});

	// if (item.entrancePictureGrey) {
	// 	Toast("活动已过期");
	// 	return;
	// }
	// console.log(item);
	// if (item.activityTemplate == 5 || item.activityTemplate == 6) {
	// 	if (item.activityTemplate == 5) {
	// 		router.push({ path: "/discountGift", query: { id: item.id } });
	// 	} else {
	// 		router.push({ path: "/inviteFriendsTripleGift", query: { id: item.id } });
	// 	}
	// } else {
	// 	router.push({
	// 		path: "/discountDetails",
	// 		query: { data: encodeURIComponent(JSON.stringify(item)) },
	// 	});
	// }
};

// 根据活动页id查对应活动
const getActivity = async (): Promise<void> => {
	// const params = {
	// 	supportTerminal: Common.getInstance().getDevice(),
	// 	tabId: active.value,
	// 	// supportAccountType: store.userInfo.accountType,
	// };
	// state.pageLoading = true;
	// const res = await discountIndexApi.getActivity(params).catch((err) => err);
	// state.pageLoading = false;
	// if (res.code == Common.getInstance().ResCode.SUCCESS) {
	// 	state.activityList = res.data.records;
	// }
};
</script>

<style lang="scss" scoped>
.discount_container {
	.discount_navbar {
		padding: 0 24px;
	}

	.activityList_item {
		border-radius: 16px;
		margin: 0 24px;
		margin-bottom: 24px;

		@include themeify {
			background: themed("BG2");
		}
		// margin-top: 24px;
		.img_container {
			.activityGraph {
				padding: 20px 20px 0 20px;
				box-sizing: border-box;
			}
			.discount_img {
				border-radius: 16px;
				width: 100%;
				height: 300px;
				// background: url(<path-to-image>) lightgray 50% / cover no-repeat;
			}
			.text_container {
				display: flex;
				justify-content: space-between;
				align-items: center;

				padding: 10px 24px;
				.date {
					.deadline {
						@include themeify {
							color: themed("T1");
						}

						/* Text1-文本1 */
						font-family: "PingFang SC";
						font-size: 24px;
						font-style: normal;
						font-weight: 400;
						line-height: 34px; /* 141.667% */
					}
					.activity_name {
						margin-top: 4px;
						@include themeify {
							color: themed("TB");
						}
						font-family: "PingFang SC";
						font-size: 30px;
						font-style: normal;
						font-weight: 500;
						line-height: 40px; /* 133.333% */
					}
				}
				.mt_40 {
					margin: 0;
					width: 148px;
					height: 54px;
					padding: 10px 24px;
					flex-shrink: 0;
					border-radius: 8px;
					// line-height: 54px;
					box-sizing: border-box;
					@include themeify {
						color: themed("TB-P");
					}
					text-align: center;

					/* Text1-文本1 */
					font-family: "PingFang SC";
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
				}
			}
		}
	}
}
</style>
