import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'
import axios from 'axios';

Vue.prototype.$http = axios

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter(routerConfig);

//跳转拦截处理
router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('todo-token');
  if(to.path == '/'){
    if(token !=null && token != 'null'){
      next('/todolist')
    }
    next();
  }else{
    if(token !='null' && token != null){
      // 全局设定header的token验证
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      next();
    }else{
      next('/')
    }
  }
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
