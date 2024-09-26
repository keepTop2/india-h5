<template>
	<div class="assets-container">
		<div class="lists">
			<div class="header">
				<div class="value">{{ $t('wallet["申请时间"]') }}</div>
				<div class="value">{{ $t('wallet["类型"]') }}</div>
				<div class="value">{{ $t('wallet["金额"]') }}</div>
				<div class="value">{{ $t('wallet["状态"]') }}</div>
			</div>

			<div ref="cellList" class="cell-list">
				<div class="cell" v-for="(item, index) in datalist" :key="index">
					<div class="value">{{ item.data }}</div>
					<div class="value">{{ item.type }}</div>
					<div class="value">
						<SvgIcon class="icon" iconName="home/bi_btc" />
						<span>{{ item.num }}</span>
					</div>
					<div class="value">
						{{ item.status }}
						<SvgIcon class="arrow" iconName="common/arrow" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const datalist = [
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "处理中" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
	{ data: "2023/1/30 14:12:11", type: "奖金", num: "8.77", status: "成功" },
];

const cellList = ref();

onMounted(() => {
	const clientHeight = cellList.value.clientHeight;
	cellList.value.style.maxHeight = clientHeight;
});
</script>

<style scoped lang="scss">
.assets-container {
	padding: 24px;

	.lists {
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
		}
		border-radius: 8px;
		overflow: hidden;

		.header {
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			@include themeify {
				background-color: themed("BG4");
			}
			box-sizing: border-box;

			.value {
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0px 10px;
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 26px;
				font-weight: 400;
				box-sizing: border-box;
			}
			.value:nth-child(1) {
				justify-content: left;
				padding-left: 24px;
			}
		}

		.cell-list {
			overflow: auto;
			display: grid;
			gap: 12px;
			padding: 12px 0px;
			.cell {
				height: 72px;
				display: flex;
				align-items: center;
				.value {
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0px 10px;
					font-size: 24px;
					font-weight: 400;
					box-sizing: border-box;
					font-family: "PingFang SC";
				}

				.value:nth-child(1) {
					@include themeify {
						color: themed("T1");
					}

					text-align: left;
					padding-left: 24px;
					line-height: 34px;
				}
				.value:nth-child(2) {
					@include themeify {
						color: themed("T1");
					}
				}
				.value:nth-child(3) {
					gap: 10px;
					@include themeify {
						color: themed("TB");
					}
					.icon {
						width: 28px;
						height: 28px;
					}
				}
				.value:nth-child(4) {
					gap: 10px;
					@include themeify {
						color: themed("Theme");
					}

					justify-content: end;
					padding-right: 24px;
					.arrow {
						width: 20px;
						height: 20px;
					}
				}
			}
		}
	}
}
</style>
