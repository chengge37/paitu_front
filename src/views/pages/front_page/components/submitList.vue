<template>
	<div>
		<div class="list">
			<p>投标列表</p>
			<ul class="submitList" v-if="submitList.length>0">
				<li v-for="(item,index) in submitList" :key="index">
					<div class="user">
						<span>{{item.nick}}</span>
						<div class='userImg'>
							<el-image fit="contain" :src="util.picExplode(item.avatar,config.male_pic)" style="width:96px;height:96px;" :onerror="util.errorPic" />
							<!--<el-image fit="contain" :src="$qiniuHost+item.avatar" style="width:96px;height:96px;" :onerror="util.errorPic" />-->
						</div>
					</div>
					<div class="detail">
						<div class="top">
							<span>{{item.create_time | time2FullDate}}</span>
							<!--<div class="skills">
								<p>技能标签：</p>
								<span>延时摄影</span>
								<span>电商摄影</span>
							</div>-->
						</div>
						<div class="content">
							<div class="priceAndperiod">
								<div>
									<span>他的报价：</span>
									<span>{{item.price}}元</span>
								</div>
								<div>
									<span>他的周期：</span>
									<span>{{item.time}}天</span>
								</div>
								
								<div class='winBidding' v-if='item.status>0 && (item.bidding_task_id==item.id)'>
									<div class="title">中标</div>
									<div class="otherLine">
										<p></p>
										<p></p>
										<p></p>
									</div>
								</div>
								<div class='loseBidding' v-if='item.status>0 && (item.bidding_task_id!=item.id)'>
									<div class="title">落选</div>
									<div class="otherLine">
										<p></p>
										<p></p>
										<p></p>
									</div>
								</div>
								
							</div>
							<div class="info" v-html="item.content">
							</div>
						</div>
						<div class="images">
							<div class='imageItem'>
								<el-image :key="index2" v-for="(subItem,index2) in item.pic" @click="openView(item,index2)" :src="$qiniuHost+subItem" style="width:96px;height:96px;" :onerror="util.errorPic" />
							</div>
						</div>
						<div class="otherBtns">
							<span class="default-hover" @click="selectBidding(item.id)">选TA为我服务</span>
							<!--<span class="default-hover">淘汰TA</span>-->
							<span class="default-hover">在线咨询</span>
						</div>
					</div>
				</li>

			</ul>
			
			<div v-else class="noList">
				暂无投标信息！
			</div>
			
		</div>

		<!--预览大图模块-->
		<preview-img :isShow="isAllView" :detailImgList="imageList" :imageIndex='imgIndex' :imgListShow="imgListShow" @closeViewPic="closeViewPic"></preview-img>

		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog"></mini-login>
	</div>
</template>

<script>
	import miniLogin from "FrontComponents/minilogin";
	import previewImg from 'FrontComponents/previewImg';
	import { mapGetters } from "vuex";
	export default {
		props: {
			//任务id
			demandId:{
				type:String,
				default:'',
			},
			//列表
			list:{
				type:Array,
				default:()=>{}
			},
			//是否已经投过标
			hasBidding:{
				type:Boolean,
				default:false,
			}
		},
		data() {
			return {
				submitList: [], //投标列表
				isShowDialog: false,
				isAllView: false,
				imgListShow: true,
				imageList: [],
				imgIndex:0, //打开图片的下标
				title:'',  //详情标题
				demandUid:'', //详情发布者id
				showSubmitList:false, //是否显示投标列表
			}
		},

		components: {miniLogin,previewImg},
		computed: {
			...mapGetters(["user_data"])
		},
		watch:{
			
		},
		created() {
				console.log('demandId------',this.demandId,this.list);
				let promiseAll=[];
				this.list.forEach((item,index)=>{
					item.pic=item.extend.split(',');
					promiseAll.push(this.getUserInfo(item),this.getDemandDetail(item));
				})
				Promise.all(promiseAll).then(val=>{
					//判断是否已经投过标,如果有，只显示自己的投标
					let list=this.util.deepcopy(this.list);
					if(this.hasBidding){
						list=this.list.filter(item=>item.to_uid==this.user_data.id);
					}
					
					this.submitList=list;
					console.log('getSubmitList------',val);
					console.log('submitList------',this.submitList);
				})
		},
		mounted() {

		},
		
		//注入app全局定义的方法(重新刷新页面)
  	inject: ["reloadComponent"],
  
		methods: {
			//根据竞标任务id,获取详情信息
			getDemandDetail(item){
				let params={id:item.bidding_id};
				return new Promise((resolve,reject)=>{
					this.util.getBiddingList(params).then(res=>{
						console.log('getDemandDetail----',res);
						item.bidding_sn=res.bidding_sn;
						item.name=res.name;
						item.is_pay=res.is_pay;
						item.demandPrice=res.price;
						item.status=res.status;
						item.user_nick=res.user_nick;
						item.showStatus=this.config.projectStatusList[parseInt(item.status)].name;
						item.bidding_task_id=res.bidding_task_id;
						resolve(true);
					})
				})
			},
			
			//根据id获取用户信息
			getUserInfo(item){
				let params={uid:item.to_uid};
				return new Promise((resolve,reject)=>{
					this.util.getUserMsg(params).then(res=>{
						console.log('getUserInfo--------',res);
						item.nick=res.nick;
						item.avatar=res.avatar;
						resolve(true);
					})
				})
				
			},
			
			//选标方法
			selectBidding(id){
				let params={
					id:this.demandId,
					bidding_task_id:id
				}
				this.util.confirm(this,'确定选择该服务商吗？').then(res=>{
					if(res){
						this.util.selectBidding(params).then(val=>{
							console.warn('selectBidding----',res);
							this.util.showSuccess('选择成功！');
							//重新刷新组件
              this.reloadComponent();
						})
					}
				})
				
			},
			
			// 打开看图
			openView(item,index) {
				this.isAllView = true
				this.imgListShow = true
				this.imgIndex=index;
				document.getElementsByTagName("body")[0].className = "bodyall";
				document.querySelector('body').setAttribute('style', 'overflow:hidden')
				this.imageList = item.pic;
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
	}
</script>

<style lang="scss" scoped>
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
		
		.winBidding,.loseBidding{
				position:relative;
				color:#FF6900;
				box-sizing:border-box;
				transform:rotate(-15deg);
				display:inline-block;
				right:-20px;
				.title{
					width:60px;
					height:60px;
					border-radius:50%;
					border:1px solid #FF6900;
					background:#fff;
					display:flex;
					align-items:center;
					justify-content:center;
				}
				.otherLine{
					position:absolute;
					top:27px;
					left:-14px;
					z-index:-1;
					display:flex;
					flex-direction:column;
					align-items: center;
					p{
						margin:0px;
						padding:0px;
						margin-bottom:3px;
						width:90px;
						height:2px;
						background:#FF6900;
						&:nth-child(2){
							width:85px;
						}
					}
				}
			}
			.loseBidding{
				color:#BBBBBB;
				.title{
					border:1px solid #BBBBBB;
				}
				.otherLine{
					p{
						background:#BBBBBB;
					}
				}
			}
			.noList{
				display:flex;
				justify-content:center;
				font-size:18px;
				font-weight:600;
			}
</style>