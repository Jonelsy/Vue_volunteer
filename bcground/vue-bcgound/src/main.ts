import { createApp } from 'vue'
// @ts-ignore
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/style/index.scss'
//滑动验证码
import SliderVerify from 'slider-verify-v3'
import 'slider-verify-v3/lib/SliderVerify.css'
const app = createApp(App);
// 全局错误处理器
window.onunhandledrejection = function (event) {
    const error = event.reason;
    // 可以展示友好的错误提示或其他处理逻辑
    console.error('Uncaught promise error:', error);
};
app.use(router)
app.use(pinia)
app.use(ElementPlus,{
    locale: zhCn,
})
app.use(SliderVerify)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')

