<template>
	<div class="mainContent">
		<!--轮播大图模块-->
		<div class="carousel-wrap">
			<div class="swiper-container swiper-main">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
						<a  v-if="item.url" @click="toSee(item.url)">
							<!--<img :src="$qiniuHost+item.key" width="100%"/>-->
							<el-image style="width:1920;height:500px;" fit="contain" :src="util.picExplode(item.key,config.defaultEquipPic)"
							:onerror="util.errorPic"/>
						</a>
						<!--<img  v-else :src="$qiniuHost+item.key" width="100%"/>-->
						<el-image v-else style="width:1920;height:500px;" fit="contain" :src="util.picExplode(item.key,config.defaultEquipPic)"
						:onerror="util.errorPic"/>
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination main-pagination"></div>
			</div>
		</div>
		
		
		<div class="main_Info">
		
				<!--优惠券模块-->
				<div class="product coupon">
					<p class="title">领取优惠券</p>
					<div class="menu">
						<ul>
							<li class="word-hover" v-for="(item,index) in couponType" @click="changeCouponType(index)" :key="index" :class="{'active':couponIndex==index}">
								{{item}}
							</li>
						</ul>
						<el-button type="text" @click="toCouponPage">查看更多></el-button>
					</div>
					
					<div class="moreProduct coupon-list" v-if="couponList.length>0">
						<div class="swiper-container2">
						　　<ul class="swiper-wrapper couponList">
						　　　　<li class="swiper-slide" v-for="(item,index) in couponList" :key="index" :class="{'isUsed':item.order_id,'overDay':item.status==2}">
								<div class="moneyContent">
									<p class="moneyInfo" v-if="item.coupon_type==1">
										<span class="pre">￥</span>
										<span class="money">{{parseInt(item.money)}}</span>
									</p>
									<p class="moneyInfo" v-else>
										<span class="money">{{parseInt(item.money)}}折</span>
									</p>
									<div class="canUse" v-if="item.limit_money!=0">满{{item.limit_money}}使用</div>
									<div class="canUse" v-else>
										通用
									</div>
								</div>
								
								<div class="content">
									<div class="name">
										<span class="store">{{item.uid==0?'平台券':'店铺券'}}</span>
										<span class="storeName">|{{item.uid==0?'派图全平台':item.to_uid_name}}</span>
									</div>
									<div class="rule">
										{{item.content}}
									</div>
									<!--<div class="time">
										{{item.st_time}}-{{item.end_time}}
									</div>-->
									<el-button @click="getCoupon(item.id)" 
										v-if="((item.user_get<item.limit_count)&&item.status==1) || (!item.hasOwnProperty('user_get')&&item.status==1)">
										立即领取
									</el-button>
									<el-button v-if="item.status==0" class="noClick">
										已下架
									</el-button>
									<el-button v-if="item.status==2" class="noClick">
										已过期
									</el-button>
									<el-button v-if="(item.user_get==item.limit_count)&&item.status==1" class="noClick">
										已领取
									</el-button>
								</div>
							</li>
						　　</ul>
						　　<!-- 如果需要导航按钮 -->
						    <div class="arrow" v-if="couponList.length>3">
							    <div class="swiper-button-prev">
							    	<ali-svg-icon icon-class="arrow_left"></ali-svg-icon>
							    </div>
							    <div class="swiper-button-next">
							    	<ali-svg-icon icon-class="arrow_right"></ali-svg-icon>
							    </div>
						    </div>
						</div>
										
					</div>
					
					<div class="noCoupon" v-else>
						暂无优惠券
					</div>
					
				</div>
				
				<!--器材租赁模块-->
				<div class="product">
					<p class="title">器材租赁</p>
					<div class="menu">
						<ul>
							<li class="word-hover" v-for="(item,index) in equipMenuList" :onerror="util.errorPic" @click="changeEquipMenu(item)" :key="index" :class="{'active':equipMenuIndex==item}">
								{{item}}
							</li>
						</ul>
						<el-button type="text">查看更多></el-button>
					</div>
					<ul class="list">
						<li class="card-hover" v-for="(item,index) in equipList" :key="index">

							<el-image style="width:350px;height:350px;" fit="contain" :src="util.picExplode(item.pic.split(',')[0],config.defaultEquipPic)" :onerror="util.errorPic" @click="toStudioDetail(item.id)" class="cursor"/>

							<div class="content">
								<p class="productTitle word-hover cursor" @click="toEquipDetail(item.id)">{{item.name}}</p>
							
								<div>
									<p>
										<span class="price">￥</span>
										<span class="unit">{{item.price}}/每小时</span>
									</p>
									<el-button type="text">立即租借>></el-button>
								</div>
							</div>
						</li>
					</ul>
				</div>
				
				
				<!--影棚租赁模块-->
				<div class="product studioProduct">
					<div class="top">
						<p class="title">影棚租赁</p>
						<el-button type="text">查看更多 ></el-button>
					</div>
					<ul>
						<li class="card-hover" v-for="(item,index) in studioList" :key="index">
							<el-image style="width:700px;height:400px;" fit="contain" :src="util.picExplode(item.pic.split(',')[0],config.defaultEquipPic)" 
								:onerror="util.errorPic" @click="toStudioDetail(item.id)" class="cursor"/>
							<div class="info">
								<p class="name">
									{{item.name}}
								</p>
								<p class="address">
									地址：{{item.address}}
								</p>
								<p class="priceInfo">
									<span class="pre">RMB</span>
									<span class="price">{{item.priceWorkDayWorkTimePerHour}}/小时</span>
								</p>
								<el-button class="dangerEmptyBtn">立即租借</el-button>
							</div>
						</li>
					</ul>
				</div>
				
				<!--活动模块模块-->
				<div class="product activityProduct">
					<div class="top">
						<p class="title">热门活动</p>
						<el-button type="text">查看更多 ></el-button>
					</div>
					<ul>
						<li class="card-hover" v-for="(item,index) in activityList" :key="index">
							<el-image style="width:354px;height:266px;" fit="contain" :src="util.picExplode(item.pic,config.defaultEquipPic)" 
								:onerror="util.errorPic" @click="toActivityDetail(item.id)" class="cursor"/>
							<div class="content">
								<p class="productTitle word-hover cursor" @click="toActivityDetail(item.id)">{{item.name}}</p>
							
								<div>
									<p>
										<span>地址：</span>
										<span>{{item.address}}</span>
									</p>
									<div class="foot">
										<p>
											<span>费用：</span>
											<span class="price">￥{{item.fee}}/人</span>
										</p>
										<el-button type="text">立即报名>></el-button>
									</div>
								</div>
							</div>
						</li>
						
					</ul>
				</div>

		
		</div>
	
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowLogin" @closed="closeLogin"></mini-login>
		
	</div>
</template>

<script>
	import Swiper from "swiper"
	import { mapGetters } from "vuex";
	import { frontHome,frontStudio,frontEquip } from "@config/api.js";
	import miniLogin from "FrontComponents/minilogin";
	export default {
		data() {
			return {
				shopInfo:{},   //店铺详细信息
				bannerList: [],   //banner广告图列表
				hotMenuList:['影棚','器材'],
				hotList:[],   //热销产品列表数据
				hotMenuIndex:0,
				equipMenuList:['全部','单反相机','中画幅相机','全画幅相机','航拍'],
				equipMenuIndex:'全部',
				uid:0,
				studioList:[],  //影棚列表信息
				equipList:[],  //器材列表信息
				activityList:[], //活动列表信息
				equipTypeList:[],  //所有分类列表信息
				couponList:[],   //优惠券列表
				isShowLogin:false,  //是否显示登录框
				couponType:['店铺','平台'], //优惠券类型
				couponIndex:0, //优惠券类型下标
			}
		},
		components:{
			miniLogin
		},
		computed: {
			...mapGetters(["user_data"])
		},
		created(){
			this.uid = parseInt(this.$route.query.uid);
			
			//获取广告图列表
			this.getBanner(this.uid);
			//获取优惠券列表
			this.getCouponList();
			//获取影棚列表信息
			this.getStudioList(3,'studioList');
			//获取热销产品列表,默认为影棚列表
			this.getStudioList(5,'hotList');
			//获取设备所有分类
			this.getAllCategory();
			//获取器材列表
			this.getEquipList('equipList');
			//获取活动列表信息
			this.getActivityList();
		},
		mounted() {
			var mySwiper = new Swiper('.swiper-container', {
				loop: true,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
				onSlideChangeEnd: function(swiper) {
					swiper.update();　　　
					mySwiper.startAutoplay();　　
					mySwiper.reLoop();
				},
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination.main-pagination',
					clickable: true,
					bulletActiveClass: 'bullet-active',
				},
			})
			
			
			
		},
		methods: {
			//跳转到优惠券页面
			toCouponPage(){
				this.util.toCouponPage();
			},
			//切换优惠券类型方法
			changeCouponType(index){
				if(parseInt(this.couponIndex)==index) return;
				this.couponIndex=index;
				//获取优惠券列表
				this.getCouponList();
			},
			//加载优惠券轮播列表
			loadCouponSwiper(){
				this.$nextTick(()=>{
					var mySwiper2 = new Swiper('.swiper-container2', {
//						loop: true,
						slidesPerView: 3,
						observer: true, //修改swiper自己或子元素时，自动初始化swiper
						observeParents: true, //修改swiper的父元素时，自动初始化swiper
						
						// 如果需要前进后退按钮
					    navigation:{
					    	prevEl: '.swiper-button-prev',
				    		nextEl: '.swiper-button-next',
					    }
					})
				})
				
			},
			//获取优惠券列表
			getCouponList(){
				let params={
        			page:1,
        			page_size:100000,
        			uid:this.uid
        		}
        		if(this.couponIndex==1){
        			params.uid=0;
        		}
				if(this.util.userIsLogin()){
        			this.util.getCouponList(params).then(res=>{
	        			this.couponList=res.rows;
	        			this.loadCouponSwiper();
	        			console.log('getCouponList--------+++++++++',res);
	        		})
        		}else{
        			this.util.ajaxGetCouponList(params).then(res=>{
	        			this.couponList=res.rows;
	        			this.loadCouponSwiper();
	        			console.log('ajaxGetCouponList--------+++++++++',res);
	        		})
        		}
			},
			//用户领取优惠券方法
        	getCoupon(id){
        		//判断是否已经登录
        		if(!this.util.userIsLogin()){
        			this.isShowLogin=true;
        			return;
        		}
        		console.log('getCoupon---------',id);
        		this.util.userAddCoupon(id).then(res=>{
        			this.$message.success('领取成功！');
        			this.couponList.forEach((item,index)=>{
	        			if(item.id==id){
	        				this.$set(item,'user_get',item.limit_count);
	        			}
	        		})
        		})
        	},
        	//关闭登录框回函数
        	closeLogin() {
				this.isShowLogin = false;
			},
			//跳转到外站
			toSee(url){
				let prex='http://';
				let path;
				if(url.indexOf('//')>=0){
					path=prex+url.split('//')[1];
				}else{
					path=prex+url;
				}
				 window.open(path);
			},
			//获取广告图
			getBanner(id){
				let params={uid:id};
				this.getRequest(frontHome.getAd,params).then(res => {
						console.log('getAd------',res);
						this.bannerList=res;
				})
				.catch(err => {});
			},
			//获取影棚列表信息  //根据数量，列表名称获取数据
			getStudioList(pageSize,listName){
				let params={
					page:1,
					page_size:pageSize,
					studio_uid:this.uid
				}
				this.getRequest(frontStudio.getStudioList, params).then(res => {
					this[listName]=res.rows;
					console.log('this.studioList----',res.rows);
				})
				.catch(err => {});
			},
			//获取器材列表信息
			getEquipList(listName,id){
				let params={
					page:1,
					page_size:5,
					uid:this.uid
				}
				if(id){
					params.category=id;
				}
				this.getRequest(frontEquip.getEquipList, params).then(res => {
					this[listName]=res.rows;
					console.log('this.getEquipList----',res.rows);
				})
				.catch(err => {});
			},
			//获取活动列表信息
			getActivityList(){
				let params={
					page:1,
					page_size:3,
					uid:this.uid
				}
				this.util.getActivityList(params).then(res=>{
					console.log('getActivityList--------',res);
					this.activityList=res.rows;
				})
			},
			//切换热销产品菜单方法
			changeHotMenu(val){
				this.hotMenuIndex=val;
				//0/影棚列表  1/器材列表
				if(this.hotMenuIndex==0){
					this.getStudioList(5,'hotList');
				}else{
					this.getEquipList('hotList');
				}
			},
			//切换器材列表菜单方法
			changeEquipMenu(val){
				this.equipMenuIndex=val;
				let equipTypeId;
				if(val!=='全部'){
					//根据名称获取类别ID
					equipTypeId=this.getIdByName(val);
				}else{
					equipTypeId=null;
				}
				
				//根据类别id获取列表
				this.getEquipList('equipList',equipTypeId);
			},
			//根据类别名称获取类别id
			getIdByName(name){
				let id;
				this.equipTypeList.forEach((item,index)=>{
					if(name==item.name){
						id=item.id;
					}
				})
				return id;
			},
			
			//获取所有器材分类
		    getAllCategory() {
		      this.getRequest(frontEquip.getAllCategory).then(res => {
		          this.equipTypeList = res;
		        })
		        .catch(err => {});
		    },
		    toDetail(id){
		    	console.log('id----',id);
		    	console.log('this.hotMenuIndex----',this.hotMenuIndex);
		    	if(this.hotMenuIndex==0){
		    		this.toStudioDetail(id);
		    	}else{
		    		this.toEquipDetail(id);
		    	}
		    },
		    //跳到对应列表，1/影棚类表，2/设备列表,3/活动列表
		    toPageList(type){
		    	switch(parseInt(type)){
		    		case 1:
		    			break;
		    		case 2:
		    			break;
		    		case 3:
		    			break;
		    	}
		    },
		    //跳转到影棚详情页面
		    toStudioDetail(id){
		    	this.util.toStudioDetail(id);
		    },
		    //跳转到器材详情页面
		    toEquipDetail(id){
		    	this.util.toEquipDetail(id);
		    },
		    //跳转到活动详情页面
		    toActivityDetail(id){
		    	this.util.toActivityPage(id);
		    }
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

	.mainContent {
		.top {
			width: 1100px;
			margin: 0px auto;
			padding: 20px 0px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.storeInfo {
				display: flex;
				.detail {
					.address {
						margin: 9px 0px;
					}
					p {
						color: #333;
					}
					p:first-child {
						font-size: 16px;
						font-weight: 600;
					}
				}
				img {
					margin-right: 20px;
				}
			}
		}
		/*顶部导航条样式*/
		.menuBar {
			height: 40px;
			background: #333;
			.mainInfo {
				display: flex;
				width: 1200px;
				margin: 0px auto;
				justify-content: space-between;
				align-items: center;
				ul {
					display: flex;
					li {
						color: #fff;
						line-height: 40px;
						margin-right: 65px;
						cursor: pointer;
					}
				}
				.search-box {
					display: flex;
					height: 30px;
					.search {
						input {
							height: 100%;
							text-indent: 10px;
						}
					}
					.search-button {
						width: 75px;
						height: 100%;
						cursor: pointer;
						display: flex;
						justify-content: center;
						align-items: center;
						background: #D9D9D9;
					}
				}
			}
		}
		/*轮播图样式*/
		/deep/ {
			.swiper-pagination {
				margin: 0 auto;
				position: absolute;
				bottom: 10px;
				line-height: 40px;
				.swiper-pagination-bullet {
					background: #d9d9d9;
					opacity: 1;
					margin-right: 10px;
					outline: none;
					width: 12px;
					height: 12px;
				}
				.bullet-active {
					background: #7C6AFF;
					opacity: 1;
				}
			}
		}
		
		/*中间主题部分样式*/
		.main_Info{
			width:1100px;
			margin:0px auto;
			margin-top:100px;
			li.active{
				color:#7C6AFF!important;
			}

			.productLine{
				width:60px;
				height:4px;
				background:#000;
				margin:20px 0px 90px 0px;
			}
			
			.product{
				.title{
					color:#333;
					font-size:36px;
					margin-bottom:50px;
				}
				.menu{
					display:flex;
					justify-content: space-between;
					align-items:baseline;
					font-size:18px;
					button{
						font-size:18px;
					}
					ul{
						display:flex;
						margin-bottom:30px;
						li{
							margin-right:40px;
							font-weight:600;
							cursor:pointer;
						}
					}
				}
				.top{
					button{
						font-size:18px;
					}
				}
				.list{
					display:flex;
					flex-wrap:wrap;
					li{
						margin-right:20px;
						margin-bottom:45px;
						border:1px solid #F0F0F0;
						&:nth-child(3n){
							margin-right:0px;
						}
						.content{
							padding:20px;
							p{
								min-height:45px;
								font-size:16px;
								color:#333;
							}
							div{
								color:#333;
								font-weight:600;
								font-size:0px;
								display:flex;
								justify-content:space-between;
								align-items:baseline;
								.price{
									font-size:14px;
								}
								.unit{
									font-size:20px;
								}
								button{
									font-size:16px;
								}
							}
							
						}
					}
				}
			}
			
			/*影棚租赁,活动模块样式*/
			.studioProduct,.activityProduct,.coupon{
				&>div{
					display:flex;
					justify-content:space-between;
					align-items:baseline;
				}
			}
			
			.coupon{
				margin-bottom:100px;
			}
			
			/*影棚租赁样式*/
			.studioProduct{
				ul{
					li{
						display:flex;
						background:#fff;
						border:1px solid #F0F0F0;
						margin-bottom:60px;
						.info{
							padding:30px 30px 30px 60px;
						}
						.name{
							font-size:36px;
							color:#333;
							font-weight:600;
							margin-bottom:25px;
						}
						.address{
							font-size:20px;
							line-height:35px;
							margin-bottom:115px;
						}
						.priceInfo{
							margin-bottom:33px;
							.pre{
								font-size:18px;
							}
							.price{
								font-size:30px;
								font-weight:600;
							}
						}
						
					}
				}
			}
			
			
			/*活动模块样式*/
			.activityProduct{
				ul{
					display:flex;
					justify-content: space-between;
					flex-wrap: wrap;
					margin-bottom:200px;
					li{
						border:1px solid #F0F0F0;
						width:354px;
						height:410px;
						.content{
							padding:20px;
							/*background:#fff;*/
							&>p{
								font-size:18px;
								font-weight:600;
								margin-bottom:15px;
							}
							div{
								&>p{
									color:#999;
									margin-bottom:12px;
									height:35px;
								}
								.foot{
									display:flex;
									justify-content: space-between;
									align-items:baseline;
									.price{
										color:#333;
										font-weight:600;
									}
								}
							}
							button{
								padding:0px;
							}
						}
					}
				}
			}
			
		}
		
	}
	
	
.coupon{
	.moreProduct{
		/*flex:1;*/
	}
	.mainProduct{
		width:300px;
		margin-right:0px!important;
		.head{
			display:flex;
			flex-direction:column;
			align-items:flex-end;
		}
	}
	.coupon-list{
		position:relative;
		padding-left:50px;
		.swiper-container2{
			width:1100px;
			height:180px;
			overflow:hidden;
		}
	}
	.couponList{
		
		li{
			color:#FF1FA3;
			margin-right:10px;
			width:360px!important;
			height:180px;
			padding:20px 0px 35px 0px;
			text-align:center;
			display:flex;
			justify-content:space-between;
			background:url('https://pic.paitume.com/96-1569482636721.png') no-repeat;
			background-size:100% 100%;
			.moneyContent{
				width: 130px;
			    display: flex;
			    flex-direction: column;
			    align-items: center;
			}
			.moneyInfo{
				padding-top:15px;
				margin-bottom:15px;
				display:flex;
				align-items:baseline;
				color:#FD5055;
				.pre{
					font-size:18px;
				}
				.money{
					font-size:54px;
				}
				.discount{
					font-size:20px;
				}
			}
			.content{
				width:220px;
				display:flex;
				flex-direction:column;
				align-items:flex-start;
				text-align:left;
				padding:0px 20px;
				.name{
					font-size:16px;
					font-weight:600;
					margin-bottom:22px;
					width:100%;
					height:22px;
					/*overflow: hidden;*/
				}
				.store{
					color:#FD5055;
				}
				.storeName{
					color:#333;
				}
				.rule{
					font-size:14px;
					color:#333;
					min-height:40px;
				}
				.toUse{
					color:#fff;
					background:#FD5055;
				}
			}
			.canUse{
				font-size:16px;
				color:#FD5055;
			}
			.scope{
				font-size:16px;
				color:#999;
				margin:20px 0px;
			}
			
			button{
				width:100%;
				padding:8px 25px;
				border-radius:0px;
				background:#FFFBF3;
				margin-top:20px;
				cursor:pointer;
				color:#F9393E;
				border:1px solid #FD5055;
				&:hover{
					background:red;
					color:#fff;
				}
				&.noClick{
					color:#606266;
					background:none;
					border:none;
				}
			}
			
			&.isUsed,&.overDay{
				color:#999;
				border-color:#AAAAAA;
				.canUse{
					color:#999;
				}
				.time{
					color:#999999;
				}
			}
		}
	}
}
.receive{
    width: 62px;
    height: 62px!important;
    border-radius: 50%;
    right:10px;
    bottom:10px;
    border:1px solid #D9D9D9;
    position:absolute;
    text-align: center;
    line-height:62px;
    transform:rotate(-30deg);
    font-size:13px;
    .circle{
        width: 56px;
        height: 56px;
        border-radius: 50%;
       	border:1px solid #D9D9D9;
        position: absolute;
        top: 2px;
        left: 2px;
    }
    p{
    	color:#D9D9D9;
    }
}
.swiper-slide{
	text-align:center;
}
.arrow{
	&>div{
		background-image:none;
		top:30%;
	}
	svg{
		width:40px;
		height:40px;
		color:#FF6A6E;
	}
}
.el-button--text{
	color:#333;
	&:hover{
		color:#7C6AFF;
	}
}
</style>