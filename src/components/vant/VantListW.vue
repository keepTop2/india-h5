<!--
 * @Author: WangMingxin
 * @Description: 顶部下拉刷新；页面上拉自动加载数据；
-->
<template>
	<div ref="listControlRef" class="list_control" @touchstart="onTouchStart" @touchend="onTouchEnd" @touchmove="onTouchMove">
		<van-pull-refresh
			ref="vantPullRefreshRef"
			:head-height="headHeight"
			:pulling-text="pullingText"
			:loosing-text="loosingText"
			:loading-text="loadingText"
			:success-text="successText"
			:disabled="downFullDisable"
			v-model="isDownloading"
			@refresh="onRefresh"
			@change="onChange"
			class="pull-refresh_w"
		>
			<template #default>
				<van-list
					class="vantList_w"
					ref="vantListRef"
					v-model:loading="loading"
					v-model:error="error"
					:finished="finished"
					:loading-text="listLoadingText"
					:finished-text="finishedText"
					:error-text="errorText"
					:immediate-check="immediateCheck"
					:disabled="listDisabled"
					@load="onLoad"
				>
					<slot name="default"> 可拖动区域 </slot>
					<!-- 自定义底部加载中提示 -->
					<template #loading>
						<slot name="loading">
							<div class="loading_container">
								<!-- <div>
								<img class="loadingImg" :src="lodingGif" alt="" />
							</div> -->
								<span>{{ loadingText || $t(`common['加载中']`) }}</span>
							</div>
						</slot>
					</template>
					<!--自定义加载完成后的提示文案-->
					<template #finished>
						<slot name="finished">
							<div class="finished_container">
								<div class="noData" v-if="!loadedNumber">
									<NoData />
								</div>
								<span v-else>{{ finishedText || $t(`common['已经全部加载完毕']`) }}</span>
							</div>
						</slot>
					</template>
					<!--自定义加载失败后的提示文案-->
					<template #error>
						<slot name="error">
							<div class="error_container">
								<span>{{ errorText || $t(`common['请求失败']`) }}</span>
							</div>
						</slot>
					</template>
				</van-list>
			</template>

			<!-- 下拉提示插槽 -->
			<template #pulling>
				<slot name="pulling">
					<div>{{ loosingText || $t(`common['下拉即可刷新']`) }}</div>
				</slot>
			</template>
			<template #loosing>
				<slot name="loosing">
					<div>{{ loosingText || $t(`common['释放即可刷新']`) }}</div>
				</slot>
			</template>
			<!-- 加载中提示插槽 -->
			<template #loading>
				<slot name="loading">
					<div class="loading_container">
						<!-- <div>
						<img class="loadingImg" :src="lodingGif" alt="" />
					</div> -->
						<span>{{ loadingText || $t(`common['加载中']`) }}</span>
					</div>
				</slot>
			</template>
		</van-pull-refresh>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "update:listLoading", "update:error", "refresh", "change", "load"]);
const props = withDefaults(
	defineProps<{
		loadedNumber?: number; //已加载数据数量(用于页面内判断是否为空数据)
		pageSize?: number; //每页加载量
		scrollLoad?: Function; //滚动到底部时｜顶部下拉时，加载更多（下拉刷新）数据函数（传出：翻页/加载状态/数据完结状态/错误状态控制响应参数）
		//下拉过程提示文案
		pullingText?: string;
		//释放过程提示文案
		loosingText?: string;
		//加载过程提示文案
		loadingText?: string;
		//刷新成功提示文案
		successText?: string;
		//是否禁用下拉刷新
		// disabled?: boolean;
		//列表加载过程中的提示文案
		listLoadingText?: string;
		//加载完成后的提示文案
		finishedText?: string;
		//加载失败后的提示文案
		errorText?: string;
		//是否在初始化时立即执行滚动位置检查
		immediateCheck?: boolean;
		//顶部内容高度
		headHeight?: number;
	}>(),
	{
		// finished: false,
		pullingText: "",
		loosingText: "",
		loadingText: "",
		finishedText: "",
		errorText: "",
		immediateCheck: true,
		headHeight: 80,
	}
);

const listControlRef = ref();
const vantPullRefreshRef = ref();
const vantListRef = ref();
/** 初始化设置下拉容器高度 */
const initVantPullRefresh = () => {
	if (listControlRef.value) {
		// vantPullRefreshRef.value.$el.style.height = listControlRef.value.offsetHeight + "px";
		vantPullRefreshRef.value.$el.style.minHeight = listControlRef.value.offsetHeight + "px";
		let listHeight: number = 500;
		if (listControlRef.value.offsetHeight / 2 < 300) {
			listHeight = listControlRef.value.offsetHeight;
		} else {
			listHeight = listControlRef.value.offsetHeight / 2;
		}
		vantListRef.value.$el.style.minHeight = listHeight + "px";
	}
};
onMounted(() => {
	initVantPullRefresh();
});
onBeforeMount(() => {});

onBeforeUnmount(() => {});

//下拉刷新时触发
const onRefresh = () => {
	emit("refresh");
};
//拖动时或状态改变时触发
const onChange = () => {
	emit("change");
};
//下拉禁用
const downFullDisable = ref(true);
const isDownloading = ref(false);
const loading = ref(false);
const finished = ref(false);
const error = ref(false);
const noMore = computed(() => finished.value);
const listDisabled = computed(() => loading.value || noMore.value || error.value);
const pagesize = ref({
	pageSize: props.pageSize, //每页显示条目个数
	current: 1, //当前页
	total: 100, //总条数
});

watch(
	() => props?.pageSize,
	(newValue, oldValue) => {
		pagesize.value.pageSize = newValue;
	},
	{
		deep: true,
		immediate: true,
	}
);

watch(
	() => loading.value,
	(newValue, oldValue) => {
		if (!newValue) {
			isDownloading.value = newValue;
		}
	}
);

//获取数据；
//重置
const reset = () => {
	pagesize.value.current = 1;
	loading.value = false;
	finished.value = false;
	error.value = false;
	onLoad();
};

//滚动条与底部距离小于 offset 时触发
const onLoad = () => {
	if ((props as any).scrollLoad) {
		(props as any).scrollLoad(pagesize, loading, finished, error);
	}
	// emit("load");
};

const touch = ref({
	startY: 0,
	EndY: 0,
});
//默认touch移除
const touchEvent = (event: any) => {
	event.preventDefault();
};

/** 触摸开始 */
const onTouchStart = (event: any) => {
	touch.value.startY = event.changedTouches[0].pageY;

	const downInterval = window.screen.height / 2;
	if (touch.value.startY < downInterval) {
		document.addEventListener("touchmove", touchEvent, { passive: false });
		downFullDisable.value = false;
	}
};
/** 触摸结束 */
const onTouchEnd = (event: any) => {
	downFullDisable.value = true;
	document.removeEventListener("touchmove", touchEvent);
};
/** 触摸移动过程中 */
const onTouchMove = (event: any) => {};

defineExpose({ reset });
</script>

<style lang="scss" scoped>
.list_control {
	flex-shrink: 0;
	height: 100%;
	width: 100%;
	min-height: 100%;
	flex: 1;
	// display: flex;
	// flex-direction: column;
	.pull-refresh_w {
		height: 100%;
		width: 100%;
		min-height: 700px;
		flex: 1;
		flex-shrink: 0;
		// overflow-y: hidden;
		.vantList_w {
			min-height: 700px;
			.finished_container {
				.noData {
					// min-height: 700px;
				}
			}
		}
		.loading_container {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.loadingImg {
			width: 40px;
		}
	}
}
</style>
