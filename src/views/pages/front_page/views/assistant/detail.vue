<template>
	<div class="main_content">
		<div class="head">
			<div class="bread" v-if="assistantInfo">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/assistant/index">助理</el-breadcrumb-item>
					<el-breadcrumb-item>{{assistantInfo.title?assistantInfo.title:assistantInfo.name}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<front-searchbox type="1" @search="search" :searchTxt="searchTxt"></front-searchbox>
		</div>
		<div class="productDetail assistant-detail" v-if="assistantInfo">
			<div class="left">
				<imglist-view :imgList="assistantInfo.pic" type="2"></imglist-view>
			</div>
			<div class="right">
				<div class="model-title">
					{{assistantInfo.title?assistantInfo.title:assistantInfo.name}}
				</div>
				<div class="assistant-info">
					<div class="more">
						<div class="calender">
							<div>
								<span class="first">类型选择：</span>
								<el-button class="optionBtn" @click="selectOption(index)" v-for="(item,index) in options" :key="index" :class="{'active':optionIndex==index}">{{item}}</el-button>
								<p class="tip" v-if="optionIndex==1 && parseInt(assistantInfo.hour_num)>1">({{assistantInfo.hour_num}}小时起租)</p>
							</div>
							<el-button type="text" @click="showAssistantDays" style="border:none;background:none;">查看助理档期 ></el-button>
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

						<div class="price">
							<span class="first">租赁价格：</span>
							<p class="money" v-if="optionIndex==0">
								<span class="num">{{assistantInfo.price_day}}元</span>
								<span>/天</span>
							</p>
							<p class="money" v-if="optionIndex==1">
								<span class="num">{{assistantInfo.price_hour}}元</span>
								<span>/小时</span>
							</p>

							<!--助理价格显示列表-->
							<div class="assistantPrice" v-show="optionIndex==1" @mouseenter="showPrice=true" @mouseleave="showPrice=false">
								<div>
									<span>价格表</span>
								</div>
								<div class="detail" v-show="showPrice && assistantPrice">
								<!--<div class="detail" v-show="assistantPrice">-->
									<el-table :data="assistantPrice" style="width: 100%">
								      <el-table-column  label="小时">
								      		<template slot-scope="{row}">
										        <span>{{row.num}}小时</span>
										      </template>
								      </el-table-column>
								      <el-table-column  label="价格">
								      		<template slot-scope="{row}">
										        <span>{{row.price}}元</span>
										      </template>
								      </el-table-column>
								    </el-table>
								</div>
							</div>

						</div>

						<div class="operate">
							<div class="leftBtn">
								<el-button class="cur color-area" @click="payOrder">立即租借</el-button>
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
					<service-store type="4" :info="assistantInfo"></service-store>

				</div>
			</div>

		</div>

		<!--底部模块-->
		<div class="footContent">
			<!--产品参数、评论等模块-->
			<div class="moreDetail" v-if='assistantInfo'>
				<div class="tabBar">
					<el-tabs v-model="tabIndex" type="card" @tab-click="changeTab">

						<!--基本信息模块-->
						<el-tab-pane label="服务详情" name="0">
							<div v-html="assistantInfo.content" class="detail">
							</div>
						</el-tab-pane>

						<el-tab-pane label="成功案例" name="1">

						</el-tab-pane>

					</el-tabs>
				</div>
			</div>
			<!--右侧产品推荐模块-->
			<div class="selectGoods">
				<recommend-good detail="1" type="5"></recommend-good>
			</div>
		</div>

		<!--显示模特档期弹窗-->
		<model-days :isShow.sync="isShowAssistantDays" type='1' :id.sync="assistantId" @closed="closeAssistantDays"></model-days>

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
	import { collectStore, collectOther, getUserLsObj } from "@util/common.js";
	import serviceStore from "FrontComponents/serviceStore";
	export default {
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: time => {
						return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					}
				},
				assistantId: '', //显示的助理id
				assistantInfo: null,
				dateStart: "", //开始日期
				dateEnd: "", //结束日期
				isCollect: '', //是否已经收藏
				storeIsCollect: '', //店铺是否已经收藏
				isShowAssistantDays: false, //是否显示助理档期
				searchTxt: '', //搜索文本
				options: ["按天租", "按小时"],
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
				tabIndex: 0, //tab选项下标
				isShowDialog: false, //是否显示登录窗口
				curDay: "", //当前日期
				startTime: "", //按小时计算开始时间
				endTime: "", //按小时计算结束时间
				hours: 0, //用户选择时长
				showPrice: false, //显示助理价格表
				assistantPrice:[], //助理价格列表
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
			this.assistantId = this.$route.query.id;
			this.getDetailById(this.assistantId);
		},
		watch: {
			startTime(to, from) {
				let prefix = this.util.getCurDay() + " ";
				if(this.endTime) {
					this.hours = this.util.calHours(
						prefix + this.startTime,
						prefix + this.endTime
					);
				}
			},
			endTime(to, from) {
				let prefix = this.util.getCurDay() + " ";
				if(this.startTime) {
					this.hours = this.util.calHours(
						prefix + this.startTime,
						prefix + this.endTime
					);
				}
			},
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
				if(!this.util.userIsLogin()) {
					this.isShowDialog = true;
					return;
				}
				if(type == 0) {
					collectStore(this.assistantInfo.uid, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				} else if(type == 1) {
					collectOther(this.assistantInfo.id, "4", "1", this.assistantInfo.id).then(
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
			search() {

			},
			//显示模特档期
			showAssistantDays() {
				console.log('showAssistantDays--------');
				this.isShowAssistantDays = true;
			},

			//关闭模特档期
			closeAssistantDays() {
				this.isShowAssistantDays = false;
			},
			//跳转到店铺页面
			toShopPage() {

			},
			//获取模特详情
			getDetailById(id) {
				let params = {
					id: id,
					isAutoMsg: 1,
				}
				this.assistantPrice=[];
				this.util.getAssistantList(params).then(res => {
					console.warn('getAssistantDetail--------', res);
					//获取助理价格
					res.price_arr.forEach((item,index)=>{
						if(item.rent_type==1){
							this.assistantPrice.push({num:item.num,price:item.price});
						}
					})
					console.error("assistantPrice------------",this.assistantPrice);
					
					this.assistantInfo = res;
					
					//获取是否收藏信息
					this.getCollect();
				})
			},

			//获取该影棚或者店铺是否已经收藏
			getCollect() {
				//判断用户是否已经登录
				if(this.util.userIsLogin()) {

					//判断该设备是否已经被收藏
					getUserLsObj(this.assistantInfo.id, "4", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});

					//判断该店家是否已经收藏
					getUserLsObj(this.assistantInfo.uid, "0", "1").then(res => {
						if(res) {
							this.storeIsCollect = true;
						}
					});
				} else {
					//没有登录也显示联系客服模块
					//					this.showContact=true;
				}
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

			//立即付款
			payOrder() {
				//判断用户是否有登录
				if(!this.util.userIsLogin()) {
					this.isShowDialog = true;
				} else {
					if(this.checkTime()) {
						console.log('payOrder-----------------', this.assistantId, this.dateStart, this.dateEnd);
						if(this.optionIndex==0){
							this.util.toAssistantOrder(this.assistantId, this.dateStart, this.dateEnd);
						}else{
							let startTime = `${this.curDay} ${this.startTime}:00`;
							let endTime = `${this.curDay} ${this.endTime}:00`;
							this.util.toAssistantOrder(this.assistantId, startTime, endTime,1);
						}
						
					}
				}
			},
			selectOption(val) {
				this.optionIndex = val;
			},
			//切换tab选项
			changeTab() {

			},

		}
	};
</script>

<style lang="scss" scoped>
	@import "@front/common/common.scss";
	/deep/ {
		.el-date-editor {
			.el-input__prefix {
				display: block;
			}
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
		.el-tabs__content{
			padding:20px;
		}
	}
	
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
	}
	
	.assistant-detail {
		color: #666;
		display: flex;
		margin-bottom: 25px;
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
		.assistant-info {
			font-size: 14 px;
			.more {
				background-color: #FAFAFA;
				padding: 20px;
				.selectTime {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.calender {
					display: flex;
					justify-content: space-between;
					&>div{
						display:flex;
						align-items:center;
						p{
							margin-left:10px;
						}
					}
				}
				&>div {
					display: flex;
					align-items: baseline;
					margin-bottom: 20px;
					.first {
						color: #999999;
						margin-right: 10px;
						width: 70px
					}
					.hours {
						font-size: 12px;
						color: #999;
						width: 150px;
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
						margin-right: 10px;
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
					display: flex;
					align-items: baseline;
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
				padding: 20px 0px;
				border-top: 1px solid #E0E0E0;
				margin-top: 20px;
				.num {
					color: #FF0000;
					font-size: 18px;
					font-weight: 600;
				}
				.unit {
					color: #666666;
					font-size: 14px;
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
	/*助理价格表样式*/
	
	.assistantPrice {
		display: flex;
		align-items: center;
		padding: 3px 7px;
		background: #FFFCFC;
		border: 1px solid #FFD8D9;
		font-size: 12px;
		margin-left: 15px;
		position: relative;
		&>div:first-child {
			cursor: pointer;
		}
		&>span {
			color: #D4282D;
		}
		svg {
			width: 11px;
			height: 11px;
			margin-right: 10px;
		}
		.detail {
			position: absolute;
			top: 23px;
			left: -115px;
			background: #FFF;
			border: 1px solid #E4E7ED;
			width: 300px;
			padding: 20px;
			z-index: 10000;
			.title {
				color: #333;
				font-weight: 600;
				margin-bottom: 20px;
			}
			ul {
				max-height: 200px;
				overflow-y: auto;
			}
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;
				.info {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.money {
					width: 80px;
					height: 40px;
					background: #fff;
					border: 1px solid #D4282D;
					text-align: center;
					line-height: 40px;
					color: #D4282D;
					font-weight: 600;
					margin-right: 10px;
				}
				.type {
					font-size: 12px;
				}
				button {
					width: 80px;
					height: 34px;
					background: #D4282D;
					border-radius: 0px;
					color: #fff;
					&.disabled {
						background: none;
						color: #666666;
					}
				}
			}
		}
	}
</style>