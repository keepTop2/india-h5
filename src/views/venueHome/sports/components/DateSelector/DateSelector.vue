<!--
 * @Author: Hida
 * @Date: 2024-06-02 21:49:41
 * @LastEditors: hida
 * @LastEditTime: 2024-06-10 17:03:42
 * @Description: 
 * 
-->
<template>
	<div class="dateSelector">
		<div :class="['date_item', modelValue == item.date && 'active']" v-for="(item, index) in dateList" :key="index" @click="changeDate(item)">
			<div class="date">{{ item.label }}</div>
			<div class="date">{{ weekEnum[item.week] }}</div>
		</div>
		<div v-show="other" :class="['date_item', modelValue == '' && 'active']" :key="0" @click="changeDate('')">其他</div>
	</div>
</template>

<script setup lang="ts">
/**
 * @description 日期选择器  <DateSelector v-model="modelValue" :daysNumber="12" :other="false" :direction="false" />
 * @description 监听 modelValue	变化 触发对应方法
 * @param {String} modelValue 默认选中日期 v-model="date"
 * @param {Number} daysNumber 显示天数
 * @param {Boolean} other 是否显示其他 其他会将值设置为 空 为空则是其他
 * @param {Boolean} direction 当 direction 为 true 时，它将生成起始日期（modelValue）之后的日期；当 direction 为 false（默认值）时，它将生成起始日期之前的日期。
 * @event update:modelValue 改变日期  v-modal="date"
 */

import { ref, onMounted } from "vue";
import common from ".././@/views/venueHome/sports/utils/common";
import { i18n } from "/@/i18n/index";
import { useSportsBetEventStore } from "/@/store/modules/sports/sportsBetData";
const sportsBetEvent = useSportsBetEventStore();
const $: any = i18n.global;

const weekEnum = {
	1: $.t("sports['星期一']"),
	2: $.t("sports['星期二']"),
	3: $.t("sports['星期三']"),
	4: $.t("sports['星期四']"),
	5: $.t("sports['星期五']"),
	6: $.t("sports['星期六']"),
	0: $.t("sports['星期日']"),
};

const props = withDefaults(
	defineProps<{
		modelValue: string;
		daysNumber: number;
		other: boolean;
		direction: boolean;
	}>(),
	{
		modelValue: "",
		daysNumber: 7,
		other: false,
		direction: false,
	}
);
const dateList = ref(common.generateDateArray(props.modelValue, props.daysNumber, props.direction));
const emit = defineEmits(["update:modelValue"]);

const changeDate = (item) => {
	//初始化折叠状态
	sportsBetEvent.setIsFold(false);
	sportsBetEvent.setFoldCount(0);

	emit("update:modelValue", item.date);
};

onMounted(() => {
	console.log("Component mounted");
});
</script>

<style scoped lang="scss">
.dateSelector {
	width: 100%;
	display: flex;
	gap: 24px;
	padding: 24px;
	box-sizing: border-box;
	overflow-x: auto;
	white-space: nowrap;
	-ms-overflow-style: none; /* IE 和 Edge */
	&::-webkit-scrollbar {
		/* WebKit 浏览器，如 Chrome、Safari */
		width: 0; /* 隐藏垂直滚动条 */
		height: 0; /* 隐藏水平滚动条 */
	}
	// scrollbar-width: none;
	.date_item {
		padding: 4px 36px;
		height: 84px;
		border-radius: 16px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		@include themeify {
			border: 2px solid themed("Line");
			color: themed("TB");
		}
		.date {
			white-space: nowrap;
			font-size: 22px;
			font-weight: 400;
		}
	}
	.active {
		@include themeify {
			background-color: themed("Theme");
			color: themed("TB-P");
			border: 0;
		}
	}
}
</style>
