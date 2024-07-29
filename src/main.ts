import { createApp, Directive } from "vue";
import App from "./App.vue";
import { i18n } from "/@/i18n";
import router from "/@/router";
import "/@/permission";
import store from "/@/store";
import "./styles/app.css";
import "/@/styles/index.scss";
// 引入css
import "vue3-country-intl/lib/vue3-country-intl.css";
import "vant/lib/index.css";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";
import { Lazyload } from "vant";
// svg图标插件
// import "virtual:svg-icons-plugin-register";

const app = createApp(App);

import * as directives from "/@/directives/index";
// 循环注册指令
Object.keys(directives).forEach((key) => {
	app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.use(Lazyload);

// 路由
app.use(router);

// 国际化
app.use(i18n);

// 状态管理
app.use(store);
//注册主应用的路由对象

app.mount("#app");

export default app;
