<!--  -->
<template>
  <div class="jumpbox">
    <!-- <ali-svg-icon icon-class="color_logo" class-name="login-logo"></ali-svg-icon> -->
    <div class="home" v-if="showlogin">
      <div class="notfound">
        <el-image :src="$qiniuHost+'redirecting.gif'" class="img"></el-image>
        <div class="text">
          <h4>redirecting</h4>
        </div>
      </div>
    </div>
    <div class="cont-box" v-else>
      <div class="headimg-box">
        <el-image :src="Bangdata.avatar" class="headimg"></el-image>
        <div class="userinfo">
          尊敬的{{Bangdata.type|UserType}}用户：
          <span>{{Bangdata.nick}}</span>
        </div>
        <div class="info">为了更好地为您服务，请绑定派图账号，以便下次快捷登录</div>
      </div>
      <el-form :model="tempdata">
        <el-form-item label>
          <el-radio-group v-model="tempdata.regOrLogin">
            <el-radio :label="1">手机短信验证码绑定</el-radio>
            <el-radio :label="2">手机和密码绑定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input v-model="tempdata.mobile" placeholder="请输入需要绑定的手机号"></el-input>
        </el-form-item>
        <el-form-item v-if="tempdata.regOrLogin == 1">
          <div class="input-box">
            <input type="text" v-model="tempdata.code" placeholder="请输入验证码" />
            <el-button type="text" :disabled="hasCode" @click="getcode">
              <span>{{hasCode?wait+'秒重试':'获取验证码'}}</span>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item v-else>
          <el-input v-model="Bangdata.pwd" type="password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom-button bottom-button-set">
        <el-button type="primary" @click="confirm">绑定并登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setting, safe } from "@/config/api";
import { storage } from "@/util/storage";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    tempdata: {
      mobile: "",
      code: "",
      regOrLogin: 1
    },
    codedata: {
      mobile: ""
    },
    hasCode: false,
    wait: 60,
    timer: null,
    TToken: {},
    Bangdata: {
      nick: "",
      order_openid: "",
      avatar: "",
      mobile: "",
      type: "",
      pwd: "" || null,
      code: ""
    },
    showlogin: true
  }),

  components: {},
  created() {
    if (
      this.$route.query.code !== undefined ||
      this.$route.query.auth_code !== undefined
    ) {
      let ThreeToken = {
        code: this.$route.query.code || this.$route.query.auth_code,
        type: this.$route.query.state
      };
      storage.set("ThreeToken", ThreeToken);
      this.$router.replace("/jumplogin/index");
    }
    this.TToken = storage.get("ThreeToken");
    if (this.user_data) this.tempdata.regOrLogin = 2;
  },

  mounted() {
    if (this.$route.query.token) {
      console.log("运营登录");
      console.log(this.$route.query);
      this.$store.commit("remove_user_data", null);
      this.$store.commit("update_user_data", {
        ...this.$route.query,
        time: Date.now()
      });
      this.$store.commit("update_loginOver", false);
      this.getRequest("user/ajaxGetUserToken").then(res => {
        this.$router.replace("/");
        console.log(res, "haha");
        this.util.setStorage("allMenu", this.util.getAllMenu(this));
      });
      return;
    }
    if (this.TToken.code) this.initThree();
  },

  methods: {
    async initThree() {
      try {
        // 获取第三方信息
        const ThreeUser = await this.getRequest(safe.getThreeUser, this.TToken);
        const ThreeUserData = {
          type: Number(ThreeUser.type),
          openid: ThreeUser.order_openid
        };
        // 通过openid查询是否已有用户
        const IsOurUser = await this.postRequest(
          safe.GetUserThree,
          ThreeUserData
        );
        // 如果没有而且当前已经登录就直接走绑定
        if (!IsOurUser && this.user_data) {
          const DongBang = await this.postRequest(safe.BangThreeUser, {
            type: this.TToken.type,
            order_openid: ThreeUser.order_openid
          });
          if (DongBang) {
            const RefreshUser = await this.$store.dispatch("GetUserInfo");
            if (RefreshUser) this.$router.push("/personal/person/binding");
          }
        } else if (IsOurUser != "" && this.user_data) {
          // 如果返回已有用户并且和当前登录用户的id一样时报错给用户
          let ThreeName = "";
          switch (this.TToken.type) {
            case "3":
              ThreeName = "微信";
              break;
            case "4":
              ThreeName = "QQ";
              break;
            case "5":
              ThreeName = "微博";
              break;
            case "6":
              ThreeName = "支付宝";
              break;
          }
          this.$notify({
            showClose: false,
            type: "warning",
            title: "提示",
            message: `当前账号已绑定了${ThreeName}登录，系统已经帮您更换账号，若要换绑请从个人中心先解绑后重新绑定即可。`
          });
          this.$router.push("/personal/person/binding");
          // return;
        } else if (IsOurUser && !storage.get("user")) {
          // 如果返回已有用户但是没有登录就直接登录成功
          this.$store.commit("update_user_data", IsOurUser);
          this.$store.commit("update_loginOver", false);
          storage.remove("ThreeToken");
          this.$router.replace("/");
        } else {
          this.showlogin = false;
          Object.assign(this.Bangdata, ThreeUser);
        }
      } catch (error) {
        this.$router.replace("/");
      }
    },
    cancel() {},
    async confirm() {
      try {
        Object.assign(this.Bangdata, this.tempdata);
        //alert('登录所需信息' + JSON.stringify(this.Bangdata));
        if (this.Bangdata.regOrLogin == 2) {
          if (this.Bangdata.pwd.length < 6) {
            this.$message({
              type: "warning",
              message: "密码不能低于6位"
            });
            return false;
          }
        }
        if (this.Bangdata.regOrLogin == 1) {
          if (this.Bangdata.code == "") {
            this.$message({
              type: "warning",
              message: "验证码不能为空"
            });
            return false;
          }
        }
        if (this.Bangdata.regOrLogin == 1) {
          let senddata = {
            nick: this.Bangdata.nick,
            order_openid: this.Bangdata.order_openid,
            avatar: this.Bangdata.avatar,
            mobile: this.Bangdata.mobile,
            type: this.Bangdata.type,
            code: this.Bangdata.code,
            pwd: this.Bangdata.pwd,
            reg_or_login: this.tempdata.regOrLogin
          };

          const DoneReg = await this.postRequest(safe.RegThreeUser, senddata);
          console.log(DoneReg);
          if (DoneReg) {
            this.$store.commit("update_user_data", DoneReg);
            this.$store.commit("update_loginOver", false);
            storage.remove("ThreeToken");
            this.$router.replace("/");
          }
        }
      } catch (error) {
        storage.remove("ThreeToken");
        if (this.tempdata.regOrLogin == 2 && !this.user_data) {
          this.$notify({
            type: "warning",
            title: "提示",
            message: `手机和密码绑定必须是登录以后才可以操作哦。`
          });
        }
        this.$router.replace("/");
      }
    },
    getcode() {
      let data = {
        mobile: this.tempdata.mobile
      };
      if (/^1[3456789]\d{9}$/.test(data.mobile)) {
        this.startTime();
        this.getRequest(setting.getGeetGt)
          .then(res => {
            this.$initGeet(
              {
                gt: res.gt,
                challenge: res.challenge,
                product: "bind",
                offline: !res.success,
                new_captcha: true
              },
              geetres => {
                geetres
                  .onReady(() => {
                    geetres.verify();
                  })
                  .onSuccess(() => {
                    let geetdata = geetres.getValidate();
                    let params = {
                      mobile: data.mobile,
                      type: 2,
                      geetest_challenge: geetdata.geetest_challenge,
                      geetest_validate: geetdata.geetest_validate,
                      geetest_seccode: geetdata.geetest_seccode
                    };
                    console.log(params);
                    this.getRequest(setting.getMobilCode, params)
                      .then(res => {
                        this.$message({
                          message: "请求已发送"
                        });
                      })
                      .catch(err => {
                        // this.$message({
                        //   message: "请求阻塞，请刷新页面重新尝试"
                        // });
                        geetres.reset();
                      });
                  });
                geetres.onError(err => {
                  console.error("失败" + err.msg);
                });
                geetres.onClose(() => {
                  this.$message({
                    type: "warning",
                    message: "必须通过验证才可以获取验证码"
                  });
                  geetres.reset();
                  this.endTime();
                });
              }
            );
          })
          .catch(err => {});
      } else {
        this.$message({
          type: "error",
          message: "信息不完整，请检查您的手机号是否正确"
        });
      }
    },
    startTime() {
      this.hasCode = true;
      this.setTime();
    },
    endTime() {
      this.wait = 60;
      this.hasCode = false;
      clearTimeout(this.timer);
      this.codedata.mobile = "";
    },
    setTime() {
      if (this.wait == 0) {
        this.hasCode = false;
        this.wait = 60;
        return;
      } else {
        this.wait--;
      }
      this.timer = setTimeout(() => {
        this.setTime();
      }, 1000);
    }
  },
  filters: {
    UserType(status) {
      const statusMap = {
        "3": "微信",
        "4": "QQ",
        "5": "微博",
        "6": "支付宝"
      };
      return statusMap[status];
    }
  },
  beforeDestroy() {
    storage.remove("ThreeToken");
  },
  computed: {
    ...mapGetters(["user_data"]),
    GetRegOrLogin() {
      return this.tempdata.regOrLogin;
    }
  },
  watch: {
    GetRegOrLogin() {
      this.Bangdata.pwd = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.jumpbox {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-logo {
    width: 200px;
    height: 100px;
  }

  .cont-box {
    background-color: #fff;
    padding: 70px;
  }

  .headimg-box {
    text-align: center;
    margin-bottom: 20px;

    .headimg {
      width: 100px;
      height: 100px;
      margin-bottom: 28px;
      border-radius: 50%;
      object-fit: scale-down;
      border: 1px solid rgba(114, 74, 226, 0.151);
    }

    .userinfo {
      font-size: 25px;
      font-weight: bold;

      span {
        color: #ae8d55;
      }
    }

    .info {
      margin-top: 48px;
    }
  }

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

  /deep/ .el-input {
    height: 46px;
    background-color: #fafafa;
    border: 1px solid #f0f0f0;

    .el-input__inner {
      height: 46px;
      background-color: #fafafa;
      border-radius: 0;
      border: none;
    }
  }

  .bottom-button-set {
    justify-content: center;
  }

  .notfound {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    margin-bottom: 161px;

    .code {
      font-size: 26px;
    }

    .text {
      color: #c0aaf2;

      h4 {
        font-size: 30px;
      }
    }

    .img {
      width: 50%;
    }
  }
}
</style>
