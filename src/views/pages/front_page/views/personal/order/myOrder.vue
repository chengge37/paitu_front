<template>
	<div class="container">
		<div class="head">
			<span>我的订单</span>
			<div class="search-wrap">
				<el-input placeholder="输入订单名称或订单号进行搜索" v-model="searchText" @keyup.enter.native="searchGetOrder(searchText)"></el-input>
				<div class="search-icon default-hover" @click="searchGetOrder(searchText)">
					<ali-svg-icon icon-class="search-border-copy" class-name="search-border-copy"></ali-svg-icon>
				</div>
			</div>
		</div>
		<div class="order-content">
			<div class="order-bread">
				<div @click="selectBread(index)" :class="{'bread-active':item.isActive}" class="bread-item" v-for="(item,index) in breadArr" :key="index">
					<span v-text="item.word[0]"></span>
					<span v-text="item.word.slice(1)"></span>
				</div>
			</div>

			<div class="table-head">
				<span class="head-first-col">订单详情</span>
				<span class="head-other-col">商品操作</span>
				<span class="head-other-col">金额</span>
				<el-select class="head-other-col" @change="selectStatus(checkedValue)" v-model="checkedValue" placeholder="订单状态">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<span class="head-other-col">操作</span>
			</div>

			<div class="orders">
				<ul>
					<div v-if="list.length!=0">
						<li v-for="(item,index) in list" :key="index">
							<div class="order-head">
								<div class="order-time">
									<p class="time">
										<span>下单日期：</span> {{item.create_time|timeFormat}}
									</p>
									<p class="orderNum">
										<span>订单号：</span> {{item.show_id}}
									</p>
								</div>
								<div class="order-address" @click="$router.push({path:'/shop/index',query:{uid:item.user.id}})">
									<ali-svg-icon icon-class="store_gray" class-name="store-icon"></ali-svg-icon>
									<span class="word-hover">{{item.user.nick}}</span>
								</div>
								<div class="order-contact" @click="toChat(item.user)">
									<ali-svg-icon icon-class="customer_service" class-name="customer_service"></ali-svg-icon>
									<span class="word-hover">联系商家</span>
								</div>
								<i class="el-icon-delete" @click="delOrder(item.id)" v-if="item.pay_status==0||item.pay_status==5||item.pay_status==8"></i>
							</div>
							<div class="info">
								<div class="item-info">
									<div class="studioInfo" v-if="item.has_studio!=0">
										<div class="image" @click="toStudioDetail(item.studio_order.studio_id)">
											<!--<el-image style="width:88px;height:88px;" fit="contain" :src="$qiniuHost+item.studio_order.studio_detail.pic.split(',')[0]"-->
											<el-image style="width:88px;height:88px;" fit="contain" :src="util.picExplode(item.studio_order.studio_detail.pic)" :onerror="util.errorPic" class="cursor" />
										</div>
										<div class="detail">
											<div class="title" @click="toStudioDetail(item.studio_order.studio_id)">{{item.studio_order.studio_detail.name}}</div>
											<div class="content">
												<span>地址：</span>
												<span>{{item.studio_order.studio_detail.address}}</span>
											</div>
											<div class="foot">
												<div>
													<span>时间：</span>
													<span>{{item.start_time}}</span>
													<span>-</span>
													<span>{{item.end_time}}</span>
												</div>
											</div>
										</div>
									</div>

									<div class="equip-wrap" v-if="item.has_equipment!=0">
										<div class="equipInfo" v-for="(each,j) in item.equip_order||item.studio_order.equip_order_array" :key="j">
											<div class="image" @click="toEquipDetail(each.equip_id)">
												<!--<el-image style="width:88px;height:88px;" fit="contain" :src="$qiniuHost+(each.equip.pic||each.equip.static.pic)|getPic"-->
												<el-image style="width:88px;height:88px;" fit="contain" :src="util.picExplode(each.equip.pic||each.equip.static.pic)" :onerror="util.errorPic" class="cursor" />
											</div>
											<div class="detail">
												<div class="title" @click="toEquipDetail(each.equip_id)">{{each.equip.custom_desc||each.equip.static.name}}</div>
												<div class="foot">
													<div>
														<span>时间：</span>
														<span>{{item.start_time}}</span>
														<span>-</span>
														<span>{{item.end_time}}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="operate-goods">
									<div class="operate-goods">
										<span>活动，短信充值，产品订单不支持退款</span>
									</div>
								</div>
								<div class="status">
									<p>
										<span>￥</span>
										<span class="price">{{item.price}}</span>
									</p>
								</div>
								<div class="operate-order">
									<p>{{item.pay_status|statusFormat}}</p>
									<p class="cursor word-hover" @click="toOrderDetail(item.id)">订单详情</p>
									<p v-if="item.check" class="cursor word-hover" @click="toCheckList(item.id)">{{item.check.status==0?'确认核验单':'查看核验单'}}</p>
									<p @click="toRefund(item.id,item.reject_reason)" v-if="item.pay_status==2 || item.pay_status==3">退款</p>
									<p class="cursor word-hover" @click="toRefund(item.id,item.reject_reason)" v-if="item.pay_status==4">退款状态</p>
									<!-- <p>查看物流</p> -->
								</div>
								<div class="pay">
									<p @click="toEvaluate(item.id)" v-if="item.pay_status==7">评价</p>
									<el-button v-if="item.pay_status==1" @click="toPay(item.id,item.price)">立即支付</el-button>
									<span v-if="item.pay_status==0">已取消</span>
									<!-- <p v-if="item.pay_status==0||item.pay_status==4||item.pay_status==5||item.pay_status==6">再来一单</p> -->
									<!-- <p v-if="item.pay_status==8">已评价</p> -->
									<p v-if="item.pay_status==1" @click="cancelOrder(item.id)">取消订单</p>
								</div>
							</div>
						</li>
					</div>
					<div class="nodata" v-else>暂无数据</div>
				</ul>
			</div>
			<Pagination v-if="orderCount>6" :total="orderCount" :page="currentPage" :pagesize="6" @getPageNum="changePage"></Pagination>
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
					<div>
						合计应付：￥
						<span style="fontSize:28px;color:red">{{pay_data.total_price}}</span>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { frontOrder } from "@config/api.js";
	import { storage } from "@util/storage.js";
	import QRcode from "qrcode";
	import Pagination from "FrontComponents/pagination";
	import { mapGetters } from "vuex";

	export default {
		data: () => ({
			activeIndex: "1",
			search_text: "",
			list: [],
			breadArr: [{
					word: "全部订单",
					isActive: true
				},
				{
					word: "未支付",
					isActive: false,
					status: "1"
				},
				{
					word: "已支付",
					isActive: false,
					status: "2"
				},
				{
					word: "待评论",
					isActive: false,
					status: "7"
				}
			],
			options: [{
					label: "全部订单"
				},
				{
					value: "1",
					label: "未支付"
				},
				{
					value: "2",
					label: "已支付"
				},
				// {
				//   value: '3',
				//   label: '已确认'
				// },
				{
					value: "4",
					label: "退款中"
				},
				{
					value: "5",
					label: "退款完毕"
				},
				{
					value: "6",
					label: "订单进行中"
				},
				{
					value: "7",
					label: "待评论"
				},
				{
					value: "8",
					label: "已评论"
				},
				{
					value: "0",
					label: "已取消"
				}
			],
			orderId: 0,
			payInterval: null,
			checkedValue: "",
			checkAll: false,
			orderCount: 0,
			currentPage: 1,
			searchText: "",
			dialogVisible: false,
			way: 1,
			pay_data: {
				order_id: "",
				pay_way: 1,
				total_price: ""
			},
			wechat_qrcode: "",
			alipay_data: ""
			// canDelete:false
		}),
		components: {
			Pagination
		},

		created() {
			//获取地址参数
			let query = this.$route.query;
			console.log("created-------------query------------", query);
			if(JSON.stringify(query) != "{}") {
				if(query.pay_status) {
					this.breadArr.forEach((item, index) => {
						if(query.pay_status == item.status) {
							this.selectBread(index);
						}
					});
				}
			} else {
				this.getOrder(1, 6);
			}
		},

		mounted() {},
		computed: {
			...mapGetters(["user_data"])
		},
		destroyed() {
			//清除定时器
			this.clearPayInterval();
		},
		methods: {
			//清除定时器
			clearPayInterval() {
				clearInterval(this.payInterval);
			},
			//轮询获取支付状态
			getPayStatus() {
				this.payInterval = setInterval(() => {
					this.util.getPayStatus(this.orderId).then(res => {
						if(res.pay_status == 2) {
							this.clearPayInterval();
							this.$alert("支付成功", "成功", {
								confirmButtonText: "确定",
								type: "success",
								callback: action => {
									this.dialogVisible = false;
									this.getOrder(1, 6);
								}
							});
						}
					})
				}, 2000);
			},
			//查看核验单方法
			toCheckList(id) {
				console.log("toCheckList------", id);
				let path = "/personal/order/myOrder/accountList";
				let params = {
					id: id
				};
				this.util.openNewPage(path, params);
			},
			// 点击联系商家，打开即时聊天窗口
			toChat(user) {
				if(this.user_data.id == user.id) {
					this.$message.warning("这是你自己的影棚");
					return;
				}
				let chatToObj = {
					id: user.id,
					name: user.nick,
					avatar: this.$qiniuHost + user.avatar ||
						"https://pic.paitume.com/images/male.png"
				};
				this.$parent.$parent.$refs.chat.chatTo(chatToObj);
			},
			search() {},
			handleSelect() {},
			selectBread(index) {
				this.breadArr.forEach(item => {
					item.isActive = false;
				});
				this.breadArr[index].isActive = true;
				this.getOrder(1, 6, undefined, this.breadArr[index].status);
			},
			//跳转到退款页面方法
			toRefund(id, reject_reason) {
				let path = "/personal/order/myOrder/refund";
				let params = {
					id,
					reject_reason
				};
				this.util.openNewPage(path, params);
			},
			getOrder(page, page_size, is_manual, pay_status, search) {
				console.log("调用");
				this.getRequest(frontOrder.getUserOrderList, {
						page,
						page_size,
						is_manual,
						pay_status,
						search
					})
					.then(res => {
						this.list = res.rows;
						console.log(res, "返回的订单列表");
						this.orderCount = parseInt(res.total_count);
					})
					.catch(_ => {});
			},
			changePage(val) {
				this.getOrder(val, 6);
			},
			selectStatus(status) {
				console.log(status, "选中的状态");
				this.getOrder(1, 6, undefined, status);
			},
			searchGetOrder(text) {
				this.getOrder(1, 6, undefined, undefined, text);
			},
			toOrderDetail(orderId) {
				this.$router.push({
					path: "/personal/order/myOrder/detail",
					query: {
						orderId
					}
				});
			},
			delOrder(order_id) {
				this.util.confirm(this, '确定删除订单吗?').then(res => {
					if(res) {
						this.postRequest(frontOrder.delOrder, {
								order_id
							})
							.then(res => {
								console.log(res, "删除订单");
								this.getOrder(1, 6);
							})
							.catch(err => {});
					}
				}).catch(error => {});

			},
			toEvaluate(orderId) {
				this.list.forEach((item, index) => {
					if(item.id == orderId) {
						storage.set("orderDetail", item);
						console.log("item", item);
					}
				});
				this.$router.push("/personal/order/evaluate");
			},
			// 关闭支付弹框
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			toPay(orderId, price) {
				this.orderId = orderId;
				this.dialogVisible = true;
				let data = {
					id: orderId,
					price: price
				};
				this.pay_data.total_price = price;
				this.pay_data.order_id = orderId;
				this.pay(data);
			},
			async pay(data) {
				try {
					// 在已有订单id时，判断用户是否重复点击支付方式
					if(this.wechat_qrcode === "" || this.alipay_data === "") {
						let pay_succ_data = await this.postRequest(
							frontOrder.pay,
							this.pay_data
						);
						console.log(pay_succ_data, "999999999999999999");
						switch(this.pay_data.pay_way) {
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
					switch(this.pay_data.pay_way) {
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
				} catch(error) {
					console.log(error);
				}
			},
			gener_qrcode(url) {
				let canvas = this.$refs.canvas;
				QRcode.toCanvas(
					canvas,
					url, {
						errorCorrectionLevel: "H"
					},
					error => {
						if(error) {
							console.log(error);
							this.$message({
								type: "error",
								message: "微信支付码生成失败"
							});
						}
					}
				);
			},
			cancelOrder(orderId) {
				console.log(orderId, "要取消的订单");
				this.$confirm("确定要取消订单吗？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
				}).then(() => {
						this.postRequest(frontOrder.delUserOrder, {id: orderId}).then(res=>{
							this.util.showSuccess('删除成功！');
							this.getOrder(1, 6)
						});
				}).catch(() => {});
			},
			toStudioDetail(studioId) {
				this.util.toStudioDetail(studioId);
			},
			toEquipDetail(equipId) {
				this.util.toEquipDetail(equipId);
			}
		},
		watch: {
			way(num) {
				this.pay_data.pay_way = num;
				this.pay();
			},
			dialogVisible(newVal) {
				if(newVal) {
					this.getPayStatus()
				} else {
					this.clearPayInterval()
				}
			}
		},

		filters: {
			// 时间戳转换为一般格式时间
			timeFormat(timestamp) {
				var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + "-";
				var M =
					(date.getMonth() + 1 < 10 ?
						"0" + (date.getMonth() + 1) :
						date.getMonth() + 1) + "-";
				var D =
					(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
				var h =
					(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
				var m =
					(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
					":";
				var s =
					date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				return Y + M + D + h + m + s;
			},
			// 后台返回订单状态码转状态
			statusFormat(status) {
				switch(status) {
					case "0":
						return "已取消";
						break;
					case "1":
						return "未支付";
						break;
					case "2":
						return "已支付";
						break;
					case "3":
						return "商家已接单";
						break;
					case "4":
						return "退款中";
						break;
					case "5":
						return "退款完毕";
						break;
					case "6":
						return "进行中";
						break;
					case "7":
						return "待评论";
						break;
					case "8":
						return "已评论";
						break;
				}
			},
			getPic(val) {
				if(val.indexOf(",") == -1) {
					return val;
				} else {
					return val.split(",")[0];
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../common/index.scss";
	.head {
		height: 60px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
		margin-bottom: 30px;
		span {
			font-size: 16px;
		}
		.search-wrap {
			width: 320px;
			box-sizing: content-box;
			display: flex;
			border: 1px solid rgb(217, 217, 217);
			.el-input {
				flex: 1;
				/deep/ .el-input__inner {
					border: none;
					border-radius: 0;
				}
			}
			.search-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 74px;
				border-left: 1px solid rgb(217, 217, 217);
				background: rgb(250, 250, 250);
				cursor: pointer;
				.search-border-copy {
					width: 22px;
					height: 22px;
				}
			}
		}
	}
	
	.order-content {
		background: #fff;
		padding: 0 20px 26px;
		box-sizing: border-box;
		.order-bread {
			height: 60px;
			// background: pink;
			display: flex;
			.bread-item {
				padding: 16px 0;
				box-sizing: border-box;
				display: flex;
				margin-right: 37px;
				cursor: pointer;
				&:hover {
					color: $Theme-color;
					span:first-child {
						border-bottom: 2px solid $Theme-color;
					}
				}
			}
			.bread-active {
				color: #7c6aff;
				span:first-child {
					border-bottom: 2px solid #7c6aff;
				}
			}
		}
		.table-head {
			background: rgb(250, 250, 250);
			border: 1px solid rgb(217, 217, 217);
			display: flex;
			justify-content: center;
			align-items: center;
			.head-first-col {
				padding-left: 40px;
				box-sizing: border-box;
				width: 380px;
				// flex: 2.5;
				// background: pink;
			}
			.head-other-col {
				text-align: center;
				flex: 1;
				// background: tomato;
				/deep/ {
					.el-select {
						display: flex;
					}
					.el-input {
						// flex: 1;
						padding: 0 20px;
						box-sizing: border-box;
						width: 100%;
						display: flex;
						.el-input__inner {
							align-self: center;
							padding: 0;
							border: none;
							background: rgb(250, 250, 250);
							text-align: center;
						}
						.el-icon-arrow-up {
							// margin-left: -20px;
						}
						.el-input__inner::-webkit-input-placeholder {
							color: #333;
						}
						.el-input__suffix {
							position: initial;
							.el-icon-arrow-up {
								color: #333;
							}
						}
					}
				}
			}
		}
		.all-check {
			height: 50px;
			line-height: 50px;
			padding-left: 20px;
			box-sizing: border-box;
			span {
				padding: 8px 15px;
				box-sizing: border-box;
				border: 1px solid rgb(217, 217, 217);
			}
		}
		.orders {
			margin-top: 30px;
			ul {
				li {
					border: 1px solid #eeeeee;
					margin-bottom: 20px;
					.order-head {
						display: flex;
						align-items: center;
						justify-content: space-between;
						background: rgb(250, 250, 250);
						height: 42px;
						padding-left: 20px;
						padding-right: 20px;
						box-sizing: border-box;
						border-bottom: 1px solid #d9d9d9;
						.order-time {
							display: flex;
							// margin-right: 90px;
							.el-checkbox {
								margin-right: 0;
							}
							.time {
								margin-left: 10px;
								margin-right: 19px;
							}
						}
						.order-address {
							display: flex;
							// margin-right: 35px;
							align-items: center;
							cursor: pointer;
							.store-icon {
								margin-right: 8px;
							}
						}
						.order-contact {
							display: flex;
							align-items: center;
							cursor: pointer;
							.customer_service {
								font-size: 16px;
								margin-right: 8px;
							}
						}
						.el-icon-delete {
							cursor: pointer;
							font-size: 20px;
							&:hover {
								color: #7c6aff;
							}
						}
					}
					.info {
						display: flex;
						// height: 160px;
						&>div+div {
							display: flex;
							border-left: 1px solid #eee;
						}
						.item-info {
							display: flex;
							flex-direction: column;
							// padding:0 20px;
							// box-sizing: border-box;
							.studioInfo,
							.equipInfo {
								width: 380px;
								// flex: 2.5;
								padding: 36px 20px;
								box-sizing: border-box;
								// border-bottom: 1px solid #D9D9D9;
								display: flex;
								// background: pink;
								.image {
									width: 88px;
									height: 100%;
									margin-right: 20px;
									cursor: pointer;
									img {
										width: 88px;
										height: 88px;
										border-radius: 5px;
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
										cursor: pointer;
										&:hover {
											color: #7c6aff;
										}
									}
									.content {
										color: #666;
										font-size: 12px;
										display: flex;
										span:first-child {
											// flex: 1;
											width: 39px;
										}
										span:last-child {
											flex: 5;
										}
									}
									.foot {
										display: flex;
										justify-content: space-between;
										color: #666;
										font-size: 12px;
										span {
											&.red {
												color: #f93333;
											}
										}
									}
								}
							}
							.equip-wrap {
								.equipInfo+.equipInfo {
									border-top: 1px solid #d9d9d9;
								}
							}
							.studioInfo+.equip-wrap {
								border-top: 1px solid #d9d9d9;
							}
						}
						.operate-goods {
							flex: 1;
							display: flex;
							text-align: center;
							span {
								padding: 0 20px;
								box-sizing: border-box;
								margin: auto;
								/*&:nth-child(1){
                cursor: pointer;
              }
              cursor: default;*/
								/*&:hover {
                color: $Theme-color;
              }*/
							}
						}
						.status {
							flex: 1;
							flex-direction: column;
							font-size: 16px;
							.price {
								font-size: 18px;
								font-weight: bold;
							}
							&>span {
								font-size: 14px;
								color: #666;
								margin-top: 5px;
							}
						}
						.operate-order {
							flex: 1;
							p {
								margin-bottom: 15px;
								&:last-child {
									margin-bottom: 0px;
								}
							}
							p:last-child {
								cursor: pointer;
								&:hover {
									color: #7c6aff;
								}
							}
						}
						.pay {
							flex: 1;
							// display: flex;
							// flex-direction: column;
							p:first-child {
								cursor: pointer;
								margin-bottom: 15px;
								&:hover {
									color: #7c6aff;
								}
							}
							p:last-child {
								cursor: pointer;
								&:hover {
									color: #7c6aff;
								}
							}
							button {
								width: 90px;
								height: 40px;
								margin-bottom: 15px;
								background: #f93737;
								border-radius: 20px;
								color: #fff;
							}
						}
						.status,
						.operate-order,
						.pay {
							justify-content: center;
							flex-direction: column;
							align-items: center;
						}
					}
				}
			}
		}
		.page {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>