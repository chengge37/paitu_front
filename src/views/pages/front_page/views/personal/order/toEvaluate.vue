<template>
	<div>
		<!--<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
			<el-breadcrumb-item>待评价</el-breadcrumb-item>
			<el-breadcrumb-item>评价</el-breadcrumb-item>
		</el-breadcrumb>-->
		<div class="main">
			
			<div class="head">
				评价商品
			</div>
			<div class="evaluate-wrap">
				<div class='evaluate-content'>
					
					<!-- 器材评价 -->
					<ul class="equip-evaluate"  v-if="orderList.length>0">
						<li v-for="(item,index) in orderList" :key="index" :class="{'studio':item.type=='1'}">
							<div class="leftInfo">
								<img :src="util.qiniuAddress+item.showPic" alt="" width="148" height="112"/>
								<p>{{item.name}}</p>
								<div class="price-style">
									<span>￥{{item.price}}</span>
									<span class="style">{{item.type=='1'?'影棚':'器材'}}</span>
								</div>
							</div>
							<div class="rightInfo">

								<div class="rate">
									<span>评分</span>
									<el-rate v-model="item.score" show-text></el-rate>
								</div>
								<div class="dec">
									<span>描述</span>
									<el-input type="textarea" :placeholder="'请添加文字描述,不填默认为 '+defaultComment" v-model="item.content">
									</el-input>
								</div>
								<div class="pictures">
									<span>晒图</span>
									<div class="imgList" @click.stop="checkImgNum(item)">
										<el-upload :limit="5" :disabled="item.pic.length>=5" :multiple="true" :show-file-list="true" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" :data="picPostData" action="https://up-z2.qiniup.com/" list-type="picture-card" :on-preview="handlePictureCardPreview">
											<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog :visible.sync="dialogVisible">
											<img width="100%" class="el-img" :src="dialogImageUrl" alt>
										</el-dialog>
									</div>
									<div class="picNum">{{item.pic.length}}/5</div>
								</div>

							</div>
						</li>
					</ul>
					
				</div>
				
				<!--店铺服务-->
				<div class="shopService rowBar">
					<div>店铺评分</div>
					<div class="top">
						<span>店铺服务</span>
						<el-rate v-model="commentInfo.score" show-text></el-rate>
					</div>
				</div>
				
				<!--底部评价-->
				<div class="assess rowBar">
					<!-- <el-checkbox v-model="checked">匿名评价</el-checkbox> -->
					<div class="btn cursor" @click="submit">提交评价</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {storage} from '@util/storage.js'
	import { checkPic } from "@util/picUtil.js";
	export default {
		data: () => ({
			content: '',
			productRate: 2,
			dialogVisible: false,
			dialogImageUrl: '',
			picPostData: {},
			checked:true,
			orderInfo:null,
			orderPrice:{},
			orderList:[],  //产品列表
			commentInfo:{
				order_id:'',
				type:'2',
				content:[],
				score:0,
			},
			selectItem:{},  //选中添加图片的选项
			defaultComment:"东西不错，好评！",
		}),

		components: {},

		created(){
			console.log('storage-----------',storage.get('orderDetail'));
			this.orderInfo=storage.get('orderDetail');
			if(this.orderInfo.has_studio==1){
				this.orderPrice=this.orderInfo.studio_order;
				let obj={
					type:'1',
					id:this.orderPrice.studio_id,
					price:this.orderPrice.price,
					showPic:this.orderPrice.studio_detail.pic.split(',')[0],
					name:this.orderPrice.studio_detail.name,
					score:0,
					content:'',
					pic:[],
				}
				this.orderList.push(obj);
			}else{
				this.orderPrice.equip_order_array=this.orderInfo.equip_order;
			}
			this.orderPrice.equip_order_array.forEach((item,index)=>{
				console.log('orderPrice.equip------------',item);
				let obj={
					type:'2',
					id:item.equip_id,
					price:item.price,
					showPic:item.equip.pic.split(',')[0],
					name:item.equip.static.name,
					score:0,
					content:'',
					pic:[],
				}
				this.orderList.push(obj);
			})
			console.log('this.orderPrice---',this.orderPrice);
			console.log(this.orderInfo,'pppppppppppppppppppppp');
		},

		mounted() {},

		methods: {
			checkImgNum(item){
				this.selectItem=item;
				if(item.pic.length>=5){
					this.$message.warning('已经达到最大图片数量！');
				}
			},
			//图片上传之前方法
			beforeUpload(file) {
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = checkPic(file, 1, 2);
							if(!picKey) return;
							let token = await this.getRequest(
								"/qiniu/userGetQiniuUpToken?key=" + picKey
							);
							this.picPostData = token;
							resolve(true);
						} catch(error) {
							reject(false);
						}
					};
					Sync();
				});
			},
			//图片添加方法
			addImg(url){
				this.selectItem.pic.push(url);
			},
			//删除图片方法
			delImg(url){
				let delUrl=this.util.qiniuAddress+url;
				this.imgList.forEach((item,index)=>{
					if(item.url==delUrl){
						this.imgList.splice(index,1);
					}
				})
				console.log('del-----',this.imgList);
			},
			//图片上传成功方法
			handleSuccess(response, file) {
				//添加图片到imgList数组
				this.addImg(response.key);
			},
			// 图片预览
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//图片删除之前方法
			handleRemove(file) {
				this.delImg(file.response.key);
			},
			//提交评论方法
			submit(){
				this.commentInfo.content=[];
				console.log('this.orderList------',this.orderList);
				this.commentInfo.order_id=this.orderInfo.id;
				if(this.commentInfo.score==0){
					this.commentInfo.score=5;
				}
				let list=this.util.deepcopy(this.orderList);
				list.forEach((item,index)=>{
					item.pic=item.pic.join();
					if(item.score==0){
						item.score=5;
					}
					if(!item.content){
						item.content=this.defaultComment;
					}
					this.commentInfo.content.push(item);
				})
				console.log('this.commentInfo.content-------',this.commentInfo.content);
				this.commentInfo.content=JSON.stringify(this.commentInfo.content);
				console.log('this.commentInfo------',this.commentInfo);
				this.util.addComment(this.commentInfo).then(res=>{
					this.$message.success("评论成功！");
					setTimeout(()=>{
						this.$router.push({path:'/personal/order/myOrder'});
					},1000);
				})
				
			}
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	.container {
		width: 1200px;
	}
	
	/deep/ {
		.el-upload--picture-card {
			width: 72px;
			height: 65px;
			display:flex;
			justify-content:center;
			align-items:center;
			border: none;
		    background: #eee;
		    border-radius: 0px;
		}
		.el-upload-list--picture-card .el-upload-list__item{
			width:65px;
			height:65px;
			margin-bottom:0px;
		}
	}


	.main {
		.head{
			height: 60px;
			line-height: 60px;
			padding-left: 20px;
			box-sizing: border-box;
			background: #fff;
			margin-bottom: 30px;
		}
		.evaluate-wrap{
			background: #fff;
			padding: 52px 50px;
			box-sizing: border-box;
			/deep/{
				.el-icon-star-on{
					color: #EA001F!important;
				}
			}
			.studio{
				padding-bottom: 30px;
				box-sizing: border-box;
				border-bottom:2px dashed rgb(217,217,217);
				margin-bottom: 34px;
			}
			.evaluate-content{
				.studio-evaluate,.equip-evaluate{
					padding-left: 38px;
					padding-bottom: 30px;
					box-sizing: border-box;
					border-bottom:2px dashed rgb(217,217,217);
					margin-bottom: 34px;
					li{
						display:flex;
						padding-bottom:30px;
						margin-bottom:20px;
						&:last-child{
							margin-bottom:0px;
							border-bottom:none;
							padding-bottom:0px;
						}
						.leftInfo{
							display:flex;
							flex-direction:column;
							justify-content:flex-start;
							margin-right: 89px;
							width: 240px;
							img{
								width: 100%;
								height: 240px;
								margin-bottom: 20px;
							}
							p{
								font-size:20px;
								margin-bottom: 14px;
							}
							.price-style{
								display: flex;
								span{
									font-size:16px;
									color:#F93737;
									align-self: flex-end;
								}
								.style{
									margin-left: 32px;
									display: block;
									width:50px;
									text-align: center;
									height:24px;
									line-height: 24px;
									border:1px solid rgb(101,31,255);
									border-radius:10px 0px 10px 0px;
									color: #7C6AFF;
								}
							}
						}
						.rightInfo{
							flex: 1;
							.rate,.dec,.pictures{
								display: flex;
								align-items: center;
								span:first-child{
									font-size: 16px;
									color: #333;
									display: block;
									width: 90px;
								}
							}
							.rate{
								height: 38px;
								margin-bottom: 50px;
							}
							.dec{
								height: 120px;
								margin-bottom: 42px;
								span{
									align-self: flex-start;
								}
								.el-textarea{
									padding: 0;
									box-sizing: border-box;
									flex: 1;
									/deep/ .el-textarea__inner{
										height: 120px!important;
									}				
								}
							}
							.pictures{
								width:100%;
								/deep/ .el-upload--picture-card{
									width:72px;
									height:72px;
								}
								.picNum{
									margin-left: 19px;
									font-size:16px;
								}
							}
						}
					}
					
				}
				
			}			
			.rowBar{
				height:51px;
				line-height:51px;
				margin-bottom:79px;
				display:flex;
			}
			.shopService{
				padding-left:38px;
				border-style: none;
				div:first-child{
					width: 181px;
					height: 51px;
					line-height: 51px;
					text-align: center;
					background:rgb(250,250,250);
					border:1px solid rgb(217,217,217);
					margin-right: 113px;
					font-size: 20px;
					font-weight: bold;
					color: #666;
				}
				.top{
					margin-bottom:0px;
					span{
						margin-right: 55px;
					}
				}
			}
			.assess{
				margin-bottom: 0;
				.btn{
					margin: 0 auto;
					font-size:16px;
					width: 120px;
					height: 40px;
					line-height: 40px;
					text-align:center;
					background:#7C6AFF;
					color:#fff;
				}
			}
		}
		
	}
	/deep/ {
		.el-rate {
			height: auto;
		}
		.el-rate__icon {
			font-size: 31px;
		}
		.el-checkbox__label{
			font-size:16px;
		}
	}
	.top {
			display: flex;
			align-items: center;
			font-size: 16px;
			margin-bottom: 20px;
		}
</style>
