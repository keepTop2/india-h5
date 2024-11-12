import { createVitePlugins } from "./build/vite/plugins";
import { resolve } from "path";
import { ConfigEnv, loadEnv, defineConfig } from "vite";
import { wrapperEnv } from "./build/utils";
import path from "path";
import svgLoader from "vite-svg-loader";
import viteSvgIcons from "vite-plugin-svg-icons";
import { execSync } from "child_process";
import { createHtmlPlugin } from "vite-plugin-html";
const pathResolve = (dir: string) => {
	return resolve(process.cwd(), ".", dir);
};

//git版本号
const gitVersion = getGitVersion();

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
			createHtmlPlugin({
				minify: true,
				pages: [
					{
						template: "index.html",
						filename: "index.html",
						injectOptions: {
							data: {
								buildTime: new Date().toLocaleString(),
								gitVersion,
							},
						},
					},
				],
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
function getGitVersion() {
	try {
		// 获取最近的提交次数
		const commitCount = execSync("git rev-list --count HEAD").toString().trim();
		// 获取最近提交的简短哈希
		const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
		// // 获取最近的提交信息
		// const commitMessage = execSync('git log -1 --pretty=%B').toString().trim()
		// 获取当前分支名
		const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
		return `${commitCount}-${commitHash}-${branchName}`;
	} catch (e) {
		console.error("无法生成 Git 版本号:", e);
		return "0.0.0";
	}
}
