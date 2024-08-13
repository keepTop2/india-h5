<template>
	<VantNavBar @onClickLeft="onClickLeft">
		<template v-slot:left>
			<SvgIcon class="back" iconName="/vantNavBar/back" />
		</template>
	</VantNavBar>

	<div class="content">
		<div class="image">
			<VantLazyImg :src="err_img" />
		</div>
		<h1>{{ $t('error["访问限制"]') }}</h1>
		<p>{{ $t('error["尊敬的用户2"]') }}</p>
		<span>{{ $t('error["ip"]') }}</span>
	</div>

	<div class="footer">
		<Button>{{ $t('error["联系客服"]') }}</Button>
	</div>
</template>

<script setup lang="ts">
import err_img from "/@/assets/zh-CN/default/error/ipsx_img.png";
import { useRouter } from "vue-router";
const router = useRouter();
const onClickLeft = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.back {
	width: 36px;
	height: 36px;
}

.content {
	margin-top: 100px;
	padding: 0px 135px;
	.image {
		width: 480px;
		height: 480px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16px;
		@include themeify {
			background-color: themed("BG4");
		}
		img {
			width: 450px;
			height: 450px;
		}
	}
	h1 {
		padding: 32px 0px;
		@include themeify {
			color: themed("T1");
		}
		text-align: center;
		font-family: "PingFang SC";
		font-size: 40px;
		font-weight: 500;
	}

	p {
		padding: 16px 0px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}

	span {
		display: inline-block;
		margin-top: 32px;
		@include themeify {
			color: themed("T1");
		}
		font-family: "PingFang SC";
		font-size: 24px;
		font-weight: 400;
	}
}
.footer {
	margin-top: 100px;
	padding: 55px;
}
</style>
