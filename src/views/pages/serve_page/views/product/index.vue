<!--  -->
<template>
	<div>
		<div class="buy">
			<!--试用版本模块-->
			<div class="buy-info">
				<div class="info" v-if="freeProduct&&!productObj">
					<div class="info-left have">
						<div class="info-title">
							<span>试用产品</span>
							<!--<el-button  @click="toDetai(freeProduct.id,2)" class="renew">立即续费</el-button>-->
						</div>

						<div class="buy-type">
							<div class="buy-item">
								<div class="item-logo">
									<img :src="$qiniuHost+'images/productEdition_'+freeProduct.id+'.png'" width="48" height="48"/>
								</div>
								<div class="item-info">
									<!-- <div class="info-top">{{freeProduct.editionName}}</div> -->
									<div class="info-top">{{freeProduct.name}}</div>
									<div class="info-bottom">
										<!-- <p>剩余天数：{{freeProduct.isOverTime?'已过期':`${freeProduct.remindDay}天`}}</p> -->
										<span>有效期：永久有效</span>
										<!-- <span>有效期：{{freeProduct.startTime | strTime2Date}} ～{{freeProduct.endTime | strTime2Date}}</span> -->
									</div>
								</div>
								<div class="triangle"></div>
							</div>
						</div>
					</div>

					<!--版本功能模块-->
					<div class="info-right">
						<div class="acquire">已有功能</div>
						<div class='haveFun'>
							<div class="acquire-item" v-for="(item,index) in freeProduct.funs" :key="index">
								<i class="el-icon-check"></i>
								<div class="acquire-txt">{{item}}</div>
							</div>
							<div class="acquire-item">
								<i class="el-icon-check"></i>
								<!-- <div class="acquire-txt">
									有效时间：
									({{freeProduct.startTime | strTime2Date}} ～{{freeProduct.endTime | strTime2Date}})
								</div> -->
								<div class="acquire-txt">
									有效时间：
									永久有效
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			
			
			<!--已购买项目模块-->
			<div class="buy-info">
				<div class="info" v-if="productObj">
					<div class="info-left have">
						<div class="info-title">
							<span>已购项目</span>
							<el-button  @click="toDetai(productObj.id,2)" class="renew" v-if="productObj.is_forever!=1">立即续费</el-button>
						</div>

						<div class="buy-type">
							<div class="buy-item">
								<div class="item-logo">
									<img :src="$qiniuHost+'images/productEdition_'+productObj.id+'.png'" width="48" height="48"/>
								</div>
								<div class="item-info">
									<div class="info-top">{{productObj.editionName}}</div>
									<div class="info-bottom">
										<p>剩余天数：{{productObj.isOverTime?'已过期':`${productObj.remindDay}天`}}</p>
										<span>有效期：{{productObj.startTime | strTime2Date}} ～{{productObj.endTime | strTime2Date}}</span>
									</div>
								</div>
								<div class="triangle"></div>
							</div>
						</div>
					</div>

					<!--版本功能模块-->
					<div class="productHistory">
						<div class="info-right">
							<div class="acquire">已有功能</div>
							<div class="haveFun">
								<div class="acquire-item" v-for="(item,index) in productObj.funs" :key="index">
									<i class="el-icon-check"></i>
									<div class="acquire-txt">{{item}}</div>
								</div>
								<div class="acquire-item">
								<i class="el-icon-check"></i>
								<div class="acquire-txt">
									有效时间：
									<!--<span>1年</span>-->
									({{productObj.startTime | strTime2Date}} ～{{productObj.endTime | strTime2Date}})
								</div>
							</div>
							</div>
							
						</div>
						
						<!--购买记录模块-->
						<div class="history">
							<el-button type="text" @click="openBuyHistory">购买记录</el-button>
						</div>
					</div>
					
				</div>
				
				<div class="info" v-else>
					<div class="info-left have" style="border:none">
						<div class="info-title">
							<span>已购项目</span>
						</div>

						<div class="buy-type">
							暂无购买产品
						</div>
					</div>

				</div>
				
			</div>
			
			
			<ul class="productList">
				<li class="buy-info" v-for="(item,index) in showProduct" :key="index">
					<div class="buy-title">*即日起可使用新权限</div>
	
					<div class="line"></div>
	
					<div class="info">
						<div class="info-left">
							<div class="info-title">
								<span>{{productObj?titles[1]:titles[0]}}</span>
								<span class="editionType">{{item.edition}}</span>
							</div>
	
							<div class="buy-type">
								<div class="buy-item" @click="toDetai(item.id,1,item)">
									<div class="item-logo">
										<img :src="$qiniuHost+'images/productEdition_'+item.id+'.png'" width="48" height="48"/>
									</div>
									<div class="item-info">
										<div class="info-top">
											￥{{item.price}}元{{item.is_forever!=1?((productObj&&productObj.remindDay>=30)?'/年':'/月'):''}}
										</div>
										<div class="info-bottom">
											<span>原价</span>
											<s>{{item.price*2}}元</s>
											<span>，已经抵扣{{item.price}}元</span>
										</div>
									</div>
									<!--<div class="item-price">￥{{item.price}}元/月</div>-->
									<div class="triangle"></div>
								</div>
							</div>
						</div>
	
						<div class="info-right">
							<div class="acquire">功能</div>
							<div class="haveFun">
								<div class="acquire-item" v-for="(subItem,index2) in item.funs" :key="index2">
									<i class="el-icon-check"></i>
									<div class="acquire-txt">
										{{subItem}}
										<!--<span class="newAdd">新增</span>-->
									</div>
								</div>
								<div class="acquire-item">
									<i class="el-icon-check"></i>
									<div class="acquire-txt" v-if="productObj">
										有效时间至：
										<span style="color:#333;">{{item.is_forever!=1?productObj.lastTime:'永久有效'}}</span>
									</div>
									<div class="acquire-txt" v-else>
										有效时间至：
										<span style="color:#333;">{{item.is_forever!=1?timePeriodMonth[1]:'永久有效'}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>

		</div>
		
		<!--购买记录模块-->
		<buy-history :openDialog.sync="showBuyHistory" @close="closeHistory"></buy-history>
		
		<!--<button @click="testDelFun">删除产品(测试)</button>-->

	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import buyHistory from "FrontComponents/buyHistory"
	export default {
		data() {
			return {
				showBuyHistory:false,  //是否显示购买记录对话框
				titles:['开通','补充差价开通'],
				nextMonthDay:0,  //下个月有的天数
				showProduct:[],
				timePeriod:[],
				productObj:null, //已购买产品信息
				freeProduct:null,  //用户使用版本信息
				canShowList:[], //可以显示的升级产品列表id
				endTime:'',    //有效时间
				timePeriodMonth:this.util.getTimePeriod(0),
				timeType:0,   //0:月  1：年
			}
		},

		computed: {
			...mapGetters(["user_data"])
		},
		components: {buyHistory},

		created() {
			
		},
		mounted() {
			//获取商家开通的功能列表
			this.getUserProduct().then(res=>{
				//获取所有产品列表
				this.getAllProduct();
			});
			
			//获取商家是否有试用版本信息
			this.getUserFreeProduct();
			
			//获取时间段
			this.timePeriod=this.util.getTimePeriod(1);
		},

		methods: {
			//测试删除产品方法（测试用，后面需要删除)
			testDelFun(){
				this.getRequest('/product/delfun').then(res => {
					console.log('测试删除产品成功！',res);
				}).catch(err => {});
			},
			openBuyHistory(){
				console.log('showBuyHistory---------');
				this.showBuyHistory=true;
			},
			//关闭购买记录方法
			closeHistory(val){
				this.showBuyHistory=false;
			},
			//获取商家开通的功能列表
			getUserProduct(){
				return new Promise((resolve,reject)=>{
					this.util.userProduct().then(res=>{
						console.log('getUserProduct----------',res);
						this.productObj=res;
						resolve(true);
					})
					
				})
			},
			
			//获取商家试用的功能列表
			getUserFreeProduct(){
				this.freeProduct=this.util.productName[0]
				// this.util.userFreeProduct().then(res=>{
				// 	this.freeProduct=res;
				// })
			},
			
			//跳转到购买详情页面,type:  //type 0/新开通  1/升级 2/续费
			toDetai(id,type,item){
				let flag;
				if(type==2){
					flag=type;
				}else{
					if(this.productObj){
						flag=1;
					}else{
						flag=0;
					}
				}
				let params = {id: id,type:flag};  
				console.log('toDetai----------',params);
				if(flag!=2){
					params.selectProduct=JSON.stringify(item);
				}
				let path="/serve/product_set/detail";
		      	this.$router.push({ path:path, query: params });
			},
		
			//获取所有产品列表
			getAllProduct(){
				let params={
					page:1,
					page_size:10000,
					type:1,
				}
				this.util.getProductList(params).then(res=>{
					console.log('getProductList0-0000000000',res);
					//判断用户是否已经购买项目而且是不是试用版本
					if(this.productObj  && this.productObj.is_temp!=0){
						this.canShowList=this.util.showProductById(this.productObj.id);
						if(this.canShowList.length==0){
							this.showProduct=[];
						}else{
							res.rows.forEach((item,index)=>{
								if(this.canShowList.includes(parseInt(item.id))){
									this.showProduct.push(item);
								}
							})
						}
					}
					//如果没有购买过项目
					else{
						this.showProduct=res.rows;
					}
					
					this.showProduct=this.util.changeEditionName(this.showProduct);
					console.log('showProduct------',this.showProduct);
					//下单获取产品差价
					this.productPay();
				})
			},
			
			//产品下单方法
			productPay() {
				if(this.productObj&&this.productObj.remindDay>=30){
					this.timeType=1;
				}
				this.showProduct.forEach((item,index)=>{
					let id=parseInt(item.id);
					let num=this.util.getNumByProductId(id);
					let params;
					params={
						pid:id,
						time:this.timeType+1,
						num:num
					}
					if(item.is_forever==1){
						params.time=3;
					}
					console.log('params', params);
					this.util.addProduct(params).then(res => {
						this.showProduct.forEach((item2,index2)=>{
							if(res.pid==item2.id){
								item2.price=res.price;
							}
						})
						console.log('showProduct-----------',this.showProduct);
					})
				})
				
			}
			

		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './styles/index.scss';
.renew{
	background:#D0021B;
	border-radius:0px;
	color:#fff;
	margin-left:10px;
	padding:10px 15px;
}
.productHistory{
	display:flex;
	justify-content: space-between;
	flex:1;
}
</style>