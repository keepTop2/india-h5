<template>
	<div class="container">
		<VantNavBar :title="$t(`VantNavBar['在线咨询']`)" @onClickLeft="onClickLeft" />
		<iframe v-if="url" :src="url" frameborder="0"></iframe>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const url = computed(() => route.query.url as string);

const onClickLeft = () => {
	console.log("12312312");

	router.go(-1);
};
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.vant-nav-bar {
	flex-shrink: 0; /* 确保导航栏高度固定，不被压缩 */
}

iframe {
	flex-grow: 1; /* 让 iframe 占据剩余空间 */
	width: 100%;
	border: none;
}
</style>
