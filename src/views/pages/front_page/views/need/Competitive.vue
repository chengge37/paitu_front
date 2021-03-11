<template>
	<div class="wrap">
		<div class="head">
			<div class="bread">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/demand/index">任务</el-breadcrumb-item>
					<el-breadcrumb-item>{{title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>

		<div class="info-progress">

			<!--详情模块-->
			<demand-detail :id="form.bidding_id" @getInfo='getInfo' style="margin-bottom:10px;"></demand-detail>

			<div class="progress">
				<div class="title">发布流程</div>
				<el-steps direction="vertical" :active="4" :space="90">
					<el-step title="提交项目基本资料"></el-step>
					<el-step title="支付保证金"></el-step>
					<el-step title="等待审核"></el-step>
					<el-step title="发布成功"></el-step>
				</el-steps>
			</div>
		</div>

		<!--没有登录显示的模块-->
		<div class="noLogin" v-if="!isLogin">
			<p>请登录后才能投标或查看投标情况</p>
			<el-button type="primary" class="defautl-hover" @click="login">登录</el-button>
		</div>
		
		<!--不是摄影师显示的模块-->
		<div class="noLogin" v-if="!isPublisher && isLogin && !isPhoto">
			<p>只有摄影师身份才能投标</p>
			<el-button type="primary" class="defautl-hover" @click="toApply">申请入驻</el-button>
		</div>
		
		<!--没有交费显示的模块-->
		<div class="noLogin" v-if="!isPublisher && isLogin && isPhoto && !hasPayFee">
			<p>需要交费后才能投标</p>
			<el-button type="primary" class="defautl-hover" @click="payFee">交费</el-button>
		</div>

		<!--投标模块-->
		<div class="bidding" v-if="!isPublisher && isLogin && isPhoto && hasPayFee && !hasBidding">
			<div class="price-time">
				<div class="title">报价和周期</div>
				<div class="input-row">
					<div class="input-item">
						<span>我的报价</span>
						<div>
							<input type="text" v-model="form.price">
							<span>元</span>
						</div>
					</div>
					<div class="input-item">
						<span>我的预计周期</span>
						<div>
							<input type="text" v-model="form.time">
							<span>天</span>
						</div>
					</div>
				</div>
			</div>

			<div class="collection">
				<div class="title">您的作品集</div>
				<el-upload action="https://up-z2.qiniup.com/" list-type="picture-card" :limit="5" :data="picPostData" :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>

			<div class="leave-msg">
				<div class="title">留言区</div>
				<tinymce v-model="form.content" :height="300" />
			</div>

			<div class="bottom-btn default-hover" @click="confirmCompetitive">确定投标</div>
		</div>

		<!--显示服务商列表模块-->
		<submit-list :demandId="form.bidding_id" :hasBidding="hasBidding" :list="submitData" v-if="isPublisher || (isLogin && isPhoto && hasPayFee && hasBidding)"></submit-list>
		
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>

		<!--支付年费弹窗模块-->
		<pay-bidding-fee  :openPay.sync="showPayFee" @closed="closePay" v-if="biddingOrderId" :orderId="biddingOrderId"></pay-bidding-fee>

	</div>
</template>

<script>
	import Tinymce from "ServeComponents/Tinymce"
	import { checkPic } from "@util/picUtil.js"
	import { bidding } from '@config/api.js'
	// import JoinInfo from '@front/components/joinInfo.vue'
	import demandDetail from 'FrontComponents/demandDetail'
	import submitList from 'FrontComponents/submitList'
	import miniLogin from "FrontComponents/minilogin";
	import payBiddingFee from "FrontComponents/payBiddingFee";
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				isFold: true,
				leaveMsg: '',
				dialogImageUrl: '',
				dialogVisible: false,
				listObj: {},
				fileList: [],
				picPostData: {},
				form: {
					bidding_id: '',
					time: '',
					price: '',
					content: '',
					extend: ''
				},
				uploadArr: [],
				title: '', //标题名称
				showSubmitList: false,
				submitData: [], //投标列表
				isLogin:false, //是否已经登录
				isShowDialog:false, //显示登录弹窗
				hasBidding:false, //是否已经投过标
				isPhoto:false, //是否为摄影师
				hasPayFee:false, //是否已经交年费
				isPublisher:false, //是否为发布者
				showPayFee:false, //是否支付年费
				biddingOrderId:'', //年费卡订单id
			}
		},
		components: {
			Tinymce,
			demandDetail,
			submitList,
			miniLogin,
			payBiddingFee
			// JoinInfo
		},
		created() {
			this.form.bidding_id = this.$route.query.id
			localStorage.setItem('bidding_id', this.form.bidding_id)
			this.form.bidding_id = localStorage.getItem('bidding_id');
			this.checkStatus();
			if(this.isLogin){
				this.getSubmitList();
			}
		},
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			closePay(){
				this.showPayFee=false;
			},
			//跳转到申请入驻页面
			toApply(){
				let url="/sign/firstCategory";
				this.$router.push({path: url});
			},
			//支付年费弹窗
			payFee(){
				//下单，并弹出支付窗口
				let params={
					type:'1',
					price:'99'
				}
				this.util.addBiddingOrder(params).then(res=>{
					console.log('addBiddingOrder----',res);
					this.biddingOrderId=res.id;
					this.showPayFee=true;
				})
				
			},
			//检测身份，交费情况
			checkStatus(){
				if(!this.util.userIsLogin()){
//					this.isShowDialog=true;
					return;
				}else{
					this.isLogin=true;
					//判断是否为摄影师
					if(this.user_data.role & 8){
						this.isPhoto=true;
						//判断是否已经交年费，如果没有，弹出交费弹窗
						this.util.userBiddingCard(this.user_data.id).then(res=>{
							console.error('userBiddingCard-------------',this.hasPayFee);
							this.hasPayFee=res;
						})
						
					}
				}
			},
			closeLogin(){
				this.isShowDialog=false;
			},
			//登录方法
			login(){
				this.isShowDialog=true;
			},
			//根据任务id获取投标列表
			getSubmitList() {
				let params = {
					bidding_id: this.form.bidding_id
				}
				this.util.getSubmitList(params).then(res => {
					console.log('getSubmitList------', res);
					this.submitData = res.rows;
					//判断是否已经投过标
					if(this.util.userIsLogin()) {
						let biddingUsers = [];
						res.rows.forEach((item, index) => {
							biddingUsers.push(item.to_uid);
						})
						if(biddingUsers.includes(this.user_data.id)) {
							//已经投过标
							console.error("已经投过标+++++++++++", this.submitData);
							this.showSubmitList = true;
							this.hasBidding=true;
						}
					}

				})
			},
			//获取到详情标题回调方法
			getInfo(item) {
				this.title = item.name;
				this.demandUid = item.uid;
				//判断当前用户是否为发布者
				if(this.isLogin && (this.user_data.id == this.demandUid)) {
					console.error("发布者+++++++++++");
//					this.showSubmitList = true;
						this.isPublisher=true;
				}
			},

			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},

			handleSuccess(response, file) {
				this.uploadArr.push(response.key)
				const uid = file.uid;
				const objKeyArr = Object.keys(this.listObj);
				for(let i = 0, len = objKeyArr.length; i < len; i++) {
					if(this.listObj[objKeyArr[i]].uid === uid) {
						this.listObj[objKeyArr[i]].url = this.config.qiniuHost + response.key;
						this.listObj[objKeyArr[i]].hasSuccess = true;
						return;
					}
				}
			},

			handleRemove(file) {
				console.log(file, '删除的文件')
				this.uploadArr = this.uploadArr.filter(item => {
					return item != file.response.key
				})
				const uid = file.uid;
				const objKeyArr = Object.keys(this.listObj);
				for(let i = 0, len = objKeyArr.length; i < len; i++) {
					if(this.listObj[objKeyArr[i]].uid === uid) {
						delete this.listObj[objKeyArr[i]];
						return;
					}
				}
			},

			beforeUpload(file) {
				console.log('上传之前')
				const _self = this;
				const _URL = window.URL || window.webkitURL;
				const fileName = file.uid;
				this.listObj[fileName] = {};
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = await checkPic(file, this.fileList.length, 1);
							if(picKey) {
								let token = await this.getRequest(
									"/qiniu/userGetQiniuUpToken?key=" + picKey
								);
								console.warn("picKey---", picKey, token);
								this.picPostData = token;
								const img = new Image();
								img.src = _URL.createObjectURL(file);
								img.onload = function() {
									_self.listObj[fileName] = {
										hasSuccess: false,
										uid: file.uid,
										width: this.width,
										height: this.height
									};
								};
								resolve(true);
							} else {
								reject(false);
								this.listObj = {};
							}
						} catch(error) {
							reject(false);
						}
					};
					Sync();
				});
			},

			confirmCompetitive() {
				this.form.extend = this.uploadArr.join()
				console.log(this.form, '要提交的表单')
				console.log(this.fileList, '图片')
				this.postRequest(bidding.joinTask, this.form).then(res => {
					console.log(res, '参与竞标接口返回')
					//        this.$message.success('投标成功');
					this.util.demandSuccess(2);
					// 跳转其他页面
				}).catch(err => {
					console.error(err)
					this.$message.error('投标失败' + error)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		color: #333;
		.info-progress {
			display: flex;
			justify-content: space-between;
			// height: 100vh;
			height: 100%;
			margin-bottom: 10px;
			.info {
				width: 878px;
				min-height: 548px;
				background: #fff;
				padding: 20px 26px;
				.name-resttime {
					display: flex;
					align-items: center;
					margin-bottom: 14px;
					span:first-child {
						font-size: 18px;
						font-weight: 600;
						margin-right: 14px;
					}
					span:last-child {
						width: 126px;
						height: 25px;
						border: 1px solid #651fff;
						color: #651fff;
						display: flex;
						justify-content: center;
						align-items: center;
						cursor: pointer;
					}
				}
				.demander-time {
					font-weight: 600;
					margin-bottom: 22px;
					span:nth-child(2) {
						color: #651fff;
						margin-right: 40px;
					}
				}
				.item-about {
					height: 114px;
					border-top: 1px solid #EBEBEB;
					border-bottom: 1px solid #EBEBEB;
					display: flex;
					align-items: center;
					.item {
						display: flex;
						flex-direction: column;
						flex: 1;
						span:first-child {
							color: #666;
							margin-bottom: 14px;
						}
						span:nth-child(2) {
							font-size: 24px;
							font-weight: 600;
						}
					}
				}
				.item-dec {
					min-height: 184px;
					border-bottom: 1px solid #EBEBEB;
					padding: 10px 0;
					display: flex;
					flex-direction: column;
					&>div:first-child {
						color: #666;
						margin-bottom: 20px;
					}
					.fold-btn {
						font-weight: 600;
						cursor: pointer;
						margin-top: 30px;
						align-self: center;
						color: #651fff;
					}
				}
				.fold {
					height: 184px;
					overflow: hidden;
					box-shadow: 0px -15px 30px #eee inset;
					position: relative;
					// box-shadow: 0 35px 5px -3px orange inset;
					.fold-btn {
						position: absolute;
						bottom: 45px;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				.skill-label {
					height: 78px;
					line-height: 78px;
					border-bottom: 1px solid #EBEBEB;
					font-size: 11px;
					display: flex;
					align-items: center;
					.skill-item {
						width: 55px;
						height: 24px;
						background: rgba(255, 255, 255, 1);
						border-radius: 2px;
						border: 1px solid rgba(101, 31, 255, 1);
						display: flex;
						justify-content: center;
						align-items: center;
						color: #651fff;
						margin-right: 8px;
					}
				}
				.number-end {
					margin-top: 25px;
					span:nth-child(odd) {
						color: #666;
					}
					span:nth-child(2) {
						font-weight: 600;
						color: #651fff;
						margin-right: 46px;
					}
					span:nth-child(4) {
						font-weight: 600;
					}
				}
			}
			.progress {
				width: 313px;
				background: #fff;
				padding: 15px 20px;
				.title {
					font-size: 18px;
					font-weight: 600;
					margin-bottom: 32px;
				}
				.el-steps {
					.el-step {
						/deep/ {
							.el-step__icon {
								width: 16px;
								height: 16px;
								background: #651fff;
								border: none;
								color: #651fff;
							}
						}
					}
					/deep/ {
						.el-step__line {
							background-color: #651fff;
							left: 7px;
						}
						.is-finish {
							color: #333;
							border-color: #651fff;
						}
					}
				}
			}
		}
		.price-time {
			height: 174px;
			background: #fff;
			padding: 17px 20px;
			display: flex;
			flex-direction: column;
			margin-bottom: 10px;
			.title {
				font-size: 18px;
				font-weight: 600;
				margin-bottom: auto;
			}
			.input-row {
				display: flex;
				.input-item {
					display: flex;
					flex-direction: column;
					margin-right: 240px;
					&>span {
						color: #666;
						margin-bottom: 14px;
					}
					&>div {
						input {
							width: 240px;
							height: 44px;
							border: 1px solid #D0D0D0;
							margin-right: 16px;
							text-indent: 20px;
							&:focus {
								outline: none;
							}
						}
						span {
							font-weight: 600;
						}
					}
				}
			}
		}
		.collection {
			height: 270px;
			background: #fff;
			padding: 29px 20px;
			margin-bottom: 10px;
			.title {
				font-size: 18px;
				font-weight: 600;
				margin-bottom: 29px;
			}
		}
		.leave-msg {
			min-width: 411px;
			background: #fff;
			padding: 26px 20px 14px;
			margin-bottom: 30px;
			.title {
				font-size: 18px;
				font-weight: 600;
				margin-bottom: 22px;
			}
		}
		.bottom-btn {
			margin: 0 auto;
			width: 123px;
			height: 40px;
			background: #651fff;
			font-weight: 600;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			margin-bottom: 80px;
		}
	}
	.noLogin{
		text-align:center;
		p{
			margin-bottom:15px;
		}
	}
</style>