import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
//import './assets/main.css'
import store from "@/store/index";

// 导入格式化样式文件
import 'normalize.css/normalize.css'

// 导入 element-plus 样式
// 在我们页面中需要使用反馈组件等需要通过 js 打开的东西我们就需要导入全局样式
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import ElementPlus from 'element-plus'


const app = createApp(App)

app.use(router)
    .use(store)
    .use(ElementPlus, {
        locale: zhCn,
    }).mount('#app')