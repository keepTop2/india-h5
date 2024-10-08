<template>
	<div class="areaCode_picker">
		<van-action-sheet v-model:show="showAreaCode" :closeable="false" style="min-height: 80%">
			<template #default>
				<div class="header">
					<div class="icon"><SvgIcon class="close_icon" iconName="common/close" @click="showAreaCode = false" /></div>
					<div class="title">选择区号</div>
					<div class="right_text" @click="showAreaCode = false">确定</div>
				</div>
				<div class="search_input">
					<div class="icon"><SvgIcon iconName="common/search_input_icon" @click="showAreaCode = false" /></div>
					<input v-model="searchAreaCode" type="text" placeholder="搜索区号" />
					<div v-if="searchAreaCode" class="icon"><SvgIcon class="clear_icon" iconName="common/close" @click="searchAreaCode = ''" /></div>
				</div>
				<template v-if="Object.keys(props.areaCode).length > 0">
					<van-index-bar :index-list="props.indexList" :sticky="false">
						<van-index-anchor :index="1" v-for="item in Object.keys(props.areaCode)">
							<div class="cell_header">{{ item }}</div>
							<div class="cell_item" :class="{ cell_item_active: currentAreaCodeIndex == item }" v-for="(i, idx) in areaCode[item]" :key="idx" @click="selectAreaCode(item, i)">
								<div class="label">
									<img :src="i.icon" class="icon" />
									<span>{{ i.countryCode }}</span>
									<span>{{ i.countryName }}</span>
								</div>
								<div class="value">
									<span>(+{{ i.areaCode }} )</span>
								</div>
							</div>
						</van-index-anchor>
					</van-index-bar>
				</template>
				<div class="no_data">未搜索到相关区号</div>
			</template>
		</van-action-sheet>
	</div>
</template>

<script setup lang="ts">
function defineModel<T>(name: string, defaultValue: T) {
	return ref<T>(defaultValue);
}

const props = defineProps({
	currentAreaCodeIndex: {
		type: String,
		default: ",",
	},
	indexList: {
		type: Array,
		default: () => [] as any,
	},
	areaCode: {
		type: Object,
		default: () => {},
	},
});

const showAreaCode = defineModel<boolean>("showAreaCode", false);
const searchAreaCode = defineModel<string>("searchAreaCode", "");

const emit = defineEmits(["selectAreaCode", "selectAreaCodeIndex"]);

const selectAreaCode = (item, i) => {
	emit("selectAreaCode", item, i);
};
</script>

<style scoped lang="scss">
.areaCode_picker {
	:deep(.van-popup) {
		@include themeify {
			background: themed("BG1");
		}
	}
}

.header {
	position: relative;
	width: 100%;
	height: 82px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px 48px;
	border-bottom: 1px solid;
	@include themeify {
		border-color: themed("Line");
	}
	box-sizing: border-box;

	.icon {
		position: absolute;
		left: 48px;
		width: 32px;
		height: 32px;
		.close_icon {
			width: 32px;
			height: 32px;
		}
	}
	.title {
		text-align: center; /* 水平居中 */
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 32px;
		font-weight: 500;
	}
	.right_text {
		position: absolute;
		right: 48px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: 400;
	}
}
.search_input {
	height: 64px;
	display: flex;
	align-items: center;
	gap: 16px;
	margin: 24px 48px;
	padding: 0px 24px;
	@include themeify {
		background: themed("BG3");
	}
	border-radius: 12px;
	.icon {
		width: 38px;
		height: 38px;
		svg {
			width: 100%;
			height: 100%;
		}
	}
	input {
		flex: 1;
		background-color: transparent;
		border: 0;
		margin: 0;
		padding: 0;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 400;
	}

	.clear_icon {
		width: 32px;
		height: 32px;
		svg {
			width: 100%;
			height: 100%;
		}
	}
}

.cell_header {
	width: 100%;
	height: 52px;
	display: flex;
	align-items: center;
	@include themeify {
		color: themed("T3");
	}
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 400;
}

:deep(.van-index-bar) {
	padding: 0px 48px;
}

:deep(.van-index-anchor) {
	padding: 0px;
}

:deep(.van-index-bar__sidebar) {
	gap: 8px;
	@include themeify {
		color: themed("T3");
	}
	.van-index-bar__index {
		// @include themeify {
		// 	color: themed("T3");
		// }
		color: #7d8086;
		font-family: "PingFang SC";
		font-size: 20px;
		font-weight: 400;
	}
}

.cell_item {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.label {
		display: flex;
		align-items: center;
		gap: 16px;
		.icon {
			width: 32px;
			height: 32px;
		}
		@include themeify {
			color: themed("T1");
		}
		font-size: 28px;
		font-weight: 400;
	}

	.value {
		@include themeify {
			color: themed("T1");
		}
		font-size: 28px;
		font-weight: 400;
	}
}

.cell_item_active {
	position: relative;
	.label,
	.value {
		@include themeify {
			color: themed("Theme");
		}
	}
	&::before,
	&::after {
		content: "";
		position: absolute;
		left: 0;
		width: 100%;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, rgba(255, 40, 75, 0.8) 50%, transparent 100%);
		will-change: transform, opacity;
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	&::before {
		top: 0;
	}
	&::after {
		bottom: 0;
	}
}

.no_data {
	width: 100%;
	height: 66px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--tag-2-pnt-3-p, #6d727a);
	text-align: right;
	font-family: "PingFang SC";
	font-size: 28px;
	font-style: normal;
	font-weight: 400;
	line-height: 36px; /* 128.571% */
}
</style>
