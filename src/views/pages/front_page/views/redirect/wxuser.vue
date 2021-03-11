<!--  -->
<template>
  <div class="wh">
    <el-button @click="wx">点击进行微信授权</el-button>
  </div>
</template>

<script>
import { ApplyMniApp } from "@/config/api";
export default {
  data: () => ({}),

  components: {},

  mounted() {},

  methods: {
    wx() {
      this.getRequest(ApplyMniApp.GetReUrl).then(res => {
        if (res) {
          window.open(
            res,
            "_blank",
            "width=800,height=800,menubar=no,toolbar=no,status=no,scrollbars=yes"
          );
        }
      });
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "@/assets/css/color.scss";
.wh {
  height: 50vh;
  display: flex;
  text-align: center;
  justify-content: center;
  /deep/ .el-button:focus,
  .el-button:hover {
    color: #fff;
    border-color: $Theme-color;
    background-color: $Theme-color;
  }
}
</style>