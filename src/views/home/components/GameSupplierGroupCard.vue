<template>
	<div class="SupplierGroup m32">
		<h3 class="title">
			<span>
				<SvgIcon iconName="gys" alt="" />
				{{ $t('home["游戏供应商"]') }}
			</span>
			<div class="router_link" @click="routerLink(supplierGroupCard)">{{ $t('home["查看全部"]') }}</div>
		</h3>
		<div class="supplier">
			<template v-for="(CardItem, cIndex) in supplierGroupCard?.gameInfoList" :key="cIndex">
				<GameSupplierCard :CardItem="CardItem" v-if="cIndex < 3" @cardClick="onSupplierCardClick" />
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GameSupplierCard } from "./index";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const props = withDefaults(defineProps<{ supplierGroupCard?: any }>(), {
	supplierGroupCard: {
		id: null,
		name: null,
		iconCode: "",
		type: "VENUE",
		gameInfoList: [],
	},
});
const routerLink = (menuItem: any) => {
	if (menuItem?.id) {
		router.push({ name: "supplier", query: { id: menuItem.id, name: menuItem.name } });
	}
};

const onSupplierCardClick = (item: any) => {
	const routeParam = {
		name: "supplierDetail",
		path: "/supplierDetail",
		query: { id: item.id, name: item.name },
	};
	router.push(routeParam);
};
</script>

<style scoped lang="scss">
.SupplierGroup {
	&.m32 {
		margin: 32px 0;
	}
	@include themeify {
		.line {
			height: 1px;
			background-color: themed("Line");
		}
		.title {
			font-size: 28px;
			font-weight: 400;
			color: themed("TB");
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32px;
			span {
				display: flex;
				align-items: center;
				gap: 10px;
			}

			a,
			.router_link {
				color: themed("Theme");
			}
			img {
				width: 30px;
				height: 30px;
				margin-right: 12px;
			}
		}
	}
}

.supplier {
	display: grid;
	grid-template-columns: repeat(3, 31.5%);
	justify-self: center;
	grid-column: 1/-1;
	// justify-items: center;
	grid-column-gap: 21px;
	grid-row-gap: 21px;
}
</style>
