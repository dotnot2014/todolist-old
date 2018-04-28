import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter(routerConfig)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
