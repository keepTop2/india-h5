<template>
	<div class="bottom-handle">
		<van-button class="read">一键已读</van-button>
		<van-button class="delete">全部删除</van-button>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bottom-handle {
	height: 159px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 24px 24px 0 24px;
	background: var(--BG7-NBG4-N, #343434);
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
