import ResCode from "./resCode";
import SubMap from "./subMap";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { showToast } from "vant";
import { Decimal } from "decimal.js";
// 引入复制插件
import useClipboard from "vue-clipboard3";
import GameApi from "/@/api/venueHome/games";
import mitt from "mitt";
import qs from "qs";
import router from "../router";
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.locale("en");

// dayjs.tz.setDefault('Asia/Shanghai')
/**
 * 公共类，单例模式
 */
class Common {
	private static instance: Common;
	private constructor() {}
	public static getInstance() {
		if (!Common.instance) {
			Common.instance = new Common();
		}
		return Common.instance;
	}

	static buryMap = {
		web: "0",
		tuite: "1",
		youtube: "2",
		facebook: "3",
		donate: "4",
	};

	// 4-11位字母+数字组成，首位必须是字母
	public static accountRG = /^[a-zA-Z][a-zA-Z0-9]{3,10}$/;

	// 8-16位，必须包含数字和字母
	public static passwordRG = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

	// 邮箱正则
	public static emailRG = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// 手机号正则 8-12数字
	public static phoneRG = /^\d{8,12}$/;

	// 交易密码 6位数字
	public static tradingPasswordRG = /^\d{6}$/;

	// 后端code
	public ResCode = ResCode;

	/**
	 * @description 账号类型字典
	 * 1:试玩账号(随便逛逛)
	 * 2:正式账号
	 */
	public AccountType = {
		//试玩账号
		demoAccount: 0,
		//正式账号
		userAccount: 2,
	};

	/**
	 * @description 场馆状态或游戏状态
	 * open:开启
	 * maintain:维护
	 * disabled：禁用
	 */
	public gameStatus = {
		//开启中
		open: 1,
		//维护中
		maintain: 2,
		//已禁用
		disabled: 0,
	};

	// //发布订阅实例
	public emitter = mitt();
	//事件字典
	public SubMap = SubMap;

	/**
	 * @description 获取终端设备
	 * @returns number
	 */
	public getDevice = (): string => {
		const agent: string = navigator.userAgent.toLowerCase();
		let device: string = "";
		if (/windows/.test(agent)) {
			device = "windows_pc";
		} else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
			device = "iphone";
		} else if (/ipad/.test(agent) && /mobile/.test(agent)) {
			device = "ipad";
		} else if (/android/.test(agent) && /mobile/.test(agent)) {
			device = "android";
		} else if (/linux/.test(agent)) {
			device = "linux_pc";
		} else if (/mac/.test(agent)) {
			device = "mac";
		} else {
			device = "other";
		}
		return device;
	};

	/**
	 * @description 保留n位小数 截断
	 * @param num 值
	 * @param n 几位小数
	 * @returns
	 */
	public formatFloat(num: number | string, n: number = 2) {
		const f_x = parseFloat(num);
		if (isNaN(f_x)) {
			return 0;
		}
		let s_x = num.toString();
		let pos_decimal = s_x.indexOf(".");
		if (pos_decimal < 0) {
			pos_decimal = s_x.length;
			if (n != 0) {
				s_x += ".";
			} else {
				return s_x;
			}
		}
		if (s_x.length <= pos_decimal + n) {
			while (s_x.length <= pos_decimal + n) {
				s_x += "0";
			}
		} else {
			s_x = s_x.substring(0, pos_decimal + n + 1);
		}
		return s_x;
	}

	/**
	 * @description 若超出10位数，千位用K表示
	 */
	public formatAmount(number) {
		const absNumber = Math.abs(number);
		const threshold = 10000000;
		let formattedNumber = "" as number | string;
		if (absNumber >= threshold) {
			const quotient = Math.floor(this.div(absNumber, 1000));
			formattedNumber = `${quotient}K`;
		} else {
			formattedNumber = this.formatFloat(Number(absNumber));
		}
		// 处理负数情况
		if (number < 0) {
			formattedNumber = "-" + formattedNumber;
		}
		return formattedNumber;
	}

	/**
	 * @param name
	 * @returns boolean
	 * @description 判断是否有效真实姓名
	 */
	public isActualName(name: string): boolean {
		const isHavaPeriod = name.indexOf("。");
		if (isHavaPeriod != -1) {
			return false;
		}

		const pointIndexOf = name.indexOf(".");
		// const pointLastindexOf = name.lastIndexOf("·")
		if (pointIndexOf == 0) {
			return false;
		}
		//替换.
		name = name.replace(".", "");
		name = name.replace("·", "");
		// console.log(name)
		//正则
		const pattern = /^[\u4e00-\u9fa5a-zA-Z.]+$/;
		if (!pattern.test(name)) {
			return false;
		}
		return true;
	}

	/**
	 * @param name
	 * @returns boolean
	 * @description 判断是否有效真实别名
	 */
	public isAlias(name: string): boolean {
		console.log(name);
		//正则
		const pattern = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
		if (!pattern.test(name)) {
			console.log(12323);
			return false;
		}
		return true;
	}

	/**
	 * 获取当前时间
	 */
	public getDateNow(): number {
		return dayjs().valueOf();
	}

	/**
	 * 时间戳转化为年月日
	 */
	static dayFormatHMS(date: any): string {
		if (date) {
			return dayjs(date).format("HH:mm:ss");
		}
		return "";
	}
	/**
	 * 时间戳转化为年月日
	 */
	public dayFormat1(date: number | string | null): string {
		if (date) {
			return dayjs(date).tz("Asia/Shanghai").format("YYYY-MM-DD");
		}
		return "";
	}

	/**
	 * 时间戳转化为年月日时分秒
	 */
	public dayFormat2(date: number | string | null): string {
		if (date) {
			return dayjs(Number(date)).format("YYYY-MM-DD HH:mm:ss");
		}
		return "";
	}

	/**
	 * 时间戳转化月日时分秒
	 */
	public dayFormat3(date: number | string | null): string {
		if (date) {
			return dayjs(Number(date)).tz("Asia/Shanghai").format("MM-DD HH:mm:ss");
		}
		return "";
	}

	/**
	 * 时间戳转化 月日时分 样式为点
	 */
	public dayFormat4(date: number | string | null): string {
		if (date) {
			return dayjs(Number(date)).tz("Asia/Shanghai").format("MM.DD HH:mm");
		}
		return "";
	}

	/**
	 * 时间转化 所罗门群岛时区
	 */
	public dayForMat5(date: number | string | null) {
		if (date) {
			return dayjs(date).tz("Pacific/Guadalcanal").format("DD MMM YYYY");
		}
	}

	/**
	 * @description 时间戳转化时间组件 年月
	 * @param date
	 */
	public dayForMat6(date): string {
		return dayjs(Number(date)).tz("Asia/Shanghai").format("YYYY-MM");
	}

	/**
	 * @description 时间戳转化时间组件 年月日
	 * @param date
	 */
	public dayForMat7(date): string {
		return dayjs(Number(date)).tz("Asia/Shanghai").format("YYYY-MM-DD");
	}

	/**
	 * @description 切换类名
	 */
	public changeClass(item): string {
		if (!item?.oddsChange) {
			return "";
		} else if (item?.oddsChange == "oddsUp") {
			return "oddsUp";
		} else if (item?.oddsChange == "oddsDown") {
			return "oddsDown";
		}
		return "";
	}
	/**
	 * 上传验证
	 */
	public beforeAvatarUpload(file): boolean {
		if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
			showToast("上传图片只能是 jpg,jpeg,png 格式!");
			return false;
		}
		if (file.size / 1024 / 1024 > 5) {
			showToast("上传图片大小不能超过 5MB!");
			return false;
		}
		return true;
	}

	/**
	 * @description 下载二维码图片
	 * @param canvas
	 */
	public downloadQrcode(canvas: HTMLCanvasElement): void {
		const a: HTMLAnchorElement = document.createElement("a");

		const date = this.dayFormat2(Date.parse(String(new Date())));
		a.download = `${date}.jpg`;
		a.href = canvas.toDataURL("image/jpeg");
		document.body.append(a);
		a.click();
		a.remove();
	}

	/**
	 *
	 * @param 下载图片
	 */
	public downloadIamge(imgsrc: string) {
		const name = this.dayFormat2(Date.parse(String(new Date())));
		//下载图片地址和图片名
		const image = new Image();
		// 解决跨域 Canvas 污染问题
		image.setAttribute("crossOrigin", "anonymous");
		image.onload = function () {
			const canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			const context = canvas.getContext("2d");
			context?.drawImage(image, 0, 0, image.width, image.height);
			const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
			const a = document.createElement("a"); // 生成一个a元素
			const event = new MouseEvent("click"); // 创建一个单击事件
			a.download = name || "photo"; // 设置图片名称
			a.href = url; // 将生成的URL设置为a.href属性
			a.dispatchEvent(event); // 触发a的单击事件
		};
		image.src = imgsrc;
	}

	/**
	 * @description 银行卡号显示格式化
	 */
	public formatBankCard(cardNumber) {
		return cardNumber.replace(/(.{4})/g, "$1 ");
	}

	/**
	 * @description 转换银行卡号
	 */
	public bankCardHiding(number: string) {
		if (number) {
			const hiddenChars = " **** **** ";
			const visibleChars = number.slice(0, 4) + hiddenChars + number.slice(-4);
			return visibleChars;
		}
	}

	/**
	 * @description 转换USDT地址
	 */
	public USDTAddressHiding(number: string) {
		if (number) {
			if (number === "**** **** **** ****") {
				return number;
			} else {
				const hiddenChars = " **** **** ";
				const visibleChars = number.slice(0, 6) + hiddenChars + number.slice(-6);
				return visibleChars;
			}
		}
	}

	/**
	 * @description 转换手机号码
	 */
	public phoneNumberHiding(number: string) {
		if (number) {
			const hiddenChars = "****";
			const visibleChars = number.slice(0, 3) + hiddenChars + number.slice(-4);
			return visibleChars;
		}
	}

	/**
	 * @description 转换姓名
	 */
	public userNameHiding(number: string) {
		if (number) {
			const hiddenChars = "**";
			const visibleChars = number.slice(0, 1) + hiddenChars + number.slice(2);
			return visibleChars;
		}
	}

	/**
	 *  @describe 金额三位数分割逗号
	 */
	public thousands(num): string {
		if (num || num == 0) {
			const str = String(num);
			const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
			return str.replace(reg, "$1,");
		}
		return "";
	}

	/**
	 * @description 加法
	 * @param a
	 * @param b
	 * @returns a+b
	 */
	public add = (a, b): number => Number(new Decimal(Number(a)).add(new Decimal(Number(b))));

	/**
	 * @description 减法
	 * @param a
	 * @param b
	 * @returns a-b
	 */
	public sub = (a, b) => Number(new Decimal(Number(a)).sub(new Decimal(Number(b))));

	/**
	 * @description 乘法
	 * @param a
	 * @param b
	 * @returns a*b
	 */
	public mul = (a, b) => Number(new Decimal(Number(a)).mul(new Decimal(Number(b))));

	/**
	 * @description 除法
	 * @param a
	 * @param b
	 * @returns a/b
	 */
	public div = (a, b): number => Number(new Decimal(Number(a)).div(new Decimal(Number(b))));

	/**
	 * @description 复制
	 * @param value
	 */
	public async copy(value: string | number): Promise<void> {
		const { toClipboard } = useClipboard();
		try {
			//复制
			await toClipboard(String(value));
			showToast("复制成功");
		} catch (e) {
			//复制失败
			// console.log("error", e);
			showToast("复制失败");
		}
	}

	/**
	 * @param {*} paramsName 参数字段
	 * @returns
	 * @description 获取浏览器地址栏参数
	 */
	public getQueryVariable(paramsName) {
		const url = window.location.href; // 获取url中"?"符后的字串
		const theRequest = {};
		if (url.indexOf("?") != -1) {
			const index = url.indexOf("?");
			const str = url.substr(index + 1);
			const strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest[paramsName];
	}

	/**
	 * @description 获取本月开始时间时间戳
	 */
	public currentMonth(): number {
		return dayjs(new Date()).tz("Asia/Shanghai").startOf("month").valueOf();
	}

	/**
	 *
	 * @returns 获取今天结束时间 时间戳
	 */
	public currentEndDay(): number {
		return dayjs(new Date()).tz("Asia/Shanghai").endOf("day").valueOf();
	}

	/**
	 *
	 * @returns 获取上月第一号开始时间 Date格式
	 */
	public lastMonthFirstDayDate(): Date {
		return dayjs().subtract(1, "month").startOf("month").toDate();
	}
	/**
	 * @description 将年月 YYYY-MM 转化为时间戳 (每月开始时间)
	 * @param date
	 */
	public dayForMat8(date: string): number {
		return dayjs(date, "YYYY-MM").tz("Asia/Shanghai").startOf("month").valueOf();
	}

	/**
	 * @description 将年月 YYYY-MM 转化为时间戳 (每月结束时间)
	 * @param date
	 */
	public dayForMat11(date: string): number {
		return dayjs(date, "YYYY-MM").tz("Asia/Shanghai").endOf("month").valueOf();
	}

	/**
	 * @description 将年月日 YYYY年-MM-DD 转化为时间戳(每天开始时间)
	 * @param date
	 */
	public dayForMat9(date: string): number {
		return dayjs(date, "YYYY年-MM-DD").tz("Asia/Shanghai").startOf("day").valueOf();
	}

	/**
	 * @description 将年月日 YYYY年-MM-DD 转化为时间戳(每天结束时间)
	 * @param date
	 */
	public dayForMat10(date: string): number {
		return dayjs(date, "YYYY年-MM-DD").tz("Asia/Shanghai").endOf("day").valueOf();
	}
	// 获取 config 配置请求 api
	static getUrl() {
		switch (import.meta.env.VITE_BASEENV) {
			case "development":
				return (window as any)["PLATFROM_CONFIG"].developS128Url;
			case "production":
				return (window as any)["PLATFROM_CONFIG"].productionS128Url;
			default:
				return "";
		}
	}
	static goToGame(gameinfo: any) {
		const params = {
			venueCode: gameinfo.venueCode,
			gameCode: gameinfo.gameCode,
		};
		GameApi.gameLogin(params).then((res: any) => {
			if (res.code === ResCode.SUCCESS) {
				const { source, userAccount, type } = res.data;
				const state = {
					source: "",
					userAccount: "",
					type: "",
				};
				switch (type) {
					case "url": {
						state.source = source;
						state.userAccount = userAccount;
						state.type = type;
						break;
					}
					case "html": {
						// 将HTML编码的文本字符串转换为Blob对象
						const blob: any = new Blob([source], { type: "text/html" });
						// 将Blob对象作为iframe的源
						state.source = URL.createObjectURL(blob);
						// window.open(state.source, "_blank");
						// window.open(state.source, "_self");
						state.userAccount = userAccount;
						state.type = type;
						break;
					}
					case "token": {
						const params = {
							session_id: source,
							lang: "zh-CN",
							login_id: userAccount,
						};
						const url = this.getUrl();
						state.source = url + `/api/cash/auth?${qs.stringify(params)}`;
						state.userAccount = userAccount;
						state.type = type;
						break;
					}
					default:
						break;
				}
				console.log(state);

				router.push({ path: "/gamePage", query: { ...state } });
			} else {
				showToast(res.message);
			}
		});
	}
	static convertMilliseconds(ms: number) {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const remainingSeconds = seconds % 60;
		const remainingMinutes = minutes % 60;

		return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
	}
	// 获取30天年月日
	static getLast30Days() {
		const today = new Date();
		const columns: any = [];

		for (let i = 0; i < 30; i++) {
			const currentDate = new Date(today);
			currentDate.setDate(today.getDate() - i);

			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1
			const day = currentDate.getDate();

			// 查找年份
			let yearNode: any = columns.find((node: any) => node.value === String(year));
			if (!yearNode) {
				yearNode = {
					text: String(year),
					value: String(year),
					children: [],
				};
				columns.unshift(yearNode);
			}

			// 查找月份
			let monthNode = yearNode.children.find((node) => node.value === String(month));
			if (!monthNode) {
				monthNode = {
					text: `${month}月`,
					value: String(month),
					children: [],
				};
				yearNode.children.unshift(monthNode);
			}

			// 添加日期
			if (!monthNode.children.find((node) => node.value === String(day))) {
				monthNode.children.unshift({
					text: String(day),
					value: String(day),
				});
			}
		}
		// 计算默认选中的索引
		const currentYear = today.getFullYear();
		const currentMonth = today.getMonth() + 1; // 月份从0开始，所以需要加1
		const currentDay = today.getDate();

		return {
			columns: columns,
			defaultIndex: [String(currentYear), String(currentMonth), String(currentDay)],
		};
	}
}

export default Common;
