<template>
	<div>
		<div class="head">
			<!-- 顶部栏 -->
			<div class="login-nav">
				<div class="nav-left">
					<!--<div @click="wxg" style="margin-right: 20px;">微信重授权</div>-->
					<div class="setflex" v-show="!($route.name == 'login')">
						<div class="setflex" v-if="!is_login_in">
							<div class="login-btn">
								<router-link to="/login">登录</router-link>
							</div>
							<div class="login-btn" @click="openmini">注册</div>
						</div>
						<div class="setflex" v-else>
							<el-popover @show="showPopOver" placement="bottom" trigger="hover">
								<div class="avatar marginTop">
									<div class="avatar-box" v-if="user_data && user_data.avatar">
										<img :src="$qiniuHost + user_data.avatar" class="headimg" v-if="user_data.avatar.indexOf('http') === -1" />
										<img :src="user_data.avatar" v-else class="headimg" />
									</div>
									<div class="avatar-box" v-else>
										<img :src="malePicImgUrl" class="headimg" />
									</div>
									<div class="avata-name-box" v-if="user_data.vip">
										<span>vip</span>
									</div>
									<div>
										<router-link to="/personal/order/myOrder">
											<div class="Logout marginTop word-hover">我的订单</div>
										</router-link>

										<div class="no-pad-line"></div>

										<router-link to="/cart/index">
											<div class="Logout word-hover">购物车</div>
										</router-link>

										<div class="no-pad-line"></div>

										<router-link to="/personal/collection/collectstore">
											<div class="Logout word-hover">收藏</div>
										</router-link>

										<div class="no-pad-line"></div>
										<div class="Logout marginBottom word-hover" @click="LogOut">退出登录</div>
									</div>
								</div>
								<span class="login-btn" slot="reference">
                  {{user_data.nick}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
							</el-popover>
						</div>
						<div>
							<ali-svg-icon icon-class="postion" class-name="postion" fit="scale-down"></ali-svg-icon>
							<span>{{city}}</span>
						</div>
					</div>
				</div>
				<div class="nav-right">
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
					<div class="shot-line" v-if="$route.path.indexOf('personal')==-1"></div>
					<router-link to="/personal/index" v-if="$route.path.indexOf('personal')==-1">
						<div class="word-hover">个人中心</div>
					</router-link>
					<div class="shot-line"></div>
					<!-- <a  @click="gotoShop">
                <div class="word-hover">商户中心</div>
          </a>-->
					<router-link to="/serve">
						<!--<router-link to="/serve/photoer/index">-->
						<div class="word-hover">商户中心</div>
					</router-link>
					<div class="shot-line"></div>
					<div>
						<span>客服电话：</span>
						<span class="phone">0756-3666414</span>
					</div>
				</div>
			</div>
			<div class="long-line"></div>
			<!-- tab页 -->
			<div class="nav-tab" v-if="$route.matched[0].meta.roles == 'front'&&(!$route.matched[0].meta.page)&&$route.path.indexOf('shop')==-1">
				<div class="logo-text">
					<div @click="gohome" class="logo-box" style="cursor: pointer;">
						<ali-svg-icon icon-class="logo" class-name="logotext"></ali-svg-icon>
						<div>派图</div>
					</div>
					<div class="nav-menu">
						<i class="el-icon-menu"></i>
						<span>我要租</span>
						<div class="popover">
							<div class="pop-box">
								<div class="box-title">
									<router-link to="/studio/index">
										<ali-svg-icon icon-class="yingpeng" class-name="title-svg-yp"></ali-svg-icon>
										<span class="word-hover">影棚</span>
										<i class="el-icon-arrow-right"></i>
									</router-link>
								</div>
								<div class="box-cont">
									<div v-for="(item,index) in studioMenuList" :key="index" class="for-box word-hover" @click="toStudioList(item.id)">
										<div>{{item.name}}</div>
										<div class="shout-line" v-if="index!=studioMenuList.length-1"></div>
									</div>
								</div>
							</div>
							<div class="pop-box">
								<div class="box-title">
									<router-link to="/equip/index">
										<ali-svg-icon icon-class="camera" class-name="title-svg"></ali-svg-icon>
										<span class="word-hover">器材</span>
										<i class="el-icon-arrow-right"></i>
									</router-link>
								</div>
								<div class="box-cont">
									<div class="for-box word-hover" v-for="(item,index) in equipMenuList" :key="index" @click="toEquipList(item.id)">
										<div>{{item.name}}</div>
										<div class="shout-line" v-if="index!=equipMenuList.length-1"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-box">
						<div class="item tab-hover" v-for="(item,index) in tabs" :key="index" :class="{activebox:index == active}" @click="changeClick(index)">
							<span :class="{activeitem:index == active}">{{item[0]}}</span>
							<span>{{item.slice(1)}}</span>
							<span class='beta' v-if="item=='拍摄'">beta</span>
						</div>
					</div>
				</div>
				<!-- 搜索店铺，影棚，设备 -->
				<div v-if="$route.path=='/'" class="search" :class="{'long-input':isLong}">
					<el-input placeholder="请输入" v-model="searchText" class="input-with-select" @keyup.enter.native="handleSearch" @focus="searchFocus" @blur="searchBlur">
						<el-select v-model="searchWhat" slot="prepend" placeholder="请选择" @change="changeSearchWhat">
							<el-option label="店铺" value="1"></el-option>
							<el-option label="影棚" value="2"></el-option>
							<el-option label="器材" value="3"></el-option>
							<el-option label="活动" value="4"></el-option>
						</el-select>
						<el-button slot="append" @click="handleSearch">
							<ali-svg-icon icon-class="search-border-copy" class-name="search-border-copy"></ali-svg-icon>
						</el-button>
					</el-input>
				</div>

				<div class="nav-right">
					<div class="slot"></div>
					<div class="slot" v-show="user_data&&user_data.role == 1"></div>
					<div class="nav-right" v-show="!user_data||user_data.role == 0">
						<!-- <router-link to="/hire/index">
            </router-link>-->
						<!--<div class="orange-hover" @click="toHire">立即入驻</div>-->
						<!--<div class="right-arrow">
              <i class="el-icon-arrow-right"></i>
            </div>-->
					</div>
				</div>
			</div>
			<!-- 非首页使用头部 -->
			<div class="no-nav-tab" v-if="!($route.matched[0].meta.roles == 'front'&&(!$route.matched[0].meta.page))&&$route.path.indexOf('shop')==-1">
				<div class="logo-text">
					<div @click="gohome" class="logo-box" style="cursor: pointer;">
						<ali-svg-icon icon-class="logo" class-name="logotext"></ali-svg-icon>
						<div>派图</div>
					</div>
					<div class="nav-menu" v-if="$route.matched[0].meta.roles == 'personal'">
						<router-link to="/personal/index">
							<div class="one-link word-hover">个人中心首页</div>
						</router-link>
						<el-dropdown trigger="hover">
							<div style="cursor: pointer;">
								<span class="word-hover">个人设置</span>
								<i class="el-icon-arrow-down el-icon--right"></i>
							</div>
							<el-dropdown-menu slot="dropdown">
								<router-link to="/personal/person/base">
									<el-dropdown-item>
										<span>基本信息</span>
									</el-dropdown-item>
								</router-link>
								<router-link :to="{path:'/personal/person/address',query:{address:true}}">
									<el-dropdown-item>
										<span>地址管理</span>
									</el-dropdown-item>
								</router-link>
								<router-link :to="{path:'/personal/person/security'}">
									<el-dropdown-item>
										<span>安全设置</span>
									</el-dropdown-item>
								</router-link>
							</el-dropdown-menu>
						</el-dropdown>
						<router-link to="/personal/myMessage/message">
							<div class="three-link word-hover">消息</div>
						</router-link>
					</div>
				</div>
			</div>
			<div id="postaion" class="postaion"></div>
		</div>

		<Login :reg="is_reg" :openlogin="open" @closed="closed"></Login>

		<!--设置昵称，设置密码对话框模块-->
		<div>
			<el-dialog :visible.sync="dialogVisible" width="18%">
				<msg-quick @close="close"></msg-quick>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { lazyAMapApiLoaderInstance } from "vue-amap";
	import Login from "./minilogin";
	import { male_pic, studioType, defaultStorePic } from "@config/config.js";
	import { applywx, apply } from "@config/api";
	import MsgQuick from "FrontComponents/MsgQuick";
	export default {
		components: {
			Login,
			MsgQuick
		},
		data() {
			return {
				malePicImgUrl: male_pic,
				//    tabs: ["首页", "影棚", "器材", "活动", "优惠券", "软件","模特","摄影服务",'团购拼拍','红人服务'],
				//				tabs: ["首页", "影棚", "器材", "活动", "优惠券", "软件", "模特", "服务", '团购', '红人'],
				//    tabs: ["首页", "拍摄", "场地", "器材", "模特", "软件"],
				tabs: ["首页", "场地", "器材", "拍摄","竞标", "软件"],
				equipMenuList: [],
				studioMenuList: studioType,
				active: 0,
				list: [],
				map: null,
				placeSeach: null,
				city: "",
				open: false,
				is_reg: true,
				href: "",
				dialogVisible: false,
				searchText: "",
				searchWhat: "1",
				isLong: false,
				showOrderTip: false,
				socketDate: {
					type: "",
					num: "",
					is_notice: "0"
				},
				msg: "",
				link: "",
				routerList: []
			};
		},
		created() {
			console.log(this.user_data, "奥里给");
			//			this.routerList=[
			//				"/",
			//				"/studio/index",
			//				"/equip/index",
			//				"/activity/index",
			//				"/coupon/index",
			//				"/publicity/index",
			//				"/model/index",
			//				"/service/index",
			//				"/team/index",
			//				"/redMan/index"
			//			];
			this.routerList = [
				"/",

				"/studio/index",
				"/equip/index",
				"/service/index",
				"/demand/index",
				//    "/model/index",
				"/publicity/index"
			];

			console.log("create-------------", this.$route.path);
			let route = this.$route.path;
			this.routerList.forEach((item, index) => {
				if(item == route) {
					this.active = index;
				}
			});
			this.equipMenuList = this.util.getEquipArray();
		},
		computed: {
			...mapGetters(["is_login_in", "user_data", "loginOver","socket_isConnected"])
		},
		watch: {
			user_data(to, from) {
				if(this.user_data) {
					if(!this.user_data.pwd) {
						this.dialogVisible = true;
					}
					this.initSocket();
				}
			},

			$route(to, from) {
				this.searchWhat = "1";
				this.routerList.forEach((item, index) => {
					if(item == to.path) {
						this.active = index;
					}
				});
			},
			loginOver: function(to, from) {
				if(to) {
					this.openmini();
				}
			},
			socket_isConnected: function(socket_isConnected){
				console.log('socket_isConnected 变化',socket_isConnected)
			}
			
		},
		mounted() {
			let _loadApiPromise = lazyAMapApiLoaderInstance.load();
			_loadApiPromise.then(() => {
				this.init();
			});
			if(this.$route.name == "login") {
				this.active = null;
			}
			if(this.user_data) {
				this.initSocket();
			}
		},
		methods: {
			initSocket() {
				console.log('###########');
				//this.$PaituSocketClient.initWebSocket();
			},
			getMsg() {
				// console.log("获取ws支付信息-------------", this.socketDate);
				// let orderId=this.socketDate.data.order_id;
				// if(orderId) {
				// 	//支付消息
				// 	this.$store.commit("setPayStatus", orderId);
				// 	this.$store.commit("setJoinPayStatus", orderId);
				// 	console.log("头部支付");
				// } else {
				// 	//系统通知
				// 	this.link = "/personal/order/myOrder";
				// 	let socketData=this.socketDate;
				// 	let num=socketData.num;
				// 	switch(socketDate.type) {
				// 		case 71:
				// 			this.msg = `您有${num}个活动开始了`;
				// 			break;
				// 		case 22:
				// 			this.msg = `您有${num}个订单已接单`;
				// 			break;
				// 		case 23:
				// 			this.msg = `您有${num}个核验单要确定`;
				// 			break;
				// 		case 24:
				// 			this.msg = `您有${num}个订单开始了`;
				// 			break;
				// 		case 25:
				// 			this.msg = `您有${num}个订单待评论`;
				// 			break;

				// 			this.$nextTick(() => {
				// 				this.showOrderTip = true;
				// 			});
				// 			//更新状态到store
				// 			this.$store.commit("setFrontSocketStatus", socketDate.type);
				// 	}
				// }
			},
			toThere() {
				if(this.socketDate.is_notice == 0) {
					return;
				}
				this.$router.push(this.link);
			},
			handleSearch() {
				let path='';
				switch(parseInt(this.searchWhat)){
					case 1:
						//搜店铺
						path='/store/index';
						break;
					case 2:
						//搜影棚
						path='/studio/index';
						break;
					case 3:
						//搜器材
						path='/equip/index';
						break;
					default:
						//搜活动
						path='/activity/index';
						break;
				}
				let params={searchText:this.searchText};
				this.util.toRoute(path,params);
				this.searchText='';
				
			},
			changeSearchWhat() {
				this.searchText = "";
			},
			searchFocus() {
				return;
				this.isLong = true;
			},
			searchBlur() {
				return;
				this.isLong = false;
			},
			close(value) {
				this.dialogVisible = value;
			},
			showPopOver() {
				this.$nextTick(() => {
					document.getElementsByClassName("el-popover")[0].style.zIndex = "2023";
				});
			},
			wxg() {
				window.location.href = this.href;
			},
			//跳转到影棚列表
			toStudioList(id) {
				let params = {
					studioType: id
				};
				this.util.toStudioList(params);
			},
			// 成为租赁商
			toHire() {
				if(!this.user_data) {
					this.$message.warning("请先登录");
					this.util.toRoute("/login",{to: "sign"});
					return;
				}
				if(this.user_data.role != 0) {
					this.$confirm("您已经成功申请");
					return;
				}
				this.getRequest(apply.get)
					.then(res => {
						console.log(res, "用户的申请情况");
						if(res.progress == 5) {
							this.$confirm("您已经成功申请");
						} else {
							this.util.toRoute("/sign/firstCategory");
						}
					})
					.catch(err => {
						console.error(err);
					});
			},
			//跳转到器材列表
			toEquipList(id) {
				let params = {
					equipType: id
				};
				this.util.toEquipList(params);
			},
			closed() {
				this.open = false;
			},
			openmini() {
				this.open = true;
			},
			changeClick(data) {
				this.active = data;
				console.log("this.active-----", this.active);
				this.routerList.forEach((item, index) => {
					if(index == data) {
						this.util.toRoute(item);
					}
				});
			},
			LogOut() {
				this.$store.dispatch("LogOut").then(() => {
					if(
						this.$route.matched[0].meta.roles == "personal" ||
						this.$route.name === "Hire"
					) {
						this.util.toRoute("/");
					}
					if(this.$route.path.indexOf("/sign") != -1) {
						this.util.toRoute("/");
					}
					location.reload();
				});
			},
			gohome() {
				if(this.$route.name === "Hire") {
					this.$confirm(
							"是否离开当前页面返回首页,您所做的任何修改将不会被保存",
							"提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}
						)
						.then(() => {
							this.util.toRoute("/");
						})
						.catch(() => {
							return false;
						});
				} else {
					this.util.toRoute("/");
				}
			},
			init() {
				try {
					this.map = new AMap.Map("postaion", {
						resizeEnable: true
					});
					AMap.service("AMap.Geocoder", () => {
						let geocoder = new AMap.Geocoder();
						geocoder.getAddress(this.map.getCenter(), (status, result) => {
							let address = result.regeocode.addressComponent;
							if(status === "complete" && result.info === "OK") {
								if(address.city == "") {
									this.city = address.province;
								} else {
									this.city = address.city;
								}

								this.$store.commit("SET_CITY_CODE", address.citycode);
							}

						});
					});
				} catch {
					setTimeout(() => {
						this.init();
					});
				}
			},
			gotoShop() {}
		}
	};
</script>

<style lang="scss" scoped>
	.head {
		z-index: 1999;
		background: #fff;
		position: relative;
	}
	
	.login-nav {
		position: relative;
		z-index: 10;
		line-height: 20px;
		font-size: 10px;
		background-color: #fff;
		display: flex;
		color: #333;
		justify-content: space-between;
		padding: 5px 0px;
		width: 1200px;
		margin: 0 auto;
		.shot-line {
			background-color: #ebebeb;
			width: 1px;
			height: 12px;
			margin: 0 20px;
		}
		.nav-left {
			display: flex;
			.setflex {
				display: flex;
			}
			.login-btn {
				margin-right: 20px;
				cursor: pointer;
			}
			.postion {
				width: 14px;
				line-height: 14px;
				margin-right: 5px;
			}
		}
		.nav-right {
			display: flex;
			align-items: center;
			.phone {
				color: $Theme-color;
			}
		}
	}
	
	.long-line {
		height: 1px;
		background-color: rgba(114, 74, 226, 0.151);
	}
	
	.nav-tab {
		position: relative;
		z-index: 10;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		width: 1200px;
		margin: 0 auto;
		.logo-text {
			display: flex;
			align-items: center;
			.logo-box {
				display: flex;
				align-items: center;
				font-size: 25px;
				.logotext {
					height: 54px;
					width: 56px;
				}
			}
			.nav-menu {
				margin-left: 20px;
				background-color: $Theme-color;
				font-size: 16px;
				color: #fff;
				padding: 17px 47px;
				cursor: pointer;
				position: relative;
				.popover {
					z-index: 99999;
					display: none;
					position: absolute;
					padding: 20px 20px 0 20px;
					right: 0;
					bottom: 0;
					transform: translateY(100%);
					width: 200%;
					background-color: #fff;
					color: #333333;
					border-radius: 3px;
					box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
					.pop-box {
						margin-bottom: 20px;
						.title-svg-yp {
							width: 15px;
							height: 15px;
						}
						.title-svg {
							color: #3333338e;
							width: 20px;
							height: 20px;
						}
						.box-cont {
							color: #3333338e;
							display: flex;
							font-size: 12px;
							align-items: center;
							margin-top: 10px;
							flex-wrap: wrap;
							line-height: 22px;
							.for-box {
								display: flex;
								align-items: center;
							}
							.shout-line {
								width: 1px;
								height: 8px;
								background-color: #3333338e;
								margin: 0px 8px;
							}
						}
					}
				}
			}
			.nav-menu:hover {
				.popover {
					display: block;
				}
			}
			.tab-box {
				display: flex;
				padding-left: 20px;
				color: #33333381;
				.item {
					display: flex;
					padding: 0 15px;
					cursor: pointer;
					position: relative;
					span {
						padding: 8px 0;
						box-sizing: border-box;
					}
					span:first-child {
						border-bottom: 2px solid transparent;
					}
				}
				.activebox {
					color: #333333;
				}
				.activeitem {
					border-bottom: 2px solid $Theme-color !important;
				}
			}
		}
		.search {
			width: 300px;
			position: absolute;
			right: 130px;
			top: 50%;
			transform: translateY(-50%);
			transition: 0.3s;
			border-bottom: 1px solid #ccc;
			.input-with-select {
				/deep/ {
					.el-input-group__prepend {
						border-radius: 0;
						width: 80px;
						background: #fff;
						color: #333;
						border: none;
						.el-select {
							.el-input {
								.el-input__inner {
									&::-webkit-input-placeholder {
										color: #fff;
										color: rgba(51, 51, 51, 0.51);
									}
								}
								.el-input__suffix-inner {
									color: #fff;
									color: rgba(51, 51, 51, 0.51);
								}
								.el-input__suffix {
									.el-input__suffix-inner {
										.el-select__caret {
											color: #fff;
											color: rgba(51, 51, 51, 0.51);
										}
									}
								}
							}
						}
					}
					.el-input-group__prepend+.el-input__inner {
						border: 1px solid #7c6aff;
						border: 1px solid rgba(114, 74, 226, 0.151);
						border: none;
					}
					.el-input-group__append {
						border-radius: 0;
						background: #fff;
						color: #333;
						border: none;
						padding-top: 15px;
						.el-button {
							padding: 0 3px;
							.search-border-copy {
								cursor: pointer;
								width: 24px;
								height: 24px;
							}
						}
					}
				}
			}
		}
		.long-input {
			width: 730px;
		}
		.nav-right {
			display: flex;
			align-items: center;
			color: #ff641f;
			font-weight: bold;
			cursor: pointer;
			.slot {
				height: 10px;
				width: 100px;
			}
			.right-arrow {
				margin-left: 6px;
			}
		}
	}
	
	.no-nav-tab {
		display: flex;
		padding-top: 5px;
		padding-bottom: 5px;
		background: #fff;
		width: 1200px;
		margin: 0px auto;
		.logo-text {
			display: flex;
			align-items: center;
			.logo-box {
				display: flex;
				align-items: center;
				font-size: 25px;
				margin-right: 16px;
				.logotext {
					height: 54px;
					width: 56px;
				}
			}
		}
		.nav-menu {
			color: #333;
			display: flex;
			.one-link {
				margin-right: 48px;
			}
			.three-link {
				margin-left: 48px;
			}
		}
	}
	
	.Logout {
		color: #333;
		font-size: 12px;
		cursor: pointer;
		padding: 6px 0;
	}
	
	.avatar {
		display: flex;
		flex-direction: column;
		align-items: center;
		.avatar-box {
			width: 38px;
			height: 38px;
			.headimg {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				object-fit: scale-down;
				border: 1px solid rgba(114, 74, 226, 0.151);
			}
		}
		.avata-name-box {
			font-size: 14px;
			color: #999;
		}
		.no-pad-line {
			background-color: rgba(114, 74, 226, 0.151);
			height: 1px;
			width: 100%;
		}
	}
	
	.postaion {
		width: 0px;
		height: 0px;
	}
	
	.orderTips {
		cursor: pointer;
		span {
			font-size: 14px;
			color: #333;
		}
	}
	
	.tipInfo {
		span {
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
	
	.marginTop {
		margin-top: 10px;
	}
	
	.beta {
		position: absolute;
		left: 44px;
		top: -5px;
		color: #D4282D;
		font-size: 12px;
		transform: scale(0.8);
	}
</style>