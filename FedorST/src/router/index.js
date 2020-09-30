import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入使用路由管理的组件
import About from "../views/About.vue";
import Index from "../views/Index.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Contact from "../views/Contact.vue";
import News from "../views/News.vue";
import NewsDetail from "../views/NewsDetail.vue";
import Product from "../views/Product.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Cart from "../views/Cart.vue";

// 按照固定格式 配置  路径 和 组件 之间的对应关系
const routes = [
  {
    path: "/",
    component: Index,
    meta:{
      title:'飞铎科技'
    }
  },
  {
    path: "/about",
    component: About,
    meta:{
      title:'关于飞铎'
    }
  },
  {
    path: "/register",
    component: Register,
    meta:{
      title:'新用户注册'
    }
  },
  {
    path: "/login",
    component: Login,
    meta:{
      title:'用户登录'
    }
  },
  {
    path: "/contact",
    component: Contact,
    meta:{
      title:'联系我们'
    }
  },
  {
    path: "/news",
    component: News,
    meta:{
      title:'公司动态'
    }
  },
  {
    path: "/newsdetail/:nid",
    component: NewsDetail,
    // 命名路由: 给路由起名字, 便于使用
    name: "newsdetail",
    meta:{
      title:'公司动态'
    }
  },
  {
    path: "/product/:type",
    component: Product,
    meta:{
      title:'产品中心'
    }
  },
  {
    path: "/productdetail/:pid",
    component: ProductDetail,
    meta:{
      title:'产品中心'
    }
  },
  {
    path: "/cart",
    component: Cart,
    meta:{
      title:'购物车'
    }
  },
];

// 路由对象制作
export const router = new VueRouter({
  mode: "history",
  routes,
});
