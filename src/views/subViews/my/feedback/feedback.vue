<template>
	<!-- 意见反馈 -->
	<div class="content">
		<VantNavBar :title="$t(`VantNavBar['意见反馈']`)" @onClickLeft="onClickLeft" @onClickRight="onClickRight">
			<template #right>
				<span class="rightText"> <svg-icon iconName="common/feedBack" size="34px" class="mr_4"></svg-icon> {{ $t(`VantNavBar['我的反馈']`) }}</span>
			</template>
		</VantNavBar>
		<div class="box">
			<div class="title"><span class="color_Hint">*</span>问题类型</div>
			<div class="filed" @click="showQuestion = true">
				<div v-if="type.text" class="color_TB fs_26">{{ type.text }}</div>
				<div v-else class="fs_26">请选择问题类型</div>
				<svg-icon iconName="common/arrowRight" size="24px" class="mr_4" style="color: #7d8086"></svg-icon>
			</div>
			<div class="mt_32" v-if="type.value == '1'">
				<div class="title">相关订单</div>
				<div class="filed input">
					<input type="text" placeholder="请输入相关订单号" />
				</div>
			</div>
			<div class="title mt_32"><span class="color_Hint">*</span>问题描述 <span class="color_T1 fs_24">内容介于10-500字</span></div>
			<div class="content_one">
				<van-cell-group class="van-cell-group" inset>
					<div class="hint fs_24 color_T2">{{ state.params.content.length }}/500</div>
					<div class="field_container">
						<van-field ref="feedbackContent" class="van-field fs_26" v-model="state.params.content" autosize type="textarea" :placeholder="$t(`feedback['请在此留言']`)" @input="handleInput" />
					</div>
				</van-cell-group>
				<div class="line"></div>
				<p class="fs_24 color_T1 pl_24">{{ $t(`feedback['上传：最大不超过5M，最多可上传3张，支持png,jpeg,jpg']`) }}</p>
				<van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" class="mt_14 ml_24 mb_24">
					<template #preview-delete>
						<img class="close_icon" :src="uploader_close" />
					</template>
					<div class="uploader">
						<img class="icon" :src="uploader_icon" />
					</div>
				</van-uploader>
			</div>

			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="submit">{{ $t(`common['提交']`) }}</Button>
		</div>
		<van-popup v-model:show="showQuestion" position="bottom">
			<van-picker title="" :columns="typeList" @confirm="onConfirmPicker" @cancel="showQuestion = false" @change="onChange" cancel-button-text="X" />
		</van-popup>
	</div>
</template>
<script setup lang="ts">
import uploader_icon from "/@/assets/zh-CN/default/my/feedback/uploader_icon.png";
import uploader_close from "/@/assets/zh-CN/default/my/feedback/uploader_close.png";
import { useRouter } from "vue-router";
const router = useRouter();
const btnDisabled = ref(true);
const showQuestion = ref(false);
const type: any = ref({});
const typeList: any = ref([
	{ text: "财务问题", value: "1" },
	{ text: "账号问题", value: "2" },
	{ text: "游戏问题", value: "3" },
	{ text: "活动问题", value: "4" },
	{ text: "其他问题", value: "5" },
]);
import { medalApi } from "/@/api/my";
import common from "/@/utils/common";
import CommonApi from "/@/api/common";
import { showToast } from "vant";
const state = reactive({
	params: {
		feedbackType: "", // 反馈类型
		content: "", // 反馈内容
	},
	maxlength: 500,
});

const fileList: any = ref([]);

const handleInput = (val) => {
	if (val.data) {
		if (state.params.content.length + val.data.length >= state.maxlength) {
			setTimeout(() => {
				state.params.content = state.params.content.slice(0, state.maxlength);
			}, 1);
		}
	}
	if (state.params.content.length >= state.maxlength) {
		state.params.content = state.params.content.slice(0, state.maxlength);
	}
};
watch(
	() => [state.params.content, type.value],
	() => {
		console.log(type.value.value);

		btnDisabled.value = state.params.content.length < 1 || !type.value.value;
	}
);
onMounted(() => {});
const submit = () => {
	if (state.params.content.length < 10) return showToast("内容长度不能小于10个字");
	const prams = {
		type: type.value.value,
		content: state.params.content,
		orderId: "",
		picUrls: fileList.value.map((item) => item.url).join(","),
	};
	medalApi.submitFeedback(prams).then((res: any) => {
		if (res.code === 10000) {
			showToast("感谢您的反馈！");
			Object.assign(state.params, {});
			state.params.content = "";
			type.value = {};
			fileList.value = [];
		}
	});
};

const afterRead = async (file) => {
	if (common.getInstance().beforeAvatarUpload(file.file)) {
		await iconUploadImg(file.file);
	} else {
		fileList.value.pop();
	}
};
/**
 * @param file 调用上传接口
 */
const iconUploadImg = async (file) => {
	const formaData = new window.FormData();
	formaData.append("file", file);
	const res: any = await CommonApi.uploadFile(formaData).catch((err) => {
		fileList.value.pop();
	});
	if (res.code === common.getInstance().ResCode.SUCCESS) {
		fileList.value[fileList.value.length - 1].url = res.data.fileKey;
	} else {
		fileList.value.pop();
	}
};

const onClickLeft = () => {
	router.go(-1);
};
const onClickRight = () => {
	router.push("/feedbackRecords");
};

const onConfirmPicker = (value) => {
	type.value = value.selectedOptions[0];

	showQuestion.value = false;
};

const onChange = ({ selectedValues }) => {};
const onCancel = () => {};
</script>
<style lang="scss" scoped>
.rightText {
	@include themeify {
		color: themed("T1");
	}
	font-family: "PingFang SC";
	font-size: 26px;
	font-weight: 400;
	display: flex;
	align-items: center;
}

.content {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
	.box {
		padding: 0 24px;
		.filed {
			height: 80px;
			border-radius: 16px;
			display: flex;
			padding: 0 24px;
			justify-content: space-between;
			align-items: center;
			@include themeify {
				background-color: themed("BG3");
				color: themed("T1");
			}
		}
		.input {
			padding: 0;
			height: 77px;
			input {
				height: 77px;
				width: 100%;
				border-radius: 16px;
				background: transparent;
				padding: 0 24px;
				border: none;
			}
			input:focus {
				outline: none;
			}
		}
	}
	.title {
		margin: 24px 0px;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-style: normal;
		font-weight: 500;
	}
	.content_one {
		@include themeify {
			background: themed("BG3");
		}
		.line {
			height: 1px;
			margin: 0 24px 24px;
			@include themeify {
				background: themed("Line");
			}
		}
		.van-cell-group {
			margin: 0;
			min-height: 200px;
			border-radius: 20px;
			position: relative;
			padding-bottom: 40px;
			@include themeify {
				background: themed("BG3");
			}
			.van-cell {
				padding: 24px;
				border-radius: 0 !important;
				@include themeify {
					background: themed("BG3");
				}
			}
			.hint {
				position: absolute;
				right: 24px;
				bottom: 24px;
				color: #fff;
				z-index: 20;
			}
		}
	}
	:deep(.van-field__control) {
		font-family: "PingFang SC";
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		@include themeify {
			color: themed("T1");
		}
		&::placeholder {
			@include themeify {
				color: themed("T2");
			}
		}
	}
}

.p1 {
	padding: 32px 0px 27px 0px;
	@include themeify {
		color: themed("TB");
	}
	font-family: "PingFang SC";
	font-size: 28px;
	font-weight: 400;
}

.p2 {
	padding-top: 16px;
	@include themeify {
		color: themed("T1");
	}
	font-family: "PingFang SC";
	font-size: 24px;
	font-weight: 400;
}

:deep(.van-uploader) {
	.van-uploader__wrapper {
		gap: 24px;
		.van-uploader__preview {
			width: 160px;
			height: 160px;
			margin: 0px;
			.van-uploader__preview-image {
				border-radius: 16px;
			}
		}
	}
	.van-uploader__preview-delete {
		top: -8px;
		right: -8px;
	}
	.close_icon {
		width: 32px;
		height: 32px;
	}
}
.uploader {
	width: 160px;
	height: 160px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px dashed;
	@include themeify {
		border-color: themed("T2");
	}
	border-radius: 16px;
	.icon {
		width: 56px;
		height: 56px;
	}
}
.content {
	:deep(.van-popup) {
		border-radius: 24px 24px 0px 0px;
		@include themeify {
			background: themed("BG1") !important;
		}
	}
	:deep(.van-picker) {
		border-radius: 24px 24px 0px 0px;
		@include themeify {
			background: themed("BG1") !important;
		}
		.van-picker__mask {
			background-image: none;
		}
		.van-picker__confirm {
			@include themeify {
				color: themed("T1");
			}
		}
	}
	//选中的线
	:deep(.van-hairline-unset--top-bottom.van-picker__frame)::after {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2");
		}
	}
	:deep(.van-picker-column__item) {
		@include themeify {
			color: themed("T1");
		}
	}
	:deep(.van-hairline-unset--top-bottom.van-picker__frame)::before {
		border: none;
		content: "";
		position: absolute;
		z-index: 100;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 2px;
		@include themeify {
			background: themed("Line2");
		}
	}
}
</style>
