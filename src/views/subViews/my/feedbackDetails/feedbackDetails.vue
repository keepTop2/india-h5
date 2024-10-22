<template>
	<VantNavBar :title="$t(`VantNavBar['反馈详情']`)" @onClickLeft="onClickLeft">
		<template #right>
			<span class="rightText"> <svg-icon iconName="common/delete_icon" size="34px" class="mr_4" @click="deleteFeedBack"></svg-icon> </span>
		</template>
	</VantNavBar>

	<div class="pb_40" ref="scrollContainer">
		<div class="feedbackDetails">
			<div class="header1">
				<div>
					<VantLazyImg :src="getImage(FeedbackDetail[0]?.type)" alt="" class="mr_24" />
					<div class="color_TB">{{ typeList?.filter((item) => FeedbackDetail[0]?.type == item.value)[0]?.text }}</div>
				</div>
				<div class="color_F2" @click="handleShowUpload">再次反馈</div>
			</div>
			<div v-for="item in FeedbackDetail" class="Details">
				<div class="header">
					<div class="left">
						<img src="/@/assets/zh-CN/default/common/userIcon.png" alt="" class="userIcon" />
						<span>{{ useUserStore().getUserInfo.userAccount }}</span>
					</div>
					<div class="right">
						<div>{{ dayjs(item.createdTime).format("YYYY/MM/DD hh:mm:ss") }}</div>
					</div>
				</div>
				<div class="content">
					<p class="text fs_26">{{ item.content }}</p>
					<div class="img-list mt_12">
						<VantLazyImg :src="imgs" alt="" @click="showImagePreview([imgs])" v-for="(imgs, index) in item.picUrls.split(',')" v-if="item.picUrls.length > 0" />
					</div>
				</div>
				<div v-if="item.backAccount">
					<div class="header">
						<div class="left">
							<img src="/@/assets/zh-CN/default/common/customer.png" alt="" class="userIcon" />
							<span>{{ item.backAccount }}</span>
						</div>
						<div class="right">
							<div>{{ dayjs(item.backTime).format("YYYY/MM/DD hh:mm:ss") }}</div>
						</div>
					</div>
					<div class="content">
						<p class="text fs_26">{{ item.backContent }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="upload" v-if="showUpload">
			<div class="title mt_32 color_TB mb_10"><span class="color_Hint">*</span>问题描述 <span class="color_T1 fs_24">内容介于10-500字</span></div>
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
	</div>
	<OkDialog v-model="showDialog" :confirm="confirmDelete">删除后无法恢复，确认删除吗？</OkDialog>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import uploader_icon from "/@/assets/zh-CN/default/my/feedback/uploader_icon.png";
import uploader_close from "/@/assets/zh-CN/default/my/feedback/uploader_close.png";
import { medalApi } from "/@/api/my";
import { useRouter } from "vue-router";
import Common from "/@/utils/common";
import CommonApi from "/@/api/common";
import { showToast } from "vant";
import type1Icon from "../feedbackRecords/image/type1.png";
import type2Icon from "../feedbackRecords/image/type2.png";
import type3Icon from "../feedbackRecords/image/type3.png";
import type4Icon from "../feedbackRecords/image/type4.png";
import type5Icon from "../feedbackRecords/image/type5.png";
import { showImagePreview } from "vant";
import { useUserStore } from "/@/store/modules/user";
const scrollContainer: any = ref(null);
const router = useRouter();
const typeList: any = ref([
	{ text: "财务问题", value: "1" },
	{ text: "账号问题", value: "2" },
	{ text: "游戏问题", value: "3" },
	{ text: "活动问题", value: "4" },
	{ text: "其他问题", value: "5" },
]);
const showDialog = ref(false);
const getImage = (type) => {
	return type == 1 ? type1Icon : type == 2 ? type2Icon : type == 3 ? type3Icon : type == 4 ? type4Icon : type == 5 ? type5Icon : "";
};
const state = reactive({
	params: {
		content: "",
	},
	maxlength: 500,
});
const fileList: any = ref([]);
const showUpload = ref(false);

const FeedbackDetail: any = ref([]);
const onClickLeft = () => {
	router.go(-1);
};
const id = router.currentRoute.value.query.id || "";
const btnDisabled = computed(() => !state.params.content);
const handleShowUpload = async () => {
	//自执行函数，不然nextTick不生效
	await (() => {
		showUpload.value = true;
	})();
	nextTick(() => {
		window.scrollTo({
			top: scrollContainer.value.scrollHeight,
			behavior: "smooth", // 平滑滚动效果
		});
	});
};
onMounted(() => {
	if (!id) {
		router.push("/feedbackRecords");
	} else {
		getFeedbackDetail();
	}
});
const confirmDelete = () => {
	medalApi
		.delFeedback({
			id: id,
		})
		.then((res: any) => {
			if (res.code === 10000) {
				showToast("删除成功");
				router.back();
			}
		});
};
const deleteFeedBack = () => {
	showDialog.value = true;
};
const submit = () => {
	if (state.params.content.length < 10) return showToast("内容长度不能小于10个字");
	const prams = {
		type: FeedbackDetail.value[0].type,
		content: state.params.content,
		orderId: FeedbackDetail.value[0]?.orderId,
		feedTopId: FeedbackDetail.value[0]?.id,
		picUrls: fileList.value.map((item) => item.url).join(","),
	};
	medalApi.submitFeedback(prams).then((res: any) => {
		if (res.code === 10000) {
			showToast("谢谢你的反馈");
			Object.assign(state.params, {});
			state.params.content = "";
			fileList.value = [];
			getFeedbackDetail();
			showUpload.value = false;
		}
	});
};
const afterRead = async (file) => {
	if (Common.getInstance().beforeAvatarUpload(file.file)) {
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
	if (res.code === Common.getInstance().ResCode.SUCCESS) {
		fileList.value[fileList.value.length - 1].url = res.data.fileKey;
	} else {
		fileList.value.pop();
	}
};
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
const getFeedbackDetail = () => {
	medalApi.FeedbackDetail({ id: id }).then((res) => {
		FeedbackDetail.value = res.data;
	});
};
</script>

<style scoped lang="scss">
.feedbackDetails {
	margin: 24px;
	border-radius: 16px;
	padding: 24px;
	@include themeify {
		background: themed("BG3");
	}
	.header1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 24px;
		@include themeify {
			border-bottom: 1px solid themed("Line");
		}
		> div:first-child {
			display: flex;
			align-items: center;
		}
		img {
			width: 44px;
			height: 44px;
		}
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 0;
		padding-bottom: 0;
		.left {
			@include themeify {
				color: themed("TB");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 500;
			display: flex;
			gap: 18px;
			align-items: center;
			.userIcon {
				width: 43.7px;
				height: 43.7px;
			}
		}
		.right {
			display: flex;
			column-gap: 10px;
			@include themeify {
				color: themed("T2");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;

			.icon {
				width: 32px;
				height: 32px;
			}
		}
	}
	.content {
		padding: 24px 0;
		border-radius: 8px;
		@include themeify {
			background: themed("BG3");
		}
		.text {
			@include themeify {
				color: themed("T2");
			}
			word-wrap: break-word; /* 支持 IE 11 和旧版浏览器 */
			overflow-wrap: break-word; /* 标准属性 */
			white-space: normal; /* 确保文本在正常情况下换行 */
			font-family: "PingFang SC";
			font-weight: 400;
		}
		.img-list {
			display: flex;
			gap: 20px;
			img {
				border-radius: 12px;
				width: 160px;
				height: 160px;
				object-fit: cover;
			}
		}
	}
	.Details {
		@include themeify {
			border-bottom: 1px solid themed("Line");
		}
	}
	.Details:last-child {
		border-bottom: none;
	}
}
.upload {
	padding: 0 24px;
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
	.close_icon {
		width: 32px;
		height: 32px;
	}
}
</style>
