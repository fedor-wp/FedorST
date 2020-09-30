<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pl_header">
        <router-link to="/product/1" :class="{cur: type==1}">净美仕净化器</router-link>
        <router-link to="/product/2" :class="{cur: type==2}">净美仕滤网</router-link>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item, index) in data" :key="index">
          <router-link :to="`/productdetail/${item.pid}`">
            <img :src="'http://101.96.128.94:9999/mfresh/' + item.pic" alt />
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{item.model}}</p>
              <span>{{item.title2}}</span>
            </h3>
            <router-link :to="`/productdetail/${item.pid}`">查看详情</router-link>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(pageNum-1)" v-if="pageNum>1">上一页</a>
        <a v-else class="default">上一页</a>
        <a
          @click="getData(item)"
          v-for="(item, index) in pageCount"
          :key="index"
          :class="{cur: item==pageNum}"
        >{{item}}</a>
        <a @click="getData(pageNum+1)" v-if="pageNum<pageCount">下一页</a>
        <a v-else class="default">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 组件实例化时 会执行一次
      type: this.$route.params.type,
      pageCount: 0,
      pageNum: 0,
      pageSize: 0,
      totalRecord: 0,
      data: []
    };
  },
  mounted() {
    this.getData(1);
  },
  // watch 监听器:  指定监听某个元素, 元素变化时就会触发监听器
  watch: {
    // 监听 $route 的变化, 参数1为变化成的值
    $route(newvalue) {
      console.log(newvalue);
      this.type = newvalue.params.type;

      this.getData(1);
    }
  },
  methods: {
    getData(pno) {
      let url = `product_select.php?type=${this.type}&pageNum=${pno}`;

      this.axios
        .get(url)
        .then(res => {
          console.log(res);

          this.pageCount = res.data.pageCount;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.totalRecord = res.data.totalRecord;
          this.type = res.data.type;
          this.data = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
</style>