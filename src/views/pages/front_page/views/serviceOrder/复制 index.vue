<template>
	<div>
		
		<div class='service'>
			<div class="title">
				<div class="info">服务</div>
				<div>单价(元)</div>
				<div>开始时间</div>
				<div>结束时间</div>
				<div>价格(元)</div>
				<div>优惠(元)</div>
				<div>实付(元)</div>
			</div>
			<div class="name">
				<div>传奇盛世（平潭）文化传播有限公司</div>
			</div>
			<div class="content">
				<div class="info">
					<div class="img">
						<el-image fit="contain" src="//img.alicdn.com/top/i1/TB1Ps6FPFXXXXXzXFXXSutbFXXX.jpg"></el-image>
					</div>
					<div class="top">
						<span class="product">女装拍摄裤子外模拍摄服装摄影03</span>
						<p>淘宝天猫网红直播(套餐一:一位精英达人</p>
					</div>
				</div>
				<div>300.00</div>
				<div>{{startTime}}</div>
				<div>{{endTime}}</div>
				<div>300.00</div>
				<div>0.00</div>
				<div>300.00</div>
			</div>
		</div>
		<div class="payInfo">
			<div class="subTotal">
				<span>付款小计：</span>
				<p>¥300.00</p>
			</div>
			<div class="pay">
				<span>实付款：</span>
				<p>¥300.00</p>
			</div>
		</div>
		<div class="other">
			<span>工作内容：</span>
			<el-input v-model="workContent"></el-input>
		</div>
		<div class="addressList">
			<span>选择联系地址：</span>
			<el-select v-model="addressId" placeholder="请选择">
			    <el-option v-for="(item,index) in addressList" :key="item.id" :label="item.address" :value="item.id">
			    </el-option>
			  </el-select>
		</div>
		<div class="commitOrder">
			<el-button type="primary" @click="commitOrder">付款</el-button>
		</div>
		<div class="notFound" v-if="notFound">
			不存在的信息！
		</div>
		
		
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				modelMid:'',  //模特mid
				modelInfo:{},  //模特详情信息
				notFound:false,  //如果数据不存或者异常显示的
				startTime:'',  //开始时间
				endTime:'',  //结束时间
				workContent:'', //工作内容信息
				addressList:[], //用户地址列表
				addressId:'',  //选择的地址id
				totalPrice:'',  //需要支付的总价
			};
		},
		components: {
			
		},
		
		created() {
			//判断是模特订单（有mid字段就是模特订单）暂定，还是服务订单
			if(this.$route.query.mid){
				//模特订单
				this.modelMid=this.$route.query.mid;
				this.getModelByMid(this.modelMid);
				this.startTime=this.$route.query.startTime;
				this.endTime=this.$route.query.endTime;
			}else if(this.$route.query.id){
				//服务订单
			}
			
			//获取地址列表
			this.getAddressList();
		},
		computed: {
			...mapGetters(["city_code"])
		},
		mounted() {
			
		},
		methods: {
			//获取地址列表
			getAddressList() {
				this.util.getAddressList().then(res=>{
					this.addressList=res;
					console.log('getAddressList-------------',res);
				})
			},
			//根据id获取模特详情
			getModelByMid(mid){
				console.log('getModelByMid-------');
				let params = {
					mid: mid
				}
				this.notFound=false;
				this.util.getModelList(params).then(res => {
					console.log('getModelList--------', res);
					this.modelInfo = res;
					if(this.util.isEmpty(res)){
						this.notFound=true;
					}
					console.log('this.modelInfo--------', this.modelInfo);
				})
			},
			//付款（下单）
			commitOrder(){
				console.log('payOrder----------');
				let params={
					rent_type:2, //1小时 2天
					start_time:this.startTime,
					end_time:this.endTime,
					mid:this.modelMid,
					address_id:this.addressId,
					remark:this.workContent
				}
				console.log('params-------',params);
				this.util.addModelOrder(params).then(res=>{
					this.$message.success("提交订单成功！");
					console.log('addModelOrder------',res);
					//跳转到购买产品页面，并传入订单id
					this.util.toBuyOrder(res.id);
				})
			},
			
			//根据id获取服务详情
			getServiceById(id){
				
			},
			
			
		}
	};
</script>

<style lang="scss" scoped>
.service{
	.title,.content{
		display:flex;
		justify-content: flex-start;
		&>div{
			flex:1;
			margin-right:1px;
			text-align:center;
			padding:12px 16px;
		}
		div.info{
			flex:3;
			text-align:left;
		}
	}
	.title{
		div{
			border-bottom: 3px solid #a7cbff;
		}
	}
	.name{
		padding:16px 16px 16px 0px;
	}
	.content{
		padding:16px 0px 16px 10px;
		border:1px solid #eee;
		.info{
			display:flex;
			justify-content:flex-start;
			align-items:center;
			padding:0px;
			margin-right:15px;
			.top{
				line-height:20px;
				p{
					color:#999;
				}
			}
		}
		&>div{
			line-height:36px;
		}
		.img{
			width:60px;
			height:60px;
			margin-right:10px;
		}
	}
}
.payInfo{
	background:#f7faff;
	padding-top:20px;
	&>div{
		display:flex;
		justify-content:flex-end;
		padding:0px 20px 20px 0px;
	}
}
</style>