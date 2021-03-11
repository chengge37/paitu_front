<template>
  <div class="detail-wrap">
    <div class="detail-head">
      <span @click="$router.push('/personal/index')">个人中心</span>
      <i class="el-icon-arrow-right"></i>
      <span @click="$router.push('/personal/myActivity/order')">活动订单</span>
      <i class="el-icon-arrow-right"></i>
      <span>订单详情</span>
    </div>
    <div class="detail-content">
      <!-- <div class="content-head">
        <div class="head-item" :class="{'active':item.isActive}" v-for="(item,index) in textArr" :key="index">
          <span class="circle">{{index+1}}</span>
          <span class="word" v-text="item.word"></span>
        </div>
      </div> -->
      <div class="content-status">
        <p class="cur-status">
          <span>当前状态：</span>
          <span>{{detail.pay_status|statusFormat}}</span>
        </p>
        <div class="time-intro">
          <span class="time">{{detail.create_time|timeFormat}}</span>
          <div class="intro">
            <span v-if="detail.pay_status==1">您的订单尚未付款</span>
            <span v-if="detail.pay_status==2">快去评价吧</span>
            <span v-if="detail.pay_status==8">您的订单已完成，欢迎再次下单</span>
            <span v-if="detail.pay_status==4||detail.pay_status==5">原因：买家退款</span>
            <span v-if="detail.pay_status==0">原因：买家取消订单</span>
            <!-- <span>原因：付款超时</span>
            <span>原因：卖家拒绝</span> -->
            <!-- <div>
              <span>点击这里</span>
              <span>付款</span>
              <span>去结算</span>
            </div>
            <div>
              <span>点击这里</span>
              <span>评价</span>
              <span>去结算</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="order-title">订单详情</div>
      <div class="buyer-info" v-if="detail.activity">
        <p class="buyer-name">
          <span>报名者信息：</span>
          <span>{{detail.activity.user.nick}}</span>
          <span>({{detail.activity.user.mobile}})</span>
        </p>
        <p class="join-num">
          <span>报名人数：</span>
          <span>{{detail.activity.current_person}}</span>
        </p>
        <p class="should-pay">
          <span>应付金额：</span>
          <!-- <span>{{detail.user.address}}</span> -->
          <span>{{detail.price}}</span>
          <!-- <span>{{detail.to_user.address}}</span> -->
        </p>
        <p class="address">
          <span>活动地址：</span>
          <span>{{detail.activity.address}}</span>
        </p>
        <p class="shop-name">
          <span>举办方：</span>
          <span class="name">{{detail.contact_name}}</span>
        </p>
        <p class="seller-phone">
          <span>举办方电话：</span>
          <span>{{detail.contact_mobile}}</span>
        </p>
        <p class="order-number">
          <span>订单号：</span>
          <span>{{detail.show_id}}</span>
        </p>
        <p class="create-time">
          <span>创建时间：</span>
          <span>{{detail.create_time|timeFormat}}</span>
        </p>
      </div>
      <div class="goods-table">
        <div class="info-head">
          <span>商品信息</span>
          <span>金额</span>
          <span>状态</span>
          <span>操作</span>
        </div>
        <div class="info-center" v-if="detail.activity">
            <!-- 订单里面的影棚 -->
            <!-- <div class="goods-price"> -->
              <div class="goods-info">
                <img :src="$qiniuHost+detail.pic" alt="">
                <div class="info-detail">
                  <p class="name">{{detail.activity.name}}</p>
                  <p>
                    <span>地址：</span>
                    <span>{{detail.activity.address}}</span>
                  </p>
                  <p>
                    <span>时间：</span>
                    <span>{{detail.activity.start_time}}</span>
                    <span>至</span>
                    <span>{{detail.activity.end_time}}</span>
                  </p>
                </div>
              </div>
              <div class="price">￥{{detail.price}}</div>
            <!-- </div> -->
          <div class="status">{{detail.pay_status|statusFormat}}</div>
          <!-- <div class="total-price">￥{{detail.price}}</div> -->
          <div class="operation">
            <p v-if="detail.pay_status==1" @click="toPay(detail.id,detail.price)">立即支付</p>
            <p v-if="detail.pay_status==1" @click="cancelOrder(detail.id)">取消订单</p>
            <p v-if="detail.pay_status==7" @click="toEvaluate(detail.id)">评价</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付弹框 -->
		<el-dialog
		title="支付"
		:visible.sync="dialogVisible"
		width="30%"
		:before-close="handleClose">
			<div class="pay-selet">
				<div>
					<el-radio-group v-model="way">
						<el-radio :label="1" value="1">微信支付</el-radio>
						<el-radio :label="2" value="2">支付宝支付</el-radio>
						<div ref="alipay"></div>
					</el-radio-group>
				</div>
				<div class="right-img">
					<div>
						<canvas ref="canvas" class="canvas-size"></canvas>
					</div>
					<div>合计应付：￥<span style="fontSize:28px;color:red">{{pay_data.price}}</span></div>
				</div>
			</div>
		<!-- <span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span> -->
	</el-dialog>

  </div>
</template>

<script>
import {frontOrder,activity} from '@config/api.js'
import QRcode from "qrcode";
import {storage} from '@util/storage.js'

  export default {
    data(){
      return{
        textArr:[
          {
            word:'拍下订单',
            isActive:false
          },
          {
            word:'已支付',
            isActive:false
          },
          {
            word:'已完成',
            isActive:false
          },
        ],
        detail:{},
        dialogVisible: false,
        way: 1,
        pay_data: {
          id: "",
          pay_way: 1,
          price: ""
        },
        wechat_qrcode: "",
        alipay_data: ""
      }
    },
    mounted(){
      this.getOrderDetail(this.$route.query.orderId)
    },
    methods:{
      getOrderDetail(id){
        this.getRequest(activity.get_my_activity,{id}).then(res=>{
          console.log(res,'获取订单详情')
          this.detail={...res.rows[0]}
          console.log(this.detail,'iopipoipiopop')
          // this.textArr[2].isActive=true
          // if(this.detail.pay_status==2||this.detail.pay_status==3||this.detail.pay_status==6||this.detail.pay_status==7){
          //   this.textArr[1].isActive=true
          // }else{
          //   this.textArr[2].isActive=true
          // }
        }).catch(err=>{})
      },
      // 关闭支付弹框
			handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
			},
			toPay(orderId,price) {
				this.dialogVisible=true
				let data = {
					id: orderId,
					price: price
				};
				this.pay_data.price=price
				this.pay_data.id=orderId
				this.pay(data);
			},
			async pay(data) {
				try {
					// 在已有订单id时，判断用户是否重复点击支付方式
					if (this.wechat_qrcode === "" || this.alipay_data === "") {
						let pay_succ_data = await this.postRequest(
							activity.ajaxActivityPay,
							this.pay_data
						);
						console.log(pay_succ_data,'999999999999999999')
						switch (this.pay_data.pay_way) {
							case 1:
								this.wechat_qrcode = pay_succ_data;
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
				QRcode.toCanvas(canvas, url, { errorCorrectionLevel: "H" }, error => {
					if (error) {
						console.log(error);
						this.$message({ type: "error", message: "微信支付码生成失败" });
					}
				});
			},
			cancelOrder(orderId){
				console.log(orderId,'要取消的订单')
				this.util.confirm(this).then(res=>{
					if(res){
						this.postRequest(activity.cancelActivity,{id:orderId}).then(res=>{
              console.log(res,'取消订单11111111111111')
              this.$message.success("取消订单成功！");
              this.$router.push('/personal/myActivity/order')
				    })
					}
				}).catch(()=>{});
				
      },
      toEvaluate(orderId){
        storage.set('activityOrder',this.detail)
				this.$router.push('/personal/myActivity/activityEvaluate')
			}
    },
    filters:{
      // 时间戳转换为一般格式时间
			timeFormat(timestamp){
				var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
				return Y+M+D+h+m+s;
			},
      // 后台返回订单状态码转状态
			statusFormat(status){
				switch(status){
					// case '0':
					// 	return '已取消';
					// 	break;
					case '1':
						return '未支付';
						break;
					case '2':
						return '已支付';
						break;
					case '3':
						return '拒单，退款中';
						break;
					case '4':
						return '拒单，退款完毕';
						break;
					case '5':
						return '活动进行中';
						break;
					case '7':
						return '等待评论';
						break;
					case '8':
						return '评论结束';
						break;
				}
      },
      picDeal(val){
        let sub = val.slice(val.indexOf("src"));
        let sub1 = sub.slice(sub.indexOf('"') + 1);
        let sub2 = sub1.slice(0, sub1.indexOf('"'));
        return sub2;
      }
    },
    watch:{
      way(num) {
				this.pay_data.pay_way = num;
				this.pay();
			}
    }
  }
</script>

<style lang="scss" scoped>
.detail-wrap{
  .detail-head{
    padding-left: 20px;
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin-bottom: 30px;
    span:not(:last-child){
      cursor: pointer;
      &:hover{
        color: #7C6AFF;
      }
    }
  }
  .detail-content{
    background: #fff;
    // .content-head{
    //   display: flex;
    //   height: 45px;
    //   align-items: center;
    //   justify-content: space-around;
    //   border-bottom: 1px solid #D9D9D9;
    //   margin-bottom: 20px;
    //   .head-item{
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     width: 200px;
    //     height: 100%;
    //     .circle{
    //       display: flex;
    //       justify-content: center;
    //       align-items: center;
    //       width: 20px;
    //       height: 20px;
    //       border-radius: 50%;
    //       background: #999;
    //       color: #fff;
    //       text-align: center;
    //       margin-right: 12px;
    //     }
    //   }
    //   .active{
    //     border-bottom:2px solid #7C6AFF;
    //     color: #7C6AFF;
    //     .circle{
    //       background: #7C6AFF;
    //       color: #fff;
    //     }
    //   }
    // }
    .content-status{
      height: 150px;
      background: #FAFAFA;
      padding: 30px 0 0 42px;
      box-sizing: border-box;
      border: 1px solid #D9D9D9;
      .cur-status{
        font-size: 30px;
        color: #333;
        margin-bottom: 20px;
      }
      .time-intro{
        font-size: 16px;
        color: #666;
        display: flex;
        align-items: center;
        .time{
          margin-right: 30px;
          line-height: 30px;
        }
        .intro{
          line-height: 30px;
        }
      }
    }
    .order-title{
      height: 81px;
      padding: 45px 19px 0 20px;
      box-sizing: border-box;
      font-size: 16px;
      color: #333;
    }
    .buyer-info{
      height: 278px;
      background: #FAFAFA;
      padding: 27px 0 25px 41px;
      box-sizing: border-box; 
      border: 1px solid #D9D9D9;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 42px;
      .address{
        span:nth-child(2){
          margin-right: 50px;
        }
      }
      .shop-name{
        .name{
          margin-right: 80px;
        }
      }
    }
    .goods-table{
      border: 1px solid #D9D9D9;
      .info-head{
        height: 42px;
        background: #FAFAFA;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #D9D9D9;
        span:first-child{
          flex: 3;
        }
        // .goods-price{
        //   display: flex;
        //   span{
        //     flex: 1;
        //   }
        //   span:first-child{
        //     flex: 3;
        //     text-align: left;
        //     text-indent: 107px;
        //     box-sizing: border-box;
        //   }
        // }
        span{
          flex: 1;
          text-align: center;
        }
      }
      .info-center{
        display: flex;
        .goods-info{
          padding: 20px 0;
          box-sizing: border-box;
          height: 129px;
          flex: 3;
          display: flex;
          // border-bottom: 1px solid rgb(217,217,217);
          border-right: 1px solid rgb(217,217,217);
          img{
            margin-left: 40px;
            width: 88px;
            height: 88px;
            margin-right: 19px;
          }
          .info-detail{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 12px;
            color: #666;
            .name{
              font-size: 16px;
              color: #333;
            }
          }
        }
        .price{
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 129px;
          border-right: 1px solid rgb(217,217,217);
        }
        .num{
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 129px;
          border-bottom: 1px solid rgb(217,217,217);
          border-right: 1px solid rgb(217,217,217);
        }
        .price:last-child{
          border-bottom: none;
        }
        .status{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgb(217,217,217);
        }
        // .total-price{
        //   flex: 1;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   border-right: 1px solid rgb(217,217,217);
        // }
        .operation{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p:first-child{
            margin-bottom: 30px;
          }
          p{
            cursor: pointer;
            &:hover{
              color: #7C6AFF;
            }
          }
        }
      }
    }
  }
}
</style>