<template>
	<div class="content">
		<VantNavBar title="反馈详情" @onClickLeft="onClickLeft" />

		<div class="wrapper">
			<div class="message">
				<div class="text_title">标题标题标题标题标题标题标题</div>
				<div class="time">
					<span class="label">2023/03/10 22:16:31</span>
				</div>
				<div ref="textRefs" class="text_content">
					我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。旧的充值地址已经被禁用我们想提请您注意有关我们平台上 $ICP 存款地址的我们想提请您注意有关我们平台上 $ICP
					存款地址的重要更新。旧的充值地址已经被禁用我们想提请您注意有关我们平台上 $ICP 存款地址的我们想提请您注意有关我们平台上 $ICP 存款地址的重要更新。
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();

const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.content {
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100vh;
}

.wrapper {
	padding: 36px 24px;

	.message {
    @include themeify {
      background: themed("BG3");
    }
    padding: 24px;
    border-radius: 16px;

		.time {
			margin-top: 12px;
			margin-bottom: 16px;

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
			//margin: 20px 0;
		}

		.text_content {
			width: 100%;
			@include themeify {
				color: themed("T1");
			}
			font-family: "PingFang SC";
			font-size: 26px;
			font-style: normal;
			font-weight: 400;
			line-height: 36px;
		}
	}
}
</style>
