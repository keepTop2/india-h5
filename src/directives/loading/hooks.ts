import { createApp } from "vue";
import Loading from "./index.vue";
import _ from "lodash";

let loadingInstance = null as null | ComponentPublicInstance;
let loadingCount = 0;

export function useLoading() {
	function startLoading() {
		if (loadingCount === 0) {
			if (!loadingInstance) {
				const app = createApp(Loading);
				const instance = app.mount(document.createElement("div"));
				loadingInstance = instance;
				appendEl(document.body);
				// return; // 避免重复创建加载实例
			}
		}
		loadingCount++;
	}

	function stopLoading() {
		loadingCount--;
		loadingCount = Math.max(loadingCount, 0); //防止小于 0 的情况发生
		if (loadingCount === 0) {
			// console.log("关闭事件判断");
			// 关闭 loading
			const debouncedStopLoading = _.debounce(() => {
				// console.log("关闭防抖");
				if (loadingInstance) {
					// console.log("关闭");
					removeEl(document.body);
					loadingInstance = null;
				}
			}, 300);
			debouncedStopLoading(); // 调用防抖函数
		}
	}

	function appendEl(parentEl: HTMLElement) {
		parentEl.style.position = "relative";
		parentEl.style.overflow = "hidden";
		parentEl.appendChild(loadingInstance!.$el);
	}

	function removeEl(parentEl: HTMLElement) {
		parentEl.style.position = "";
		parentEl.style.overflow = "";
		const $el = loadingInstance!.$el;
		if (parentEl.contains($el)) {
			parentEl.removeChild($el);
		}
	}

	return {
		startLoading,
		stopLoading,
	};
}
