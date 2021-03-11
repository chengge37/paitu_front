<template>
	<div>
		<!--联系客服模块-->
		<div class="contact cursor">
			<p v-if="cartNum>0" @click="util.toCartPage(0)" class="color-area">
				<!--<el-badge :value="cartNum" class="item">-->
					<!--<i class="el-icon-goods"></i>-->
				<!--<div>-->
					<ali-svg-icon icon-class="gouwuche_bai" class="cartIcon"></ali-svg-icon>
					<i class="point"></i>
				<!--</div>-->
				<!--</el-badge>-->
			</p>
			<p class="color-area" @click="util.contact()">联系客服</p>
			<!--<p v-back v-if="showBackToTop" class="color-area">
				<i class="el-icon-arrow-up"></i>
			</p>-->
			<p v-if="showBackToTop" class="color-area" @click="toTop">
				<i class="el-icon-arrow-up"></i>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cartNum: 0,     //购物车数量
				showBackToTop:false,  //是否显示返回顶部按钮
				showPosition:200,   //超过多少高度显示返回顶部按钮
				scrollTop:0,
			}
		},
		props:{
			cartInfo:{
				type:Object,
				default:null,
			}
		},
		created() {
			//监听滚动条事件
			window.onscroll = ()=>{
				var t = document.documentElement.scrollTop || document.body.scrollTop; //变量t就是滚动条滚动时，到顶部的距离
				this.scrollTop=t;
				if(t >= this.showPosition) { //当拖动到距离顶部200px处时，左边导航固定，不随滚动条滚动
					this.showBackToTop=true;
				} else {
					this.showBackToTop=false;
				}
			}
		},
		mounted() {
			if(this.cartInfo){
				this.cartNum=this.cartInfo.count;
			}
			
			//获取购物车数量
		},
		methods: {
			//回到顶部方法
			toTop(){
				console.log("this.scrollTop---------",typeof this.scrollTop,this.scrollTop);
				 let timer = setInterval(() => {
			        let ispeed = Math.floor(-this.scrollTop/5);
			        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
			        if (this.scrollTop==0) {
			          clearInterval(timer)
			        }
			      }, 15)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.contact {
		position: fixed;
		right: 50%;
		margin-right:-655px;
		top: 50%;
		width: 35px;
		height: 136px;
		margin-top: -90px;
		color: #fff;
		p {
			padding: 10px;
			background: #7C6AFF;
			margin-bottom: 2px;
		}
		.point{
			position:absolute;
			top:7px;
			right:2px;
			width:8px;
			height:8px;
			border-radius:4px;
			background:#D4282D;
		}
		.cartIcon{
			width:19px;
			height:19px;
			color:#fff;
		}
	}
</style>