<template>
	<div class="container">
		<!--单机版购买模块-->
		<div class="buy" v-if="!userProduct && productInfo">
			<div class="buy-info">
				<div class="buy-title">*即日起可使用新权限</div>

				<div class="info">
					<div class="info-left">
						<div class="info-title">
							<span>立即购买</span> 「单机版」
						</div>

						<div class="buy-type">
							<div class="buy-item active">
								<div class="item-logo">
										<img :src="$qiniuHost+'images/productEdition_'+productInfo.id+'.png'" width="48" height="48"/>
								</div>
								<div class="item-info">
									<div class="info-top">{{productInfo.name}}</div>
									<div class="info-bottom">
										<s>{{productInfo.price_year*2}}元</s>
									</div>
								</div>
								<div class="item-price">
									<span v-if="editionIndex!==4">￥{{productInfo.price}}元/月</span>
									<span v-if="editionIndex===4">￥{{productInfo.price}}元</span>
									<p v-if="editionIndex==2">(起)</p>
								</div>
								<div class="triangle"></div>
							</div>
						</div>
					</div>

					<!--版本功能模块-->
					<div class="info-right" v-if="productInfo">
						<div class="acquire">获得功能</div>
						<div class="haveFun">
							<div class="acquire-item" v-for="(item,index) in productInfo.funs" :key="index">
								<i class="el-icon-check"></i>
								<div class="acquire-txt">{{item}}</div>
							</div>
							<div class="acquire-item">
								<i class="el-icon-check"></i>
								<div class="acquire-txt">
									使用时长：
									<span>1{{period?'年':'月'}}</span>（{{timePeriod[0]}} ~ {{timePeriod[1]}}）
								</div>
							</div>
						</div>
						<!--自定账号模块-->
						<div class="buy-info account" v-if="showAccount">
			
							<div class="num">
								<div class="info-title">
									<span>请输入账号数量</span>
								</div>
		
								<el-input v-model="accountNum" v-on:input="changeAccountNum" placeholder="请输入大于5的数值"></el-input>
							</div>
							
						</div>
					</div>
				</div>
			</div>

			<div class="pay">
				<div class="money">
					付款金额：
					<span>{{selectEdition.payPrice}}元</span>
				</div>
				<div class="original">
					原价
					<s>{{selectEdition.payPrice*2}}</s>
					元，已经抵扣{{selectEdition.payPrice}}元
				</div>
				<div class="pay-switch" v-if="editionIndex!=0">
					<el-switch v-model="period" active-color="#999999" inactive-color="#FF9500" active-text="按年付费" inactive-text="按月付费"></el-switch>
				</div>
				<div class="payment" @click="toPay">{{editionIndex==0?'下载试用':'去付款'}}</div>
			</div>
		</div>

		
		<!--已经购买产品-->
		<div class='but serve' v-if="userProduct">
			<div class="content">
				<div class="top">
					<p>已经购买</p>
					<span>{{userProduct.editionName}}</span>
				</div>
				<el-button @click="toProduct" class="costom color-area">
					续费或升级
				</el-button>
			</div>
			<div class="img">
				<img :src="$qiniuHost+'images/product_foot.png'"/>
			</div>
		</div>
		
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowLogin" @closed="closeLogin"></mini-login>

	</div>
</template>

<script>
	import miniLogin from "FrontComponents/minilogin";
	import { mapGetters } from "vuex";
	export default {
		name: "publicity",
		data() {
			return {
				accountNum:'', //账号数量
				showAccount:false,
				isShowLogin:false,
				payOption:{},
				fixed: false,
				period: false,
				value2: true,
				editionIndex: 0,
				productInfo:null,  //选中的产品信息
				userProduct:null,   //用户已经购买的产品
				editionList: [],
				selectEdition:{},
				timePeriod:[],
				btnLeave:false
			};
		},
		
		components: {
			miniLogin,
		},
		watch:{
			period(to,from){
				if(to){
					//按照年
					this.timePeriod=this.util.getTimePeriod(1);
				}else{
					//按照月
					this.timePeriod=this.util.getTimePeriod(0);
				}
				this.calcPrice();
			}
		},
		created() {
			//获取相关产品
			if(JSON.stringify(this.$route.query)!='{}'){
				let obj=this.$route.query;
				if(obj.type){
					this.editionIndex=parseInt(obj.type);
					if(obj.type==3){
						this.showAccount=true;
					}else{
						this.showAccount=false;
					}
				}
			}
			
			console.log('this.editionIndex-------',this.editionIndex);
			
			//判断用户是否登录,//获取用户已经购买的产品
			console.log('this.util.userIsLogin()----',this.util.userIsLogin());
			if(this.util.userIsLogin()){
				this.getUserProduct().then(res=>{
					console.log('getUserProduct--------',res);
					if(res.is_temp!=2){
						this.userProduct=res;
					}
					
				})
			}
			
			//获取产品列表
			this.getProductList();
		},
		mounted() {
			//默认按照月
			this.timePeriod=this.util.getTimePeriod(0);
		},
		computed: {
		    ...mapGetters(["user_data"])
		},
		methods: {
			//返回个人中心或后台增值服务
			toProduct(){
				console.log('toProduct--------');
				//如果购买的是单机版相关版本，跳转到个人中心，如果是其他版本，则跳转到后台增值服务
				let id=parseInt(this.userProduct.id);
				let url='';
				if([11,12].includes(id)){
					url="/personal/product/index";
				}else{
					url="/serve/product_set/index";
				}
				let page = this.$router.resolve({path: url,});
				window.open(page.href, "_blank");
			},
			//获取商家开通的功能列表
			getUserProduct(){
				return new Promise((resolve,reject)=>{
					this.util.userProduct().then(res=>{
						resolve(res);
					})
					
				})
			},
			//下载苹果单机
			downMac(){
				this.$message.info("下载苹果端！");
			},
			//下载window单机
			downWindow(){
				this.$message.info("下载window端！");
			},
			//定位锚点
			goAnchor(selector) {
			  var anchor = this.$el.querySelector(selector)
			  document.body.scrollTop = anchor.offsetTop-55; // chrome
			  document.documentElement.scrollTop = anchor.offsetTop-55;
			},
			
			//关闭登录框回调方法
			closeLogin(){
				this.isShowLogin=false;
			},
			//关闭支付窗口模块
			closePay(val){
				this.openPay=false;
			},
			//获取产品列表
			getProductList() {
				this.util.getProductList().then(res => {
					console.log('getProductList-------', res);
					let list=[];
					//只显示type为1类型的数据
					list=res.rows.filter((item,index)=>{
						return item.type==1;
					})
					list.unshift({id:0,price:0,price_year:0});
					//根据产品id获取版本名称和功能
					list.forEach((item,index)=>{
						this.util.productName.forEach((item2,index2)=>{
							if(item.id==item2.id){
								//去掉单机两个汉字
								let flag=item2.name.indexOf('单机');
								if(flag>=0){
									item2.name=item2.name.substring(2);
								}
								item.name=item2.name;
								item.funs=item2.funs;
							}
						})
					})
					console.log(list,'list');
					this.productInfo=list[this.editionIndex];
					console.log('productInfo----',this.productInfo);
					this.selectEdition=list[this.editionIndex];
					this.calcPrice();
				})
			},
			//切换版本tab方法
			changeEdition(index) {
				let flag = parseInt(index);
				if(this.editionIndex == flag) return;
				this.editionIndex = flag;
				this.period=false;
				this.accountNum='';
				if(index==2){
					this.showAccount=true;
				}else{
					this.showAccount=false;
				}
				this.calcPrice();
			},
			//根据月份，年计算价格
			calcPrice(){
				let oldPrice=0;
				let payPrice=0;
				if(this.period){
					payPrice=parseInt(this.productInfo.price_year);
					oldPrice=payPrice*2;
				}else{
					payPrice=parseInt(this.productInfo.price);
					oldPrice=payPrice*2;
				}
				this.$set(this.selectEdition,'oldPrice',oldPrice);
				this.$set(this.selectEdition,'payPrice',payPrice);
				console.log('selectEdition---',this.selectEdition);
			},
			//去支付方法
			async toPay() {
				if(this.editionIndex==0){
					if(this.util.isWindow()){
						this.downWindow();
					}else{
						this.downMac();
					}
					return;
				}
				//判断用户是否登录
				console.log('this.util.userIsLogin()----',this.util.userIsLogin());
				if(!this.util.userIsLogin()){
					this.isShowLogin=true;
					return;
				}
				if(this.editionIndex==3){
					if(!this.accountNum){
						this.$message.warning('请输入账号数量！');
						return;
					}
					if(this.accountNum<6){
						this.$message.warning('请输入6或以上的账号数量！');
						return;
					}
				}
				
				let res = await this.productPay()
				console.log('toPay---------',res);
				//跳到支付页面
				this.util.toPayPage(res.id);
				
			},
			//产品下单方法
			productPay() {
				
				let params = {
					pid: this.selectEdition.id,
					time: this.period ? 2 : 1,
					num:1
				}
				if(this.accountNum){
					params.num=this.accountNum;
				}
				console.log('params----', params);
				return new Promise((resolve, reject) => {
					this.util.addProduct(params).then(res => {
						console.log('addProduct-------', res);
						resolve(res);
					})
				})
			},
			
			//修改账号数量方法
			changeAccountNum(){
				console.log('changeAccountNum----',this.accountNum);
				this.calePrice();
			},
			
			//计算单机版自定义价格
			calePrice(){
				let num=this.accountNum>6?this.accountNum:6;
				let price=238+18*num;
				if(this.period){
					price=price*12;
				}
				console.log('price-------',price);
				this.$set(this.selectEdition,'payPrice',price);
			},

			// 鼠标悬浮img
			enterImg(val){
				console.warn('鼠标进入')
				this[val]=true
			},
			// 鼠标离开img
			leaveImg(val1,val2){
				this[val1]=false
				document.getElementById(val1).classList.add('animated',val2)
				// this.$refs.img1.classList.addClass('animated fadeInRight')
			}
			

		},

	};
</script>

<style lang="scss" scoped>
	/deep/.el-switch__label.is-active {
		color: #ff9500;
	}
	
	.container {
		width: 100%;

		.header {
			// padding-top: 116px;
			box-sizing: border-box;
			text-align: center;
			// min-width: 1920px;
			// min-height: 1000px;
			// min-width: 1400px;
			// min-height: 729px;
			// background: url("./product_banner.png") center center no-repeat #5224cd;
			background: url("https://pic.paitume.com/images/product_purple.png") no-repeat;
			background-size: 100% auto;
			// background-position: center;
			display: flex;
			flex-direction: column;
			// justify-content: flex-start;
			align-items: center;
			.content{
				.url {
					height: 84px;
					font-size: 60px;
					font-family: PingFangSC-Semibold, PingFangSC;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
					line-height: 84px;
					opacity: 0.03;
					margin-top: 10px;
				}
				.title {
					height: 56px;
					font-size: 40px;
					font-family: PingFangSC-Semibold, PingFangSC;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
					line-height: 56px;
					margin-top: -50px;
				}
				.text {
					height: 22px;
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFangSC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 22px;
					margin-top: 4px;
				}
				.download {
					width: 300px;
					margin: 0 auto;
					margin-top: 52px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.apple-download,
					.windows-download {
						width: 145px;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;
						.client {
							font-weight: 400;
							color: #fff;
							margin-top: 5px;
						}
						.apple-btn,
						.windows-btn {
							width: 145px;
							height: 40px;
							background: #fff;
							display: flex;
							flex-direction: row;
							justify-content: space-around;
							align-items: center;
							padding: 0 33px;
							box-sizing: border-box;
							border-radius: 5px;
							cursor: pointer;
							z-index: 9;
							.btn-font {
								color: #5224cd;
								font-weight: bold;
							}
						}
					}
				}
			}
			img {
				margin-top: -50px;
				width: 75%;
				// height: 100%;
			}
		}
		.nav {
			width: 100%;
			height: 66px;
			background: #fff;
			box-sizing: border-box;
			overflow: hidden;
			-moz-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			-webkit-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			// margin-bottom: 60px;
			.download {
				display: flex;
				.apple-btn,
				.windows-btn {
					width: 145px;
					height: 40px;
					background: #7842ED;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
					padding: 0 33px;
					box-sizing: border-box;
					border-radius: 5px;
					cursor: pointer;
					z-index: 9;
					margin-right: 10px;
					.btn-font {
						color: #fff;
						font-weight: bold;
					}
					.apple,.win{
						color: #fff;
					}
				}
			}
			.nav-item {
				display: block;
				width: 75px;
				line-height: 57px;
				color: #243041;
				text-align: center;
				float: left;
				font-family: PingFangSC-Semibold, PingFangSC;
				font-weight: 600;
				margin-right: 89px;
				cursor: pointer;
				&:hover {
					.active {
						border-bottom: 2px solid #5224cd;
						padding-bottom: 5px;
					}
				}
			}
		}
		.fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background: #fff;
			z-index: 99;
		}
		.sec-title {
			height: 150px;
			padding-top: 70px;
			box-sizing: border-box;
			font-size: 40px;
			font-family: PingFangSC-Semibold, PingFangSC;
			font-weight: 600;
			color: rgba(52, 19, 124, 1);
			text-align: center;
		}
		.section {
			width: 100%;
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			overflow: hidden;
			.pro-title,
			.pro-text {
				font-family:STSongti-SC-Regular,STSongti-SC;
				font-weight: 400;
				color: #243041;
			}
			.big {
				font-size: 40px;
				margin-bottom: 10px;
			}
			.small {
				font-size: 18px;
				line-height: 25px;
			}
			.banner {
				width: 1347px;
				height: 398px;
				background: #d8d8d8;
				margin-top: 13px;
				.banner-img {
					display: block;
					width: 1347px;
					height: 398px;
				}
			}
			.imgs-item {
				width: 100%;
				height: 598px;
				display: flex;
				justify-content: center;
				align-items: center;
				.img {
					// width: 486px;
					width: 600px;
					// height: 420px;
					height: 100%;
					cursor:pointer;
					display: flex;
					align-items: center;
					// background-image:url('https://pic.paitume.com/images/product_1.png');
					background-size: 100% 100%;
					position: relative;
					img{
						// width: 431px;
						// height: 352px;
						border: 1px solid darkblue;
					}
				}
				.img1:before{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_1.png');
					background-size: contain;
					opacity:1;
					transition:.8s;
				}
				.img1:hover:before{
					opacity: 0;
				}
				.img1:after{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_1_hover.png');
					background-size: contain;
					opacity:0;
					transition:.8s;
				}
				.img1:hover:after{
					opacity: 1;
				}
				.img2:before{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_2.png');
					background-size: contain;
					opacity:1;
					transition:.8s;
				}
				.img2:hover:before{
					opacity: 0;
				}
				.img2:after{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_2_hover.png');
					background-size: contain;
					opacity:0;
					transition:.8s;
				}
				.img2:hover:after{
					opacity: 1;
				}
				.img3:before{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_3.png');
					background-size: contain;
					opacity:1;
					transition:.8s;
				}
				.img3:hover:before{
					opacity: 0;
				}
				.img3:after{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_3_hover.png');
					background-size: contain;
					opacity:0;
					transition:.8s;
				}
				.img3:hover:after{
					opacity: 1;
				}
				.img4:before{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_4.png');
					background-size: contain;
					opacity:1;
					transition:.8s;
				}
				.img4:hover:before{
					opacity: 0;
				}
				.img4:after{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_4_hover.png');
					background-size: contain;
					opacity:0;
					transition:.8s;
				}
				.img4:hover:after{
					opacity: 1;
				}
				.img5:before{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_5.png');
					background-size: contain;
					opacity:1;
					transition:.8s;
				}
				.img5:hover:before{
					opacity: 0;
				}
				.img5:after{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_5_hover.png');
					background-size: contain;
					opacity:0;
					transition:.8s;
				}
				.img5:hover:after{
					opacity: 1;
				}
				.img6:before{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_6.png');
					background-size: contain;
					opacity:1;
					transition:.8s;
				}
				.img6:hover:before{
					opacity: 0;
				}
				.img6:after{
					content:'';
					position:absolute;
					left:0;
					right:0;
					top:0;
					bottom:0;
					background:url('https://pic.paitume.com/images/product_6_hover.png');
					background-size: contain;
					opacity:0;
					transition:.8s;
				}
				.img6:hover:after{
					opacity: 1;
				}



				// .img1:hover{
				// 	background-image:url('https://pic.paitume.com/images/product_1_hover.png');
				// }
				// .img2:hover{
				// 	background-image:url('https://pic.paitume.com/images/product_2_hover.png');
				// }
				// .img3:hover{
				// 	background-image:url('https://pic.paitume.com/images/product_3_hover.png');
				// }
				// .img4:hover{
				// 	background-image:url('https://pic.paitume.com/images/product_4_hover.png');
				// }
				// .img5:hover{
				// 	background-image:url('https://pic.paitume.com/images/product_5_hover.png');
				// }
				// .img6:hover{
				// 	background-image:url('https://pic.paitume.com/images/product_6_hover.png');
				// }
				// .img2{
				// 	background-image:url('https://pic.paitume.com/images/product_2.png');
				// }
				// .img3{
				// 	background-image:url('https://pic.paitume.com/images/product_3.png');
				// }
				// .img4{
				// 	background-image:url('https://pic.paitume.com/images/product_4.png');
				// }
				// .img5{
				// 	background-image:url('https://pic.paitume.com/images/product_5.png');
				// }
				// .img6{
				// 	background-image:url('https://pic.paitume.com/images/product_6.png');
				// }
				.item-title {
					width: 431px;
					height: 420px;
					background: url("https://pic.paitume.com/images/section1.png") 0 0 no-repeat;
					background-size: 100% 100%;
					padding: 0 58px 0 47px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.dot-1 {
						width: 17px;
						height: 17px;
						background: #f5a623;
						border-radius: 50%;
						margin-top: 17px;
					}
					.dot-2 {
						width: 17px;
						height: 17px;
						// background: #3E3F40;
						background: #743FE6;
						border-radius: 50%;
						margin: -9px 0 0 10px;
					}
					.dot-5 {
						width: 28px;
						height: 28px;
						background: #3E3F40;
						border-radius: 50%;
						margin: -10px 0 0 11px;
					}
					.dot-7 {
						width: 17px;
						height: 17px;
						background: #f5a623;
						border-radius: 50%;
						margin: 33px 0 0 0;
					}
					.dot-8 {
						width: 17px;
						height: 17px;
						background: #3E3F40;
						border-radius: 50%;
						margin: -2px 0 0 20px;
					}
				}
				.item-title-three {
					width: 431px;
					height: 420px;
					padding: 190px 20px 0 80px;
					position: relative;
					margin-right: 270px;
					.dot-5 {
						width: 17px;
						height: 17px;
						background: #3E3F40;
						border-radius: 50%;
						position: absolute;
						top: 188px;
						left: 131px;
					}
					.dot-6 {
						width: 32px;
						height: 32px;
						background: $Theme-color;
						border-radius: 50%;
						position: absolute;
						top: 180px;
						left: 100px;
					}
					.dot-9 {
						width: 17px;
						height: 17px;
						background: #3E3F40;
						border-radius: 50%;
						position: absolute;
						top: 188px;
						left: 100px;
					}
					.dot-10 {
						width: 32px;
						height: 32px;
						background: $Theme-color;
						border-radius: 50%;
						position: absolute;
						top: 180px;
						left: 70px;
					}
				}
				.item-title-two {
					width: 431px;
					height: 420px;
					padding: 127px 12px 0 90px;
					box-sizing: border-box;
					background: url("https://pic.paitume.com/images/section2.png") 0 0 no-repeat;
					background-size: 100% 100%;
					margin-right: 219px;
					.pr {
						position: relative;
					}
					.dot-3 {
						width: 17px;
						height: 17px;
						background: #3E3F40;
						border-radius: 50%;
						position: absolute;
						top: 0;
						right: 180px;
					}
					.dot-4 {
						width: 17px;
						height: 17px;
						background: $Theme-color;
						border-radius: 50%;
						position: absolute;
						top: -8px;
						right: 190px;
					}
				}
				.text-right {
					text-align: right;
				}
			}
			.imgs-item:nth-child(1),
			.imgs-item:nth-child(3),
			.imgs-item:nth-child(5){
				background:linear-gradient(232deg,rgba(245,245,245,1) 0%,rgba(255,255,255,1) 100%);
				.img{
					margin-right: 186px;
				}
			}
			.imgs-item:nth-child(2),
			.imgs-item:nth-child(4),
			.imgs-item:nth-child(6){

			}
			// .details {
			// 	width: 67%;
			// 	height: 100%;
			// 	padding: 0 23px;
			// 	overflow: hidden;
			// 	.imgs {
			// 		overflow: hidden;
			// 		margin-top: 101px;
			// 		padding:0px 100px;
			// 		.imgs-box {
			// 		}
			// 	}
			// }
			.mode {
				width:100%;
				background:#F5F5F5;
				padding:90px 0px;
				.mode-title {
					font-weight: 600;
					color: #243041;
					font-size:40px;
					text-align: center;
				}
				.mode-text {
					font-size: 18px;
					color: #243041;
					text-align: center;
				}
				.mode-type {
					width: 1200px;
					margin:0px auto;
					height: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-top: 60px;
					overflow: hidden;
					.type-item {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;
						position:relative;
						.item-img {
							width: 300px;
							height: 246px;
							display: block;
							background: #d8d8d8;
						}
						.item-title {
							position:absolute;
							bottom:50px;
							height: 28px;
							font-size: 20px;
							font-family: PingFangSC-Regular, PingFangSC;
							font-weight: 400;
							line-height: 28px;
							color: #676767;
							text-align: center;
							margin-top: 10px;
						}
					}
				}
				.productList{
					width:1140px;
					margin:0px auto;
					display:flex;
					justify-content:space-between;
					margin-top:40px;
					li{
						width:550px;
						height:170px;
						border:2px solid #000000;
						display:flex;
						padding:15px 0px 33px 25px;
						opacity:0.3;
						cursor:pointer;
						position:relative;
						&.active{
							opacity:1;
						}
						&::before{
							content:'';
							border-top: 80px solid #000;
    						border-left: 80px solid transparent;
    						display:block;
							position:absolute;
							top:0px;
							right:0px;
						}
						.tips{
							position:absolute;
							top:15px;
							right:5px; 
							font-size:14px;
							transform:rotate(45deg);
							color:#fff;
							&.seve{
								top:17px;
								right:0px;
							}
						}
						
						img{
							width:142px;
							height:142px;
						}
						.content{
							padding-top:15px;
							padding-left:30px;
							.title{
								font-size:24px;
								margin-bottom:10px;
							}
							.edition{
								font-weight:600;
							}
							.fun{
								color:#666666;
								display:flex;
								flex-direction:column;
								span{
									display:flex;
									align-items:center;
									&::before{
										content:'',;
										display:block;
										width:4px;
										height:4px;
										border-radius:4px;
										background:#666666;
										margin-right:10px;
									}
								}
							}
						}
					}
				}
			}
			.product {
				width: 100%;
				height: 375px;
				background: #676767;
				margin-top: 119px;
				overflow: hidden;
				padding: 0 451px;
				.product-title {
					height: 56px;
					font-size: 40px;
					font-family: PingFangSC-Regular, PingFangSC;
					font-weight: 400;
					color: #fff;
					line-height: 56px;
					text-align: center;
					margin-top: 31px;
				}
				.product-nav {
					width: 100%;
					margin-top: 31px;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.pro-item {
						width: 141px;
						height: 256px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						cursor: pointer;
						.pro-img {
							width: 101px;
							height: 101px;
							display: block;
							background: #fff;
							margin-bottom: 20px;
						}
						.pro-title,
						.pro-text {
							height: 28px;
							font-size: 20px;
							font-family: PingFangSC-Regular, PingFangSC;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
							line-height: 28px;
							text-align: center;
						}
						.pro-text {
							margin-top: 27px;
						}
						.check {
							width: 141px;
							height: 17px;
							background: #fff;
						}
					}
				}
			}
		}
		.buy {
			width: 100%;
			padding: 0 148px;
			overflow: hidden;
			margin-top: 87px;
			background:#fff;
			.buy-title {
				font-size: 14px;
				color: #333;
				border:1px solid #D9D9D9;
				padding:5px 20px;
			}
			.line {
				width: 100%;
				height: 1px;
				background: #d9d9d9;
			}
			.info {
				width: 100%;
				height: 320px;
				padding: 20px 20px 15px 20px;
				box-sizing: border-box;
				display: flex;
				border:1px solid #D9D9D9;
				border-top:none;
				.info-left {
					width: 374px;
					height: 100%;
					border-right: 1px solid #d9d9d9;
					flex-shrink: 0;
					.info-title {
						font-size: 20px;
						color: #333333;
						height: 28px;
						font-family: PingFangSC-Regular, PingFangSC;
						font-weight: 400;
						line-height: 28px;
						span {
							color: #ff9500;
						}
					}
					.buy-type {
						margin-top: 30px;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						.buy-item {
							width: 299px;
							height: 88px;
							border: 1px solid #999;
							background: #fff;
							margin-bottom: 20px;
							display: flex;
							flex-direction: row;
							/*justify-content: space-between;*/
							align-items: center;
							padding: 0px 20px;
							box-sizing: border-box;
							position: relative;
							cursor: pointer;
							.item-logo {
								svg{
									width: 48px;
									height: 48px;
								}
							}
							.item-info {
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								align-items: flex-start;
								margin:0px 10px;
								.info-top {
									height: 28px;
									font-size: 15px;
									// font-size: 20px;
									font-family: PingFangSC-Regular, PingFangSC;
									font-weight: 400;
									color: #333;
									line-height: 28px;
								}
								.info-bottom {
									height: 20px;
									font-size: 14px;
									font-family: PingFangSC-Regular, PingFangSC;
									font-weight: 400;
									color: #999999;
									line-height: 20px;
									// position: absolute;
									// right: 132px;
									// bottom: 5px;
								}
							}
							.item-price {
								height: 28px;
								font-size: 20px;
								font-family: PingFangSC-Regular, PingFangSC;
								font-weight: 400;
								color: #ff9500;
								line-height: 28px;
								display:flex;
								align-items:baseline;
								p{
									font-size:12px;
								}
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
					width: 40%;
					margin-left: 20px;
					.account{
						.num{
							.el-input{
								margin-top:10px;
								width:400px;
							}
						}
					}
					.acquire {
						height: 28px;
						font-size: 20px;
						font-family: PingFangSC-Regular, PingFangSC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 28px;
						padding-left: 20px;
						margin-bottom: 10px;
					}
					.acquire-item {
						/*width: 100%;*/
						display: flex;
						align-items: center;
						margin-bottom: 10px;
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
						}
					}
				}
			}
		}
		
		.serve{
			text-align:center;
			margin-top:50px;
			background:#fff;
			.content{
				margin:0px auto;
				width:267px;
				height:200px;
				padding-top:50px;
				background:url('https://pic.paitume.com/images/product_block.png') no-repeat;
			}
			.top{
				color:#243041;
				p{
					font-size:20px;
				}
				span{
					font-size:14px;
				}
			}
			button{
				background:$Theme-color;
				color:#fff;
				margin-top:10px;
				svg{
					color:#fff!important;
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
	}
	.haveFun{
        display: flex;
        flex-direction: column;
        height:160px;
        flex-wrap:wrap;
    }
</style>