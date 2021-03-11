<!--  -->
<template>
  <div>
    <div class="login-box">
      <div class="login">
        <div class="login-title">注册成功</div>
        <div class="login-sub">为了方便您下次登录，请填写以下基本信息</div>
        <div class="login-x">如不填写，下次登录请去用户中心设置</div>
        <div class="form">
          <div class="input-box">
            <input type="text" v-model="from_data.nick" placeholder="请输入昵称" />
          </div>
          <div class="input-box">
            <input
              :type="passwordType"
              v-model="from_data.new_pwd"
              placeholder="请输入密码长度在6-16字符"
              @keyup.enter="confirm"
            />
            <span class="show-pwd" @click="showPwd">
              <ali-svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </div>
        </div>
        <div class="login-botton">
          <el-button type="primary" @click.native="confirm">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { safe } from "@/config/api";
export default {
  data: () => ({
    from_data: {
      nick: "",
      new_pwd: ""
    },
    passwordType: "password"
  }),

  components: {},

  mounted() {},

  methods: {
    confirm() {
      this.postRequest(safe.SetPwdAndNick, this.from_data)
        .then(res => {
          if (res) {
            this.$message.success("填写成功！");
            this.$store.dispatch("GetUserInfo").then(res => {
              this.$emit("close", false);
            });
          }
        })
        .catch(error => {
          this.$message.warning(error);
        });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "@css/color";
.login-box {
  display: flex;
  justify-content: center;
  .login {
    text-align: center;
    width: 80%;
    .login-title {
      color: $Theme-color;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .login-sub {
      font-size: 18px;
    }
    .login-x {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }
    .form {
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      .input-box {
        height: 46px;
        background-color: #fafafa;
        border: 1px solid #f0f0f0;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        input {
          width: 100%;
          background-color: #fafafa;
          border: none;
          outline: none;
        }
      }
    }
    .login-botton {
      display: flex;
      flex-direction: column;
      /deep/ .el-button--primary {
        background-color: $Theme-color;
        margin-bottom: 20px;
        border-radius: 0px;
      }
      /deep/ .el-button--text {
        color: $Theme-color;
        margin-bottom: 20px;
      }
      .bottom-button {
        display: flex;
        justify-content: space-between;
      }
    }
    .login-bottom-box {
      .three-title {
        color: #999;
        font-size: 10px;
      }
      .three-box {
        color: #999;
        display: flex;
        font-size: 8px;
        justify-content: space-around;
        .box-item {
          margin-top: 10px;
          .item-image {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
  .login-img {
    flex: 2;
    .image-size {
      width: 100%;
      height: 100%;
    }
  }
}
</style>