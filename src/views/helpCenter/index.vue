<template>
	<!-- 活动 -->
	<div>
		<VantNavBar :title="$t(`common['帮助中心']`)" @onClickLeft="router.back()" />
	</div>

	<div class="wrapper p_24">
		<div class="content">
			<Collapse
				v-for="(item, index) in dataList"
				:key="index"
				:is-open="index == currentOpenIndex ? true : false"
				:hasOneOpen="hasOneOpen"
				:index="index"
				@updateOpen="updateOpen"
				:class="index == currentOpenIndex ? 'isOpen' : ''"
			>
				<template #header>
					<div class="content_header flex">
						<VantLazyImg src="/@/assets/theme/common/helpcenter1.svg" v-if="item.code == 1"></VantLazyImg>
						<VantLazyImg src="/@/assets/theme/common/helpcenter2.svg" v-else-if="item.code == 3"></VantLazyImg>
						<VantLazyImg src="/@/assets/theme/common/helpcenter3.svg" v-else-if="item.code == 4"></VantLazyImg>
						<VantLazyImg src="/@/assets/theme/common/helpcenter4.svg" v-else-if="item.code == 5"></VantLazyImg>
						<VantLazyImg :src="item.icon" v-else></VantLazyImg>
						<span class="ellipsis" style="text-align: left; flex: 1"> {{ item.name }}</span>
						<span v-if="item.subset"><SvgIcon :iconName="index == currentOpenIndex ? 'common/arrowUp' : 'common/arrowDown'" alt="" size="30px" /></span>
					</div>
				</template>
				<template #content>
					<div class="content_value color_T1" @click="goToDetails(item.id, i.id, item.name, i.name)" v-for="i in item.subset">
						<VantLazyImg :src="i.icon" class="pl_25"></VantLazyImg>
						<span class="ellipsis">{{ i.name }}</span>
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
const dataList: any = ref([]);
const hasOneOpen = (index) => {
	if (currentOpenIndex.value === index) {
		return (currentOpenIndex.value = -1);
	}
	currentOpenIndex.value = index;
};
onMounted(() => {
	showTutorialPreLayer();
});
const goToDetails = (categoryId, classId, categoryName, className) => {
	router.push({
		path: "/helpCenter/details",
		query: {
			categoryId,
			classId,
			categoryName,
			className,
		},
	});
};
const showTutorialPreLayer = () => {
	TutorialApi.showTutorialPreLayer().then((res) => {
		dataList.value = res.data;
	});
};
const updateOpen = (index) => {
	if (!dataList.value[index].id) {
		router.push({
			path: "/helpCenter/details",
			query: {
				code: dataList.value[index].code,
				className: dataList.value[index].name,
			},
		});
	} else {
		currentOpenIndex.value = index;
	}
};
</script>

<style lang="scss" scoped>
.content {
	@include themeify {
		background: themed(BG3);
		border: none;
		border-radius: 20px;
	}

	img {
		width: 32px;
		height: 32px;
		margin-right: 16px;
	}
	.content_header {
		padding: 0 24px;
		height: 88px;

		@include themeify {
			color: themed(TB);
		}
	}
	.isOpen {
		.content_header {
			@include themeify {
				color: themed(Theme);
			}
		}
	}
	.content_value {
		height: 88px;
		box-sizing: border-box;
		line-height: 64px;
		padding: 12px 24px;
		display: flex;
		align-items: center;
		@include themeify {
			background: themed(Tag1);
		}
	}
}
</style>
