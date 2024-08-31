<template>
	<div class="content">
		<capot :market="markets?.[5]" :sportType="sportType" />
		<concede :market="markets?.[1]" :sportType="sportType" />
		<FFSize :market="markets?.[3]" :sportType="sportType" />
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
	sportType: {
		type: Number,
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
