<template>
  <div>
    <div class="hire-wrap">
      <div class="hire-head">
        <ali-svg-icon icon-class="store_gray" class-name="bg-hire_head"></ali-svg-icon> 
        <p class="open">我要开店</p>
        <p class="step">开店只需三步</p>
      </div>
      <div class="step-setting">
        <el-steps :active="3" align-center>
          <el-step title="《商家入驻协议》"></el-step>
          <el-step title="填写资料,下载合同盖印并且上传"></el-step>
          <el-step title="缴纳保证金"></el-step>
          <el-step title="审核阶段"></el-step>
        </el-steps>
      </div>
      <div class="agreeMent">
      	<p>商家入驻协议</p>
      	<p>协议内容</p>
      </div>
      <div class="openconte">
        <ali-svg-icon icon-class="openstore" class-name="open-class"></ali-svg-icon>
        <div class="text">立即成为租赁商</div>
        <router-link to="">
          <el-button @click="toHire" type="primary" class="color-area">注册开店</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { apply } from "@config/api.js";
export default {
  name: "User",
  data() {
    return {};
  },
  components: {},
  created() {
    this.getRequest(apply.rule, { type: 1 })
      .then(res => {
        if (res.status == 0) {

        } else if (res.status == 2) {
          this.$alert(res.msg, "您的申请被驳回,原因是：", {
            type: "error",
            confirmButtonText: "确定"
          });
        }else if(res.status == 1){
            this.$router.push('/serve')
        }
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "发生错误，请重试"
        });
      });
  },
  methods:{
    toHire(){
      this.getRequest(apply.rule, { type: 1 })
      .then(res => {
        if(!res.status){
          this.$router.push('/hire/index')
          return
        }
        if (res.status == 0) {
          this.$alert('您的申请正在审核中，请勿重复申请', '提示', {
            confirmButtonText: '回到首页',
            callback: action => {
              this.$router.push('/')
            }
          });
          // this.$message.warning('您的申请正在审核中，请勿重复申请')
        } else if (res.status == 2) {
          this.$router.push('/hire/index')
        }else if(res.status == 1){
            this.$router.push('/serve')
        }
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "发生错误，请重试"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/color.scss";

.hire-wrap {
  .hire-head {
    width: 100%;
    height: 230px;
    text-align: center;
    color: #333333;

    .open {
      font-size: 40px;
    }

    .step {
      font-size: 18px;
    }

    .bg-hire_head {
      width: 113px;
      height: 120px;
      color: $Theme-color;
    }
  }

  .step-setting {
    /deep/ .el-step__icon {
      width: 35px;
      height: 35px;
    }

    /deep/ .el-step__line {
      background-color: #fafafa;
    }

    /deep/ .el-step__icon.is-text {
      border: 1px solid;
    }

    /deep/ .el-step__title.is-finish {
      color: $Theme-color;
    }

    /deep/ .el-step__head.is-finish {
      color: $Theme-color;
      border-color: #d9d9d9;
    }

    /deep/ .el-step.is-horizontal .el-step__line {
      top: 16px;
    }

    /deep/ .el-step__line-inner {
      border-style: dashed;
    }
  }

  .openconte {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 700px;
    margin-top: 38px;

    /deep/ .el-button--primary {
      background-color: $Theme-color;
      margin-bottom: 20px;
      border-radius: 0px;
    }

    .open-class {
      width: 100%;
      height: 94px;
    }

    .text {
      color: #5f1dee;
      font-size: 20px;
      margin-bottom: 37px;
    }
  }
}
</style>
