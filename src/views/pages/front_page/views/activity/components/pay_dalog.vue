<template>
  <div class="pay-bbox">
    <el-dialog :title="title" :visible.sync="isShow" class="dialog" @closed="closed">
      <!-- 输入信息 -->
      <div class="pay-box" v-show="title_state == 0">
        <div class="input-title">
          <span class="one">请输入您的手机号码：</span>
          <span class="two">请确保手机号码填写无误，这是您的入场凭证</span>
        </div>
        <div class="input-setting">
          <el-input v-model="phone"></el-input>
        </div>
        <div class="people">
          <span>报名人数：</span>
          <div class="people-input">
            <el-input-number
              v-model="num"
              controls-position="right"
              @change="handleChange"
              :min="1"
            ></el-input-number>
            <span v-if="surplus">还剩下{{surplus}}个名额</span>
          </div>
        </div>
        <div class="fee-box">
          <div>
            费用：
            <span class="fee">{{list[0].fee}}</span>
            <span class="unit">/人</span>
          </div>
        </div>
        <div class="bottom-box">
          <div class="leftbox">
            <el-button
              type="primary"
              @click="next"
            >{{Number(list[0].fee).toFixed(0) == 0?'立刻报名':'立刻付款'}}</el-button>
            <div class="border word-hover" @click="follow">
              <ali-svg-icon icon-class="liked" class-name="size" v-if="isFollow"></ali-svg-icon>
              <ali-svg-icon icon-class="like" class-name="size" v-else></ali-svg-icon>
              <span>收藏</span>
            </div>
          </div>
          <div class="rightbox">
            <div class="border word-hover">
              <ali-svg-icon icon-class="share" class-name="size"></ali-svg-icon>
              <span>分享</span>
            </div>
            <div class="callcs word-hover">
              <ali-svg-icon icon-class="customer_service" class-name="size color"></ali-svg-icon>
              <span>联系举办方</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 核对报名信息 -->
      <div v-show="title_state == 1" class="pay-box2">
        <el-table :data="list" fit>
          <el-table-column label="地址">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="人数">
            <template slot-scope="scope">
              <span>{{scope.row.people}}</span>
              <span @click="back" class="edit" v-if="!IsConfirmPay">修改</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">
              <span>{{scope.row.start_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template slot-scope="scope">
              <span>{{scope.row.end_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template slot-scope="scope">
              <span>{{scope.row.fee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="合计应付">
            <template slot-scope="scope">
              <span>{{scope.row.numfee}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="text">
          <div class="base-info">
            <div>基本信息：</div>
            <div class="name">{{name}}</div>
          </div>
          <div class="shop-name">
            <div>发起人：{{user_detail.nick}}</div>
            <div>
              <span
                class="confirm-info"
                @click="confirm_in_pay"
                v-if="!IsConfirmPay"
              >{{Number(list[0].fee).toFixed(0) == 0?'信息确认立刻报名':'确认信息准备付款'}}</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="pay-selet" v-if="confirm_pay">
          <div>
            <el-radio-group v-model="radio">
              <el-radio :label="1">微信支付</el-radio>
              <el-radio :label="2">支付宝支付</el-radio>
              <div ref="alipay"></div>
            </el-radio-group>
          </div>
          <div clas="right-img">
            <div>
              <canvas ref="canvas" class="canvas-size"></canvas>
            </div>
            <div>合计应付：￥{{list[0].numfee}}</div>
          </div>
        </div>
      </div>
      <!-- 完成报名 -->
      <div v-show="title_state == 2" class="pay-box3">
        <ali-svg-icon icon-class="succ" class="bg-third_step"></ali-svg-icon>

        <div class="pay-suss">{{Number(list[0].fee).toFixed(0) == 0?'报名成功':'支付成功'}}</div>
        <div class="pay-s-text">您已成功报名，入场信息将会发送至您的手机（可能会有几分钟延迟），请保存好</div>
        <div class="fail-pay">我没有收到信息，联系客服</div>
        <el-button type="primary" @click="closed">好的</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRcode from "qrcode";
// import io from "socket.io-client";

import { frontFollowOrCollect, activity } from "@/config/api";
import { mapGetters } from "vuex";
export default {
  props: {
    openpay: {
      type: Boolean,
      default: true
    },
    paydata: {
      type: Object
    }
  },
  data() {
    return {
      isShow: this.openpay,
      title: "输入报名信息",
      title_state: 0,
      num: 0,
      phone: "",
      list: [
        {
          name: "",
          address: "",
          mobile: "",
          people: "",
          start_time: "",
          end_time: "",
          fee: "",
          numfee: ""
        }
      ],
      radio: 1,
      name: "",
      nick: "",
      id: "",
      user_detail: {},
      surplus: "",
      isFollow: false,
      confirm_pay: false,
      orderId: "",
      pay_data: {
        id: "",
        pay_way: "",
        price: ""
      },
      wechat_qrcode: "",
      alipay_data: "",
      IsConfirmPay: false,
      socketLogin: false
    };
  },
  watch: {
    openpay(to) {
      this.isShow = to;
    },
    radio(num) {
      this.pay_data.pay_way = num;
      this.pay();
    }
  },
  components: {},
  computed: {
    ...mapGetters(["user_data"])
  },
  created() {},
  mounted() {
    this.phone = this.user_data.mobile;
    // console.log("payDialog created");
    // let socket = io("http://39.97.162.8:2120");
    // console.log("socket", socket);
    // const _this = this;
    // socket.on("connect", function() {
    //   console.log("连接成功 _this.socketLogin = " + _this.socketLogin);
    //   if (!_this.socketLogin) {
    //     console.log("发送socket登录请求.");
    //     socket.emit("login", 1);
    //   } else {
    //     console.log("已经登录");
    //   }
    // });
    // socket.on("login_succ", function(data) {
    //   alert("socket登录成功");
    //   _this.socketLogin = true;
    // });
    // socket.on("connect_error", error => {
    //   console.log("socket登录error", error);
    // });
    // socket.on("connect_timeout", timeout => {
    //   console.log("socket登录timeout", timeout);
    // });
    // socket.on("new_msg", function(data) {
    //   console.log("new_msg", data);
    //   alert(data);
    // });
    // socket.on("event", function(data) {
    //   console.log("socket event");
    // });
    // socket.on("disconnect", function() {
    //   console.log("socket disconnect");
    // });

    this.list[0].address = this.paydata.address;
    this.list[0].start_time = this.paydata.start_time;
    this.list[0].end_time = this.paydata.end_time;
    this.list[0].fee = this.paydata.fee;
    this.name = this.paydata.name;
    this.user_detail = this.paydata.user_detail;
    this.id = this.paydata.id;
    this.surplus = this.paydata.max_person - this.paydata.current_person;
    let params = {
      relation_id: this.paydata.id,
      type: 3,
      obj: 1
    };
    if (this.user_data !== null) {
      this.getRequest(frontFollowOrCollect.getLsObjById, params).then(res => {
        console.log(res);
        if (res === 1) {
          this.isFollow = true;
        }
      });
    }
  },

  methods: {
    back() {
      this.title = "输入报名信息";
      this.title_state = 0;
    },
    closed() {
      this.isShow = false;
      this.confirm_pay = false;
      this.title = "输入报名信息";
      this.title_state = 0;
      this.$emit("closed");
      this.radio = 1;
      this.orderId = "";
      this.pay_data = {
        id: "",
        pay_way: "",
        price: ""
      };
      this.wechat_qrcode = "";
      this.alipay_data = "";
      this.IsConfirmPay = false;
    },
    handleChange(e) {
      console.log(e);
    },
    next() {
      if (!this.phone) {
        this.$message({
          type: "error",
          message: "手机号不能为空"
        });
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message({
          type: "error",
          message: "手机号码不合法"
        });
      } else {
        this.title_state = 1;
        this.title = "核对报名信息";
        this.list[0].mobile = this.phone;
        this.list[0].people = this.num;
        this.list[0].numfee = this.list[0].fee * this.num;
      }
    },
    follow() {
      if (this.isFollow) {
        let data = {
          type: 3,
          obj: 1,
          relation_id: this.id
        };
        this.postRequest(frontFollowOrCollect.unFollowOrUnCollect, data).then(
          res => {
            this.$message({
              type: "success",
              message: "取消成功"
            });
            this.isFollow = false;
          }
        );
      } else {
        let data = {
          to_uid: this.user_detail.id,
          type: 3,
          obj: 1,
          relation_id: this.id
        };
        this.postRequest(frontFollowOrCollect.followOrCollect, data).then(
          res => {
            this.$message({
              type: "success",
              message: "关注成功"
            });
            this.isFollow = true;
          }
        );
      }
    },
    confirm_in_pay() {
      let data = {
        id: this.id,
        person_nums: this.list[0].people,
        price: this.list[0].numfee,
        mobile: this.list[0].mobile
      };
      this.$confirm("一旦确认订单之后将无法修改活动内容，是否确定？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (Number(data.price).toFixed(0) > 0) {
            this.$confirm("收费活动一旦支付将无法退款！是否确定？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$message({
                type: "success",
                message: "订单确认成功，正在生成支付方式..."
              });
              this.pay_data.price = this.list[0].numfee;
              this.pay(data);
              this.IsConfirmPay = true;
            });
          } else {
            this.postRequest(activity.ajaxUserApply, data).then(res => {
              if (res.status === "done") {
                this.$message({
                  type: "success",
                  message: "报名成功"
                });
                this.title_state = 2;
              }
            });
          }
        })
        .catch(() => {});
    },
    async pay(data) {
      try {
        // 当支付订单为空时候，拉取接口报名
        if (this.orderId === "") {
          let order_info = await this.postRequest(activity.ajaxUserApply, data);
          if (order_info.status === "ready") {
            console.log(order_info);
            this.orderId = order_info.order_id;
            this.pay_data.id = order_info.order_id;
            this.pay_data.pay_way = 1;
            this.confirm_pay = true;
          }
        }
        // 在已有订单id时，判断用户是否重复点击支付方式
        if (this.wechat_qrcode === "" || this.alipay_data === "") {
          let pay_succ_data = await this.postRequest(
            activity.ajaxActivityPay,
            this.pay_data
          );
          switch (this.pay_data.pay_way) {
            case 1:
              this.wechat_qrcode = pay_succ_data;
              this.getPayStatus(this.pay_data.id);
              break;
            case 2:
              this.alipay_data = pay_succ_data;

              break;
            default:
              break;
          }
        }
        // 当支付方式发生变动时，执行的操作
        switch (this.pay_data.pay_way) {
          case 1:
            this.gener_qrcode(this.wechat_qrcode);
            break;
          case 2:
            this.$refs.alipay.innerHTML = this.alipay_data;
            document.forms["alipay_submit"].submit();
            console.log(this.alipay_data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
    gener_qrcode(url) {
      let canvas = this.$refs.canvas;
      QRcode.toCanvas(
        canvas,
        url,
        {
          errorCorrectionLevel: "H"
        },
        error => {
          if (error) {
            console.log(error);
            this.$message({
              type: "error",
              message: "微信支付码生成失败"
            });
          }
        }
      );
    },
    getPayStatus(order_id) {
      this.payInterval = setInterval(() => {
        this.util.getPayStatus(orderId).then(res => {
          if (res.pay_status == 2) {
            this.clearPayInterval();
            this.title_state = 3;
          }
        });
      }, 1000);
    },

    //清除定时器
    clearPayInterval() {
      clearInterval(this.payInterval);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/color.scss";

.pay-bbox {
  /deep/ .el-dialog__header {
    padding: 12px 12px 8px 20px;
    background-color: #fbfaff;
    border-bottom: 1px solid #f0f0f0;

    /deep/ .el-dialog__title {
      color: $Theme-color;
    }

    /deep/ .el-dialog__headerbtn {
      top: 10px;
      font-size: 24px;
    }
  }

  .pay-box {
    .input-title {
      .one {
        color: #333333;
        line-height: 20px;
      }

      .two {
        font-size: 12px;
        color: #ff641f;
      }
    }

    .input-setting {
      margin-top: 10px;
      width: 42%;
    }

    .people {
      margin-top: 20px;
      color: #666666;
      display: flex;
      align-items: center;

      .people-input {
        /deep/ .el-input-number {
          width: 86px;
        }
      }
    }

    .fee-box {
      margin-top: 20px;
      color: #999999;

      .fee {
        font-size: 30px;
        color: rgb(214, 0, 0);
      }
    }

    .bottom-box {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .leftbox {
        display: flex;

        /deep/ .el-button--primary {
          background-color: $Theme-color;
        }

        /deep/ .el-button {
          width: 116px;
          border-radius: 0;
        }
        /deep/ .el-button--primary:hover {
          background: rgba(148, 105, 255, 0.801);
          border-color: $Theme-color;
        }
      }

      .rightbox {
        display: flex;
        align-items: center;

        .callcs {
          padding: 7px 9px 8px 16px;
          border: 1px solid #f0f0f0;
          display: flex;
          cursor: pointer;

          .size {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }

          .color {
            color: $Theme-color;
          }
        }
      }

      .border {
        cursor: pointer;
        margin-left: 10px;
        width: 40px;
        height: 40px;
        border: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        font-size: 12px;
      }
    }
  }

  .pay-box2 {
    /deep/ .el-table::before {
      background-color: #ffffff;
    }

    /deep/ .el-table th.is-leaf,
    .el-table td {
      border: 0px;
    }

    /deep/ .el-table {
      border: 0px;
    }

    .edit {
      cursor: pointer;
      color: $Theme-color;
    }

    .text {
      .base-info {
        color: #999999;
        margin: 10px 0;

        .name {
          color: #333333;
        }
      }

      .shop-name {
        display: flex;
        justify-content: space-between;

        .confirm-info {
          cursor: pointer;
          color: #5f1dee;
        }
      }
    }

    .pay-selet {
      display: flex;
      align-items: center;
      justify-content: space-around;

      /deep/.el-radio__input.is-checked .el-radio__inner {
        border-color: $Theme-color;
        background: $Theme-color;
      }

      /deep/ .el-radio__input.is-checked + .el-radio__label {
        color: $Theme-color;
      }

      .right-img {
        display: flex;
        align-items: center;

        .canvas-size {
          width: 118px !important;
          height: 118px !important;
        }
      }
    }
  }

  .pay-box3 {
    text-align: center;
    line-height: 26px;
    color: #333;

    .bg-third_step {
      width: 72px;
      height: 72px;
    }

    .pay-suss {
      color: #5f1dee;
      font-size: 20px;
      font-weight: bold;
    }

    .fail-pay {
      color: #5f1dee;
    }

    /deep/ .el-button--primary {
      background: linear-gradient(
        180deg,
        rgba(246, 246, 246, 1) 0%,
        rgba(235, 235, 235, 1) 100%
      );
      color: #333;
    }

    /deep/ .el-button {
      margin-top: 10px;
      border-radius: 0;
      width: 80px;
    }
  }
}
</style>
