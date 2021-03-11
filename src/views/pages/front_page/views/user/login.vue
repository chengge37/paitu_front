<!--  -->
<template>
	<div class="login-box">
		<div class="login">
			<div class="login-title">{{is_forgot?'找回密码':'快捷登录'}}</div>
			<div class="login-sub" v-show="!is_forgot">登录享受更多派图租赁服务</div>
			<div class="login-x" v-show="is_reg&&!is_forgot">验证即登录，未注册将自动创建派图帐号</div>
			<div class="form">
				<div class="input-box">
					<input type="text" v-model="from_data.mobile" placeholder="请输入手机号" />
				</div>
				<div class="input-box" v-show="is_reg||is_forgot">
					<input type="text" v-model="from_data.code" placeholder="请输入验证码" />
					<el-button type="text" :disabled="hasCode" @click="getcode">
						<span>{{hasCode?wait+'秒重试':'获取验证码'}}</span>
					</el-button>
				</div>
				<div class="input-box" v-show="!is_reg||is_forgot">
					<input :type="passwordType" v-model="from_data.pwd" :placeholder="passwordText" @keyup.enter="confirm" />
					<span class="show-pwd" @click="showPwd">
            <ali-svg-icon class='cursor' :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
				</div>
			</div>
			<div class="login-botton">
				<el-button type="primary" class="color-area" @click.native="confirm">确定</el-button>
				<div class="passWrap">
					<el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
				</div>

				<div class="bottom-button">
					<el-button type="text" @click="is_reg = !is_reg" v-show="!is_reg">短信快捷登录</el-button>
					<el-button type="text" v-show="is_reg" @click="is_reg = !is_reg">手机密码登录</el-button>
					<el-button type="text" @click="forget" v-show="!is_forgot">忘记密码</el-button>
					<el-button type="text" @click="gologin" v-show="is_forgot">手机密码登录</el-button>
				</div>
			</div>
			<div class="login-bottom-box">
				<div class="three-title">使用三方登录</div>
				<div class="three-box">
					<div class="box-item" v-for="(item,index) in threelogin" :key="index" @click="Threelogin(item.type)">
						<ali-svg-icon :icon-class="item.image" class-name="item-image"></ali-svg-icon>
						<div :class="item.name === 'QQ'?'qq':''">{{item.name}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="login-img">
			<!--<img class="image-size" :src="$qiniuHost+'svg/login.svg'" />-->
			<el-image class="image-size" fit='contain' :src="$qiniuHost+'svg/login.svg'" /></el-image>
		</div>

	</div>
</template>

<script>
	import { setting, safe } from "@/config/api.js";
	import { mapGetters } from "vuex";
	import { storage } from "@util/storage.js";
	export default {
		name: "login",
		data: () => ({
			from_data: {
				mobile: "",
				code: "",
				pwd: ""
			},
			hasCode: false,
			wait: 60,
			threelogin: [{
					image: "login_qq",
					name: "QQ",
					type: 4
				},
				{
					image: "login_weixin",
					name: "微信",
					type: 3
				},
				{
					image: "login_weibo",
					name: "微博",
					type: 5
				},
				{
					image: "login_alipay",
					name: "支付宝",
					type: 6
				}
			],
			is_reg: false,
			passwordType: "password",
			passwordText: "请输入密码",
			accout_type: 2,
			is_forgot: false,
			timer: null,
			//是否记住密码
			rememberPassword: false,
			dialogVisible: false,
		}),

		components: {},
		watch: {
			is_reg(data) {
				this.passwordText = "请输入密码";
				if(data) {
					console.log(data);
					this.accout_type = "2";
					this.is_forgot = false;
				} else {
					this.is_forgot = false;
				}
			}
		},

		mounted() {
			console.log("是否注册" + this.is_reg);
			console.log(this.$route.query);
			//自动填充密码
			this.fillPass();
		},
		computed: {
			...mapGetters(["user_data"])
		},

		methods: {
			fillPass() {
				//先判断是否保存
				let info = storage.get("mobilePass");
				if(!info) {
					this.rememberPassword = false;
				} else {
					this.rememberPassword = true;
					let form = atob(info).split(" ");
					this.from_data.mobile = form[0];
					this.from_data.pwd = form[1];
				}
			},
			Threelogin(data) {
				console.log(data);
				this.getRequest(safe.getThreeCode, {
					type: data
				}).then(res => {
					window.location.replace(res);
				});
			},
			gologin() {
				console.log("是否注册" + this.is_reg);
				this.is_forgot = false;
				this.is_reg = false;
				this.endTime();
			},
			forget() {
				this.endTime();
				console.log("是否注册" + this.is_reg);
				this.is_forgot = true;
				this.passwordText = "请输入新密码(密码位数需要大于6位)";
				this.accout_type = "1";
			},
			getcode() {
				if(/^1[3456789]\d{9}$/.test(this.from_data.mobile)) {
					this.startTime();
					this.getRequest(setting.getGeetGt)
						.then(res => {
							this.$initGeet({
									gt: res.gt,
									challenge: res.challenge,
									product: "bind",
									offline: !res.success,
									new_captcha: true
								},
								geetres => {
									geetres
										.onReady(() => {
											geetres.verify();
										})
										.onSuccess(() => {
											let geetdata = geetres.getValidate();
											let params = {
												mobile: this.from_data.mobile,
												type: this.accout_type,
												geetest_challenge: geetdata.geetest_challenge,
												geetest_validate: geetdata.geetest_validate,
												geetest_seccode: geetdata.geetest_seccode
											};
											console.log(params);
											this.getRequest(setting.getMobilCode, params)
												.then(res => {
													this.$message({
														message: "请求已发送"
													});
												})
												.catch(err => {
													this.$message({
														message: "请求阻塞，请刷新页面重新尝试"
													});
													geetres.reset();
												});
										});
									geetres.onError(err => {
										console.error("失败" + err.msg);
									});
									geetres.onClose(() => {
										this.$message.warning("必须通过验证才可以获取验证码");
										geetres.reset();
										this.endTime();
									});
								}
							);
						})
						.catch(err => {});
				} else {
					this.$message({
						type: "error",
						message: "登录信息不完整，请检查您的手机号或密码是否正确"
					});
				}
			},
			startTime() {
				this.hasCode = true;
				this.setTime();
			},
			endTime() {
				this.wait = 60;
				this.hasCode = false;
				clearTimeout(this.timer);
			},
			setTime() {
				if(this.wait == 0) {
					this.hasCode = false;
					this.wait = 60;
					return;
				} else {
					this.wait--;
				}
				this.timer = setTimeout(() => {
					this.setTime();
				}, 1000);
			},
			confirm() {
				if(/^1[3456789]\d{9}$/.test(this.from_data.mobile)) {
					if(this.is_reg) {
						this.$store.dispatch("CodeLogin", this.from_data).then(res => {
							// 打开双十一弹窗
							// if(this.user_data.role==0){
							//   this.$parent.$parent.showDialog=true
							// }
							if(res) {
								this.$router.go(-1);

							}
						});
					} else if(this.is_forgot) {
						this.postRequest(setting.forGot, this.from_data)
							.then(res => {
								this.is_forgot = false;
								this.confirm();
							})
							.catch(err => {});
					} else {
						let data = {
							mobile: this.from_data.mobile,
							pwd: this.from_data.pwd
						};
						this.$store.dispatch("Login", data).then(res => {
							if(this.rememberPassword) {
								storage.set(
									"mobilePass",
									btoa(this.from_data.mobile + " " + this.from_data.pwd)
								);
							} else {
								storage.set("mobilePass", "");
							}
							switch(this.$route.query.to) {
								case "server":
									this.util.toRoute("/serve");
									break;
								case "parsonal":
									this.util.toRoute("/personal/index");
									break;
								case "hire":
									if(this.user_data.rols == 0) {
										this.util.toRoute("/hire/index");
									} else {
										this.util.toRoute("/serve");
									}
									break;
								case "sign":
									this.util.toRoute("/sign/firstCategory");
									break;
								default:
									this.util.toRoute("/");
									break;
							}
						});
					}
				} else {
					this.$message({
						type: "error",
						message: "登录信息不完整，请检查您的手机号或密码是否正确"
					});
				}
				console.log('login++++++++++++++++++++++++', this.util.getAllMenu(this));
				this.util.setStorage("allMenu", this.util.getAllMenu(this));
			},
			showPwd() {
				if(this.passwordType === "password") {
					this.passwordType = "";
				} else {
					this.passwordType = "password";
				}
			}
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "@css/color.scss";
	.login-box {
		display: flex;
		margin-bottom: 77px;
		.login {
			width: 32%;
			background-color: #ffffff;
			text-align: center;
			padding: 30px;
			margin-right: 40px;
			border: 1px solid #f0f0f0;
			.login-title {
				color: $Theme-color;
				font-size: 30px;
				font-weight: bold;
				margin-bottom: 10px;
			}
			.login-sub {
				font-size: 18px;
			}
			.login-x {
				color: #999;
				font-size: 12px;
				margin-top: 5px;
			}
			.form {
				padding: 20px 0;
				display: flex;
				flex-direction: column;
				.input-box {
					height: 46px;
					background-color: #fafafa;
					border: 1px solid #f0f0f0;
					margin-bottom: 10px;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 20px;
					input {
						width: 100%;
						background-color: #fafafa;
						border: none;
						outline: none;
					}
				}
			}
			.login-botton {
				display: flex;
				flex-direction: column;
				.bottom-button {
					display: flex;
					justify-content: space-between;
				}
				.passWrap {
					text-align: left;
					margin-bottom: 5px;
				}
			}
			.login-botton /deep/ .el-button--primary {
				background-color: $Theme-color;
				margin-bottom: 20px;
				border-radius: 0px;
			}
			.login-botton /deep/ .el-button--text {
				color: $Theme-color;
				margin-bottom: 20px;
			}
			.login-bottom-box {
				height: 73px;
				.three-title {
					color: #999;
					font-size: 10px;
				}
				.three-box {
					color: #999;
					display: flex;
					font-size: 8px;
					justify-content: space-around;
					padding: 0 30px;
					.box-item {
						margin-top: 10px;
						cursor: pointer;
						.item-image {
							width: 24px;
							height: 24px;
						}
					}
				}
			}
		}
		.login-img {
			width: 700px;
			.image-size {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.qq {
		margin-top: 3px;
	}
	
	/deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
		color: $Theme-color;
	}
</style>