import router from "/@/router";
import { useRouterStore } from "/@/store/modules/cacheRouter";

router.beforeEach(async (to, from, next) => {
	console.log("调用");
	//页面单次缓存处理
	const { cacheRouter } = useRouterStore();
	cacheRouter(from, to);
	next();
});
