<template>
	<iframe class="ifrmeContainerRef" ref="videoFrame" :src="state.source" frameborder="0" scrolling="no" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import GameApi from "/@/api/venueHome/games";
import Common from "/@/utils/common";
import qs from "qs";
import { showToast } from "vant";
const state: any = reactive({
	source: "",
	userAccount: "",
	type: "",
});
const route = useRoute();

onMounted(() => {
	const params = route.query;
	GameApi.gameLogin(params).then((res: any) => {
		if (res.code === 10000) {
			const { source, userAccount, type } = res.data;

			switch (type) {
				case "url": {
					state.source = source;
					state.userAccount = userAccount;
					state.type = type;
					break;
				}
				case "html": {
					// 将HTML编码的文本字符串转换为Blob对象
					const blob: any = new Blob([source], { type: "text/html" });
					// 将Blob对象作为iframe的源
					state.source = URL.createObjectURL(blob);
					// window.open(state.source, "_blank");
					// window.open(state.source, "_self");
					state.userAccount = userAccount;
					state.type = type;
					break;
				}
				case "token": {
					const params = {
						session_id: source,
						lang: "zh-CN",
						login_id: userAccount,
					};
					const url = Common.getUrl();
					state.source = url + `/api/cash/auth?${qs.stringify(params)}`;
					state.userAccount = userAccount;
					state.type = type;
					break;
				}
				default:
					break;
			}
			console.log(state);
		} else {
			showToast(res.message);
		}
	});
});
</script>

<style scoped>
.ifrmeContainerRef {
	width: 100vw;
	height: 100vh;
}
</style>
