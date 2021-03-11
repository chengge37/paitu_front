<template>
	<div>
		<ul class="list">
			<li class="cursor" v-for="(item,index) in myList" :key="index" @click="toAddDemand(item)">
				<div class="left">
					<span class="status">{{item.showStatus}}</span>
					<span class="type">{{item.showType}}</span>
				</div>
				<div class="right">
					<div class="content">
						<span class="title">{{item.name}}</span>
						<div class="info">
							<p>
								<span>预算：</span>
								<span class='fontColor'>{{item.price}}</span>
							</p>
							<p>
								剩余<span class="fontColor">{{item.limit_num-item.bidding_task_num}}</span>个名额
							</p>
							<p>
								<span>发布时间：</span>
								<span>{{item.create_time | time2FullDate}}</span>
							</p>
							<!--<span>发布时间：{{item.createTime | time2FullDate}}</span>-->
							<!--<span>周期：{{item.period}}天</span>-->
						</div>
						<div class="other">
							<span class="area">{{item.showCity || '无'}}</span>
							<div class="skills">
								<p>技能标签</p>
								<span v-for="item2 in item.skillList">{{item2}}</span>
							</div>
						</div>
					</div>
					<div class="operate">
						<!--<p class="count">{{item.joinNum}}人参与 · 剩余2个名额</p>-->
						<div class="btns">
							<!--<button class="default-hover">收藏</button>-->
							<button class="default-hover primary" @click="toAddDemand(item)">我要投标</button>
							<!--<el-button type="primary">查看详情</el-button>-->
						</div>
						<!--<span>12分钟前发布</span>-->
					</div>
				</div>
			</li>
		</ul>
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
				test:true,
			};
		},
		components:{
			miniLogin,
		},
		watch:{
			list(to,from){
				this.myList=to;
				this.changeData();
			},
		},
		created(){
			this.changeData();
			console.log('this.myList--------------',this.myList);
		},
		mounted() {
			
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
			//获取相关状态和项目类型
			changeData(){
				this.myList.forEach((item,index)=>{
					item.showStatus=this.config.projectStatusList[Number(item.status)+1].name;
					item.showType=this.config.projectList[Number(item.type)].name;
					
				})
				this.myList.forEach((item,index)=>{
					item.skillList=[];
					let list=item.skill.split(',');
					list.forEach((item2,index2)=>{
						this.config.biddingSkillType.forEach((item3,index3)=>{
							if(item2==item3.id){
								item.skillList.push(item3.name);
							}
						})
					})
				})
				
				let allCity=this.util.deepcopy(this.config.allCityCode);
				this.myList.forEach((item,index)=>{
					if(item.city_code==0){
						item.showCity='全国';
					}else{
						allCity.forEach((item2,index2)=>{
							if(item.city_code==item2.code){
								item.showCity=item2.city;
							}
						})
					}
					
				})
				
			},
			//参加竞标（需求）方法
			toAddDemand(item){
				console.log("toAddDemand------item---------",item);
				//跳到详情
//				this.util.toDemandDetail(item.id);
				this.util.toCompetitive(item.id);
//				console.log('join-------',item);
//				if(!this.util.userIsLogin()){
//					this.util.showWarn('你还没有登录！');
//					this.isShowDialog=true;
//					return;
//				}else{
//					//判断是否为摄影师
//					if(this.user_data.role & 8){
//						//判断是否已经交年费，如果没有，弹出交费弹窗
//						this.util.showSuccess('可以参加！');
//					}else{
//						this.util.showWarn('你还不是摄影师身份，无法参加！');
//					}
//				}
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
	.list{
		li{
			display:flex;
			padding:25px 34px 25px 0px;
			border-bottom:1px solid #F0F0F0;
			.left{
				display:flex;
				flex-direction:column;
				color:$Theme-color;
				width:17%;
				align-items:center;
				padding-top:20px;
				border-right:1px solid #F0F0F0;
				.status{
					color:#FF6900;
				}
				.type{
					color:#333333;
					margin-top:8px;
				}
			}
			.right{
				display:flex;
				padding-left:34px;
				justify-content: space-between;
				flex:1;
				align-items:center;
				.content{
					.title{
						font-size:18px;
					}
					.info{
						margin:15px 0px;
						display:flex;
						align-items:center;
						p{
							margin-right:35px;
						}
					}
					.other{
						display:flex;
						align-items:center;
						.area{
							margin-right:32px;
						}
						.skills{
							display:flex;
							align-items:center;
							p{
								margin-right:8px;
							}
							span{
								color:$Theme-color;
								border:1px solid $Theme-color;
								border-radius:2px;
								margin-right:8px;
								padding:3px;
							}
						}
						
					}
				}
				.fontColor{
					color:$Theme-color;
				}
				.operate{
					text-align: right;
					.btns{
						margin:15px 0px;
						button{
							color:#999999;
							padding:4px 10px;
							background:transparent;
							border:1px solid #E0E0E0;
							cursor: pointer;
						}
						.primary{
							color: $Theme-color;
						    padding: 4px 10px;
						    border: 1px solid $Theme-color;
						}
					}
				}
				
			}
		}
	}
</style>