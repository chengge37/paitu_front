<template>
	<div>
		<div class="order-content">
			<div class="order-bread">
				<div @click="selectBread(item)" :class="{'bread-active':item.isActive}" class="bread-item" v-for="(item,index) in breadArr" :key="index">
					<span v-text="item.word[0]"></span>
					<span>{{item.word.slice(1)}} {{item.count}}</span>
				</div>
			</div>
			<div class="table-head">
				<span class="head-first-col">订单详情</span>
				<!-- <span class="head-other-col">商品操作</span> -->
				<span class="head-other-col">金额</span>
				<el-select class="head-other-col" v-if="breadArr[0].isActive" @change="getOrder(null,null,value,null)" v-model="value" placeholder="订单状态">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
				<span v-else class="head-other-col">订单状态</span>
				<span class="head-other-col">操作</span>
			</div>
			<div class="orders">
				<ul>
					<div v-if="list.length!=0">
						<li v-for="(item,index) in list" :key="index">
							<div class="order-head">
								<div class="order-time">
									<p class="time">
										<span>下单日期：</span>
										{{item.create_time|timeFormat}}
									</p>
									<p class="orderNum">
										<span>订单号：</span>
										{{item.show_id||'null'}}
									</p>
								</div>
								<div class="Organizers">
									<span class="label">举办方：</span>
									<span>{{item.activity.user.nick||null}}</span>
								</div>
								<i class="el-icon-delete" v-show="item.pay_status==4||item.pay_status==8" @click="deleteOrder(item.id)"></i>
							</div>
							<div class="info">
								<div class="baseInfo" @click="toActivityDetail(item.id)">
									<div class="image">
										<img :src="item.activity.info|getPic" alt="" />
									</div>
									<div class="detail">
										<div class="title">
											{{item.activity.name}}
										</div>
										<div class="content">
											<span>地址：</span>
											<span>{{item.activity.address}}</span>
										</div>
										<div class="foot">
											<span class="label">时间：</span>
											<div class="value">
												<span>{{item.activity.start_time}}</span>
												<span>至</span>
												<span>{{item.activity.end_time}}</span>
											</div>
										</div>
									</div>
								</div>
								<!-- <div class="operate-goods">
									<span>退款</span>
								</div> -->
								<div class="status">
									<p>
										<span>￥</span>
										<span class='price'>{{item.price}}</span>
									</p>
								</div>
								<div class="operate-order">
									<p :class="{'wait-pay':item.pay_status==='1'}">{{item.pay_status|orderStatus}}</p>
									<p @click="toOrderDetail(item.id)">订单详情</p>
								</div>
								<div class="pay">
									<!-- <p @click="$router.push('/personal/order/evaluate')">评价</p>
									<p>提醒卖家发货</p> -->
									<p v-if="item.pay_status==='7'" @click="toEvaluate(item,item.id)">评价</p>
									<el-button v-if="item.pay_status==='1'" @click="toPay(item.id,item.price)">立即支付</el-button>
									<p v-if="item.pay_status==='1'" @click="cancelOrder(item.id)">取消订单</p>
								</div>
							</div>
						</li>
					</div>
					<div v-else class="nodata">暂无数据</div>
				</ul>
			</div>
			<!--分页模块-->
			<!-- <div class="page">
				<el-pagination :total="orderCount" :page-size="5" @current-change="changePage" background layout="prev, pager, next">
				</el-pagination>
			</div> -->
			<Pagination v-if="list.length>5" :total="orderCount" :page="currentPage" :pagesize="5" @getPageNum="changePage"></Pagination>
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
import {frontActivity} from '@config/api.js'
import { activity } from "@/config/api";
import {storage} from '@util/storage.js'
import QRcode from "qrcode"
import Pagination from 'FrontComponents/pagination'


	export default {
		data(){
			return {
			activeIndex: '1',
			search_text: '',
			list: [],
			breadArr:[
				{
					word:'全部订单',
					isActive:true,
					value:null,
					count:""
				},
				{
					word:'待支付',
					isActive:false,
					value:'1',
					count:0
				},
				{
					word:'已支付',
					isActive:false,
					value:'2',
					count:0
				}
			],
			options: [
				{
          label: '全部订单'
        }, 
				{
          value: '1',
          label: '待支付'
        }, 
				{
          value: '2',
          label: '已支付'
        },
				{
          value: '3',
          label: '退款中'
        },
				{
          value: '4',
          label: '已退款'
        },
				{
          value: '5',
          label: '活动进行中'
				},
				{
          value: '7',
          label: '待评论'
				},
				{
          value: '8',
          label: '已评论'
				},
				// {
        //   value: '0',
        //   label: '已取消'
        // },
			],
			value: '',
			orderCount:0,
			dialogVisible: false,
			way: 1,
			pay_data: {
        id: "",
        pay_way: 1,
        price: ""
      },
      wechat_qrcode: "",
			alipay_data: "",
			currentPage:1
			// checkAll:false
		}
		},

		components: {
			Pagination
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
			getPic(val){
				let sub1=val.slice(val.indexOf('src'))
				let sub2=sub1.slice(sub1.indexOf('\"')+1)
				let sub3=sub2.slice(0,sub2.indexOf('\"'))
				return sub3
			},
			orderStatus(val){
				switch(val){
					// case '0':
					// 	return '已取消';
					// 	break;
					case '1':
						return '待支付';
						break;
					case '2':
						return '已支付';
						break;
					case '3':
						return '退款中';
						break;
					case '4':
						return '已退款';
						break;
					case '5':
						return '活动进行中';
						break;
					case '7':
						return '待评论';
						break;
					case '8':
						return '已评论';
						break;
				}
			}
		},

		mounted() {
			this.getOrder(1,5);
		},
		props:['searchList'],
		created() {
			this.getCount();
		},
		methods: {
			//获取数量
			getCount(){
				this.breadArr[0]['count']="";
				this.getRequest(frontActivity.getActivityOrder,{pay_status:1}).then(res=>{
					this.breadArr[1]['count']=res.total_count;
				})
				this.getRequest(frontActivity.getActivityOrder,{pay_status:2}).then(res=>{
					this.breadArr[2]['count']=res.total_count;
				})
			},
			// 获取全部订单
			getOrder(page,page_size,pay_status,search){
				this.getRequest(frontActivity.getActivityOrder,{
					page,
					page_size,
					pay_status,
					search
				}).then(res=>{
					console.log(res,'所有活动订单')
					this.list=res.rows
					this.orderCount=res.total_count
					console.log(this.list,'55555555555555555')
				}).catch(err=>{})
			},
			// 跳转到相应活动的活动详情
			toActivityDetail(id){
				this.$router.push({path:'/activity/active_details',query:{id,showTab:true}})
			},
			changePage(val){
				this.getOrder(val,5)
				console.log('当前页数',val)
			},
			search() {

			},
			handleSelect() {

			},
			selectBread(bread){
				console.log('5555555555555555')
				this.breadArr.forEach(item=>{
					item.isActive=false
				})
				bread.isActive=true
				this.getOrder(null,null,bread.value,null)
			},
			// 跳转到活动订单详情
			toOrderDetail(orderId){
				this.$router.push({path:'/personal/myActivity/orderDetail',query:{orderId}})
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
				this.postRequest(activity.cancelActivity,{id:orderId}).then(res=>{
					console.log(res,'取消订单11111111111111')
					this.getOrder(1,5)
				})
			},
			toEvaluate(item,orderId){
        storage.set('activityOrder',item)
				this.$router.push('/personal/myActivity/activityEvaluate')
			},
			deleteOrder(id){
				this.postRequest(activity.del_activity,{id}).then(res=>{
					console.log(res,'删除订单')
					this.getOrder(1,5)
				}).catch(err=>{})
			}
		},
		watch:{
			searchList(val){
				console.log(val,';;;;;;;;;;;;;;;')
				this.list=val
			},
			way(num) {
				this.pay_data.pay_way = num;
				this.pay();
			}
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "../common/index.scss";
	// .head{
	// 	height: 60px;
	// 	background: #fff;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	padding: 0 20px;
	// 	box-sizing: border-box;
	// 	margin-bottom: 30px;
	// 	span{
	// 		font-size: 16px;
	// 	}
	// 	.search-wrap{
	// 		width: 320px;
	// 		box-sizing: content-box;
	// 		display: flex;
	// 		border: 1px solid rgb(217,217,217);
	// 		.el-input{
	// 			flex: 1;
	// 			/deep/ .el-input__inner{
	// 				border: none;
	// 				border-radius: 0;
	// 			}
	// 		}
	// 		.search-icon{
	// 			display: flex;
	// 			width: 74px;
	// 			border-left:1px solid rgb(217,217,217);
	// 			background: rgb(250,250,250);
	// 			cursor: pointer;
	// 			img{
	// 				margin: auto;
	// 			}
	// 		}
	// 	}
	// }
	.order-content {
		background: #fff;
		padding: 0 20px 26px;
		box-sizing: border-box;
		.order-bread{
			height: 60px;
			// background: pink;
			display: flex;
			.bread-item{
				padding: 16px 0;
				box-sizing: border-box;
				display: flex;
				margin-right: 37px;
				cursor: pointer;
				&:hover{
					color: $Theme-color;
				span:first-child{
					border-bottom: 2px solid $Theme-color;
				}
				}
			}
			.bread-active{
				color: $Theme-color;
				span:first-child{
					border-bottom: 2px solid $Theme-color;
				}
			}
		}
		.table-head {
			height: 40px;
			background:rgb(250,250,250);
			border:1px solid rgb(217,217,217);
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 19px;
			.head-first-col{
				padding-left: 40px;
				box-sizing: border-box;
				// width: 380px;
				flex: 2.5;
				// background: pink;
			}
			.head-other-col{
				text-align: center;
				flex: 1;
				/deep/{
					.el-select{
						display: flex;
					}
					.el-input{
						// flex: 1;
						padding:0 25px;
						box-sizing: border-box;
						width: 100%;
						display: flex;
						.el-input__inner{
							align-self: center;
							padding: 0;
							border: none;
							background: rgb(250,250,250);
							text-align: center;
							text-align: right;
						}
						.el-input__inner::-webkit-input-placeholder { 
							color:#333; 
						}
						.el-input__suffix{
							position: initial;
							.el-icon-arrow-up{
								color: #333;
							}
						}
						
					}
				}
			}		
		}
		// .all-check{
		// 	height: 50px;
		// 	line-height: 50px;
		// 	padding-left: 20px;
		// 	box-sizing: border-box;
		// 	span{
		// 		padding: 8px 15px;
		// 		box-sizing: border-box;
		// 		border:1px solid rgb(217,217,217);
		// 	}
		// }
		.orders {
			ul {
				li {
					border:1px solid #EEEEEE;
					margin-bottom:20px;
					.order-head {
						display: flex;
						align-items: center;
						justify-content: space-between;
						background:rgb(250,250,250);
						height: 42px;
						padding:0 27px 0 20px;
						box-sizing: border-box;
						border-bottom: 1px solid #D9D9D9;
						.order-time{
							display: flex;
							margin-right: 90px;
							.el-checkbox{
								margin-right: 0;
							}
							.time{
								margin-left: 10px;
								margin-right: 19px;
							}
						}
						.el-icon-delete{
							cursor: pointer;
							font-size: 18px;
							&:hover{
								color: $Theme-color;
							}
						}
					}
					.info {
						display: flex;
						height: 160px;
						&>div{
							display:flex;
							border-right:1px solid #eee;
						}
						.baseInfo {
							// width: 380px;
							flex: 2.5;
							padding:36px;
							padding-left: 20px;
							box-sizing: border-box;
							cursor: pointer;
							// background: pink;
							.image {
								width: 88px;
								height: 100%;
								margin-right: 20px;
								img {
									width: 88px;
									height: 88px;
									border-radius:5px;
								}
							}
							.detail {
								line-height: 20px;
								font-size: 14px;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.title {
									font-size: 16px;
								}
								.content {
									color:#666;
									font-size: 12px;
									display: flex;
									span:first-child{
										// flex: 1;
										width: 39px;
									}
									span:last-child{
										flex:5;
									}
								}
								.foot {
									display: flex;
									// justify-content: space-between;
									color: #666;
									font-size: 12px;
									.label{
										width: 39px;
									}
									.value{
										flex: 5;
									}
									span {
										&.red {
											color: #F93333;
										}
									}
								}
							}
						}
						.operate-goods{
							flex: 1;
							display: flex;
							span{
								margin: auto; 
							}
						}
						.status{
							flex: 1;
							flex-direction: column;
							font-size:16px;
							.price{
								font-size:18px;
								font-weight:bold;
							}
							&>span{
								font-size:14px;
								color:#666;
								margin-top:5px;
							}
						}
						.operate-order{
							flex: 1;
							p{
								margin-bottom:20px;
							}
							p:last-child{
								cursor: pointer;
								&:hover{
									color: $Theme-color;
								}
							}
							.wait-pay{
								color: #FF5500;
							}
						}
						.pay{
							flex:1;
							button{
								width:90px;
								height:40px;
								background:#F93737;
								border-radius:0;
								color:#fff;
								margin-bottom:15px;
							}
							p{
								cursor: pointer;
							}
							p:hover{
								color: $Theme-color;
							}
						}
						.status,.operate-order,.pay{
							justify-content:center;
							flex-direction:column;
							align-items:center;
						}
					}
				}
			}
		}
		.page{
			display: flex;
			justify-content: flex-end;
		}
	}
</style>