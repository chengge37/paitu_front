<template>
	<div class="main_content">
		<div class="head">
			<div class="bread">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>套餐</el-breadcrumb-item>
					<el-breadcrumb-item v-if="packInfo">{{packInfo.name}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<front-searchbox type="1" @search="search" :searchTxt="searchTxt"></front-searchbox>
		</div>
		<div class="body">
			<!--产品信息模块-->
			<div class="productDetail" v-if="packInfo">
				<!--图片预览模块-->
				<imglist-view :imgList="packInfo.pic" v-if="packInfo" type="1"></imglist-view>
				<!--产品模块-->
				<div class="info">
					<p class="title">{{packInfo.name}}</p>
					<div class="more">
						<div>
							<span class="first">类型选择：</span>
							<el-button :disabled="index==1 && packInfo.only_rent_day==1" class="optionBtn" @click="selectOption(index)" v-for="(item,index) in options" :key="index" :class="{'active':optionIndex==index}">{{item}}</el-button>
							<!--<p class="tip">租一天价格较为优惠</p>-->
						</div>
						<div v-if="optionIndex==0">
							<select-time :dateStart="dateStart" :dateEnd="dateEnd"></select-time>
						</div>
						<div v-else>
							<span class="first">开始时间：</span>
							<el-date-picker value-format="yyyy-MM-dd" v-model="curDay" :picker-options="pickerOptionsStart" type="date" placeholder="选择日期"></el-date-picker>
							<el-time-select placeholder="开始时间" v-model="startTime" :picker-options="{start: '00:00',step: '00:30',end: '23:30'}"></el-time-select>
							<span class="first">结束时间：</span>
							<el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{minTime: startTime,start: '00:00',step: '00:30',end: '23:30'}"></el-time-select>
							<span v-show="hours" class='hours'>时长{{hours}}小时(不足1小时按1小时计算)</span>
						</div>
						<!--<div>
							<span class="first">数量：</span>
							<el-input-number v-model="equipNum" controls-position="right" @change="handleCount" :min="1" :max="parseInt(packInfo.count)"></el-input-number>
							<span class="stock">库存{{packInfo.count}}件</span>
						</div>-->
						<div>
							<span class="first">拿取方式：</span>
							<el-button class="optionBtn" @click="selectMode(index)" :disabled="packInfo.door_to_door!='1'" v-for="(item,index) in modeList" :key="index" :class="{'active':modeIndex==index}">{{item}}</el-button>
							<p class="tip">送货上门费用商议</p>
						</div>
						
						
						<div class="price">
							<span class="first">租赁价格：</span>
							<p class="money" v-if="optionIndex==0">
								<span class="num">{{packInfo.priceDay}}元</span>
								<span>/天</span>
							</p>
							<p class="money" v-if="optionIndex==1">
								<span class="num">{{packInfo.priceHour}}元</span>
								<span>/小时</span>
							</p>
						</div>

						<div class="operate">
							<div class="leftBtn">
								<el-button class="cur color-area" @click="submitOrder">立即租借</el-button>
								<el-button class="iconBtn collectBtn" :class="{'collect':isCollect}" @click="collect(1)">
									<ali-svg-icon icon-class="like" class="likeIcon" v-if="!isCollect"></ali-svg-icon>
									<ali-svg-icon icon-class="liked" class="likedIcon" v-if="isCollect"></ali-svg-icon>
									<span>收藏</span>
								</el-button>
							</div>
							<el-button @click="toChat(packInfo)">
								<ali-svg-icon icon-class="customer_service" class="contactIcon"></ali-svg-icon>
								联系商家
							</el-button>
						</div>
					</div>
					<div class="store" v-if="storeInfo">
						<div class="storeInfo">
							<div class="autoImg" style="width:64px;height:64px;">
								<img class="cursor" :src="storeInfo.avatar?$qiniuHost+storeInfo.avatar:config.defaultStorePic" @click="toShopPage"/>
							</div>
							<div>
								<p>
									<span>店名:</span>
									<span class="storeName cursor word-hover" @click="toShopPage">{{storeInfo.nick}}</span>
								</p>
								<p>
									<span>地址:</span> 
									{{storeInfo.address}}
								</p>
								<p class="identify">
									<ali-svg-icon icon-class="confirm" class="confirmIcon"></ali-svg-icon>
									<span>已认证</span>
								</p>
							</div>
						</div>
						<div class="other">
							<el-button @click="toShopPage">进店逛逛</el-button>
							<el-button class="iconBtn collectBtn" @click="collect(0)">
								<ali-svg-icon icon-class="like" class="likeIcon" v-if="!storeIsCollect"></ali-svg-icon>
								<ali-svg-icon icon-class="liked" class="likedIcon" v-if="storeIsCollect"></ali-svg-icon>
								<span>收藏</span>
							</el-button>
						</div>
					</div>
				</div>
			</div>


			<!--底部模块-->
			<div class="footContent">
				<!--产品参数、评论等模块-->
				<div class="moreDetail" v-if='packInfo'>
					<div class="tabBar">
						<el-tabs v-model="tabIndex" type="card" @tab-click="handleClick">
							
							<!--基本信息模块-->
							<el-tab-pane label="基本信息" name="0">

								<div class="video">
									<video width="100%" height="480" controls v-if="packInfo.video">
										<source :src="$qiniuHost+packInfo.video" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。
									</video>
								</div>
								<div class="productInfo">
									<!--<p>产品信息</p>-->
									<div v-html="packInfo.info" class="detail">
									</div>
								</div>
								<div class="location" v-if="storeInfo">
									<p class="title">地理位置</p>
									<span class="address">地址：{{storeInfo.address}}</span>
									<!--地图显示位置-->
									<my-map :lat="lat" :lng="lng" :address="address"  class="myMap"></my-map>
								</div>
								
								<div class="check">
									<p>核验单流程，交易更放心</p>
									<ul>
										<li v-for="(item,index) in checkInfos" :key="index">
											<img :src="$qiniuHost+'images/'+item.pic"/>
											<p>{{item.step}}</p>
											<span>{{item.info}}</span>
											<img v-if="index!=4" class="arrow" src="https://pic.paitume.com/135-1574066481841.png"/>
										</li>
									</ul>
								</div>
							</el-tab-pane>
							
						</el-tabs>
					</div>
				</div>
				<!--右侧产品推荐模块-->
				<div class="selectGoods">
					<recommend-good detail="1" type="1"></recommend-good>
				</div>
			</div>
		</div>

		<!--联系客服模块-->
		<contact :cartInfo="orderCart" v-if="showContact"></contact>


		<!--底部查找模块-->
		<find @search="footSearch" type="1"></find>

		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import myMap from "ServeComponents/Amap/index.vue";
	import recommendGood from "FrontComponents/recommendGood";
	import pagination from"FrontComponents/pagination";
	import find from "FrontComponents/find";
	import selectTime from "FrontComponents/selectTime";
	import miniLogin from "FrontComponents/minilogin";
	import contact from "FrontComponents/contact";
	import { storage } from "@util/storage.js";
	import {
		getOrderCartNum,
		userIsLogin,
		collectStore,
		collectOther,
		getUserLsObj
	} from "@util/common.js";
	import imglistView from "FrontComponents/imgListView";
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: time => {
						return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					}
				},
				modeList: ["到店自取", "同城配送"],
				modeIndex: 0, //拿取方式下标
				packInfo: null, //套餐详情信息
				equipStatic: {}, //设备基本信息
				orderCart: {}, //购物车信息
				isCollect: false, //是否已经收藏
				storeIsCollect: false, //店铺是否已经收藏
				storeInfo:null, //店家信息
				hours: 0, //用户选择时长
				curDay: "", //当前日期
				startTime: "", //按小时计算开始时间
				endTime: "", //按小时计算结束时间
				packId: "", //当前设备id
				allDate: [],
				timeOption: "1",
				tabActive: "0",
				tabList: ["默认", "最新"],
				searchTxt: "",
				time: "",
				dateStart: "",
				dateEnd: "",
				tabIndex: "0",
				lat: "",
				lng: "",
				address: "",
				optionIndex: 0, //0按天，1按小时
				options: ["按天租", "按小时"],   //租赁模式
				showContact:false,   //是否显示联系客服模块
				checkInfos:[{
					pic:'heyandan_01.png',
					step:'下单',
					info:'顾客付款'
				},{
					pic:'heyandan_02.png',
					step:'核验单',
					info:'商家上传核验单'
				},{
					pic:'heyandan_03.png',
					step:'验货',
					info:'核验单与订单货物一致'
				},{
					pic:'heyandan_04.png',
					step:'确认',
					info:'核验单页面点击确认'
				},{
					pic:'heyandan_05.png',
					step:'完成',
					info:'使用设备和影棚'
				}],
				isShowDialog:false, //是否显示登录框
			};
		},
		components: {
			frontSearchbox,
			myMap,
			recommendGood,
			find,
			selectTime,
			imglistView,
			miniLogin,
			pagination,
			contact,
		},
		created() {
			this.packId = parseInt(this.$route.query.id);
			this.getPackInfo(this.packId);
		},
		watch: {
			startTime(to,from){
				console.log('startTime-----',this.startTime);
				let prefix=this.util.getCurDay()+' ';
				if(this.endTime){
					this.hours=this.util.calHours(prefix+this.startTime,prefix+this.endTime);
				}
			},
			endTime(to,from){
				let prefix=this.util.getCurDay()+' ';
				if(this.startTime){
					this.hours=this.util.calHours(prefix+this.startTime,prefix+this.endTime);
				}
			},
		},
		mounted() {},
		computed: {
      ...mapGetters(["user_data"])
    },
		methods: {
			//关闭登录对话框
			closeLogin() {
				this.isShowDialog = false;
			},
			//获取商家店铺基本信息
			getShopInfo(uid){
				this.util.getShopInfo(uid).then(res=>{
					this.storeInfo=res;
					//如果店铺不展示，则跳出
					if(this.storeInfo.data_lock==2){
						this.util.notFound(this,'设备');
					}
					this.lat=this.storeInfo.lat;
					this.lng=this.storeInfo.lng;
					this.address=this.storeInfo.address;
				})
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
			
			//判断用户是否有选择时间，返回true,false
			checkTime(){
				if((this.dateStart && this.dateEnd && this.optionIndex == 0) ||
					(this.curDay && this.startTime && this.endTime && this.optionIndex == 1)
					){
						if(this.optionIndex == 1) {
							if(this.hours < parseInt(this.assistantInfo.hour_num)) {
								this.$message.warning('选择时间小于起拍小时！请重新选择！');
								return false;
							}
						}
						return true;
					}else{
						this.$message.warning('请选择时间！');
						return false;
					}
			},
			
			//获取该影棚或者店铺是否已经收藏
			getCollect() {
				//判断用户是否已经登录
				if(userIsLogin()) {
					//获取购物车信息
					this.getOrderCart('first');

					//判断该设备是否已经被收藏
					getUserLsObj(this.packId, "2", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});

					//判断该店家是否已经收藏
					getUserLsObj(this.packInfo.uid, "0", "1").then(res => {
						if(res) {
							this.storeIsCollect = true;
						}
					});
				}else{
					//没有登录也显示联系客服模块
					this.showContact=true;
				}
			},
			
			//根据id获取套餐详情
			getPackInfo(id) {
				this.util.packAjaxDetail(id).then(res => {
						console.error('getPackInfo------------',res);
						//为套餐信息添加每天价格，每小时价格
						res.price_arr.forEach((item,index)=>{
							if(item.rent_type==2 && !res.priceDay){
								res.priceDay=item.price
							}
							if(item.rent_type==1 && !res.priceHour){
								res.priceHour=item.price
							}
						})
						this.packInfo=res;
						//获取店铺信息
						this.getShopInfo(res.uid);
				}).catch(err => {
					console.log(err.message);
			        if (err.message.includes("不存在"))
			        this.util.notFound(this,'设备');
				});
			},

			
			//用户提交订单
			submitOrder() {
				//判断用户是否有登录
				if(!userIsLogin()) {
					this.isShowDialog = true;
				} else {
					if(this.checkTime()){
						console.error('this.packInfo.door_to_door-----------------',this.packInfo.door_to_door);
						if(this.optionIndex==0){
							this.util.toPackOrder(this.packId, this.dateStart, this.dateEnd,2,this.packInfo.door_to_door||'0');
						}else{
							let startTime = `${this.curDay} ${this.startTime}:00`;
							let endTime = `${this.curDay} ${this.endTime}:00`;
							this.util.toPackOrder(this.packId, startTime, endTime,1,this.packInfo.door_to_door||'0');
						}
					}
				}
			},

			//跳转到店铺页面
			toShopPage(){
				this.util.toShopPage(this.packInfo.uid);
			},

			//收藏(取消收藏)，关注(取消关注）方法 type: 0/为店铺 1/器材
			collect(type) {
				console.log("collect----",type);
				console.log('this.packId',this.packId);
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(type == 0) {
					collectStore(this.packInfo.uid, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				} else if(type == 1) {
					collectOther(this.packId, "2", "1", this.packId).then(
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
			handleClick() {},
			selectOption(val) {
				this.optionIndex = val;
				console.log("this.optionIndex---", this.optionIndex);
			},
			footSearch(val) {},
			
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
			border: 1px solid #f0f0f0;
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
						padding-top: 20px;
						border-top: 1px solid #f0f0f0;
						margin-bottom: 10px;
						display:flex;
						align-items:center;
						.money {
							font-size: 0px;
							span {
								font-size: 12px;
							}
							.num {
								font-size: 24px;
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
			padding: 0px 20px;
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
			/*margin-top: 80px;*/
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
			margin:20px 0px;
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
	
	.thirdTab,
	.fourTab {
		margin-top: 30px;
		ul {
			li {
				margin-bottom: 60px;
				p {
					font-size: 18px;
					margin-bottom: 22px;
					display: flex;
				}
				.svg-icon{
					display:block;
					width:20px;
					height:20px;
					margin-right:10px;
				}
				.AIcon{
					width:27px;
				}
				.answer {
					span {
						font-size: 14px;
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
		
	}
	.askQA{
		display:flex;
		align-items:center;
		margin:30px 0px;
		/deep/ {
			.el-input{
				width:auto;
			}
			.el-input__inner{
				width:250px;
				border-radius:0px;
			}
		}
		button{
			background:$Theme-color;
			border-radius:0px;
		}
	}
	
	.pack{
		border: 1px solid #f0f0f0;
	    padding: 10px;
	    margin-bottom: 20px;
	    .packList{
	    	max-height: 135px;
    		overflow-y: auto;
	    	li{
	    		display:flex;
	    		align-items:center;
	    		justify-content: space-between;
	    		margin-bottom:20px;
	    		.picList{
	    			max-width:70%;
	    			overflow-x: auto;
	    			p{
	    				margin:0px 15px;
	    			}
	    		}
	    		.price{
	    			flex-direction:column;
	    			margin-right:20px;
	    		}
	    		div{
	    			display:flex;
	    			align-items:center;
	    		}
	    	}
	    }
	}
</style>
