<template>
	<div class="password-wrap">
		<div class="tab-head">
			<el-button type="text" @click="toSecurityPage">安全设置</el-button>
			<span class="el-icon-arrow-right"></span>
			<!--<span>修改密码</span>-->
			<span>{{tabMenu[0].title}}</span>
		</div>
		<div class="content">
			<div class="content-head">
				<div class="tab" :class="{active:item.active}" v-for="(item,index) in tabMenu" :key="index">
					<span>{{index+1}}</span>
					<span>{{item.title}}</span>
				</div>
			</div>
			<div class="first-step" v-if="tabMenu[0].active&&!hasPsw">
				<div class="phone">
					<span>手机号：</span>
					<span>{{user_data.mobile | toTel}}</span>
				</div>
				<div class="code">
					<span>验证码：</span>
					<div class="input-code">
						<input type="text" v-model="phoneCode" placeholder="请输入手机验证码" @keyup.enter="firstNext"/>
						<el-button type="text" :disabled="hasCode" @click="getCode">
							<span v-show="!hasCode">获取短信验证码</span>
							<span v-show="hasCode">{{wait}}秒重试</span>
						</el-button>
					</div>
				</div>
				<div class="code">
					<span>新密码：</span>
					<div class="input-code addPsw">
						<input type="password" v-model="addPsw" placeholder="请输入新密码" @keyup.enter="firstNext"/>
					</div>
				</div>
				<div class="next-btn" @click="nextStep">下一步</div>
			</div>
			<div class="second-step" v-if="tabMenu[0].active&&hasPsw">
				<div class="new-password">
					<span class="label">原密码：</span>
					<el-input type="password" v-model="oldPsw" placeholder="请输入原密码"></el-input>
				</div>
				<div class="confirm-password">
					<span class="label">新密码：</span>
					<el-input type="password" v-model="newPsw" @keyup.enter="updatePsw" placeholder="由6-20个字母，数字和符号组合" v-on:input="inputNewPsw"></el-input>
				</div>
				<div class="safe-level">
					<span class="label">安全程度：</span>
					<span class="low" :class="{'level-active':newPswStrong>0}">低</span>
					<span class="medium" :class="{'level-active':newPswStrong>1}">中</span>
					<span class="high" :class="{'level-active':newPswStrong>2}">高</span>
				</div>
				<span class="confirm-btn" @click="updatePsw">确定</span>
			</div>

			<div class="third-step" v-if="tabMenu[1].active">
				<p class="top">恭喜您，修改密码成功，请牢记新的登录密码！</p>
				<p class="middle">
					<span class="time">{{wait2}}</span>
					<span> 秒后将自动返回安全设置页面</span>
				</p>
				<div class="foot">
					<router-link to="/">派图首页</router-link>
					<router-link to="/personal/index">个人中心</router-link>
					<router-link to="/personal/person/security">安全设置</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { setting } from "@/config/api.js";
	export default {
		data() {
			return {
				tabMenu: [{
						title: '设置密码',
						active: true
					},
					{
						title: '修改密码',
						active: true
					},
					{
						title: '修改成功',
						active: false
					}
				],
				phoneCode: '',
				oldPsw: '', //原密码
				newPsw: '', //新密码
				newPswStrong:0,  //设置的新密码的安全程度
				hasCode: false,
				addPsw:'',
				wait: 60,
				wait2:5,   //修改密码成功后几秒后回到安全设置页面
				hasPsw:Boolean
			}
		},
		computed: {
			...mapGetters(["user_data"])
		},
		created() {
			console.log('this.user_data-----',this.user_data);
			//判断用户是否有没有密码
			if(this.user_data.pwd){
				this.hasPsw=true;
				this.tabMenu.splice(0,1);
			}else{
				this.hasPsw=false;
				this.tabMenu.splice(1,1);
			}
			console.log('tabMenu',this.tabMenu);
		},
		methods: {
			//获取手机验证码
			getCode() {
				console.log('getCode-----');
				let mobile=this.user_data.mobile;
				if(/^1[3456789]\d{9}$/.test(mobile)) {
					this.getRequest(setting.getGeetGt).then(res => {
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
											mobile: mobile,
											type: '1',
											geetest_challenge: geetdata.geetest_challenge,
											geetest_validate: geetdata.geetest_validate,
											geetest_seccode: geetdata.geetest_seccode
										};
										console.log(params);
										this.getRequest(setting.getMobilCode, params).then(res => {
											this.$message.warning("请求已发送");
											this.startTime();
											console.log('getMobileCode-----',res);
										});
									})
									.onError(err => {
										console.error("失败" + err.msg);
									});
							}
						);
					});
				}
			},
			//跳到安全设置页面
			toSecurityPage(){
				this.$router.push({path:'/personal/person/security'});
			},
			//监听输入新的密码
			inputNewPsw(val) {
				console.log('val-------', val);
				//检测密码强度
				console.log(this.util.checkPswStrong(val));
				this.newPswStrong=this.util.checkPswStrong(val);
			},
			//下一步方法
			nextStep() {
				if(!this.phoneCode){
					this.$message.warning('验证码不能为空');
					return;
				}
				if(!this.addPsw){
					this.$message.warning('请输入新的密码');
					return;
				}
				this.util.checkValidCode(this.phoneCode).then(res=>{
					if(res){
						//找回密码方法
						let params={
							mobile:this.user_data.mobile,
							pwd:this.addPsw,
							code:this.phoneCode
						}
						console.log('params-----',params);
						this.util.forGot(params).then(res=>{
							console.log('forGot----------',res);
							this.changeTab(1);
							this.setTime2();
						})
					}
				})
			},
			//修改用户密码
			updatePsw() {
				if(!this.oldPsw){
					this.$message.warning('请输入原密码！');
					return;
				}
				if(!this.newPsw){
					this.$message.warning('请输入新密码！');
					return;
				}
				this.util.updatePsw(this.oldPsw,this.newPsw).then(res=>{
					console.log('updatePsw--修改密码成功-------',res);
					this.changeTab(1);
					//开始倒计时
					this.setTime2();
					//重新获取用户信息
					this.$store.dispatch('GetUserInfo')
				})

			},
			changeTab(i) {
				this.tabMenu.forEach(item => {
					item.active = false
				})
				this.tabMenu[i].active = true
			},
			startTime() {
				this.hasCode = true;
				this.setTime();
			},
			setTime() {
				if(this.wait == 0) {
					this.hasCode = false;
					this.wait = 60;
					return;
				} else {
					this.wait--;
				}
				setTimeout(() => {
					this.setTime();
				}, 1000);
			},
			setTime2() {
				if(this.wait2 == 0) {
					this.$router.push({path:'/personal/person/security'})
					return;
				} else {
					this.wait2--;
				}
				setTimeout(() => {
					this.setTime2();
				}, 1000);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.password-wrap {
		.tab-head {
			height: 67px;
			line-height: 67px;
			background: #fff;
			font-size: 18px;
			color: #666;
			padding-left: 20px;
			box-sizing: border-box;
			margin-bottom: 26px;
			button{
				font-size:18px;
			}
		}
		.content {
			min-height: 530px;
			background: #fff;
			.content-head {
				height: 67px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-bottom: 2px solid #D9D9D9;
				.tab {
					height: 67px;
					// line-height: 67px;
					width: 160px;
					display: flex;
					justify-content: center;
					align-items: center;
					/*cursor: pointer;*/
					span:first-child {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 20px;
						height: 20px;
						border-radius: 50%;
						background: #7C6AFF;
						background: #999999;
						color: #fff;
						margin-right: 17px;
					}
					span:last-child {
						font-size: 18px;
					}
				}
				.active {
					border-bottom: 2px solid #7C6AFF;
					color: #7C6AFF;
					span:first-child {
						background: #7C6AFF;
						color: #fff;
					}
				}
			}
			.first-step {
				padding: 70px 116px 0;
				box-sizing: border-box;
				.phone {
					margin-bottom: 37px;
					&>span{
						width:65px;
						display:inline-block;
					}
				}
				.code {
					width: 418px;
					display: flex;
					align-items: center;
					height: 44px;
					margin-bottom: 37px;
					span:first-child {
						width: 70px;
					}
					.input-code {
						display: flex;
						align-items: center;
						border: 1px solid rgb(217, 217, 217);
						input {
							height: 44px;
							border-radius: 0;
							border: none;
							text-indent: 20px;
						}
						button {
							padding: 0px;
						}
						/deep/ {
							.el-input__inner {
								height: 44px;
								border-radius: 0;
								border: none;
							}
						}
						span {
							height: 44px;
							line-height: 44px;
							width: 130px;
							display: inline-block;
							text-align: center;
							background: rgb(235, 235, 235);
							border-left: 1px solid rgb(217, 217, 217);
							cursor: pointer;
						}
					}
					.addPsw{
						width:300px;
						input{
							width:100%;
						}
					}
				}
				.next-btn {
					width: 418px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					cursor: pointer;
					color: #fff;
					background: #7C6AFF;
				}
			}
			.second-step {
				padding: 60px 102px 0;
				box-sizing: border-box;
				.new-password {
					width: 420px;
					display: flex;
					align-items: center;
					margin-bottom: 15px;
					.label {
						width: 100px;
					}
				}
				.safe-level {
					padding-left: 80px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					.label {
						margin-right: 15px;
					}
					.low,
					.medium,
					.high {
						padding: 5px 15px;
						box-sizing: border-box;
						background: #D9D9D9;
						color: #fff;
						margin-right: 8px;
					}
					.level-active {
						background: #7C6AFF;
					}
				}
				.confirm-password {
					width: 420px;
					display: flex;
					align-items: center;
					margin-bottom: 37px;
					.label {
						width: 100px;
					}
				}
				.confirm-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 418px;
					height: 40px;
					background: rgb(101, 31, 255);
					color: #fff;
					cursor: pointer;
				}
			}
			.third-step {
				padding-top: 70px;
				box-sizing: border-box;
				text-align: center;
				.top {
					font-size: 18px;
					color: #333;
					margin-bottom: 28px;
				}
				.middle {
					font-size: 12px;
					color: #999;
					margin-bottom: 20px;
					.time {
						color: #EA001F;
					}
				}
				.foot {
					a {
						color: #007AD9;
						padding: 0 12px;
						border-right: 1px solid #333;
					}
					a:last-child {
						border: none;
					}
				}
			}
		}
	}
</style>