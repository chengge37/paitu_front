<template>
	<div class="newServe">
		<div class="act-order-container">
			<div class="top-nav">
				<div class="top-order">
					<div class="order-group">
						<el-radio-group v-model="params.time_type" @change="changeOpt">
							<el-radio-button :label="item.label" v-for="(item,index) in optList" :key="index">{{item.name}}</el-radio-button>
						</el-radio-group>
					</div>
					<div class="date-seach">
						<p style="width:70px;">日期筛选：</p>
						<el-date-picker v-model="dateArea" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateAreaChange">
						</el-date-picker>
					</div>
				</div>
				<div class="top-seach">

					<div class="seach-box">
						<div class="seach">
							<div class="icon">
								<ali-svg-icon icon-class="seach"></ali-svg-icon>
							</div>
							<input type="text" placeholder="请输入订单号或活动名" class="seach-input" v-model="searchText" />
						</div>
						<div class="seach-button color-area" @click="search">搜索</div>
					</div>
				</div>
			</div>
			<el-table :data="orderList" v-loading="listLoading" element-loading-text="Loading" fit class="table-control">
				<el-table-column align="center" label="序号" width="70">
					<template slot-scope="scope">
						<span>{{(params.page-1)*params.page_size+scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="下单时间">
					<template slot-scope="{row}">
						<span>{{row.create_time|time2FullDate}}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单编号" prop="show_id" align="center">
				</el-table-column>
				<el-table-column label="助理标题" align="center">
					<template slot-scope="{row}">
						<span>{{row.title?row.title:row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="图片"align="center">
					<template slot-scope="{row}">
						<el-image style="width:60px; height: 60px" :src="util.picExplode(row.pic)" fit="contain"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="开始时间" prop="start_time" align="center"></el-table-column>
				<el-table-column label="结束时间" prop="end_time" align="center"></el-table-column>
				<el-table-column label="订单价格(元)" prop="price" align="center"></el-table-column>
				<el-table-column label="备注内容" prop="remark" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column label="客户名称" align="center">
					<template slot-scope="{row}">
						<span>{{row.auto_msg_user.nick}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="订单状态">
					<template slot-scope="{row}">
						<span>{{row.pay_statusStr}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="{row}">
						<!-- 当is_pay为4时，此时为退款中，需要商家审核 -->
              			<el-button type="text" @click="toRefund(row)" v-if="row.pay_status==4">审核退款</el-button>
						<el-button type="text" @click="editPrice(row)" v-if="row.pay_status==1">改价</el-button>
						<el-button type="text" @click="editOrder(0,row)" v-if="row.pay_status==2">接单</el-button>
						<el-button type="text" @click="editOrder(1,row)" v-if="row.pay_status==2">拒单</el-button>
						<el-button type="text" @click="gotoDetail(row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination :total="totalCount" :page="params.page" :pagesize="params.page_size" @getPageNum="changePage" class="pagination">
		</pagination>
		
		<!--操作退款窗口模块-->
    	<refund :openRefund="openRefund" :orderId="refundId" orderType="6" @closed="closeRefund"></refund>
		
	</div>
</template>

<script>
	import { format } from 'date-fns';
	import pagination from "FrontComponents/pagination";
	import refund from "ServeComponents/refund";
	import { mapGetters } from "vuex";
	export default {
		components: {
			pagination,
			refund
		},
		data() {
			return {
				optList: [{
					label: '0',
					name: '不限'
				}, {
					label: '1',
					name: '昨日'
				}, {
					label: '2',
					name: '今日'
				}, {
					label: '4',
					name: '本周'
				}, {
					label: '6',
					name: '本月'
				}],
				dateArea: '',
				timeArea: {},
				listLoading: false,
				orderList: [],   //订单列表
				orderStatus:[],  //订单状态列表
				params: {
					page: 1,
					page_size: 10,
					time_type: '0'
				},
				totalCount: 0,   //订单总数
				searchText: '',
				opt: "全部类型",
				status: "全部状态",
				selectStatus: "-1",
				statusList: [{
						value: '-1',
						label: '全部'
					},
					{
						value: '1',
						label: '未支付'
					},
					{
						value: '2',
						label: '已支付'
					},
					{
						value: '5',
						label: '活动中'
					},
					{
						value: '7',
						label: '等待评论'
					},
					{
						value: '8',
						label: '评论结束'
					},
				],
				selectType: '-1',
				openRefund:false, //是否显示退款窗口
				refundId:'', //退款id
			};
		},
		created() {
			this.orderStatus=this.config.orderStatus;
		},
		mounted() {
			this.getOrderList()
		},
		computed: {
    ...mapGetters(["user_data"])
  },
		methods: {
			//打开审核退款窗口
			toRefund(item){
		      console.log("toRefund-------", item);
		      this.refundId = item.id;
		      this.openRefund = true;
			},
			//关闭退款窗口回调方法
		    closeRefund(val) {
		      this.openRefund = false;
		      if (val) {
		        this.getOrderList();
		      }
		    },
			
			//接单方法 type:0/接单，1/拒单
			editOrder(type,item){
				let params;
				params={
					id:item.id,
					pay_status:parseInt(type)+3,  //3接单 4拒单
				}
				if(type==0){
					this.util.confirm(this,'确定接单吗？').then(res=>{
						console.log('params----',params);
						this.util.editAssistantStatus(params).then(res=>{
							this.$message.success('接单成功！');
							this.getOrderList();
						})
					})
				}else if(type==1){
					this.util.prompt(this,'请输入拒绝原因：','拒绝订单').then(({value})=>{
						params.reject_reason=value;  //拒绝原因
						console.log('params----',params);
						this.util.editAssistantStatus(params).then(res=>{
							this.$message.success('拒单成功！');
							this.getOrderList();
						})
					})
				}
			},
			
			//修改订单价格
			editPrice(item){
				let params={
					id:item.id,
					price:''
				}
				this.util.prompt(this,'请输入不少于1的正整数：','修改订单价格').then(({value})=>{
					params.price=value; 
					console.log('params----',params);
					this.util.editAssistantPrice(params).then(res=>{
						this.$message.success('修改价格成功！');
						this.getOrderList();
					})
				})
			},
			
			search() {
				this.getOrderList()
			},
			validParams() {
				let params = this.util.deepcopy(this.actOrder.params)
				if(this.selectStatus && this.selectStatus != '-1') {
					params = Object.assign(params, {
						pay_status: this.selectStatus
					})
				}
				if(this.selectType && this.selectType != '-1') {
					params = Object.assign(params, {
						type: this.selectType
					})
				}
				if(this.timeArea && this.timeArea.st_time) {
					let times = Object.assign(this.timeArea, {
						time_type: 5
					});
					params = Object.assign(params, this.timeArea);

				}
				if(this.selectFee && this.selectFee != '-1') {
					params = Object.assign(params, {
						fee: this.selectFee
					})
				}
				if(this.searchText) {
					params = Object.assign(params, {
						search: this.searchText
					})
				}
				return params
			},
			
			//获取（助理）订单列表
			getOrderList() {
				this.listLoading = true;
				let params={
					to_uid:this.user_data.id,
					page:this.params.page,
					page_size:this.params.page_size,
					isAutoMsg:1,
				};
				this.util.getAssistantOrder(params).then(res=>{
					this.listLoading = false;
					this.totalCount=res.total_count;
					this.orderList=res.rows;
					this.orderList.forEach((item,index)=>{
						this.orderStatus.forEach((item2,index2)=>{
							if(item.pay_status==item2.id){
								item.pay_statusStr=item2.name;
							}
						})
					})
					console.log('orderList-----',this.orderList);
				})
				
			},
			handleCurrentChange(val) {
				console.log(val)
			},
			dateFormat(d) {
				const resDate = d.getFullYear() + '-' + this.util.toDouble((d.getMonth() + 1)) + '-' + this.util.toDouble(d.getDate());
				return resDate;
			},
			dateAreaChange(e) {
				console.log('dateAreaChange---', e)
				if(e && e.length > 0) {
					let startDate = new Date(e[0]);
					let endDate = new Date(e[1]);
					this.timeArea = {
						st_time: this.dateFormat(startDate),
						et_time: this.dateFormat(endDate)
					}
				} else {
					delete this.timeArea.st_time;
					delete this.timeArea.et_time;
				}

				this.getOrderList()
			},
			changeStatus(command) {
				const index = this.statusList.findIndex(item => {
					return item.value === command
				})
				this.selectStatus = command;
				this.opt1 = this.statusList[index].label;
				this.params.page = 1;
				this.getOrderList();

			},
			changeType(command) {
				const index = this.typeList.findIndex(item => {
					return item.value === command
				})
				this.selectType = command;
				this.opt = this.typeList[index].label;
				this.params.page = 1;
				this.getOrderList();
			},
			changeOpt(val) {
				this.params.page = 1;
				console.log('val---', val)
				this.getOrderList()
			},
			changePage(e) {
				this.params.page = e;
				this.getOrderList()
			},
			//跳转到订单详情
			gotoDetail(data) {
				let path="/serve/order/assistantOrderDetail"
				this.$router.push({
					path: path,
					query:{
						id:data.id
					}
				});
			}
		},
	};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.act-order-container {
		background-color: #ffffff;
	}
	
	.top-nav {
		.top-order {
			display: flex;
			align-items: center;
			.add-order {
				margin-left: 20px;
				/deep/ .el-button--primary {
					background-color: $Theme-color;
					border-color: $Theme-color;
					height: 38px;
				}
				/deep/ .el-button--primary:active {
					background-color: $Button-active;
					border-color: $Button-active;
				}
			}
			.top-select {
				margin-right: 10px;
				/deep/ .el-input__inner {
					background-color: inherit;
					color: #333333;
					border: none;
					width: 120px;
					text-align: center;
				}
			}
			.order-group {
				margin-right: 20px;
			}
			.date-seach {
				display: flex;
				align-items: center;
			}
		}
		.top-seach {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			margin-right: 10px;
			.date-seach {
				.long {
					width: 150px;
					margin-left: 23px;
				}
			}
			.seach-box {
				margin-left: 25px;
				display: flex;
				.seach {
					display: flex;
					height: 38px;
					align-items: center;
					border: 1px solid #dcdfe6;
					border-radius: 2px 0 0 2px;
					background-color: #fff;
					.icon {
						width: 14px;
						height: 14px;
						margin: 12px 5px 12px 5px;
					}
					.seach-input {
						border: none;
						outline: medium;
						background-color: #ffffff;
						height: 30px;
						font-size: 14px;
					}
				}
				.seach-button {
					width: 54px;
					height: 38px;
					line-height: 38px;
					background-color: $Theme-color;
					text-align: center;
					color: #fff;
					border-radius: 0px 2px 2px 0px;
					cursor: pointer;
				}
				.seach-button:active {
					background-color: $Button-active;
				}
			}
		}
	}
</style>