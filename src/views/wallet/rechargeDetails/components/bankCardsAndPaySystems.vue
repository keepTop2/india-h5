<template>
	<div>
		<div v-if="route.query.type === 'bankCard'" class="card">
			<SvgIcon class="card-tag" iconName="/wallet/line" :size="0.8" :height="5.333333" />
			<div class="herder mb_24">
				<span class="title">{{ $t('recharge["个人信息"]') }}</span>
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["银行卡号"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["名字"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["姓氏"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["电子邮箱"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["地址"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["城市"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["邮政编码"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请输入']`)" />
			</div>
			<div class="cell">
				<h5>{{ $t('recharge["国家"]') }}</h5>
				<van-field class="field mt_12 cell-field" v-model="state.value1" :placeholder="$t(`recharge['请选择']`)" readonly @click="showPicker = true">
					<template #right-icon>
						<SvgIcon class="arrow" iconName="/common/arrow" />
					</template>
				</van-field>
			</div>
		</div>

		<div class="card mt_24">
			<SvgIcon class="card-tag" iconName="/wallet/line" :size="0.8" :height="5.333333" />
			<div class="herder mb_10">
				<span class="title">{{ $t('recharge["充值金额"]') }}</span>
				<span class="limit">${{ 100 }}-{{ 1000 }}</span>
			</div>

			<van-field class="field mt-12" label-class="currency-symbol" v-model="state.value1">
				<template #label>$</template>
				<template #extra>
					<div class="extra-tip">{{ $t('recharge["额外"]') + "+$" }}{{ 100 }}</div>
				</template>
			</van-field>

			<div class="tips mt_10">
				最低存款 <span>{{ 1000 }}</span
				>USD ,即可获得额外<span>{{ 10 }}</span
				>%奖金
			</div>

			<div class="amount-list mt_24">
				<div class="amount-item van-haptics-feedback" v-for="(item, index) in amountList" :key="index">$ {{ item }}</div>
			</div>
		</div>

		<div class="footer">
			<Button>{{ $t('recharge["立即存款"]') }}</Button>
		</div>

		<VantPicker v-model:show="showPicker" v-model:select="state.activeList" :columns="state.typeList" :title="'国家'" />
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const amountList = ["100", "200", "5000", "10000"];

const showPicker = ref(false);

const state = reactive({
	value1: "",
	activeList: "1",
	typeList: [
		{
			code: "1",
			name: "存款金额",
		},
		{
			code: "2",
			name: "提款金额",
		},
		{
			code: "3",
			name: "总输赢",
		},
		{
			code: "4",
			name: "总输赢",
		},
		{
			code: "5",
			name: "总输赢",
		},
		{
			code: "6",
			name: "总输赢",
		},
		{
			code: "7",
			name: "总输赢",
		},
	],
});
</script>

<style scoped lang="scss">
@import "./common.scss";
</style>
