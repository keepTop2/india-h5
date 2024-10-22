<template>
	<!-- 活动 -->
	<div>
		<VantNavBar :title="'帮助中心2'" @onClickLeft="router.back()" />
	</div>

	<div class="wrapper p_24">
		<div class="tabs mb_20">
			<span v-for="item in 20" class="tab color_T1" :class="activeTab === item ? 'active' : ''" @click="changeTab(item)"> {{ item }}test </span>
		</div>
		<div class="content">
			<div class="card">
				<div class="title color_TB">1231231231212312</div>
				<div class="text color_T1">
					<div class="value">12312312312123121231231231212312123123123121231212312312312123121231231231212312123123123121231212312312312123121231231231212312</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from "/@/router";
import { TutorialApi } from "/@/api/helpCenter";
const currentOpenIndex = ref(0);
const activeTab = ref(1);
const changeTab = (item) => {
	activeTab.value = item;
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
