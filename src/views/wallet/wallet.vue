<template>
	<div>
		<VantNavBar :title="$t(`VantNavBar['钱包']`)" @onClickLeft="onClickLeft">
			<template v-slot:left>
				<SvgIcon class="collapse_icon" iconName="common/collapse_icon" />
			</template>
		</VantNavBar>
	</div>
</template>

<script setup lang="ts">
import pubsub from "/@/pubSub/pubSub";
const onClickLeft = () => {
	// 发布事件
	pubsub.publish("onCollapseMenu");
};
</script>

<style scoped lang="scss">
.collapse_icon {
	width: 64px;
	height: 64px;
}
</style>
