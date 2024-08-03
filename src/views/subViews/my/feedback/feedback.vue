<template>
	<!-- 意见反馈 -->
	<div class="content">
		<VantNavBar :title="$t(`VantNavBar['意见反馈']`)" @onClickLeft="onClickLeft" />
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
			<Button class="mt_40" :type="btnDisabled ? 'disabled' : 'default'" @click="homeBack">{{ $t(`common['提交']`) }}</Button>
			<div class="relation">{{ $t(`feedback['或发电子邮件给我们']`) }}<span>xxxxxx@xx.com</span></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const onClickLeft = () => {
	router.go(-1);
};
const state = reactive({
	params: {
		feedbackType: "", // 反馈类型
		feedbackContent: "", // 反馈内容
	},
	maxlength: 200,
});
const btnDisabled = ref(true);
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
</script>
<style lang="scss" scoped>
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
	.mt_40 {
		margin: 24px 0px;
	}
	.relation {
		text-align: center;
		@include themeify {
			color: themed("T1");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 22px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		span {
			@include themeify {
				color: themed("Theme");
			}
			font-family: "PingFang SC";
			font-size: 22px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}
}
</style>
