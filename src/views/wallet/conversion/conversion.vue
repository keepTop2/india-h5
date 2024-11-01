<template>
    <div class="content">
        <VantNavBar title="平台币转换" @on-click-left="onClickLeft" :leftArrow="true" />
        <div class="price_box">
            <div class="top">
                <div class="title">
                    <div class="font">From</div>
                    <div class="icon_label">
                        <SvgIcon class="icon" iconName="my/conversion/qianbao" />
                        <div>{{userPlat?.platAvailableAmount}}</div>
                        <div>{{userPlat?.platCurrency}}</div>
                    </div>
                </div>

                <div class="type_pay">
                    <SvgIcon class="icon" iconName="my/conversion/top_pay" />
                    <div class="type_title">{{userPlat?.platCurrency}}</div>
                </div>
                <!--支付输入框  -->
                <div class="pay_input">
                    <van-field  v-model.number="formInput"   @keyup="numberFixedDigit" />
                    <span class="max">MAX</span>
                </div>
            </div>
            <div class="arrow_down"></div>
            <div class="bottom">
                <div class="title">
                    <div class="font">To</div>
                </div>

                <div class="type_pay">
                    <SvgIcon class="icon" iconName="my/conversion/us" />
                    <div class="type_title">{{userPlat?.userCurrencyCode}}</div>
                </div>
                <!--支付输入框  -->
                <div class="pay_input">
                    <van-field  v-model="toInput" :disabled="true" />
                </div>
                <div class="log">
                    Exchange Rate：{{userPlat?.transferRate}}
                </div>
            </div>

            <div class="btn" :class="{contrast:parseFloat(formInput) <= 0}" @click="conversionHandler">一键转换</div>
        </div>
    </div>    
</template>
  
<script setup lang='ts'>
import { showToast } from 'vant';
import { walletApi } from '/@/api/wallet';
import Common from '/@/utils/common';
import router from '/@/router';

interface userinfoType{
    userAccount: string;
	siteCode: string;
	platAvailableAmount: number;
	platCurrency: string;
	transferRate: number;
	userAvailableAmount: number;
	userCurrencyCode: string;
}

const formInput = ref<string>('0.00')
const toInput = ref<string>('0')
const userPlat = ref<userinfoType>()
// 金额补零
watch(
    [() => formInput.value,() => toInput.value],
    (arr) => {
        console.log(arr)
        formInput.value = parseFloat(arr[0]).toFixed(2)
        toInput.value = parseFloat(arr[1]).toFixed(2)
    }, {immediate:true}
)

onMounted(() => {
    getUserPlatformBalance()
})

const numberFixedDigit = (e) => {
    e.target.value = e.target.value.replace(/[^\d.]/g, "");
    e.target.value = e.target.value.replace(/\.{2,}/g, ".");
    e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    e.target.value = e.target.value.replace(/^\./g, ''); //首位不能输入“.”
    if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//如果没有小数点，首位不能为0，如01、02...
        e.target.value = parseFloat(e.target.value);
    }
    nextTick(() => {
        formInput.value = e.target.value
  })
    
}

// 返回上一页
const onClickLeft = () => {
	router.go(-1);
};

// 获取余额、汇率
const getUserPlatformBalance = async() => {
    const {code,data} = await walletApi.requestGetPlatformBalance().catch((err) => err);
    if (code !== Common.getInstance().ResCode.SUCCESS) return 

    userPlat.value = data
}

// 转换金额
const conversionHandler = async () => {
    if (parseFloat(formInput.value) <= 0) {
        showToast("请输入转换金额");
        return    
    }

    const body = {
        transferAmount:parseFloat(formInput.value)
    }
    const {code,data} = await walletApi.conversionAmount(body).catch((err) => err);

    if (code !== Common.getInstance().ResCode.SUCCESS) return 

    toInput.value = (parseFloat(formInput.value) * userPlat.value!.transferRate) + ''

    getUserPlatformBalance()

    showToast("转换成功");

}

</script>
  
<style lang="scss" scoped>
.content {
    @include themeify {
        background: themed("TG1");
    }
    .price_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 25px;
        gap: 15px;
        position: relative;
        .arrow_down{
            width: 64px;
            height: 64px;
            background: url("/@/assets/zh-CN/default/my/conversion/arrow_down.png") no-repeat no-repeat;
            background-size: contain;
            position: absolute;
            top: 345px;
        }
        .top,.bottom{
            width: 702px;
            height: 340px;
            padding: 30px 40px;
            box-sizing: border-box;
            background: url("/@/assets/zh-CN/default/my/conversion/Subtract.png") no-repeat no-repeat;
            background-size: contain;
            .title{
                display: flex;
                justify-content: space-between;

                .font {
                    font-size: 28px;
                    @include themeify {
                        color: themed("T1");
                    }
                }
                .icon_label{
                    font-size: 28px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    @include themeify {
                        color: themed("TB");
                    }
                    .icon{
                        width: 32px;
                        height: 32px;
                    }
                }
                
            }
            .type_pay{
                display: flex;
                align-items: center;
                gap: 20px;
                margin-top: 26px;
                margin-bottom: 35px;
                .icon{
                    width: 56px;
                    height: 56px;
                }
                .type_title{
                    @include themeify {
                        color: themed("TB");
                    }
                    font-family: "PingFang SC";
                    font-size: 34px;
                }
            }
            .pay_input{
                position: relative;
                border-bottom: 1px solid;
                @include themeify {
                    border-color: themed("Tag1");
                }
                .max{
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    @include themeify {
                        color: themed("TB");
                    }
                }
                :deep(.van-field){
                    height: auto !important;
                    background-color: transparent;
                    border-bottom: 1px solid;
                    padding: 0;
                    @include themeify {
                        border-color: themed("Tag1");
                    }
                    input{
                        @include themeify {
                            color: themed("TB") !important;
                        }
                        font-family: "DIN Alternate";
                        font-size: 60px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                    }
                    
                }
                :deep(.van-cell:after){
                    border: none !important;
                }
            }
            .log{
                @include themeify {
                    color: themed("T1");
                }
                margin-top: 5px;
                font-size: 24px;
            }
        }
        .bottom{
            background: url("/@/assets/zh-CN/default/my/conversion/bottom.png") no-repeat no-repeat;
            background-size: contain;
        }
        .btn{
            margin-top: 20px;
            box-sizing: border-box;
            border-radius: 16px;
            @include themeify {
                color: themed("TB");
            }
            @include themeify {
                background: themed("Theme");
            }
            cursor: pointer;
            display: flex;
            width: 702px;
            height: 86px;
            padding: 10px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
        }
        .contrast{
            filter: contrast(0.5);
        }
       
        
    }
}  
</style>