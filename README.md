# vue-h5-template

基于 vue3 + vite + （nutui or varlet or vant） + sass + viewport 适配方案 + axios 封装，构建手机端模板脚手架

node v17.6.0

```
baowang_web_h5
├── README.md
├── build
│   ├── utils.ts
│   └── vite
├── index.html
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── prettier.config.js
├── public
│   ├── config.js   //接口及文件请求地址
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api   //后端接口 对应src/views下文件名
│   ├── assets  //图片及图标存放路径
│   ├── common //公共逻辑
│   ├── components //公共组件 自动全局注册 无需引入
│   ├── directives //自定义指令
│   ├── hooks  //hooks
│   ├── i18n
│   ├── inter
│   ├── interface
│   ├── layout
│   ├── main.ts
│   ├── permission.ts  //全局路由守卫
│   ├── router  //路由
│   ├── store //全局状管理器
│   ├── styles //全局样式
│   ├── utils  //公共方法
│   └── views
├── stylelint.config.js
├── tree.md
├── tsconfig.json
├── types
│   ├── auto-imports.d.ts
│   ├── components.d.ts
│   ├── global.d.ts
│   ├── index.d.ts
│   ├── module.d.ts
│   └── utils.d.ts
├── vite.config.ts
└── yarn.lock
```

### 注意事项

style/bvars.scss 全局样式变量使用，utils/common.ts 文件下公共方法使用
