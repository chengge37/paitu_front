<template>
	<div class="selectGoods">
		<!--<div class="title" v-if="detail!=1">-->
		<div class="title">
			<p>{{showTitle}}</p>
		</div>
		<ul v-if="list.length>0 && !loading">
			<li v-for="(item,index) in list" class="card-hover" :key="index" :class="{'detail':detail==1}">
				<div class="autoImg" style="width:232px;height:232px;">
					<img :src="util.picExplode(item.pic,config.defaultEquipPic)" class="cursor" width="232" height='232' :onerror="util.errorPic"  @click="toDetail(item)"/>
				</div>
				
				<div class="info">
					<p class="name word-hover cursor" @click="toDetail(item)">{{item.adv.custom_desc||item.adv.name}}</p>
					<div>
						<p class="price" v-if="type==0">
							<span>¥{{item.adv.priceWorkDayWorkTimePerHour}}</span> /小时
						</p>
						<p class="price" v-if="type==1">
							<!--<span>¥{{item.adv.price}}</span> /{{item.adv.unit?item.adv.unit:'小时'}}-->
							<span v-if="item.adv.only_rent_day==0">¥{{item.adv.hourPrice[0].price}}</span>
							<span v-else>¥{{item.adv.price_day_workday_in}}</span>
							{{item.adv.only_rent_day==0?'/小时':'/天'}}
						</p>
						<p class="sales">
							销量:
							<span class="count">{{item.adv.total}}</span> 次
						</p>
					</div>
					<div class="address">{{item.adv.address?item.adv.address:'该商家未填写地址'}}</div>
				</div>
			</li>
		</ul> 
		<ul class="noData" v-if="list.length==0 && !loading">
			暂无推荐
		</ul>
		
	</div>
</template>

<script>
	import { frontEquip,frontStudio } from "@config/api.js";
	export default {
		props:{
			type:{
				//type:0/影棚列表（默认）  1/设备列表，2/模特列表，3/服务，4/拼拍列表，5/助理列表
				type:String,
				default:'0'
			},
			detail:{
				//0/列表样式  1/详情样式
				type:String,
				default:'0'
			}
		},
		data() {
			return {
				list:[],
				loading:true,
				showTitle:'',  //显示的title
			};
		},
		created(){
			if(this.type==0){
				//获取影棚列表信息
				this.getStudioList();
			}else{
				//获取设备列表信息
				this.getEquipList();
			}
			switch(parseInt(this.type)){
				case 0:
					this.showTitle='精选影棚';
					break;
				case 1:
					this.showTitle='精选设备';
					break;
				case 2:
					this.showTitle='精选模特';
					break;
				case 3:
					this.showTitle='精选服务';
					break;
				case 4:
					this.showTitle='精选拼拍';
					break;
				case 5:
					this.showTitle='精选助理';
					break;
			}
			
		},
		mounted() {
			
		},
		methods: {
			toDetail(item){
				let params={
					id:item.id,
					rel_id:item.rel_id,
					type:parseInt(this.type)+1
				}
				console.log('toDetail---------------',params);
				this.util.userClickAdv(params).then(res=>{
					console.log('userClickAdv-----------',res);
				})
				
				if(this.type==0){
					
			      this.util.toStudioDetail(item.adv.id)
				}else{
				  this.util.toEquipDetail(item.adv.id);
				}
			},
			//获取影棚列表
			getStudioList(){
				let params={
					type:1,
					model:0,
					position:0,
					page_size:5,
				}
				console.log('params-----',params);
				this.util.ajaxGetAdv(params).then(res=>{
					console.log('ajaxGetAdv----',res);
					if(!this.util.isEmpty(res)){
						this.list=res.rows;
					}
					this.loading=false;
				}).catch(err => {
                });
			},
			//获取设备列表
			getEquipList(){
				let params={
					type:2,
					model:0,
					position:0,
					page_size:5,
				}
				console.log('params-----',params);
				this.util.ajaxGetAdv(params).then(res=>{
					console.log('ajaxGetAdv----',res);
					if(!this.util.isEmpty(res)){
						this.list=res.rows;
					}
					this.loading=false;
				}).catch(err => {
                });
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.selectGoods {
		width: 244px;
		.title {
			height: 40px;
			background: #7C6AFF;
			text-align: center;
			line-height: 40px;
			color: #fff;
		}
		ul {
			li {
				background: #fff;
				padding: 10px 5px;
				&.detail{
					border:1px solid #F0F0F0;
					padding-bottom:26px;
					margin-bottom:30px;
				}
				.name {
					font-weight: 600;
					font-family: PingFangSC-Semibold;
					padding: 10px 0px;
				}
				.info{
					padding:0px 15px;
					&>div{
						display: flex;
						justify-content: space-between;
					}
					
				}
				.price {
					color: #999;
					font-size: 12px;
					span {
						color: #D4282D;
						font-weight: bold;
						font-size: 16px;
					}
				}
				.sales {
					font-size: 12px;
					color: #999;
					span{
						margin-left:5px;
					}
				}
				.address {
					font-size: 12px;
					color: #666;
					padding-top: 10px;
					border-top: 1px solid #D8D8D8;
					margin-top: 10px;
				}
			}
		}
	}
	.noData{
		display:flex;
		justify-content:center;
		padding:30px 0px;
		background:#fff;
	}
</style>