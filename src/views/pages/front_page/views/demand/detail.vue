<template>
	<div class="main_content">
		<div class="head">
			<div class="bread">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/demand/index">任务</el-breadcrumb-item>
					<el-breadcrumb-item>{{title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		
		
		<!--测试代码-->	
		<!--<el-button type="primary" @click="bidding">我要投标</el-button>-->
		
		<div class="body">
			<div class="left">
				<!--详情模块-->
				<demand-detail :id="demandId" @getInfo='getInfo' style="margin-bottom:10px;"></demand-detail>
				<div class="list" v-if="showSubmitList">
					<p>投标列表</p>
					<ul class="submitList">
						<li v-for="(item,index) in submitList" :key="index">
							<div class="user">
								<span>{{item.name}}</span>
								<div class='userImg'>
									<el-image src="https://pic.paitume.com/574/1589858775481.jpg" style="width:96px;height:96px;" :onerror="util.errorPic" />
								</div>
							</div>
							<div class="detail">
								<div class="top">
									<span>{{item.createTime | time2FullDate}}</span>
									<div class="skills">
										<p>技能标签：</p>
										<span>延时摄影</span>
										<span>电商摄影</span>
									</div>
								</div>
								<div class="content">
									<div class="priceAndperiod">
										<div>
											<span>他的报价：</span>
											<span>{{item.baojia}}元</span>
										</div>
										<div>
											<span>他的周期：</span>
											<span>6天</span>
										</div>
									</div>
									<div class="info">
										{{item.info}}
									</div>
								</div>
								<div class="images">
									<div class='imageItem'>
										<el-image :key="index2" v-for="(subItem,index2) in item.pic" @click="openView(item,index2)" :src="'https://pic.paitume.com/'+subItem" style="width:96px;height:96px;" :onerror="util.errorPic" />
										<!--<el-image @click="openView(item)" src="https://pic.paitume.com/574/1589858775481.jpg" style="width:96px;height:96px;" :onerror="util.errorPic" />-->
									</div>
								</div>
								<div class="otherBtns">
									<span class="default-hover">选TA为我服务</span>
									<span class="default-hover">淘汰TA</span>
									<span class="default-hover">在线咨询</span>
								</div>
							</div>
						</li>
	
					</ul>
				</div>
			</div>

			<div class="right">
				<div class="warn">
					<p>警告</p>
				</div>
				<div class="warnInof">
					为了保障双方权益，请不要线下交易
				</div>
			</div>
		</div>

		<!--预览大图模块-->
		<preview-img :isShow="isAllView" :detailImgList="imageList" :imageIndex='imgIndex' :imgListShow="imgListShow" @closeViewPic="closeViewPic"></preview-img>

		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>

	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import recommendGood from "FrontComponents/recommendGood";
	import pagination from "FrontComponents/pagination";
	import find from "FrontComponents/find";
	import miniLogin from "FrontComponents/minilogin";
	import previewImg from 'FrontComponents/previewImg';
	import demandDetail from 'FrontComponents/demandDetail'
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				submitList: [
					{
						id: 1,
						name: '派图租赁工作室',
						createTime: 1588902864,
						skills: '1,2',
						baojia: '1200',
						pic: ['574/1589858775481.jpg','574/1589858775481.jpg'],
						picUrl: '574/1589858775481.jpg,574/1589858775481.jpg',
						info: '项目已经上线，需要完善功能逻辑设计 工作负责，认真完成工作量'
					},
					{
						id: 1,
						name: '派图租赁工作室',
						createTime: 1588902864,
						skills: '1,2',
						baojia: '1200',
						pic: ['574/1589858775481.jpg','574/1589858775481.jpg'],
						picUrl: '574/1589858775481.jpg,574/1589858775481.jpg',
						info: '项目已经上线，需要完善功能逻辑设计 工作负责，认真完成工作量'
					},
				], //投标列表
				showContact: false,
				isShowDialog: false,
				isAllView: false,
				imgListShow: true,
				imageList: [],
				imgIndex:0, //打开图片的下标
				demandId:'', //需求详情id
				title:'',  //详情标题
				demandUid:'', //详情发布者id
				showSubmitList:false, //是否显示投标列表
			};
		},
		components: {
			frontSearchbox,
			recommendGood,
			find,
			miniLogin,
			pagination,
			previewImg,
			demandDetail
		},
		created() {
			let query=this.$route.query;
			if(!this.util.isEmpty(query)){
				this.demandId=query.id;
				//获取投标列表
				this.getSubmitList();
			}
		},
		watch: {

		},
		mounted() {},
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//测试代码，我要投标方法
			bidding(){
				console.log('bidding-------');
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
			//根据任务id获取投标列表
			getSubmitList(){
				let params={
					bidding_id:this.demandId
				}
				this.util.getSubmitList(params).then(res=>{
					console.log('getSubmitList------',res);
					//判断是否已经投过标
					if(this.util.userIsLogin()){
						let biddingUsers=[];
						res.rows.forEach((item,index)=>{
							biddingUsers.push(item.to_uid);
						})
						if(biddingUsers.includes(this.user_data.id)){
							//已经投过标
							this.showSubmitList=true;
						}
					}
					this.submitList=res.rows;
				})
			},
			//获取到详情标题回调方法
			getInfo(item){
				this.title=item.name;
				this.demandUid=item.uid;
				//判断当前用户是否为发布者
				if(this.user_data.id==this.demandUid){
					this.showSubmitList=true;
				}
			},
			//获取详情ui
			closeLogin() {

			},
			// 打开看图
			openView(item,index) {
				console.log('openView-----', item);
				this.isAllView = true
				this.imgListShow = true
				this.imgIndex=index;
				document.getElementsByTagName("body")[0].className = "bodyall";
				document.querySelector('body').setAttribute('style', 'overflow:hidden')
				this.imageList = item.picUrl.split(',');
				this.imageList.filter((item, index) => {
					if(!item) {
						this.detailImgs.splice(index, 1)
					}
				})
			},
			// 关闭看图
			closeViewPic(val) {
				this.isAllView = val;
				document.querySelector('body').setAttribute('style', 'overflow-y:scroll')
			},
			// 显示隐藏小图列表
			showImgList() {
				this.imgListShow = !this.imgListShow
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@front/common/common.scss";
	.body {
		display: flex;
	}
	
	.left {
		flex: 1;
		.list{
			background:#fff;
			padding:16px 30px;
			&>p {
				margin-bottom: 25px;
				font-weight: 600;
			}
		}
		
		.submitList {
			li {
				display: flex;
				justify-content: space-between;
				margin-bottom: 28px;
				.user {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 25px;
					.userImg {
						margin-top: 10px;
					}
				}
				.detail {
					flex: 1;
					.top {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 12px;
						.skills {
							display: flex;
							align-items: center;
							span {
								color: $Theme-color;
								display: inline-block;
								padding: 2px 4px;
								border: 1px solid $Theme-color;
								margin-right: 8px;
								&:last-child {
									margin-right: 0px;
								}
							}
						}
					}
					.content {
						background: #FAFAFA;
						padding: 20px 15px;
						margin-bottom: 10px;
						.priceAndperiod {
							display: flex;
							align-items: center;
							padding-bottom: 15px;
							border-bottom: 1px solid #BABABA;
							margin-bottom: 15px;
							&>div {
								margin-right: 35px;
								span:last-child {
									font-weight: 600;
								}
							}
						}
					}
					.imageItem {
						.el-image {
							cursor: pointer;
							margin-right:5px;
						}
					}
					.otherBtns {
						margin-top: 25px;
						padding-bottom: 15px;
						border-bottom: 1px solid #D8D8D8;
						cursor: pointer;
						span {
							padding: 6px 25px;
							border: 1px solid #979797;
							border-radius: 4px;
							margin-right: 12px;
							&:first-child {
								color: #fff;
								background: $Theme-color;
								border-color: $Theme-color;
							}
							&:nth-child(2) {
								color: $Theme-color;
								border-color: $Theme-color;
							}
						}
					}
				}
			}
		}
	}
	
	.right {
		width: 315px;
		color: #FF641F;
		background: #fff;
		margin-left: 10px;
		height: 200px;
		padding: 20px;
		flex: none;
		font-weight: 600;
		.warn {
			p {
				font-size: 24px;
				margin-bottom: 20px;
			}
		}
	}
	
	/deep/ {
		.el-breadcrumb {
			padding: 0px;
			border: none;
		}
	}
</style>