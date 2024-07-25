<template>
	<div class="gameSupplierCard" @click="onCardClick">
		<div class="img_plan">
			<VantLazyImg class="icon" :src="imgUrl" />
		</div>
	</div>
</template>
<script setup lang="ts">
const emit = defineEmits(["cardClick"]);
//商人卡片
interface SupplierCard {
	width?: number;
	height?: number;
	CardItem?: any;
}
const props = withDefaults(defineProps<SupplierCard>(), {
	width: 220,
	height: 82,
	CardItem: {
		id: "10",
		name: "PG",
		pcIcon: "",
		status: 1,
		remark: null,
		sort: null,
		maintenanceStartTime: 1713283200000,
		maintenanceEndTime: 1711987200000,
		collect: false,
	},
});
const imgUrl = computed(() => {
	const url = props.CardItem.pcIcon || props.CardItem.iconCode;
	return url;
});

const onCardClick = () => {
	emit("cardClick", props.CardItem);
};
</script>

<style scoped lang="scss">
.gameSupplierCard {
	display: flex;
	// width: 220px;
	// width: v-bind('props.width+"px"');
	// height: v-bind('props.height+"px"');
	// min-width: 220px;
	height: 80px;
	padding: 19px 45px;
	justify-content: center;
	align-items: center;
	/* background: var(--Bg1-1, #24262b); */
	box-sizing: border-box;
	cursor: pointer;
	overflow: hidden;
	border-radius: 12px;
	@include themeify {
		background-color: themed("BG3");
	}
	.img_plan {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
