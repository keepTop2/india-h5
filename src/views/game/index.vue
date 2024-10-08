<template>
	<div>
		<div class="mt_30 mb_28 Text1 fs_14 curp">赌场>游戏供应商><span class="Text_s">供应商名称</span></div>
		<iframe class="ifrmeContainerRef" ref="videoFrame" :src="state.source" frameborder="0" scrolling="no" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
	</div>
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
