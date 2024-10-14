<template>
	<iframe class="ifrmeContainerRef" ref="videoFrame" :src="state.source" frameborder="0" scrolling="no" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import { onBeforeRouteLeave, useRoute } from "vue-router";
const state: any = reactive({
	source: "",
	userAccount: "",
	type: "",
});
const route = useRoute();

onMounted(() => {
	state.source = route.query.source;
});
</script>

<style scoped>
.ifrmeContainerRef {
	width: 100vw;
	height: 100vh;
}
</style>
