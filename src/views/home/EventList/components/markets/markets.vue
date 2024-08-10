<template>
	<div class="content">
		<capot :market="markets?.[5]" />
		<concede :market="markets?.[1]" />
		<FFSize :market="markets?.[3]" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 独赢
import capot from "./capot.vue";
// 让球、让分
import concede from "./concede.vue";
// 全场大小
import FFSize from "./FFSize.vue";

const props = defineProps({
	markets: {
		type: Object,
		required: true,
	},
});

onMounted(() => {
	console.log("Component mounted");
});
</script>

<style scoped lang="scss">
.content {
}
</style>
