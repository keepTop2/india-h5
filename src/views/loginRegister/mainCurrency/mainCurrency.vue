<template>
	<div class="mainCurrency-container">
		<VantNavBar :title="$t(`VantNavBar['选择主货币']`)" @onClickLeft="onClickLeft" />
		<div class="selector">
			<FormInput v-model="state.value1" type="text" :placeholder="$t(`mainCurrency['请输入货币名称或简称']`)" />

			<div class="option mt_18">
				<div class="item" v-for="(item, index) in 11" :key="index">
					<span class="label">USD</span>
					<span class="value">(美元)</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const state = reactive({
	value1: "",
});

const onClickLeft = () => {
	window.history.back();
};
</script>

<style scoped lang="scss">
.mainCurrency-container {
	width: 100%;
	min-height: 100vh;
	font-family: "PingFang SC";
	@include themeify {
		background-color: themed("BG1");
	}

	.selector {
		padding: 32px 55px;

		.option {
			.item {
				height: 69px;
				display: flex;
				align-items: center;
				padding: 10px 24px;
				@include themeify {
					color: themed("TB");
				}
				font-size: 26px;
				font-weight: 400;
				border-bottom: 1px solid;
				@include themeify {
					border-color: themed("Line");
				}
				box-sizing: border-box;

				.value {
					margin-left: 16px;
				}
			}
		}
	}
}
</style>
