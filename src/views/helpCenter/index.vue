<template>
	<!-- 活动 -->
	<div>
		<VantNavBar title="帮助中心" @onClickLeft="router.back()" />
	</div>

	<div class="wrapper p_24">
		<div class="content">
			<Collapse v-for="(item, index) in 10" :key="index" :is-open="index == currentOpenIndex ? true : false" :hasOneOpen="hasOneOpen" :index="index">
				<template #header>
					<div class="content_header flex">
						<span>{{ $t('vipHierarchy["取款教程"]') }}</span>
						<span><SvgIcon :iconName="index == currentOpenIndex ? 'common/arrowUp' : 'common/arrowDown'" alt="" size="30px" /> </span>
					</div>
				</template>
				<template #content>
					<div class="content_value color_T1" @click="goToDetails()">
						<span>{{ $t('vipHierarchy["等级"]') }}</span>
						<span>{{ $t('vipHierarchy["所需经验"]') }}</span>
					</div>
				</template>
			</Collapse>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from "/@/router";
import Collapse from "/@/views/vip/vipHierarchy/Collapse/index.vue";
import { TutorialApi } from "/@/api/helpCenter";
const currentOpenIndex = ref(0);

const hasOneOpen = (index) => {
	if (currentOpenIndex.value === index) {
		return (currentOpenIndex.value = -1);
	}
	currentOpenIndex.value = index;
};
onMounted(() => {
	showTutorialPreLayer();
});
const goToDetails = () => {
	router.push("/helpCenter/details");
};
const showTutorialPreLayer = () => {
	TutorialApi.showTutorialPreLayer().then((res) => {
		console.log(res);
	});
};
</script>

<style lang="scss" scoped>
.content {
	@include themeify {
		background: themed(BG3);
		border: none;
		border-radius: 20px;
	}
	.content_header {
		padding: 0 24px;
		height: 88px;
		line-height: 88px;
		@include themeify {
			color: themed(TB);
		}
	}
	.content_value {
		height: 88px;
		box-sizing: border-box;
		line-height: 64px;
		padding: 12px 24px;
		@include themeify {
			background: themed(Tag1);
		}
	}
}
</style>
