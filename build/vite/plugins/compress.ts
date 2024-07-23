/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */

import viteCompression from "vite-plugin-compression";

export const ConfigCompressPlugin = () => {
	return viteCompression({
		verbose: true, // 默认即可
		disable: false, //开启压缩(不禁用)，默认即可
		deleteOriginFile: false, //删除源文件
		threshold: 1024, //压缩前最小文件大小
		algorithm: "brotliCompress", //压缩算法
		ext: ".br", //文件类型
	});

	return [];
};
