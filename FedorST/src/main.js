import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

import axios from "axios";
import VueAxios from "vue-axios";

// 配置请求的根路径
axios.defaults.baseURL = "http://101.96.128.94:9999/mfresh/data/";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// 全局过滤器 日期 的制作
import { date, fullImage } from "./filter";
Vue.filter("date", date);
Vue.filter("fullImage", fullImage);

// 引入vuex的store并注册到vue
import { store } from "./store";

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
