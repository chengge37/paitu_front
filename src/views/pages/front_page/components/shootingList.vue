<template>
	<div>
		<ul class="list">
			<li v-for="(item,index) in myList" :key="index" class="card-hover">
				<el-image v-if="type==0 && !listByPic" style="width:224px;height:298px;" fit="contain" :src="util.picExplode(item.photo,config.defaultEquipPic)"
					:onerror="util.errorPic"
					class="cursor"
					@click="toDetail(item)"
					/>
				<el-image v-if="type==0 && listByPic" style="width:224px;height:298px;cursor: default;" fit="contain" :src="item[0]"
					:onerror="util.errorPic"
					class="cursor"
					/>
					
				<el-image v-if="type==1 && !item.video" style="width:224px;height:224px;" fit="contain" :src="util.picExplode(item.pic)"
					:onerror="util.errorPic"
					class="cursor"
					@click="toDetail(item)"
					/>
					
				<!--视频模块-->
				<div v-if="type==1 && item.video"  class="video" :key="index" @mouseenter="play(index)" @mouseleave="pause(index)">
					<video :id="'my-player-'+item.randomId" @click="toDetail(item)" muted="true" width="224px" height="224px" class="video-js" :ref="'my-player'+index">
						<source :src="$qiniuHost+item.video" type="video/mp4"></source>
						<!--<source type="video/mp4"></source>-->
					</video>
					<div class="open" @click="play(index)" v-if="!(isPlayList[index])">
						<i class="el-icon-caret-right"></i>
					</div>
					<div class="voice" v-if="!haveVoiceList[index] && isPlayList[index]" @click="voice(1,index)">
						<ali-svg-icon icon-class="shengyin" class="shengyin"></ali-svg-icon>
					</div>
					<div class="voice" v-if="haveVoiceList[index] && isPlayList[index]" @click="voice(0,index)">
						<ali-svg-icon icon-class="lujing" class="lujing"></ali-svg-icon>
					</div>
				</div>
					
				<el-image v-if="type==2" style="width:224px;height:224px;" fit="contain" :src="util.picExplode(item.photo)"
					:onerror="util.errorPic"
					class="cursor"
					@click="toDetail(item)"
					/>
					
				<el-image v-if="type==4" style="width:224px;height:298px;" fit="contain" :src="util.picExplode(item.pic)"
					:onerror="util.errorPic"
					class="cursor"
					@click="toDetail(item)"
					/>
					
				<!-- 详情文字 -->
				<div class="detail">
					<p class="name word-hover cursor" @click="toDetail(item)" :title="item.name" v-if="type!=5 && !listByPic">{{item.title}}</p>
					<div  class='model'>
						<p class="price" v-if="type==0 && !listByPic">
							<span>¥{{item.ppd}}</span> /天
						</p>
						<div class="price" v-if="type==1 || type==2">
							<span>¥{{item.price}}</span>
							<span v-if="type==1" class="oldPrice">{{item.showPrice}}</span>
						</div>
						<!--助理模块-->
						<p class="price" v-if="type==4 && item.only_rent_day==0">
							<span>¥{{item.price_hour}}</span> /小时
						</p>
						<p class="price" v-if="type==4 && item.only_rent_day==1">
							<span>¥{{item.price_day}}</span> /天
						</p>
						<p class="sales" v-if="type==1">
							销量:
							<span class="count">{{item.user.deal_count}}</span> 次
						</p>
						<p class="sales" v-if="(type==0  && !listByPic) || type==2 || type==4">
							销量:
							<span class="count">{{item.total}}</span> 件
						</p>
						
					</div>
					
					<el-rate v-if="type==0 && !listByPic" v-bind:value="(item.score>0?item.score:0)|toNumber" disabled show-score text-color="#ff9900" score-template="{value}分">
					</el-rate>
					
					<el-rate v-if="type==1" v-bind:value="(item.user.score>0?item.user.score:0)|toNumber" disabled show-score text-color="#ff9900" score-template="{value}分">
					</el-rate>
					
					<el-rate v-if="type==2"  v-bind:value="(item.score>0?item.score:0)|toNumber" disabled show-score text-color="#ff9900" score-template="{value}分">
					</el-rate>
					
					<div class="store" v-if="type==0 && !listByPic">
						<ali-svg-icon icon-class="ic_homepage_gray"></ali-svg-icon>
						<span>{{item.to_user.nick?item.to_user.nick:'该商家未填写名称'}}</span>
					</div>
					<div class="store" v-if="type==1">
						<ali-svg-icon icon-class="ic_homepage_gray"></ali-svg-icon>
						<span>{{item.user.nick?item.user.nick:'该商家未填写名称'}}</span>
					</div>
					<div class="store" v-if="type==2">
						<ali-svg-icon icon-class="ic_homepage_gray"></ali-svg-icon>
						<span>{{item.user.nick?item.user.nick:'该商家未填写名称'}}</span>
					</div>
					<div class="store" v-if="type==4">
						<ali-svg-icon icon-class="ic_homepage_gray"></ali-svg-icon>
						<span>{{item.auto_msg_user.nick?item.auto_msg_user.nick:'该商家未填写名称'}}</span>
					</div>
					
					<div class="store" v-if="type==5">
						<ali-svg-icon icon-class="ic_homepage_gray"></ali-svg-icon>
						<span>测试需求店铺</span>
					</div>
					
					<div class="operate" v-if="!listByPic">
						<el-button class="collectBtn" v-if="type!=5" :class="{'collect':item.isCollect}" @click="collect(item)">{{item.isCollect?'已收藏':'收藏'}}</el-button>
						<el-button  v-if="type==5"  @click="join(item)">我要投标</el-button>
						<el-button @click="toShopPage(item)">进店</el-button>
					</div>
				</div>
			</li>
		</ul>
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
	</div>
</template>

<script>
	import miniLogin from "FrontComponents/minilogin";
	import { collectOther } from "@util/common.js";
	import { mapGetters } from "vuex";
	
	export default {
		props: {
			list: {
				type: Array,
				default:[]
			},
			//type 0:模特  1:摄影服务  2：团购拼拍  3：红人服务   ,4:助理,5:需求
			type:{
				type:String,
				default:'0'
			},
			//type为''时 ，是否为模特类似列表，默认为空（不是）。如果传值1，就是显示类似模特列表。
			similar:{
				type:String,
				default:'',
			},
			//type为0时作用，模特列表是否为以图搜图形式展示，默认为空，如果有传值（不为空），就是以图搜图形式
			listByPic:{
				type:String,
				default:''
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
				myVideoList:[],
				haveVoiceList:[],
				isPlayList:[],
			};
		},
		components:{
			miniLogin,
		},
		watch:{
			list(to,from){
				this.myList=to;
				console.log('listByPic------',this.listByPic);
				console.log('list-----change------',this.myList);
				this.haveVoiceList=[];
				this.isPlayList=[];
				this.myVideoList=[];
				this.loadOther();
				this.$nextTick(()=>{
					if(this.type==2){
						this.loadVideo();
					}
				})
			},
		},
		created(){
			if(this.type==2){
				this.loadOther();
			}
			
		},
		mounted() {
			console.log('shooting------list-----------',!'');
			if(this.type==2){
				this.loadVideo();
			}
		},
		computed: {
			...mapGetters(["user_data"]),
			
			newImgList: function() {
				let arr=[];
				if(!this.myList){
					arr.push('');
				}else{
					this.myList.forEach((item,index)=>{
						arr.push(item);
					})
					
				}
				return arr;
			}
		},
		methods: {
			//参加竞标（需求）方法
			join(item){
				console.log('join-------',item);
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}else{
					//判断是否为摄影师
					if(this.user_data.role & 8){
						//判断是否已经交年费，如果没有，弹出交费弹窗
						this.util.showSuccess('可以参加！');
					}else{
						this.util.showWarn('你还不是摄影师身份，无法参加！');
					}
				}
			},
			
			//加载声音和播放
			loadOther(){
				this.myList.forEach((item,index)=>{
					this.haveVoiceList[index]=false;
					this.isPlayList[index]=false;
					//为视频添加一个随机参数，防止不能二次加载
					if(item.video){
						this.myList[index].randomId=this.util.getUUID(10);
					}
				})
				
			},
			loadVideo(){
				this.myList.forEach((item,index)=>{
					if(item.video){
						
						this.myVideoList[index]=this.$video('my-player-'+item.randomId);
					}else{
						this.myVideoList[index]=null;
					}
				})
			},
			play(index){
			    this.myVideoList[index].play();
				this.$set(this.isPlayList,index,true);
			},
			pause(index){
				this.$set(this.isPlayList,index,false);
				this.$set(this.haveVoiceList,index,false);
				this.myVideoList[index].load();//重载视频
				this.myVideoList[index].muted(true);
			},
			//打开,关闭声音   0/关闭声音 1/开启声音
			voice(type,index){
				if(type==0){
					this.myVideoList[index].muted(true);
					this.$set(this.haveVoiceList,index,false);
				}else{
					this.myVideoList[index].muted(false);
					this.$set(this.haveVoiceList,index,true);
				}
			},
			//进入相关店铺
			toShopPage(item){
				console.log('item---------',item);
				//首先判断是公司，还是个人
				let isPerson=false;
				let role;
				switch(parseInt(this.type)){
					case 0:
						role=item.to_user.role;
						break;
					case 1:
						role=item.auto_msg_user.role;
						break;
					case 2:
						role=item.user.role;
						break;
				}
				if([64,128].includes(parseInt(role))){
					isPerson=true;
				}
				if(this.type==0 && isPerson){
					this.util.toModelHome(item.id);
				}else if((this.type==1 || this.type==2) && isPerson){
					this.util.toPhotoerHome(item.uid);
				}else{
					let companyType;
					if(this.type==0){
						companyType=3;
					}else{
						companyType=2;
					}
					this.util.toCompanyHome(item.uid,companyType);
				}
			},
			
			//跳转到详情页面
			toDetail(item){
				switch(parseInt(this.type)){
					case 0:
						this.util.toModelDetail(item.id);
						break;
					case 1:
						this.util.toServiceDetail(item.id);
						break;
					case 2:
						this.util.toTeamDetail(item.id);
						break;
					case 3:
						this.util.toRedManDetail(item.id);
						break;
					case 4:
						this.util.toAssistantDetail(item.id);
						break;
				}
			},
			//收藏(取消收藏)，关注(取消关注）方法 type: 0表示店铺本身，1表示影棚，2表示设备，3表示活动 4模特 5拼拍
			collect(item) {
				console.log("collect----",item);
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				let type=0;
				switch(parseInt(this.type)){
					case 0:
						type=4;
						break;
					case 2:
						type=5;
						break;
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

			

		},		
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "@front/common/common.scss";
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
			&.model{
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
	}
	.detail {
		padding: 0px 10px 10px;
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
		.oldPrice{
			font-size: 14px;
		    text-decoration: line-through;
		    color: #bbb;
		    font-weight: 400;
		    margin-left: 5px;
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
		.el-image__error, .el-image__inner, .el-image__placeholder{
			width:calc(100% - 2px);
			height:calc(100% - 2px);
		}
	}
	.video{
		position:relative;
		width:224px;
		height:224px;
		cursor:pointer;
		.open,.voice{
			color:#fff;
			position:absolute;
			bottom:15px;
			left:15px;
			border-radius:50%;
			width:30px;
			height:30px;
			background:rgba(0,0,0,.5);
			cursor:pointer;
			font-size: 20px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		}
		.voice{
			left:auto;
			right:15px;
			.svg-icon{
				width:18px;
				height:18px;
			}
		}
	}
	.video-js{
		width:100%!important;
		height:100%!important;
	}
</style>