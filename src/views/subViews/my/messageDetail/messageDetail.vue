<template>
	<div class="content">
    <VantNavBar title="消息中心" @onClickLeft="onClickLeft"/>

		<div class="wrapper">
			<div class="message">
        <div class="text_title">
          <div v-html="messageContentI18nCode"></div>
        </div>
				<div class="time">
          <span class="label">{{ new Date(+createdTime).toLocaleString() }}</span>
				</div>
				<div ref="textRefs" class="text_content">
          <div v-html="noticeTitleI18nCode"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute()
const {messageContentI18nCode, noticeTitleI18nCode, targetId, createdTime} = route.query;

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
