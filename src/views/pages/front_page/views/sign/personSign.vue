<template>
	<div class="wrap">
		<div class="title">入驻流程</div>
		<join-progress :curStep="curStep-0"></join-progress>
		<!-- 第一步 -->
		<div class="first-step" v-show="showStep[0].isShow">
			<div class="agreement">
				协议协议
			</div>
			<el-checkbox v-model="isAgree">
				<span>我已阅读并且同意</span>
				<span>《派图租赁平台入驻协议（个人版）》</span>
			</el-checkbox>
		</div>
		<!-- 第二步 -->
		<div class="second-step" v-show="showStep[1].isShow">
			<el-form label-position="left" :rules="rules" ref="form" :model="form" label-width="110px">
				<p class="one-point">一、店铺资料</p>
				<el-form-item label="店铺名称：" prop="nick">
					<el-input v-model="form.nick" placeholder='长度在2到64之间'></el-input>
				</el-form-item>
				<el-form-item label="店铺logo：" class="form-logo" prop="logo">
					<clipper border-color="#DCDFE6" bg-color="#fff" :showPen="true" :resultWidth="285" :imgList="logoArr" @delSuccess="delLogoSuccess" @uploadSuccess="uploadLogoSuccess" :uploadWidth="148" :uploadHeight="148" :ratio="1"></clipper>
					<div>请上传店铺logo</div>
				</el-form-item>
				<p class="two-point">二、个人资料</p>
				<el-form-item label="姓名：" prop="true_name">
					<el-input v-model="form.true_name" placeholder='长度在2到32之间'></el-input>
				</el-form-item>
				<el-form-item label="身份证号：" prop="true_card">
					<el-input v-model="form.true_card"></el-input>
				</el-form-item>
				<el-form-item label="地址：" prop="address">
					<el-input v-model="form.address" placeholder='长度在2到256之间'></el-input>
				</el-form-item>
				<el-form-item label="联系电话：" prop="phone">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱：" prop="email">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证（正反面、手持）照片：" label-width="300px" class="id-card" prop='card'>
					<div class="front-id">
						<el-upload class="avatar-uploader" :on-success="handleSuccess1" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
							<img v-if="form.id_card_copy_qiniu" :src="$qiniuHost+form.id_card_copy_qiniu" class="avatar">
							<div class="layer" v-if="form.id_card_copy_qiniu">
								<div class="layer-left" @click.stop="stopBubble"></div>
								<div class="layer-center">
									<i class="el-icon-view" @click.stop="previewImg(1)"></i>
									<i class="el-icon-edit" @click="changeImg(1)"></i>
									<i class="el-icon-delete" @click.stop="delImg(1)"></i>
								</div>
								<div class="layer-right" @click.stop="stopBubble"></div>
							</div>
							<img class="init-img" v-if="!form.id_card_copy_qiniu" src="https://pic.paitume.com/images/front_id.png">
							<!-- <i v-if="!form.id_card_copy_qiniu" class="el-icon-plus avatar-uploader-icon"></i> -->
						</el-upload>
						<div class="little-label">正面</div>
						<el-dialog :visible.sync="isPreview1">
							<img width="100%" class="el-img" :src="$qiniuHost+form.id_card_copy_qiniu" alt />
						</el-dialog>
					</div>
					<div class="back-id">
						<el-upload class="avatar-uploader" :on-success="handleSuccess2" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
							<img v-if="form.id_card_national_qiniu" :src="$qiniuHost+form.id_card_national_qiniu" class="avatar">
							<div class="layer" v-if="form.id_card_national_qiniu">
								<div class="layer-left" @click.stop="stopBubble"></div>
								<div class="layer-center">
									<i class="el-icon-view" @click.stop="previewImg(2)"></i>
									<i class="el-icon-edit" @click="changeImg(2)"></i>
									<i class="el-icon-delete" @click.stop="delImg(2)"></i>
								</div>
								<div class="layer-right" @click.stop="stopBubble"></div>
							</div>
							<img class="init-img" v-if="!form.id_card_national_qiniu" src="https://pic.paitume.com/images/back_id.png">
							<!-- <i v-if="!form.id_card_national_qiniu" class="el-icon-plus avatar-uploader-icon"></i> -->
						</el-upload>
						<div class="little-label">反面</div>
						<el-dialog :visible.sync="isPreview2">
							<img width="100%" class="el-img" :src="$qiniuHost+form.id_card_national_qiniu" alt />
						</el-dialog>
					</div>
					<div class="hold-id">
						<el-upload class="avatar-uploader" :on-success="handleSuccess3" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
							<img v-if="form.id_card_handle_qiniu" :src="$qiniuHost+form.id_card_handle_qiniu" class="avatar">
							<div class="layer" v-if="form.id_card_handle_qiniu">
								<div class="layer-left" @click.stop="stopBubble"></div>
								<div class="layer-center">
									<i class="el-icon-view" @click.stop="previewImg(3)"></i>
									<i class="el-icon-edit" @click="changeImg(3)"></i>
									<i class="el-icon-delete" @click.stop="delImg(3)"></i>
								</div>
								<div class="layer-right" @click.stop="stopBubble"></div>
							</div>
							<img class="init-img" v-if="!form.id_card_handle_qiniu" src="https://pic.paitume.com/images/hold_id.png">
							<!-- <i v-if="!form.id_card_handle_qiniu" class="el-icon-plus avatar-uploader-icon"></i> -->
						</el-upload>
						<div class="little-label">手持正面</div>
						<el-dialog :visible.sync="isPreview3">
							<img width="100%" class="el-img" :src="$qiniuHost+form.id_card_handle_qiniu" alt />
						</el-dialog>
					</div>
				</el-form-item>

				<p class="three-point">三、结算账户</p>
				<el-form-item label="支付宝账号：" prop="alipay_account">
					<el-input v-model="form.alipay_account"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<!-- 第三步 -->
		<div class="third-step" v-if="showStep[2].isShow">
			<p class="role-label">
				<span>您选择签约的账户类型为：</span>
				<span>{{joinRole}}</span>
			</p>
			<p class="price-label">
				<span>请支付保证金：</span>
				<span>1元</span>
			</p>
			<p class="pay-label">请选择支付方式：</p>
			<div class="pay-ways">
				<div :class="{'active':curIndex==(index+1)}" v-for="(item,index) in payList" :key="index" @click="selectPayWay(index+1)">
					<ali-svg-icon :icon-class="item.iconClass" :class-name="item.iconClass"></ali-svg-icon>
					<span>{{item.name}}</span>
				</div>
			</div>

			<div ref="alipay"></div>

			<div clas="qr-code">
				<canvas ref="canvas" class="canvas-size"></canvas>
			</div>
			<div @click="mockPay" v-if="false">模拟支付完成</div>
			<div class="question">
				<p>常见问题：</p>
				<div>
					<p>为什么要缴纳保证金？</p>
					<span>为了规范服务提供者的服务，保护客户的权益及样品安全，入驻平台提供服务的相关服务者都需要缴纳保证金。 什么时候可以退还？在您决定不使用我们派图提供的服务时，保证金在一个工作日内退还到您的指定账户。</span>
				</div>
				<p>什么时候保证金可以退还？</p>
			</div>
		</div>
		<!-- 第四步 -->
		<div class="fouth-step" v-if="showStep[3].isShow">
			<ali-svg-icon icon-class="dengdais" class-name="dengdais"></ali-svg-icon>
			<p class="first-line">您的资料已经提交，平台正在审核中...</p>
			<p class="second-line">预计需要1-3个工作日</p>
			<p class="third-line">审核结果，我们将通过<span class="purple-text">短信、邮件</span>进行通知，请您注意查收~</p>
		</div>
		<!-- 第五步 -->
		<div class="fifth-step" v-if="showStep[4].isShow">
			<ali-svg-icon icon-class="succ" class-name="succ"></ali-svg-icon>
			<p class="first-line">恭喜您！</p>
			<p class="second-line">您的审核已经通过！</p>
			<p class="third-line">立即进入后台，开始接单吧！</p>
			<p class="add-server" @click="toServe">返回首页</p>
		</div>
		<div class="footer">
			<el-button class="prev" type="primary" @click="prev" v-if="showStep[1].isShow">上一步</el-button>
			<el-button class="next" type="primary" :disabled="showStep[0].isShow&&!isAgree" @click="next" v-if="showStep[0].isShow||showStep[1].isShow">下一步</el-button>
			<span class="back-btn" @click="back" v-if="showStep[0].isShow">返回</span>
		</div>
	</div>
	
  
</template>

<script>
	import JoinProgress from "FrontComponents/joinProgress";
	import clipper from "FrontComponents/photoClipper";
	import { checkPic } from '@util/picUtil.js'
	import { apply } from '@config/api.js'
	import QRcode from "qrcode";
	import { mapGetters } from "vuex";

	export default {
		data() {
			var checkLogo = (rule, value, callback) => {
      if (!this.form.logo) {
        return callback(new Error("logo不能为空"));
      } else {
        callback();
      }
			};
			var checkCard = (rule, value, callback) => {
      if (!this.form.id_card_copy_qiniu||!this.form.id_card_national_qiniu||!this.form.id_card_handle_qiniu) {
          return callback(new Error("身份证照片不可缺少"));
        } else {
          callback();
        }
      };
			return {
				curStep: 1,
				isAgree: false,
				showStep: [{
						isShow: true,
					},
					{
						isShow: false,
					},
					{
						isShow: false,
					},
					{
						isShow: false,
					},
					{
						isShow: false,
					},
				],
				hasNext: true,
				form: {
					type: 2,
					personal_type: 0,
					nick: '',
					logo: '',
					true_name: '',
					id_card_copy_qiniu: '',
					id_card_national_qiniu: '',
					id_card_handle_qiniu: '',
					true_card: '',
					address: '',
					phone: '',
					email: '',
					alipay_account: ''
				},
				payList: [{
						iconClass: 'weixin',
						name: '微信支付'
					},
					{
						iconClass: 'aliApy_round',
						name: '支付宝支付'
					},
					{
						iconClass: 'yinlian',
						name: '银联支付'
					},
				],
				rules: {
					nick: [{
							required: true,
							message: '请输入店铺名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					card:[
            {required: true,
            validator: checkCard,
            trigger: "blur"}
          ],
					true_name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, ],
					true_card: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ ,
							message: '身份证号码不正确',
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入地址',
						trigger: 'blur'
					}],
					logo:[
            {required: true,
            validator: checkLogo,
            trigger: "blur"}
          ],
					phone: [{
							required: true,
							message: '请输入电话',
							trigger: 'blur'
						},
						{
							pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/ ,
							message: '电话号码不正确',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					alipay_account: [{
							required: true,
							message: '请填写支付宝账号',
							trigger: 'blur'
						},
						{
							pattern: /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/ ,
							message: '支付宝账号不正确',
							trigger: 'blur'
						}
					]
				},
				idToken: {},
				isPreview1: false,
				isPreview2: false,
				isPreview3: false,
				logoArr: [{
					key: ''
				}],
				joinRole: '',
				radio: 1,
				pay_data: {
					id: "",
					pay_way: "",
					price: ""
				},
				curIndex: 1, //当前选择的支付方式 1/微信，2/支付宝,3/银联支付
			}
		},
		components: {
			clipper,
			JoinProgress
		},
		computed: {
			...mapGetters(["sign_info", "user_data","socket"])
		},
		watch: {
			 
			"socket.applyPayMsg": function(socket_msg){
				if(socket_msg){
					console.log('保证金支付状态 SOCKET 消息-------------', socket_msg);
					//处理完了要删除
					this.$store.commit('remove_apply_pay_msg');
					if(socket_msg.has_pay == 1){
						this.next();
					}
				}
			}
		},
		created() {
			console.log(this.sign_info, '进度0................')
			switch(this.sign_info.role) {
				case 1:
					this.joinRole = '签约摄影师'
					this.form.personal_type = 1
					break
				case 2:
					this.joinRole = '签约模特'
					this.form.personal_type = 2
					break
			}
			this.postRequest(apply.get, {
        type: 2,
        personal_type: this.form.personal_type
      }).then(res=>{
        this.$store.commit("SET_SIGN", {
          type: 2,
          role: this.sign_info.role,
          progress: res.progress
        });
      }).catch(err=>{
        console.error(err)
      })
			this.curStep = this.sign_info.progress
			this.showStep.forEach(item => {
				item.isShow = false
			})
			console.log(this.showStep, this.curStep, this.sign_info, '----------------------------');
			this.showStep[this.curStep - 1].isShow = true
			if(this.curStep == 3 || this.sign_info.progress == 3) {
				this.selectPayWay(1)
			}
		},
		methods: {
			//跳转到商家后台服务管理
			toAddService() {
				console.log('toAddService------------');
				this.util.toAddService();
			},
			//跳转到后台
			toServe(){
				this.$router.push('/')
			},
			mockPay() {
				this.getRequest(apply.mockPay).then(res => {
					console.log(res, '模拟支付接口调用')
				}).catch(err => {
					console.error(err)
				})
			},
			back() {
				this.$router.back()
			},
			prev() {
				if(this.curStep == 1) {
					this.$router.back()
				} else {
					this.curStep--
						this.showStepnext.forEach(item => {
							item.isShow = false
						})
					this.showStep[this.curStep - 1].isShow = true
				}
			},
			next() {
				console.log('调用next', this.curStep)
				if(this.curStep == 1) {
					this.toNextStep()
				} else if(this.curStep == 2) {
					let hasNull = Object.keys(this.form).some(item => {
						return this.form[item].length == 0
					})
					if(hasNull) {
						this.$message.error('请填写完所有信息再进行下一步')
						return
					}
					this.postRequest(apply.apply, { ...this.form
					}).then(res => {
						console.log(res, '申请结果')
						if(res) {
							this.toNextStep()
							this.selectPayWay(1)
						}
					}).catch(err => {
						console.error(err)
					})
				} else if(this.curStep == 3) {
					this.toNextStep()
				}
			},
			toNextStep() {
				this.curStep++
					this.$store.commit('SET_SIGN', {
						type:2,
						role: this.sign_info.role,
						progress: this.curStep
					})
				this.showStep.forEach(item => {
					item.isShow = false
				})
				this.showStep[this.curStep - 1].isShow = true
			},
			delLogoSuccess(data) {
				this.form.logo = ''
			},
			uploadLogoSuccess(data) {
				console.log(data, 'jkjk')
				this.form.logo = data
			},
			beforeUpload(file) {
				const _self = this;
				const _URL = window.URL || window.webkitURL;
				const fileName = file.uid;
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = await checkPic(file);
							console.log(picKey, 'dddddddddddddd')
							if(picKey) {
								let token = await this.getRequest(
									"/qiniu/userGetQiniuUpToken?key=" + picKey
								);
								console.log(token, file.uid, '888888888888888888888')
								this.idToken = token;
								this.idToken.uid = file.uid;
								resolve(true);
							} else {
								reject(false);
							}
						} catch(error) {
							reject(false);
						}
					};
					Sync();
				});
			},
			handleSuccess1(file) {
				console.log('图片上传成功', file)
				this.form.id_card_copy_qiniu = file.key
			},
			handleSuccess2(file) {
				console.log('图片上传成功', file)
				this.form.id_card_national_qiniu = file.key
			},
			handleSuccess3(file) {
				console.log('图片上传成功', file)
				this.form.id_card_handle_qiniu = file.key
			},
			stopBubble() {
				console.log('不用上传图片')
				return
			},
			previewImg(i) {
				switch(i) {
					case 1:
						this.isPreview1 = true;
						this.isPreview2 = false;
						this.isPreview3 = false;
						break;
					case 2:
						this.isPreview1 = false;
						this.isPreview2 = true;
						this.isPreview3 = false;
						break;
					case 3:
						this.isPreview1 = false;
						this.isPreview2 = false;
						this.isPreview3 = true;
						break;
				}
			},
			changeImg() {
				console.log('切换图片')
			},
			delImg(i) {
				console.log('删除图片')
				this.idToken = {}
				switch(i) {
					case 1:
						this.form.id_card_copy_qiniu = ''
						break;
					case 2:
						this.form.id_card_national_qiniu = ''
						break;
					case 3:
						this.form.id_card_handle_qiniu = ''
						break;
				}
			},
			selectPayWay(val) {
				this.curIndex = val;
				this.postRequest(apply.pay, {
					pay_way: val,
					type:2,
          company_type:0,
          personal_type:this.form.personal_type
				}).then(res => {
					console.log(res, '缴纳保证金')
					if(val == 1) {
						let canvas = this.$refs.canvas;
						QRcode.toCanvas(
							canvas, res, {
								errorCorrectionLevel: "H"
							},
							error => {
								if(error) {
									this.$message({
										type: "info",
										message: "微信支付码生成失败"
									});
								}
							}
						);
					} else if(val == 2) {
						//支付宝
						this.$refs.alipay.innerHTML = res;
						document.forms["alipay_submit"].submit();
					}
				}).catch(err => {
					console.error(err)
				})
			},
			getPayStatus() {
				this.getRequest(apply.get, {
					type: 2
				}).then(res => {
					console.log(res, '获取支付状态')
				}).catch(err => {
					console.error(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>.wrap {
	width: 1200px;
	margin: 0 auto;
	padding: 30px 0;
	.title {
		font-size: 40px;
		font-weight: 600;
		color: #333;
		text-align: center;
		margin-bottom: 50px;
	}
	.el-steps {
		margin-bottom: 80px;
	}
	.first-step {
		.agreement {
			height: 250px;
			overflow-y: auto;
			padding: 20px;
			margin-top: 30px;
			background: #fff;
		}
		.el-checkbox {
			margin: 30px 0;
			font-size: 16px;
			color: #333;
			span:nth-child(2) {
				color: #651fff;
			}
		}
	}
	.second-step {
		margin-top: 23px;
		background: #fff;
		padding: 60px 60px 66px;
		.el-form {
			.one-point,
			.two-point,
			.three-point {
				font-size: 20px;
				font-weight: 500;
				color: #333;
				margin-bottom: 30px;
			}
			.two-point,
			.three-point {
				padding-top: 30px;
				border-top: 2px solid #F0F0F0;
			}
			.form-logo {
				/deep/ {
					.el-form-item__content {
						width: fit-content;
					}
				}
				div {
					text-align: center;
					font-size: 10px;
					color: #999;
				}
			}
			.id-card {
				display: flex;
				flex-direction: column;
				/deep/ {
					.el-form-item__label {
						margin-bottom: 30px;
					}
					.el-form-item__content {
						margin-left: 180px!important;
						width: fit-content;
						display: flex;
						.front-id,
						.back-id {
							margin-right: 30px;
						}
						.little-label {
							font-size: 10px;
							color: #999;
							text-align: center;
						}
					}
					.el-upload--picture-card {
						width: 139px;
						height: 139px;
						width: 100%;
						height: 100%;
						background: rgba(250, 250, 250, 1);
						border: 1px solid rgba(240, 240, 240, 1);
					}
					.avatar-uploader .el-upload {
						width: 200px;
						height: 126px;
						line-height: 139px;
						background: rgb(250, 250, 250, );
						border: none;
						cursor: pointer;
						position: relative;
						overflow: hidden;
						border-radius: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						.avatar {
							width: 139px;
							height: 139px;
							display: block;
							z-index: 998;
						}
						.layer {
							width: 100%;
							height: 100%;
							background: #000;
							opacity: 0.7;
							display: flex;
							visibility: hidden;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 999;
							.layer-left {
								flex: 1;
							}
							.layer-right {
								// background: #789456;
								flex: 1;
							}
							.layer-center {
								flex: 1;
								display: flex;
								flex-direction: column;
								.el-icon-view,
								.el-icon-edit,
								.el-icon-delete {
									font-size: 20px;
									color: #fff;
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
								}
							}
						}
					}
					.init-img {
						max-width: 100%;
						max-height: 100%;
						width: auto;
						height: auto;
					}
					.avatar-uploader .el-upload:hover {
						.layer {
							visibility: visible;
						}
					}
					.avatar-uploader+p {
						font-size: 14px;
					}
					.avatar-uploader-icon {
						font-size: 28px;
						color: #8c939d;
						width: 32px;
						height: 32px;
						text-align: center;
					}
				}
			}
		}
	}
	.third-step {
		background: #fff;
		margin-top: 28px;
		padding: 82px 52px 91px 42px;
		p {
			font-size: 20px;
			margin-bottom: 30px;
			span:first-child {
				color: #999;
			}
		}
		.role-label {
			span:nth-child(2) {
				color: #333;
				font-weight: 500;
			}
		}
		.price-label {
			span:nth-child(2) {
				color: #FF641F;
			}
		}
		.pay-label {
			color: #999;
			padding-top: 29px;
			border-top: 1px solid #F0F0F0;
		}
		.pay-ways {
			display: flex;
			margin-bottom: 50px;
			div {
				width: 180px;
				height: 52px;
				border: 1px solid #ddd;
				font-size: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4px;
				cursor: pointer;
				margin-right: 15px;
				&:hover,
				&.active {
					border-color: $Theme-color;
				}
			}
			.svg-default {
				width: 27px;
				height: 27px;
				margin-right: 10px;
			}
		}
		.question {
			margin-top: 100px;
			color: #333;
			font-size: 16px;
			p:first-child {
				font-size: 20px;
				font-weight: 500;
			}
			p{
				margin:0px;
				margin-bottom:10px;
			}
			div{
				margin:20px 0px;
				span{
					font-size:14px;
					color:#bbb;
				}
			}
		}
	}
	.fouth-step {
		background: #fff;
		margin-top: 35px;
		padding: 160px 0 200px;
		text-align: center;
		.dengdais {
			width: 49px;
			height: 57px;
			margin-bottom: 21px;
		}
		.first-line {
			font-size: 20px;
			font-weight: 600;
			color: #651fff;
			margin-bottom: 20px;
		}
		.second-line {
			color: #333;
			margin-bottom: 10px;
		}
		.third-line {
			color: #333;
			.purple-text {
				color: #651fff;
			}
		}
	}
	.fifth-step {
		background: #fff;
		margin-top: 35px;
		padding: 179px 0 359px;
		text-align: center;
		.succ {
			width: 48px;
			height: 48px;
			margin-bottom: 12px;
		}
		.first-line {
			font-size: 18px;
			font-weight: 500;
			color: #651fff;
			margin-bottom: 10px;
		}
		.second-line {
			font-size: 18px;
			font-weight: 500;
			color: #651fff;
			margin-bottom: 30px;
		}
		.third-line {
			color: #333;
			margin-bottom: 10px;
		}
		.add-server {
			width: 98px;
			height: 32px;
			background: #F0F0F0;
			color: #651fff;
			border: 1px solid #651fff;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			cursor: pointer;
		}
	}
	.footer {
		margin-top: 40px;
		.el-button.prev {
			width: 100px;
			height: 40px;
			background: #999;
			border-radius: 0;
			margin-right: 40px;
		}
		.el-button.next {
			width: 100px;
			height: 40px;
			background: #651fff;
			border-radius: 0;
			margin-right: 20px;
		}
		span {
			color: #999;
			font-weight: 500;
			cursor: pointer;
		}
	}
}</style>

