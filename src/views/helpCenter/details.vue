<template>
	<!-- 活动 -->
	<div>
		<VantNavBar :title="useRoute().query?.className" @onClickLeft="router.back()" />
	</div>

	<div class="wrapper p_24">
		<div class="tabs mb_20" v-if="useRoute().query?.classId">
			<span v-for="(item, index) in dataList" class="tab color_T1" :class="activeTab === index ? 'active' : ''" @click="changeTab(index)"> {{ item.name }} </span>
		</div>
		<div class="content" v-if="useRoute().query?.classId">
			<div class="card mb_24" v-for="item in dataList[activeTab]?.subset">
				<div class="title color_TB">{{ item.name }}</div>
				<div class="text color_T1">
					<div class="value" v-html="item.value"></div>
				</div>
			</div>
		</div>
		<div class="content" v-else>
			<div class="card mb_24" v-if="dataList[0]?.code == 5">
				<div class="text color_T1 fs_26">
					<div class="value">
						{{ $t(`helpCenter['全年365天']`) }}， <span class="color_Hint">{{ $t(`common['appName']`) }}</span>
						{{ $t(`helpCenter['为您提供7x24小时咨询服务。您可通过下面的联系方式快捷的反馈给我们，我们会及时回复您的咨询。']`) }}
						<p class="mt_24">
							{{ $t(`helpCenter['投诉建议邮箱']`) }}: <span class="color_F2">{{ dataList[0]?.valueDetail }}</span>
						</p>
						<p class="mt_8">
							{{ $t(`helpCenter['客服邮箱']`) }}: <span class="color_F2">{{ dataList[0]?.valueDetailExtend }}</span>
						</p>
					</div>
				</div>
			</div>
			<div class="card mb_24" v-else>
				<div class="text color_T1">
					<div class="value" v-html="dataList[0]?.valueDetail"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from "/@/router";
import { TutorialApi } from "/@/api/helpCenter";
import { useRoute } from "vue-router";
const activeTab = ref(0);
const changeTab = (index) => {
	activeTab.value = index;
};
const dataList: any = ref([]);
onMounted(() => {
	getList();
});
const getList = () => {
	const params = useRoute().query;
	if (params.code) {
		TutorialApi.getHelpCenterConfigList().then((res) => {
			dataList.value = [res.data.find((item) => item.code == params.code)];
			console.log(dataList.value);
		});
	} else {
		TutorialApi.showTutorialTurnLayer(params).then((res) => {
			dataList.value = res.data;
		});
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
}
.tabs {
	display: flex;
	gap: 52px;
	font-size: 30px;
	overflow-x: auto;
}
.tab.active {
	@include themeify {
		color: themed(Theme);
	}
	border-bottom: 4px solid themed(Theme);
}
.tabs::-webkit-scrollbar {
	display: none;
}
.content {
	.card {
		padding-bottom: 20px;
		border-radius: 8px;
		@include themeify {
			background: themed(BG3);
		}
		.title {
			padding: 24px 24px 16px;
		}
		.text {
			@include themeify {
				border-top: 1px solid themed(Line);
			}
			.value {
				padding: 24px 24px 16px;
				word-wrap: break-word; /* 允许单词中间换行 */
				overflow-wrap: break-word; /* 新标准，建议使用 */
			}
		}
	}
}
</style>
