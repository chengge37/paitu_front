<template>
	<div>
		<!--基本信息(模特订单)-->
		<div class="card" v-if="modelOrderInfo">
			<div class="baseInfo">
				<p class="headTitle">基本信息</p>
			</div>
			<ul class="baseList">
				<li>
					<span class="name">下单时间：</span>
					<span class="value">{{modelOrderInfo.create_time | time2FullDate}}</span>
				</li>
				<li>
					<span class="name">订单开始：</span>
					<span class="value">{{modelOrderInfo.start_time}}</span>
				</li>
				<li>
					<span class="name">订单结束：</span>
					<span class="value">{{modelOrderInfo.end_time}}</span>
				</li>
				<li>
					<span class="name">订单状态：</span>
					<span class="value">{{modelOrderInfo.pay_statusStr}}</span>
				</li>
				<li>
					<span class="name">订单编号：</span>
					<span class="value">{{modelOrderInfo.show_id}}</span>
				</li>
				<li>
					<span class="name">订单金额：</span>
					<span class="value">{{modelOrderInfo.price}}</span>
				</li>
				<li>
					<span class="name">订单备注：</span>
					<span class="value">{{modelOrderInfo.remark}}</span>
				</li>
			</ul>
		</div>

		<!--模特订单明细-->
		<div class="card" v-if="modelOrderInfo">
			<p class="headTitle">订单明细</p>
			<!--详情信息-->
			<div class="product">
				<div class="productList">
					<el-image style="width:330px;height:330px;" :src="util.picExplode(modelOrderInfo.photo)" fit="scale-down"></el-image>
					<ul>
						<li>
							<span class="name">产品标题：</span>
							<span class="value">{{modelOrderInfo.title}}</span>
						</li>
						<li>
							<span class="name">订单开始：</span>
							<span class="value">{{modelOrderInfo.start_time}}</span>
						</li>
						<li>
							<span class="name">订单结束：</span>
							<span class="value">{{modelOrderInfo.end_time}}</span>
						</li>
						<li>
							<span class="name">联系方式：</span>
							<div class="contact" v-if="addressInfo">
								<span>{{addressInfo.name}}</span>
								<span>{{addressInfo.mobile}}</span>
								<span>{{addressInfo.address}}</span>
							</div>
						</li>
						<li>
							<span class="name">租赁时间：</span>
							<span class="value">{{modelDays}}天</span>
						</li>
					</ul>
				</div>
			</div>
			
		</div>

		<!--（模特订单）客户信息-->
		<div class="card" v-if="modelOrderInfo && modelOrderInfo.user">
			<p class="headTitle">客户信息</p>
			<div class="userInfo">
				<el-image style="width:100px;height:100px" :src="modelOrderInfo.user.avatar?($qiniuHost+modelOrderInfo.user.avatar):config.male_pic"></el-image>
				<ul class="userList">
					<li>
						<span class="name">客户名称：</span>
						<span class="value">{{modelOrderInfo.user.nick}}</span>
					</li>
					<li>
						<span class="name">联系方式：</span>
						<span class="value">{{modelOrderInfo.user.mobile}}</span>
					</li>
				</ul>
			</div>
		</div>
		
		
		<!--基本信息(助理订单)-->
		<div class="card" v-if="assistantOrderInfo">
			<div class="baseInfo">
				<p class="headTitle">基本信息</p>
			</div>
			<ul class="baseList">
				<li>
					<span class="name">下单时间：</span>
					<span class="value">{{assistantOrderInfo.create_time | time2FullDate}}</span>
				</li>
				<li>
					<span class="name">订单开始：</span>
					<span class="value">{{assistantOrderInfo.start_time}}</span>
				</li>
				<li>
					<span class="name">订单结束：</span>
					<span class="value">{{assistantOrderInfo.end_time}}</span>
				</li>
				<li>
					<span class="name">订单状态：</span>
					<span class="value">{{assistantOrderInfo.pay_statusStr}}</span>
				</li>
				<li>
					<span class="name">订单编号：</span>
					<span class="value">{{assistantOrderInfo.show_id}}</span>
				</li>
				<li>
					<span class="name">订单金额：</span>
					<span class="value">{{assistantOrderInfo.price}}</span>
				</li>
				<li>
					<span class="name">订单备注：</span>
					<span class="value">{{assistantOrderInfo.remark}}</span>
				</li>
			</ul>
		</div>

		<!--（助理订单）明细-->
		<div class="card" v-if="assistantOrderInfo">
			<p class="headTitle">订单明细</p>
			<!--详情信息-->
			<div class="product">
				<div class="productList">
					<el-image style="width:330px;height:330px;" :src="util.picExplode(assistantOrderInfo.pic)" fit="scale-down"></el-image>
					<ul>
						<li>
							<span class="name">产品标题：</span>
							<span class="value">{{assistantOrderInfo.title}}</span>
						</li>
						<li>
							<span class="name">订单开始：</span>
							<span class="value">{{assistantOrderInfo.start_time}}</span>
						</li>
						<li>
							<span class="name">订单结束：</span>
							<span class="value">{{assistantOrderInfo.end_time}}</span>
						</li>
						<li>
							<span class="name">联系方式：</span>
							<div class="contact" v-if="addressInfo">
								<span>{{addressInfo.name}}</span>
								<span>{{addressInfo.mobile}}</span>
								<span>{{addressInfo.address}}</span>
							</div>
						</li>
						<li>
							<span class="name">租赁时间：</span>
							<span class="value">{{modelDays}}天</span>
						</li>
					</ul>
				</div>
			</div>
			
		</div>

		<!--（助理订单）客户信息-->
		<div class="card" v-if="assistantOrderInfo">
			<p class="headTitle">客户信息</p>
			<div class="userInfo">
				<el-image style="width:100px;height:100px" :src="assistantOrderInfo.auto_msg_user.avatar?($qiniuHost+assistantOrderInfo.auto_msg_user.avatar):config.male_pic"></el-image>
				<ul class="userList">
					<li>
						<span class="name">客户名称：</span>
						<span class="value">{{assistantOrderInfo.auto_msg_user.nick}}</span>
					</li>
					<li>
						<span class="name">联系方式：</span>
						<span class="value">{{assistantOrderInfo.auto_msg_user.mobile}}</span>
					</li>
				</ul>
			</div>
		</div>
		
		
		
		<!--套餐订单信息-->
		<!--（套餐订单）明细-->
		<div class="card" v-if="packOrderInfo">
			<p class="headTitle">订单明细</p>
			<!--详情信息-->
			<div class="product">
				<div class="productList">
					<el-image style="width:330px;height:330px;" :src="util.picExplode(packOrderInfo.pic)" fit="scale-down"></el-image>
					<ul>
						<li>
							<span class="name">产品标题：</span>
							<span class="value">{{packOrderInfo.title}}</span>
						</li>
						<li>
							<span class="name">租赁方式：</span>
							<span class="value" v-if="packOrderInfo.rent_type==2">按天</span>
							<span class="value" v-else>按小时</span>
						</li>
						<li>
							<span class="name">订单开始：</span>
							<span class="value">{{packOrderInfo.start_time}}</span>
						</li>
						<li>
							<span class="name">订单结束：</span>
							<span class="value">{{packOrderInfo.end_time}}</span>
						</li>
						<li>
							<span class="name">拿取方式：</span>
							<span class="value" v-if="packOrderInfo.is_out==0">到店自取</span>
							<span class="value" v-else>配送</span>
						</li>
						<li v-if="packOrderInfo.is_out==0">
							<span class="name">店家地址：</span>
							<div class="contact" v-if="packOrderInfo.auto_msg_to_uid">
								<span>{{packOrderInfo.auto_msg_to_uid.nick}}</span>
								<span>{{packOrderInfo.auto_msg_to_uid.mobile}}</span>
								<span>{{packOrderInfo.auto_msg_to_uid.address}}</span>
							</div>
						</li>
						<li v-else>
							<span class="name">收货地址：</span>
							<div class="contact" v-if="addressInfo">
								<span>{{addressInfo.name}}</span>
								<span>{{addressInfo.mobile}}</span>
								<span>{{addressInfo.address}}</span>
							</div>
						</li>
						<li>
							<span class="name">租赁时间：</span>
							<span class="value">{{packOrderTimes}}天</span>
						</li>
					</ul>
				</div>
			</div>
			
		</div>

		<!--（套餐订单）客户信息-->
		<div class="card" v-if="packOrderInfo">
			<p class="headTitle">客户信息</p>
			<div class="userInfo">
				<el-image style="width:100px;height:100px" :src="packOrderInfo.auto_msg_user.avatar?($qiniuHost+assistantOrderInfo.auto_msg_user.avatar):config.male_pic"></el-image>
				<ul class="userList">
					<li>
						<span class="name">客户名称：</span>
						<span class="value">{{packOrderInfo.auto_msg_user.nick}}</span>
					</li>
					<li>
						<span class="name">联系方式：</span>
						<span class="value">{{packOrderInfo.auto_msg_user.mobile}}</span>
					</li>
				</ul>
			</div>
		</div>
		
		
		
		<!--服务订单信息-->
		<!--订单明细-->
		<div class="card" v-if="serviceOrderInfo">
			<p class="headTitle">订单明细</p>
			<div class="product">
				<div class="productList">
					<el-image style="width:330px;height:330px;" :src="util.picExplode(serviceOrderInfo.service_pic)" fit="scale-down"></el-image>
					<ul>
						<li>
							<span class="name">下单时间：</span>
							<span class="value">{{serviceOrderInfo.create_time | time2FullDate}}</span>
						</li>
						<li>
							<span class="name">产品标题：</span>
							<span class="value">{{serviceOrderInfo.service_title}}</span>
						</li>
						<li>
							<span class="name">服务项目：</span>
							<span class="value">{{serviceOrderInfo.norms_name}}</span>
						</li>
						<li>
							<span class="name">购买单价：</span>
							<span class="value">{{serviceOrderInfo.norms_price}}</span>
						</li>
						<li>
							<span class="name">购买数量：</span>
							<span class="value">{{serviceOrderInfo.count}}</span>
						</li>
						<li>
							<span class="name">实付金额：</span>
							<span class="value">{{serviceOrderInfo.total_price}}</span>
						</li>
						<li>
							<span class="name">备注：</span>
							<span class="value">{{serviceOrderInfo.remark?serviceOrderInfo.remark:'无'}}</span>
						</li>
						<li>
							<span class="name">订单状态：</span>
							<span class="value">{{serviceOrderInfo.pay_statusStr}}</span>
						</li>
						<!--<li>
							<span class="name">样品寄送地址：</span>
							<div class="contact" v-if="addressInfo">
								<span>{{addressInfo.name}}</span>
								<span>{{addressInfo.mobile}}</span>
								<span>{{addressInfo.address}}</span>
							</div>
						</li>-->
					</ul>
				</div>
			</div>
		</div>

		<!--（服务订单）客户信息-->
		<div class="card" v-if="serviceOrderInfo && serviceOrderInfo.user">
			<p class="headTitle">客户信息</p>
			<div class="userInfo">
				<el-image style="width:100px;height:100px" :src="serviceOrderInfo.user.avatar?($qiniuHost+serviceOrderInfo.user.avatar):config.male_pic"></el-image>
				<ul class="userList">
					<li>
						<span class="name">客户名称：</span>
						<span class="value">{{serviceOrderInfo.user_address.name}}</span>
					</li>
					<li>
						<span class="name">联系方式：</span>
						<span class="value">{{serviceOrderInfo.user_address.mobile}}</span>
					</li>
					<li>
						<span class="name">收货地址：</span>
						<span class="value">{{serviceOrderInfo.user_address.address}}</span>
					</li>
				</ul>
			</div>
		</div>
		
		
		<!--拼拍订单信息-->
		<!--订单明细-->
		<div class="card" v-if="teamOrderInfo">
			<p class="headTitle">订单明细</p>
			<div class="product">
				<div class="productList">
					<el-image style="width:330px;height:330px;" :src="util.picExplode(teamOrderInfo.photo)" fit="scale-down"></el-image>
					<ul>
						<li>
							<span class="name">产品标题：</span>
							<span class="value">{{teamOrderInfo.title}}</span>
						</li>
						<li>
							<span class="name">下单时间：</span>
							<span class="value">{{teamOrderInfo.create_time | time2FullDate}}</span>
						</li>
						<li>
							<span class="name">购买单价：</span>
							<span class="value">{{teamOrderInfo.price}}</span>
						</li>
						<li>
							<span class="name">购买数量：</span>
							<span class="value">{{teamOrderInfo.num}}</span>
						</li>
						<li>
							<span class="name">备注：</span>
							<span class="value">{{teamOrderInfo.remark?teamOrderInfo.remark:'无'}}</span>
						</li>
						<li>
							<span class="name">订单状态：</span>
							<span class="value">{{teamOrderInfo.pay_statusStr}}</span>
						</li>
						<li>
							<span class="name">样品寄送地址：</span>
							<div class="contact">
								<span>{{teamOrderInfo.to_user.nick}}</span>
								<span>{{teamOrderInfo.to_user.mobile}}</span>
								<span>{{teamOrderInfo.to_user.address}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!--（拼拍订单）客户信息-->
		<div class="card" v-if="teamOrderInfo && teamOrderInfo.user">
			<p class="headTitle">客户信息</p>
			<div class="userInfo">
				<el-image style="width:100px;height:100px" :src="teamOrderInfo.user.avatar?($qiniuHost+teamOrderInfo.user.avatar):config.male_pic"></el-image>
				<ul class="userList">
					<li>
						<span class="name">客户名称：</span>
						<span class="value">{{teamOrderInfo.user.nick}}</span>
					</li>
					<li>
						<span class="name">联系方式：</span>
						<span class="value">{{teamOrderInfo.user.mobile}}</span>
					</li>
					<li>
						<span class="name">收货地址：</span>
						<span class="value">{{teamOrderInfo.user.address}}</span>
					</li>
				</ul>
			</div>
		</div>


		<!-- 修改按钮 -->
        <div class="bottomBtn">
            <el-button class="color-area" type="primary" @click="back">返回</el-button>
        </div>

	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		props: {
			//type:0/模特订单,1/服务订单，2团购拼拍订单,3/助理订单,4/套餐订单
		    type: {
		      type: String,
		      default: '0'
		    },
		    id: {
		      type: String,
		      default: ''
		    }
		  },
		data() {
			return {
				modelOrderInfo:null, //模特订单信息
				teamOrderInfo:null,  //团购订单信息
				serviceOrderInfo:null, //服务订单信息
				assistantOrderInfo:null, //助理订单信息
				packOrderInfo:null, //套餐订单信息
				addressInfo:null, //订单地址
				orderStatus:[],  //订单状态列表
				modelDays:0, //模特租赁时长
				packOrderTimes:0, //套餐订单租赁时间，区分按天/按小时
			};
		},

		components: {
			
		},

		
		created() {
			//订单状态列表
			this.orderStatus=this.config.orderStatus;
			
			console.error('serviceOrderDetail------------',this.id,this.type);
			//type:0/模特订单,1/服务订单，2团购拼拍订单，3/助理订单，4/套餐订单
			switch(parseInt(this.type)){
				case 0:
					this.getModelOrder(this.id);
					break;
				case 1:
					this.getServiceOrder(this.id);
					break;
				case 2:
					this.getTeamOrder(this.id);
					break;
				case 3:
					this.getAssistantOrder(this.id);
					break;
				case 4:
					this.getPackOrder(this.id);
					break;
			}
		},
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//根据id获取模特订单信息
			getModelOrder(id){
				let params={
					id:id
				}
				this.util.getModelOrder(params).then(res=>{
					console.log("getModelOrder---------",res);
					this.modelOrderInfo=res;
					this.getAddressInfo(res.address_id);
					
					this.addOrderStatus('modelOrderInfo');
					
					this.modelDays=this.util.datedif(res.start_time,res.end_time);
				})
			},
			
			//获取助理订单信息（根据id)
			getAssistantOrder(id){
				let params={
					id:id,
					isAutoMsg:1
				}
				this.util.getAssistantOrder(params).then(res=>{
					console.log("getAssistantOrder---------",res);
					this.assistantOrderInfo=res;
					this.getAddressInfo(res.address_id);
					
					this.addOrderStatus('assistantOrderInfo');
					
				})
			},
			
			//获取套餐订单信息（根据id)
			getPackOrder(id){
				let params={
					id:id,
					isAutoMsg:1
				}
				this.util.getPackOrder(params).then(res=>{
					console.log("getPackOrder---------",res);
					this.packOrderInfo=res;
					if(res.is_out==1){
						this.getAddressInfo(res.address_id);
					}
					
					this.addOrderStatus('packOrderInfo');
					//计算套餐订单租赁时间
					this.packOrderTimes=this.util.datedif(res.start_time,res.end_time);
				})
			},
			
			//添加订单状态
			addOrderStatus(str){
				this.orderStatus.forEach((item,index)=>{
					if(this[str].pay_status==item.id){
						this[str].pay_statusStr=item.name;
					}
				})
			},
			
			//根据id获取拼拍订单信息
			getTeamOrder(id){
				let params={
					id:id
				}
				this.util.teamOrderList(params).then(res=>{
					console.log('teamOrderList--------',res);
					this.teamOrderInfo=res;
					
					this.addOrderStatus('teamOrderInfo');
				})
			},
			
			//根据id获取服务订单详情
			getServiceOrder(id){
				let params={
					id:id
				}
				this.util.getServiceOrderDetail(params).then(res=>{
					console.log('getServiceOrderDetail----',res);
					this.serviceOrderInfo=res;
					
					this.addOrderStatus('serviceOrderInfo');
				})
			},
			
			//根据id获取地址信息
			getAddressInfo(id){
				this.util.getDefaultAddress(id).then(res=>{
					console.log('getAddressInfo-------',res);
					this.addressInfo=res;
				})
			},
			
			//返回
			back(){
				this.util.back(this);
			}
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	
	.card {
		background: #fff;
		padding: 20px 0px;
		margin-bottom: 20px;
		.headTitle {
			font-size: 20px;
			padding-left: 40px;
			padding-bottom: 20px;
			border-bottom: 1px solid #f0f0f0;
		}
		.emp-cont {
			margin-top: 20px;
		}
		.product {
			display: flex;
			align-items: center;
			padding: 20px;
			.el-image {
				padding: 10px;
				border: 1px solid #f0f0f0;
			}
		}
		.userInfo {
			display: flex;
			align-items: baseline;
			padding: 20px 20px 0px 40px;
			.el-image {
				margin-right: 20px;
				border: 1px solid #f0f0f0;
			}
			.userList {
				margin-right: 80px;
				&:last-child {
					margin-right: 0px;
				}
			}
		}
		.remark {
			display: flex;
			align-items: center;
			padding: 20px 40px 0px 40px;
			/deep/ .el-textarea__inner {
				min-height: 200px !important;
				border-radius: 0px;
			}
			span {
				width: 80px;
			}
		}
		ul {
			li {
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				&:last-child {
					margin-bottom: 0px;
				}
				.name {
					color: #999999;
				}
				.value {
					color: #333;
					font-weight: 600;
				}
			}
		}
		.baseList {
			padding: 20px 0px 20px 40px;
		}
		.productList {
			display: flex;
			align-items: flex-start;
			padding: 20px 0px 0px 20px;
			ul {
				margin-left: 20px;
			}
		}
	}
	
	
	.baseInfo {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 40px;
		border-bottom: 1px solid #f0f0f0;
		.headTitle {
			border-bottom: none;
		}
	}
</style>