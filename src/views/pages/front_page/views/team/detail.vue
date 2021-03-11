<template>
	<div class="main_content">
		<div class="head">
			<div class="bread">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/team/index">拼拍</el-breadcrumb-item>
					<el-breadcrumb-item>拼拍名称</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<front-searchbox type="1" @search="search" :searchTxt="searchTxt"></front-searchbox>
		</div>
		<div class="body">
			<!--产品信息模块-->
			<div class="productDetail" v-if='teamInfo'>
				<!--图片预览模块-->
				<imglist-view :imgList="teamInfo.photo" v-if="teamInfo" type="4"></imglist-view>
				<!--产品模块-->
				<div class="info">
					<div class="showTitle">
						<p>团</p>
						<span>{{teamInfo.title}}</span>
					</div>
					<div class="more">
						<div>
							<span class="first">购买数量：</span>
							<el-input-number v-if="parseInt(teamInfo.stockNum)<=parseInt(teamInfo.team_limit) || teamInfo.team_limit==0" v-model="buyNum" controls-position="right" @change="changeCount" :min="1" :max="parseInt(teamInfo.stockNum)"></el-input-number>
							<el-input-number v-else v-model="buyNum" controls-position="right" @change="changeCount" :min="1" :max="parseInt(teamInfo.team_limit)"></el-input-number>
							<span class="stock">剩余{{teamInfo.stockNum}}件
								<span v-if="teamInfo.team_limit!=0" class="limit">(每人限购{{teamInfo.team_limit}}件)</span>
								<span v-else class="limit">(不限购)</span>
							</span>
						</div>
						
						<div>
							<div class="price">
								<span class="first">购买单价：</span>
								<p class="money">
									<span class="num">{{teamInfo.price}}元</span>
								</p>
							</div>
						</div>
						
						<div>
							<div class="price">
								<span class="first">原价：</span>
								<p class="money">
									<span class="oldNum">{{teamInfo.price_base}}元</span>
								</p>
							</div>
						</div>
						
						<div class="time">
							<div class="left">
								<div class="buy">
									<p>
										<span v-if="teamInfo.differ">还差{{parseInt(teamInfo.team_num)-parseInt(teamInfo.total)}}件成团，</span>
										
										<span v-if="remindTime!=0 && teamInfo.stockNum>0">剩余{{remindTime[0]}}天{{remindTime[1]}}时{{remindTime[2]}}分{{remindTime[3]}}秒{{remindTime[4]}}</span>
										<span v-if="remindTime==0 || teamInfo.stockNum<=0">拼团结束</span>
									</p>
									<button v-if="remindTime!=0 && teamInfo.stockNum>0" class="cursor color-area" @click="toTeam">该商品在参加拼拍，立刻拼团 ></button>
									<button v-if="remindTime==0 || teamInfo.stockNum<=0" class="color-area" style="cursor:not-allowed;background:gray;">该商品在参加拼拍，立刻拼团 ></button>
								</div>
								<el-button class="iconBtn collectBtn" :class="{'collect':isCollect}" @click="collect(1)">
									<ali-svg-icon icon-class="like" class="likeIcon" v-if="!isCollect"></ali-svg-icon>
									<ali-svg-icon icon-class="liked" class="likedIcon" v-if="isCollect"></ali-svg-icon>
									<span>收藏</span>
								</el-button>
							</div>
							<div class="right">
								<el-button @click="toChat(teamInfo)">
									<ali-svg-icon icon-class="customer_service" class="contactIcon"></ali-svg-icon>
									联系商家
								</el-button>
							</div>
						</div>
						
						<!--下单流程图-->
						<div class="process">
							<div class="stepLine"></div>
							<div class="step">
								<div>
									<p>下单</p>
									<span class="round"></span>
								</div>
								<div>
									<p>收件结束</p>
									<span class="round"></span>
								</div>
								<div>
									<p>拍摄</p>
									<span class="round"></span>
								</div>
								<div>
									<p>交付</p>
									<span class="round"></span>
								</div>
								<div>
									<p>售后结束</p>
									<span class="round"></span>
								</div>
							</div>
							<div class="stepTime">
								<span style="opacity:0;">2020-02-24</span>
								<span>{{teamInfo.team_receipt}}</span>
								<span>{{teamInfo.team_shot}}</span>
								<span>{{teamInfo.team_deliver}}</span>
								<span>{{teamInfo.team_service}}</span>
							</div>
						</div>
						
						<!--<div>
							<span class="first">交付速度：</span>
							<span class="stock">到样后5个工作日</span>
						</div>-->
						
						<div class="promise" v-if="teamInfo && teamInfo.labelList">
							<span class="first">服务承诺：</span>
							<div class="detail" v-for="(item,index) in teamInfo.labelList" :key="index">
								<span>{{item}}</span>
							</div>
						</div>
						
					</div>
					
					<!--店家信息-->
					<service-store type="2" :info="teamInfo"></service-store>
					
				</div>
			</div>

			<!--底部模块-->
			<div class="footContent">
				<!--服务详情、成功案例等模块-->
				<div class="moreDetail" v-if='teamInfo'>
					<div class="tabBar">
						<el-tabs v-model="tabIndex" type="card" @tab-click="changeTab">
							
							<!--基本信息模块-->
							<el-tab-pane label="服务详情" name="0">
								
								<div class="productInfo">
									<!--<p>产品信息</p>-->
									<div v-html="teamInfo.content" class="detail">
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
					<recommend-good detail="1" type="4"></recommend-good>
				</div>
			</div>
		</div>

		<!--联系客服模块-->
		<!--<contact :cartInfo="orderCart" v-if="showContact"></contact>-->

		<!--拼团信息窗口模块-->
		<el-dialog :visible.sync="showTeam" v-if="teamInfo" class="teamTable" width="550px">
      		<div class="top">
      			<span>参与拼拍</span>
      			<p>
      				<span>仅剩{{teamInfo.stockNum}}件,</span>
      				<span v-if="remindTime!=0">剩余{{remindTime[0]}}天{{remindTime[1]}}时{{remindTime[2]}}分{{remindTime[3]}}秒{{remindTime[4]}}后结束</span>
      				<span v-else>拼团结束</span>
      			</p>
      		</div>
      		<ul class="buyList" v-if="userOrder.length>0">
      			<li v-for="(item,index) in userOrder" :key="index">
      				<el-image style="width:70px;height:70px;" fit="contain" :src="util.picExplode(item.avatar)"/>
      				<div class="dotLine"></div>
      				<span>购买了{{item.usernum}}件</span>
      			</li>
      		</ul>
      		<ul class="buyList" v-else>
      			<div style="display:flex;justify-content:center;">暂无人拼拍！立即点击下方按钮拼拍</div>
      		</ul>
      		<button class="cursor color-area" @click="payTeam">立即拼拍</button>
    	</el-dialog>
		
		
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
				teamId:'', //服务详情id
				teamInfo:null, //服务详情信息
				searchTxt:'',  //搜索内容
				isShowDialog:false, //是否显示登录弹窗
				productList:[], //项目列表
				buyNum:1,  //购买数量
				isCollect:false,  //是否已经收藏
				storeIsCollect:false, //店铺是否已经收藏
				tabIndex:'0',  //tab下标
				showTeam:false,  //是否显示拼团信息
				buyList:[
					{img:'3-1574930649906.jpg',count:20}
				],
				userOrder:[],  //用户下单信息
				labelList:['延迟退款','不满意重拍'],
				remindTime:[], //剩余时间
				remindTimer:null,  //定时器参数，离开时停掉
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
			this.teamId = parseInt(this.$route.query.id);
			this.getTeamDetail(this.teamId);
		},
		watch: {
			
		},
		destroyed(){
			//清除定时器
			clearTimeout(this.remindTimer);
		},
		mounted() {
			
		},
		computed: {
	      ...mapGetters(["user_data"])
	    },
		methods: {
			//显示拼团信息
			toTeam(){
				console.log('showTeam-------------',this.teamId);
				this.showTeam=true;
				//获取该拼拍下单的用户
				this.getShareOrder(this.teamId);
			},
			
			//获取拼拍下单信息
			getShareOrder(id){
				let params={
					id:id,
				}
				this.util.shareTeamOrder(params).then(res=>{
					console.log('shareTeamOrder----',res);
					this.userOrder=res.user_order;
				})
			},
			
			//点击立即拼购
			payTeam(){
				//判断用户是否已经登录
				if(!this.util.userIsLogin()) {
					this.isShowDialog = true;
				} else{
					//判断有没有库存和时间有没有到
					if(this.teamInfo.stockNum>0 && this.remindTime!=0){
						//跳转到购买页面
						this.util.toTeamOrder(this.teamId,this.buyNum);
					}else{
						this.$message.warning('拼团已结束！');
					}
				}
			},
			
			//获取服务详情内容
			getTeamDetail(id){
				let params={
					id:id
				}
				this.util.getTeamList(params).then(async res=>{
					console.log('getTeamDetail----',res);
					this.teamInfo=res;
					//添加一个剩余件数字段
					this.teamInfo.stockNum=parseInt(res.team_max)-parseInt(res.total);
					//添加一个成团数量差数
					this.teamInfo.differ=(parseInt(res.team_num)-parseInt(res.total))>0?true:false;
					//添加一个服务标签字段
					this.teamInfo.labelList=[];
					this.labelList.forEach((item,index)=>{
						let tempList=this.teamInfo.team_label.split(',');
						tempList.forEach((item2,index2)=>{
							if(item2==index+1){
								this.teamInfo.labelList.push(item);
							}
						})
					})
					
					
					//计算剩下的时间
					//调用方式  需要传入  结束时间   和 倒计时内容所在的id名称
					let curTime=await this.getServerTime();
					console.log('curTime----------',curTime);
					let endTime=`${this.teamInfo.team_receipt} 23:59:59`;
					curTime=new Date(this.util.unix2Time(curTime,'all').replace(/-/g, "/")).getTime();
					this.remindTimer= setInterval(()=>{
						curTime=curTime+100;
						var dates = this.countTime(endTime, curTime);
						this.remindTime=dates;
						if(dates == 0) {
							clearInterval(this.remindTimer)
						}
					}, 100)
					
					//获取是否收藏信息
					this.getCollect();
					
				})
			},
			//收藏(取消收藏)，关注(取消关注）方法 type: 0表示店铺本身，1表示影棚，2表示设备，3表示活动 4模特 5拼拍
			collect(type) {
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(type == 0) {
					collectStore(this.teamInfo.uid, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				} else if(type == 1) {
					collectOther(this.teamInfo.uid, "5", "1", this.teamId).then(
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
					getUserLsObj(this.teamId, "5", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});

					//判断该店家是否已经收藏
					getUserLsObj(this.teamInfo.uid, "0", "1").then(res => {
						if(res) {
							this.storeIsCollect = true;
						}
					});
				}else{
					//没有登录也显示联系客服模块
//					this.showContact=true;
				}
			},
			
			//获取服务器时间
			getServerTime(){
				return new Promise((resolve,reject)=>{
					this.util.getServerTime().then(res=>{
						console.log('getServerTime----',res);
						resolve(res);
					})
				})
				
			},
			
			//立即付款
			payOrder() {
				this.util.toTeamOrder(this.teamId,this.buyNum);
			},
			
			//
			countTime(time, curTime) {
				var now=curTime;
				var end = new Date(time.replace(/-/g, "/")).getTime(); //设置截止时间
				var leftTime = end - now; //时间差             
				var d, h, m, s, ms;
				var arr=[];
				if(leftTime >= 0) {
					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					m = Math.floor(leftTime / 1000 / 60 % 60);
					s = Math.floor(leftTime / 1000 % 60);
					ms = Math.floor(leftTime % 1000)+'';
					if(ms < 100) {
						ms = "0" + ms;
					}
					if(s < 10) {
						s = "0" + s;
					}
					if(m < 10) {
						m = "0" + m;
					}
					if(h < 10) {
						h = "0" + h;
					}
					ms=ms.substring(0,1);
					arr.push(d,h,m,s,ms);
					return arr;
				} else {
					console.log('已截止')
				}
				//递归每秒调用countTime方法，显示动态时间效果
				return 0;
			},
			
			//切换tab
			changeTab(){
				
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
				this.util.toShopPage(this.teamInfo.uid);
			},

			
			//改变数量方法
			changeCount() {
				console.log('changeCount---------',this.buyNum);
			},
			
			search(val) {
				console.log("search11111-----", val);
			},
			search2(val) {
				console.log("search22222-----", val);
				this.searchTxt = val;
				this.getEquipList();
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
							.oldNum{
								font-size: 14px;
							    color: #999;
							    text-decoration: line-through;
							}
						}
					}
					
					.time{
						display:flex;
						align-items:flex-end;
						justify-content:space-between;
						.left{
							display:flex;
							align-items:flex-end;
						}
						.buy{
							margin-right:20px;
							p{
								text-align:right;
								font-size:12px;
								color:#FF0000;
								background:#FFE016;
							}
							button{
								color:#fff;
								padding:10px 20px;
								background:#FF0000;
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
	
	.teamTable{
		.top{
			margin:0px auto;
			text-align:center;
			padding:30px 0px;
			border:1px solid #E0E0E0;
			span{
				font-size:16px;
				display:inline-block;
				margin-bottom:10px;
			}
		}
		.buyList{
			height:350px;
			overflow-y: auto;
			margin:30px 0px;
			li{
				display:flex;
				align-items:center;
				.el-image{
					border-radius:50%;
				}
			}
			.dotLine{
				height:2px;
				border-bottom:1px dashed;
				width:330px;
				margin:0px 10px;
			}
			span{
				font-size:16px;
				color:$Theme-color;
			}
		}
		button{
			margin:0px auto;
			padding:10px;
			border:none;
			display:flex;
			align-items:center;
			justify-content:center;
			background:$Theme-color;
			color:#fff;
			width:75%;
		}
	}
		
	.showTitle{
		display:flex;
		align-items:center;
		margin-bottom:20px;
		p{
			color: #fff;
			font-size:12px;
		    padding: 2px 5px;
		    background: #F35555;
		    border-radius: 3px;
		    margin-right:5px;
		}
		span{
			font-size:18px;
		}
	}
	
	
	/*下单流程样式*/
	.process{
		display:flex;
		flex-direction:column;
		padding:20px 0px;
		border-top:1px solid #E0E0E0;
		border-bottom:1px solid #E0E0E0;
		position:relative;
		.stepLine{
			height:1px;
			background:#E0E0E0;
			top:53px;
			left:0px;
			width:70%;
			position:absolute;
		}
		.step{
			display:flex;
			width:70%;
			justify-content:space-between;
			align-content:center;
			padding-bottom:10px;
			position:relative;
			&>div{
				text-align:center;
				span{
					display:inline-block;
					width:10px;
					height:10px;
					background:#d3d3d3;
					border-radius:5px;
					margin-top:10px;
				}
				p{
					
				}
			}
		}
		.stepTime{
			display:flex;
			font-size:12px;
			color:#aaa;
			width:70%;
			justify-content: space-between;
			align-content:center;
		}
	}
	
	.promise{
		.detail{
			display:flex;
			align-items:center;
			span{
				color:#fff;
				display:inline-block;
				padding:2px 10px;
				background:#4BD99D;
				margin-right:20px;
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
	.limit{
		font-size:12px;
		color:#aaa;
	}
	
</style>