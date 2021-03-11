<template>
	<div class="main_content">
		<div class="head">
			<div class="bread">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/service/index">服务</el-breadcrumb-item>
					<el-breadcrumb-item>服务名称</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<front-searchbox type="1" @search="search" :searchTxt="searchTxt"></front-searchbox>
		</div>
		<div class="body">
			<!--产品信息模块-->
			<div class="productDetail" v-if="serviceInfo">
				<!--图片预览模块-->
				<imglist-view :imgList="serviceInfo.pic" v-if="serviceInfo" type="3"></imglist-view>
				<!--产品模块-->
				<div class="info">
					<p class="title">{{serviceInfo.title}}</p>
					<div class="more">
						<div>
							<span class="first">订购项目：</span>
							<el-button class="optionBtn" @click="selectService(item.id)" v-for="(item,index) in productList" :key="index" :class="{'active':serviceIndex==item.id}">
								{{item.name}}
							</el-button>
						</div>
						<div>
							<span class="first">数量：</span>
							<el-input-number v-model="buyNum" controls-position="right" @change="handleCount" :min="1" :max="parseInt(serviceInfo.count)"></el-input-number>
							<span class="stock">1件起订</span>
						</div>
						
						<!--<div>
							<span class="first">交付速度：</span>
							<span class="stock">到样后5个工作日</span>
						</div>-->
						
						<div>
							<div class="price">
								<span class="first">购买单价：</span>
								<p class="money">
									<span class="num">{{showPrice}}元</span>
								</p>
							</div>

						</div>
						
						<div class="operate">
							<div class="leftBtn">
								<el-button class="cur color-area" @click="payOrder">立即购买</el-button>
								<el-button class="iconBtn collectBtn" :class="{'collect':isCollect}" @click="collect(1)">
									<!--<i class="el-icon-star-off"></i>-->
									<ali-svg-icon icon-class="like" class="likeIcon" v-if="!isCollect"></ali-svg-icon>
									<ali-svg-icon icon-class="liked" class="likedIcon" v-if="isCollect"></ali-svg-icon>
									<span>收藏</span>
								</el-button>
							</div>
							<el-button @click="toChat(serviceInfo)">
								<ali-svg-icon icon-class="customer_service" class="contactIcon"></ali-svg-icon>
								联系商家
							</el-button>
						</div>
					</div>
					
					<!--店铺信息-->
					<service-store type="1" :info="serviceInfo"></service-store>
					
				</div>
			</div>

			<!--底部模块-->
			<div class="footContent">
				<!--产品参数、评论等模块-->
				<div class="moreDetail" v-if='serviceInfo'>
					<div class="tabBar">
						<el-tabs v-model="tabIndex" type="card" @tab-click="changeTab">
							
							<!--基本信息模块-->
							<el-tab-pane label="服务详情" name="0">
								<table>
								  <tr>
								    <td class="name">订购项目</td>
								    <td class="price">价格</td>
								    <td class="content">描述</td>
								  </tr>
								  <tr class="list" v-for="(item,index) in productList" :key="index">
								    <td class="name">{{item.name}}</td>
								    <td class="price">{{item.price}}元/件</td>
								    <td class="content">{{item.content}}</td>
								  </tr>
								</table>
								
								<div class="productInfo">
									<!--<p>产品信息</p>-->
									<div v-html="serviceInfo.content" class="detail">
									</div>
								</div>
							</el-tab-pane>
							
							<el-tab-pane label="成功案例" name="1">
								
							</el-tab-pane>
							
						</el-tabs>
					</div>
				</div>
				<!--右侧产品推荐模块-->
				<div class="selectGoods">
					<recommend-good detail="1" type="3"></recommend-good>
				</div>
			</div>
		</div>

		<!--联系客服模块-->
		<!--<contact :cartInfo="orderCart" v-if="showContact"></contact>-->

		

		<!--底部查找模块-->
		<find @search="footSearch" type="1"></find>

		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>

	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import recommendGood from "FrontComponents/recommendGood";
	import pagination from"FrontComponents/pagination";
	import miniLogin from "FrontComponents/minilogin";
	import contact from "FrontComponents/contact";
	import { Schedule } from "@util/schedule.js";
	import find from "FrontComponents/find";
	import imglistView from "FrontComponents/imgListView";
	import {collectStore,collectOther,getUserLsObj} from "@util/common.js";
	import { mapGetters } from "vuex";
	import serviceStore from "FrontComponents/serviceStore";
	export default {
		data() {
			return {
				serviceId:'', //服务详情id
				serviceInfo:null, //服务详情信息
				serviceIndex:0, //服务下标
				searchTxt:'',  //搜索内容
				isShowDialog:false, //是否显示登录弹窗
				productList:[], //项目列表
				buyNum:1,  //购买数量
				isCollect:false,  //是否已经收藏
				storeIsCollect:false, //店铺是否已经收藏
				tabIndex:'0',  //tab下标
				showPrice:0,  //显示的项目价格
			};
		},
		components: {
			frontSearchbox,
			recommendGood,
			imglistView,
			miniLogin,
			find,
			serviceStore
		},
		created() {
			this.serviceId = parseInt(this.$route.query.id);
			this.getServiceDetail(this.serviceId);
		},
		watch: {
			
		},
		mounted() {},
		computed: {
      ...mapGetters(["user_data"])
    },
		methods: {
			//获取服务详情内容
			getServiceDetail(id){
				this.util.getServiceDetail(id).then(res=>{
					console.log('getServiceDetail----',res);
					
					//判断服务是否有视频,有就给pic添加字段
					if(res.video){
//						res.pic=res.video+','+res.pic;
						res.pic=`${res.video}?v=${this.util.getUUID(10)},${res.pic}`;
					}
					
					this.serviceInfo=res;
					//根据优先级排序项目
					res.norms.sort((a, b) => b.priority - a.priority);
					this.productList=res.norms;
					this.serviceIndex=res.norms[0].id;
					this.showPrice=res.norms[0].price;
					console.log('this.serviceIndex----------',this.serviceIndex);
					
					console.error('this.serviceInfo------',this.serviceInfo.pic);
					
					//获取是否收藏信息
					this.getCollect();
				})
			},
			
			//立即付款
			payOrder() {
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}else{
					this.util.toServiceOrder(this.serviceId,this.serviceIndex,this.buyNum);
				}
				
			},
			
			//切换tab
			changeTab(){
				
			},
			
			
			//收藏(取消收藏)，关注(取消关注）方法 type: 0表示店铺本身，1表示影棚，2表示设备，3表示活动 4模特 5拼拍
			collect(type) {
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(type == 0) {
					collectStore(this.serviceInfo.user.id, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				} else if(type == 1) {
					collectOther(this.serviceInfo.user.id, "5", "1", this.serviceId).then(
						res => {
							if(res == 1) {
								this.isCollect = true;
							} else {
								this.isCollect = false;
							}
						}
					);
				}
			},
			
			//获取该影棚或者店铺是否已经收藏
			getCollect() {
				//判断用户是否已经登录
				if(this.util.userIsLogin()) {

					//判断该设备是否已经被收藏
					getUserLsObj(this.serviceId, "5", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});

					//判断该店家是否已经收藏
					getUserLsObj(this.serviceInfo.user.id, "0", "1").then(res => {
						if(res) {
							this.storeIsCollect = true;
						}
					});
				}else{
					//没有登录也显示联系客服模块
//					this.showContact=true;
				}
			},
			
			// 点击联系商家，打开即时聊天窗口
			toChat(equip){
				if(this.user_data.id==equip.uid){
					this.$message.warning('这是你自己发布的器材')
					return
				}
				let chatToObj={
					id:equip.uid,
					name:equip.nick,
					avatar:this.$qiniuHost+equip.avatar||'https://pic.paitume.com/images/male.png'
				}
				this.$parent.$parent.$refs.chat.chatTo(chatToObj)
			},
			
			//关闭登录对话框
			closeLogin() {
				this.isShowDialog = false;
			},
			
			//跳转到店铺页面
			toShopPage(){
				this.util.toShopPage(this.serviceInfo.uid);
			},

			
			//改变数量方法
			handleCount(val) {
				
			},

		
			changeMenu(val) {
				this.tabActive = val;
			},
			search(val) {
				console.log("search11111-----", val);
			},
			search2(val) {
				console.log("search22222-----", val);
				this.searchTxt = val;
				this.getEquipList();
			},
			//选择服务
			selectService(val) {
				this.serviceIndex = val;
				//切换价格
				this.productList.forEach((item,index)=>{
					if(item.id==val){
						this.showPrice=item.price;
					}
				})
				console.log("this.serviceIndex---", this.serviceIndex);
			},
			changePage(val) {
				this.equipListParams.page = val;
				this.getEquipList();
			},
			//底部搜索方法
			footSearch(){
				
			}
			
		}
	};
</script>

<style lang="scss" scoped>
	@import "@front/common/common.scss";
	.contact {
		position: fixed;
		right: 10px;
		top: 50%;
		width: 35px;
		height: 136px;
		margin-top: -68px;
		color: #fff;
		p {
			padding: 10px;
			background: #7C6AFF;
			margin-bottom: 2px;
		}
	}
	
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
	}
	
	.brandOption {
		flex: 1;
	}
	
	/deep/ {
		.el-tabs--card {
			.el-tabs__header {
				.el-tabs__nav {
					border-radius: 0px;
					border-left: none;
					border-top: none;
					.el-tabs__item {
						width: 116px;
						background: #fafafa;
						border-color: #f0f0f0;
						text-align: center;
						&.is-active {
							color: #fff;
							background: #7C6AFF;
						}
					}
				}
			}
		}
	}
	
	.footContent {
		display: flex;
		margin-bottom: 100px;
		.moreDetail {
			width: 100%;
			margin-right: 10px;
			background: #fff;
			border: 1px solid #FAFAFA;
			flex: 1;
		}
		.selectGoods {
			width: 243px;
			background: #fff;
		}
	}
	
	/deep/ {
		.iconBtn {
			padding: 4px 10px;
			&>span {
				display: flex;
				flex-direction: column;
				align-items:center;
			}
			span {
				margin-left: 0px;
				font-size: 12px;
				margin-top: 1.5px;
			}
		}
	}
	
	.body {
		.productDetail {
			margin-bottom:25px;
			button {
				background: #fff;
				border: 1px solid #f0f0f0;
				border-radius: 0px;
			}
			display: flex;
			.info {
				width: 63%;
				.curDay{
					padding:0px 8px;
				}
				.option {
					display: flex;
					margin-left: 5px;
				}
				.title {
					font-size: 18px;
					margin-bottom: 20px;
				}
				.tip {
					font-size: 12px;
					color: #666666;
					margin-left: 10px;
				}
				.more {
					background: #fafafa;
					border: 1px solid #f0f0f0;
					padding: 20px 20px 10px 20px;
					width:750px;
					&>div {
						display: flex;
						align-items: baseline;
						margin-bottom: 20px;
						.first {
							color: #999999;
							margin-right: 10px;
							width: 70px
						}
						.hours{
							font-size:12px;
							color:#999;
							width:150px;
						}
						p{
							flex:1;
						}
						.selectBtn {
							padding: 5px 8px;
						}
						.optionBtn {
							position: relative;
							overflow: hidden;
							padding: 10px 12px;
							&.active {
								border-color: #7C6AFF;
								color: #333333;
								&::before {
									content: "";
									width: 12px;
									height: 12px;
									background: #7C6AFF;
									position: absolute;
									top: -6px;
									right: -6px;
									transform: rotate(45deg);
								}
							}
						}
						.endTime {
							margin-left: 20px;
							margin-right: 10px;
						}
						.hidden {
							color: transparent;
						}
					}
					/deep/ {
						.el-date-editor {
							width: 118px;
							margin-right:10px;
							.el-input__inner {
								width: 100%;
								padding-right: 10px;
								height: 34px;
								line-height: 34px;
								text-indent: 8px;
							}
							.el-input__icon {
								line-height: 34px;
							}
						}
					}
					.price {
						margin-bottom: 10px;
						display:flex;
						align-items:center;
						.money {
							font-size: 0px;
							span {
								font-size: 12px;
							}
							.num {
								font-size: 20px;
								color: #d4282d;
								font-weight: 600;
							}
						}
					}
					.operate {
						margin-bottom: 0px;
						display: flex;
						justify-content: space-between;
						.leftBtn {
							display: flex;
							align-items: center;
							.cur {
								background: #7C6AFF;
								color: #fff;
							}
						}
					}
				}
				.store {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 80px;
					border: 1px solid #f0f0f0;
					background: #fff;
					padding: 8px 20px;
					margin-bottom: 25px;
					margin-top: 10px;
					p {
						font-size: 13px;
					}
					.storeInfo {
						display: flex;
						align-items: center;
						.storeName{
							color:#000;
						}
						.autoImg{
							margin-right:25px;
							border:1px solid #F0F0F0; 
						}
						.identify {
							span {
								font-size: 12px;
							}
						}
						p {
							margin-bottom: 3px;
							&:last-child {
								margin-bottom: 0px;
								margin-top: 8px;
							}
							span {
								color: #999;
								margin-right: 10px;
							}
						}
					}
					.other {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	
	.selected {
		display: flex;
		margin-left: 10px;
		li {
			position: relative;
			margin-right: 60px;
			margin-bottom: 8px;
			height:25px;
			i{
				width: 20px;
			    height: 20px;
			    line-height: 17px;
			    text-align: center;
			    border: 1px solid #D9D9D9;
			    background: #fff;
			    color: #999999;
			    position: absolute;
			    right: -29px;
			    top: -1px;
			    cursor: pointer;
			}
		}
	}
	
	.showSelect {
		display: flex;
		margin: 20px 0px;
		background: #FAFAFA;
		padding: 15px;
		&>span {
			color: #7C6AFF;
		}
		&.noSelect{
			justify-content:space-around;
		}
		.selected {
			li {
				padding: 0px;
				position: relative;
				background:#7C6AFF;
				padding:3px 5px;
				color:#fff;
				span {
					margin-right: 0px !important;
					top: -5px;
				}
			}
		}
		.noSelect{
			display:flex;
			flex-direction:column;
			align-items:center;
			img{
				width:101px;
				height:81px;
				margin-top:40px;
				margin-bottom:20px;
			}
		}
	}
	
	.priceDetail {
		border: 1px solid #f0f0f0;
		display: inline-block!important;
		text-align: center;
		max-width: 560px;
    	overflow-x: scroll;
		td {
			background:#fff;
			padding:5px 10px;
			&:last-child {
				border-right: none;
			}
		}
		tr {
			&:last-child {
				td {
					border-bottom: none;
				}
			}
		}
	}
	
	/deep/ {
		.el-dialog {
			width: 1200px;
		}
		.tipDialog {
			.el-dialog {
				width: 500px;
			}
			.el-dialog__body {
				display: none;
			}
		}
		.el-input-number {
			width: 100px;
		}
		.stock{
			margin-left:10px;
		}
		.el-breadcrumb {
			border: none;
			margin-bottom: 0px;
			padding-bottom: 0px;
			span {
				font-size: 12px !important;
				color: #999999;
			}
			.el-breadcrumb__separator {
				margin: 0px 12px;
			}
		}
	}
	
	/deep/ {
		.el-tabs__content {
			padding: 0px 40px;
			overflow:visible;
		}
	}
	
	.front_options {
		&>ul {
			margin-bottom: 20px;
		}
	}
	
	.tabBar {
		.first {
			display: flex;
			align-items: center;
			padding-bottom: 10px;
			border-bottom: 1px solid #F5F5F5;
			p {
				font-size: 18px;
				font-family: PingFangSC-Regular;
				margin-right: 10px;
			}
			.calc {
				border: 1px solid #f0f0f0;
				padding: 0px 5px;
				position: relative;
				div:first-child {
					cursor: pointer;
				}
				.calcContent {
					display: none;
					text-align: center;
					position: absolute;
					top: 20px;
					left: -123px;
					z-index: 1;
					width: 945px;
					background: #fff;
					border: 1px solid #7C6AFF;
					padding: 10px 0px 20px 0px;
					/deep/ {
						input {
							width: 64px;
							height: 34px;
							border-radius: 0px;
							padding-left: 10px;
							color: #7C6AFF;
							font-weight: 600;
							padding-right: 0px;
							margin: 0px 8px;
						}
						.el-input__icon {
							line-height: 34px;
						}
					}
					.title {
						font-size: 18px;
						padding-bottom: 7px;
						border-bottom: 1px solid #f5f5f5;
					}
					.calcOption {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 15px;
						margin-bottom: 40px;
					}
					ul {
						display: flex;
						justify-content: space-around;
						li {
							border: 1px solid #d9d9d9;
							background: rgba(29, 122, 210, 0.04);
							width: 288px;
							.top {
								font-size: 18px;
								font-weight: 600;
								padding: 8px 0px;
								border-bottom: 1px solid #d9d9d9;
								span {
									font-size: 12px;
									font-weight: 400;
									margin-left: 7px;
								}
							}
							.money {
								font-size: 18px;
								color: #d4282d;
							}
							.count {
								display: flex;
								padding: 0px 15px 0px 13px;
							}
							.prev {
								border-right: 1px solid #d9d9d9;
								margin-right: 13px;
							}
							.prev,
							.next {
								display: flex;
								flex-direction: column;
								text-align: left;
								padding: 13px 0px;
								p {
									font-size: 12px;
									&:first-child {
										padding-bottom: 10px;
										border-bottom: 1px solid #d9d9d9;
										margin-bottom: 5px;
									}
								}
							}
						}
					}
					
					
					.dayInfo{
						display:flex;
						justify-content:center;
						.dayPrice{
							display:flex;
							flex-direction:column;
							margin-top:20px;
							li{
								text-align:center;
								span{
									display:inline-block;
									width:80px;
									font-size:18px;
								}
								&:first-child{
									span{
										font-weight:600;
									}
								}
							}
						}
					}
					
				}
				&:hover {
					.calcContent {
						display: block;
					}
				}
			}
		}
		.second {
			display: flex;
			justify-content: flex-start;
			margin-top: 10px;
			padding-bottom: 40px;
			border-bottom: 1px solid #f5f5f5;
			margin-bottom: 35px;
			ul {
				display: flex;
				li {
					padding: 4px 13px;
					background: #f2fff4;
					margin-right: 20px;
				}
			}
			&>p {
				display: flex;
				flex-direction: column;
				width: 33.3%;
				span:first-child {
					font-weight: 600;
					margin-bottom: 5px;
				}
			}
		}
		.productInfo {
			margin-top: 30px;
			font-size: 0px;
			p {
				margin-bottom: 10px;
				font-size: 18px;
			}
			div {
				font-size:14px;
				width: 100%;
				/deep/ img {
					width: 100%;
				}
			}
		}
		.check{
			padding:30px 40px;
			background:#F1F7FC;
			border-radius:4px;
			&>p{
				font-size:20px;
				font-weight:600;
				margin-bottom:20px;
				text-align: center;
			}
			ul{
				display:flex;
				justify-content: space-around;
				li{
					display: flex;
				    flex-direction: column;
				    align-items: center;
				    position:relative;
				    width:140px;
					p{
						font-size:18px;
						margin:10px;
					}
					img{
						width:100px;
						height:100px;
					}
					.arrow{
						position:absolute;
						right:-30px;
						top:45px;
						width:40px;
						height:15px;
					}
				}
			}
		}
		.location {
			margin-top: 80px;
			p {
				font-size: 18px;
				padding-bottom: 10px;
				border-bottom: 1px solid #f5f5f5;
				margin-bottom: 10px;
			}
			.myMap {
				margin-top: 10px;
				margin-bottom: 50px;
			}
		}
	}
	
	.secondTab {
		.tabMenu {
			margin-top: 30px;
			ul {
				display: flex;
				li {
					margin-right: 30px;
					font-size: 18px;
					color: #666666;
					cursor: pointer;
					&.active {
						color: #7C6AFF;
					}
				}
			}
		}
		.top {
			display: flex;
			align-items: center;
			padding-bottom: 30px;
			border-bottom: 1px solid #f0f0f0;
			.rate {
				font-size: 18px;
				padding: 26px 30px 30px 0px;
				border-right: 1px solid #f0f0f0;
				margin-right: 35px;
			}
			.think {
				width: 80%;
				&>div {
					font-size: 12px;
					margin-bottom: 10px;
				}
				ul {
					display: flex;
					li {
						display: flex;
						align-items: center;
						padding: 4px 10px;
						background: #ff641f;
						margin-right: 10px;
						color: #fff;
						p {
							margin-right: 8px;
						}
					}
				}
			}
		}
		.comment {
			margin-top: 30px;
			.list {
				&>li {
					display: flex;
					margin-bottom: 70px;
				}
			}
			.user {
				margin-right: 30px;
			}
			.content {
				margin: 10px 0px 30px 0px;
			}
			.user {
				text-align: center;
				.avatar {
					width: 79px;
					height: 79px;
					img {
						width: 100%;
					}
				}
				p {
					font-size: 12px;
					margin-top: 10px;
				}
			}
			.imgList {
				display: flex;
				li {
					width: 158px;
					height: 158px;
					margin-right: 20px;
					img {
						width: 100%;
					}
				}
			}
		}
	}
	
	.equipTable {
		border: none;
		/*margin-top: 90px;*/
		margin-bottom: 65px;
	}
	
	.tableFoot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	/deep/ {
		.el-date-editor {
			.el-input__prefix {
				display: block;
			}
		}
	}
	
	ul {
		list-style: none;
	}
	
	.confirmBtn {
		background-color: #7C6AFF;
		border-radius: 0px;
		color: #fff;
	}
	
	.cancelBtn {
		background-color: transparent;
		border-radius: 0px;
		border: 1px solid #d9d9d9;
	}
	.commentPage{
		display:flex;
		justify-content:center;
		margin-bottom:20px;
	}
	/deep/{
		.notAllow{
			background-color:#eee;
			cursor:not-allowed;
			td:last-child{
				.cell{
					display:none;
				}
			}
		}
		
		.el-tabs__content{
			padding:0px;
		}
		
	}
		
	table{
		width:100%;
		border-collapse: collapse;
		border:none;
		tr{
			display:flex;
			.name,.price{
				width:17%;
			}
			.content{
				width:66%;
			}
		}
		td{
			padding:10px 20px;
			border: 1px solid #e6e6e6;
			display:flex;
			align-items:center;
		}
	}
	
</style>