<template>
	<div>
		<div class="listCart" v-if="orderCart">
			<!--<i class="el-icon-goods" @click="util.toCartPage()" v-if="showCart"></i>-->
			<div class="cartIcon" @click="util.toCartPage()">
				<ali-svg-icon icon-class="cart_gray" class="cartPic"></ali-svg-icon>
				<i class="point"></i>
			</div>
			<div class="goodList">
				<p>最新加入商品</p>
				<div v-if="orderCount>0">
					<ul>
						<li v-if="orderStudioArr">
							<div class="leftInfo">
								<!--<el-image :src="$qiniuHost+orderStudioArr.pic.split(',')[0]"/></el-image>-->
								<el-image :src="util.picExplode(orderStudioArr.pic)" fit="scale-down"/>
								</el-image>
								<el-button type="text" @click="util.toStudioDetail(orderStudioArr.studio_id)">{{orderStudioArr.name}}</el-button>

							</div>
							<div class="right_price">
								<span>¥{{orderStudioArr.base}}.00</span>
								<!--<el-button type="text" disabled>删除</el-button>-->
								<el-button type="text" @click="delOrder(orderData)">删除订单</el-button>
							</div>
						</li>
						<li v-for="(item,index) in orderEquipArr" :key="index">
							<div class="leftInfo">
								<el-image :src="util.picExplode(item.equip_pic,$qiniuHost+item.static_pic.split(',')[0])" fit="scale-down"/>
								</el-image>
								<el-button type="text" @click="util.toEquipDetail(orderCart.equip_array[index].equip_id)">{{item.name}}</el-button>

							</div>
							<div class="right_price">
								<span>¥{{item.base}}.00</span>
								<el-button type="text" @click="delEquip(orderData,index)">删除</el-button>
							</div>
						</li>
					</ul>
					<!--底部信息-->
					<div class="cartDetail" v-if="orderEquipArr || orderStudioArr">
						<div class="numAndPrice">
							<span v-if="orderStudioArr">共{{orderEquipArr.length+1}}件商品</span>
							<span v-else>共{{orderEquipArr.length}}件商品</span>
							<span> {{orderCart.price}}元</span>
						</div>
						<el-button class="color-area" @click="util.toCartPage()">去购物车</el-button>
					</div>
				</div>
				<div v-else class="noGood">
					暂无添加商品
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { frontOrder } from "@config/api.js"
	export default {
		props:{
			res:{
				type:Object,
				default:null,
			}
		},
		data() {
			return {
				showCart:false,  //是否显示购物车
				orderCount:0,   //购物车订单数量
				orderInfo:this.res,  //购物车信息
				orderCart:null,   //购物车cart信息
				orderData:null,  //购物车data信息
				orderEquipArr:null,  //购物车设备价格信息
				orderStudioArr:null,  //购物车影棚价格信息
			}
		},
		
		created(){

		},
		mounted(){
			console.log('orderInfo----------',this.orderInfo);
			//获取购物车信息
			if(!this.orderInfo) return;
			this.showCart=true;
			if(this.orderInfo.count>0){
				this.orderCart=this.orderInfo.cart;
				this.orderData=this.orderInfo.data;
				this.orderCount=this.orderInfo.count;
				if(this.orderData.has_equipment==1){
					this.orderEquipArr=this.orderInfo.price.equipPriceArr;
				}else{
					this.orderEquipArr=[];
				}
				if(this.orderData.has_studio==1){
					this.orderStudioArr=this.orderInfo.price.studioPriceArr;
				}
				console.log('orderEquipArr----',this.orderEquipArr);
			}else{
				this.orderCount=0;
			}
		},
		methods: {
			//删除订单
			delOrder(order){
				this.util.confirm(this,'真的要删除订单？').then(res => {
					let params = {
						id: order.id
					}
					this.postRequest(frontOrder.delUserOrder, params).then(res => {
						this.$message.success('删除订单成功！');
						//清空
						this.orderCart = null;
					}).catch(err => {});
				}).catch(err => {});
			},
			//删除设备方法
			delEquip(order,index){
				//如果是设备订单，而且是最后一个设备，就是删除订单
				if(order.has_studio==0 && this.orderEquipArr.length==1){
					//删除订单
					this.util.delUserOrder(order.id).then(res=>{
//						console.log('删除用户订单成功！--------',res);
						this.orderCount=0;
					})
					return;
				}
				
				let start_time=order.start_time;
				let end_time=order.end_time;
				if(order.rent_type==2){
					start_time=order.start_time.split(' ')[0];
					end_time=order.end_time.split(' ')[0];
				}
				let params = {
					order_id: order.id,
					rent_type: order.rent_type,
					start_time: start_time,
					end_time: end_time,
					equip_id: this.orderCart.equip_array[index].equip_id,
					count: 0,
					price: 1
				};
//				console.log('params----',params);
				this.util.editRentOrder(params).then(res=>{
					this.$message.success('删除设备成功！');
					let price=res.price;
					this.orderEquipArr=price.equipPriceArr;
					this.orderCart.price=price.equip_price+price.order_price;
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.listCart {
	position: relative;
	&>i {
		cursor: pointer;
	}
	&:hover {
		.goodList {
			display: block;
		}
	}
	.cartIcon{
		position:relative;
		display: flex;
		justify-content:center;
		align-items:center;
		width: 36px;
		height: 36px;
		box-sizing: border-box;
		background: #fff;
		margin-left: 20px;
		text-align: center;
		line-height: 36px;
		cursor:pointer;
		.point{
			position:absolute;
			top:5px;
			right:5px;
			width:8px;
			height:8px;
			border-radius:4px;
			background:#D4282D;
		}
		.cartPic{
			width:19px;
			height:19px;
		}
	}
	.goodList {
		display: none;
		position: absolute;
		top: 36px;
		right: 0px;
		width: 450px;
		box-sizing: border-box;
		border: 1px solid #eee;
		background: #fff;
		z-index: 100;
		padding: 20px 0px 0px 0px;
		&>p {
			color: #333333;
			font-weight: 600;
			margin-bottom: 20px;
			padding-left: 20px;
		}
		ul {
			max-height: 300px;
			overflow-y: auto;
			padding: 0px 20px;
			li {
				display: flex;
				justify-content: space-between;
				margin-bottom: 12px;
				img {
					border: 1px solid #F0F0F0;
				}
				.leftInfo {
					img {
						margin-right: 10px;
					}
					.el-image{
						width:60px;
						height:60px;
						margin-right:15px;
					}
					display:flex;
					width:300px;
					p {
						width: 300px;
						word-break: break-all;
						word-wrap: break-word;
						text-overflow: ellipsis;
					}
					div {
						white-space: normal;
					}
				}
				.right_price {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
				}
			}
		}
		.cartDetail {
			padding: 10px 20px;
			display: flex;
			justify-content: space-between;
			height: 54px;
			line-height: 54px;
			background: #F0F0F0;
			align-items: center;
			button {
				background: #D4282D;
				color: #fff;
				border-radius:0px;
			}
			span {
				margin-right: 10px;
			}
		}
		.noGood {
			display: flex;
			justify-content: center;
			margin-bottom: 20px
		}
	}
}
</style>