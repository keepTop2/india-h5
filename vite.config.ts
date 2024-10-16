import { createVitePlugins } from "./build/vite/plugins";
import { resolve } from "path";
import { ConfigEnv, loadEnv, defineConfig } from "vite";
import { wrapperEnv } from "./build/utils";
import path from "path";
import svgLoader from "vite-svg-loader";
import viteSvgIcons from "vite-plugin-svg-icons";

const pathResolve = (dir: string) => {
	return resolve(process.cwd(), ".", dir);
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
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
			port: 3001,
			host: true,
			hmr: true,
		},
		preview: {
			cors: true,
			headers: {
				"access-control-allow-origin": "*",
				"Access-Control-Allow-Origin": "http://192.168.30.69:3004",
			},
		},
		plugins: [
			svgLoader(),
			createVitePlugins(viteEnv, isProduction),
			viteSvgIcons({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), "src/assets/zh-CN/default")],
				// 指定symbolId格式
				symbolId: "icon/[dir]/[name]",
			}),
		],
		build: {
			minify: "terser",
			sourcemap: false,
			chunkSizeWarningLimit: 1500,
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
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? "vender";
						}
					},
				},
			},
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
});
