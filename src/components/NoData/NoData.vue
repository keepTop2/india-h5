<template>
	<div class="nodata_container">
		<div class="center">
			<div class="icon" v-if="themed == 'default'">
				<SvgIcon :iconName="iconSvg" size="28" />
			</div>
			<div class="icon" v-if="themed == 'dark'">
				<SvgIcon :iconName="iconSvgLight" size="28" />
			</div>
		</div>
		<p class="nodata_text">
			<span class="title">{{ title || $t(`common['哎呀']`) }} </span><span class="text"> {{ center || $t(`common['暂无数据']`) }}</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import { useThemesStore } from "/@/store/modules/themes";

const ThemesStore = useThemesStore();
const themed = computed(() => {
	return ThemesStore.getTheme;
});

/**无数据接口 */
interface NoneData {
	/**svg名称 */
	iconSvg?: string;
	iconSvgLight?: string;
	/** 标题 */
	title?: string;
	/**内容 */
	center?: string;
}

withDefaults(defineProps<NoneData>(), {
	iconSvg: "kzt_img",
	iconSvgLight: "kzt_img_light",
	title: "",
	center: "",
});
</script>

<style lang="scss" scoped>
.nodata_container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);

	img {
		width: 460px;
	}
	.nodata_text {
		margin-top: 24px;
		// color: var(--T3-P, #687083);
		text-align: center;
		/* Text1-文本1 */
		font-family: "PingFang SC";
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 34px; /* 141.667% */
		@include themeify {
			color: themed("T3-P");
		}
	}
}
</style>
