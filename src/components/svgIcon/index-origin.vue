<template>
	<svg :width="`${props.size}vw`" :height="props.height ? `${props.height}vw` : `${props.size}vw`" :class="'svg-icon' + ($attrs.iconClass ? $attrs.iconClass : '')" aria-hidden="true">
		<use class="svg-use" :href="'#' + $attrs.iconName" />
	</svg>
</template>

<script setup lang="ts">
// import { defineComponent, computed } from "vue";
// import ids from "virtual:svg-icons-names";

const props = withDefaults(
	defineProps<{
		size?: string | number;
		height?: string | number;
	}>(),
	{
		size: "4.266667",
	}
);
</script>

<style scoped>
.svg-icon {
	/* fill: currentColor; */
	vertical-align: middle;
}
</style>
