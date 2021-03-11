<template>
	<el-menu class="navbar-header-fixed" mode="horizontal">
		<div class="top-right">
			<div class="hb-bd">
				<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
				<breadcrumb></breadcrumb>
			</div>

			<div class="top-select">
				<!-- 核算单提示模板 -->
				<template v-if="msg">
					<el-popover class="orderTips" placement="bottom" width="370" trigger="click" v-model="showOrderTip">
						<div class="tipInfo" @click="toThere">
							<span>{{msg}}</span>
							<p>
								<span class="red">!</span>
								<span class="platInfo">不处理将违反《平台入驻条例》点击查看条例</span>
							</p>
						</div>
						<i class="el-icon-bell cursor" slot="reference"></i>
					</el-popover>
				</template>


				<!--竞标卡模块-->
				<el-popover placement="top" width="160" v-model="visible">
					<p v-if="!biddingCardInfo">你还没有购买竞标卡。需要现在购买吗?</p>
					<p v-else>你的竞标卡到期时间：{{biddingCardInfo.end_time | time2Date}}</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" v-if="!biddingCardInfo" @click="visible = false">取消</el-button>
						<el-button type="primary" size="mini" v-if="!biddingCardInfo" @click="biddingCard">确定</el-button>
						<el-button type="primary" size="mini" v-if="biddingCardInfo" @click="visible = false">确定</el-button>
					</div>
					<span slot="reference" class="cursor default-hover" style="margin-right:10px;">竞标卡</span>
				</el-popover>

				<div class="go-index">{{time}}</div>
				<div class="select-right cursor">
					<el-dropdown trigger="click">
						<div v-if="user_data">
							<el-image :src="this.$qiniuHost+user_data.avatar" fit="scale-down" class="avatar" v-if="user_data.avatar">
								<div slot="error" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<el-image :src="defaultImg" class="avatar" fit="scale-down" v-else>
								<div slot="error" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="el-dropdown-link word-hover">
								<!--如果有cname字段就是子账号名称，没有即为平台账号名称-->
								{{user_data.cname?user_data.cname:user_data.nick}}
								<i class="el-icon-arrow-down el-icon--right"></i>
							</div>
						</div>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/">
								<el-dropdown-item>返回首页</el-dropdown-item>
							</router-link>
							<el-dropdown-item @click.native="change_user">
								<span>切换账号</span>
							</el-dropdown-item>
							<el-dropdown-item @click.native="LogOut">
								<span>退出登录</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>

			</div>

		</div>
		
		
		<!--竞标卡支付弹窗-->
		<pay-bidding-fee :appendBody="appendBody" :openPay.sync="showPayFee" @closed="closePay" v-if="biddingOrderId" :orderId="biddingOrderId"></pay-bidding-fee>
		
	</el-menu>
</template>

<script>
	import { format } from "date-fns";
	import { mapGetters } from "vuex";
	import Breadcrumb from "ServeComponents/Breadcrumb";
	import Hamburger from "ServeComponents/Hamburger";
	import payBiddingFee from "FrontComponents/payBiddingFee";
	// import errorLogs from "@/views/components/error";
	export default {
		components: {
			Breadcrumb,
			Hamburger,
			payBiddingFee
		},
		data() {
			return {
				showOrderTip: false,
				time: "",
				user: {
					mobile: "",
					pwd: ""
				},
				defaultImg: this.config.male_pic,
				socketDate: {
					type: "",
					num: "",
					is_notice: "0"
				},
				msg: "",
				link: "",
				showPayFee: false, //是否显示竞标卡支付窗口
				visible:false,
				biddingOrderId:'', //生成的竞标卡年卡id
				appendBody:false, //弹窗是否插入在body上
				biddingCardInfo:null, //竞标卡详情信息
			};
		},
		created() {
			if(this.$store.getters.user_data == null) {
				this.$router.push({
					path: "/login",
					query: {
						to: "server"
					}
				});
			}
			
			//获取竞标卡信息
			this.getBiddingCardInfo();
		},
		computed: {
			...mapGetters(["user_data", "sidebar"])
		},
		beforeDestroy() {
			console.log("销毁计时器------------");
			clearInterval(this.timer);
			this.timer = null;
		},
		mounted() {
			this.set_time();
			this.timer = setInterval(() => {
				this.set_time();
			}, 60000);

			//获取用户开通的功能
			this.userProduct();
			this.initSocket();
		},
		methods: {
			//关闭支付弹窗方法
			closePay(){
				this.showPayFee=false;
			},
			
			//获取用户竞标卡详情信息
			getBiddingCardInfo(){
				this.util.userBiddingCard(this.user_data.id,1).then(res=>{
					console.error('Navbar------getBiddingCardInfo--------',res);
					this.biddingCardInfo=res;
				})
			},
			
			//点击竞标卡，查看情况方法
			biddingCard() {
				//下单，并弹出支付窗口
				let params={
					type:'1',
					price:'99'
				}
				this.util.addBiddingOrder(params).then(res=>{
					console.log('addBiddingOrder----',res);
					this.biddingOrderId=res.id;
					this.showPayFee=true;
					this.visible=false;
				})
				
			},
			initSocket() {
				//   const socket = new WebSocket(
				// this.$socketUrl,
				//     this.user_data.token
				//   );
				//   socket.addEventListener("open", function(event) {
				//     // socket.send("Hello Server!");
				//   });
				//   socket.addEventListener("message", event => {
				//     console.log("Message from server ", JSON.parse(event.data).json);
				//     this.socketDate = JSON.parse(event.data).json;
				//     this.getMsg();
				//   });
			},
			getMsg() {
				//type num  is_notice=1再操作等于0什么也不做
				if(this.socketDate.is_notice == 0) {
					return;
				}
				switch(this.socketDate.type) {
					case 11:
						console.log(111111111111111);
						this.msg = `您有${this.socketDate.num}个订单待接`;
						console.log(this.msg);
						this.link = "/serve/order/index";
						break;
					case 12:
						this.msg = `您有${this.socketDate.num}个核验单待上传`;
						this.link = "/serve/order/index";
						break;
					case 13:
						this.msg = `您有${this.socketDate.num}个订单开始了`;
						this.link = "/serve/order/index";
						break;
					case 14:
						this.msg = `您有${this.socketDate.num}个订单收到评论`;
						this.link = "/serve/order/index";
						break;
					case 15:
						this.msg = `您有${this.socketDate.num}个订单收到退款申请`;
						this.link = "/serve/order/index";
						break;
					case 32:
						this.msg = `您有${this.socketDate.num}个提现申请有结果了`;
						this.link = "/serve/finance_set/index";
						break;
					case 33:
						this.msg = `您有${this.socketDate.num}个提现已到账`;
						this.link = "/serve/finance_set/index";
						break;
						// case '41':
						//   msg=`您有${this.socketDate.num}个待办状态变更`;
						//   this.link='';
						//   break;
						// case '61':
						//   //
						//   break;
						// case '62':
						//   //
						//   break;
				}
				//保证弹出窗位置
				this.$nextTick(() => {
					this.showOrderTip = true;
				});
				//更新状态到store
				this.$store.commit("setSocketStatus", this.socketDate.type);
			},
			toThere() {
				if(this.socketDate.is_notice == 0) {
					return;
				}
				console.log(1);
				// this.$store.commit('setSocketStatus',8)
				console.log(1);
				this.$router.push(this.link);
			},
			//获取用户开通的功能
			userProduct() {
				this.util.userProduct().then(res => {
					console.log("userProduct----", res);
				});
			},
			toggleSideBar() {
				this.$store.dispatch("ToggleSideBar");
			},
			logout() {
				this.$store.dispatch("LogOut").then(() => {
					console.log('hahahahhahahha');
					location.reload(); // 为了重新实例化vue-router对象 避免bug
				});
			},
			change_user() {
				this.$store.dispatch("LogOut").then(() => {
					this.$router.push({
						path: "/login",
						query: {
							to: "server"
						}
					});
				});
			},
			LogOut() {
				this.$store.dispatch("LogOut").then(() => {
					this.$router.push("/");
					console.log('hahahahhahahha');
					location.reload(); // 为了重新实例化vue-router对象 避免bug
				});
			},
			set_time() {
				this.time = format(new Date(), "YYYY/MM/DD HH:mm");
			}
		},
		
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.orderTips {
		cursor: pointer;
		font-size: 20px;
		padding-right: 20px;
		border-right: 1px solid #ebebeb;
		margin-right: 10px;
		span {
			font-size: 14px;
			color: #333;
		}
	}
	
	.tipInfo {
		span {
			font-size: 14px;
			color: #333;
		}
		p {
			display: flex;
			align-items: center;
		}
		.red {
			margin-right: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background: #d4282d;
			border-radius: 5px;
			width: 13px;
			height: 13px;
		}
		.platInfo {
			color: #7c6aff;
		}
	}
	
	.navbar-header-fixed {
		transition: width 0.28s;
		width: calc(100% - 210px);
		display: flex;
		align-items: center;
		position: fixed;
		right: 0;
		z-index: 1002;
		height: 62px;
		.hamburger-container {
			line-height: 58px;
			height: 50px;
			float: left;
			padding: 0 10px;
		}
		.logo {
			width: 199px;
			height: 62px;
		}
		.top-right {
			display: flex;
			width: 100%;
			height: 100%;
			background-color: #ffffff;
			justify-content: space-between;
			padding: 0 19px;
			.hb-bd {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.avatar {
				width: 30px;
				height: 30px;
				margin-right: 10px;
				/deep/ img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.top-select {
				display: flex;
				align-items: center;
				.go-index {
					color: #333333;
					font-weight: 400;
					margin-right: 20px;
					padding-right: 20px;
					border-right: 1px solid #cccccc;
				}
				.select-right /deep/ .el-dropdown>span {
					font-size: 6px;
				}
				.select-right {
					/deep/ .el-dropdown-link {
						color: #333333;
						font-weight: 400;
					}
					/deep/ .el-dropdown-selfdefine {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
</style>