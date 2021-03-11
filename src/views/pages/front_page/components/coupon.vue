<template>
    <div >
    	<!--优惠券领取模块-->
		<div class="coupon" @mouseenter="showCoupon" @mouseleave="hideCoupon" v-if="couponList.length>0">
			<div>
				<ali-svg-icon icon-class="youhuiquan"></ali-svg-icon>
				<span>可领优惠券</span>
			</div>
			<div class="detail" v-if="show">
				<p class="title">可领取店铺优惠券</p>
				<ul>
					<li v-for="(item,index) in couponList" :key="index">
						<div class="info">
							<div class="money">￥{{item.money}}</div>
							<div class="type">
								<span>{{item.title}}</span>
								<span v-if="item.type==1">代金券{{item.money}}</span>
								<span v-if="item.type==2">{{item.money}}折</span>
							</div>
						</div>
						<el-button class="color-area" @click="getCoupon(item.id)" v-if="item.user_get!=item.limit_count">领取</el-button>
						<el-button v-else disabled class="disabled">已领取</el-button>
					</li>
				</ul>
			</div>
		</div>
		
    </div>
</template>

<script>
    export default {
    	props:{
    		//店铺id
    		uid:{
    			type:String,
    			default:''
    		}
    	},
        data(){
            return{
            	couponList:[],
            	show:false
            }
        },
        mounted(){
        	this.getCouponList();
        },
        methods:{
        	//根据店铺id获取优惠券列表
        	getCouponList(){
        		if(!this.uid) return;
        		let params={
        			page:1,
        			page_size:100000,
        			uid:this.uid
        		}
        		//判断用户是否已经登录
        		if(this.util.userIsLogin()){
        			this.util.getCouponList(params).then(res=>{
	        			this.couponList=res.rows;
	        			console.log('getCouponList--------+++++++++',res);
	        		})
        		}else{
        			this.util.ajaxGetCouponList(params).then(res=>{
        				this.couponList=res.rows;
	        			console.log('ajaxGetCouponList--------+++++++++',res);
        			})
        		}
        		
        	},
        	//显示优惠券列表
        	showCoupon(){
        		this.show=true;
        	},
        	//隐藏优惠券列表方法
        	hideCoupon(){
        		this.show=false;
        	},
        	//用户领取优惠券方法
        	getCoupon(id){
        		console.log('getCoupon---------',id);
        		this.util.userAddCoupon(id).then(res=>{
        			this.$message.success('领取成功！');
        			this.getCouponList();
        		})
        	}
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.coupon{
	display:flex;
	align-items:center;
	padding:3px 7px;
	background:#FFFCFC;
	border:1px solid #FFD8D9;
	font-size:12px;
	margin-left:15px;
	position:relative;
	&>div:first-child{
		cursor:pointer;
	}
	&>span{
		color:#D4282D;
	}
	svg{
		width:11px;
		height:11px;
		margin-right:10px;
	}
}
.detail{
	position:absolute;
	top:22px;
	left:-200px;
	background:#FFF;
	border:1px solid #FFD8D9;
	width:500px;
	height:300px;
	padding:20px;
	z-index:10000;
	.title{
		color:#333;
		font-weight:600;
		margin-bottom:20px;
	}
	ul{
		max-height: 200px;
    	overflow-y: auto;
	}
	li{
		display:flex;
		justify-content:space-between;
		align-items:center;
		margin-bottom:20px;
		.info{
			display:flex;
			justify-content:center;
			align-items:center;
		}
		.money{
			width:80px;
			height:40px;
			background:#fff;
			border:1px solid #D4282D;
			text-align:center;
			line-height:40px;
			color:#D4282D;
			font-weight:600;
			margin-right:10px;
		}
		.type{
			font-size:12px;
		}
		button{
			width:80px;
			height:34px;
			background:#D4282D;
			border-radius:0px;
			color:#fff;
			&.disabled{
				background:none;
				color:#666666;
			}
		}
	}
	
}
</style>