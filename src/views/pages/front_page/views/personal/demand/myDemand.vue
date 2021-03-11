<template>
	<div class="container">
		<div class="order-content">
			<div class="order-bread">
				<div @click="selectBread(item)" :class="{'bread-active':item.isActive}" class="bread-item" v-for="(item,index) in breadArr" :key="index">
					<span v-text="item.word[0]"></span>
					<span v-text="item.word.slice(1)"></span>
				</div>
			</div>

			<div class="list">
				<div class="head">
					<span>项目</span>
					<span>项目类型</span>
					<span>金额</span>
					<span>状态</span>
					<span>操作</span>
				</div>
				<div class="content" v-if="listParams.total>0">
					<ul>
						<li v-for="(item,index) in list" :key="index">
							<div class="project">
								<span class="title">{{item.name}}</span>
								<span class="orderNum">项目编号：{{item.bidding_sn}}</span>
							</div>
							<div>{{item.showType}}</div>
							<div>¥{{item.price}}</div>
							<div>{{item.showStatus}}</div>
							<div class="operate">
								<span class="cursor word-hover" v-if="item.status==2" @click="evaluateService(item.id)">评价服务商</span>
								<span class="cursor word-hover" v-if="item.status==1" @click="confirmOrder(item)">确认验收</span>
								<span class="cursor word-hover" @click="toDetail(item.id)">详情</span>
								<span class="cursor word-hover" v-if="item.status==0 && item.bidding_task_num==0" @click="toUpdate(item.id)">修改</span>
								<span class="cursor word-hover" v-if="item.status==0 && item.bidding_task_num==0">删除</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="nodata" v-else>暂无数据</div>
			</div>

			<Pagination v-if="listParams.total>0" :total="listParams.total" :page="listParams.page" :pagesize="listParams.page_size" @getPageNum="changePage"></Pagination>
		
			
			<!--任务支付尾款弹窗-->
			<pay-bidding-fee :openPay.sync="showPayFee" :totalPrice="remainMoney" @closed="closePay" v-if="biddingOrderId" :orderId="biddingOrderId"></pay-bidding-fee>
		
		</div>
	</div>
</template>

<script>
	import Pagination from "FrontComponents/pagination";
	import payBiddingFee from "FrontComponents/payBiddingFee";
	import { mapGetters } from "vuex";

	export default {
		data: () => ({
			breadArr: [{
					word: "所有项目",
					isActive: true,
					status:'-1'
				},
				{
					word: "竞标中",
					isActive: false,
					status: "0"
				},
				{
					word: "进行中",
					isActive: false,
					status: "1"
				},
				{
					word: "已完成",
					isActive: false,
					status: "3"
				},
				{
					word: "已流标",
					isActive: false,
					status: "4"
				}
			],
			statusIndex:'-1',
			listParams:{
				page:1,
				page_size:6,
				total:0
			},
			list: [],
			searchText: "",
			biddingOrderId:'', //支付尾款订单id
			showPayFee:false, //是否显示支付弹窗
			remainMoney:'', //任务订单剩余支付金额（尾款）
		}),
		components: {
			Pagination,
			payBiddingFee
		},
		
		watch: {
			
		},
		
		created() {
			this.getList();
		},
		
		mounted() {
			
		},
		
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//关闭支付弹窗
			closePay(){
				this.showPayFee=false;
			},
			//确认验收并支付尾款
			confirmOrder(item){
				console.log('confirmOrder-----',item);
				this.util.confirm(this,'确认验收并支付尾款吗？').then(res=>{
					this.remainMoney=Number(item.price)-Number(item.deposit_price);
					console.error('remainMoney------------',this.remainMoney);
					let params={
						type:'3',
						price:this.remainMoney,
						bidding_id:item.id
					}
					this.util.addBiddingOrder(params).then(res2=>{
						console.error('addBiddingOrder------',res2);
						//打开支付弹窗
						this.biddingOrderId=res2.id;
						this.showPayFee=true;
					})
				})
			},
			//评价服务商方法
			evaluateService(id){
				console.log('evaluateService-----',id);
				let url="/personal/demand/evaluateDemand";
				this.$router.push({
					path: url,
					query: {id: id}
				});
			},
			//获取需求列表数据
			getList(){
				console.log('getList---------');
				let params={
					page:this.listParams.page,
					page_size:this.listParams.page_size,
					uid:this.user_data.id
				}
				if(this.statusIndex>=0){
					params.status=this.statusIndex;
				}
				this.util.getBiddingList(params).then(res=>{
					console.log('getList-------',res);
					this.list=res.rows;
					this.listParams.total=res.total_count;
					this.changeData();
				})
			},
			//转换数据，状态，类型
			changeData(){
				this.list.forEach((item,index)=>{
					item.showStatus=this.config.projectStatusList[item.status].name;
					item.showType=this.config.projectList[parseInt(item.type)-1].name;
				})
			},
			//切换状态方法
			selectBread(obj){
				this.breadArr.forEach(item=>{
					item.isActive=false
				})
				obj.isActive=true;
				this.statusIndex=obj.status;
				this.getList();
			},
			//跳转到详情页面
			toDetail(id){
				this.util.toCompetitive(id);
			},
			//跳转到修改页面
			toUpdate(id){
				this.util.toAddDemand(2,id);
			},
			changePage(e){
				console.log('changePage----',e);
				this.listParams.page=e;
				this.getList();
			}
		},
		
	};
</script>

<style lang="scss" scoped>
	@import "../common/index.scss";
	.order-content {
		background: #fff;
		padding: 0 20px 26px;
		box-sizing: border-box;
		.order-bread {
			height: 60px;
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
		
		
		.list{
			.head{
			    background: #fafafa;
			    border: 1px solid #d9d9d9;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    padding:10px 20px;
			    span{
			    	flex:1;
			    }
			    span:first-child{
			    	width:400px;
			    	flex:none;
			    }
			}
			.content{
				border-left:1px solid #E1E1E1;
				border-right:1px solid #E1E1E1;
				ul{
					li{
						display:flex;
						padding:20px;
						border-bottom:1px solid #E1E1E1;
						div{
							flex:1;
						}
						div:first-child{
							width:400px;
							flex:none;
						}
						.project{
							display:flex;
							flex-direction: column;
							span:first-child{
								margin-bottom:10px;
							}
							.orderNum{
								color:#666666;
							}
						}
						.operate{
							display:flex;
							flex-direction:column;
							span{
								margin-bottom:10px;
								&:last-child{
									margin-bottom:0px;
								}
							}
						}
					}
				}
			}
			.nodata{
				padding:20px 0px;
			}
		}
		
		/deep/{
			.page{
				justify-content: flex-end;
				padding-top:20px;
			}
		}
	}
</style>