<template>
  <div class="wrap">
    <ul>
      <li v-for="(item,index) in bindArr" :key="index">
        <ali-svg-icon :icon-class="item.logoClass" class-name="logo"></ali-svg-icon>
        <span class="bind-name">{{item.bindName}}</span>
        <span class="btn un-bind-btn color-area" v-if="item.hasBind" @click="toUnBind(item.type)">解绑</span>
        <span class="btn bind-btn color-area" v-else @click="toBind(item.type)">绑定</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { safe } from "@config/api.js";

export default {
  data() {
    return {
      bindArr: [
        {
          logoClass: "QQ",
          bindName: "QQ账号",
          hasBind: false,
          type: 4
        },
        {
          logoClass: "weixin",
          bindName: "微信账号",
          hasBind: false,
          type: 3
        },
        {
          logoClass: "weibo",
          bindName: "微博账号",
          hasBind: false,
          type: 5
        },
        {
          logoClass: "aliApy_round",
          bindName: "支付宝账号",
          hasBind: false,
          type: 6
        }
      ]
    };
  },
  created() {
    console.error(this.user_data, "查看第三方登录情况");
    this.freshBindArr();
  },
  computed: {
    ...mapGetters(["user_data"])
  },
  methods: {
    freshBindArr() {
      this.bindArr[0].hasBind = Boolean(this.user_data.qq_openid);
      this.bindArr[1].hasBind = Boolean(this.user_data.wx_openid);
      this.bindArr[2].hasBind = Boolean(this.user_data.wb_openid);
      this.bindArr[3].hasBind = Boolean(this.user_data.al_openid);
    },
    toBind(type) {
      this.getRequest(safe.getThreeCode, { type })
        .then(res => {
          console.error(res, "绑定");
          window.location.replace(res);
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "啊偶，出错了！刷新页面重试一次吧。"
          });
        });
    },
    toUnBind(type) {
      this.getRequest(safe.delThreeUser, { type })
        .then(res => {
          console.warn(type, "解绑的类型");
          this.$message.success("解绑成功");
          this.$store.dispatch("GetUserInfo");

          // const copy = Object.assign({}, this.user_data)
          // switch(type){
          //   case '3':
          //     copy.wx_openid=null;
          //     break;
          //   case '4':
          //     copy.qq_openid=null;
          //     break;
          //   case '5':
          //     copy.wb_openid=null;
          //     break;
          //   case '6':
          //     copy.al_openid=null;
          //     break;
          // }
          // console.warn(copy,'解绑对象')
          // this.$store.commit("update_user_data", copy);
          // console.warn(this.user_data,'解绑后的use_data')
          this.freshBindArr();
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "啊偶，出错了！刷新页面重试一次吧。"
          });
        });
    }
  },
  watch: {
    user_data(val) {
      this.freshBindArr();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  background: #fff;
  min-height: 600px;
  ul {
    li {
      height: 68px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ebebeb;
      padding: 0 58px 0 30px;
      box-sizing: border-box;
      .logo {
        width: 25px;
        height: 25px;
        margin-right: 16px;
      }
      .bind-name {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-right: auto;
      }
      .btn {
        width: 88px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .bind-btn {
        background: rgb(255, 255, 255);
        border: 1px solid rgb(101, 31, 255);
        color: #7c6aff;
      }
      .un-bind-btn {
        background: rgb(255, 255, 255);
        border: 1px solid rgb(153, 153, 153);
        color: #999;
      }
    }
  }
}
</style>