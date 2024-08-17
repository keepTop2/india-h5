<template>
	<!-- 意见反馈 -->
	<div class="content">
		<VantNavBar :title="$t(`VantNavBar['意见反馈']`)" @onClickLeft="onClickLeft" @onClickRight="onClickRight">
			<template #right>
				<span class="rightText">{{ $t(`VantNavBar['反馈记录']`) }}</span>
			</template>
		</VantNavBar>
		<div class="box">
			<p class="title">{{ $t(`feedback['帮助我们改善您的体验']`) }}</p>
			<div class="content_one">
				<van-cell-group class="van-cell-group" inset>
					<div class="field_container">
						<van-field
							ref="feedbackContent"
							class="van-field"
							v-model="state.params.feedbackContent"
							rows="7"
							autosize
							type="textarea"
							:placeholder="$t(`feedback['请在此留言']`)"
							@input="handleInput"
						/>
					</div>
				</van-cell-group>
			</div>

			<p class="p1">{{ $t(`feedback['上传截图以便客服更了解您的问题']`) }}</p>
			<van-uploader v-model="fileList" multiple :max-count="3">
				<template #preview-delete>
					<img class="close_icon" :src="uploader_close" />
				</template>
				<div class="uploader">
					<img class="icon" :src="uploader_icon" />
				</div>
			</van-uploader>
			<p class="p2">{{ $t(`feedback['上传：最大不超过5M，最多可上传3张，支持png,jpeg,jpg']`) }}</p>

			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="homeBack">{{ $t(`common['提交']`) }}</Button>
		</div>
	</div>
</template>
<script setup lang="ts">
import uploader_icon from "/@/assets/zh-CN/default/my/feedback/uploader_icon.png";
import uploader_close from "/@/assets/zh-CN/default/my/feedback/uploader_close.png";
import { useRouter } from "vue-router";
const router = useRouter();
const btnDisabled = ref(true);

const state = reactive({
	params: {
		feedbackType: "", // 反馈类型
		feedbackContent: "", // 反馈内容
	},
	maxlength: 200,
});

const fileList = ref([]);

const handleInput = (val) => {
	if (val.data) {
		if (state.params.feedbackContent.length + val.data.length >= state.maxlength) {
			setTimeout(() => {
				state.params.feedbackContent = state.params.feedbackContent.slice(0, state.maxlength);
			}, 1);
		}
	}
	if (state.params.feedbackContent.length >= state.maxlength) {
		state.params.feedbackContent = state.params.feedbackContent.slice(0, state.maxlength);
	}
};
watch(
	() => state.params.feedbackContent,
	() => {
		btnDisabled.value = state.params.feedbackContent.length === 0;
	}
);

const homeBack = () => {
	console.log("提交");
};

const onClickLeft = () => {
	router.go(-1);
};
const onClickRight = () => {
	router.push("/feedbackRecords");
};
</script>
<style lang="scss" scoped>
.rightText {
	@include themeify {
		color: themed("Theme");
	}
	font-family: "PingFang SC";
	font-size: 26px;
	font-weight: 400;
	text-decoration-line: underline;
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
	}
	.title {
		margin: 24px 0px;
		text-align: center;
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-style: normal;
		font-weight: 500;
	}
	.content_one {
		height: 267px;
		.van-cell-group {
			margin: 0;
			height: 267px;
			border-radius: 20px;
			@include themeify {
				background: themed("BG3");
			}
			.van-cell {
				padding: 24px;
				border: none;
				@include themeify {
					background: themed("BG3");
				}
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
	border: 2px solid;
	@include themeify {
		border-color: themed("T2");
	}
	border-radius: 16px;
	.icon {
		width: 56px;
		height: 56px;
	}
}
</style>
