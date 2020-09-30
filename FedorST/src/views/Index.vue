<template>
  <div>
    <!--banner-->
    <div class="banner">
      <!-- 图片列表-->
      <transition-group tag="ul" name="slide-fade">
        <li
          v-for="(item, index) in 4"
          :key="index"
          :class="{'banner-show': cur==item}"
          v-show="item==cur"
        >
          <router-link to="/product/1" class="link"></router-link>
        </li>
      </transition-group>
      <!-- 左右箭头-->
      <span class="cut prev" @click="prev"></span>
      <span class="cut next" @click="next"></span>
      <!-- 小圆点指示器-->
      <div class="indicator">
        <a v-for="(item, index) in 4" :key="index" :class="{cur: cur == item}" @click="cur= item"></a>
      </div>
    </div>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title">
          <router-link to="/product/1" class="more">more</router-link>
          净美仕产品
        </h2>
        <ul class="clearfloat">
          <li>
            <router-link to="/product/1">
            <img src="../assets/images/01.jpg" alt />
            </router-link>
          </li>
          <li>
            <router-link to="/product/1">
            <img src="../assets/images/02.jpg" alt />
            </router-link>
          </li>
          <li>
            <router-link to="/product/1">
            <img src="../assets/images/03.jpg" alt />
            </router-link>
          </li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title">
            <router-link to="/about" class="more">more</router-link>
            关于飞铎
          </h2>
          <p>
            飞铎科技集团自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。飞铎科技肩负着为人类创造健康安全生活环境的使命应运而生。<br> 2012年7月，飞铎科技集团创立旗下子品牌“净美仕”，以崭新的面貌屹立在净化行业。<br>飞铎科技——自足中国 走遍世界 做有责任心的民族品牌! <br>
          <router-link to="/about">查看更多</router-link>
          </p>
        </div>
        <div class="ind_news">
          <h2 class="title">
            <router-link to="/news" class="more">more</router-link>
            公司动态
          </h2>
            <ul>
            <li v-for="(item, index) in data" :key="index">
              <!-- date过滤器, 在main.js中全局注入.  具体函数在 filter/index.js 中 -->
              <span>{{ item.pubTime | date }}</span>
              <!-- 命名路由的传参跳转 -->
              <router-link :to="{name:'newsdetail', params:{nid: item.nid}}">{{ item.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cur: 1,
      data: []
    };
  },
  methods: {
    getData(pno) {
      let url = "news_select.php"; //main.js 中已经设置了 前缀基础路径
      let params = "pageNum=" + pno;
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          this.data = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    next() {
      this.cur++;
      if (this.cur == 5) this.cur = 1;
    },
    prev() {
      this.cur--;
      if (this.cur == 0) this.cur = 4;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.next();
    }, 5000),
    this.getData(1);
  },
  // 组件销毁时, 关闭定时器
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>

.banner-show {
  display: block;
  z-index: 20;
}

.banner li:nth-child(1) {
  background: url(../assets/images/banner_01.jpg) center 0 no-repeat;
}

.banner li:nth-child(2) {
  background: url(../assets/images/banner_02.jpg) center 0 no-repeat;
}

.banner li:nth-child(3) {
  background: url(../assets/images/banner_03.jpg) center 0 no-repeat;
}

.banner li:nth-child(4) {
  background: url(../assets/images/banner_04.jpg) center 0 no-repeat;
}

/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>