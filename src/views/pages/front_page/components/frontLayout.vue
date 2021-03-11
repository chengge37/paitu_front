<template>
	<div  style="z-index:9999">
		<!--顶部模块-->
		<head-bar></head-bar>
		
		<!--中间主题模块-->
		<div class="frontLayout" :class="{'allScreen':allScreen,'showBackground':showBackground,'support-layout':isSupport}">
			<!--顶部面包屑-->
			<!-- <el-breadcrumb separator-class="el-icon-arrow-right" v-if="showBread">
				<el-breadcrumb-item :to="{ path: '/personal/index' }" @click="goBack">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="item.path" v-for="(item,index) in breadList" :key="index" @click="goBack()">
					{{item.title}} 
				</el-breadcrumb-item>
			</el-breadcrumb> -->
			
			<div class="main">
				<!--中间主要内容-->
				<div class="main_container" :class="{'allScreen':allScreen}">
					<!--左侧导航栏-->
					<el-menu v-show="showSide"  mode="vertical" :show-timeout="200" @select="handleSelect" :default-active="activeMenu" background-color="#3A7F9F" text-color="#FFFFFF" active-text-color="#3A7F9F">
						
						<div v-for="(item,index) in menuList" :key="index">
							<div class="title">
								<ali-svg-icon :icon-class="item.icon" :class-name="item.icon" style="width:22px;height:22px"></ali-svg-icon>
								<span slot="title" class="bold">{{item.title}}</span>
							</div>
							<router-link v-for="(subItem,index2) in item.routes" :key="index2" :to="subItem.url">
								<el-menu-item :index="subItem.index+''">
									<span class="menuSpan">{{subItem.title}}</span>
								</el-menu-item>
							</router-link>
						</div>	
							
							
						
					</el-menu>
					
					<!--右侧主体部分-->
					<section class="body-main">
						<!-- <transition name="fade" mode="out-in"> -->
							<router-view></router-view>
						<!-- </transition> -->
					</section>
				</div>
			</div>
			
			<!--底部精选商品-->
			<!--<select-good v-if="showMenu"></select-good>-->
		</div>
		
		<!--底部模块-->
		<foot-bar></foot-bar>
	</div>
</template>

<script>
	import headBar from './head.vue'
	import footBar from './foot.vue'
	import selectGood from './selectGood.vue'
	export default {
		data() {
			return {
				postionimg: [
				],
				routes: [],
				menuList:[
				  {
					  title:'订单中心',
					  icon:'dingdan',
					  routes:[
					  	{'title':'商品订单','url':'/personal/order/myOrder','index':1},
					  	{'title':'活动订单','url':'/personal/myActivity/order','index':2},
					  	{'title':'模特订单','url':'/personal/order/modelOrder','index':3},
					  	{'title':'服务订单','url':'/personal/order/serverOrder','index':4},
					  	{'title':'拼拍订单','url':'/personal/order/pindanOrder','index':5},
					  	{'title':'助理订单','url':'/personal/order/assistantOrder','index':21},
					  ]
				  },{
					  title:'需求中心',
					  icon:'shoucang',
					  routes:[
					  	{'title':'我的需求','url':'/personal/demand/myDemand','index':22},
//					  	{'title':'回复列表','url':'/personal/demand/replyList','index':23},
					  ]
				  },{
					  title:'我的收藏',
					  icon:'shoucang',
					  routes:[
					  	{'title':'商品收藏','url':'/personal/collection/collectstudio','index':6},
					  	{'title':'店铺收藏','url':'/personal/collection/collectstore','index':7},
					  	{'title':'活动收藏','url':'/personal/collection/collectactivity','index':8},
					  	{'title':'模特收藏','url':'/personal/collection/collectmodel','index':9},
					  	{'title':'服务收藏','url':'/personal/collection/collectserver','index':10},
					  ]
				  },{
					  title:'个人资料',
					  icon:'gerenziliao',
					  routes:[
					  	{'title':'基本信息','url':'/personal/person/base','index':11},
					  	{'title':'地址管理','url':'/personal/person/address','index':12},
					  	{'title':'安全设置','url':'/personal/person/security','index':13},
					  	{'title':'实名认证','url':'/personal/person/certificate','index':14},
					  	{'title':'账号绑定','url':'/personal/person/binding','index':15},
					  ]
				  },{
					  title:'评价管理',
					  icon:'pingjiaguanli',
					  routes:[
					  	{'title':'我的评价','url':'/personal/evaluate/goodsEvaluate','index':16},
					  ]
				  },{
					  title:'我的消息',
					  icon:'xiaoxi',
					  routes:[
					  	{'title':'消息','url':'/personal/myMessage/message','index':17},
					  	{'title':'通知','url':'/personal/myMessage/notice','index':18},
					  ]
				  },{
					  title:'卡券包',
					  icon:'kaquanbao1',
					  routes:[
					  	{'title':'优惠券','url':'/personal/myMessage/message','index':19},
					  ]
				  },{
					  title:'我的产品',
					  icon:'chanpin2',
					  routes:[
					  	{'title':'我的产品','url':'/personal/product/index','index':20},
					  ]
				  },
				],
				showMenu:false,
				showBread:false,
				allScreen:false,
				showBackground:false,
				breadList:[],
				oldRoutes:[],
				showSide:false,
				activeMenu:'0',
				isSupport:false
				// showHead:true
			};
		},
		created() {
			// this.showBackground=false
			console.log('created调用',this.showBackground)
			// if(this.$route.path.indexOf('shop')!=-1){
			// 	this.showHead=false
			// }
			this.pageFresh()
			this.hasAllScreen()
			this.hasShowBackground()	
			this.isSupportPlan()
		},
		mounted(){
			console.log('mounted调用')	
		},
		watch:{
			"$route":function(to,from){
				this.showBackground=false
				this.allScreen=false
				console.log('路由变化',this.showBackground)
				this.pageFresh()
				this.hasAllScreen()
				this.hasShowBackground()
				this.isSupportPlan()

			}
		},
		components:{selectGood,headBar,footBar},
		
		computed: {
		},
		methods:{
			//判断是不是商家扶持页面
			isSupportPlan(){
				this.isSupport=this.$route.name=='Support'||this.$route.path=='/support/index'
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath,'33333333333333333333333333');
			},
			pageFresh(){
				if(this.$route.path.indexOf('/personal')!=-1&&this.$route.name!=='ActivityDetail'&&this.$route.name!=='Evaluate'&&this.$route.name!=='Refund'&&this.$route.name!=='ActivityOrderDetail'&&this.$route.name!=='ActivityEvaluate'&&this.$route.name!=='orderDetail'
				&&this.$route.name!=='accountList'){
					this.showSide=true
				}else{
					this.showSide=false
				}
				let objInfo={
					Personal:0,
					MyOrder:1,
					ActivityOrder:2,
					ModelOrder:3,
					ServerOrder:4,
					pindanOrder:5,
					assistantOrder:21,
					CollectStudio:6,
					CollectStore:7,
					CollectActivity:8,
					CollectModel:9,
					CollectServer:10,
					BaseInfo:11,
					Address:12,
					Security:13,
					Certificate:14,
					Binding:15,
					GoodsEva:16,
					AllMessage:17,
					AllNotice:18,
					PersonCoupon:19,
					Product:20,
					MyDemand:22,
					ReplyList:23,
				}
				this.activeMenu=objInfo[this.$route.name]+'';
			},
			hasAllScreen(){
				if(this.$route.path==='/'){
					this.allScreen=true
				}else{
					this.$router.options.routes.forEach((item,index)=>{
						if(item.children){
							item.children.forEach((child,index)=>{
								if(item.path+'/'+child.path===this.$route.path){
									console.log('当前路由',item.path+child.path)
									if(child.params){
										if(child.params.allScreen){
											this.$nextTick(()=>{
												this.allScreen=child.params.allScreen
											})
										}
									}
								}
							})
						}
					})
				}
			},
			hasShowBackground(){
				this.$router.options.routes.forEach((item,index)=>{
					if(item.children){
						item.children.forEach((child,index)=>{
							if(item.path+'/'+child.path===this.$route.path){
								console.log('当前路由',item.path+child.path)
								if(child.params){
									if(child.params.showBackground){
										this.$nextTick(()=>{
											this.showBackground=child.params.showBackground
										})
									}
								}
							}
						})
					}
				})
			}
			
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.main_container{
		/*width:100%;*/
		width:1200px;
		margin:0px auto;
		display:flex;
		align-items: flex-start;
		&.allScreen{
			width:100%;
		}
		.body-main{
			width:100%;
		}
	}
	.container{
		width:100%;
	}
	.frontLayout {
		/*padding-left:9vw;*/
		/*padding-top:5vh;*/
		padding-top:30px;
		/*padding-right:9vw;*/
		background:#FAFAFA;
		padding-bottom: 30px;
		margin:0px auto;
		min-width:1200px;
		&.showBackground{
			background:#fff;
		}
		&.allScreen{
			padding:0px;
		}
		.main{
			display:flex;
		}
	}
	.support-layout{
		width: 100%;
		padding: 0;
		margin: 0;
		.main_container{
			width: 100%;
		}
	}
	
	.el-menu {
		width: 210px!important;
		padding: 25px 50px 25px 35px;
		background-color: #fff!important;
		border: none;
		margin-right:40px;
		.el-menu-item {
			padding-left: 0px!important;
			background-color: transparent!important;
			font-size: 14px;
			color: #666!important;
			height: 20px;
			line-height: 20px;
			margin: 12px 0px;
			&.is-active {
				color: $Theme-color!important;
			}
			&:hover {
				color: $Theme-color!important;
			}
		}
		.menuSpan{
			padding-left:33px;
			// background: pink;
		}
		.ali-svg-icon {
			display: none;
		}
		.title {
			padding-top: 15px;
			white-space:nowrap;
			display:flex;
			align-items:center;
			span{
				padding-left:10px;
			}
			.bold {
				font-size: 18px;
				color: #000;
			}
		}
	}
	
	/deep/{
		.el-breadcrumb {
			padding-bottom: 20px;
			border-bottom: 1px solid #eee;
			margin-bottom: 30px;
			font-size:16px!important;
			color:#666;
		}
	}
</style>