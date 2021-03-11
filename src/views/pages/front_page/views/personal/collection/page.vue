<template>
  <div class="wraper" v-if="totalCount>page_size">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="page_size"
      layout="total,prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: ["totalCount"],
  data() {
    return {
      page: 1,
      page_size: 10
    };
  },
  methods: {
    handleCurrentChange(toPage) {
      console.log(toPage);
      //第二个参数用来标识当前路由
      this.$emit("handleCurrentChange", toPage, this.$route.name);
    }
  },
  watch: {
    $route(newVal) {
      console.log("page", newVal);
      let path = this.$route.name;
      switch (path) {
        case "CollectStore":
          this.page_size = 9;
          break;
        case "CollectStudio":
          this.page_size = 8;
          break;
        case "CollectEquip":
          this.page_size = 8;
          break;
        case "CollectActivity":
          break;
        case "CollectModel":
          this.page_size=8
          break;
        case "CollectServer":
          this.page_size=8
          break;
        case "CollectCourse":
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wraper {
  padding-top: 20px;
  background-color: #fff;
  padding-bottom: 40px;
}
/deep/ .el-pagination {
  margin-left: 270px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
</style>