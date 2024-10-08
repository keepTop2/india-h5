<template>
	<div class="vantNavBar_box">
		<van-nav-bar
			class="vantNavBar"
			:fixed="fixed"
			:placeholder="placeholder"
			:safe-area-inset-top="safeAreaInsetTop"
			:left-text="leftText"
			:title="title"
			:right-text="rightText"
			:left-arrow="leftArrow"
			@click-left="onClickLeft"
			@click-right="onClickRight"
		>
			<template #left>
				<span v-if="leftText">{{ leftText }}</span>
				<slot v-else-if="leftArrow" name="left">
					<div class="back">
						<SvgIcon iconName="vantNavBar/back" />
					</div>
				</slot>
			</template>
			<template #title>
				<span v-if="title">{{ title }}</span>
				<slot v-else name="title"></slot>
			</template>
			<template #right>
				<span class="rightText" v-if="rightText">{{ rightText }}</span>
				<slot v-else name="right">
					<SvgIcon v-if="closeIcon" iconName="close" />
				</slot>
			</template>
		</van-nav-bar>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onClickRight", "onClickLeft"]);

defineProps({
	leftText: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		default: "",
	},
	rightText: {
		type: String,
		default: "",
	},
	closeIcon: {
		type: Boolean,
		default: false,
	},
	fixed: {
		type: Boolean,
		default: true,
	},
	placeholder: {
		type: Boolean,
		default: true,
	},
	safeAreaInsetTop: {
		type: Boolean,
		default: true,
	},
	leftArrow: {
		type: Boolean,
		default: true,
	},
});
//点击左侧
const onClickLeft = () => {
	emit("onClickLeft");
};

//点击右侧
const onClickRight = () => {
	emit("onClickRight");
};
</script>

<style lang="scss" scoped>
@mixin flex_align_center {
	display: flex;
	align-items: center;
}

.back {
	width: 36px;
	height: 36px;
	@include themeify {
		color: themed("TB");
	}
	svg {
		width: 100%;
		height: 100%;
	}
}

.service_icon {
	width: 45px;
	height: 45px;
}

.rightText {
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 400;
	line-height: 38px;
	@include themeify {
		color: themed("Tag2-P");
	}
}

.vantNavBar_box {
	height: 88px;
	overflow: hidden;
}
.vantNavBar {
	width: 100%;
	height: 88px !important;
	@include themeify {
		box-shadow: 0px 4px 8px 0px themed("shadow2");
		background-color: themed("BG1");
		color: themed("TB");
		position: fixed !important;
		z-index: 10;
	}
}
:deep(.van-hairline--bottom:after) {
	border: 0;
}
:deep(.van-nav-bar) {
	background: none;
}

:deep(.van-nav-bar__content) {
	height: 88px !important;
}

:deep(.van-nav-bar__title) {
	color: unset;
	font-size: 32px;
}

:deep(.van-nav-bar__left) {
	padding-left: 28px;

	// align-items: end;
}

:deep(.van-nav-bar--fixed) {
	position: fixed !important;
}
</style>
