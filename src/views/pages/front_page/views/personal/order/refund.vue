<template>
  <div class="refund-wrap">
    <div class="refund-head">
      <span @click="$router.push('/personal/index')">个人中心</span>
      <i class="el-icon-arrow-right"></i>
      <span @click="$router.push('/personal/order/myOrder')">我的订单</span>
      <i class="el-icon-arrow-right"></i>
      <span>退款</span>
    </div>
    <div class="refund-content" v-if="typeof reject_reason=='object'">
      <div class="content-head">
        <!--<div class="tab" :class="{active:item.isActive}" v-for="(item,index) in textArr" :key="index" @click="changeTab(index)">-->
        <div
          class="tab"
          :class="{active:item.isActive}"
          v-for="(item,index) in textArr"
          :key="index"
        >
          <span>{{index+1}}</span>
          <span>{{item.word}}</span>
        </div>
      </div>

      <div class="first-step" v-if="textArr[0].isActive && orderInfo">
        <div class="good-info">
          <span class="label">退款商品：</span>
          <div class="text-dec">
            <p class="good-name">{{refundName}}</p>
            <p class="address">
              <span>地址：</span>
              <span>{{orderInfo.to_user.address}}</span>
            </p>
            <p class="time">
              <span>时间：</span>
              <span>{{orderInfo.start_time}}-{{orderInfo.end_time}}</span>
            </p>
          </div>
        </div>
        <div class="refund-price">
          <span class="label">退款金额：</span>
          <span class="price">￥{{orderInfo.price}}</span>
        </div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="95px"
          v-if="textArr[0].isActive && orderInfo"
        >
          <el-form-item label="退款原因：" prop="reason">
            <el-select v-model="form.reason" placeholder="请选择">
              <el-option
                v-for="item in reasonOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款说明：" prop="refund_explain">
            <div class="refund-dec">
              <el-input
                type="textarea"
                placeholder="退款说明"
                v-model="form.refund_explain"
                maxlength="200"
                show-word-limit
                resize="none"
              ></el-input>
            </div>
          </el-form-item>
        </el-form>

        <el-button class="refund-btn color-area" @click="userRefundPay">提交</el-button>
      </div>

      <!--步骤2模块-->
      <div class="second-step" v-if="textArr[1].isActive && orderInfo && refundInfo">
        <div class="second-left">
          <p class="title">状态：{{refundInfo.status | refundStatus}}</p>
          <p class="sub-title">您已经成功发起退款申请，请耐心等待商家处理</p>
          <p class="line"></p>
          <p class="dec-first">商家同意您的退款申请，系统将退款给您</p>
          <!--<p class="dec-second">如果商家拒绝您的退款申请，您可以修改退款申请，再次发起，商家会重新处理</p>-->
          <!--<span class="second-btn" @click="secondNext">申请修改</span>-->
          <div v-if="refundInfo.status==11">
            <span class="label">您还可以：</span>
            <span class="cancel" @click="appeal">申诉</span>
          </div>
        </div>
        <div class="second-right">
          <div class="right-title">退款详情</div>
          <div class="one-part">
            <!--<img :src="$qiniuHost+productInfo.pic.split(',')[0]" alt="" width="50" height="50">-->
            <img :src="util.picExplode(productInfo.pic)" alt width="50" height="50" />
            <div class="name-time">
              <span>{{productInfo.name}}</span>
              <span>{{orderInfo.start_time}}-{{orderInfo.end_time}}</span>
            </div>
          </div>
          <div class="two-part">
            <div class="store-contact">
              <div class="store">
                <span class="label">商家：</span>
                <span class="value">{{orderInfo.to_user.nick}}</span>
              </div>
              <div class="contact cursor" @click="contactShop">
                <i class="el-icon-service"></i>
                <span class="word-hover">联系卖家</span>
              </div>
            </div>
            <div class="phone">
              <span class="label">联系电话：</span>
              <span class="value">{{orderInfo.to_user.mobile}}</span>
            </div>
            <div class="order-number">
              <span class="label">订单编号：</span>
              <span class="value">{{orderInfo.show_id}}</span>
            </div>
            <div class="time-wrap">
              <span class="label">订单时间：</span>
              <span class="value">{{orderInfo.create_time | time2Date}}</span>
            </div>
            <div class="price-wrap">
              <span class="label">商品总价：</span>
              <span class="value">￥{{orderInfo.price}}</span>
            </div>
          </div>
          <div class="three-part">
            <div class="refund-number">
              <span class="label">退款编码：</span>
              <span class="value">{{refundInfo.show_id}}</span>
            </div>
            <div class="refund-reason">
              <span class="label">退款原因：</span>
              <span class="value">{{refundInfo.refund_reason}}</span>
            </div>
            <!--<div class="good-status">
							<span class="label">货物状态：</span>
							<span class="value">未发货</span>
            </div>-->
            <div class="dec">
              <span class="label">说明：</span>
              <p class="value">{{refundInfo.refund_explain?refundInfo.refund_explain:'无'}}</p>
            </div>
          </div>
        </div>
      </div>

      <!--步骤3模块-->
      <div class="third-step" v-if="textArr[2].isActive && orderInfo && refundInfo">
        <div class="third-left">
          <p class="title">状态：退款成功</p>
          <div class="sub-title">
            <span>退款成功时间：</span>
            <span>{{refundInfo.edit_time|time2Date('YYYY-MM-DD hh:mm:ss')}}</span>
          </div>
          <p class="line"></p>
          <div class="refund-price">
            <span class="label">退款总额：</span>
            <span class="price">￥{{refundInfo.price}}</span>
          </div>
          <!--<div class="refund-progress">
						<div class="progress-title">
							<span>退回</span>
							<span>中国农业银行</span>
							<span>(尾号5989)：</span>
							<span>￥259</span>
						</div>
						<div class="progress">
							<el-steps :active="2" align-center>
								<el-step title="卖家退款" description="2019-07-28  09:21"></el-step>
								<el-step title="银行受理" description="2019-07-28  09:24"></el-step>
								<el-step title="退款成功" description="2019-07-28  09:24"></el-step>
							</el-steps>
						</div>
          </div>-->
        </div>
        <div class="third-right">
          <div class="right-title">退款详情</div>
          <div class="one-part">
            <!-- <img src="@images/c6.jpg" alt=""> -->
            <div class="name-time">
              <span style="margin-bottom:10px;">产品名称：{{productInfo.name}}</span>
              <span>时间：{{orderInfo.start_time}} - {{orderInfo.end_time}}</span>
            </div>
          </div>
          <div class="two-part">
            <div class="store-contact">
              <div class="store">
                <span class="label">商家：</span>
                <span class="value">{{orderInfo.to_user.nick}}</span>
              </div>
              <div class="contact cursor" @click="contactShop">
                <i class="el-icon-service"></i>
                <span class="word-hover">联系卖家</span>
              </div>
            </div>
            <div class="phone">
              <span class="label">联系电话：</span>
              <span class="value">{{orderInfo.to_user.mobile}}</span>
            </div>
            <div class="order-number">
              <span class="label">订单编号：</span>
              <span class="value">{{orderInfo.show_id}}</span>
            </div>
            <div class="time-wrap">
              <span class="label">订单时间：</span>
              <span class="value">{{orderInfo.create_time | time2Date}}</span>
            </div>
            <div class="price-wrap">
              <span class="label">商品总价：</span>
              <span class="value">￥{{orderInfo.price}}</span>
            </div>
          </div>
          <div class="three-part">
            <div class="refund-number">
              <span class="label">退款编码：</span>
              <span class="value">{{refundInfo.show_id}}</span>
            </div>
            <div class="refund-reason">
              <span class="label">退款原因：</span>
              <span class="value">{{refundInfo.refund_reason}}</span>
            </div>
            <!--<div class="good-status">
							<span class="label">货物状态：</span>
							<span class="value">未发货</span>
            </div>-->
            <div class="dec">
              <span class="label">说明：</span>
              <p class="value">{{refundInfo.refund_explain}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="personalRefund">
      <p>状态：{{orderInfo.pay_status==4?'退款中':'退款完成'}}</p>
      <p>拒绝原因：{{reject_reason}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reject_reason: "",
      textArr: [
        {
          word: "申请退款",
          isActive: true
        },
        {
          word: "商家处理退款申请",
          isActive: false
        },
        {
          word: "退款成功",
          isActive: false
        }
      ],
      reasonOptions: [
        {
          label: "订单信息拍错（时间/类型）",
          value: "1"
        },
        {
          label: "我不想租了",
          value: "2"
        },
        {
          label: "电话/姓名填写错误",
          value: "3"
        },
        {
          label: "其他",
          value: "4"
        }
      ],
      form: {
        reason: "",
        refund_explain: ""
      },
      rules: {
        reason: [
          {
            required: true,
            message: "请选择原因",
            trigger: "blur"
          }
        ],
        refund_explain: [
          {
            required: true,
            message: "请输入原因",
            trigger: "blur"
          },
          {
            min: 3,
            max: 1024,
            message: "长度在 3 到 1024 个字符",
            trigger: "blur"
          }
        ]
      },
      orderId: "", //订单id
      orderType: "", //订单类型  1/影棚  2/设备
      orderInfo: null, //订单详细
      productList: {}, //退款的产品信息
      refundInfo: null, //退款详细信息
      refundName: "", //退款产品名称
      refundLoading: false //正在退款（请求后台）  默认为false
    };
  },
  created() {
    if (this.$route.query.hasOwnProperty("reject_reason")) {
      this.reject_reason = this.$route.query.reject_reason;
      console.log(typeof this.reject_reason, "haha");
    }
    if (this.$route.query.id) {
      this.orderId = this.$route.query.id;
      this.getOrderDetail(this.orderId);
      console.log("this.orderId---------", this.orderId);
    }
  },
  filters: {
    //订单退款状态
    refundStatus(status) {
      status = parseInt(status);
      switch (status) {
        case 1:
          return "审核中";
          break;
        case 11:
          return "拒绝退款";
          break;
        case 12:
          return "运营审核";
          break;
        case 14:
          return "运营处理完毕";
          break;
        case 21:
          return "打款中";
          break;
        case 22:
          return "退款成功";
          break;
      }
    }
  },

  methods: {
    contactShop() {
      let store = this.orderInfo.to_user;
      let params = {
        id: store.id,
        name: store.nick,
        avatar:
          this.$qiniuHost + store.avatar ||
          "https://pic.paitume.com/images/male.png"
      };
      console.log("params---------", params);
      this.util.contactShop(this, params);
    },
    //申诉方法
    appeal() {
      let params = {
        order_id: this.orderId,
        order_type: this.orderType
      };
      console.log("params-------------", params);
      this.util.userRefundAppeal(params).then(res => {
        this.$message.success("申诉成功！");
        console.log("userRefundAppeal--------", res);
      });
    },

    //退款方法
    userRefundPay() {
      this.util
        .checkForm(this)
        .then(res => {
          if (res) {
            let params = {
              order_id: this.orderId,
              order_type: this.orderType, //订单类型 1、影棚 2设备
              refund_price: this.orderInfo.price, //退款金额
              refund_reason: this.form.reason, //退款原因
              refund_explain: this.form.refund_explain //退款说明
            };
            console.log("userRefundPay-------", params);
            this.util.userRefundPay(params).then(async res => {
              this.$message.success("提交退款申请成功！");
              await this.getRefundDetail();
              this.changeTab(1);
            });
          }
        })
        .catch(() => {});
    },

    //查询退款信息方法
    getRefundDetail() {
      let params = {
        order_id: this.orderId,
        order_type: this.orderType,
        is_all: 1
      };
      return new Promise((resolve, reject) => {
        this.util.ajaxUserRefundOrderDetail(params).then(res => {
          console.log("ajaxUserRefundOrderDetail-----", res);
          this.refundInfo = res;
          resolve(true);
        });
      });
    },

    //根据订单id获取订单信息
    getOrderDetail(id) {
      console.log("this.getOrderById-------", id);
      this.util.getOrderDetail(id).then(res => {
        console.log("getOrderDetail-------", res);
        this.orderInfo = res;
        if (res.has_studio == 1) {
          this.orderType = 1;
          this.productInfo = res.studio_order.studio_detail;
        } else {
          this.orderType = 2;
          let obj = {
            pic: res.equip_order[0].equip.pic.split(",")[0],
            name: res.equip_order[0].equip.static.name,
            start_time: res.start_time,
            end_time: res.end_time
          };
          this.productInfo = obj;
        }

        //为退款产品添加一个名称字段
        let name = "";
        if (res.has_studio == 1) {
          name += res.studio_order.studio_detail.name;
          if (res.has_equipment == 1) {
            res.studio_order.equip_order_array.forEach((item, index) => {
              name += "," + item.equip.static.name;
            });
          }
        }
        if (res.has_studio == 0 && res.has_equipment == 1) {
          res.equip_order.forEach((item, index) => {
            name += item.equip.static.name + ",";
          });
        }
        name = name.substring(0, name.length - 1);
        this.refundName = name;

        //退款中状态
        if (res.pay_status == 4) {
          this.changeTab(1);
          this.getRefundDetail();
        }
        //退款完成
        if (res.pay_status == 5) {
          this.changeTab(2);
          this.getRefundDetail();
        }
      });
    },

    changeTab(i) {
      this.textArr.forEach(item => {
        item.isActive = false;
      });
      this.textArr[i].isActive = true;
    },
    secondNext() {
      this.changeTab(2);
    },
    cancel() {
      this.changeTab(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.refund-wrap {
  .refund-head {
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 30px;
    span:not(:last-child) {
      cursor: pointer;
      &:hover {
        color: #7c6aff;
      }
    }
  }
  .refund-content {
    background: #fff;
    .content-head {
      height: 67px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 2px solid #d9d9d9;
      .tab {
        height: 67px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        /*cursor: pointer;*/
        span:first-child {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7c6aff;
          background: #999999;
          color: #fff;
          margin-right: 17px;
        }
        span:last-child {
          font-size: 18px;
        }
      }
      .active {
        border-bottom: 2px solid #7c6aff;
        color: #7c6aff;
        span:first-child {
          background: #7c6aff;
          color: #fff;
        }
      }
    }
    .first-step {
      padding: 36px 85px 136px;
      box-sizing: border-box;
      .good-info {
        height: 88px;
        margin-bottom: 61px;
        display: flex;
        .label {
          font-size: 16px;
          width: 100px;
          align-self: center;
        }
        img {
          width: 88px;
          height: 88px;
          margin-right: 16px;
        }
        .text-dec {
          .good-name {
            font-size: 16px;
            color: #333;
            margin-bottom: 18px;
          }
          .address {
            color: #666;
            margin-bottom: 8px;
          }
          .time {
            color: #666;
          }
        }
      }
      .refund-price {
        margin-bottom: 40px;
        display: flex;
        .label {
          font-size: 16px;
          color: #333;
          width: 100px;
        }
        .price {
          color: #ed0421;
          font-size: 18px;
        }
      }
      .refund-reason {
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        .label {
          width: 100px;
          font-size: 16px;
          color: #333;
          .el-select {
            width: 280px;
          }
        }
      }
      .refund-dec {
        display: flex;
        margin-bottom: 68px;
        .label {
          padding-top: 14px;
          box-sizing: border-box;
          width: 100px;
          font-size: 16px;
          color: #333;
        }
        /deep/ {
          .el-textarea {
            width: 458px;
            height: 128px;
          }
          .el-textarea__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .refund-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 40px;
        background: #7c6aff;
        color: #fff;
        font-size: 16px;
        margin-left: 100px;
        cursor: pointer;
      }
    }
    .second-step {
      padding: 37px 56px 140px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .second-left {
        flex: 1;
        .title {
          font-size: 24px;
          color: #333;
          margin-bottom: 15px;
        }
        .sub-title {
          font-size: 16px;
          color: #666;
          margin-bottom: 23px;
        }
        .dec-first,
        .dec-second {
          font-size: 16px;
          color: #999;
          margin-bottom: 16px;
        }
        .dec-second {
          margin-bottom: 44px;
        }
        .second-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 40px;
          background: #7c6aff;
          color: #fff;
          font-size: 16px;
          margin-bottom: 25px;
          cursor: pointer;
        }
        div .cancel {
          color: #007ad9;
          cursor: pointer;
        }
      }
      .second-right {
        width: 380px;
        border: 1px solid #d9d9d9;
        padding: 27px 25px 69px;
        box-sizing: border-box;
        margin-left: 44px;
        .right-title {
          font-size: 16px;
          color: #333;
          margin-bottom: 24px;
        }
        .one-part {
          display: flex;
          padding-bottom: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #c9c9c9;
          margin-bottom: 21px;
          img {
            width: 50px;
            height: 50px;
            margin-right: 22px;
          }
          .name-time {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #333;
            span:first-child {
              margin-bottom: 5px;
            }
          }
        }
        .two-part {
          padding-bottom: 19px;
          box-sizing: border-box;
          border-bottom: 1px solid #c9c9c9;
          margin-bottom: 17px;
          .store-contact,
          .phone,
          .order-number,
          .time-wrap,
          .price-wrap {
            display: flex;
            margin-bottom: 17px;
            .store {
              display: flex;
            }
            .label {
              width: 76px;
              color: #999;
              margin-right: 16px;
            }
          }
          .store-contact {
            justify-content: space-between;
            .el-icon-service {
              color: #7c6aff;
            }
          }
          .price-wrap {
            margin-bottom: 0;
          }
        }
        .three-part {
          .refund-number,
          .refund-reason,
          .good-status,
          .dec {
            display: flex;
            margin-bottom: 17px;
            .label {
              width: 76px;
              color: #999;
              margin-right: 16px;
            }
          }
          .dec {
            margin-bottom: 0;
            display: flex;
            justify-content: space-between;
            .label {
            }
            .value {
              flex: 1;
              overflow: hidden; //文字超出换行
              word-wrap: break-word;
            }
          }
        }
      }
    }
    .third-step {
      padding: 37px 56px 140px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .third-left {
        flex: 1;
        .title {
          font-size: 24px;
          color: #333;
          margin-bottom: 15px;
        }
        .sub-title {
          font-size: 16px;
          color: #666;
          margin-bottom: 23px;
        }
        .refund-price {
          font-size: 18px;
          margin-bottom: 43px;
          .label {
            color: #333;
          }
          .price {
            color: #ed0421;
          }
        }
        .refund-progress {
          height: 200px;
          border: 1px solid #d9d9d9;
          display: flex;
          flex-direction: column;
          .progress-title {
            font-size: 0;
            padding-left: 20px;
            box-sizing: border-box;
            height: 60px;
            line-height: 60px;
            span {
              font-size: 16px;
            }
          }
          .progress {
            flex: 1;
            background: #fafafa;
            padding-top: 25px;
          }
        }
      }
      .third-right {
        width: 360px;
        border: 1px solid #d9d9d9;
        padding: 27px 25px 69px;
        box-sizing: border-box;
        margin-left: 44px;
        .right-title {
          font-size: 16px;
          color: #333;
          margin-bottom: 24px;
        }
        .one-part {
          display: flex;
          padding-bottom: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #c9c9c9;
          margin-bottom: 21px;
          img {
            width: 50px;
            height: 50px;
            margin-right: 22px;
          }
          .name-time {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #333;
            span {
            }
          }
        }
        .two-part {
          padding-bottom: 19px;
          box-sizing: border-box;
          border-bottom: 1px solid #c9c9c9;
          margin-bottom: 17px;
          .store-contact,
          .phone,
          .order-number,
          .time-wrap,
          .price-wrap {
            display: flex;
            margin-bottom: 17px;
            .store {
              display: flex;
            }
            .label {
              width: 76px;
              color: #999;
              margin-right: 16px;
            }
          }
          .store-contact {
            justify-content: space-between;
            .el-icon-service {
              color: #7c6aff;
            }
          }
          .price-wrap {
            margin-bottom: 0;
          }
        }
        .three-part {
          .refund-number,
          .refund-reason,
          .good-status,
          .dec {
            display: flex;
            margin-bottom: 17px;
            .label {
              width: 76px;
              color: #999;
              margin-right: 16px;
            }
          }
          .dec {
            margin-bottom: 0;
            display: flex;
            justify-content: space-between;
            .label {
            }
            .value {
              flex: 1;
              overflow: hidden; //文字超出换行
              word-wrap: break-word;
            }
          }
        }
      }
    }
  }
}
.personalRefund {
  text-align: center;
  background-color: #fff;
  padding: 20px 0;

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
    &:nth-child(1) {
      font-size: 24px;
      color: #333;
    }
  }
}
</style>