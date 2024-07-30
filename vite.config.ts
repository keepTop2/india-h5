import { createVitePlugins } from "./build/vite/plugins";
import { resolve } from "path";
import { ConfigEnv, loadEnv, UserConfig } from "vite";
import { wrapperEnv } from "./build/utils";
// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteVConsole } from "vite-plugin-vconsole";
// import { createSvgIconsPlugin } from "./plugins/svg-icons-plugin";
import svgLoader from "vite-svg-loader";

const pathResolve = (dir: string) => {
	return resolve(process.cwd(), ".", dir);
};

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfig {
	const isProduction = command === "build";
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);

	return {
		base: "./",
		root,
		resolve: {
			alias: [
				{
					find: "vue-i18n",
					replacement: "vue-i18n/dist/vue-i18n.cjs.js",
				},
				// /@/xxxx => src/xxxx
				{
					find: /\/@\//,
					replacement: pathResolve("src") + "/",
				},
				// /#/xxxx => types/xxxx
				{
					find: /\/#\//,
					replacement: pathResolve("types") + "/",
				},
				{
					find: "vue",
					replacement: "vue/dist/vue.esm-bundler.js",
				},
			],
		},
		server: {
			// headers: {
			// 	"access-control-allow-origin": "*",
			// 	"Access-Control-Allow-Origin": "http://192.168.30.69:3004",
			// },
			port: 3001,
			host: true,
			hmr: true,
			// proxy: {
			// 	"/sportA": {
			// 		target: "http://localhost:3004", // app1 的实际开发地址
			// 		changeOrigin: true,
			// 		rewrite: (path) => path.replace(/^\/sportA/, ""),
			// 	},
			// 	"/S128": {
			// 		// target: env.VITE_API_URL,
			// 		target: "https://digmaantest.cm3645.com",
			// 		changeOrigin: true,
			// 		ws: true,
			// 		secure: true,
			// 		//重写代理tag（S128）
			// 		rewrite: (path) => path.replace(/^\/S128/, ""),
			// 		// bypass(req, res, options) {
			// 		// },
			// 	},
			// },
		},
		preview: {
			cors: true,
			headers: {
				"access-control-allow-origin": "*",
				"Access-Control-Allow-Origin": "http://192.168.30.69:3004",
			},
		},
		plugins: [
			svgLoader({
				svgoConfig: {
					plugins: ["prefixIds"],
				},
			}),
			createVitePlugins(viteEnv, isProduction),
			// VConsole 调试工具配置，若没有此配置，则调试工具控制台不会打印日志
			viteVConsole({
				entry: path.resolve("src/main.js"), // 入口文件，或者可以使用这个配置: [path.resolve('src/main.ts')]
				localEnabled: false, // 本地是否启用
				enabled: mode === "test", // 是否启用
				config: {
					maxLogNumber: 1000, // theme: 'light' // 主题颜色
				},
			}),
		],
		build: {
			minify: "terser",
			sourcemap: false,
			terserOptions: {
				compress: {
					//生产环境时移除console
					// drop_console: isProduction,
					drop_console: isProduction,
					drop_debugger: true,
				},
			},
			rollupOptions: {
				output: {
					format: "es",
				},
			},
		},
		worker: {
			format: "es",
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 配置 nutui 全局 scss 变量
					// additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";@import '/@/styles/mixin.scss'; @import '/@/styles/vant.scss'; @import '/@/styles/index.scss';`,
					javascriptEnable: true,
					additionalData: '@import "/@/styles/themeify.scss"; @import "/@/styles/mixin.scss";',
				},
			},
		},
	};
}
