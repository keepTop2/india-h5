<template>
	<div class="BetLatest">
		<div class="content fs_28">
			<!-- <h3 class="color_TB fs_32">规则-每日投注大赛</h3>
			<span class="fs_24">{{ Time }}</span>
			<br /> -->
			1.比赛奖池与资金密切相关，玩家下注越多，奖池越大。当前奖池将显示在竞赛页面上。<br />
			2. 10名下注最多的玩家瓜分奖池。<br />
			3.本次比赛支持投注币种：XEN, MATIC, COP, APT, UAH, IOTX, SHIB, KES, XOF, NEAR, WLD, HNT, FLOOR, IDR, RUNE, DOG, DGB, VNDC, BCD, BSV, NBX,
			BCH、SUI、CAKE、DOT、BCL、JST、BANANO、SUNOLD、BTCB、GMT、BTC、TWT、ARB、AVAX、TON、GMX、BTG、AMPL、XAF、UZS、FTM、BTTOLD、ONE、JPEG、SUSHI、
			ALGO、KRW、ATOM、BIGTIME、WBTC、SAMO、GODS、SNX、KUMA、KGS、MANA、EUR、ROSE、WAXP、SATS、ARS、VTHO、DAI、MXN、USD、SOL、ETC、ICP、BNB、USTC、
			BLUR、ETH、CELO、KLAY、TOMO、ADA、ICX、PAR、VET、MMK、DOGE、GBP、USDC.e、USDT、HBAR、RVN、DASH、NANO、TZS、WAVES、VND、XRP、WBNB、SNACK、卢布、FLOKI、EGP、TRX、NFT、AZN、日元、马币、SUNNEW、GHS、JOE、KAVA、SAND、AMP、澳元、巴西雷亚尔、BDT、AVC、UGX、泰铢、DCR、PEN、KZT、TUSD、NZD、
			USDT.e、EGLD、LTC、USDC、KAS、KHR、THETA、VSYS、ENJ、CRO、AED、CRV、CLP、NEXO、TFUEL、LUNA、NEWBTT、AAVE、EURS、NGN、UNI、MDL、NOK、MAGIC、
			CAD、XLM、PHP、LINK、YFI、QTUM、XTZ、OP、KSM、ELON、GM、INR、TAMA、EOS、FIL、GST、WETH、BIT、AXE、GALA、BAT、APE、YGG、HEX、PEOPLE、 AXS、ZIL、XMR、WCK、PKR<br />
			4.您可以使用以上任意币种下注，所有币种均会按照当前汇率兑换为USDT。<br />
			5.所有奖品均以BCD形式发送。<br />
			6.奖品将在比赛结束时在通知页面发送。<br />
			7. BC.GAME 保留在比赛任何阶段排除违反我们规则的玩家的权利。<br />
			8. BC.GAME保留自行决定更改任何规则和条件的权利，恕不另行通知。<br />
			🌟🌟祝你好运，玩得开心！🌟🌟<br />
			<br />
			<h3>奖金计算公式</h3>
			<br />
			第一名–每日竞赛奖金池的50%<br /><br />
			第二名–每日竞赛奖金池的25%<br /><br />
			第三名–每日竞赛奖金池的12%<br /><br />
			第四名 –每日竞赛奖金池的6%<br /><br />
			第五名 –每日竞赛奖金池的3%<br /><br />
			第六名–每日竞赛奖金池的1.5%<br /><br />
			第七名–每日竞赛奖金池的0.9%<br /><br />
			第八名 –每日竞赛奖金池的0.7%<br /><br />
			第九名 –每日竞赛奖金池的0.5%<br /><br />
			第十名 –每日竞赛奖金池的0.4%<br />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
const router = useRouter();
const Time = ref("2024/01/05 ～ 2024/01/06");
/**
 * 投注比赛
 */
const defaultProps = {
	// 表格数据
	data: [
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
		{
			name: "麻将",
			player: "Tom",
			multiple: "1.00",
			Profit: "0.000099",
		},
	],

	// 列定义
	columns: [
		{ field: "name", label: "游戏" },
		{ field: "player", label: "玩家" },
		{ field: "multiple", label: "倍数" },
		{ field: "Profit", label: "盈利" },
	],
};
const onClickLeft = () => {
	router.push({ path: "/bettingMatch" });
};
</script>

<style lang="scss">
.BetLatest {
	// height: 100vh;
	@include themeify {
		// background: themed("BG3");
		color: themed("T1");
	}
	.content {
		@include themeify {
			// background: themed("BG3");
		}
		// padding-top: 24px;
		padding-bottom: 24px;
		overflow-y: scroll;
		line-height: 38px;
		font-family: "PingFang SC";
		h3 {
			margin-bottom: 12px;
		}
		span {
			margin-bottom: 24px;
			display: inline-block;
		}
	}
}
</style>
