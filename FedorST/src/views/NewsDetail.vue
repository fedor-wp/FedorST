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
      <div class="news_details">
        <h2>{{title}}</h2>
        <!-- 全局的 filter 可以在所有vue中使用 -->
        <span>发布时间：{{pubTime|date}}</span>
        <!-- v-html 标签才能 解析html代码http://101.96.128.94:9999/mfresh/ -->
        <div class="news_content" v-html="fullImage(content)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nid: "",
      pubTime: "",
      title: "",
      content: ""
    };
  },
  mounted() {
    console.log(this.$route);
    let nid = this.$route.params.nid;
    this.getData(nid);
  },
  methods: {
    fullImage(html) {
      let baseurl = "http://101.96.128.94:9999/mfresh/";
      return html.replace(/<img src="/g, '<img src="' + baseurl);
    },
    getData(nid) {
      let url = "news_detail.php?nid=" + nid;
      this.axios
        .get(url)
        .then(res => {
          console.log(res);
          this.title = res.data.title;
          this.nid = res.data.nid;
          this.pubTime = res.data.pubTime;
          this.content = res.data.content;
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