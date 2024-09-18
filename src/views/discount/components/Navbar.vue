<template>
	<div>
		<div class="navBar_conatiner">
			<VantTabs v-model="value" :swipeThreshold="3" @clickTab="onChangeNavBar" shrink>
				<template #van-tab>
					<van-tab v-for="(item, index) in tabList" :key="index" :title="item.value" :name="item.code" />
				</template>
			</VantTabs>
		</div>

		<!-- <div class="navBar_Placeholder"></div> -->
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onChangeNavBar", "update:active"]);

const props = withDefaults(
	defineProps<{
		tabList?: Array<any>;
		active?: string | number;
	}>(),
	{
		tabList: () => [],
		active: "",
	}
);

const value = computed({
	get() {
		return props.active;
	},
	set(value) {
		emit("update:active", value);
	},
});

const onChangeNavBar = () => {
	emit("onChangeNavBar");
};
</script>

<style lang="scss" scoped>
.navBar_conatiner.van-tabs {
	@include themeify {
		background: themed("BG1");
	}
}

:deep(.van-tabs__wrap) {
	height: 68px;
}

.navBar_conatiner:deep(.van-tabs__nav) {
	padding: 0 !important;
	@include themeify {
		background: themed("BG1");
	}
}

:deep(.van-tab) {
	@include themeify {
		color: themed("T1");
	}
	padding: 0 30px;
	/* Text1-文本1 */
	font-family: "PingFang SC";
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	line-height: 34px; /* 141.667% */
}

.navBar_conatiner:deep(.van-tab--active) {
	border-radius: 8px;
	font-weight: 500 important;
	font-size: 30px;
	@include themeify {
		color: themed("Theme");
		background: themed("BG3");
	}

	/* Text1-文本1 */
	font-family: "PingFang SC";
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	line-height: 34px; /* 141.667% */
}

:deep(.van-tabs__line) {
	display: none;
}

.navBar_conatiner {
	// width: 100%;
	// position: fixed;
	// top: 39px;
	// z-index: 10 !important;
}

.navBar_Placeholder {
	// height: 32px;
}
</style>
