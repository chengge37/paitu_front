<template>
	<div class="newServe">
		<div class="act-order-container">
			<div class="top-nav">
				<div class="top-seach">
					<div class="seach-box">
						<div class="seach">
							<div class="icon">
								<ali-svg-icon icon-class="seach"></ali-svg-icon>
							</div>
							<input type="text" placeholder="请输入项目标题或订单号" class="seach-input" v-model="searchText" />
						</div>
						<div class="seach-button color-area" @click="search">搜索</div>
					</div>
				</div>
			</div>

			<el-table :data="list" v-loading="listLoading" element-loading-text="Loading" fit class="table-control">
				<el-table-column align="center" label="项目">
					<template slot-scope="{row}">
						<div class="projectContent">
							<span class="title">{{row.name}}</span>
							<span class="time">{{row.create_time | time2FullDate}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="需求方" prop="user_nick" align="center"></el-table-column>
				<el-table-column label="项目预算">
					<template slot-scope="{row}">
						<span>￥{{row.demandPrice | toMoney}}</span>
					</template>
				</el-table-column>
				<el-table-column label="保证金" prop="is_pay" align="center"></el-table-column>
				<el-table-column label="我的报价">
					<template slot-scope="{row}">
						<span class="myOffer">￥{{row.price}}</span>
						<span class="updateMoney cursor" v-if="row.status==0" @click="updateMoney(row)">修改报价</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="{row}">
						<span>{{row.showStatus}}</span>
						<div class='winBidding' v-if='row.status>0 && (row.bidding_task_id==row.id)'>
							<div class="title">中标</div>
							<div class="otherLine">
								<p></p>
								<p></p>
								<p></p>
							</div>
						</div>
						<div class='loseBidding' v-if='row.status>0 && (row.bidding_task_id!=row.id)'>
							<div class="title">落选</div>
							<div class="otherLine">
								<p></p>
								<p></p>
								<p></p>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="项目编号" prop="bidding_sn" align="center"></el-table-column>
				<el-table-column align="left" label="操作" width='150'>
					<template slot-scope="{row}">
						<div class="operate">
							<span class="word-hover cursor" @click="toDetail(row.id,1)">详情</span>
							<span class="word-hover cursor" v-if="row.status==0" @click="toDetail(row.id,2)">修改</span>
							<!--<span class="word-hover cursor" v-if="row.status==1 && (row.bidding_task_id==row.id)" @click="finishBidding(row.id)">完成</span>-->
							<span class="word-hover cursor" v-if="row.status==0" @click="delSubmit(row.id)">放弃投标</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination :total="params.total" :page="params.page" :pagesize="params.page_size" @getPageNum="changePage" class="pagination">
		</pagination>

		<!--修改价格弹窗-->
		<el-dialog title="修改报价" :visible.sync="showDialog" width="25%" center>
			<div>
				<el-input placeholder="请输入报价..." v-model="inputMoney"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="showDialog = false">取 消</el-button>
			    <el-button type="primary" @click="showDialog = false">确 定</el-button>
			  </span>
		</el-dialog>

	</div>
</template>

<script>
	import pagination from "FrontComponents/pagination";
	import { mapGetters } from "vuex";
	export default {
		components: {
			pagination,
		},
		data() {
			return {
				list: [], //订单列表数据
				listLoading: true,
				params: {
					page: 1,
					page_size: 10,
					total: 0
				},
				searchText: '',
				showDialog:false,
				inputMoney:'',
			};
		},
		created() {

		},
		computed: {
			...mapGetters(["user_data"])
		},
		mounted() {
			this.getList()
		},
		methods: {
			//获取订单列表
			getList() {
				this.listLoading=true;
				let params={
					page:1,
					page_size:10,
					to_uid:this.user_data.id
				}
				this.util.getSubmitList(params).then(res=>{
					console.log('getList-----',res);
					let promiseAll=[];
					res.rows.forEach((item,index)=>{
						 promiseAll.push(this.getDemandDetail(item));
					})
					Promise.all(promiseAll).then(val=>{
						this.list=res.rows;
						console.error('this.list------',this.list);
						this.listLoading=false;
					})
					
				})
			},
			//根据竞标任务id,获取详情信息
			getDemandDetail(item){
				let params={id:item.bidding_id};
				return new Promise((resolve,reject)=>{
					this.util.getBiddingList(params).then(res=>{
						console.log('getDemandDetail----',res);
						item.bidding_sn=res.bidding_sn;
						item.name=res.name;
						item.is_pay=res.is_pay;
						item.demandPrice=res.price;
						item.status=res.status;
						item.user_nick=res.user_nick;
						item.showStatus=this.config.projectStatusList[parseInt(item.status)].name;
						item.bidding_task_id=res.bidding_task_id;
//						item.showType=this.config.projectList[parseInt(item.type)+1].name;
						resolve(true);
					})
				})
				
			},
			//放弃（删除投标）方法
			delSubmit(id){
				this.util.confirm(this,'确定要放弃投标吗?').then(res=>{
					if(res){
						this.util.delSubmit(id).then(res=>{
							console.log('delSubmit-----',res);
							this.util.showSuccess('删除成功！');
							this.getList();
						})
					}
				})
			},
			
			//完成任务方法
			finishBidding(id){
				this.util.confirm(this,'确定给发布方完成任务了吗？').then(res=>{
					this.util.finishBidding(id).then(res=>{
						console.log('finishBidding----',res);
						this.util.showSuccess('操作成功！');
						this.getList();
					})
				})
			},
			
			//跳转到详情,type:type:1(详情),2(修改)
			toDetail(id,type){
				let url = '/serve/order/biddingDetail';
				let query={id:id,type:type};
				this.$router.push({
					path: url,
					query:query
				});
			},
			//修改报价方法
			updateMoney(item) {
				this.showDialog=true;
				this.inputMoney=item.myOffer;
			},
			//搜索方法
			search() {
				console.log('search------------', this.searchText);
			},
			//分页方法
			changePage(e) {
				console.log('changePage----', e);
			},
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
	
	/deep/ {
		.projectContent {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding-left: 20px;
			.title {
				color: #333;
			}
			span:first-child {
				margin-bottom: 10px;
			}
		}
		.el-table td {
			padding: 15px 0px;
		}
		.operate {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			span {
				margin-bottom: 5px;
				&:last-child {
					margin-bottom: 0px;
				}
			}
		}
		.is-left {
			text-align: left;
		}
		.myOffer:hover {}
		.updateMoney {
			color: #FF6900;
			margin-left: 5px;
			display: none;
		}
		.el-table__row:hover {
			.updateMoney {
				display: inline-block;
			}
		}
	}
	
	.winBidding,.loseBidding{
		position:relative;
		color:#FF6900;
		box-sizing:border-box;
		transform:rotate(-15deg);
		display:inline-block;
		right:-20px;
		.title{
			width:60px;
			height:60px;
			border-radius:50%;
			border:1px solid #FF6900;
			background:#fff;
			display:flex;
			align-items:center;
			justify-content:center;
		}
		.otherLine{
			position:absolute;
			top:27px;
			left:-14px;
			z-index:-1;
			display:flex;
			flex-direction:column;
			align-items: center;
			p{
				margin:0px;
				padding:0px;
				margin-bottom:3px;
				width:90px;
				height:2px;
				background:#FF6900;
				&:nth-child(2){
					width:85px;
				}
			}
		}
	}
	.loseBidding{
		color:#BBBBBB;
		.title{
			border:1px solid #BBBBBB;
		}
		.otherLine{
			p{
				background:#BBBBBB;
			}
		}
	}
</style>