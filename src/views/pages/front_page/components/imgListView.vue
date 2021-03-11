<template>
	<div>
		<!--图片预览模块-->
		<div class="img_card">
			<div class="bigImg" :class="{'studio':type==0,'model':type==2}">
				<div class="autoImg" v-if="type==0" style="width:580px;height:320px;">
					<img :src="util.picExplode(bigImg,config.defaultEquipPic,720)"  :onerror="util.errorPic" @click="openVrView" :class="{'cursor':vrList&&type==1}"/>
				</div>
				<div class="autoImg" v-if="type==1" style="width:428px;height:428px;">
					<img :src="util.picExplode(bigImg,config.defaultEquipPic)"  :onerror="util.errorPic" @click="openVrView" :class="{'cursor':vrList&&type==1}"/>
				</div>
				<div class="autoImg" v-if="type==2" style="width:428px;height:570px;">
					<img :src="util.picExplode(bigImg,config.defaultEquipPic,570)"  :onerror="util.errorPic" @click="openVrView" :class="{'cursor':vrList&&type==1}"/>
				</div>
				<div class="autoImg" v-show="type==3 && !isVideo" style="width:428px;height:428px;">
					<img :src="util.picExplode(bigImg,'',428)"  :onerror="util.errorPic" @click="openVrView" :class="{'cursor':vrList&&type==1}"/>
				</div>
				
				<div class="autoImg video" v-show="type==3 && isVideo"  @click="play">
					<video id="myPlayer" loop muted="true" width="428px" height="428px" class="video-js" ref="myPlayer">
						<source :src="$qiniuHost+bigImg" type="video/mp4"></source>
					</video>
					<div class="open" @click="play" v-if="!isPlay">
						<i class="el-icon-caret-right"></i>
					</div>
				</div>
				
				
				<div class="autoImg" v-if="type==4" style="width:428px;height:428px;">
					<img :src="util.picExplode(bigImg,'',428)"  :onerror="util.errorPic" @click="openVrView" :class="{'cursor':vrList&&type==1}"/>
				</div>
				<div class="view-btn">
					<div class="allView" @click="openVrView" v-if="vrList&&type==1">VR看棚</div>
					<div class="allscreen-btn" @click="viewPic" v-show="!isVideo">图片库</div>
				</div>
			</div>
			<div class="swiper-container" :class="{'studio':type==0}">
			    <div class="swiper-wrapper">
			    	<!--<div class="swiper-slide" v-for="(item,index) in newImgList" :key="index" @click="changeImg(index)">-->
			    	<div class="swiper-slide" v-for="(item,index) in newImgList" :class="{'active':imgIndex==index}" :key="index" @mouseover="changeImg(index)">
			        	<div class="img" :class="{'studio':type==0}">
				        	<!--<el-image v-if="type!=1" :src="util.picExplode(item)" class="cursor" fit="scale-down" :onerror="util.errorPic"/>-->
				        	<!--<el-image v-if="type==1" :src="util.picExplode(item,config.defaultEquipPic)" class="cursor" fit="scale-down" :onerror="util.errorPic"/>-->
			        	
			        		<div class="autoImg video" v-if="type==3">
								<div v-if="index==0 && myVideo">
									<video id="myPlayer" muted="true" width="74px" height="74px" class="video-js" ref="myPlayer">
										<source :src="$qiniuHost+item" type="video/mp4"></source>
									</video>
									<div class="open miniOpen">
										<i class="el-icon-caret-right"></i>
									</div>
								</div>
								<img v-else :src="util.picExplode(item,config.defaultEquipPic)" :onerror="util.errorPic"/>
							</div>
							<div v-else>
								<el-image v-if="type!=1" :src="util.picExplode(item)" class="cursor" fit="scale-down" :onerror="util.errorPic"/>
								<el-image v-if="type==1" :src="util.picExplode(item,config.defaultEquipPic)" class="cursor" fit="scale-down" :onerror="util.errorPic"/>
							</div>
			        	
			        	</div>
			       </div>
			    </div>
			    
			    <!-- 如果需要导航按钮 -->
			    <!--<div v-if="newImgList.length>5">
				    <div class="swiper-button-prev"></div>
				    <div class="swiper-button-next"></div>
			    </div>-->
			</div>
			
		</div>
		<!-- 全屏看图 -->
		<div v-if="isAllView" class="all-screen" ref="allScreen" id="allScreen">
			<div class="content">
				<div class="content-left">
					<i class="el-icon-arrow-left" @click="toggleImg('prev')"></i>
				</div>
				<div class="content-center">
					<!-- 中间大图 -->
					<!-- <img @click="toggleImg('next')" class="allScreenImg" :src="util.picExplode(bigImg,config.defaultEquipPic)"  :onerror="util.errorPic" :class="{'cursor':vrList&&type==1}"/> -->
					<div class="all-wrap">
						<img @click="toggleImg('next')" class="allScreenImg" :src="$qiniuHost+bigImg"  :onerror="util.errorPic" :class="{'cursor':vrList&&type==1}"/>
					</div>
					<div ref="bottomList" class="bottom-list" :class="{'img-list-hidden':!imgListShow}">
						<div class="list-top">
							<div class="top-left">
								<span v-if="!haveVideo">{{imgIndex+1}}</span>
								<span v-else>{{imgIndex}}</span>
								<span>/</span>
								<span v-if="!haveVideo">{{newImgList.length}}</span>
								<span v-else>{{newImgList.length-1}}</span>
							</div>
							<div class="top-right">
								<span @click="showImgList" v-if="imgListShow">隐藏照片列表</span>
								<span @click="showImgList" v-else>显示照片列表</span>
								<i class="el-icon-arrow-down" v-if="imgListShow"></i>
								<i class="el-icon-arrow-up" v-else></i>
							</div>
						</div>
						<!-- 列表小图 -->
						<div class="img-list" ref="list">
							<!-- <div class="img-wrap" @click="selectImg(item,index)" :class="{'img-checked':imgIndex==index}" v-for="(item,index) in [newImgList,...newImgList,...newImgList]" :key="index"> -->
							<div class="img-wrap" @click="selectImg(index)" :class="{'img-checked':imgIndex==index}" v-for="(item,index) in newImgList" :key="index">
								<img v-if="type==1 && !checkIsVideo(item)" :src="util.picExplode(item,config.defaultEquipPic)" :onerror="util.errorPic"/>
								<img v-if="type!=1 && !checkIsVideo(item)" :src="$qiniuHost+item" :onerror="util.errorPic"/>
							</div>
						</div>
					</div>
				</div>
				<div class="content-right">
					<i class="el-icon-close" @click="closeViewPic"></i>
					<i class="el-icon-arrow-right" @click="toggleImg('next')"></i>
				</div>
			</div>
		</div>
		<!--vr全景显示模块,如果是影棚详情显示全景，器材详情不显示全景-->
		<vr-view :vrArray="vrArray" :initIndex='imgIndex' v-if="openVr&&vrList&&type==1" :isShowVr.sync="openVr"></vr-view>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	import vrView from"FrontComponents/vr";
	export default {
		props:{
			imgList:{
				type:String,
				default:''
			},
			vrList:{
				type:String,
				default:''
			},
			//0/影棚 1/设备,2/模特,3/服务，4/团购拼拍，5/红人服务
			type:{
				type:String,
				default:'0'
			},
		},
		data() {
			return {
				openVr:false,
				imgIndex:0,
				bigImg:'',
				list:this.imgList,
				vrArray:[],
				isAllView:false,
				imgListShow:true,
				middleIndex:4,
				isVideo:false,
				haveVideo:false, //详情是否有视频
				myVideo:null,
				isPlay:false,  //视频是否播放
				videoType:["mp4", "ogg", "webm"],
			}
		},
		components:{
			vrView
		},
		computed: {
			newImgList: function() {
				console.log('newImgList------',this.list);
				let arr=[];
				//判断是否为服务详情
				if(this.type==3){
					//判断是否是视频
					if(this.checkIsVideo(this.list[0])){
						this.isVideo=true;
						this.haveVideo=true;
						//加载视频
						this.loadVideo();
					}
					
				}
				
				if(!this.list){
					arr.push('');
				}else{
					this.list.forEach((item,index)=>{
						arr.push(item);
//						arr.push(this.config.qiniuHost+item+"?imageView2/1/w/400/h/400");
					})
					
				}
				console.error('computed----arrr------',arr);
				return arr;
			}
		},
		created(){
			console.error('created----this.imgList-----',this.list,this.imgList);
			if(this.list){
				this.list=this.list.split(',');
				//去掉空数组数据
				this.list=this.util.trimSpace(this.list);
			}
			console.log('this.list-----------',this.list);
		},
		mounted(){
				
			if(!this.list){
				if(this.type==0){
					this.bigImg='';
				}else{
					this.bigImg=this.config.defaultEquipPic;
				}
			}else{
				this.bigImg=this.newImgList[0];
			}
			console.log('this.bigImg----------',this.bigImg);
			let arr;
			if(!this.vrList) return;
			if(this.vrList.indexOf('[{')>=0){
				arr=JSON.parse(this.vrList);
				arr.forEach((item,index)=>{
					let params={
						title:item.title,
						url:this.config.qiniuHost+item.url
					}
					this.vrArray.push(params);
				})
			}else{
				arr=this.vrList.split(',');
				arr.forEach((item,index)=>{
					let params={
						title:'',
						url:this.config.qiniuHost+item
					}
					this.vrArray.push(params);
				})
			}
			
			console.log('this.vrArray-----',this.vrArray);
			this.$nextTick(()=>{
				new Swiper('.swiper-container', {
					slidesPerView: 5,
					spaceBetween: 10,
					observer:true, //修改swiper自己或子元素时，自动初始化swiper
		    		observeParents:true,//修改swiper的父元素时，自动初始化swiper
				    // 如果需要前进后退按钮
				    navigation:{
				    	prevEl: '.swiper-button-prev',
			    		nextEl: '.swiper-button-next',
				    }
				})     
			});

		},
		methods: {
			//判断是否为视频
			checkIsVideo(str){
				console.log('str--------',str);
				let flag=false;
				if(str.indexOf('?')>=0){
					str=str.split('.')[1].split('?')[0]
				}else{
					str=str.split('.')[1];
				}
				console.log('str----------',str);
				this.videoType.forEach((item,index)=>{
					if(str.toLowerCase()==item){
						flag=true;
					}
				})
				return flag;
			},
			//加载声音和播放
			loadOther(){
			},
			loadVideo(){
				this.$nextTick(()=>{
					this.myVideo=this.$video('myPlayer');
					setTimeout(()=>{
						this.play();
					},500);
				})
				
			},
			play(){
			    this.myVideo.play();
			    this.isPlay=true;
			},
			//暂停视频
			pause(){
				this.myVideo.pause();
				this.isPlay=false;
			},
			//打开vr全景图
			openVrView(){
				this.openVr=true;
			},
			changeImg(index){
				if(this.imgIndex==index) return;
				if(index!=0 || !this.checkIsVideo(this.newImgList[index])){
					if(this.isPlay){
						this.pause();
					}
					this.isVideo=false;
				}else{
					setTimeout(()=>{
						this.play();
					},100);
					
					this.isVideo=true;
				}
				this.imgIndex=index;
				this.bigImg=this.newImgList[index];
				console.log('changeImg-----',this.isVideo,this.bigImg);
				
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
			viewPic(){
				this.isAllView=true	
				this.imgListShow=true
				// document.getElementsByTagName("body")[0].className="bodyall";
				document.querySelector('body').setAttribute('style', 'overflow:hidden')
			},
			// 关闭看图
			closeViewPic(){
				this.isAllView=false
				document.querySelector('body').setAttribute('style', 'overflow-y:scroll')
			},
			// 选中列表小图中的某一张
			selectImg(index){
				// this.$refs.list.style.marginLeft=-(index-this.imgIndex)*(100+(986-900)/8)+'px'
//				this.imgIndex=index
//				this.bigImg=this.newImgList[index];
				this.changeImg(index);
				// 判断下标实现点击列表小图相应左右移动的效果
				// let middleIndex= 5
				if(index>this.middleIndex){
					if(index+1>Math.ceil(this.newImgList.length/9)*5){
						if(this.middleIndex!=Math.ceil(this.newImgList.length/9)*5-1){
							this.$refs.list.style.marginLeft=(parseInt(this.$refs.list.style.marginLeft)-(Math.ceil(this.newImgList.length/9)*5-1-this.middleIndex)*(100+(986-900)/8))+'px'
							this.middleIndex=Math.ceil(this.newImgList.length/9)*5-1
						}
						return
					}
					if(!this.$refs.list.style.marginLeft){
						this.$refs.list.style.marginLeft=-(index-this.middleIndex)*(100+(986-900)/8)+'px'
					}else{
						this.$refs.list.style.marginLeft=(parseInt(this.$refs.list.style.marginLeft)-(index-this.middleIndex)*(100+(986-900)/8))+'px'
					}
					this.middleIndex=index
				}else if(index<this.middleIndex){
					if(index<=4){
						this.$refs.list.style.marginLeft="0px"
						this.middleIndex=4
						return
					}
					this.$refs.list.style.marginLeft=(parseInt(this.$refs.list.style.marginLeft)-(index-this.middleIndex)*(100+(986-900)/8))+'px'
					this.middleIndex=index
				}
			},
			// 左右切换图片
			toggleImg(operation){
				if(operation==='prev'){
					if(this.imgIndex==0){
						this.imgIndex=this.newImgList.length
						// this.$message.warning('已经是天地之初')
						// return
					}
					this.imgIndex--
					this.bigImg=this.newImgList[this.imgIndex];
					this.selectImg(this.imgIndex) 
				}else{
					if(this.imgIndex==this.newImgList.length-1){
						this.imgIndex=-1
						// this.$message.warning('已经到达世界的尽头')
						// return
					}
					this.imgIndex++
					this.bigImg=this.newImgList[this.imgIndex];
					this.selectImg(this.imgIndex) 
				}
			},
			// 显示隐藏小图列表
			showImgList(){
				this.imgListShow=!this.imgListShow
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.img_card {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
	}
	
	.bigImg {
		width: 430px;
		height: 430px;
		margin-bottom: 10px;
		position:relative;
		border:1px solid #F0F0F0;
		&.studio{
			width:582px;
			height:322px;
		}
		&.model{
			width:430px;
			height:572px;
		}
		&:hover{
			.view-btn{
				visibility: visible;
			}
		}
		.view-btn{
			visibility: hidden;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			color:#fff;
			font-size:12px;
			display: flex;
			.allView,.allscreen-btn{
				text-align:center;
				line-height:66px;
				cursor:pointer;
				width:66px;
				height:66px;
				background:rgba(0,0,0,1);
				border-radius:4px;
				opacity:0.7;
			}
			.allView+.allscreen-btn{
				margin-left: 10px;
			}
		}
	}
	.bodyall{
		overflow: hidden!important;
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
	
	.smallImg {
		ul {
			width: 428px;
			display: flex;
			justify-content: flex-start;
			li {
				cursor:pointer;
				width: 80px;
				height: 80px;
				margin-right:10px;
				img {
					width: 100%;
				}
			}
		}
	}
	.swiper-container{
		width:430px;
		&.studio{
			margin:0px;
		}
		.swiper-wrapper{
			.swiper-slide{
				width:76px;
				margin-right:10px;
				border:1px solid #F0F0F0;
				.img{
					width:74px;
					height:74px;
					div{
						width:100%;
						height:100%;
					}
					&.studio{
						height:45px;
					}
				}
				
			}
			.active{
				border:1px solid #7C6AFF;
			}
		}
	}
	
	.video{
		position:relative;
		width:428px;
		height:428px;
		cursor:pointer;
		.open,.voice{
			color:#fff;
			position:absolute;
			bottom:160px;
			left:160px;
			border-radius:50%;
			width:100px;
			height:100px;
			background:rgba(0,0,0,.5);
			cursor:pointer;
			font-size: 20px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    i{
		    	font-size:30px;
		    }
		}
		.miniOpen{
			width:30px!important;
			height:30px!important;
			bottom:20px;
			left:20px;
			i{
				font-size:18px;
			}
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