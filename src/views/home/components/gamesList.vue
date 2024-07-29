<template>
	<div class="home_container">
		<div class="pull_down">
			<div class="cell">
				<van-field v-model="state.venueName1" @click="showPicker1 = true">
					<template #right-icon>
						<SvgIcon iconName="arrow" />
					</template>
				</van-field>
			</div>
			<VantPicker v-model:show="showPicker1" v-model:select="state.venueName1" :columns="state.option1" title="" />

			<div class="cell">
				<van-field v-model="state.venueName2" @click="showPicker2 = true">
					<template #right-icon>
						<SvgIcon iconName="arrow" />
					</template>
				</van-field>
			</div>
			<VantPicker v-model:show="showPicker2" v-model:select="state.venueName2" :columns="state.option2" title="" />
		</div>
		<div class="game_box">
			<div class="game">
				<div class="game_one"><img :src="game_image" alt="" /><SvgIcon class="game_svg" iconName="home_collect" /></div>
				<div class="game_two">游戏名称</div>
			</div>
			<div class="game">
				<div class="game_one"><img :src="game_image" alt="" /><SvgIcon class="game_svg" iconName="home_no_collect" /></div>
				<div class="game_two">游戏名称</div>
			</div>

			<div class="game">
				<div class="game_one"><img :src="game_image" alt="" /><SvgIcon class="game_svg" iconName="home_collect" /></div>
				<div class="game_two">游戏名称</div>
			</div>
			<div class="game">
				<div class="game_one"><img :src="game_image" alt="" /><SvgIcon class="game_svg" iconName="home_collect" /></div>
				<div class="game_two">游戏名称</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import Vector from "/@/assets/zh/default/frontPage/home/Vector.png";
import game_image from "/@/assets/zh/default/frontPage/home/game_image.png";
import { ref } from "vue";
const showPicker1 = ref(false);
const showPicker2 = ref(false);
const state = reactive({
	activeNumber: "",
	venueName1: "",
	venueName2: "",
	venueCode1: "",
	venueCode2: "",
	winLossAmount: "",
	depWithdrawAmount: "",
	commissionsAreAvailable: "",

	option1: [
		{ name: "充值", code: 0 },
		{ name: "提现", code: 1 },
		{ name: "投注", code: 2 },
		{ name: "奖金", code: 3 },
	],
	option2: [
		{ name: "近24小时", code: 0 },
		{ name: "近7天", code: 1 },
		{ name: "近30天", code: 2 },
		{ name: "近60天", code: 3 },
	],
});
onMounted(() => {
	state.venueName1 = state.option1[0].name;
	state.venueName2 = state.option2[0].name;
});
</script>

<style lang="scss" scoped>
.home_container {
	padding: 24px;
	.pull_down {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.cell {
			width: 335px;
			border-radius: 12px;
			@include themeify {
				background: themed("BG2");
			}

			:deep(.van-field) {
				border-radius: 12px;
				@include themeify {
					background: themed("BG2");
					border: 1px solid themed("Theme");
				}
			}
			:deep(.van-field__control) {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 28px;
				font-style: normal;
				font-weight: 400;
				line-height: 38px; /* 135.714% */
				text-transform: uppercase;
			}
		}
	}

	.game_box {
		display: flex;
		flex-wrap: wrap; /* 当游戏方块超出容器宽度时换行 */
		justify-content: flex-start; /* 左对齐游戏方块 */
		align-items: flex-start; /* 顶部对齐游戏方块 */
		.game {
			margin: 24px 18px 0 0;
			border-radius: 16px;
			@include themeify {
				background: themed("Tag1");
			}
			.game_one {
				position: relative;

				img {
					border-radius: 16px 16px 0 0;
					width: 216px;
					height: 220px;
				}
				.game_svg {
					position: absolute;
					top: 10px;
					right: 10px;
				}
			}
			.game_two {
				padding: 12px 0;
				@include themeify {
					color: themed("TB");
				}
				text-align: center;

				/* Text1-文本1 */
				font-family: "PingFang SC";
				font-size: 24px;
				font-style: normal;
				font-weight: 400;
				line-height: 34px; /* 141.667% */
			}
		}
	}
}
</style>
