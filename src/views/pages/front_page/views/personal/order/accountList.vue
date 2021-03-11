<template>
	<div class="detail-wrap">
	    <div class="detail-head">
	    	<div>
		        <span @click="$router.push('/personal/index')">个人中心</span>
		        <i class="el-icon-arrow-right"></i>
		        <span @click="$router.push('/personal/order/myOrder')">我的订单</span>
		        <i class="el-icon-arrow-right"></i>
		        <span>核验单</span>
	        </div>
	        <p class="cursor word-hover" @click='print'>
				<span>打印</span>
				<ali-svg-icon icon-class="dayin" class-name="dayin"></ali-svg-icon> 
			</p>
	    </div>
	    
	    <div class="orderContent" ref="print">
	    	<div class="part">
	    		<div class="title orderTitle">
	    			<span>订单详情</span>
	    			
	    		</div>
	    		<div class="info" v-if="orderInfo">
	    			<p class="infoTitle">订单信息</p>
	    			<ul class="infoList">
	    				<li>
	    					<span>买家信息：</span>
	    					<p>{{orderInfo.user.nick}}（{{orderInfo.user.mobile | toTel}}）</p>
	    				</li>
	    				<li>
	    					<span>订单总额：</span>
	    					<p>￥{{orderInfo.price}}</p>
	    				</li>
	    				<li>
	    					<span>租借时间：</span>
	    					<p>{{orderInfo.start_time}} ~ {{orderInfo.end_time}}</p>
	    				</li>
	    				<li>
	    					<span>下单时间：</span>
	    					<p>{{orderInfo.create_time | time2Date}}</p>
	    				</li>
	    				<li>
	    					<span>订单编号：</span>
	    					<p>{{orderInfo.show_id}}</p>
	    				</li>
	    				<li>
	    					<span>订单类型：</span>
	    					<p>{{orderType}}</p>
	    				</li>
	    			</ul>
	    			<p class="infoTitle">产品信息</p>
	    			<div class="orderList">
	    				
	    				<div class="goods-table" v-if="orderInfo">
				            <div class="info-head">
				                <div class="goods-price">
				                    <span>商品信息</span>
				                    <span>部分价格</span>
				                    <span>数量（使用时间）</span>
				                </div>
				                <span>状态</span>
				                <span>总额</span>
				            </div>
				            <div class="info-center">
				                <div class="goods-price-wrap">
				                    <div class="goods-price" v-if="orderInfo.has_studio!=0">
				                        <div class="goods-info">
				                            <img :src="$qiniuHost+orderInfo.studio_order.studio_detail.pic|picDeal" alt="">
				                            <div class="info-detail">
				                                <p class="name">{{orderInfo.studio_order.studio_detail.name||null}}</p>
				                                <p>
				                                    <span>地址：</span>
				                                    <span>{{orderInfo.to_user.address}}</span>
				                                </p>
				                                <p>
				                                    <span>时间：</span>
				                                    <span>{{orderInfo.start_time}}</span>
				                                    <span>至</span>
				                                    <span>{{orderInfo.end_time}}</span>
				                                </p>
				                            </div>
				                        </div>
				                        <div class="price">￥{{orderInfo.studio_order.price||null}}</div>
				                        <div class="num">1</div>
				                    </div>
				                    <div class="equip-wrap" v-if="orderInfo.has_equipment!=0">
				                        <div class="goods-price" v-for="(item,index) in orderInfo.equip_order||orderInfo.studio_order.equip_order_array" :key="index">
				                            <div class="goods-info">
				                                <img :src="$qiniuHost+(item.equip.pic||item.equip.static.pic)|picDeal" alt="">
				                                <div class="info-detail">
				                                    <p class="name">{{item.equip.static.name}}</p>
				                                    <p>
				                                        <span>时间：</span>
				                                        <span>{{orderInfo.start_time}}</span>
				                                        <span>至</span>
				                                        <span>{{orderInfo.end_time}}</span>
				                                    </p>
				                                </div>
				                            </div>
				                            <div class="price">￥{{item.price||null}}</div>
				                            <div class="num">{{item.order_count}}</div>
				                        </div>
				                    </div>
				                </div>
				                <div class="status">{{orderInfo.pay_status|statusFormat}}</div>
				                <div class="total-price">￥{{orderInfo.price}}</div>
				            </div>
				        </div>
	    				
	    			</div>
	    		</div>
	    	</div>
	    	
	    	<div  class="part no-print">
	    		<p class="title">租赁协议</p>
	    		<div class="info agreeInfo">
	    			<div class="content" v-html="content"></div>
	    		</div>
	    	</div>
	    	
	    	<div  class="part">
	    		<p class="title">产品核验单</p>
	    		<div class="info productInfo">
	    			<div class="productImg" v-for="(item,index) in dataList" :key="index">
		    			<p class="infoTitle">{{item.name}}</p>
		    			<ul class="productList">
		    				<li v-for="(subItem,index2) in item.imgInfo" :key="index2">
		    					<span>{{index2+1}}</span>
		    					<img :src="subItem.pic2" width="150" height="150"/>
		    					<p>{{subItem.content}}</p>
		    				</li>
		    			</ul>
	    			</div>
	    		</div>
	    	</div>
	    	
	    	<div class="part operate no-print">
	    		<p class="title">是否同意</p>
	    		<el-radio-group v-model="status" @change="changeReason" :disabled="checkInfo && checkInfo.status!=0">
				    <el-radio label="1">我已阅读核验单，同意核验单上所描述内容</el-radio>
				    <el-radio label="2">实物与描述不符合</el-radio>
				  </el-radio-group>
	    	</div>
	    	
	    	<div class="reason no-print" v-show="showReason">
	    		<p>理由：</p>
	    		<el-input type="textarea" :disabled="checkInfo && checkInfo.status==2" v-model="reject_msg"></el-input>
	    	</div>
	    	
	    	<div class="footBtn no-print">
	    		<el-button class="dangerEmptyBtn" @click="userOptCheck" v-if="checkInfo && checkInfo.status==0">确认</el-button>
	    		<el-button class="dangerEmptyBtn" v-show="showReason">联系商家</el-button>
	    		<el-button v-if="checkInfo && checkInfo.status==0" @click="back">取消</el-button>
	    	</div>
	    	
	    </div>
	    
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data(){
      return{
      	status:'1',
      	showReason:false,
      	reject_msg:'',  //拒绝理由
      	orderId:'',   //订单id
      	checkInfo:null, //核验单信息
      	dataList:[],  //图片信息
      	orderInfo:null,
		content:'',
		orderType:'',  //订单类型 '影棚订单','设备订单','影棚(设备)订单'
      }
    },
    components:{},

    created() { 
    	if(this.$route.query.id) {
			this.orderId = this.$route.query.id;
			this.userGetCheck(this.orderId);
			this.getOrderDetail(this.orderId);
		}
    },
	filters: {
        picDeal(val) {
            if (val.indexOf(',') == -1) {
                return val
            } else {
                return val.split(',')[0]
            }
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
                    return '拒单，退款中';
                    break;
                case '5':
                    return '拒单，退款完毕';
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
    },
    computed: {
      ...mapGetters(["user_data"])
    },
    
    mounted() {
		
    },
    

    methods: {
    	//打印核验单方法
    	print(){
    		this.$print(this.$refs.print);
    	},
    	//用户查询核验单
		userGetCheck(orderId){
			this.util.userGetCheck(orderId).then(res=>{
				console.log("userGetCheck---------",res);
				//判断是否已经添加过核验单图片信息
				if(res){
					this.checkInfo=res;
					this.content=res.content;
					this.checkInfo.id=res.id;
//					this.status=res.status;
					if(res.status!=2){
						this.status='1';
					}
					if(res.status==2){
						this.reject_msg=res.reject_msg;
					}
					this.changeReason(res.status);
					res.detail_array.forEach((item,index)=>{
						item.pic2=this.$qiniuHost+item.pic;
					})
					let list=this.util.changeArr(res.detail_array);
					this.dataList=list;
					console.log('userGetCheck+++++++++++++',list);
				}
			})
		},
    	//获取订单详情
    	getOrderDetail(orderId){
    		this.util.getOrderDetail(orderId).then(res=>{
    			console.log('getOrderDetail------',res);
    			this.orderInfo={
    				...res
    			};
    			let flag='';
    			if(res.has_studio==1 && res.has_equipment==1){
    				flag="影棚(设备)订单";
    			}else if(res.has_studio==1){
    				flag="影棚订单";
    			}else if(res.has_equipment==1){
    				flag="设备订单";
    			}
    			this.orderType=flag;
    		})
    	},
    	//切换原因方法
    	changeReason(val){
    		console.log('reason-----------',val);
    		if(val==1){
    			this.showReason=false;
    		}else if(val==2){
    			this.showReason=true;
    		}
    	},
        //用户更改核验单状态
        userOptCheck(){
        	let params={
        		order_check_id:this.checkInfo.id,
        		opt:this.status
        	}
        	if(this.status=='2'){
        		params.reject_msg=this.reject_msg;
        	}
        	console.log('userOptCheck-----params--------',params);
        	this.util.userOptCheck(params).then(res=>{
        		this.$message.success('操作成功！');
        		//跳到订单页面
        		let url="/personal/order/myOrder";
				this.$router.push({path: url});
	        	console.log('userOptCheck----------',res);
	        })
        },
        //返回上一步方法
        back(){
        	console.log('返回上一步----');
        	this.util.back(this);
        }
    },
    
    
};
</script>

<style lang="scss" scoped>
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
.detail-wrap {
    .detail-head {
        padding-left: 20px;
        padding-right:35px;
        box-sizing: border-box;
        height: 60px;
        line-height: 60px;
        background: #fff;
        margin-bottom: 30px;
		display:flex;
		justify-content:space-between;
		p{
			display:flex;
			align-items:center;
			.dayin{
				width:26px;
				height:26px;
				margin-left:10px;
				color:#333;
			}
		}	
        span:not(:last-child) {
            cursor: pointer;

            &:hover {
                color: #7C6AFF;
            }
        }
    }
}
.orderContent{
	padding:0px 0px 30px 0px;
	margin-bottom:50px;
	background:#fff;
	border:1px solid #D9D9D9;
	.title{
		font-size:18px;
		color:#333;
		font-weight:500;
		height:48px;
		line-height:48px;
		padding-left:35px;
		background:rgba(240,240,240,1);
		border-bottom:1px solid #D9D9D9;
		border-top:1px solid #D9D9D9;
	}
	.orderTitle{
		display:flex;
		justify-content:space-between;
		border-top:none;
	}
	.info{
		padding:35px 30px 35px 60px;
		/*border:1px solid #D9D9D9;*/
		margin-bottom:50px;
		.infoTitle{
			font-size:16px;
			margin-bottom:20px;
			margin-top:30px;
			&:first-child{
				margin-top:0px;
			}
		}
		
		.infoList{
			li{
				display:flex;
				align-items:center;
				font-size:14px;
				color:#666;
				margin-bottom:14px;
			}
		}
		.orderList{
			span{
				/*display:block;*/
				margin-bottom:15px;
				color:#666;
			}
		}
		.productList{
			border-bottom:1px solid #D9D9D9;
			&:last-child{
				border-bottom:none;
			}
			li{
				display:flex;
				align-items:center;
				img{
					margin:0px 25px;
				}
			}
		}
	}
	
	.agreeInfo{
		background:rgba(255,255,255,1);
		border:1px solid rgba(217,217,217,1);
		margin:20px;
	}
	
	.productInfo{
		/*padding:20px 0px 35px 0px;*/
		.infoTitle{
			padding-left:30px;
		}
		.productList{
			padding:0px 100px 0px 30px;
		}
		.productImg{
			margin-bottom:60px;
			&:last-child{
				margin-bottom:0px;
			}
		}
	}
	.operate{
		.el-radio-group{
			display:flex;
			flex-direction:column;
			padding:35px 0px 0px 35px;
			.el-radio{
				margin-bottom:30px;
			}
		}
		
	}
	.reason,.footBtn{
		padding-left:35px;
	}
	.reason{
		margin-top:15px;
		margin-bottom:20px;
		p{
			margin-bottom:20px;
		}
		/deep/{
		 	.el-textarea__inner{
				border-radius:0px;
			}
		}
	}
}

</style>
