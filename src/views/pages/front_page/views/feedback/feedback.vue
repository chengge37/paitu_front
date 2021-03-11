<template>
	<div>
		<div class="main_feedback">
			<div class="feedback_title_container">
				<div class="feedback_title">
					<p class="title">意见反馈</p>
					<p class="content">
						非常感谢您对派图租赁的关注，欢迎提出宝贵的意见和建议，我们将积极采纳， 更好的改善我们的服务
					</p>
				</div>
			</div>
			<div class="feedback_background">
				<div class="feedback_form">
					<el-form ref="form" :rules="rules" :model="form" label-width="80px">
						<el-form-item label="反馈类型" prop="type">
							<el-select v-model="form.type" placeholder="提问咨询" class="el-input">
								<el-option :label="item.name" :value="item.name" v-for="(item,index) in questionList" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="反馈内容" prop="content">
							<el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="form.content" class="el-input"></el-input>
						</el-form-item>
						<el-form-item label="上传图片">
							<div class="uploadImg">
								<el-upload :multiple="true" :file-list="ImgList" :show-file-list="true" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" :data="picPostData" action="https://up-z2.qiniup.com/" list-type="picture-card" :on-preview="handlePreview">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" class="el-img" :src="dialogImageUrl" alt />
								</el-dialog>
							</div>
						</el-form-item>
						<!--<el-form-item label="验证码">-->
						<!--<el-input placeholder="请输入验证码" v-model="form.code" class="el-input"></el-input>-->
						<!--</el-form-item>-->
						<el-form-item label="您的邮箱" prop="email">
							<el-input placeholder="请输入您的邮箱" v-model="form.email" class="el-input"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit" class="button">提交</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import { checkPic } from "@util/picUtil.js";
	import { mapGetters } from "vuex";
	import { setting, safe } from "@/config/api.js";
	export default {
		data() {
			return {
				ImgList: [],
				imgList: [],
				picPostData: {},
				form: {
					type: "",
					content: "",
					pic: "",
					code: "",
					email: "",
				},
				rules: {
					type: [{
						required: true,
						message: "请选择类型",
						trigger: "blur"
					}, ],
					content: [{
						required: true,
						message: "请输入内容",
						trigger: "blur"
					}, ],
					email: [{
							required: true,
							message: "请输入邮箱",
							trigger: "blur"
						},
						{
							validator: this.validate.validateEmail,
							trigger: "blur"
						}
					],
				},
				questionList: [{
						value: '1',
						name: '提问咨询'
					},
					{
						value: '2',
						name: '产品建议'
					},
					{
						value: '3',
						name: '页面错误'
					},
					{
						value: '4',
						name: '其他建议'
					}
				],
				dialogVisible: false,
				dialogImageUrl: '',
			};
		},
		computed: {
			...mapGetters(["user_data"])
		},
		methods: {
			//返回方法
			back(){
				this.util.back(this);
			},
			handleRemove(file) {
				this.imgList.forEach((item, index) => {
					if(item.uid == file.uid) {
						this.imgList.splice(1, index);
					}
				})
			},
			beforeUpload(file) {
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = await checkPic(file, this.ImgList.length, 8);
							if(picKey) {
								let token = await this.getRequest(
									"/qiniu/userGetQiniuUpToken?key=" + picKey
								);
								this.picPostData = token;
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
			handlePreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleSuccess(response, file) {
				//保存图片的uid，和key
				let obj = {
					uid: file.uid,
					key: file.response.key
				}
				this.imgList.push(obj);
			},
			//极验方法
			geetGt() {
				return new Promise((resolve, reject) => {

					this.getRequest(setting.getGeetGt).then(res => {
						this.$initGeet({
							gt: res.gt,
							challenge: res.challenge,
							product: "bind",
							offline: !res.success,
							new_captcha: true
						}, geetres => {
							geetres.onReady(() => {
								geetres.verify();
							}).onSuccess(() => {
								resolve(true);
							});
							geetres.onError(err => {
								resolve(false);
							});
							geetres.onClose(() => {
								this.$message.warning("必须通过验证才可以获取验证码");
								resolve(false);
								geetres.reset();
							});
						});
					});

				})
			},
			//提交意见反馈方法
			onSubmit() {
				this.util.checkForm(this).then(async(res) => {
					if(res) {
						let flag = await this.geetGt();
						if(!flag) return;
						let form = this.form;
						let params = {
							content: form.content,
							type: form.type,
							email: form.email,
						}
						if(this.user_data) {
							params.uid = this.user_data.id;
						}
						if(this.imgList.length > 0) {
							params.pic = '';
							this.imgList.forEach((item, index) => {
								params.pic += item.key + ',';
							})
							params.pic = params.pic.substring(0, params.pic.length - 1);
						}
						console.log('onSubmit------------', params);
						this.util.addFeedback(params).then(res => {
							this.$message.success("提交成功！");
							//清空表格内容
							this.clearContent();
						})
					}
				}).catch(error => {});
			},

			//清空内容
			clearContent(){
				for(let item in this.form){
					this.form[item]='';
				}
				this.imgList=[];
				this.ImgList=[];
			}

		}
	};
</script>
<style lang="scss" scoped>
	.feedback_title_container {
		width: 100%;
		height: 230px;
		background: rgba(86, 59, 146, 1);
		.feedback_title {
			margin: 0 auto;
			padding: 50px 0 0;
			color: #fff;
			width: 50%;
			.title {
				font-size: 32px;
				line-height: 50px;
			}
			.content {
				font-size: 14px;
				line-height: 23px;
				width: 50%;
			}
		}
	}
	
	.feedback_background {
		width: 100%;
		height: 1080px;
		background: rgba(63, 43, 107, 1);
		position: relative;
		.feedback_form {
			width: 60%;
			margin: 0 auto;
			padding: 50px 300px;
			background-color: #fff;
			position: relative;
			top: -50px;
		}
	}
	
	.el-input /deep/ .el-input__inner {
		border-radius: 0;
		background-color: #fafafa;
		border: 1px solid #f0f0f0;
	}
	
	.el-input /deep/ .el-textarea__inner {
		border-radius: 0;
		background-color: #fafafa;
		border: 1px solid #f0f0f0;
	}
	
	.uploadImg /deep/ .el-upload--picture-card {
		border-radius: 0;
		width: 46px;
		height: 46px;
		background-color: #fafafa;
		border: 1px solid #f0f0f0;
		line-height: 46px;
	}
	
	.uploadImg /deep/ .el-icon-plus {
		font-size: 7px;
	}
	
	.el-button--primary {
		border-radius: 0;
		background-color: #5a1be5;
		padding: 10px 36px;
		font-size: 14px;
	}
</style>