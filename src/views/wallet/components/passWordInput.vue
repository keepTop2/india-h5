<template>
	<!-- 密码弹窗 -->
	<Model v-model:modelValue="props.passWordShow" @closeModal="onClose">
		<div class="wrapper">
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
					<!-- 隐藏的真实输入框 -->
					<input ref="passwordInput" type="password" inputmode="numeric" maxlength="6" v-model="modelValue" @input="onInput" style="opacity: 0; position: absolute; top: -9999px" />
					<div class="des">
						<span @click="goto">忘记密码？</span>
					</div>
				</div>
			</div>
		</div>
	</Model>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive, watch, computed, defineEmits, defineProps, withDefaults } from "vue";
import Model from "/@/views/wallet/components/model.vue";
const router = useRouter();
const emit = defineEmits(["onClose", "onOverlay", "update:modelValue"]);
const props = withDefaults(
	defineProps<{
		passWordShow?: boolean;
		modelValue?: string | number;
	}>(),
	{
		passWordShow: false,
		modelValue: "",
	}
);

// 定义一个计算属性用于处理 v-model 的值
const modelValue = computed({
	get() {
		return props.modelValue;
	},
	set(value: string) {
		emit("update:modelValue", value);
	},
});

const state = reactive({
	arr: [] as string[],
	numList: [
		{ num: "", hide: false, cursor: true },
		{ num: "", hide: false, cursor: false },
		{ num: "", hide: false, cursor: false },
		{ num: "", hide: false, cursor: false },
		{ num: "", hide: false, cursor: false },
		{ num: "", hide: false, cursor: false },
	],
});

const passwordInput = ref<HTMLInputElement | null>(null);

watch(
	() => props.passWordShow,
	(newValue) => {
		if (newValue) {
			nextTick(() => {
				if (passwordInput.value) {
					passwordInput.value.focus();
				}
			});
		}
	}
);

watch(
	() => modelValue.value,
	(newValue) => {
		// 仅保留数字
		const sanitizedValue = (newValue || "").replace(/\D/g, "");
		modelValue.value = sanitizedValue;
		state.arr = sanitizedValue.split("");
		state.numList.forEach((item, idx) => {
			item.num = state.arr[idx] || "";
			item.hide = Boolean(state.arr[idx]);
			item.cursor = idx === state.arr.length;
		});
		if (sanitizedValue.length == 6) {
			onClose(); // 输入完成时，关闭弹窗
		}
	},
	{ immediate: true }
);

const clearPassWord = () => {
	modelValue.value = "";
	state.numList.forEach((item) => {
		item.num = "";
		item.cursor = false;
		item.hide = false;
	});
	state.numList[0].cursor = true;
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
	// 过滤掉非数字字符，只保留数字
	const sanitizedValue = (modelValue.value || "").replace(/\D/g, "");
	modelValue.value = sanitizedValue;
	state.numList.forEach((item) => {
		if (item.num) {
			item.hide = true;
		}
	});
};

const goto = () => {
	router.push({ path: "/forgetPassword", query: { withdraw: 1 } });
};

// 点击输入框事件
const onEnter = () => {
	if (passwordInput.value) {
		passwordInput.value.focus();
	}
};

// 关闭弹窗
const onClose = () => {
	emit("onClose", {});
	clearPassWord();
};
</script>

<style scoped lang="scss">
.wrapper {
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%, 0);
}
.input_box {
	width: 628px;
	@include themeify {
		background-color: themed("BG1");
	}
	border-radius: 28px;
	font-family: PingFang SC;
	.content {
		padding: 40px 48px 50px;
		text-align: center;
		.title {
			font-size: 34px;
			font-weight: 500;
			@include themeify {
				color: themed("TB");
			}
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
				@include themeify {
					background-color: themed("BG3");
					border-color: themed("Line");
					color: themed("TB");
				}
				border-radius: 12px;
				border: 1px solid;
				font-size: 32px;
				font-weight: 500;
				.cursor {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 2px;
					height: 38px;
					@include themeify {
						background-color: themed("Theme");
					}
					animation: 1s van-cursor-flicker infinite;
				}
				.hide {
					font-size: 38px;
					font-weight: 500;
					@include themeify {
						color: themed("TB");
					}
					vertical-align: middle;
				}
			}
			.enter {
				border: 2px solid;
				@include themeify {
					border-color: themed("Theme");
					background-color: themed("BG35555");
				}
			}

			.existData {
				border: 2px solid;
				@include themeify {
					border-color: themed("BG355");
					background-color: themed("BG3");
					color: themed("TB");
				}
			}
		}
		.des {
			margin-top: 45px;
			font-size: 26px;
			font-weight: 400;
			@include themeify {
				color: themed("Theme");
			}
		}
	}
}
</style>
