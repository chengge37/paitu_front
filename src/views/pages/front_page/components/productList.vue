<template>
	<div>
		<ul class="list">
			<li v-for="(item,index) in myList" :key="index" class="card-hover" :class="{'studio':type=='studio'}">
				<el-image style="width:222px;height:222px;" fit="contain" v-if="type=='equip'" :src="util.picExplode(item.pic,config.defaultEquipPic)"
					:onerror="util.errorPic"
					class="cursor"
					@click="toDetail(item)"
					/>
				<el-image style="width:300px;height:170px;" fit="contain" v-if="type=='studio'" :src="util.picExplode(item.pic,config.defaultEquipPic)"
					:onerror="util.errorPic"
					class="cursor"
					@click="toDetail(item)"
					/>
					
				<!-- VR看棚、图片库 -->
				<!--<div class="pro-imgs pro-show" :class="{'equip-box':type=='equip'}">-->
					<!-- <div class="vr-box">VR看棚</div> -->
					<!--<div class="imgs-box"  @click="viewPic(index)">图片库</div>-->
				<!--</div>-->
			

				<!-- 详情文字 -->
				<div class="detail">
					<!--<p class="name word-hover cursor" @click="toDetail(item)" :title="item.name">{{item.name}}</p>-->
					<p class="name word-hover cursor" @click="toDetail(item)" :title="item.name">{{item.custom_desc||item.name}}</p>
					<div v-if="type=='studio'" class='studio'>
						<p class="price">
							<span>¥{{item.priceWorkDayWorkTimePerHour}}</span> /{{item.unit?item.unit:'小时'}}
						</p>
						<p class="square">
							{{item.square}}㎡
						</p>
						<p class="sales">
							销量:
							<span class="count">{{item.total}}</span> 次
						</p>
					</div>
					<div class="service" v-if="type=='studio'">
						<span v-for="(subItem,index2) in item.condition" :key="index2">
							{{subItem}}
						</span>
					</div>
					<div v-else>
						<p class="price" v-if="item.only_rent_day==0">
							<span>¥{{item.price}}</span> /小时
						</p>
						<p class="price" v-else>
							<span>¥{{item.price_day_workday_in}}</span> /天
						</p>
						<p class="sales">
							销量:
							<span class="count">{{item.total}}</span> 次
							<!--是否外借：{{item.isTake==0?'否':'是'}}-->
						</p>
					</div>
					<el-rate :class="{'studio':type=='studio'}" v-bind:value="item.score|toNumber" disabled show-score text-color="#ff9900" score-template="{value}分">
					</el-rate>
					<div class="store">
						<ali-svg-icon icon-class="ic_homepage_gray"></ali-svg-icon>
						<span>{{item.nick}}</span>
					</div>
					<div class="address" :title="item.address">
						<ali-svg-icon icon-class="ic_adress_gray"></ali-svg-icon>
						<span>{{item.address?item.address:'该商家未填写地址'}}</span>
					</div>
					<div class="operate">
						<el-button class="collectBtn" :class="{'collect':item.isCollect}" @click="collect(item)">{{item.isCollect?'已收藏':'收藏'}}</el-button>
						<!--<el-button>租借</el-button>-->
						<el-button @click="toShopPage(item)">进店</el-button>
						<i class="el-icon-chat-dot-round" title="聊天" @click="chatTo(item)"></i>
					</div>
				</div>
			</li>
		</ul>
		
		<preview-img
			:isShow="isAllView"
			:detailImgList="detailImgs"
			:imgListShow="imgListShow"
			:vrList="vrList"
			:type="type"
			@closeViewPic="closeViewPic"
		></preview-img>	

		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
	</div>
</template>

<script>
	import miniLogin from "FrontComponents/minilogin";
	import { collectOther } from "@util/common.js";
	import previewImg from './previewImg.vue'
	import { mapGetters } from "vuex";

	export default {
		props: {
			list: {
				type: Array,
				default:[]
			},
			type:{
				type:String,
				default:'studio'
			}
		},
		data() {
			return {
				checkIndex:0,
				vrList:[],
				isShowDialog:false,
				myList:this.list,
				openVr:false,
				imgIndex:0,
				bigImg:'',
				vrArray:[],
				isAllView:false,
				imgListShow:true,
				middleIndex:4,			
				detailImgs:[],
			};
		},
		components:{
			miniLogin,
			previewImg
		},
		watch:{
			list(to,from){
				this.myList=to;
				this.changeType();
			},
		},
		created(){
			this.changeType();
		},
		mounted() {},
		computed: {

		},
		methods: {
			chatTo(item){
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(this.user_data.id==item.uid){
					this.$message.warning('这是你自己的影棚')
					return
				}
				let chatToObj={
					id:item.uid,
					name:item.nick,
					avatar:item.avatar?this.$qiniuHost+item.avatar:'https://pic.paitume.com/images/male.png'
				}
				this.$parent.$parent.$parent.$refs.chat.chatTo(chatToObj)
			},
			changeType(){
				//为列表添加一个影棚配套显示设备的数组
				if(this.type=="studio"){
					let serviceList=this.config.conditionArray;
					this.myList.forEach((item,index)=>{
						if(item.serviceConditionArray.length>0){
							let list=[];
							item.serviceConditionArray.forEach((item2,index2)=>{
								serviceList.forEach((item3,index3)=>{
									if(item2==item3.id){
										list.push(item3.name);
									}
								})
								
							})
							item.condition=list;
						}
						
					})
				}
			},
			//跳转到详情页面
			toDetail(item){
				if(this.type=='studio'){
			      this.util.toStudioDetail(item.id)
				}else{
				  this.util.toEquipDetail(item.id);
				}
			},
			//进入店铺页面
			toShopPage(item){
				this.util.toShopPage(item.uid);
			},
			//收藏(取消收藏)，关注(取消关注）方法 type: 0/为店铺 1/影棚
			collect(item) {
				console.log("collect----",item);
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				let type;
				if(this.type=="studio"){
					type="1";
					
				}else{
					type="2";
				}
				collectOther(item.uid, type, "1", item.id).then(
					res => {
						if(res == 1) {
							this.$set(item,'isCollect',true);
						} else {
							this.$set(item,'isCollect',false);
						}
					}
				);
			},
			//关闭登录对话框
			closeLogin() {
				this.isShowDialog = false;
				this.imgIndex = 0;
			},

			//打开vr全景图
			openVrView(){
				this.openVr=true;
			},
			// 全屏看图
			fullScreenFun() {
				let iFullscreen = false; //当前是否全屏状态
				let fullscreenEnabled = document.fullscreenEnabled ||
					document.mozFullScreenEnabled ||
					document.webkitFullscreenEnabled ||
					document.msFullscreenEnabled;

				if (fullscreenEnabled) {
					let all = this.$refs.allScreen;
					if (iFullscreen) {
						//关闭全屏
						if (document.exitFullscreen) {
							document.exitFullscreen();
						} else if (document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
						} else if (document.webkitCancelFullScreen) {
							document.webkitCancelFullScreen();
						}
					} else {
						//打开全屏
						if (all.requestFullscreen) {
							all.requestFullscreen();
						} else if (all.mozRequestFullScreen) {
							all.mozRequestFullScreen();
						} else if (all.webkitRequestFullScreen) {
							all.webkitRequestFullScreen();
						}
					}
				} else {
					alert('浏览器当前不能全屏');
				}
			},
			// 打开看图
			viewPic(index){
				this.isAllView=true	
				this.imgListShow=true
				document.getElementsByTagName("body")[0].className="bodyall";
				document.querySelector('body').setAttribute('style', 'overflow:hidden')
				this.detailImgs = this.newImgList[index].pic.split(',');
				this.detailImgs.filter((item,index) => {
					if(!item){
						this.detailImgs.splice(index,1)
					}
				})
				this.bigImg=this.newImgList[index].pic.split(',')[0];
			},
			// 关闭看图
			closeViewPic(isAllView){
				this.isAllView=isAllView
				document.querySelector('body').setAttribute('style', 'overflow-y:scroll')
			},
			// 显示隐藏小图列表
			showImgList(){
				this.imgListShow=!this.imgListShow
			}

		},
		computed: {
			newImgList: function() {
				let arr=[];
				if(!this.myList){
					arr.push('');
				}else{
					this.myList.forEach((item,index)=>{
						arr.push(item);
//						arr.push(this.config.qiniuHost+item+"?imageView2/1/w/400/h/400");
					})
					
					//测试代码 轮播效果，
//					arr.forEach((item,index)=>{
//						arr.push(item);
//					})
				}
				console.log('arrr------',arr);
				return arr;
			},
			...mapGetters(["user_data"])
		},		
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list {
		display: flex;
		flex-wrap: wrap;
		li {
			position: relative;
			background: #fff;
			width: 224px;
			border: 1px solid #f0f0f0;
			color: #999;
			margin-right: 10px;
			margin-bottom: 10px;
			&:nth-child(4n) {
				margin-right: 0px;
			}
			&.studio{
				width:302px;
				margin-right:6px;
			}
			&:hover{
				.pro-show{
					visibility:visible;
				}				
			}
		}
		.pro-imgs{
			visibility: hidden;
			position: absolute;
			top: 0;
			z-index:999;
			width:100%;
			height: 170px;
			background:rgba($color: #000000, $alpha: .3);
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			padding: 0 60px;
			box-sizing: border-box;
			.vr-box,.imgs-box{
				width: 60px;
				line-height: 60px;
				height: 60px;
				text-align: center;
				background:rgba($color: #000000, $alpha: .7);
				font-size:14px;
				color: #fff;
				border-radius: 10px;
				cursor: pointer;
				-webkit-user-select:none;
				-moz-user-select:none;
				-ms-user-select:none;
				user-select:none;				
			}
		}
		.equip-box{
			padding: 0 5px;
			height: 222px; 
		}		
	}
	.detail {
		padding: 0px 10px 10px;
		.studio{
			display:flex;
			justify-content:space-between;
			align-items:center;
		}
		.service{
			height:70px;
			overflow-y:auto;
			span{
				display:inline-block;
				padding:6px;
				background:#FAFAFA;
				border-radius:2px;
				margin-right:3px;
				margin-bottom:3px;
				font-size:12px;
			}
			&::-webkit-scrollbar {/*滚动条整体样式*/
		        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
		        height: 1px;
		        /*opacity: 0;*/
		       display:none;
		    }

			&::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		        border-radius: 10px;
		         /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
		        background: #ddd;
		    }
			&::-webkit-scrollbar-track {/*滚动条里面轨道*/
		        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
		        border-radius: 10px;
		        background: #EDEDED;
			}
	        &:hover{
	        	&::-webkit-scrollbar {
		            /*opacity: 1;*/
		           display:block;
		        }
	        }
		}
	}
	
	.name {
		/*font-weight: 600;
		font-family: PingFangSC-Semibold;
		padding: 10px 0px;
		color: #333333;
		height:58px;*/
		font-weight: 600;
	    font-family: PingFangSC-Semibold;
	    margin: 10px 0px;
	    color: #333333;
	    height: 38px;
	    overflow: hidden;
	    -webkit-line-clamp: 2;
	    text-overflow: ellipsis;
	}
	
	.price {
		font-size: 12px;
		span {
			color: #D4282D;
			font-weight: bold;
			font-size: 16px;
		}
	}
	
	.sales {
		font-size: 12px;
		margin: 5px 0px;
		span{
			margin-left:5px;
		}
	}
	
	.store,.address{
		display:flex;
		align-items:center;
		svg{
			margin-right:7px;
		}
		span{
			flex:1;
		}
	}
	.store {
		font-size: 12px;
		margin-top:5px;
	}
	
	.address {
		font-size: 12px;
		padding-top: 5px;
		border-top: 1px solid #FAFAFA;
		margin-top: 7px;
		height:43px;
		overflow: hidden;
		align-items:baseline;
		svg{
			position:relative;
			top:4px;
		}
	}
	
	.operate {
		margin-top: 5px;
		display: flex;
		justify-content:flex-end;
		align-items: center;
		i{
			font-size: 22px;
			color: #7C6AFF;
			margin-left: 15px;
			cursor: pointer;
		}
		button {
			padding: 7px 17px;
			border: 1px solid #F0F0F0;
			border-radius: 0px;
			font-size: 12px;
		}
		.collect{
			background:#7C6AFF;
			color:#fff;
		}
	}
	/deep/{
		.el-rate__icon{
			margin-right:3px;
		}
		.el-rate__text{
			margin-left:60px;
			color:#999999!important;
			font-size:12px;
		}
		.studio{
			.el-rate__text{
				margin-left:145px;
			}
		}
	}

	// 全屏看图区块
	.all-screen{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgb(38,38,38);
		// position:absolute;
		// top:0;
		// left:0;
		height:100%;
		width: 100%;
		z-index: 9999999999;
		.content{
			display: flex;
			height: 100%;
			.content-left{
				flex: 1;
				display: flex;
				align-items: center;
				.el-icon-arrow-left{
					font-size: 120px;
					color: #fff;
					cursor: pointer;
				}
			}
			.content-center{
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex:2;
				.all-wrap{
					width: 986px;
					height: 660px;
					background: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					.allScreenImg{
						max-width: 986px;
						max-height: 660px;
						width: auto;
						height: auto;
						cursor: pointer;
					}
				}
				.bottom-list{
					width: 986px;
					height: 100px;
					display: flex;
					flex-direction: column;
					position: relative;
					top: 0;
					transition: top 0.5s linear;
					overflow: hidden;
					.list-top{
						height: 30px;
						display: flex;
						justify-content: space-between;
						color: #fff;
						.top-right{
							span{
								cursor: pointer;
							}
						}
					}
					.img-list{
						// width: 986px;
						flex: 1;
						display: flex;
						opacity: 1;
						transition: opacity 0.4s linear;
						// overflow: hidden;
						margin-left: 0;
						transition: margin-left 0.3s linear;
						// position: relative;
						// left: 0;
						// justify-content: space-between;
						.img-wrap{
							height: 70px;
							img{
								width: 100px;
								height: 70px;
								margin-right: calc((986px - 900px)/8);
								opacity: 0.5;
								cursor: pointer;
							}
						}
						.img-checked{
							img{
								opacity: 1;
							}
						}
					}
				}
				.img-list-hidden{
					position: relative;
					top: 70px;
					transition: top 0.5s linear;
					.img-list{
						// display: none;
						opacity: 0;
						transition: opacity 0.4s linear;
						// visibility: hidden;
					}
				}
			}
			.content-right{
				flex:1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: center;
				position: relative;
				.el-icon-arrow-right{
					font-size: 120px;
					color: #fff;
					cursor: pointer;
				}
				.el-icon-close{
					position: absolute;
					top: 10px;
					right: 20px;
					font-size: 50px;
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}

</style>