<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <ul>
          <li v-for="(item, index) in data" :key="index">
            <!-- date过滤器, 在main.js中全局注入.  具体函数在 filter/index.js 中 -->
            <span>{{ item.pubTime | date }}</span>
            <!-- 命名路由的传参跳转 -->
            <router-link :to="{name:'newsdetail', params:{nid: item.nid}}">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a v-if="pageNum>1" @click="getData(pageNum-1)">上一页</a>
        <a v-else class="default">上一页</a>

        <!-- :class 根据条件来决定样式是否有效 -->
        <a
          v-for="(item, index) in pageCount"
          :key="index"
          :class="{cur: pageNum==item}"
          @click="getData(item)"
        >{{item}}</a>

        <!-- 根据条件  显示不同的超链接按钮 -->
        <a v-if="pageNum<pageCount" @click="getData(pageNum+1)">下一页</a>
        <a v-if="pageNum==pageCount" class="default">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 从打印的返回值中复制
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
  methods: {
    getData(pno) {
      let url = "news_select.php"; //main.js 中已经设置了 前缀基础路径
      let params = "pageNum=" + pno;
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          this.data = res.data.data;

          this.pageCount = res.data.pageCount;
          this.pageNum = res.data.pageNum;
          this.totalRecord = res.data.totalRecord;
          this.pageSize = res.data.pageSize;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style></style>
