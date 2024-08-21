<template>
	<div>
		<img
			v-for="v in redEnvelopeList"
			src="https://cdn.pixabay.com/photo/2022/04/12/07/05/red-envelope-7127397_1280.png"
			alt=""
			class="img"
			:key="v"
			:style="{
				left: `${Math.random() * maxLeft}px`,
				animationDuration: `${Math.random() * 2 + 1}s`,
			}"
		/>
	</div>
</template>

<script setup lang="ts">
const redEnvelopeList = ref(Array.from(new Array(20)));
const maxLeft = ref(0);
onMounted(() => {
	maxLeft.value = document.body.offsetWidth;
	// redEnvelopeList.value = [];
});
</script>

<style lang="scss" scoped>
.img {
	position: fixed;
	top: -100px;
	width: 40px;
	animation: run infinite linear;
}

@keyframes run {
	0% {
		transform: translateY(0);
	}

	100% {
		transform: translateY(150vh);
	}
}
</style>
