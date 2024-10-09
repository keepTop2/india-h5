<template>
	<VantNavBar title="存款" @onClickLeft="router.back()" />
	<div class="container">
		<div class="card">
			<SvgIcon class="card-tag" iconName="wallet/line" :size="0.8" :height="5.333333" />
			<div class="title mb_10">{{ $t('recharge["支付方式"]') }}</div>
			<div class="items">
				<div class="item" v-for="(item, index) in dataList" :key="index" @click="onCheck(item, index)" :class="currentMethodsIndex === index ? 'active' : ''">
					<div class="mark" v-if="item.recommendFlag">{{ $t('recharge["推荐"]') }}</div>
					<VantLazyImg class="picture" :src="item.wayIconUrl" />
					<div class="label">{{ item.rechargeWay }}</div>
				</div>
			</div>
		</div>

		<div class="form" v-if="currentMethods.rechargeTypeCode === 'bank_card'">
			<div class="cell">
				<h5>{{ $t('recharge["存款人姓名"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.depositName" :placeholder="$t(`recharge['请输入存款人姓名']`)" @update:modelValue="onInputDepositName" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["存款金额"]') }}</h5>

				<van-field
					class="field mt_12 cell-field"
					v-model="state.amount"
					:placeholder="`${currentMethods?.rechargeMin || 0} - ${currentMethods?.rechargeMax || 100} `"
					@update:modelValue="onInputAmount"
				/>
			</div>

			<div class="quickAmount">
				<!-- {{ dataList[currentMethods]?.quickAmount }} -->
				<div v-for="(item, index) in currentMethods?.quickAmount?.split(',')" class="amount color_TB" :class="currentQuickAmount === index ? 'active' : ''" @click="selectQuickAmount(item, index)">
					{{ item }}
				</div>
			</div>
		</div>
		<div class="form" v-if="currentMethods.rechargeTypeCode === 'electronic_wallet'">
			<div class="cell">
				<h5>{{ $t('recharge["存款金额"]') }}</h5>
				<van-field
					class="field mt_12 cell-field"
					v-model="state.amount"
					:placeholder="`${currentMethods?.rechargeMin || 0} - ${currentMethods?.rechargeMax || 100} `"
					@update:modelValue="onInputAmount"
				/>
			</div>
			<div class="quickAmount">
				<div v-for="(item, index) in currentMethods?.quickAmount?.split(',')" class="amount color_TB" :class="currentQuickAmount === index ? 'active' : ''" @click="selectQuickAmount(item, index)">
					{{ item }}
				</div>
			</div>
		</div>
		<div class="form" v-if="currentMethods.rechargeTypeCode === 'electronic_wallet'">
			<div class="cell">
				<h5>{{ $t('recharge["手机号码"]') }}</h5>
				<van-field
					class="field mt_12 cell-field"
					v-model="state.amount"
					:placeholder="`${currentMethods?.rechargeMin || 0} - ${currentMethods?.rechargeMax || 100} `"
					@update:modelValue="onInputAmount"
				/>
			</div>
		</div>
		<div class="form" v-if="currentMethods.rechargeTypeCode === 'crypto_currency'">
			<div class="cell">
				<h5>{{ $t('recharge["存款信息"]') }}</h5>
				<div>扫描或者复制获得地址进行转账</div>
				<div>qrcode</div>
			</div>
		</div>
		<div v-if="currentMethods.rechargeTypeCode === 'crypto_currency'" class="mt_20 color_T3">
			<p>1.向该地址充值后，资金直接入账站点名称用户：dadadadad</p>
			<p>2.请勿向上述地址充值任何非USDT-TRC20的货币，否则将无法找回。</p>
			<p>3.当前汇率：7.15CNY/USDT（仅供参考，以实际上分为准）</p>
			<p>4.具体到账金额以实际到账金额为准，少于10usdt无法上分。</p>
		</div>
		<div class="submitBtn" :class="verification ? 'active' : ''" @click="submit" v-if="currentMethods.rechargeTypeCode !== 'crypto_currency'">{{ $t('recharge["立即存款"]') }}</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { walletApi } from "/@/api/wallet";
const router = useRouter();
const dataList: any = ref([]);
defineOptions({
	name: "recharge",
});
const state = reactive({
	depositName: "",
	amount: "",
});
const verification = ref(false);

onMounted(() => {
	// console.log(123123, "recharge组件挂载了");
	walletApi.rechargeWayList().then((res) => {
		dataList.value = res.data;
		currentMethods.value = res.data[0] || {};
	});
});

const selectQuickAmount = (item, index) => {
	state.amount = item;
	currentQuickAmount.value = index;
	verifyBtn();
};
const currentMethods: any = ref({});
const currentMethodsIndex = ref(0);
const currentQuickAmount = ref(null);
const onCheck = (item, index) => {
	currentMethodsIndex.value = index;
	currentMethods.value = item;
};
const submit = () => {
	const params = {
		amount: state.amount,
		depositWayId: currentMethods.value.rechargeTypeCode,
		depositName: state.depositName,
	};
	walletApi.userRecharge(params).then((res) => {
		console.log(res);
	});
	router.push("/rechargeDetails");
};
const onInputDepositName = () => {
	verifyBtn();
};
const onInputAmount = () => {
	verifyBtn();
};

const verifyBtn = () => {
	switch (currentMethodsIndex.value) {
		case 0:
			if (currentMethods.value.quickAmount.split(",").indexOf(state.amount) !== -1) {
				currentQuickAmount.value = currentMethods.value.quickAmount.split(",").indexOf(state.amount);
			} else {
				currentQuickAmount.value = null;
			}
			if (state.amount && state.depositName) {
				if (state.amount >= currentMethods.value.rechargeMin && state.amount <= currentMethods.value.rechargeMax) {
					verification.value = true;
				}
			} else {
				verification.value = false;
			}
			break;
	}
};
</script>

<style scoped lang="scss">
.container {
	padding: 20px;
	position: relative;
}
.container::before {
	content: "";
	position: absolute;
	left: 20px;
	top: 25px;
	display: inline-block;

	width: 6px;
	height: 40px;
	background-color: red;
	z-index: 10;
	border-radius: 0 20px 20px 0;
}
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
			border-radius: 20px;
			border: 2px solid rgba(98, 102, 106, 0.5);
			@include themeify {
				border-color: themed("Line");
			}
			overflow: hidden;
			box-sizing: border-box;

			.mark {
				position: absolute;
				top: 0px;
				right: -20px;
				padding: 5px 35px 5px 15px;
				height: 33px;
				display: flex;

				align-items: center;
				justify-content: center;
				border-bottom-left-radius: 20px;
				border-top-right-radius: 20px;

				@include themeify {
					background-color: themed("Theme");
					color: themed("TB");
				}
				font-size: 22px;
				font-weight: 400;
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
			}
		}
		@include themeify {
			.item.active {
				border: 2px solid themed("Theme");
				.label {
					color: themed("Theme");
				}
			}
		}
	}
}
.form {
	margin-top: 24px;
	@include themeify {
		background: themed("BG3");
	}
	border-radius: 16px;
	padding: 24px;
	:deep(.van-cell) {
		@include themeify {
			background: themed("BG1");
		}
		border-radius: 12px;
		margin-bottom: 16px;
	}

	h5 {
		@include themeify {
			color: themed("TB");
		}
		font-size: 30px;
	}
	:deep(.van-field__control) {
		@include themeify {
			color: themed("T3");
		}
		font-family: "DIN Alternate";
		font-size: 28px;
		font-weight: 700;
		line-height: 38px;
		color: #fff;
	}

	:deep(.van-field__control::-webkit-input-placeholder) {
		@include themeify {
			color: themed("T3");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
	}
	.quickAmount {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
		.amount {
			height: 66px;
			line-height: 66px;
			text-align: center;
			width: calc(25% - 15px);
			border: 1px solid #7d808680;
			border-radius: 8px;
		}
		.amount.active {
			@include themeify {
				color: themed("Theme");
				border: 1px solid themed("Theme");
			}
		}
	}
}
.submitBtn {
	height: 86px;
	text-align: center;
	line-height: 86px;
	width: 620px;
	border-radius: 12px;
	margin: 36px auto;
	@include themeify {
		color: themed("T3");
		background: themed("BG3");
	}
}
.submitBtn.active {
	@include themeify {
		color: themed("TB");
		background: themed("Theme");
	}
}
.tip {
	height: 66px;
	padding: 8px;
	@include themeify {
		color: themed("TB");
	}
	font-family: "PingFang SC";
	font-size: 30px;
	font-style: normal;
	font-weight: 400;
	line-height: 34px;
}
</style>
