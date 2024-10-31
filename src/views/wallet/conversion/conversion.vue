<template>
    <div class="content">
        <VantNavBar title="平台币转换" :leftArrow="true" />
        <div class="price_box">
            <div class="top">
                <div class="title">
                    <div class="font">From</div>
                    <div class="icon_label">
                        <SvgIcon class="icon" iconName="my/conversion/qianbao" />
                        <div>100.00</div>
                        <div>BCD</div>
                    </div>
                </div>

                <div class="type_pay">
                    <SvgIcon class="icon" iconName="my/conversion/top_pay" />
                    <div class="type_title">BCD</div>
                </div>
                <!--支付输入框  -->
                <div class="pay_input">
                    <van-field type="number"  v-model="toInput" />
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
                    <div class="type_title">USD</div>
                </div>
                <!--支付输入框  -->
                <div class="pay_input">
                    <van-field  v-model="formInput" />
                </div>
                <div class="log">
                    Exchange Rate：1.2
                </div>
            </div>

            <div class="btn">一键转换</div>
        </div>
    </div>    
</template>
  
<script setup lang='ts'>
const formInput = ref<string>('0')
const toInput = ref<string>('0')
watch(
    [() => formInput.value,() => toInput.value],
    (arr) => {
        formInput.value = parseFloat(arr[0]).toFixed(2)
        toInput.value = parseFloat(arr[1]).toFixed(2)
    }, {immediate:true}
  )

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
       
        
    }
}  
</style>