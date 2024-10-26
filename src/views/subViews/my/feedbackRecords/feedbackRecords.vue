<template>
	<VantNavBar :title="$t(`VantNavBar['我的反馈']`)" @onClickLeft="onClickLeft" />
	<cardList :data="FeedbackList" class="mt_24" @handleDelete="handleDelete"></cardList>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import cardList from "./cardList.vue";
const router = useRouter();
import { medalApi } from "/@/api/my";

const FeedbackList = ref([]);
onMounted(() => {
	getFeedbackList();
});
const getFeedbackList = () => {
	medalApi
		.FeedbackList({
			pageNumber: 1,
			pageSize: 10,
		})
		.then((res) => {
			FeedbackList.value = res.data.records;
		});
};
// 删除按钮点击处理逻辑
const handleDelete = (item) => {
	medalApi
		.delFeedback({
			id: item.id,
		})
		.then((res) => {
			getFeedbackList();
		});
};
const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.cellList {
	display: flex;
	flex-direction: column;
	row-gap: 24px;
	padding: 24px;
	.cell {
		padding: 24px;
		border-radius: 8px;
		@include themeify {
			background: themed("BG3");
		}

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				@include themeify {
					color: themed("TB");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
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
			display: flex;
			gap: 50px;
			margin-top: 14px;
			.text {
				@include themeify {
					color: themed("T2");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				white-space: nowrap; /* 不换行 */
				overflow: hidden; /* 超出部分隐藏 */
				text-overflow: ellipsis; /* 显示省略号 */
			}
			span {
				@include themeify {
					color: themed("Theme");
				}
				font-family: "PingFang SC";
				font-size: 24px;
				font-weight: 400;
				white-space: nowrap; /* 不换行 */
				text-decoration-line: underline;
			}
		}
	}
}
</style>
