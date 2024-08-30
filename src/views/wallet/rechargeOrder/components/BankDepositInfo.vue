<template>
	<div class="container">
		<div class="header-card">
			<div class="row1">{{ $t('rechargeOrder["您已发起充值申请，请在"]') }}<span class="date"> 14分30秒 </span>{{ $t('rechargeOrder["完成支付"]') }}</div>
			<div class="value mt_24">
				$ <span>{{ 100.0 }}</span>
			</div>
			<div class="row2 mt_20">{{ $t('rechargeOrder["您的付款金额务必与订单金额一致"]') }}</div>
		</div>

		<div class="main-card mt_12">
			<div class="piece1">
				<div class="header">
					<div class="icon">1</div>
					<div class="label">{{ $t('rechargeOrder["等待付款"]') }}</div>
				</div>
				<p class="text">
					{{ $t('rechargeOrder["1.支付完成后，"]') }}<span>{{ $t('rechargeOrder["请准备好付款截图，再点击【我已付款】 并上传截图"]') }}</span
					>{{ $t('rechargeOrder["将更快到账。"]') }}
				</p>
				<p class="text">{{ $t('rechargeOrder["2.为了您的充值快速到账，请务必再倒计时内完成支付"]') }}</p>
			</div>

			<div class="piece2">
				<div class="cell">
					<div class="label">{{ $t('rechargeOrder["收款账户名"]') }}</div>
					<div class="value">100</div>
					<SvgIcon iconName="copy" />
				</div>
				<div class="cell">
					<div class="label">{{ $t('rechargeOrder["银行账号"]') }}</div>
					<div class="value">100</div>
					<SvgIcon iconName="copy" />
				</div>
				<div class="cell">
					<div class="label">{{ $t('rechargeOrder["银行名称"]') }}</div>
					<div class="value">100</div>
					<SvgIcon iconName="copy" />
				</div>
				<div class="cell">
					<div class="label">{{ $t('rechargeOrder["充值金额"]') }}</div>
					<div class="value">100</div>
					<SvgIcon iconName="copy" />
				</div>
			</div>

			<div class="piece3">
				<div class="header">
					<div class="icon">2</div>
					<div class="label">{{ $t('rechargeOrder["等待付款"]') }}</div>
				</div>
				<div class="tips">{{ $t('rechargeOrder["若您严格按照付款流程操作，请耐心等待充值到账。"]') }}</div>
			</div>
		</div>

		<div class="order-card">
			<SvgIcon class="card-tag" iconName="/wallet/line" :size="0.8" :height="5.333333" />
			<div class="herder mb_10">
				<span class="title">{{ $t('rechargeOrder["订单信息"]') }}</span>
			</div>
			<div class="cell">
				<div class="label">{{ $t('rechargeOrder["订单号"]') }}</div>
				<div class="value">100</div>
			</div>
			<div class="cell">
				<div class="label">{{ $t('rechargeOrder["充值方式"]') }}</div>
				<div class="value">100</div>
			</div>
			<div class="cell">
				<div class="label">{{ $t('rechargeOrder["充值时间"]') }}</div>
				<div class="value">100</div>
			</div>
		</div>

		<div class="footer">
			<Button @click="onPayment">我已付款</Button>
		</div>

		<Dialog :title="$t(`rechargeOrder['上传凭证']`)" :width="92" :showConfirmButton="false" :showCancelButton="false" :show="dialogShow">
			<template #main>
				<div class="dialog-main">
					<div class="dialog-text mb_24">
						<span class="red">*</span>
						<span>{{ $t('rechargeOrder["请您上传该笔充值付款回执单的完成信息截图1张"]') }}</span>
						<span class="theme">{{ $t('rechargeOrder["查看图示"]') }}</span>
					</div>

					<van-uploader v-model="fileList" multiple :max-count="1">
						<template #default>
							<div class="uploader">
								<SvgIcon iconName="uploader" :size="17.333333" />
							</div>
						</template>
						<template #preview-delete>
							<SvgIcon iconName="uploader_delete" />
						</template>
					</van-uploader>

					<div class="dialog-text mt_24 mb_24">
						<span>{{ $t('rechargeOrder["非必填"]') }}</span>
						<span class="theme">{{ $t('rechargeOrder["查看图示"]') }}</span>
					</div>

					<van-uploader v-model="fileList2" multiple :max-count="4">
						<template #default>
							<div class="uploader">
								<SvgIcon iconName="uploader" :size="17.333333" />
							</div>
						</template>
						<template #preview-delete>
							<SvgIcon iconName="uploader_delete" />
						</template>
					</van-uploader>

					<div class="dialog-footer mt_24">
						<button @click="cancel">{{ $t('rechargeOrder["取消"]') }}</button>
						<button @click="confirm" class="theme">{{ $t('rechargeOrder["提交"]') }}</button>
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
const dialogShow = ref(false);
const fileList = ref([]);
const fileList2 = ref([]);

// 点击我已付款
const onPayment = () => {
	dialogShow.value = true;
};

// 点击取消
const cancel = () => {
	dialogShow.value = false;
};

// 点击确认
const confirm = () => {
	dialogShow.value = false;
};
</script>

<style scoped lang="scss">
.container {
	padding: 24px;

	.header-card {
		padding: 24px;
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
		}
		text-align: center;

		.row1 {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 30px;
			font-weight: 400;
			line-height: 40px;
			.date {
				@include themeify {
					color: themed("Warn-P");
				}
				font-family: "PingFang SC";
				font-size: 32px;
				font-weight: 400;
				line-height: 40px;
			}
		}
		.value {
			@include themeify {
				color: themed("Theme");
			}
			font-family: "DIN Alternate";
			font-size: 48px;
			font-weight: 700;
			line-height: normal;
		}
		.row2 {
			@include themeify {
				color: themed("Warn-P");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
	}

	.main-card {
		// padding: 24px;
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
		}
		.piece1 {
			padding: 24px;
			padding-bottom: 12px;
			border-bottom: 1px solid;
			@include themeify {
				border-color: themed("Line");
			}
			.header {
				display: flex;
				align-items: center;
				.icon {
					width: 44px;
					height: 44px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 12px;
					border-radius: 29px;
					@include themeify {
						background: themed("Theme");
						color: themed("TB");
					}
					font-size: 28px;
					font-weight: 500;
				}
				.label {
					@include themeify {
						color: themed("TB");
					}
					font-size: 28px;
					font-weight: 500;
				}
			}
			.text {
				padding: 0px 30px;
				margin-top: 12px;
				@include themeify {
					color: themed("TB");
				}
				font-size: 24px;
				font-weight: 400;
				line-height: 34px;
				span {
					@include themeify {
						color: themed("Warn-P");
					}
				}
			}
		}

		.piece2 {
			padding: 12px 24px;
			border-bottom: 1px solid;
			@include themeify {
				border-color: themed("Line");
			}
			.cell {
				display: flex;
				margin-top: 24px;
				.label {
					width: 180px;
					@include themeify {
						color: themed("T1");
					}
					font-family: "PingFang SC";
					font-size: 28px;
					font-weight: 400;
				}
				.value {
					flex: 1;
					text-align: right;
					margin-right: 16px;
					@include themeify {
						color: themed("TB");
					}
					font-size: 28px;
					font-weight: 500;
				}
			}
			.cell:first-child {
				margin-top: 0px;
			}
		}

		.piece3 {
			padding: 24px;
			.header {
				display: flex;
				align-items: center;
				.icon {
					width: 44px;
					height: 44px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 12px;
					border-radius: 29px;
					@include themeify {
						background: themed("Tag2-P");
						color: themed("TB");
					}
					font-size: 28px;
					font-weight: 500;
				}
				.label {
					@include themeify {
						color: themed("TB");
					}
					font-size: 28px;
					font-weight: 500;
				}
			}
			.tips {
				margin-top: 12px;
				@include themeify {
					color: themed("TB");
				}
				text-align: center;
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
			}
		}
	}

	.order-card {
		position: relative;
		padding: 24px;
		margin-top: 24px;
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
		}

		.card-tag {
			position: absolute;
			left: 0;
		}

		.herder {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				@include themeify {
					color: themed("TB");
				}
				font-size: 30px;
				font-weight: 500;
			}
		}

		.cell {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12px;

			.label {
				width: 180px;
				@include themeify {
					color: themed("T1");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
			}
			.value {
				flex: 1;
				text-align: right;
				margin-right: 16px;
				@include themeify {
					color: themed("TB");
				}
				font-size: 28px;
				font-weight: 400;
			}
		}
	}

	.footer {
		padding: 40px 30px;
	}
}

.dialog-main {
	padding: 24px;
	.dialog-text {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}

	.red {
		@include themeify {
			color: themed("Warn-P");
		}
	}
	.theme {
		@include themeify {
			color: themed("Theme");
		}
	}

	.dialog-footer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 70px;
		button {
			width: 220px;
			height: 64px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px;
			border-radius: 8px;
			border: 1px solid;
			@include themeify {
				border-color: themed("Tag2-P");
				background-color: unset;
				color: themed("T3-P");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}

		.theme {
			@include themeify {
				border-color: themed("Theme");
				background-color: themed("Theme");
				color: themed("TB");
			}
		}
	}

	.uploader {
		width: 130px;
		height: 130px;
		color: #798d9f;
	}
	:deep(.van-uploader) {
		display: block;
	}
	:deep(.van-uploader__wrapper) {
		gap: 24px;
	}
	:deep(.van-uploader__preview) {
		margin: 0;
	}
	:deep(.van-uploader__preview-image) {
		width: 130px;
		height: 130px;
		border-radius: 12px;
	}
	:deep(.van-uploader__preview-delete) {
		top: -16px;
		right: -16px;
	}
}
</style>
