<template>
	<div class="coupon">
		<div class="couponTop">
			<div class="mainInfo">
				<p>
					<span class="get">领券</span>
					<span class="bold">中心</span>
				</p>
				<span>下单之前先领劵，享更多优惠</span>
			</div>
			<div class="rightInfo">
				<!--搜索框模块-->
				<front-searchbox :searchTxt="searchTxt" @search="search"  v-if="couponList.length>0"></front-searchbox>
				<div class="myCoupon" @click="toMyCoupon">
					<ali-svg-icon icon-class="youhuiquan1"></ali-svg-icon>
					<span>我的优惠券</span>
				</div>
			</div>
		</div>
		<ul class="couponList" v-if="couponList.length>0">
			<li v-for="(item,index) in couponList" :key="index" :class="{'isUsed':item.order_id,'overDay':item.status==2}">
				<div class="moneyContent">
					<p class="moneyInfo" v-if="item.coupon_type==1">
						<span class="pre">￥</span>
						<span class="money">{{parseInt(item.money)}}</span>
					</p>
					<p class="moneyInfo" v-else>
						<span class="money">{{parseInt(item.money)}}</span>
						<span class="discount">折</span>
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
					<div class="rule" :title="item.content">
						{{item.content}}
					</div>
					<!--<div class="rule" v-html="item.content"></div>-->
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
					<el-button v-if="(item.user_get==item.limit_count)&&item.status==1" @click="toShopPage(item)" class="noClick toUse">
						立即使用
					</el-button>
				</div>
			</li>
			
		</ul>
		
		<div class="noCoupon" v-if="couponList.length==0">
			暂无可领取的优惠券
		</div>
		
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowLogin" @closed="closeLogin"></mini-login>
	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import miniLogin from "FrontComponents/minilogin";
	export default {
		data() {
			return {
				searchTxt:'',  //搜索框内容
				couponList:[],
				isShowLogin:false,  //是否显示登录框
			}	
		},
		created() {
		
		},
		components:{
			frontSearchbox,
			miniLogin
		},
		mounted() {
			//获取优惠券列表
			this.getCouponList();
			
		},
		methods: {
			//获取优惠券列表
			getCouponList(){
				let params={
        			page:1,
        			page_size:100000,
        		}
				if(this.util.userIsLogin()){
        			this.util.getCouponList(params).then(res=>{
        				if(res.rows){
        					this.couponList=res.rows.filter(item=>{
        						return item.status!=0&&item.status!=2;
        					});
        				}
	        		})
        		}else{
        			this.util.ajaxGetCouponList(params).then(res=>{
	        			if(res.rows){
        					this.couponList=res.rows.filter(item=>{
        						return item.status!=0&&item.status!=2;
        					});
        				}
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
        	//跳转到店铺页面
        	toShopPage(item){
        		if(item.uid>0){
        			this.util.toShopPage(item.uid);
        		}else{
        			this.util.openNewPage('/');
        		}
        		
        	},
        	//跳转到我的优惠券页面
        	toMyCoupon(){
        		console.log('toMyCoupon-----------------');
        		//判断是否已经登录
        		if(!this.util.userIsLogin()){
        			this.isShowLogin=true;
        			return;
        		}
        		this.util.toMyCouponPage();
        	},
        	//搜索框内容回调方法
        	search(val){
        		console.log('search--------',val);
        	},
        	//关闭登录框回函数
        	closeLogin() {
				this.isShowLogin = false;
			},
		}
			
	}
</script>

<style lang="scss" scoped>
/*优惠券样式*/
.couponTop{
	width:1200px;
	margin:0px auto;
	height:80px;
	background:#FAFAFA;
	display:flex;
	justify-content:space-between;
	align-items:center;
	.mainInfo{
		display:flex;
		justify-content:flex-start;
		align-items:center;
		p{
			font-size:0px;
			margin-right:12px;
			span{
				font-size:32px;
			}
			.get{
				padding-left:13px;
				border-left:4px solid rgba(212,221,255,1);
			}
			.bold{
				font-weight:600;
			}
		}
		&>span{
			font-size:16px;
			color:#666666;
		}
	}
	.rightInfo{
		display:flex;
		align-items:center;
		.myCoupon{
			background:#fff;
			padding:8px 10px;
			height:36px;
			margin-left:20px;
			cursor:pointer;
			border:1px solid transparent;
			&:hover{
				border-color:#7C6AFF;
			}
			svg{
				width:18px;
				height:18px;
				margin-right:5px;
			}
		}
	}
}

.couponList{
		width:1200px;
		margin:0px auto;
		display:flex;
		align-items:center;
		flex-wrap: wrap;
		margin-bottom:100px;
		.moneyContent{
			width: 143px;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		}
		li{
			color:#FF1FA3;
			margin-right:15px;
			margin-bottom:15px;
			width:390px!important;
			height:180px;
			padding:20px 0px 5px 0px;
			text-align:center;
			display:flex;
			justify-content:space-between;
			background:url('https://pic.paitume.com/96-1569482636721.png') no-repeat;
			&:nth-child(3n){
				margin-right:0px;
			}
			.moneyInfo{
				/*font-weight:600;*/
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
				width:245px;
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
					width: 200px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
	
	.noCoupon{
		display:flex;
		justify-content:center;
		align-items:center;
		margin:100px 0px;
	}
	
</style>
