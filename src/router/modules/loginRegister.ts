import Layout from "/@/layout/loginRegister/index.vue";

const LoginRegisterRouter = {
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

export default LoginRegisterRouter;
