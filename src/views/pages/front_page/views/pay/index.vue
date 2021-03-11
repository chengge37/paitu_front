<template>
	<div class="wrap">
			<div class="text">
				支付方式：
				<button class="buttonpay" v-for="(item, index) in pays" :key="index" :class="{ 'focuspay':index+1==params.pay_way}" @click="changePay(index)">
	                <ali-svg-icon :icon-class="item.icon" class-name="iconpay"></ali-svg-icon>
	                <span class="paytext">{{item.text}}</span>
	            </button>
			</div>
			<div class="text">
				支付金额：￥
				<span class="money red">{{params.price}}</span>
			</div>
			<div class="code">
				<canvas class="codepay" id="canvas"></canvas>
				<p class="codetext">{{codetext}}</p>
				<div id="aliForm"></div>
			</div>
			
			<!--测试支付-->
			<!--<el-button @click='testPay'>模拟支付</el-button>-->
	</div>
</template>

<script>
	import QRCode from "qrcode";
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				params:{
					show_id:'',
					price:'0',
					pay_way:'1',   //1.微信  2.支付宝
					orderId:''
				},

				codetext: '',
				pays: [{
		                text: "微信",
		                icon: "weixinPay"
		            },
		            {
		                text: "支付宝",
		                icon: "aliApy_round"
		            }
		        ],
			}
		},
		watch: {
			
	    },
	    destroyed() {
			//清除定支付轮询定时器
		  this.clearPayInterval();
		},
		created(){
			let obj=this.$route.query;
			if (JSON.stringify(obj)!='{}') {
				this.params.orderId=obj.order_id;
				this.getProductInfoById();
			}
		},
	    mounted(){
	    	
	    },
		methods: {
			//测试支付功能，后面需要删除
			testPay(){
				this.util.testOrder(this.params.orderId);
			},
			//根据id获取产品订单信息
			getProductInfoById(){
				this.util.getProductInfo(this.params.orderId).then(res=>{
					console.warn('getProductInfo--------',res);
					this.params.show_id=res.show_id;
					this.params.price=res.price;
					this.payOrder();
				})
			},
			//切换支付方式方法
			changePay(index){
				if(this.params.pay_way==parseInt(index+1)) return;
				this.params.pay_way=parseInt(index+1);
				this.payOrder();
			},
			//支付生成二维码方法
			payOrder() {
				console.log('payOrder---------',this.params);
				if(this.params.pay_way ==1) {
					this.codetext = "正在生成微信二维码";
				} else if(this.params.pay_way == 2) {
					this.codetext = "正在创建支付宝订单";
				}
				console.log('payOrder----------',this.params);
				this.util.ajaxUserPay(this.params).then(res=>{
					console.log('ajaxUserPay------',res);
//						this.params.orderId=res.order.id;
						if(this.params.pay_way == 1) {
							//微信
							this.codetext =
								"请用微信扫描支付,支付完成后请点击余额后面的刷新按钮查看余额,网络可能有少许延时,如支付成功后1小时余额仍未增加,请联系我们";
							let canvas = document.getElementById("canvas");
							QRCode.toCanvas(
								canvas,
								res.pay, {
									errorCorrectionLevel: "H"
								},
								error => {
									if(error) {
										this.$message.info("微信支付码生成失败");
									}
								}
							);
						} else {
							this.codetext = "创建支付宝订单成功,跳转支付宝支付";
							//支付宝
							let aliForm = document.getElementById("aliForm");
							aliForm.innerHTML = res.pay;
							document.forms["alipay_submit"].submit();
						}
						this.getPayStatus();
				})

			},
			//清楚定时器方法
			clearPayInterval(){
				clearInterval(this.payInterval);
			},
			//支付轮询获取支付状态是否成功方法
			getPayStatus(){
				console.log('getPayStatus---------',)
				this.payInterval=setInterval(()=>{
					this.util.getProductStatus(this.params.orderId).then(res=>{
						//支付成功
						if(res.is_pay==1){
							this.$message.success('支付成功！');
							let path="/paySuccess";
							this.$router.push({ path:path});
						}
					})
				},1000);
			},
			
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


.wrap {
		text-align: center;
		padding-top: 200px;
		box-sizing: border-box;
    .text {
        margin-top: 26px;
        // margin-left: 44px;
        font-size: 15px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        .money {
            font-size: 18px;
            font-weight: 600;
        }

        .red {
            color: #e92020;
        }

        .tip {
            color: #e92020;
            margin-top: 20px;
            margin-left: 80px;
            display:none;
        }
    }
}

.code {
		margin: 0 auto;
    margin-top: 10px;
    // margin-left: 44px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    width: 174px;
    // margin-left: 120px;

    .codepay {
        width: 174px;
    }

    .codetext {
        text-align: center;
        font-size: 10px;
    }
}

button,
input[type="text"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: none;
    height: 32px;
    outline: none;
    background: #fff;
    color: rgba(51, 51, 51, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 2px;
    cursor: pointer;
    margin-right: 9px;
}

.button {
    width: 60px;
}

.buttonpay {
    width: 90px;
}

input[type="text"] {
    width: 97px;
    padding: 0 8px;
}


.focuspay {
    border: 1px solid rgba(58, 127, 159, 1);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
}

.iconpay {
    margin-right: 5px;
    width: 22px;
    height: 22px;
    vertical-align: middle;
}

.paytext {
    vertical-align: middle;
}

</style>