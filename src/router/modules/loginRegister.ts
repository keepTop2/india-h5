import Layout from "/@/layout/loginRegister/index.vue";

export const LoginRegisterRouter = {
	path: "/login",
	component: Layout,
	children: [
		{
			path: "/login",
			name: "login",
			component: () => import("/@/views/loginRegister/login/login.vue"),
			meta: {
				title: "登录",
			},
		},
		{
			path: "/register",
			name: "register",
			component: () => import("/@/views/loginRegister/register/register.vue"),
			meta: {
				title: "注册",
			},
		},
		{
			path: "/forgetPassword",
			name: "forgetPassword",
			component: () => import("/@/views/loginRegister/forgetPassword/forgetPassword.vue"),
			meta: {
				title: "忘记密码",
			},
		},
	],
};

export const RegisterSubPage = {
	children: [
		{
			path: "/mainCurrency",
			name: "mainCurrency",
			component: () => import("/@/views/loginRegister/mainCurrency/mainCurrency.vue"),
			meta: { title: "选择主货币" },
		},
		{
			path: "/userAgreement",
			name: "userAgreement",
			component: () => import("/@/views/loginRegister/userAgreement/userAgreement.vue"),
			meta: { title: "用户协议" },
		},
	],
};
