<template>
	<!-- 通知 -->
	<div class="content">
		<VantNavBar title="通知" @onClickLeft="onClickLeft" />

		<div class="tab">
			<van-tabs v-model:active="active" type="line" :border="false">
				<van-tab title="消息通知" name="2">
					<template #title>
						<van-badge :content="state.unreadCount.messageUnread <= 99 ? state.unreadCount.messageUnread : '99+'" :show-zero="false">
							<div>{{ $t(`my['消息通知']`) }}</div>
						</van-badge>
					</template>
				</van-tab>
				<van-tab title="活动通知" name="1">
					<template #title>
						<van-badge :content="state.unreadCount.announcementUnread <= 99 ? state.unreadCount.announcementUnread : '99+'" :show-zero="false">
							<div>{{ $t(`my['活动通知']`) }}</div>
						</van-badge>
					</template>
				</van-tab>
			</van-tabs>
		</div>

		<div class="info" v-for="(item, index) in state.aaa" :key="index">
			<div class="header">
				<span class="label">2023/03/10 22:16:31</span>
			</div>
			<div>
				<div class="text_title">{{ item.a }}</div>
				<div ref="textRefs" class="text_content" v-bind:class="{ collapsed: isCollapsed[index] }">
					{{ item.b }}
				</div>
				<div v-if="showToggleButton[index]" class="unfold" @click="toggleText(index)">
					{{ isCollapsed[index] ? "展开" : "收起" }}
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const active = ref("2");
const state = reactive({
	list: [] as any,
	aaa: [
		{
			a: "标题标题标题标题标题标题标题",
			b: "我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。旧的充值地址已经被禁用我们想提请您注意有关我们平台上 $ICP 存款地址的我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。旧的充值地址已经被禁用我们想提请您注意有关我们平台上 $ICP 存款地址的我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。",
		},
		{
			a: "标题标题标题标题标题标题标题",
			b: "我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。旧的充值地址已经被禁用我们想提请您注意有关我们平台上 $ICP 313513131315存款地1niha ",
		},
		{
			a: "标题标题标题标题标题标题标题",
			b: "我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。",
		},
	] as any,
	unreadCount: {
		announcementUnread: 20,
		messageUnread: 9,
	},
	params: {
		noticeType: null as null | string,
		pageNumber: 0,
		pageSize: 10,
	},
	noticeList: [],
});

const isCollapsed = ref<boolean[]>([]);
const showToggleButton = ref<boolean[]>([]);
const textRefs = ref<(HTMLElement | null)[]>([]);

const toggleText = (index: number) => {
	isCollapsed.value[index] = !isCollapsed.value[index];
};

const checkTextOverflow = () => {
	state.aaa.forEach((_, index) => {
		const textElement = textRefs.value[index];
		if (textElement) {
			const lineHeight = parseFloat(getComputedStyle(textElement).lineHeight);
			const maxHeight = lineHeight * 3; // 三行的高度
			if (textElement.scrollHeight > maxHeight) {
				showToggleButton.value[index] = true;
			} else {
				showToggleButton.value[index] = false;
			}
		}
	});
};

onMounted(async () => {
	isCollapsed.value = state.aaa.map(() => true);
	showToggleButton.value = state.aaa.map(() => false);
	// 等待 DOM 渲染完成后检查溢出
	await nextTick();
	checkTextOverflow();
});

const onClickLeft = () => {
	router.go(-1);
};
</script>
<style lang="scss" scoped>
.content {
	width: 100%;
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
	padding-bottom: 24px;
}
.tab {
	margin: 32px 24px;
	:deep(.van-tabs) {
		.van-tabs__wrap {
			border: none;
			height: 68px;

			.van-tab {
				@include themeify {
					color: themed("TB");
				}
				font-size: 30px;
				font-weight: 400;
				.van-tab__text--ellipsis {
					overflow: unset;
					border: none;

					.van-badge--top-right {
						top: 20px;
						right: -30px;
						min-width: 16px;
						height: 16px;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0px 4px;
						border: 0;
					}
					.van-badge {
						border: none;
						display: inline-flex;
						padding: 0px 10px;
						justify-content: center;
						align-items: center;
						gap: 10px;
						height: 30px;
						border-radius: 57px;
						@include themeify {
							color: themed("TB");
						}
						background: var(--, #f00);
						text-align: center;
						/* Remark1-备注1 */
						font-family: "PingFang SC";
						font-size: 20px;
						font-style: normal;
						font-weight: 400;
						line-height: 30px; /* 150% */
					}
				}
			}
			.van-tab--active {
				@include themeify {
					color: themed("Theme");
				}
				font-size: 30px;
				font-weight: 400;
			}
			.van-tabs__nav--line {
				@include themeify {
					background: themed("BG1");
				}
			}
		}

		.van-tabs__line {
			margin-top: 10px;
			width: 97px;
			height: 4px;
			flex-shrink: 0;
			border-radius: 12px;
			@include themeify {
				background: themed("Theme");
			}
		}
	}
}

.info {
	margin: 24px 24px 0px;
	border-radius: 16px;
	@include themeify {
		background: themed("BG3");
	}
	padding: 20px 24px;
	.header {
		.label {
			@include themeify {
				color: themed("T3");
			}
			font-family: "PingFang SC";
			font-size: 24px;
			font-weight: 400;
		}
	}
	.text_title {
		@include themeify {
			color: themed("TB");
		}
		font-family: "PingFang SC";
		font-size: 28px;
		font-weight: 600;
		margin: 20px 0;
	}

	.text_content {
		width: 100%;
		max-height: 108px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 26px;
		font-style: normal;
		font-weight: 400;
		line-height: 36px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 3; /* 默认显示三行 */
		transition: max-height 0.3s ease;

		&.collapsed {
			-webkit-line-clamp: 3; /* 收起状态显示三行 */
			max-height: 108px;
		}

		&:not(.collapsed) {
			-webkit-line-clamp: unset; /* 展开时取消行限制 */
			max-height: none;
		}
	}
	.unfold {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		@include themeify {
			color: themed("T1");
		}
		text-align: right;
		font-family: "PingFang SC";
		font-size: 26px;
		font-style: normal;
		font-weight: 400;
		line-height: 36px; /* 138.462% */
		text-transform: uppercase;
		.icon {
			width: 32px;
			height: 32px;
			margin-left: 10px;
		}
	}
}
</style>
