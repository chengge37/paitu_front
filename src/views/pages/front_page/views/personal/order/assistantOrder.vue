<template>
	<div class="wrap">
		<div class="header">
			<span>助理订单</span>
			<div class="search-wrap">
				<el-input placeholder="输入订单名称或订单号进行搜索" v-model="searchText" @keyup.enter.native="searchGetOrder(searchText)"></el-input>
				<div class="search-icon default-hover" @click="searchGetOrder(searchText)">
					<ali-svg-icon icon-class="search-border-copy" class-name="search-border-copy"></ali-svg-icon>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="order-tab">
				<span class="tab-item" :class="{'active-tab':item.active}" v-for="(item,index) in tabs" :key="index" @click="changeTab(index)">{{item.text}}</span>
			</div>
			<div class="label-group">
				<span class="label1">订单详情</span>
				<span class="label2">商品操作</span>
				<span class="label3">金额</span>
				<el-select class="label4" @change="selectStatu(checkedStatu)" v-model="checkedStatu" placeholder="订单状态">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<span class="label5">操作</span>
			</div>
			<div class="order-item" v-for="(item,index) in orderList" :key="index">
				<div class="item-head">
					<el-checkbox></el-checkbox>
					<span>下单日期：</span>
					<span>{{util.unix2Time(item.create_time)}}</span>
					<span>订单号：</span>
					<span>{{item.show_id}}</span>
				</div>
				<div class="item-table">
					<div class="col1">
						<div style="width:88px;height:88px;margin-right:10px;">
							<el-image style="width:100%;height:100%;" fit="contain" :src="util.picExplode(item.pic)" class="cursor" @click="toAssistantDetail(item.assistant_id)" />
						</div>
						<div class="right-dec">
							<span class="cursor word-hover" @click="toAssistantDetail(item.assistant_id)">{{item.title}}</span>
							<div>
								<span>工作时间：</span>
								<span>{{item.start_time}}-{{item.end_time}}</span>
							</div>
						</div>
					</div>
					<div class="col2">
						<span class="cursor word-hover" v-if="item.pay_status==2 || item.pay_status==3" @click="refund(item.id)">退款</span>
						<span class="cursor word-hover" @click="showRefundStatus(item.id)" v-if="item.pay_status==4">退款状态</span>
					</div>
					<div class="col3">
						<span>￥{{item.price}}</span>
					</div>
					<div class="col4">
						<span>{{item.pay_status|statusFormat}}</span>
						<span class="cursor word-hover" @click="util.toBuyOrder(3,item.id)">订单详情</span>
					</div>
					<div class="col5">
						<span class="cursor word-hover" v-if="item.pay_status==1" @click="util.toBuyOrder(3,item.id)">立即支付</span>
						<span class="cursor word-hover" v-if="item.pay_status==7">评价</span>
						<span class="cursor word-hover" v-if="item.pay_status==1" @click="cancelOrder(item.id)">取消订单</span>
						<span v-if="item.pay_status==0">已取消</span>
					</div>
				</div>
			</div>
			<div class="no-data" v-if="noData">暂无数据</div>
			<Pagination class="page-wrap" v-if="total>3" :total="total" :page="currentPage" :pagesize="3" @getPageNum="changePage"></Pagination>
		</div>

		<!--退款窗口-->
		<user-refund-pay :show.sync="showRefund" :id="selectRefundId" type='6' @refundSuccess="refundSuccess" @closed="closeRefund"></user-refund-pay>

		<!--查看退款状态窗口-->
		<refund-status :openRefund.sync="showRefundStataus" @closed="closeRefundStatus" type='0' :orderId='selectRefundId' orderType='6'></refund-status>

	</div>
</template>

<script>
	import Pagination from "FrontComponents/pagination";
	import userRefundPay from "FrontComponents/userRefundPay";
	import refundStatus from "ServeComponents/refund";
	import { model } from "@config/api.js"
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				noData: false,
				checkedStatu: '',
				searchText: '',
				orderList: [],
				currentPage: 1,
				page:1,
				page_size:3,
				total: 0,
				tabs: [{
						text: '全部订单',
						active: true,
					},
					{
						text: '未支付',
						value: '1',
						active: false
					},
					{
						text: '已支付',
						value: '2',
						active: false
					},
					{
						text: '待评论',
						value: '7',
						active: false
					},
				],
				options: [{
						label: "全部订单",
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

				showRefund: false, //是否显示退款窗口
				selectRefundId: '', //选择的退款id
				showRefundStataus: false, //是否显示退款状态窗口
			}
		},
		components: {
			Pagination,
			userRefundPay,
			refundStatus
		},
		created() {
			this.getOrders()
		},
		computed: {
			...mapGetters(["user_data"])
		},
		filters: {
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
		},
		methods: {
			//查看退款状态
			showRefundStatus(id) {
				this.selectRefundId = id;
				this.showRefundStataus = true;
			},
			//关闭查看退款状态窗口
			closeRefundStatus() {
				this.showRefundStataus = false;
			},
			//跳转到模特详情页面
			toAssistantDetail(id) {
				this.util.toAssistantDetail(id);
			},
			refund(id) {
				this.selectRefundId = id;
				this.showRefund = true;
			},

			//关闭退款窗口
			closeRefund() {
				this.showRefund = false;
			},

			//退款成功回调函数
			refundSuccess() {
				this.showRefund = false;
				this.getOrders();
			},
			selectStatu(val) {
				console.log(val, '订单状态')
				this.tabs.forEach(item => {
					item.active = false
				})
				switch(val) {
					case '1':
						this.tabs[1].active = true
						break;
					case '2':
						this.tabs[2].active = true
						break;
					case '7':
						this.tabs[3].active = true
						break;
					default:
						this.tabs[0].active = true
				}
				this.getOrders(val)
			},
			getOrders(status) {
				let params={
					page:this.page,
					page_size:this.page_size,
					search:this.searchText,
					pay_status:status,
					uid: this.user_data.id
				}
				this.util.getAssistantOrder(params).then(res => {
					console.log('getAssistantOrder-----------',res);
					this.orderList = res.rows
					this.total = res.total_count
					this.noData = this.orderList.length == 0
				}).catch(err => {
					console.error(err)
				})
			},
			changeTab(i) {
				this.tabs.forEach(item => {
					item.active = false
				})
				this.tabs[i].active = true
				this.getOrders(this.tabs[i].value)
				this.checkedStatu = this.tabs[i].value
			},
			searchGetOrder() {
				this.getOrders()
			},
			changePage(i) {
				this.page=i;
				this.getOrders()
			},
			//取消订单(删除订单)
			cancelOrder(id) {
				this.util.confirm(this,'确定取消订单吗？').then(res=>{
					if(res){
//						let params={id:id,pay_status:'0'}
						this.util.delAssistantOrder(id).then(res=>{
							this.$message.success('取消订单成功！');
							this.getOrders();
						})
					}
				})
					
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		color: #333;
		.header {
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60px;
			padding: 0 20px;
			margin-bottom: 20px;
			span {
				font-size: 16px;
				color: #333;
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
		.content {
			padding: 0 20px 46px 30px;
			background: #fff;
			.order-tab {
				height: 64px;
				display: flex;
				align-items: center;
				.tab-item {
					margin-right: 40px;
					cursor: pointer;
					&:hover {
						color: #651FFF;
						&::first-letter {
							border-bottom: 2px solid #651fff;
							padding-bottom: 6px;
						}
					}
				}
				.active-tab {
					color: #651FFF;
					&::first-letter {
						border-bottom: 2px solid #651fff;
						padding-bottom: 6px;
					}
				}
			}
			.label-group {
				height: 40px;
				background: #FAFAFA;
				border: 1px solid #D9D9D9;
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				.label1 {
					flex: 2.5;
					text-indent: 40px;
				}
				.label2 {
					flex: 1;
					text-align: center;
				}
				.label3 {
					flex: 1;
					text-align: center;
				}
				.label4 {
					flex: 1;
					text-align: center;
					cursor: pointer;
					/deep/ {
						.el-select {
							display: flex;
						}
						.el-input {
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
				.label5 {
					flex: 1;
					text-align: center;
				}
			}
			.order-item {
				margin-bottom: 20px;
				.item-head {
					padding: 0 20px;
					height: 42px;
					background: #FAFAFA;
					border: 1px solid #D9D9D9;
					border-bottom: none;
					display: flex;
					align-items: center;
					.el-checkbox {
						margin-right: 10px;
					}
					span:nth-of-type(2) {
						margin-right: 13px;
					}
					span:nth-of-type(4) {
						margin-right: auto;
					}
				}
				.item-table {
					height: 160px;
					display: flex;
					border: 1px solid #D9D9D9;
					.col1 {
						flex: 2.5;
						padding-top: 35px;
						padding-left: 20px;
						display: flex;
						border-right: 1px solid #D9D9D9;
						img {
							width: 88px;
							height: 88px;
							margin-right: 14px;
						}
						.right-dec {
							span {
								font-size: 16px;
							}
							div {
								margin-top: 19px;
								span {
									font-size: 12px;
									color: #999;
								}
							}
						}
					}
					.col2 {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						border-right: 1px solid #D9D9D9;
					}
					.col3 {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						border-right: 1px solid #D9D9D9;
					}
					.col4 {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						border-right: 1px solid #D9D9D9;
						span+span {
							margin-top: 20px;
						}
					}
					.col5 {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						span+span {
							margin-top: 20px;
						}
					}
				}
			}
			.no-data {
				font-size: 20px;
				text-align: center;
			}
			.page-wrap {
				padding-top: 30px;
			}
		}
	}
</style>