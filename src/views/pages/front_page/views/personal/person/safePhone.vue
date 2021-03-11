<template>
	<div class="phone-wrap">
		<div class="tab-head">
			<el-button type="text" @click="toSecurityPage">安全设置</el-button>
			<span class="el-icon-arrow-right"></span>
			<span>手机号码修改</span>
		</div>
		<div class="content">
			<div class="content-head">
				<div class="tab" :class="{active:item.isActive}" v-for="(item,index) in textArr" :key="index">
					<span>{{index+1}}</span>
					<span>{{item.word}}</span>
				</div>
			</div>
			<div class="first-step step" v-if="textArr[0].isActive">
				<div class="oldPsw">
					<span>原密码：</span>
					<el-input type="password" v-model="oldPsw" placeholder="请输入账号密码"></el-input>
				</div>
				<el-button class="next-btn" @click="checkOldPsw">下一步</el-button>
			</div>

			<div class="second-step step" v-if="textArr[1].isActive">
				<div class="new-phone">
					<span>新手机号：</span>
					<el-input v-model="newPhone" placeholder="请输入手机号码"></el-input>
				</div>
				<div class="code">
					<span>验证码：</span>
					<div class="input-code">
						<el-input v-model="phoneCode" placeholder="请输入手机验证码"></el-input>
						<el-button type="text" :disabled="hasCode" @click="getCode">
							<span v-show="!hasCode">获取短信验证码</span>
							<span v-show="hasCode">{{wait}}秒重试</span>
						</el-button>
					</div>
				</div>
				<div class="next-btn" @click="updatePhone">修改</div>
			</div>

			<div class="third-step" v-if="textArr[2].isActive">
				<p class="top">恭喜您，修改手机号码成功！</p>
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
	export default {
		data() {
			return {
				textArr: [{
						word: '验证身份',
						isActive: true
					},
					{
						word: '设置手机号码',
						isActive: false
					},
					{
						word: '修改成功',
						isActive: false
					}
				],
				oldPsw: '', //用户输入的账号密码
				phoneCode: '',
				newPhone: '',
				hasCode: false,
				wait: 60,
				wait2:5,
			}
		},
		created() {},
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//验证原来密码
			checkOldPsw() {
				this.util.checkCode(this.oldPsw).then(res => {
					//console.log('验证原来密码---------',res);
					this.changeTab(1);
				})
			},
			//跳到安全设置页面
			toSecurityPage() {
				this.$router.push({
					path: '/personal/person/security'
				});
			},
			
			//获取手机验证码
			getCode(){
				if(this.util.checkPhone(this.newPhone)) {
					this.startTime();
					this.util.getGeetGt().then(res=>{
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
											mobile: this.newPhone,
											type: '0',
											geetest_challenge: geetdata.geetest_challenge,
											geetest_validate: geetdata.geetest_validate,
											geetest_seccode: geetdata.geetest_seccode
										};
										console.log(params);
										this.util.getMobilCode(params).then(res=>{
											this.$message.warning("请求已发送");
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
			//修改手机方法
			updatePhone() {
				if(this.util.checkPhone(this.newPhone)) {
					this.util.updatePhone(this.newPhone,this.phoneCode).then(res=>{
						console.log('updatePhone--------',res);
						this.changeTab(2);
						this.setTime2();
					})
				}

			},
			changeTab(i) {
				this.textArr.forEach(item => {
					item.isActive = false
				})
				this.textArr[i].isActive = true
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
	.phone-wrap {
		.tab-head {
			height: 67px;
			line-height: 67px;
			background: #fff;
			font-size: 18px;
			color: #666;
			padding-left: 20px;
			box-sizing: border-box;
			margin-bottom: 26px;
		}
		.step {
			&>div {
				width: 418px;
				display: flex;
				align-items: center;
				height: 44px;
				margin-bottom: 35px;
				span {
					width: 100px;
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
				display: flex;
				justify-content: center;
				padding: 0px;
				border-radius: 0px;
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
			}
			.second-step {
				padding: 60px 102px 0;
				box-sizing: border-box;
				.code {

					.input-code {
						display: flex;
						align-items: center;
						width:100%;
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
	
	/deep/ {
		.el-input__inner {
			height: 44px;
			border-radius: 0;
		}
		.code {
			.el-input__inner {
				border: none;
			}
		}
	}
	.tab-head{
		button{
			font-size:18px;
		}
	}
</style>