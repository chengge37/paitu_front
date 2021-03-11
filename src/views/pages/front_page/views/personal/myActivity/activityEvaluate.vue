<template>
	<div>
		<div class="main">
			<div class="head">
				评价活动
			</div>
			<div class="evaluate-wrap">
				<div class='evaluate-content'>
					<!-- 活动评价 -->
					<ul class="studio-evaluate">
						<li>
							<div class="leftInfo">
								<img :src="$qiniuHost+orderItem.activity.info|picDeal" alt="" width="148" height="112"/>
								<p>{{orderItem.activity.name}}</p>
								<div class="price-style">
									<span>￥{{orderItem.price}}</span>
									<span class="style">活动</span>
								</div>
							</div>
							<!-- <div class="rightInfo">
								<div class="rate">
									<span>评分</span>
									<el-rate v-model="item.productRate" show-text></el-rate>
								</div>
								<div class="dec">
									<span>描述</span>
									<el-input type="textarea" placeholder="请添加文字描述" v-model="item.content">
									</el-input>
								</div>
								<div class="pictures">
									<span>晒图</span>
									<div class="imgList" @click.stop="checkImgNum">
										<el-upload :limit="5" :disabled="item.imgList.length>=5" :multiple="true" :show-file-list="true" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" :data="picPostData" action="https://up-z2.qiniup.com/" list-type="picture-card" :on-preview="handlePictureCardPreview">
											<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog :visible.sync="dialogVisible">
											<img width="100%" class="el-img" :src="dialogImageUrl" alt>
										</el-dialog>
									</div>
									<div class="picNum">{{item.imgList.length}}/5</div>
								</div>
							</div> -->
						</li>
					</ul>
				</div>
				
				<!--评价-->
				<div class="bottom-Info">
					<div class="rate">
						<span>评分</span>
						<el-rate v-model="form.score" show-text></el-rate>
					</div>
					<div class="dec">
						<span>描述</span>
						<el-input type="textarea" placeholder="请添加文字描述" v-model="form.content">
						</el-input>
					</div>
					<div class="pictures">
						<span>晒图</span>
						<div class="imgList">
							<el-upload :limit="5" :disabled="imgList.length==5" :multiple="true" :show-file-list="true" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" :data="picPostData" action="https://up-z2.qiniup.com/" list-type="picture-card" :on-preview="handlePictureCardPreview">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" class="el-img" :src="dialogImageUrl" alt>
							</el-dialog>
						</div>
						<div class="picNum">{{imgList.length}}/5</div>
					</div>
				</div>
				<!-- <div class="shopService rowBar">
					<div>店铺评分</div>
					<div class="top">
						<span>店铺服务</span>
						<el-rate v-model="productRate" show-text></el-rate>
					</div>
				</div> -->
				
				<!--底部评价-->
				<div class="assess rowBar">
					<!-- <el-checkbox v-model="checked">匿名评价</el-checkbox> -->
					<div class="btn cursor" @click="submitEvaluate">提交评价</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {storage} from '@util/storage.js'
	import { checkPic } from "@util/picUtil.js";
	import {frontComment} from "@config/api.js"

	export default {
		data: () => ({
			content: '',
			productRate: 2,
			dialogVisible: false,
			dialogImageUrl: '',
			imgList: [],
			picPostData: {},
			checked:true,
			form:{
				order_id:null,
				type:1,
				content:'',
				score:0,
				pic:[]
			},
			orderItem:null,
			storeRate:1
		}),

    components: {},
    
    created(){
			this.orderItem=storage.get('activityOrder')
    },

		mounted() {
			this.form.order_id=this.orderItem.id
			console.log(this.orderItem,'pppppppppppppppppppppp')
		},

		filters:{
			picDeal(val){
        let sub = val.slice(val.indexOf("src"));
        let sub1 = sub.slice(sub.indexOf('"') + 1);
        let sub2 = sub1.slice(0, sub1.indexOf('"'));
        return sub2;
      }
		},

		methods: {
			checkImgNum(){
				if(this.imgList.length>=4){
					this.$message.warning('已经达到最大图片数量！');
				}
				return
			},
			//图片上传之前方法
			beforeUpload(file) {
				this.checkImgNum()
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = checkPic(file, 1, 2);
							if(!picKey) return;
							let token = await this.getRequest(
								"/qiniu/userGetQiniuUpToken?key=" + picKey
							);
							this.picPostData = token;
							this.form.pic.push(this.picPostData.key)
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
				this.imgList.push({url:this.$qiniuHost+url});
			},
			//删除图片方法
			delImg(url){
				let delUrl=this.config.qiniuHost+url;
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
			// 提交评价
			submitEvaluate(){
				this.form.pic=this.form.pic.join()
				console.log(this.form,'88888888888')
				this.postRequest(frontComment.addComment,this.form).then(res=>{
					console.log(res,'添加评论')
					
				}).catch(err=>{})
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
								// line-height:36px;
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
						
					}
					
				}
				
			}	
			.bottom-Info{
				flex: 1;
				margin-bottom: 80px;
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
					// background: pink;
					margin-bottom: 50px;
				}
				.dec{
					// display: block;
					height: 120px;
					// background: #789988;
					margin-bottom: 42px;
					span{
						align-self: flex-start;
					}
					.el-textarea{
						// height: 100%;
						// background: pink;
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
					// background: brown;
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
			.rowBar{
				height:51px;
				line-height:51px;
				margin-bottom:79px;
				display:flex;
			}
			// .shopService{
			// 	padding-left:38px;
			// 	border-style: none;
			// 	div:first-child{
			// 		width: 181px;
			// 		height: 51px;
			// 		line-height: 51px;
			// 		text-align: center;
			// 		background:rgb(250,250,250);
			// 		border:1px solid rgb(217,217,217);
			// 		margin-right: 113px;
			// 		font-size: 20px;
			// 		font-weight: bold;
			// 		color: #666;
			// 	}
			// 	.top{
			// 		margin-bottom:0px;
			// 		span{
			// 			margin-right: 55px;
			// 		}
			// 	}
			// }
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