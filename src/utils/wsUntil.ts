import { useUserStore } from "/@/store/modules/user";
/**
 * @description
 */
function getUrl() {
	// console.log(import.meta.env.VITE_BASEENV, "====================环境变量", window["PLATFROM_CONFIG"]);
	switch (import.meta.env.VITE_BASEENV) {
		case "development":
			return window["PLATFROM_CONFIG"].developmentWsURL;
		case "production":
			return `wss://${window.location.host}/websocket/baowang/websocket`;
		default:
			return "";
	}
}

/**
 * @description websocket 工具类
 */
export default class WsUtil {
	/**
	 * @description 链接地址
	 */
	private url: string;

	/**
	 * @description 重连间隔时间
	 */
	private reconnectInterval: number;

	/**
	 * @description 重连定时器
	 */
	private reconnectTimer: null | TimeoutHandle = null;

	/**
	 * @description 心跳间隔时间
	 */
	private pingInterval: number = 2000;

	/**
	 * @description 心跳超时计数
	 */
	private pingTimeout: number = 0;

	/**
	 * @description 心跳超时最大值
	 */
	private pingTimeoutMax: number = 5;

	/**
	 * @description 心跳定时器
	 */
	private pingTimer: null | TimeoutHandle = null;

	/**
	 * @description 心跳超时定时器
	 */
	private pingTimeoutTimer: null | TimeoutHandle = null;

	/**
	 * @description 是否主动关闭通道
	 */
	private isProactive: boolean = false;

	private websocket: WebSocket | null;
	constructor(reconnectInterval: number = 3000) {
		// if()
		this.url = getUrl();
		// console.log(this.url, "===============看下连接地址");
		this.reconnectInterval = reconnectInterval;
		this.websocket = null;

		this.connect();
	}

	/**
	 * @description 建立链接
	 */
	private connect() {
		const userStore = useUserStore();
		const { token } = storeToRefs(userStore);
		//如果有则断掉老通道
		if (this.websocket) {
			this.websocket.close();
			this.websocket = null;
		}
		this.websocket = new WebSocket(`${this.url}?p=${token.value}`);

		this.websocket.onopen = () => {
			// console.log('WebSocket connection established');
			//清除重连定时器
			if (this.reconnectTimer) {
				window.clearTimeout(this.reconnectTimer);
				this.reconnectTimer = null;
			}

			// 开始心跳
			this.startPing();
			//   this.reconnectAttempts = 0;
		};

		//通道被关闭后开始重连
		this.websocket.onclose = () => {
			console.log("WebSocket connection closed");
			if (this.reconnectTimer) {
				window.clearTimeout(this.reconnectTimer);
				this.reconnectTimer = null;
			}

			if (this.pingTimer) {
				window.clearTimeout(this.pingTimer);
				this.pingTimer = null;
			}

			if (this.isProactive) {
				this.isProactive = false;
				return;
			}
			if (token.value) {
				this.reconnectTimer = setTimeout(() => {
					if (token.value) {
						this.connect();
					}
				}, this.reconnectInterval);
			}
		};

		//接收消息
		this.websocket.onmessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			// console.log("WebSocket message received:", data);
			if (data == 2) {
				this.pingTimeout = 0;
				//清除心跳超时计时
				this.clearPingTimeout();
			} else {
				console.log("接收到websokcet消息:", data);
			}
		};

		this.websocket.onerror = (error: Event) => {
			console.error("WebSocket error:", error);
			//   this.emit('error', error);
		};
	}

	/**
	 * 开始心跳
	 */
	private startPing() {
		const message = 1;
		this.send(message);
		if (this.pingTimer) {
			clearTimeout(this.pingTimer);
			this.pingTimer = null;
		}
		this.pingTimer = setTimeout(() => {
			this.startPing();
		}, this.pingInterval);

		//开始心跳超时计时
		// console.log('开始心跳超时计时');
		this.startPingTimeout();
	}

	/**
	 * @description 开始心跳超时计时
	 */
	private startPingTimeout = () => {
		if (this.pingTimeoutTimer) {
			clearTimeout(this.pingTimeoutTimer);
			this.pingTimeoutTimer = null;
		}

		this.pingTimeout++;
		// console.log(this.pingTimeout, '==========这里走没走');
		if (this.pingTimeout >= this.pingTimeoutMax) {
			this.pingTimeout = 0;
			this.close(false);
			return;
		}
		this.pingTimeoutTimer = setTimeout(() => {
			this.startPingTimeout();
		}, 1000);
	};

	/**
	 * @description 清除心跳倒计时
	 */
	private clearPingTimeout() {
		if (this.pingTimeoutTimer) {
			window.clearTimeout(this.pingTimeoutTimer);
			this.pingTimeoutTimer = null;
		}
	}

	/**
	 * @description 发送消息
	 * @param message
	 */
	public send(message) {
		if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
			this.websocket.send(JSON.stringify(message));
		} else {
			console.warn("WebSocket is not open. Message not sent:", message);
		}
	}

	/**
	 * @description 关闭通道
	 */
	public close(isProactive = true) {
		this.isProactive = isProactive;
		console.log(this.isProactive, "看看呢");
		this.websocket?.close();
	}
}
