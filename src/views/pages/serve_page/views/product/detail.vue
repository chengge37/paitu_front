<template>
	<div>
		<div class="buy">
			<div class="buy-info">
				<div class="info" v-if="productObj">
					<div class="info-left have">
						<div class="info-title">
							<span>已购项目</span>
						</div>

						<div class="buy-type">
							<div class="buy-item">
								<div class="item-logo">
									<img :src="$qiniuHost+'images/productEdition_'+productObj.id+'.png'" width="48" height="48"/>
								</div>
								<div class="item-info">
									<div class="info-top">{{productObj.editionName}}</div>
									<div class="info-bottom">
										<p>剩余天数：{{productObj.remindDay}}天</p>
										<span>有效期：{{productObj.startTime | strTime2Date}} ～{{productObj.endTime | strTime2Date}}</span>
									</div>
								</div>
								<div class="triangle"></div>
							</div>
						</div>
					</div>

					<!--版本功能模块-->
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
									使用时长：
									<!--<span>1年</span>-->
									（{{productObj.startTime | strTime2Date}} ～{{productObj.endTime | strTime2Date}}）
								</div>
							</div>
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
			
			
			<ul class="productList" v-if="loadHaveProduct">
				<!--购买或者升级产品模块-->
				<li class="buy-info renewContent" v-for="(item,index) in showProduct" :key="index"  v-if="openType!=2">
					<div class="buy-title">*即日起可使用新权限</div>
	
					<div class="line"></div>
	
					<div class="info">
						<div class="info-left">
							<div class="info-title">
								<span>{{openType==0?'开通':'补充差价开通'}}</span>
								<span class="editionType">{{selectProduct.edition}}</span>
							</div>
	
							<div class="buy-type">
								<div class="buy-item">
									<div class="item-logo">
										<img :src="$qiniuHost+'images/productEdition_'+selectProduct.id+'.png'" width="48" height="48"/>
									</div>
									<div class="item-info">
										<!--<div class="info-top">￥{{selectProduct.price}}</div>-->
										<div class="info-top" v-if="selectProductId!=33">¥{{payPrice}}元/{{chargeType==0?'月':'年'}}</div>
										<div class="info-top" v-else>¥{{payPrice}}元</div>
										<div class="info-bottom">
											<span>原价</span>
											<s>{{selectProduct.price*2}}元</s>
											<span>，已经抵扣{{selectProduct.price}}元</span>
										</div>
									</div>
									<!--<div class="item-price">¥{{payPrice}}元/{{chargeType==0?'月':'年'}}</div>-->
									<!--<div class="item-price">￥{{item.price}}元/月</div>-->
									<div class="triangle"></div>
								</div>
							</div>
						</div>
	
						<div class="info-right">
							<div class="acquire">功能</div>
							<div class='haveFun'>
								<div class="acquire-item" v-for="(subItem,index2) in selectProduct.funs" :key="index2">
									<i class="el-icon-check"></i>
									<div class="acquire-txt">{{subItem}}</div>
								</div>
								<div class="acquire-item">
									<i class="el-icon-check"></i>
									<div class="acquire-txt">
										使用时长：
										<!--<span>1年</span>-->
										<span v-if="item.is_forever!=1" style="color:#333;">（{{timePeriod[0]}} ~ {{timePeriod[1]}}）</span>
										<span v-else  style="color:#333;">永久有效</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
				
				
				<!--立即续费模块-->
				<li class="buy-info renewContent" v-if="openType==2">
					<div class="buy-title">*即日起可使用新权限</div>
	
					<div class="line"></div>
	
					<div class="info">
						<div class="info-left">
							<div class="info-title">
								<span class='editionTitle'>「{{productObj.editionName}}」续费</span>
								<span class="editionType">1{{chargeType==0?'月':'年'}}</span>
							</div>
							
							<div class="time">
								<div class="content">
									<span>到期：</span>
									<p>{{overDate}}</p>
								</div>
							</div>
	
							<div class="buy-type">
								<div class="buy-item">
									<div class="item-logo">
										<img :src="$qiniuHost+'images/productEdition_'+productObj.id+'.png'" width="48" height="48"/>
									</div>
									<div class="item-info">
										<div class="info-top">{{productObj.editionName}}</div>
										<div class="info-bottom">
											<span>原价</span>
											<s>{{payPrice*2}}元</s>
										</div>
									</div>
									<!--<div class="price">¥{{payPrice}}元/{{chargeType==0?'月':'年'}}</div>-->
									<div class="info-top" v-if="selectProductId!=33">¥{{payPrice}}元/{{chargeType==0?'月':'年'}}</div>
									<div class="info-top" v-else>¥{{payPrice}}元</div>
									<div class="triangle"></div>
								</div>
							</div>
						</div>
	
						<!--版本功能模块-->
						<div class="info-right">
							<div class="acquire">功能</div>
							<div class="haveFun">
								<div class="acquire-item" v-for="(item,index) in productObj.funs" :key="index">
									<i class="el-icon-check"></i>
									<div class="acquire-txt">{{item}}</div>
								</div>
								<div class="acquire-item">
									<i class="el-icon-check"></i>
									<div class="acquire-txt">
										使用时长：
										（{{timePeriod[0]}} ~ {{overDate}}）
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
				
				<!--自定账号模块-->
				<li class="buy-info account" v-if="showAccount">
					<div class="buy-title">*自定义账号必须多于5个账号</div>
	
					<div class="line"></div>
	
					<div class="info">
						<div class="info-left">
							<div class="info-title">
								<span>请输入账号数量</span>
							</div>
	
							<el-input v-number :disabled="openType==2" v-model="accountNum" v-on:input="changeAccountNum" :placeholder="'请输入'+limitAccount+'或以上的正整数'"></el-input>
						</div>
	
					</div>
				</li>
				
			</ul>
			
			<div class="pay">
				<div class="money">
					付款金额：
					<span>{{payPrice}}元</span>
				</div>
	
				<div class="original">
					原价
					<s>{{payPrice*2}}</s>
					元，已经抵扣{{payPrice}}元
				</div>
				<!--<div class="pay-switch" v-if="productObj && productObj.is_forever!=1">-->
				<div class="pay-switch" v-if="selectProductId!=33 && (!productObj || (productObj && productObj.is_forever!=1))">
					<el-tooltip  v-if="productObj && productObj.remindDay>=30" content="产品剩余天数大于30天只能按年付费" placement="top" effect="light">
						<el-switch  :disabled="productObj.remindDay>=30" v-model="timeType" active-color="#999999" inactive-color="#FF9500" active-text="按年付费" inactive-text="按月付费">
						</el-switch>
					</el-tooltip>
					<el-switch  @change="changeTime" v-else v-model="timeType" active-color="#999999" inactive-color="#FF9500" active-text="按年付费" inactive-text="按月付费">
					</el-switch>
				</div>
				<div class="operate">
					<el-button @click="back">返回</el-button>
					<div class="payment" @click="toPay">去付款</div>
				</div>
			</div>

		</div>

		<!--支付模块-->
		<pay :openPay.sync="openPay" v-if="openPay" :payOption.sync="payOption" @closed="closePay"></pay>

	</div>
</template>

<script>
	import pay from "FrontComponents/pay";
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				openPay:false, //是否显示支付窗口模块
				showProduct:[],
				timePeriod:[],
				productObj:null, //已购买产品信息
				userProduct:null,
				selectProductId:'',
				chargeType:1,  //收费类型 0/按月 1/按年
				payPrice:'',    //需要支付的金额
				timeType:false,  //时间类型   false/按月  true/按年
				openType:0,  //开通类型  0/新开通  1/升级 2/续费
				showAccount:false,  //是否显示自定账号模块
				accountNum:'',  //账号数量
				selectProduct:{},  //选择的产品
				overDate:'',   //到期时间
				remindPrice:0,  //剩余价格
				loadHaveProduct:false,
				limitAccount:6,   //最低账号个数
			}
		},

		computed: {
			...mapGetters(["user_data"])
		},
		components: {
			pay
		},

		created() {
			//获取要购买的产品编号
			console.log('this.$route.query',this.$route.query,JSON.stringify(this.$route.query));
			if (JSON.stringify(this.$route.query)!='{}') {
				this.selectProductId=this.$route.query.id;
				this.openType=this.$route.query.type;
				this.getUserProduct().then(res=>{
					this.productObj=res;
					this.loadHaveProduct=true;
					//获取所有产品列表
					this.getAllProduct();
					console.log('productObj------',this.productObj);
					if(this.productObj && this.productObj.remindDay>=30){
						this.timeType=true;
						this.chargeType=1;
					}else{
						this.chargeType=0;
					}
					
					//如果是多账号，获取账号个数
					if(this.productObj){
						if([12,22,23].includes(parseInt(this.productObj.id))){
							this.limitAccount=this.productObj.num;
						}
					}
					console.log('limitAccount-------',this.limitAccount);
					//获取时间段
					this.timePeriod=this.util.getTimePeriod(this.chargeType);
					
					//如果是开通或者升级
					if(this.openType!=2){
						this.selectProduct=JSON.parse(this.$route.query.selectProduct)
					}
					//如果是续费
					else{
						this.accountNum=this.productObj.num;
					}
					
					if(this.openType!=0){
						this.overDate=this.util.getAfterDate(this.productObj.endTime.split(' ')[0],this.chargeType==0?'month':'year');
					}
					
				})

			}
			
		},
		watch:{
			
		},
		mounted() {
			
		},

		methods: {
			//切换时间方法
			changeTime(val){
				let type='';
				if(this.timeType){
					this.chargeType=1;
					type='year';
				}else{
					this.chargeType=0;
					type='month';
				}
				if(this.productObj && this.openType==2){
					this.overDate=this.util.getAfterDate(this.productObj.endTime.split(' ')[0],type);
				}
				this.timePeriod=this.util.getTimePeriod(this.chargeType);
				this.calProductPrice();
			},
			//关闭支付窗口回调函数
			closePay(){
				this.openPay=false;
			},
			//返回按钮
			back(){
				this.util.back(this);
			},
			//去支付功能
			toPay() {

				if(!this.checkAccount(1)) return;

				this.productPay().then(res=>{
					console.log('toPay---------',res);
					this.util.toPayPage(res.id);
					//测试支付功能，后面删除
//					this.util.testOrder(res.id);
				});
				
			},
			
			//检查账号数量是否符合,type:0/不显示提示  1/显示提示
			checkAccount(type){
				if(this.showAccount && !this.accountNum){
					if(type==1){
						this.$message.warning('请输入账号数量！');
					}
					return false;
				}else{
					let limitAccount=parseInt(this.limitAccount);
					let accountNum=this.accountNum?parseInt(this.accountNum):0;
					if(this.showAccount && limitAccount>6){
						if(accountNum<limitAccount){
							if(type==1){
								this.$message.warning('请输入'+limitAccount+'或以上的正整数账号数!');
							}
							
							return false;
						}
					}
					if(this.showAccount && accountNum<6){
						if(type==1){
							this.$message.warning('请输入6或以上的正整数账号数！');
						}
						return false;
					}
				}
				return true;
			},
			
			//产品下单方法
			productPay() {
				let id=parseInt(this.selectProductId);
				let num=this.util.getNumByProductId(id);
				if(this.accountNum>5){
					num=this.accountNum;
				}
				let params = {
					pid: id,
					time: this.chargeType+1,
					num:num
				}
//				console.log('this.productObj----',this.productObj,this.selectProduct);
				if(this.selectProduct.is_forever==1){
					params.time=3;
				}
				console.log('params----', params);
				return new Promise((resolve, reject) => {
					this.util.addProduct(params).then(res => {
						console.log('addProduct-------', res);
						resolve(res);
					})
				})
			},
			
			//获取商家开通的功能列表
			getUserProduct(){
				return new Promise((resolve,reject)=>{
					this.util.userProduct().then(res=>{
						resolve(res);
					})
				})
				
			},
			
			//修改账号数量方法
			changeAccountNum(){
				console.log('changeAccountNum-----',this.accountNum);
				this.calProductPrice();
			},

			//获取所有产品列表
			getAllProduct(){
				let params={
					page:1,
					page_size:10000,
					type:1,
				}
				this.util.getProductList(params).then(res=>{
					console.log('getProductList----',this.selectProductId,res);
					this.showProduct=res.rows.filter((item,index)=>{
						return item.id==this.selectProductId;
					})
					console.log('this.showProduct-------',this.showProduct);
					//只显示用户选中的产品
					this.showProduct=this.util.changeEditionName(this.showProduct);
					//如果当前产品包含自定义账号，则显示输入多账号模块输入框
					if([13,22,23].includes(parseInt(this.showProduct[0].id))){
						this.showAccount=true;
					}
					
					//计算差价
					this.calProductPrice();

				})
			},
			
			//产品下单方法(计算价格)
			calProductPrice() {
				if(this.openType!=2){
					this.showProduct.forEach((item,index)=>{
						let id=parseInt(item.id);
						let params;
						let num=this.util.getNumByProductId(id);
						if(this.accountNum>5){
							num=this.accountNum;
						}
						params={
							pid:id,
							time:this.timeType?2:1,
							num:num
						}
						console.log('params', params);
						this.util.addProduct(params).then(res => {
							this.showProduct.forEach((item2,index2)=>{
								if(res.pid==item2.id){
									item2.price=res.price;
								}
							})
							this.payPrice=res.price;
							console.log('showProduct-----------',this.showProduct);
						})
					})
				}
				//续费价格
				else{
					let id=parseInt(this.productObj.id);
					let params={
						pid:id,
						time:this.timeType?2:1,
						num:this.productObj.num
					}
					console.log('params-----',params);
					this.util.addProduct(params).then(res => {
						this.payPrice=res.price;
						console.log('this.payPrice------------',this.payPrice);
					})
				}
				
			},
			

		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import './styles/index.scss';
	.operate{
		display:flex;
		button{
			margin-right:10px;
		}
	}
	.productList{
		li{
			width:100%;
		}
	}
	.account{
		.info{
			padding-top:0px;
			.info-left{
				border:none;
				.el-input{
					margin-top:16px;
					margin-bottom:20px;
				}
			}
		}
	}
	.renewContent{
		.buy-item{
			border-color:#FF9500!important;
			.price{
				font-size:20px;
				color:#FF9500;
				margin-left:20px;
			}
		}
		.editionTitle{
			font-weight:600;
			color:#333!important;
		}
		.editionType{
			color:#FF9500!important;
		}
		.time{
			width:355px;
			height:60px;
			background:#333333;
			color:#FF9500;
			padding:16px 0px 16px 20px;
			margin-top:20px;
			.content{
				display:flex;
				align-items:center;
			}
			p{
				font-size:20px;
				margin-left:15px;
			}
		}
	}
</style>