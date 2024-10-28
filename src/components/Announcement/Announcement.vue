<template>
	<van-popup v-model:show="visible" style="width: 100%; background: transparent">
		<div class="announcement-container">
			<div class="title">
				{{ title }}
				<SvgIcon iconName="common/close" size="4.6" class="close" @click="visible = false" />
			</div>
			<div class="line"></div>
			<div class="content">
				{{ content }}
			</div>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	content: string;
}>();

const visible = defineModel({ type: Boolean, default: true });
</script>

<style scoped lang="scss">
.announcement-container {
	//width: 100%;
	background: var(--BG1-N, #222324);
	border-radius: 24px;
	padding: 24px;
	text-align: center;
	font-family: "PingFang SC";

	.title {
		color: var(--TB-N, #fff);
		font-size: 30px;
		position: relative;

		.close {
			position: absolute;
			right: 24px;
		}
	}

	.line {
		height: 1px;
		background: var(--Line-N, #343434);
		margin: 24px 0;
	}

	.content {
		color: var(--T1-N, #999ba0);
		font-family: "PingFang SC";
		font-size: 26px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-align: left;
	}
}
</style>
