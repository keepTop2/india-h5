<template>
	<!-- 活动 -->
	<VantNavBar title="2024年新年投注赛" @onClickLeft="onClickLeft" />

	<div class="discount_container">
		<VantLazyImg class="discount_img" :src="discount1" />

		<div class="img_container">
			<div class="text_container">
				<VantLazyImg class="title_img" :src="left_img" />
				<div class="title">活动内容</div>
				<VantLazyImg class="title_img" :src="right_img" />
			</div>
			<div class="date">
				<div class="deadline">活动时间：<span>2023-12-12 00:00:00～2023-12-31 23:59:59</span></div>
				<div class="activity_name">活动对象：<span>全体会员</span></div>
			</div>
		</div>
		<div class="img_container">
			<div class="text_container">
				<VantLazyImg class="title_img" :src="left_img" />
				<div class="title">活动详情</div>
				<VantLazyImg class="title_img" :src="right_img" />
			</div>
			<div class="date">
				<div class="activity_name">10%每日首存红利</div>
				<div class="activity_name">最高可获得 $ 888</div>
				<div class="activity_name">活动详情:</div>
				<VantLazyImg class="discount_img" :src="discount1" />
				<div class="activity_name">1.新会员可领首存50%赠金</div>
				<div class="activity_name">2.每位会员只能申请一个存款奖金</div>
				<div class="activity_name">3.存款与奖金需要完成下注10倍流水任务</div>
				<div class="activity_name">例：您需要进行有效投注：[存款 $500 +奖金</div>
				<div class="activity_name">$250]x10= $ 7,500</div>
				<div class="activity_name">4.系统会跟踪任何形式的欺诈行，并冻结帐户进行处理；</div>
				<div class="activity_name">5.[平台名称]条款与条件适用</div>
				<VantLazyImg class="discount_img" :src="discount1" />
			</div>
		</div>
		<div class="img_container">
			<div class="text_container">
				<VantLazyImg class="title_img" :src="left_img" />
				<div class="title">活动规则</div>
				<VantLazyImg class="title_img" :src="right_img" />
			</div>
			<div class="date">
				<div class="activity_name">10%每日首存红利</div>
				<div class="activity_name">最高可获得 $ 888</div>
				<div class="activity_name">活动详情:</div>
				<br />
				<div class="activity_name">1.新会员可领首存50%赠金</div>
				<div class="activity_name">2.每位会员只能申请一个存款奖金</div>
				<div class="activity_name">3.存款与奖金需要完成下注10倍流水任务</div>
				<div class="activity_name">例：您需要进行有效投注：[存款 $500 +奖金</div>
				<div class="activity_name">$250]x10= $ 7,500</div>
				<div class="activity_name">4.系统会跟踪任何形式的欺诈行，并冻结帐户进行处理；</div>
				<div class="activity_name">5.[平台名称]条款与条件适用</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import discount1 from "../image/image.png";
import left_img from "../image/left_img.png";
import right_img from "../image/right_img.png";
import { useRouter } from "vue-router";
const router = useRouter();
const onClickLeft = () => {
	router.push({ path: "/discount" });
};
</script>

<style lang="scss" scoped>
.discount_container {
	padding: 24px;
	padding-top: 0;
	padding-bottom: 220px;
	// width: 100%;
	min-height: 100vh;
	@include themeify {
		background-color: themed("BG1");
	}
	.discount_img {
		margin: 24px 0;
		height: 300px;
		width: 100%;
		border-radius: 16px;
		// background: url(<path-to-image>) lightgray 50% / cover no-repeat;
	}
	.img_container {
		border-radius: 16px;
		@include themeify {
			background: themed("BG3");
		}
		margin-top: 24px;
		padding: 24px;
		.text_container {
			display: flex;
			justify-content: center;
			align-items: center;

			.title {
				@include themeify {
					color: themed("TB");
				}

				/* Title1-标题1 */
				font-family: "PingFang SC";
				font-size: 32px;
				font-style: normal;
				font-weight: 400;
				line-height: 42px; /* 131.25% */
				padding: 0 32px;
			}
			.title_img {
				width: 140px;
				height: 10px;
			}
		}
	}
	.date {
		margin-top: 24px;
		.deadline {
			margin-bottom: 24px;
			@include themeify {
				color: themed("T1");
			}

			/* Text2-文本2 */
			font-family: "PingFang SC";
			font-size: 26px;
			font-style: normal;
			font-weight: 400;
			line-height: 36px; /* 138.462% */
			span {
				@include themeify {
					color: themed("T1");
				}
				font-family: "DIN Alternate";
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 34px; /* 141.667% */
			}
		}
		.activity_name {
			@include themeify {
				color: themed("T1");
			}
			/* Text2-文本2 */
			font-family: "PingFang SC";
			font-size: 26px;
			font-style: normal;
			font-weight: 400;
			line-height: 36px; /* 138.462% */
		}
	}
}
</style>
