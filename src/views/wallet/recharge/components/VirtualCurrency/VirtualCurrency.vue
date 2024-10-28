<template>
	<div class="main">
		<div class="header">
			<SvgIcon class="icon" iconName="wallet/line" />
			<span>{{ $t(`recharge['存款信息']`) }}</span>
		</div>
		<p class="tc text mt_16">{{ $t(`recharge['扫描或者复制获得地址进行转账']`) }}</p>
		<div class="qrcode">
			<QrcodeVue id="qrcode" :value="rechargeConfig.address" style="width: 100%; height: 100%" />
		</div>
		<div class="footer">
			<div class="label">{{ $t(`recharge['存款地址：']`) }}</div>
			<div class="address_info">
				<p>{{ rechargeConfig.address }}</p>
				<SvgIcon class="icon" iconName="common/copy2" @click="common.getInstance().copy(rechargeConfig.address)" />
			</div>
		</div>
	</div>

	<div class="tips">
		<div class="text">
			<span>1.{{ $t(`recharge['向该地址充值后，资金直接入账站点名称用户：']`) }}</span>
			<span class="text_2">{{ UserStore.userInfo.userAccount }}</span>
		</div>
		<div class="text">
			2.
			<i18n-t keypath="recharge['请勿向上述地址充值任何非USDT-TRC20的货币，否则将无法找回。']" :tag="'span'">
				<template v-slot:value>
					<span class="text_2" @click=""> {{ rechargeConfig.rechargeWay }} </span>
				</template>
			</i18n-t>
		</div>
		<div class="text">3. {{ $t(`recharge['当前汇率']`, { value: rechargeConfig.exchangeRate, currency: rechargeConfig.currencyCode }) }}</div>
		<div class="text">4.{{ $t(`recharge['具体到账金额以实际到账金额为准，少于10usdt无法上分。']`) }}</div>
	</div>

	<!-- <button @click="isModalVisible = true">!</button> -->
</template>

<script setup lang="ts">
import common from "/@/utils/common";
import QrcodeVue from "qrcode.vue";
import { useUserStore } from "/@/store/modules/user";
const UserStore = useUserStore();
const props = defineProps({
	rechargeWayData: {
		type: Object,
		default: {},
	},
	rechargeConfig: {
		type: Object,
		default: {},
	},
});
</script>

<style scoped lang="scss">
.main {
	margin: 24px;
	padding: 24px;
	border-radius: 16px;
	@include themeify {
		background-color: themed("BG3");
	}
	.header {
		position: relative;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 500;

		.icon {
			position: absolute;
			top: 0px;
			left: -24px;
			width: 6px;
			height: 40px;
		}
	}
	.footer {
		border-top: 1px solid;
		@include themeify {
			border-color: themed("Line");
		}
		.label {
			margin-top: 24px;
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 28px;
			font-weight: 400;
		}
		.address_info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 8px;
			margin-top: 12px;
			p {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-weight: 400;
				white-space: normal; /* 允许换行 */
				overflow-wrap: break-word; /* 在单词之间断开 */
				word-break: break-all; /* 在任意字符处断开 */
			}
			.icon {
				width: 40px;
				height: 40px;
			}
		}
	}
}
.tips {
	display: grid;
	gap: 4px;
	margin: 24px;
}

.qrcode {
	width: 296px;
	height: 296px;
	margin: 30px auto 30px;
	padding: 14px;
	box-sizing: border-box;
	background-color: #fff;
}

.tc {
	text-align: center;
}

.text {
	@include themeify {
		color: themed("T1");
	}
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 400;
	line-height: 38px;
}

.text_2 {
	@include themeify {
		color: themed("Theme");
	}
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 400;
	line-height: 38px;
}
</style>
