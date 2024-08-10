import { useUserStore } from "/@/store/modules/user";
import Common from "./common";
import CryptoJS from "crypto-js";

class EncryptionFn {
	// 盐值
	static saltValue = "BSMYJXIA";

	/**
	 * @description 加密方法
	 * @param data
	 */
	static encryption = (data?: any) => {
		const userStore = useUserStore();
		const saltValue = this.saltValue;
		let newToken = "";
		// 判断是否有参数，没有参数执行拼接盐值逻辑
		if (!data) {
			// 判断接口是否携带token
			if (userStore.token) {
				// 插入位置
				const insertPositions = [4, 8, 14, -2];
				newToken = userStore.token;
				// token拼接盐值
				for (let i = insertPositions.length - 1; i >= 0; i--) {
					const insertIndex = insertPositions[i];
					const saltChars = saltValue.slice(i * 2, i * 2 + 2);
					newToken = newToken.slice(0, insertIndex) + saltChars + newToken.slice(insertIndex);
				}
				// 拼接好盐值的token + * + 当前时间戳
				newToken = newToken + "*" + Common.getInstance().getDateNow();
			} else {
				// 没有token拼接盐值 + * + 当前时间戳
				newToken = saltValue + "*" + Common.getInstance().getDateNow();
			}
			// console.log("newToken", newToken);
		}

		// AES加密转化base64
		const key = CryptoJS.enc.Base64.parse(this.encryptedCiphertextDecrypt(window.PLATFROM_CONFIG.encryptedCiphertext.key));
		const iv = CryptoJS.enc.Base64.parse(this.encryptedCiphertextDecrypt(window.PLATFROM_CONFIG.encryptedCiphertext.iv));
		// 有参数则用参数 没有参数则是token加密
		const params = data ? CryptoJS.enc.Utf8.parse(data) : CryptoJS.enc.Utf8.parse(newToken);
		const encryptedData = CryptoJS.AES.encrypt(params, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		// console.log('ASE加密', encryptedData.toString());
		return encryptedData.toString();
	};

	/**
	 * @description 解密方法
	 * @param data
	 * @returns
	 */
	static decrypt = (data: any) => {
		console.log("开始解密", data);
		// 检查 encryptedCiphertext 对象是否存在并包含 key 和 iv
		const encryptedCiphertext = window.PLATFROM_CONFIG.encryptedCiphertext;
		if (!encryptedCiphertext || !encryptedCiphertext.key || !encryptedCiphertext.iv) {
			console.error("解密配置不完整或未定义");
		}
		console.log("key:", this.encryptedCiphertextDecrypt(encryptedCiphertext.key));
		console.log("iv:", this.encryptedCiphertextDecrypt(encryptedCiphertext.iv));
		// 继续解密过程
		const key = CryptoJS.enc.Base64.parse(this.encryptedCiphertextDecrypt(encryptedCiphertext.key));
		const iv = CryptoJS.enc.Base64.parse(this.encryptedCiphertextDecrypt(encryptedCiphertext.iv));
		const decrypted = CryptoJS.AES.decrypt(data, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		const value = decrypted.toString(CryptoJS.enc.Utf8);
		console.log("解密完成", JSON.parse(value));
		return JSON.parse(value);
	};

	/**
	 * @description 解密密文方法
	 * @returns
	 */
	static encryptedCiphertextDecrypt = (data: any) => {
		// AES解密转化base64
		const key = CryptoJS.enc.Base64.parse("XzJs3CEW1BDueRq2");
		const iv = CryptoJS.enc.Base64.parse("jXuX2DDFxen5kHWM");
		const decrypted = CryptoJS.AES.decrypt(data, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		const value = decrypted.toString(CryptoJS.enc.Utf8);
		return value;
	};
}

export default EncryptionFn;
