<template>
	<div class="card">
		<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
		<div class="title mb_10">{{ title }}</div>
		<div class="items">
			<div class="item" v-for="(item, index) in data" :key="index" @click="onCheck(item)">
				<div class="mark">+{{ 10 }}%</div>
				<VantLazyImg class="picture" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
				<div class="label">{{ item.name }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		title?: string;
		data: [];
	}>(),
	{
		title: "",
	}
);

const emit = defineEmits(["check"]);

const onCheck = (item: any) => {
	emit("check", item);
};
</script>

<style scoped lang="scss">
.card {
	position: relative;
	padding: 24px;
	border-radius: 16px;
	@include themeify {
		background: themed("BG3");
	}

	.card-tag {
		position: absolute;
		left: 0;
	}

	.title {
		@include themeify {
			color: themed("TB");
		}
		font-size: 30px;
		font-weight: 500;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 20px 12px;

		.item {
			position: relative;
			width: 210px;
			border-radius: 8px;
			border: 2px solid;
			@include themeify {
				border-color: themed("Line");
			}
			overflow: hidden;
			box-sizing: border-box;

			.mark {
				position: absolute;
				top: 0px;
				right: 0px;
				width: 83px;
				height: 33px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom-left-radius: 8px;
				@include themeify {
					background-color: themed("Theme");
					color: themed("TB");
				}
				font-size: 22px;
				font-weight: 500;
				z-index: 1;
			}

			.picture {
				width: 210px;
				height: 100px;
			}

			.label {
				padding: 6px 0px;
				@include themeify {
					color: themed("TB");
				}
				text-align: center;
				font-size: 26px;
				font-weight: 500;
			}
		}
	}
}
</style>
