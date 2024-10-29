<template>
	<van-popup v-model:show="visible" style="width: 100%; background: transparent">
		<div class="announcement-container">
			<div class="title">
				<div v-html="item.noticeTitleI18nCode"></div>
				<SvgIcon iconName="common/close" size="4.6" class="close" @click="visible = false" />
			</div>
			<div class="line"></div>
			<div class="content">
				<div v-html="item.messageContentI18nCode"></div>
			</div>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
interface Notice {
	noticeTitleI18nCode: string; // 标题
	messageContentI18nCode: string; // 内容
}

defineProps<{
	item: Notice;
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
      top: 50%;
      transform: translateY(-50%);
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
