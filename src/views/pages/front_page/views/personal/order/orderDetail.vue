<template>
<div class="detail-wrap">
    <div class="detail-head">
        <span @click="$router.push('/personal/index')">个人中心</span>
        <i class="el-icon-arrow-right"></i>
        <span @click="$router.push('/personal/order/myOrder')">我的订单</span>
        <i class="el-icon-arrow-right"></i>
        <span>订单详情</span>
    </div>
    <div class="detail-content" v-if="detail">
        <div class="content-head" v-if="detail.pay_status==1||detail.pay_status==2||detail.pay_status==5||detail.pay_status==7||detail.pay_status==8">
            <div class="head-item" :class="{'active':item.isActive}" v-for="(item,index) in textArr" :key="index">
                <span class="circle">{{index+1}}</span>
                <span class="word" v-text="item.word"></span>
            </div>
        </div>
        <div class="content-status">
            <p class="cur-status">
                <span>当前状态：</span>
                <span>{{detail.pay_status|statusFormat}}</span>
            </p>
            <div class="time-intro">
                <span class="time">{{detail.create_time|timeFormat}}</span>
                <div class="intro">
                    <span v-if="detail.pay_status==1">点击这里<span class="pay-btn color-area" @click="toPay(detail.id,detail.price)">付款</span>去结算</span>
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
        <div class="buyer-info" v-if="detail">
            <p class="buyer-name">
                <span>买家信息：</span>
                <span>{{detail.user.nick||null}}</span>
                <span>({{detail.user.mobile||null}})</span>
            </p>
            <p class="transport">
                <span>运送方式：</span>
                <span>{{detail.address_id==0?'到店自取':'寄送'}}</span>
            </p>
            <p class="address" v-if="detail.address_id!='0'">
                <span>收货地址：</span>
                <span>{{detail.address_detail.address}}</span>
                <span>店铺地址：</span>
                <span>{{detail.to_user.address}}</span>
            </p>
            <p class="pay">
                <span>应付金额：</span>
                <!-- <span>￥{{detail.price-couponPrice}}</span> -->
                <span>￥{{detail.price}}</span>
            </p>
            <p class="shop-name">
                <span>店铺昵称：</span>
                <span class="name">{{detail.to_user.nick}}</span>
                <!--<i class="el-icon-headset"></i>
                <span>联系卖家</span>-->
            </p>
            <p class="seller-phone">
                <span>卖家电话：</span>
                <span>{{detail.to_user.mobile}}</span>
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
                <div class="goods-price">
                    <span>商品信息</span>
                    <span>部分价格</span>
                    <span>数量（使用时间）</span>
                </div>
                <span>状态</span>
                <span>总额</span>
                <span>操作</span>
            </div>
            <div class="info-center">
                <div class="goods-price-wrap">
                    <!-- 订单里面的影棚 -->
                    <div class="goods-price" v-if="detail.has_studio!=0">
                        <div class="goods-info">
                            <!--<img :src="host+detail.studio_order.studio_detail.pic|picDeal" alt="">-->
                            <img :src="util.picExplode(detail.studio_order.studio_detail.pic)" alt="">
                            <div class="info-detail">
                                <p class="name">{{detail.studio_order.studio_detail.name||null}}</p>
                                <p>
                                    <span>地址：</span>
                                    <span>{{detail.to_user.address}}</span>
                                </p>
                                <p>
                                    <span>时间：</span>
                                    <span>{{detail.start_time}}</span>
                                    <span>至</span>
                                    <span>{{detail.end_time}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="price">￥{{detail.studio_order.price||null}}</div>
                        <div class="num">1</div>
                    </div>
                    <!-- 订单里面的设备 -->
                    <div class="equip-wrap" v-if="detail.has_equipment!=0">
                        <div class="goods-price" v-for="(item,index) in detail.equip_order||detail.studio_order.equip_order_array" :key="index">
                            <div class="goods-info">
                                <!--<img :src="host+(item.equip.pic||item.equip.static.pic)|picDeal" alt="">-->
                                <img :src="util.picExplode(item.equip.pic||item.equip.static.pic)" alt="">
                                <div class="info-detail">
                                    <p class="name">{{item.equip.static.name}}</p>
                                    <!-- <p>
                      <span>地址：</span>
                      <span>朝阳区化工路5号垡头产业园泓彤体育院内 </span>
                    </p> -->
                                    <p>
                                        <span>时间：</span>
                                        <span>{{detail.start_time}}</span>
                                        <span>至</span>
                                        <span>{{detail.end_time}}</span>
                                        <!-- <span>2019年07月26号-07月28号</span> -->
                                    </p>
                                </div>
                            </div>
                            <div class="price">￥{{item.price||null}}</div>
                            <div class="num">{{item.order_count}}</div>
                        </div>
                    </div>
                </div>
                <div class="status">{{detail.pay_status|statusFormat}}</div>
                <div class="total-price">￥{{detail.price}}</div>
                <div class="operation">
                    <p class="pay-btn" v-if="detail.pay_status==1" @click="toPay(detail.id,detail.price)">立即支付</p>
                    <p v-if="detail.pay_status==1" @click="cancelOrder(detail.id)">取消订单</p>
                    <!-- <p>再来一单</p>
            <p>退款</p> -->
                    <p v-if="detail.pay_status==7" @click="toEvaluate(detail.id)">评价</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bottom-info" v-if="detail && detail.pay_status==1">
        <!-- <p class="row">
            <span>商品总额：</span>
            <span>￥{{detail.price}}</span>
        </p>
        <p class="row">
            <span>商品优惠：</span>
            <span>-￥{{couponPrice}}</span>
        </p> -->
        <!-- 不显示前两个是因为优惠有多种，而且还可能涉及到商家修改价格，所以不显示具体优惠变动金额 -->
        <p class="row">
            <span>实付款：</span>
            <span>￥{{detail.price}}</span>
        </p>
    </div>

    <!-- 支付弹框 -->
    <el-dialog title="支付" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
                <div>合计应付：￥<span style="fontSize:28px;color:red">{{pay_data.total_price}}</span></div>
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
import {
    frontOrder,coupon
} from '@config/api.js'
import {
    qiniuHost
} from '@config/config.js'
import QRcode from "qrcode";
import {
    storage
} from '@util/storage.js'

export default {
    data() {
        return {
            textArr: [{
                    word: '拍下订单',
                    isActive: false
                },
                {
                    word: '已付款',
                    isActive: false
                },
                {
                    word: '已完成',
                    isActive: false
                },
            ],
            detail: null,
            host: qiniuHost,
            dialogVisible: false,
            way: 1,
            pay_data: {
                order_id: "",
                pay_way: 1,
                total_price: ""
            },
            wechat_qrcode: "",
            alipay_data: "",
            couponPrice:0,  //订单使用的优惠券价格
        }
    },
    mounted() {
        this.getOrderDetail(this.$route.query.orderId)
    },
    methods: {
        getOrderDetail(id) {
            this.getRequest(frontOrder.getOrderDetail, {
                id
            }).then(res => {
                console.log(res, '获取订单详情')
                this.detail = {
                    ...res
                }
                console.log(this.detail, 'iopipoipiopop')
                // this.textArr[2].isActive=true
                this.textArr.forEach(item => {
                    item.isActive = false
                })
                if (this.detail.pay_status == 1) {
                    this.textArr[0].isActive = true
                } else if (this.detail.pay_status == 2) {
                    this.textArr[1].isActive = true
                } else if (this.detail.pay_status == 5 || this.detail.pay_status == 7 || this.detail.pay_status == 8) {
                    this.textArr[2].isActive = true
                }
                //获取订单使用过的优惠券
                this.couponOrder(id);

            }).catch(err => {})
        },
        //订单使用过的优惠券
        couponOrder(orderId){
        	this.getRequest(coupon.couponOrder, {order_id:orderId}).then(res => {
        		console.log('couponOrder----',res);
        		res.forEach((item,index)=>{
        			this.couponPrice+=parseInt(item.money);
        		})
        		
        	})
        },
        // 关闭支付弹框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        toPay(orderId, price) {
            this.dialogVisible = true
            let data = {
                id: orderId,
                price: price
            };
            this.pay_data.total_price = price
            this.pay_data.order_id = orderId
            this.pay(data);
        },
        async pay(data) {
            try {
                // 在已有订单id时，判断用户是否重复点击支付方式
                if (this.wechat_qrcode === "" || this.alipay_data === "") {
                    let pay_succ_data = await this.postRequest(
                        frontOrder.pay,
                        this.pay_data
                    );
                    console.log(pay_succ_data, '999999999999999999')
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
            QRcode.toCanvas(canvas, url, {
                errorCorrectionLevel: "H"
            }, error => {
                if (error) {
                    console.log(error);
                    this.$message({
                        type: "error",
                        message: "微信支付码生成失败"
                    });
                }
            });
        },
        cancelOrder(orderId) {
            console.log(orderId, '要取消的订单')
            this.postRequest(frontOrder.delUserOrder, {
                id: orderId
            }).then(res => {
                console.log(res, '取消订单11111111111111')
                this.getOrder(1, 6)
            })
        },
        toEvaluate(orderId) {
            storage.set('orderDetail', this.detail)
            this.$router.push('/personal/order/evaluate')
        }
    },
    filters: {
        // 时间戳转换为一般格式时间
        timeFormat(timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        // 后台返回订单状态码转状态
        statusFormat(status) {
            switch (status) {
                case '0':
                    return '已取消';
                    break;
                case '1':
                    return '待付款';
                    break;
                case '2':
                    return '已付款';
                    break;
                case '3':
                    return '商家已确认';
                    break;
                case '4':
                    return '退款中';
                    break;
                case '5':
                    return '退款完毕';
                    break;
                case '6':
                    return '进行中';
                    break;
                case '7':
                    return '等待评论';
                    break;
                case '8':
                    return '评论结束';
                    break;
            }
        },
        // 是否送货上门
        sendType(val) {
            if (val == 0) {
                return '到店自取'
            } else {
                return '寄送'
            }
        },
        picDeal(val) {
            if (val.indexOf(',') == -1) {
                return val
            } else {
                return val.split(',')[0]
            }
        }
    },
    watch: {
        way(num) {
            this.pay_data.pay_way = num;
            this.pay();
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-wrap {
    .detail-head {
        padding-left: 20px;
        box-sizing: border-box;
        height: 60px;
        line-height: 60px;
        background: #fff;
        margin-bottom: 30px;

        span:not(:last-child) {
            cursor: pointer;

            &:hover {
                color: #7C6AFF;
            }
        }
    }

    .detail-content {
        background: #fff;

        .content-head {
            display: flex;
            height: 45px;
            align-items: center;
            justify-content: space-around;
            border-bottom: 1px solid #D9D9D9;
            margin-bottom: 20px;

            .head-item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 100%;

                .circle {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #999;
                    color: #fff;
                    text-align: center;
                    margin-right: 12px;
                }
            }

            .active {
                border-bottom: 2px solid #7C6AFF;
                color: #7C6AFF;

                .circle {
                    background: #7C6AFF;
                    color: #fff;
                }
            }
        }

        .content-status {
            height: 150px;
            background: #FAFAFA;
            padding: 30px 0 0 42px;
            box-sizing: border-box;
            border: 1px solid #D9D9D9;

            .cur-status {
                font-size: 30px;
                color: #333;
                margin-bottom: 20px;
            }

            .time-intro {
                font-size: 16px;
                color: #666;
                display: flex;
                align-items: center;

                .time {
                    margin-right: 30px;
                    line-height: 30px;
                }

                .intro {
                    line-height: 30px;
                }
                .pay-btn{
                    margin: 0 10px;
                    padding: 8px 15px;
                    background: #F93737;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }

        .order-title {
            height: 81px;
            padding: 45px 19px 0 20px;
            box-sizing: border-box;
            font-size: 16px;
            color: #333;
        }

        .buyer-info {
            height: 278px;
            background: #FAFAFA;
            padding: 27px 0 25px 41px;
            box-sizing: border-box;
            border: 1px solid #D9D9D9;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 42px;

            .address {
                span:nth-child(2) {
                    margin-right: 50px;
                }
            }

            .shop-name {
                .name {
                    margin-right: 80px;
                }
            }
        }

        .goods-table {
            border: 1px solid #D9D9D9;
            margin-bottom: 50px;
            .info-head {
                height: 42px;
                background: #FAFAFA;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #D9D9D9;

                .goods-price {
                    flex: 5;
                    display: flex;

                    span {
                        flex: 1;
                    }

                    span:first-child {
                        flex: 3;
                        text-align: left;
                        text-indent: 107px;
                        box-sizing: border-box;
                    }
                }

                span {
                    flex: 1;
                    text-align: center;
                }
            }

            .info-center {
                display: flex;

                .goods-price-wrap {
                    flex: 5;
                    display: flex;
                    flex-direction: column;

                    .goods-price {
                        display: flex;
                        border-bottom: 1px solid rgb(217, 217, 217);

                        .goods-info {
                            padding: 20px 0;
                            box-sizing: border-box;
                            height: 129px;
                            flex: 3;
                            display: flex;
                            // border-bottom: 1px solid rgb(217,217,217);
                            border-right: 1px solid rgb(217, 217, 217);

                            img {
                                margin-left: 40px;
                                width: 88px;
                                height: 88px;
                                margin-right: 19px;
                            }

                            .info-detail {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                font-size: 12px;
                                color: #666;

                                .name {
                                    font-size: 16px;
                                    color: #333;
                                }
                            }
                        }

                        .price {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex: 1;
                            height: 129px;
                            border-right: 1px solid rgb(217, 217, 217);
                        }

                        .num {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex: 1;
                            height: 129px;
                            border-right: 1px solid rgb(217, 217, 217);
                        }

                        .price:last-child {
                            border-bottom: none;
                        }
                    }

                    .goods-price:last-child {
                        border-bottom: none;
                    }
                }

                .status {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid rgb(217, 217, 217);
                }

                .total-price {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid rgb(217, 217, 217);
                }

                .operation {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p:first-child {
                        margin-bottom: 30px;
                    }

                    p {
                        cursor: pointer;

                        &:hover {
                            color: #7C6AFF;
                        }
                    }
                    .pay-btn{
                        margin: 0 10px;
                        padding: 8px 15px;
                        background: #F93737;
                        color: #fff;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .bottom-info{
        margin-left: auto;
        width: 160px;
        padding-bottom: 30px;
        box-sizing: border-box;
        font-size: 18px;
        .row:not(:last-child){
            margin-bottom: 30px;
        }
        .row{
            display: flex;
            justify-content: space-between;
        }
        .row:last-child{
            span:last-child{
                color: #ED0421;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}
</style>
