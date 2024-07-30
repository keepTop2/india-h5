<template lang="">
	<div class="backToTop" v-show="showButton">
		<SvgIcon @click="backToTop" iconName="common/arrowTop" class="color_Theme" />
		<span class="color_Tag1 fs_22">TOP</span>
	</div>
</template>
<script setup>
const showButton = ref(false);
const handleScroll = () => {
	showButton.value = window.scrollY > 100;
};
const backToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>
<style lang="scss" scoped>
.backToTop {
	display: flex;
	width: 80px;
	height: 80px;
	padding: 22px 17px 6px 18px;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	gap: 5.001px;
	flex-shrink: 0;
	border-radius: 28px;
	background: rgba(255, 228, 228, 0.8);
	box-sizing: border-box;
	backdrop-filter: blur(3px);
	position: fixed;
	bottom: 200px;
	right: 24px;
	z-index: 2;
	svg {
		@include themeify {
			stroke: themed("Tag1");
		}
	}
}
</style>
