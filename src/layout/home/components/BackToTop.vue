<template lang="">
	<div class="backToTop" v-show="showButton">
		<img src="./image.png" @click="backToTop" />
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
	position: fixed;
	bottom: 200px;
	right: 24px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;

	gap: 5.001px;
	flex-shrink: 0;
	border-radius: 28px;
	box-sizing: border-box;
	backdrop-filter: blur(3px);
	z-index: 2;
	img {
		height: 100px;
		width: 100px;
	}
	svg {
		@include themeify {
			stroke: themed("Tag1");
		}
	}
}
</style>
