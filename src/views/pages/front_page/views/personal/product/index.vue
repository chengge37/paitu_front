<template>
	<div>
		<div class="buy">
			<div class="buy-info">
				<div class="info" v-if="productObj">
					<div class="info-left have">
						<div class="info-title">
							<span>已购项目</span>
							<el-button @click="toDetai(productObj.id,2)" class="renew">立即续费</el-button>
							<el-button @click="toDetai(productObj.id,1)" class="renew">立即升级</el-button>
						</div>

						<div class="buy-type">
							<div class="buy-item">
								<div class="item-logo">
									<img :src="$qiniuHost+'images/productEdition_'+productObj.id+'.png'" width="48" height="48" />
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

			<ul class="productList" v-if="showList && productObj && (productObj.id==11 || productObj.id==12)">
				<!--升级模块-->
				<li class="buy-info upgradeContent" @click="changeUpgrade(item,index)" :class="{'selected':upgradeType==index}" v-for="(item,index) in showProduct" :key="index" v-if="openType==1">
					<div class="buy-title">*即日起可使用新权限</div>

					<div class="line"></div>

					<div class="info">
						<div class="info-left">
							<div class="info-title">
								<span>{{productObj?titles[1]:titles[0]}}</span>
								<span class="editionType">{{item.edition}}</span>
							</div>

							<div class="buy-type">
								<div class="buy-item">
									<div class="item-logo">
										<img :src="$qiniuHost+'images/productEdition_'+item.id+'.png'" width="48" height="48" />
									</div>
									<div class="item-info">
										<div class="info-top">￥{{item.price}}元/{{(productObj&&productObj.remindDay>=30)?'年':'月'}}</div>
										<div class="info-bottom">
											<span>原价</span>
											<s>{{item.price*2}}元</s>
											<span>，已经抵扣{{item.price}}元</span>
										</div>
									</div>
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
									</div>
								</div>
								<div class="acquire-item">
									<i class="el-icon-check"></i>
									<div class="acquire-txt" v-if="productObj">
										有效时间： 
										<span style="color:#333;">{{item.is_forever!=1?productObj.lastTime:'永久有效'}}</span>
										<!--<span>（{{productObj.time | time2Date}} ~ {{productObj.lastTime}}）</span>-->
									</div>
									<div class="acquire-txt" v-else>
										有效时间： 
										<!--（{{timePeriodMonth[0]}} ~ {{timePeriodMonth[1]}}）-->
										<span style="color:#333;">{{item.is_forever!=1?timePeriodMonth[1]:'永久有效'}}</span>
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
										<img :src="$qiniuHost+'images/productEdition_'+productObj.id+'.png'" width="48" height="48" />
									</div>
									<div class="item-info">
										<div class="info-top">{{productObj.editionName}}</div>
										<div class="info-bottom">
											<span>原价</span>
											<s>{{payPrice*2}}元</s>
										</div>
									</div>
									<div class="price">¥{{payPrice}}元/{{chargeType==0?'月':'年'}}</div>
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
										使用时长： （{{timePeriod[0]}} ~ {{overDate}}）
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>

				<!--自定义账号模块-->
				<li class="buy-info account" v-if="showAccount">
					<div class="buy-title">*自定义账号必须多于5个账号</div>

					<div class="line"></div>

					<div class="info">
						<div class="info-left" style="border:none">
							<div class="info-title" style="margin-bottom:10px;">
								<span>请输入账号数量</span>
							</div>

							<el-input :disabled="openType==2" v-model="accountNum" v-on:input="changeAccountNum" :placeholder="'请输入'+limitAccount+'或以上的正整数'"></el-input>
						</div>

					</div>
				</li>

			</ul>

			<div class="pay" v-if="showList && productObj && (productObj.id==11 || productObj.id==12)">
				<div class="money">
					付款金额：
					<span>{{payPrice}}元</span>
				</div>
				<div class="original">
					原价
					<s>{{payPrice*2}}</s> 元，已经抵扣{{payPrice}}元
				</div>
				<div class="pay-switch">
					<el-tooltip v-if="productObj.remindDay>30" content="产品剩余天数大于30天只能按年付费" placement="top" effect="light">
						<el-switch @change="changeTime" :disabled="productObj.remindDay>30" v-model="timeType" active-color="#999999" inactive-color="#FF9500" active-text="按年付费" inactive-text="按月付费">
						</el-switch>
					</el-tooltip>
					<el-switch @change="changeTime" v-else v-model="timeType" active-color="#999999" inactive-color="#FF9500" active-text="按年付费" inactive-text="按月付费">
					</el-switch>
				</div>
				<div class="operate">
					<div class="payment" @click="toPay">去付款</div>
				</div>
			</div>

		</div>

		<!--购买记录模块-->
		<buy-history :openDialog.sync="showBuyHistory" @close="closeHistory"></buy-history>

	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import buyHistory from "FrontComponents/buyHistory"
	export default {
		data() {
			return {
				accountNum: '', //账号数量
				remindDay: 0,
				timeType: false, //时间类型   false/按月  true/按年
				payPrice: 0,
				chargeType: 0, //收费类型 0/按月 1/按年
				openType: 1, //开通类型  0/新开通  1/升级 2/续费
				showAccount: false, //是否显示自定账号模块
				showBuyHistory: false, //是否显示购买记录对话框
				titles: ['开通', '补充差价开通'],
				nextMonthDay: 0, //下个月有的天数
				showProduct: [],
				timePeriod: [],
				productObj: null, //已购买产品信息
				allProduct: [], //全部产品信息
				canShowList: [], //可以显示的升级产品列表id
				selectProduct: {}, //选择的产品
				endTime: '', //有效时间
				overDate: '', //到期时间
				timePeriodMonth: this.util.getTimePeriod(0),
				showList: false,
				limitAccount: 6, //最低账号个数
				upgradeType:0,  //选择升级的产品下标
			}
		},
		watch: {

		},
		computed: {
			...mapGetters(["user_data"])
		},
		components: {
			buyHistory
		},

		created() {

		},
		mounted() {
			//获取商家开通的功能列表
			this.getUserProduct().then(res => {
				console.log('mounted===========', this.productObj);
				//如果没有购买产品，不显示列表
				if(!this.productObj) return;
				//获取所有产品列表
				this.getAllProduct();
			});

			//获取时间段
			this.timePeriod = this.util.getTimePeriod(1);
		},

		methods: {
			//切换升级的产品
			changeUpgrade(item,index){
				this.upgradeType=index;
				this.calProductPrice();
			},
			
			//切换时间方法
			changeTime(val) {
				let type = '';
				if(this.timeType) {
					this.chargeType = 1;
					type = 'year';
				} else {
					this.chargeType = 0;
					type = 'month';
				}
				if(this.productObj && this.openType == 2) {
					this.overDate = this.util.getAfterDate(this.productObj.endTime.split(' ')[0], type);
				}
				this.timePeriod = this.util.getTimePeriod(this.chargeType);
				this.calProductPrice();
			},
			//修改账号数量方法
			changeAccountNum() {
				this.calProductPrice();
			},
			//去支付功能
			toPay() {
				if(this.showAccount && !this.accountNum) {
					this.$message.warning('请输入账号数量！');
					return;
				} else {
					let limitAccount = parseInt(this.limitAccount);
					let accountNum = this.accountNum ? parseInt(this.accountNum) : 0;
					if(this.showAccount && limitAccount > 6) {
						if(accountNum < limitAccount) {
							this.$message.warning('请输入' + limitAccount + '或以上的正整数账号数!');
							return;
						}
					}
					if(this.showAccount && accountNum < 6) {
						this.$message.warning('请输入6或以上的正整数账号数！');
						return;
					}
					this.productPay().then(res => {
						console.log('toPay---------', res);
						this.util.toPayPage(res.id);
						//测试支付功能，后面删除
						//						this.util.testOrder(res.id);
					});

				}
			},

			//产品下单方法
			productPay() {
				let id
				if(this.openType == 1) {
					id = parseInt(this.showProduct[0].id);
				} else {
					id = parseInt(this.productObj.id);
				}

				let num = this.util.getNumByProductId(id);
				if([12, 22, 23].includes(id)) {
					if(this.accountNum > 5) {
						num = this.accountNum;
					}
				}
				let params = {
					pid: id,
					time: this.chargeType + 1,
					num: num
				}
				if(productObj.is_forever==1){
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
			openBuyHistory() {
				console.log('showBuyHistory---------');
				this.showBuyHistory = true;
			},
			//关闭购买记录方法
			closeHistory(val) {
				this.showBuyHistory = false;
			},
			//获取商家开通的功能列表
			getUserProduct() {
				return new Promise((resolve, reject) => {
					this.util.userProduct().then(res => {
						this.productObj = res;
						this.loadHaveProduct = true;
						console.log('productObj------', this.productObj);
						if(this.productObj && this.productObj.remindDay >= 30) {
							this.timeType = true;
							this.chargeType = 1;
						} else {
							this.chargeType = 0;
						}
						//如果是多账号，获取账号个数
						if(this.productObj) {
							if([12, 22, 23].includes(parseInt(this.productObj.id))) {
								this.limitAccount = this.productObj.num;
							}
						}
						//获取时间段
						this.timePeriod = this.util.getTimePeriod(this.chargeType);
						if(this.productObj) {
							this.overDate = this.util.getAfterDate(this.productObj.endTime.split(' ')[0], this.chargeType == 0 ? 'month' : 'year');
						}

						resolve(true);
					})
				})

			},

			//跳转到购买详情页面,type:  //type 0/新开通  1/升级 2/续费
			toDetai(id, type) {
				//				console.log('this.user_data-----',this.user_data,id);
				//测试代码
				//				this.user_data.role=2;
				let temp = true;
				//判断用户是否未租赁商
				//				if(this.user_data.role!=1){
				if((id == 11 || id == 12)) {
					this.showList = true;
					temp = false;
				}
				//续费
				if(type == 2) {
					this.openType = 2;
					if(this.productObj.remindDay >= 30) {
						this.timeType = true;
						this.chargeType = 1;
					} else {
						this.chargeType = 0;
					}
					if(id == 12) {
						this.showAccount = true;
					} else {
						this.showAccount = false;
					}
					this.accountNum = this.productObj.num;
				}
				//升级
				if(type == 1) {

					this.openType = 1;
					this.showAccount = true;
					this.accountNum = '';
					if(id == 12) {
						let obj = this.allProduct.filter((item, index) => {
							return item.id == 12;
						})
						if(this.showProduct.length == 0) {
							this.showProduct.push(obj[0]);
						}
						console.log('showProduct----------', this.showProduct);
					} else {

					}
				}
				this.calProductPrice();
				//				}
				if(!temp) return;

				let path = "/serve/product_set/index";
				let page = this.$router.resolve({
					path: path,
				});
				window.open(page.href, "_blank");
			},

			//获取所有产品列表
			getAllProduct() {
				let params = {
					page: 1,
					page_size: 10000,
					type: 1,
				}
				this.util.getProductList(params).then(res => {
					console.log('getProductList----', this.selectProductId, res, typeof res);
					console.log('this.canShowList-----', this.showProduct);
					this.allProduct = res.rows;
					if(this.productObj) {
						this.canShowList = this.util.showProductById(this.productObj.id);
						if(this.canShowList.length == 0) {
							this.showProduct = [];
						} else {
							res.rows.forEach((item, index) => {
								if(this.canShowList.includes(parseInt(item.id))) {
									this.showProduct.push(item);
								}
							})
						}
					}
					console.log('this.showProduct-----', this.showProduct);
					//只显示用户选中的产品
					this.showProduct = this.util.changeEditionName(this.showProduct);
					this.allProduct = this.util.changeEditionName(this.allProduct);
					//如果当前产品包含自定义账号，则显示输入多账号模块输入框
					if(this.canShowList.length > 0) {
						if([12, 22, 23].includes(parseInt(this.showProduct[0].id))) {
							this.showAccount = true;
						}
					}
					//计算差价
					this.calProductPrice();

				})
			},

			//产品下单方法(计算价格)
			calProductPrice() {
				//升级
				if(this.openType == 1) {
					this.showProduct.forEach((item, index) => {
						if(this.upgradeType==index){
							if(item.is_forever==1){
								this.showAccount=false;
							}else{
								this.showAccount=true;
							}
							let params;
							let id = parseInt(item.id);
							let num = this.util.getNumByProductId(id);
							if(this.accountNum > 5) {
								num = this.accountNum;
							}
							params = {
								pid: id,
								time: this.timeType ? 2 : 1,
								num: num
							}
							if(item.is_forever==1){
								params.time=3;
							}
							console.log('params', params);
							this.util.addProduct(params).then(res => {
								this.showProduct.forEach((item2, index2) => {
									if(res.pid == item2.id) {
										item2.price = res.price;
									}
								})
								this.payPrice = res.price;
								console.log('showProduct-----------', this.showProduct);
							})
						}
						
					})

				}
				//续费价格
				else {
					let id = parseInt(this.productObj.id);
					let params = {
						pid: id,
						time: this.timeType ? 2 : 1,
						num: this.productObj.num
					}
					console.log('params-----', params);
					this.util.addProduct(params).then(res => {
						this.payPrice = res.price;
						console.log('this.payPrice------------', this.payPrice);
					})
				}

			},

		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	.buy {
		width: 100%;
		overflow: hidden;
		/*padding-top:42px;*/
		.buy-info {
			background: #fff;
			margin-bottom: 20px;
			.have {
				.buy-item {
					cursor: default!important;
					&:hover {
						border-color: #D9D9D9!important;
					}
				}
				.item-info {
					position: relative;
					top: -10px;
				}
			}
		}
		.buy-title {
			height: 20px;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFangSC;
			font-weight: 400;
			color: #333;
			line-height: 20px;
			margin-bottom: 6px;
			padding: 5px 0px 0px 20px;
		}
		.line {
			width: 100%;
			height: 1px;
			background: #d9d9d9;
		}
		.have {
			.info-top {
				color: #333!important;
			}
		}
		.info {
			width: 100%;
			padding: 20px 20px 15px 20px;
			box-sizing: border-box;
			display: flex;
			.info-left {
				width: 374px;
				height: 100%;
				border-right: 1px solid #d9d9d9;
				flex-shrink: 0;
				.info-title {
					font-size: 20px;
					color: #ff9500;
					font-weight: 400;
					.editionType {
						margin-left: 5px;
						color: #333;
						font-weight: 600;
					}
				}
				.buy-type {
					margin-top: 30px;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					.buy-item {
						width: 355px;
						height: 88px;
						border: 1px solid #D9D9D9;
						background: #fff;
						margin-bottom: 20px;
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 0px 20px;
						box-sizing: border-box;
						position: relative;
						cursor: pointer;
						svg {
							width: 48px;
							height: 48px;
						}
						&:hover {
							border-color: #0C0C0C;
						}
						.item-logo {
							width: 48px;
							height: 48px;
							margin-right: 15px;
						}
						.item-info {
							display: flex;
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
							.info-top {
								height: 28px;
								font-size: 20px;
								line-height: 28px;
								color: #FF9500;
							}
							.info-bottom {
								height: 20px;
								font-size: 14px;
								font-family: PingFangSC-Regular, PingFangSC;
								font-weight: 400;
								color: #999999;
								line-height: 20px;
							}
						}
						.item-price {
							height: 28px;
							font-size: 20px;
							font-family: PingFangSC-Regular, PingFangSC;
							font-weight: 400;
							color: #ff9500;
							line-height: 28px;
						}
					}
					.triangle {
						width: 0;
						height: 0;
						border-bottom: 12px solid #ff9500;
						border-left: 12px solid transparent;
						position: absolute;
						bottom: 0;
						right: 0;
						display: none;
					}
					.active {
						border: 1px solid #ff9500;
						.triangle {
							display: block;
						}
					}
				}
			}
			.info-right {
				width: 70%;
				margin-left: 20px;
				.acquire {
					height: 28px;
					font-size: 20px;
					font-family: PingFangSC-Regular, PingFangSC;
					font-weight: 400;
					color: #333333;
					line-height: 28px;
					padding-left: 20px;
					margin-bottom: 10px;
				}
				.acquire-item {
					display: flex;
					-webkit-box-align: center;
					align-items: center;
					margin-bottom: 10px;
					margin-right: 30px;
					.acquire-img {
						width: 12px;
						height: 9px;
						background: #333;
						display: inline-block;
						margin-right: 6px;
					}
					.acquire-txt {
						height: 20px;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFangSC;
						font-weight: 400;
						color: #333;
						line-height: 20px;
						margin-left: 5px;
						span {
							color: #ff9500;
						}
						.newAdd {
							margin-left: 5px;
							font-size: 12px;
							background: #7ED321;
							border-radius: 4px 1px 4px 1px;
							color: #fff;
							padding: 2px 5px;
						}
					}
				}
			}
		}
	}
	
	
	
	.pay {
		width: 100%;
		height: 338px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		/*box-shadow: 2px 2px 5px rgba(7, 7, 65, 0.21);*/
		margin-bottom: 100px;
		margin-top: 46px;
		.money {
			margin-bottom: 20px;
			margin-top: 20px;
			height: 28px;
			font-size: 20px;
			font-family: PingFangSC-Regular, PingFangSC;
			font-weight: 400;
			color: #333333;
			line-height: 28px;
			span {
				color: #ff9500;
			}
		}
		.original {
			margin-bottom: 20px;
			height: 20px;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFangSC;
			font-weight: 400;
			color: #999999;
			line-height: 20px;
		}
		.pay-switch {
			width: 226px;
			height: 47px;
			border-radius: 20px;
			background: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			padding: 0 23px;
			-moz-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			-webkit-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
		}
		.pay-switch {
			margin-bottom: 87px;
			font-family: PingFangSC-Regular, PingFangSC;
			font-weight: 400;
		}
		.payment {
			width: 158px;
			height: 40px;
			line-height: 40px;
			background: linear-gradient( 180deg, rgba(236, 81, 89, 1) 0%, rgba(212, 40, 45, 1) 100%);
			color: #fff;
			text-align: center;
			font-size: 18px;
			font-family: PingFangSC-Semibold, PingFangSC;
			font-weight: 600;
			cursor: pointer;
		}
	}
	
	.productList {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		li {
			width: 100%;
		}
	}
	
	.renew {
		background: #D0021B;
		border-radius: 0px;
		color: #fff;
		margin-left: 10px;
		padding: 10px 15px;
	}
	
	.renewContent {
		.buy-item {
			border-color: #FF9500!important;
			.price {
				font-size: 20px;
				color: #FF9500;
				margin-left: 20px;
			}
		}
		.editionTitle {
			font-weight: 600;
			color: #333!important;
		}
		.editionType {
			color: #FF9500!important;
		}
		.time {
			width: 355px;
			height: 60px;
			background: #333333;
			color: #FF9500;
			padding: 16px 0px 16px 20px;
			margin-top: 20px;
			.content {
				display: flex;
				align-items: center;
			}
			p {
				font-size: 20px;
				margin-left: 15px;
			}
		}
	}
	
	
	
	.renewContent {
		.buy-item {
			cursor: default!important;
		}
	}
	
	.el-icon-check {
		font-weight: 600;
	}
	
	.haveFun {
		display: flex;
		flex-direction: column;
		height: 160px;
		flex-wrap: wrap;
	}
	.upgradeContent{	
		&.selected{
			.buy-item{
				border-color: #FF9500!important;
			}
		}
	}
</style>