<template>
	<div class="main_content">
		<div class="head">
			<div class="bread" v-if="modelInfo">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/model/index">模特</el-breadcrumb-item>
					<!--<el-breadcrumb-item>{{modelInfo.title?modelInfo.title:modelInfo.real_name}}</el-breadcrumb-item>-->
					<el-breadcrumb-item>模特详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<front-searchbox type="1" @search="search" :searchTxt="searchTxt"></front-searchbox>
		</div>
		<div class="productDetail model-detail" v-if="modelInfo">
			<div class="left">
				<imglist-view  :imgList="modelInfo.photo" type="2"></imglist-view>
			</div>
			<div class="right">
				<div class="model-title">
					<el-tooltip class="item" effect="light" content="个人私单原因解释" placement="bottom-start">
				      <el-button v-if="modelInfo.isPerson">个人私单</el-button>
				    </el-tooltip>
					{{modelInfo.title?modelInfo.title:modelInfo.real_name}}
				</div>
				<div class="model-info">
					<div class="more">
						<div class="selectTime col">
							<select-time :dateStart="dateStart" :dateEnd="dateEnd"></select-time>
							<el-button type="text" @click="showModelDays" style="border:none;background:none;">查看模特档期 ></el-button>
						</div>
						<div class="personInfo col">
							<span class="first">个人资料：</span>
							<div class="info">
								<ul class="leftInfo">
									<li>
										<span>姓名：</span>
										<span>{{modelInfo.real_name}}</span>
									</li>
									<li>
										<span>性别：</span>
										<span>{{modelInfo.sex==1?'男':'女'}}</span>
									</li>
									<li>
										<span>常驻城市：</span>
										<span>{{modelInfo.city}}</span>
									</li>
									<li>
										<span>身高：</span>
										<span>{{modelInfo.height}}cm</span>
									</li>
									<li>
										<span>体重：</span>
										<span>{{modelInfo.weight}}kg</span>
									</li>
									<li>
										<span>三围：</span>
										<span>{{modelInfo.upper}}/{{modelInfo.waist}}/{{modelInfo.hips}}</span>
									</li>
									<li>
										<span>鞋码：</span>
										<span>{{modelInfo.shoes}}码</span>
									</li>
									<li>
										<span>国籍：</span>
										<span>{{modelInfo.nationality}}</span>
									</li>
								</ul>

								<ul class="rightInfo">
									<li>
										<span>当前发型：</span>
										<span>{{modelInfo.hair==1?'直长发':'短发'}}</span>
									</li>
									<li>
										<span>肤色：</span>
										<span v-if="modelInfo.skin==1">白色</span>
										<span v-if="modelInfo.skin==2">黄色</span>
										<span v-if="modelInfo.skin==3">黑色</span>
									</li>
									<li>
										<span>脸型：</span>
										<span v-if="modelInfo.face==1">圆脸</span>
										<span v-if="modelInfo.face==2">长脸</span>
										<span v-if="modelInfo.face==3">瓜子脸</span>
									</li>
									<li>
										<span>臂展：</span>
										<span>{{modelInfo.wingspan}}cm</span>
									</li>
									<li>
										<span>肩宽：</span>
										<span>{{modelInfo.shoulder}}cm</span>
									</li>
									<li>
										<span>是否双眼皮：</span>
										<span>{{modelInfo.eyelid==1?'否':'是'}}</span>
									</li>
									<li>
										<span>第一语言：</span>
										<span>{{modelInfo.firstLan}}</span>
									</li>
									<li>
										<span>第二语言：</span>
										<span>{{modelInfo.secondLan}}</span>
									</li>
								</ul>
							</div>
						</div>
						<div>
							<span class="first">拍摄风格：</span>
							<span>{{modelInfo.typeStr}}</span>
						</div>
						<div>
							<span class="first">模特标签：</span>
							<span>{{modelInfo.tagStr}}</span>
						</div>
						<div>
							<span class="first">工作时间：</span>
							<span>{{modelInfo.working}}</span>
						</div>
						<div class="price">
							<span class="first">购买单价：</span>
							<span class="num">{{modelInfo.ppd}}元</span>
							<span class='unit'>/天</span>
						</div>
						<div class="operate">
							<div class="leftBtn">
								<el-button class="cur color-area" @click="payOrder">立即抢购</el-button>
								<el-button class="iconBtn collectBtn" :class="{'collect':isCollect}" @click="collect(1)">
									<ali-svg-icon icon-class="like" class="likeIcon" v-if="!isCollect"></ali-svg-icon>
									<ali-svg-icon icon-class="liked" class="likedIcon" v-if="isCollect"></ali-svg-icon>
									<span>收藏</span>
								</el-button>
							</div>
							<el-button @click="toChat(equipInfo)">
								<ali-svg-icon icon-class="customer_service" class="contactIcon"></ali-svg-icon>
								联系商家
							</el-button>
						</div>
					</div>

					<!--店铺信息-->
					<service-store type="0" :info="modelInfo"></service-store>
					<!--<div class="store">
						<div class="storeInfo">
							<div class="autoImg" style="width:64px;height:64px;">
								<img class="cursor" :src="modelInfo.to_user.avatar?$qiniuHost+modelInfo.to_user.avatar:config.defaultStorePic" @click="toShopPage"/>
							</div>
							<div>
								<p>
									<span>店名:</span>
									<span class="storeName cursor word-hover" @click="toShopPage">{{modelInfo.to_user.nick}}</span>
								</p>
								<p>
									<span>地址:</span> 暂不显示
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
					</div>-->

				</div>
			</div>

		</div>

		<!--底部模块-->
		<div class="footContent">
			<!--产品参数、评论等模块-->
			<div class="moreDetail" v-if='modelInfo'>
				<div class="tabBar">
					<el-tabs v-model="tabIndex" type="card" @tab-click="changeTab">
						
						<!--基本信息模块-->
						<el-tab-pane label="服务详情" name="0">
							<div v-html="modelInfo.info" class="detail">
							</div>
						</el-tab-pane>
						
						<el-tab-pane label="成功案例" name="1">
							
						</el-tab-pane>
						
					</el-tabs>
				</div>
			</div>
			<!--右侧产品推荐模块-->
			<div class="selectGoods">
				<recommend-good detail="1" type="1"></recommend-good>
			</div>
		</div>
		
		
		<!--显示模特档期弹窗-->
		<model-days :isShow.sync="isShowModelDays" :id.sync="modelId" @closed="closeModelDays"></model-days>
		
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
		
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import imglistView from "FrontComponents/imgListView";
	import selectTime from "FrontComponents/selectTime";
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import modelDays from "FrontComponents/modelDays"
	import recommendGood from "FrontComponents/recommendGood";
	import miniLogin from "FrontComponents/minilogin";
	import {collectStore,collectOther,getUserLsObj} from "@util/common.js";
	import serviceStore from "FrontComponents/serviceStore";
	export default {
		data() {
			return {
				modelId: '', //显示的模特id
				modelInfo: null,
				dateStart: "", //开始时间
				dateEnd: "", //结束时间
				isCollect: '', //是否已经收藏
				storeIsCollect:'', //店铺是否已经收藏
				isShowModelDays:false, //是否显示模特档期
				searchTxt:'',  //搜索文本
				options: [
					"obt1",
					"obt2",
					"obt3",
					"obt4",
				],
				optionIndex: 0,
				num: 0,
				detailObjs: [{
						name: '产品属性',
						active: true
					},
					{
						name: '服务须知',
						active: false
					},
				],
				dateLine: '',
				tabIndex:0, //tab选项下标
				isShowDialog:false, //是否显示登录窗口
			};
		},
		components: {
			imglistView,
			selectTime,
			modelDays,
			frontSearchbox,
			recommendGood,
			miniLogin,
			serviceStore
		},
		created() {
			this.modelId = this.$route.query.id;
			this.getDetailById(this.modelId);
		},
		watch: {
			
		},
		mounted() {

		},
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//关闭登录对话框
			closeLogin() {
				this.isShowDialog = false;
			},
			//收藏(取消收藏)，关注(取消关注）方法 type: 0表示店铺本身，1表示影棚，2表示设备，3表示活动 4模特 5拼拍
			collect(type) {
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(type == 0) {
					collectStore(this.modelInfo.uid, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				} else if(type == 1) {
					collectOther(this.modelInfo.id, "4", "1", this.modelInfo.id).then(
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
			//搜索内容
			search(){
				
			},
			//显示模特档期
			showModelDays(){
				console.log('showModelDays--------');
				this.isShowModelDays=true;
			},
			
			//关闭模特档期
			closeModelDays(){
				this.isShowModelDays=false;
			},
			//跳转到店铺页面
			toShopPage(){
				
			},
			//获取模特详情
			getDetailById(id) {
				let params = {
					id: id
				}
				this.util.getModelList(params).then(res => {
					console.log('getModelList--------', res);
					this.modelInfo = res;
					
					//为详情添加一个是否是个人的字段
					if([64,128].includes(parseInt(res.to_user.role))){
						this.modelInfo.isPerson=true;
					}
					
					console.log('this.modelInfo--------', this.modelInfo);
					this.showLanguage();
					this.showTag();
					//获取是否收藏信息
					this.getCollect();
				})
			},
			
			//获取该影棚或者店铺是否已经收藏
			getCollect() {
				//判断用户是否已经登录
				if(this.util.userIsLogin()) {

					//判断该设备是否已经被收藏
					getUserLsObj(this.modelInfo.id, "4", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});

					//判断该店家是否已经收藏
					getUserLsObj(this.modelInfo.uid, "0", "1").then(res => {
						if(res) {
							this.storeIsCollect = true;
						}
					});
				}else{
					//没有登录也显示联系客服模块
//					this.showContact=true;
				}
			},
			
			//转换语言显示(为对象添加firstLan,secondLan)
			showLanguage(){
				this.config.languageType.forEach((item,index)=>{
					if(this.modelInfo.lan_one==item.value){
						this.modelInfo.firstLan=item.label;
					}
					if(this.modelInfo.lan_two==item.value){
						this.modelInfo.secondLan=item.label;
					}
				})
			},
			
			//转换类型，标签显示（为对象添加typeStr,tagStr)
			showTag(){
				let tempType=this.modelInfo.type.split(',');
				let typeList=[];
				this.config.modelTypeList.forEach((item,index)=>{
					tempType.forEach((item2,index2)=>{
						if(item.id==item2){
							typeList.push(item.name);
						}
					})
				})
				this.modelInfo.typeStr=typeList.join(',');
				
				let tempTag=this.modelInfo.style.split(',');
				let tagList=[];
				this.config.shootingTypeList.forEach((item,index)=>{
					tempTag.forEach((item2,index2)=>{
						if(item.id==item2){
							tagList.push(item.name);
						}
					})
				})
				this.modelInfo.tagStr=tagList.join(',');
				
			},
			
			//立即付款
			payOrder() {
				//判断用户是否有登录
				if(!this.util.userIsLogin()) {
					this.isShowDialog = true;
				} else {
					if(!this.dateStart || !this.dateEnd){
						this.$message.warning('请选择时间！');
					}else{
						this.util.toModelOrder(this.modelId,this.dateStart,this.dateEnd);
					}
				}
			},
			selectOption(val) {
				this.optionIndex = val;
			},
			handleCount() {

			},
			//切换tab选项
			changeTab(){
				
			},

		}
	};
</script>

<style lang="scss" scoped>
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
	}
	
	.model-detail {
		color:#666;
		display: flex;
		button {
			background: #fff;
			border: 1px solid #f0f0f0;
			border-radius: 0px;
		}
		.right {
			flex: 1;
		}
		.model-title {
			font-size: 18px;
			padding-bottom: 20px;
		}
		.model-info {
			font-size: 14 px;
			.more{
				background-color: #FAFAFA;
				line-height: 30px;
				padding: 20px;
				.selectTime{
					display:flex;
					justify-content: space-between;
					align-items:center;
				}
			}
			.sub-title {
				color: #999999;
				width: 80px;
				display: inline-block;
			}
			div {
				span.first {
					margin-right: 10px;
				}
			}
			.col {
				padding-bottom: 20px;
			}
			.price {
				padding:20px 0px;
				border-top:1px solid #E0E0E0;
				margin-top:20px;
				.num{
					color:#FF0000;
					font-size:18px;
					font-weight:600;
				}
				.unit{
					color:#666666;
					font-size:14px;
				}
			}
			.type {
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
		.model-compony {
			.title {
				padding: 20px 10px;
				font-size: 24px;
				font-weight: bold;
				background-color: #d9d9d9;
			}
			.compony {
				padding: 20px 10px;
				background-color: #f8f8f8;
				p {
					line-height: 30px;
				}
			}
		}
	}
	
	.model-content {
		.other-detail {
			margin-top: 100px;
			.shuxing {
				height: 1000px;
			}
			.xuzhi {
				height: 1000px;
			}
		}
	}
	
	.personInfo {
		display: flex;
		.info {
			flex: 1;
			padding: 20px 100px 20px 20px;
			color: #fff;
			display: flex;
			position: relative;
			justify-content: space-between;
			background: rgba(94, 94, 94, 1);
			ul {
				li {
					span:first-child {
						color: #999999;
					}
				}
			}
			&:after {
				content: '';
				position: absolute;
				top: 4px;
				left: -10px;
				width: 0;
				height: 0;
				border-top: 12px solid transparent;
				border-bottom: 10px solid transparent;
				border-right: 14px solid #5e5e5e;
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
			.storeName {
				color: #000;
			}
			.autoImg {
				margin-right: 25px;
				border: 1px solid #F0F0F0;
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
	.el-button.el-tooltip{
		color:#fff;
		padding:5px 6px;
		background:#5588F3;
		margin-right:10px;
	}
	/deep/{
		.el-date-editor {
			width: 118px;
			margin-right:10px;
			.el-input__inner {
				width: 100%;
				padding-right: 10px;
				height: 34px;
				line-height: 34px;
				text-indent: 8px;
				border:none;
				border-radius:0px;
				padding-left:25px;
			}
			.el-input__icon {
				line-height: 34px;
			}
		}
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
	
</style>