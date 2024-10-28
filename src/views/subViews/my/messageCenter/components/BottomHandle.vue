<template>
	<div class="bottom-handle">
		<van-button class="read" @click="handleEmit('readAll')">一键已读</van-button>
		<van-button class="delete" @click="handleEmit('delAll')">全部删除</van-button>
	</div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
	(e: 'delAll'): void;
	(e: 'readAll'): void;
}>();
type EmitKeys = 'delAll' | 'readAll';
const handleEmit = (key: EmitKeys) => {
	emits(key as keyof typeof emits)
}
</script>

<style scoped lang="scss">
.bottom-handle {
	height: 159px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 24px 24px 0 24px;

	@include themeify {
		color: themed("Theme");
		background: themed("BG4");
	}

	border-radius: 24px 24px 0px 0px;
	gap: 26px;

	.van-button {
		height: 86px;
		border: 2px solid var(--Theme-P, #FF284B);
	}

	.read {
		background-color: transparent;

		@include themeify {
			color: themed("Theme");
		}
	}

	.delete {
		color: #fff;

		@include themeify {
			background-color: themed("Theme");
		}
	}
}
</style>
