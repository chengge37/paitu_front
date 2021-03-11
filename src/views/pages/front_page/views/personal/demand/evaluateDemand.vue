<template>
	<div class="container">
		<div class="top">
			您正在对此订单进行评价
		</div>
		<div class="demand">
			<div class="left">
				<el-image src="" style="width:80px; height: 80px">
				</el-image>
				<div class="info">
					<p>
						<span>项目编号：</span>
						<span>{{detail.bidding_sn}}</span>
					</p>
					<p>
						<span>项目名称：</span>
						<span>{{detail.name}}</span>
					</p>
					<p class="money">
						<span>支付金额：</span>
						<span>¥{{detail.price}}</span>
					</p>
				</div>
			</div>
			<div class="right">
				交易成功
			</div>
		</div>
		<div class="rate">
			<p>服务商评分</p>
			<el-rate v-model="rateValue" show-score text-color="#ff9900" score-template="{value}">
			</el-rate>
		</div>
		<div class="evaluate">
			<p>对服务商印象</p>
			<el-input type="textarea" :rows="8" placeholder="请输入内容评价内容" v-model="evaluteContent" class="el-input"></el-input>
		</div>
		<div class="btn">
			<el-button type="primary" class="default-hover" @click="confirm">确定</el-button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		data: () => ({
			demandId:'',  //任务id
			detail:null, //任务详情
			rateValue:'0',  //评价分数
			evaluteContent:'', //评价内容
			serviceLogo:'', //服务商logo
		}),
		components: {
			
		},
		
		watch: {
			
		},
		
		created() {
			let query=this.$route.query;
			if(!this.util.isEmpty(query)){
				this.demandId=query.id;
				this.getDetail(this.demandId);
			}
		},
		
		mounted() {
			
		},
		
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//根据id获取服务详情
			getDetail(id){
				let params={id:id};
				this.util.getBiddingList(params).then(res=>{
					console.log("getDetail----",res);
					this.detail=res;
				})
			},
			//评价方法
			confirm(){
				console.log('confirm------');
			}
		},
		
	};
</script>

<style lang="scss" scoped>
	.container{
		background:#fff;
		.top{
			padding:10px 20px;
			border-bottom:1px solid #E0E0E0;
		}
		.demand{
			display:flex;
			justify-content:space-between;
			align-items:center;
			padding:20px 40px 20px 20px;
		}
		.left{
			display:flex;
			align-items:center;
			.el-image{
				margin-right:10px;
			}
			.info{
				display:flex;
				flex-direction:column;
				p:nth-child(2){
					padding:11px 0px;
				}
				.money{
					color:$Theme-color;
				}
			}
		}
		.right{
			color:$Theme-color;
			padding:4px 12px;
			border:1px solid $Theme-color;
			border-radius:4px;
			font-size:18px;
			font-weight:600;
		}
		.rate,.evaluate{
			padding:20px;
			p{
				font-weight:600;
				margin-bottom:25px;
			}
		}
		.btn{
			padding:0px 20px 20px 20px;
		}
	}
</style>