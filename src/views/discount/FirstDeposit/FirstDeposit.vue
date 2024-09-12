<template>
  <div class="first-deposit-activity">
	<VantNavBar title="首存活动" @onClickLeft="onClickLeft" />
    <header>
      <SvgIcon class="header-text" iconName="discount/headerText"/>
      <h2>THE HIGHEST GIFT IS 11664</h2>
    </header>

    <div class="content">
      <img src="https://placehold.co/600x400" alt="Casino themed collage with playing cards, slot machine, cartoon characters and a smiling woman" class="main-image">
      
      <div class="bonus-card">
        <div class="bonus-header">红利赠送</div>
        <div class="bonus-content">
          <div class="bonus-row">
            <span>存款金额</span>
            <span>${{ depositAmount }}</span>
          </div>
          <div class="bonus-row">
            <span>需打流水</span>
            <span>${{ requiredTurnover }}</span>
          </div>
          <div class="bonus-row highlight">
            <span>可得金额:</span>
            <span>${{ bonusAmount }}</span>
          </div>
        </div>
        <button class="apply-button">立即申请</button>
      </div>

      <div class="activity-details">
        <h3>活动条件</h3>
        <div class="detail-row">
          <img src="https://placehold.co/30x30" alt="Target icon" class="icon">
          <span class="label">活动对象</span>
          <span class="value">全体会员</span>
        </div>
        <div class="detail-row">
          <img src="https://placehold.co/30x30" alt="Clock icon" class="icon">
          <span class="label">活动时间</span>
          <span class="value">{{ activityPeriod }}</span>
        </div>
        <div class="detail-row">
          <img src="https://placehold.co/30x30" alt="Info icon" class="icon">
          <span class="label">活动描述</span>
          <span class="value">{{ activityDescription }}</span>
        </div>
      </div>

      <div class="activity-rules">
        <h3>活动规则</h3>
        <p>活动时间: {{ rulesPeriod }}</p>
        <p>活动对象: {{ rulesTarget }}</p>
        <ol>
          <li v-for="rule in activityRules" :key="rule">{{ rule }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const router = useRouter();
const depositAmount = ref(100.00);
const requiredTurnover = ref(100.00);
const bonusAmount = ref(50.00);

const activityPeriod = ref('2024-08-10 12:00:00 ~2024-08-10 12:00:00');
const activityDescription = ref('所有会员每日（美东时间）在真人场馆投注即可参与流水排名，每日前10名将按比例瓜分奖池');

const rulesPeriod = ref('2024年1月15日~长期');
const rulesTarget = ref('首存会员');
const activityRules = ref([
  '这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是活动内容活动内容这是活动内容活动内容活动内容活动内容这是',
  '这是活动内容活动内容活动内容这是活动内容活动内容活动内容这是活动内容活动内容这是活动内容活动内容活动内容活动内容这是'
]);
const onClickLeft = () => {
	router.push({ path: "/discount" });
};
</script>

<style lang="scss" scoped>
.first-deposit-activity {
  :deep(.vantNavBar){
    box-shadow: none;
  }
  min-height: 100vh;
	background: url("/@/assets/zh-CN/default/vip/vip_content_bg.png") center top / 100% 100% no-repeat;
	background-attachment: fixed;
	/* 背景图像固定 */
	box-sizing: border-box;

  header {
    text-align: center;
    margin-bottom: 20px;
    margin-top:60px;
    h1 {
      background: linear-gradient(90deg, #FF284B 0%, #FF667F 50%, #FF284B 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 22px;
      text-align: center;
      text-shadow: 0px 4px 4px rgba(255, 40, 75, 0.30);
      font-family: "Paytone One";
      font-size: 50px;
      font-style: normal;
      font-weight: 400;
      line-height: 42px; /* 84% */
      text-transform: uppercase;
    }

    h2 {
      font-size: 18px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-image {
    width: 100%;
    max-width: 600px;
    margin-bottom: 20px;
  }

  .bonus-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;

    .bonus-header {
      background-color: #ff7f7f;
      color: white;
      padding: 10px;
      text-align: center;
    }

    .bonus-content {
      padding: 15px;
      color: black;

      .bonus-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        &.highlight {
          color: #ff4d4d;
          font-weight: bold;
        }
      }
    }

    .apply-button {
      background-color: #ff4d4d;
      color: white;
      border: none;
      width: 100%;
      padding: 15px;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .activity-details, .activity-rules {
    background-color: #2a2a2a;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;

    h3 {
      border-bottom: 1px solid #444;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }

    .detail-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      .label {
        width: 80px;
      }

      .value {
        flex: 1;
      }
    }
  }

  .activity-rules {
    ol {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
    }
  }
}
</style>