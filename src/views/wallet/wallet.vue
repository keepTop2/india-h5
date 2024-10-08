<template>
	<div>
		<!-- <div class="tabs">
			<div :class="item.path != route.path ? 'tab' : 'tab_active'" v-for="(item, index) in tabList" :key="index" @click="router.push(item.path)">{{ item.name }}</div>
		</div> -->
		<router-view v-slot="{ Component }">
			<keep-alive :max="10">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
</template>

<script setup lang="ts">
import pubsub from "/@/pubSub/pubSub";
</script>

<style scoped lang="scss">
.collapse_icon {
	width: 64px;
	height: 64px;
}
.tabs {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	margin-top: 24px;
	padding: 0px 24px;

	.tab {
		flex: 1;
		min-width: 218px;
		height: 68px;
		display: flex;
		align-items: center;
		justify-content: center;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
	}

	.tab_active {
		flex: 1;
		min-width: 218px;
		height: 68px;
		display: flex;
		align-items: center;
		justify-content: center;
		@include themeify {
			color: themed("Theme");
			background-color: themed("BG3");
		}
		border-radius: 12px;
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
	}
}
</style>
