<template>
	<div class="NoGameImg">
		<VantLazyImg :src="NoGameImg" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import NoGameImg from "/@/views/home/static/no_game_img.png";
/**
 * @description 无图片时展示
 */
const props = defineProps({
	type: {
		type: String,
		default: "",
	},
});

onMounted(() => {
	console.log("Component mounted");
});
</script>

<style scoped lang="scss">
.NoGameImg {
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
