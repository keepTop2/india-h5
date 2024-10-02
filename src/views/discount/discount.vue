<template>
	<!-- 活动 -->
	<VantNavBar title="优惠活动" :leftArrow="false" />
	<div v-loading="state.pageLoading" class="discount_container">
		<!-- <Banner class="home_banner mb_35" /> -->

		<NavBar class="mt_32 mb_24 discount_navbar" v-model:active="active" :tab-list="state.tabList" @on-change-nav-bar="onChangeNavBar" />

		<div class="activityList_item bg_Tag1" @click="onToDeatils(item)" v-for="(item, index) in state.activityList" :key="index">
			<div class="img_container">
				<div class="activityGraph">
					<VantLazyImg class="discount_img" :src="discount1" />
				</div>
				<div class="text_container">
					<div class="date">
						<div class="deadline">截止时间：{{ item.activityEndTime }}</div>
						<div class="activity_name">{{ item.activityNameI18nCode }}</div>
					</div>
					<Button class="mt_40"> {{ $t('discount["进行中"]') }}</Button>
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
import { i18n } from "/@/i18n/index";
import { activityApi } from "/@/api/activity";
import Common from "/@/utils/common";
const $: any = i18n.global;
const router = useRouter();
const state: any = reactive({
	tabList: [],
	activityList: [],
	pageLoading: false,
});
// const store = useUserStore();
const active = ref<string | number>("");
onBeforeMount(async () => {
	await getActivityTab();
	await activityPageList();
	// await getActivity();
});
const params = reactive({
	pageNumber: 1,
	pageSize: 10,
	labelId: "",
});
// 查活动页签
const getActivityTab = async () => {
	state.pageLoading = true;
	const res: any = await activityApi.activityTabsList();
	state.pageLoading = false;
	if (res.code == Common.getInstance().ResCode.SUCCESS) {
		res.data.forEach((item, index) => {
			state.tabList.push({
				code: index + 1,
				value: item.labNameI18Code,
				labelId: item.id,
			});
		});
		state.tabList.unshift({
			code: 0,
			value: "全部",
			labelId: 0,
		});
	}
};

const onChangeNavBar = async () => {
	params.pageNumber = 1;
	activityPageList();
};
const activityPageList = async () => {
	if (active.value == 0) {
		params.labelId = "";
	} else {
		params.labelId = state.tabList[active.value].labelId;
	}

	const res: any = await activityApi.activityPageList(params);
	if (res.code == Common.getInstance().ResCode.SUCCESS) {
		state.activityList = res.data.records;
		params.pageNumber += 1;
	}
};
//跳转活动详情
const onToDeatils = (item) => {
	console.log(item);
	router.push({
		path: `/activity/${item.activityTemplate}`,
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
	padding-bottom: 160px;
	.discount_navbar {
		padding: 0 24px;
	}
	:deep(.van-tab) {
		@include themeify {
			background: themed("BG3");
			margin: 0 10px;
			border-radius: 12px;
		}
	}
	:deep(.van-tab--active) {
		@include themeify {
			background: themed("Theme");
			margin: 0 10px;
			border-radius: 12px;
			color: themed("TB1");
		}
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
						color: themed("TB");
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
