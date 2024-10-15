<template>
	<!-- 密码弹窗 -->
	<van-overlay :show="passWordShow" @click="onOverlay">
		<div class="wrapper" @click.stop>
			<div class="input_box">
				<div class="content">
					<div class="title">输入密码</div>

					<ul class="input_list">
						<li v-for="(item, index) in state.numList" :key="index" :class="getClass(item)" @click="onEnter">
							<div v-if="item.cursor" class="cursor"></div>
							<span v-if="!item.hide">{{ item.num }}</span>
							<span v-else class="hide">*</span>
						</li>
					</ul>
					<div class="des" @click="goto">忘记密码？</div>
				</div>
			</div>
		</div>
	</van-overlay>

	<van-number-keyboard v-model="state.value" :show="keyboardShow" :hide-on-click-outside="false" :maxlength="6" @input="onInput" @delete="onDelete" @blur="onClose" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits(["onClose", "onEnter", "onOverlay"]);
const props = withDefaults(
	defineProps<{
		passWordShow?: boolean;
		keyboardShow?: boolean;
	}>(),
	{
		passWordShow: true,
		keyboardShow: true,
	}
);

const state = reactive({
	value: "",
	arr: [] as string[],
	numList: [
		{ num: "", hide: false },
		{ num: "", hide: false },
		{ num: "", hide: false },
		{ num: "", hide: false },
		{ num: "", hide: false },
		{ num: "", hide: false },
	],
	timerId: null as any,
});

watch(
	() => state.value,
	(newValue, oldValue) => {
		state.arr = newValue.split("");
		state.arr.forEach((item, index) => {
			state.numList.forEach((i, idx) => {
				if (index === idx) {
					if (item) {
						i.cursor = false;
					}
					i.num = item;
				}
			});
		});
		if (state.arr.length == 0) {
			state.numList[0].cursor = true;
		}
		// 有值的时候下一个输入框加入光标效果
		state.numList.forEach((item, index) => {
			if (state.arr.length - 1 > index) {
				item.hide = true;
			}
			if (index == state.arr.length) {
				state.numList[state.arr.length].cursor = true;
			} else {
				if (item.cursor) {
					item.cursor = false;
				}
			}
		});
		if (state.value.length == 6) {
			// checkWithdrawPassword({ withdrawPassword: state.value, callback: clearPassWord });
		}
	},
	{ immediate: true }
);

const clearPassWord = () => {
	state.value = "";
	state.numList.forEach((item) => {
		item.num = "";
		item.cursor = false;
		item.hide = false;
	});
};

const getClass = (item) => {
	if (item.cursor) {
		return "enter";
	}
	if (item.num) {
		return "existData";
	}
};

const onInput = () => {
	clearTimeout(state.timerId);
	state.timerId = setTimeout(() => {
		state.numList.forEach((item) => {
			if (item.num) {
				item.hide = true;
			}
		});
	}, 1000);
};

const onDelete = () => {
	// 删除取下标循环删除
	state.numList.forEach((item, index) => {
		if (index == state.arr.length - 1) {
			item.num = "";
			item.hide = false;
		}
	});
};

const goto = () => {
	router.push({ path: "/forgetPassword", query: { withdraw: 1 } });
};

// 点击输入密码
const onEnter = () => {
	emit("onEnter", {});
};

// 点击遮罩
const onOverlay = () => {
	emit("onOverlay", {});
	clearPassWord();
};

// 收起键盘
const onClose = () => {
	emit("onClose", {});
};
</script>

<style scoped lang="scss">
.wrapper {
	// display: flex;
	// align-items: center;
	// justify-content: center;
	// height: 100%;
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%, 0);
}
.input_box {
	width: 628px;
	background: #ffffff;
	border-radius: 28px;
	font-family: PingFang SC;
	.content {
		padding: 40px 48px 50px;
		text-align: center;
		.title {
			font-size: 34px;
			font-weight: 500;
			color: #101010;
		}
		.input_list {
			display: flex;
			justify-content: space-between;
			margin-top: 50px;
			li {
				position: relative;
				width: 70px;
				height: 70px;
				line-height: 70px;
				text-align: center;
				background: #f5f5f5;
				border-radius: 12px;
				border: 1px solid #c4c4c4;
				font-size: 34px;
				font-weight: 400;
				color: #ffffff;
				.cursor {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 2px;
					height: 32px;
					background: #a2a2a2;
					animation: 1s van-cursor-flicker infinite;
				}
				.hide {
					font-size: 38px;
					font-weight: 600;
					color: #ffffff;
					vertical-align: middle;
				}
			}
			.enter {
				border: 2px solid #1987ff;
				background: #fff;
			}

			.existData {
				background: #1987ff;
				border: 2px solid #1987ff;
				color: #ffffff;
			}
		}
		.des {
			margin-top: 45px;
			font-size: 26px;
			font-weight: 400;
			color: #1987ff;
		}
	}
}
</style>
