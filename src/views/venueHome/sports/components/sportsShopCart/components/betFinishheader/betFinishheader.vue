<template>
	<div class="header-result">
		<div class="header-title">
			<img v-if="props.betStatus == 0" :src="success_icon" />
			<img v-if="props.betStatus == 1" :src="close_icon" />
			<span v-if="props.betStatus == 0">{{ $t('sports["投注成功"]') }}</span>
			<span v-if="props.betStatus == 1">{{ $t('sports["投注失败"]') }}</span>
		</div>
		<div class="header-right">
			<SvgIcon iconName="/venueHome/sports/svg/close" size="3.466667" @click="clearCart" />
		</div>
	</div>
</template>

<script setup lang="ts">
import success_icon from "/@/assets/zh-CN/default/venueHome/sports/success_icon.png";
import close_icon from "/@/assets/zh-CN/default/venueHome/sports/close_icon.png";

const props = withDefaults(
	defineProps<{
		betStatus: number;
	}>(),
	{}
);

const emit = defineEmits(["close"]);

const clearCart = () => {
	emit("close");
};
</script>

<style scoped lang="scss">
.header-result {
	position: relative;
	width: 100%;
	height: 82px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 24px;
	border-radius: 16px 16px 0px 0px;
	@include themeify {
		background-color: themed("BG1");
		border-color: themed("Line");
	}
	border-bottom: 1px solid;
	box-sizing: border-box;

	.header-title {
		display: flex;
		align-items: center;
		img {
			width: 40px;
			height: 40px;
		}
		span {
			margin-left: 20px;
			@include themeify {
				color: themed("Theme");
			}
			font-family: "PingFang SC";
			font-size: 32px;
			font-weight: 500;
		}
	}

	.header-right {
		position: absolute;
		top: 50%;
		right: 30px;
		transform: translate(0, -50%);
	}
}
</style>
